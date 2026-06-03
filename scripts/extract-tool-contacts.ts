/**
 * Crawl each tool's homepage (and contact/about subpages) to surface
 * outreach contact info: email addresses, Twitter/X handles, contact URLs.
 *
 * Output: marketing/tool-contacts.csv
 *
 * Usage:
 *   npm run extract:contacts
 *
 * Why: VibeStack's tool DB only stores websiteUrl. To do outreach
 * ("you're listed on VibeStack — would love your feedback"), we need
 * per-tool contact info. This script does best-effort discovery so the
 * human can pick up where the bot left off.
 *
 * Heuristics:
 *  - mailto: links anywhere in HTML
 *  - twitter.com/X or x.com/X links (excluding share/intent/status URLs)
 *  - <link rel="canonical"> for canonical company URL
 *  - "Contact" / "About" page paths
 *  - LinkedIn company pages
 *
 * Limitations:
 *  - JS-rendered sites won't expose contacts in raw HTML (we don't render)
 *  - Some companies hide email behind contact forms only
 *  - Founder personal Twitter often lives in About page, not homepage
 */

import { prisma } from "../lib/prisma";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

interface Contact {
    slug: string;
    title: string;
    websiteUrl: string;
    emails: string[];
    twitters: string[];
    linkedins: string[];
    contactPage: string | null;
    aboutPage: string | null;
    errors: string[];
}

const TIMEOUT_MS = 12_000;
const USER_AGENT =
    "Mozilla/5.0 (VibeStackContactBot/1.0; +https://usevibestack.com) " +
    "Research crawler for indexed tools - contact hello@usevibestack.com";

// Twitter/X handles that should NOT be treated as a tool's account.
const TWITTER_BLOCKLIST = new Set([
    "intent", "share", "status", "home", "search", "explore", "i",
    "messages", "compose", "settings", "twitterapi", "twitterdev", "twitter",
    "x", "verified", "support",
]);

const EMAIL_BLOCKLIST_DOMAINS = new Set([
    "example.com", "domain.com", "yourdomain.com", "email.com",
    "sentry.io", "sentry-next.dev", "company.com", "youremail.com",
]);

// Common placeholder local-parts that aren't real outreach targets.
const EMAIL_BLOCKLIST_LOCALPARTS = new Set([
    "you", "example", "sample", "demo", "test", "user", "name",
    "yourname", "youremail", "firstname", "lastname",
]);

// File extensions that get false-positive matched (responsive image assets:
// "logo@2x.png", "hero@3x.webp", etc.)
const ASSET_EXTENSIONS = /\.(png|jpe?g|gif|webp|avif|svg|ico|css|js|json|woff2?|ttf|otf|map|pdf|mp4|webm|mp3|zip|tar|gz)$/i;

const MAX_TWITTER_PER_TOOL = 5;
const MAX_LINKEDIN_PER_TOOL = 5;

async function fetchWithTimeout(url: string): Promise<string> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
        const res = await fetch(url, {
            headers: { "User-Agent": USER_AGENT, "Accept": "text/html,*/*" },
            redirect: "follow",
            signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.text();
    } finally {
        clearTimeout(timer);
    }
}

function isLikelyEmail(email: string): boolean {
    // Reject anything that's actually an asset filename (logo@2x.png etc.)
    if (ASSET_EXTENSIONS.test(email)) return false;
    // Reject if local-part looks like a CSS class / hash / contains URL-encoding
    const [local, domain] = email.split("@");
    if (!local || !domain) return false;
    if (local.includes("%")) return false;            // URL-encoded chars in path
    if (/[0-9a-f]{16,}/.test(local)) return false;    // long hex hash → asset
    if (local.length > 40) return false;              // very long → not human
    if (EMAIL_BLOCKLIST_LOCALPARTS.has(local)) return false;
    if (EMAIL_BLOCKLIST_DOMAINS.has(domain)) return false;
    // Drop common observability / build vendor noise
    if (/\.(sentry|datadog|amplitude|segment|hotjar)\./.test(domain)) return false;
    if (/vercel|gstatic|googleapis|cloudfront/.test(domain)) return false;
    return true;
}

function extractEmails(html: string, baseDomain: string): string[] {
    const set = new Set<string>();
    // mailto: links — most reliable
    for (const m of html.matchAll(/mailto:([^"'?<>\s]+)/gi)) {
        const email = decodeURIComponent(m[1]).toLowerCase().trim();
        if (isLikelyEmail(email)) set.add(email);
    }
    // Bare emails — only trust ones on the site's own domain
    for (const m of html.matchAll(
        /\b[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/gi
    )) {
        const email = m[0].toLowerCase();
        if (!isLikelyEmail(email)) continue;
        const domain = email.split("@")[1];
        // Only accept bare emails on the tool's own apex domain.
        // This drops random emails from blog posts, testimonials, etc.
        if (baseDomain && domain.endsWith(baseDomain)) set.add(email);
    }
    return [...set].sort();
}

function extractTwitter(html: string): string[] {
    const set = new Set<string>();
    for (const m of html.matchAll(
        /https?:\/\/(?:www\.|mobile\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]{1,15})/gi
    )) {
        const handle = m[1].toLowerCase();
        if (TWITTER_BLOCKLIST.has(handle)) continue;
        set.add(`@${handle}`);
    }
    return [...set].sort();
}

function extractLinkedIn(html: string): string[] {
    const set = new Set<string>();
    for (const m of html.matchAll(
        /https?:\/\/(?:www\.)?linkedin\.com\/(?:company|in|school)\/([a-zA-Z0-9-]+)/gi
    )) {
        set.add(`https://linkedin.com/${m[0].split("linkedin.com/")[1].split(/[?#]/)[0]}`);
    }
    return [...set].sort();
}

function findSubpath(html: string, base: string, hints: RegExp[]): string | null {
    // Prefer absolute or root-relative hrefs from <a> tags
    for (const m of html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi)) {
        const href = m[1];
        const text = m[2].trim();
        for (const re of hints) {
            if (re.test(href) || re.test(text)) {
                try {
                    return new URL(href, base).toString();
                } catch {
                    return null;
                }
            }
        }
    }
    return null;
}

function baseDomain(url: string): string {
    try {
        const host = new URL(url).hostname.replace(/^www\./, "");
        const parts = host.split(".");
        // last two labels e.g. "example.com"; for co.uk this is imperfect.
        return parts.slice(-2).join(".");
    } catch {
        return "";
    }
}

async function processTool(
    slug: string,
    title: string,
    websiteUrl: string,
): Promise<Contact> {
    const result: Contact = {
        slug, title, websiteUrl,
        emails: [], twitters: [], linkedins: [],
        contactPage: null, aboutPage: null,
        errors: [],
    };
    const domain = baseDomain(websiteUrl);

    let homepage = "";
    try {
        homepage = await fetchWithTimeout(websiteUrl);
    } catch (e) {
        result.errors.push(`homepage: ${(e as Error).message}`);
        return result;
    }

    result.emails = extractEmails(homepage, domain);
    result.twitters = extractTwitter(homepage).slice(0, MAX_TWITTER_PER_TOOL);
    result.linkedins = extractLinkedIn(homepage).slice(0, MAX_LINKEDIN_PER_TOOL);

    result.contactPage = findSubpath(homepage, websiteUrl, [
        /^\/contact/i, /^\/support/i, /contact[- ]?us/i, /get[- ]in[- ]touch/i,
    ]);
    result.aboutPage = findSubpath(homepage, websiteUrl, [
        /^\/about/i, /about[- ]?us/i, /our[- ]story/i,
    ]);

    // If we didn't get an email from homepage, try contact + about pages.
    if (result.emails.length === 0) {
        for (const sub of [result.contactPage, result.aboutPage]) {
            if (!sub) continue;
            try {
                const html = await fetchWithTimeout(sub);
                const more = extractEmails(html, domain);
                result.emails.push(...more);
                if (result.twitters.length === 0) {
                    result.twitters.push(...extractTwitter(html));
                }
            } catch (e) {
                result.errors.push(`${sub}: ${(e as Error).message}`);
            }
            if (result.emails.length > 0) break;
        }
        result.emails = [...new Set(result.emails)].sort();
        result.twitters = [...new Set(result.twitters)].sort();
    }

    return result;
}

function csvEscape(v: string): string {
    if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
    return v;
}

async function main() {
    console.log("Loading tools from DB...");
    const tools = await prisma.tool.findMany({
        select: { slug: true, title: true, websiteUrl: true },
        orderBy: { title: "asc" },
    });
    console.log(`Found ${tools.length} tools.\n`);

    const results: Contact[] = [];
    let done = 0;
    const CONCURRENCY = 4;

    for (let i = 0; i < tools.length; i += CONCURRENCY) {
        const batch = tools.slice(i, i + CONCURRENCY);
        const batchResults = await Promise.all(
            batch.map(async (t) => {
                const r = await processTool(t.slug, t.title, t.websiteUrl);
                done++;
                const hits =
                    (r.emails.length ? "📧" : " ") +
                    (r.twitters.length ? "🐦" : " ") +
                    (r.linkedins.length ? "💼" : " ");
                console.log(
                    `[${String(done).padStart(2, "0")}/${tools.length}] ${hits}  ${r.title.padEnd(24)} ${r.errors.length ? "⚠ " + r.errors.length : ""}`
                );
                return r;
            })
        );
        results.push(...batchResults);
    }

    // Sort: tools with email first, then twitter, then nothing
    results.sort((a, b) => {
        const score = (r: Contact) =>
            (r.emails.length ? 3 : 0) + (r.twitters.length ? 2 : 0) + (r.linkedins.length ? 1 : 0);
        return score(b) - score(a) || a.title.localeCompare(b.title);
    });

    const header = [
        "Slug", "Title", "Website", "Best Contact",
        "Emails", "Twitter/X", "LinkedIn",
        "Contact Page", "About Page", "Errors",
    ].join(",");

    const rows = results.map((r) => {
        const best = r.emails[0] ?? r.twitters[0] ?? r.contactPage ?? "MANUAL";
        return [
            r.slug, r.title, r.websiteUrl, best,
            r.emails.join("; "),
            r.twitters.join("; "),
            r.linkedins.join("; "),
            r.contactPage ?? "",
            r.aboutPage ?? "",
            r.errors.join(" | "),
        ].map(csvEscape).join(",");
    });

    const outDir = join(process.cwd(), "marketing");
    await mkdir(outDir, { recursive: true });
    const outPath = join(outDir, "tool-contacts.csv");
    await writeFile(outPath, [header, ...rows].join("\n") + "\n", "utf8");

    // Summary
    const withEmail = results.filter((r) => r.emails.length > 0).length;
    const withTwitter = results.filter((r) => r.twitters.length > 0).length;
    const withNothing = results.filter(
        (r) => !r.emails.length && !r.twitters.length && !r.contactPage,
    ).length;

    console.log(`\n✓ ${outPath}`);
    console.log(`  📧 emails:   ${withEmail}/${results.length}`);
    console.log(`  🐦 twitter:  ${withTwitter}/${results.length}`);
    console.log(`  ❌ nothing:  ${withNothing}/${results.length}  (will need manual research)`);

    await prisma.$disconnect();
}

main().catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
});
