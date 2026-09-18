#!/usr/bin/env node
/**
 * Quarterly model & content freshness audit.
 *
 * Scans the blog corpus (lib/blog-data-1.ts .. -4.ts) and the tool mirror
 * (lib/tools.ts) and prints the raw material a human (or another agent)
 * needs to cross-check against vendor primary sources. This script does
 * NOT decide what is stale or wrong — it extracts candidates. Every one
 * of those candidates still needs a human to read the surrounding prose
 * and classify it (e.g. "past-tense history" vs "present-tense claim"),
 * because a bare regex match count has already produced two wrong calls
 * in past audits.
 *
 * SECTIONS
 *   [1] Blog inventory        — post/slug counts, missing `updated`,
 *                                readTime vs. actual word count drift
 *   [2] Model mention inventory — every model-version token found in the
 *                                corpus, grouped by exact string, with the
 *                                posts that mention it (MOST IMPORTANT —
 *                                see the warning printed with this section)
 *   [3] Link inventory        — internal links, dead /blog/<slug> links,
 *                                links missing from the built sitemap
 *                                (needs a prior `next build`), external
 *                                links (for manual spot-checking)
 *   [4] Quantitative claims   — %, Nx multipliers, benchmark names, and
 *                                dollar amounts with surrounding context
 *   [5] Tool URL status       — network only; redirect-follows every tool
 *                                websiteUrl and flags host changes / non-200
 *   [6] Mirror vs. DB diff    — network only; field-by-field comparison of
 *                                lib/tools.ts against the `Tool` table
 *
 * SAFETY MODEL
 *   - 100% read-only. No file is written, no DB row is ever mutated. This
 *     script only ever calls prisma.tool.findMany() — never create/update/
 *     upsert/delete.
 *   - Sections [1]-[4] need no network and no DATABASE_URL, and never
 *     import @prisma/client (the import is dynamic and only reached when
 *     --network is passed), so `node scripts/model-audit.mjs` works from
 *     a laptop on a plane.
 *   - Always exits 0. This is a report, not a CI gate. The only way to
 *     get a non-zero exit is if the blog/tool source files themselves
 *     can't be read or don't parse into a single post/tool (a sign this
 *     script's parser needs updating to match a source format change).
 *
 * USAGE (from the repo root)
 *
 *   Offline sections only ([1]-[4], no DB, no network):
 *     node scripts/model-audit.mjs
 *
 *   Everything, including tool URL checks and the DB mirror diff
 *   (`-r dotenv/config` loads DATABASE_URL from .env, same as the other
 *   scripts in this directory):
 *     node -r dotenv/config scripts/model-audit.mjs --network
 *
 *   Machine-readable output (for another tool/agent to consume):
 *     node scripts/model-audit.mjs --json
 *     node scripts/model-audit.mjs --json | node -e \
 *       "JSON.parse(require('fs').readFileSync(0,'utf8'))"
 *
 *   Just one section (1-6):
 *     node scripts/model-audit.mjs --section=2
 *
 *   node scripts/model-audit.mjs --help
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const BLOG_FILES = [
  "lib/blog-data-1.ts",
  "lib/blog-data-2.ts",
  "lib/blog-data-3.ts",
  "lib/blog-data-4.ts",
];
const TOOLS_FILE = "lib/tools.ts";
const SITEMAP_BODY = ".next/server/app/sitemap.xml.body";

const WORDS_PER_MINUTE = 225;
const READTIME_DRIFT_THRESHOLD_MINUTES = 2; // 1 min is rounding noise; ignore it.

// ---------------------------------------------------------------------------
// [2] Model mention patterns. Add a vendor by adding one entry here — every
// regex must be global (`g`) since we re-use it across many posts.
// ---------------------------------------------------------------------------
const MODEL_PATTERNS = [
  {
    vendor: "OpenAI",
    regex: /GPT-[0-9.]+(?: (?:Sol|Terra|Luna|Astra|Codex|Instant|Vision))?/g,
  },
  {
    vendor: "Anthropic",
    regex: /Claude (?:Opus|Sonnet|Haiku|Fable|Mythos) [0-9.]+/g,
  },
  {
    vendor: "Google",
    regex: /Gemini [0-9.]+(?: (?:Pro|Flash|Flash-Lite|Ultra|Nano))?/g,
  },
  { vendor: "xAI", regex: /Grok [0-9.]+/g },
  { vendor: "Meta", regex: /Llama [0-9.]+/g },
  { vendor: "Mistral AI", regex: /Mistral \w*/g },
  { vendor: "DeepSeek", regex: /DeepSeek[-\w]*/g },
  { vendor: "Alibaba", regex: /Qwen[-\s]?[0-9.]*/g },
];

// ---------------------------------------------------------------------------
// [4] Quantitative claim patterns.
// ---------------------------------------------------------------------------
const BENCHMARK_NAMES = [
  "SWE-bench",
  "MMLU",
  "HumanEval",
  "GPQA",
  "AIME",
  "ARC",
  "Terminal-bench",
  "FrontierMath",
  "Artificial Analysis",
];
const PERCENT_RE = /\d+%/g;
const MULTIPLIER_RE = /\b\d+x\b/gi;
const CURRENCY_RE = /\$\d+(?:\.\d+)?[kKmMbB]?/g;
const BENCHMARK_RE = new RegExp(
  BENCHMARK_NAMES.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
  "g"
);

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function parseArgs(argv) {
  const flags = {
    network: argv.includes("--network"),
    json: argv.includes("--json"),
    help: argv.includes("--help") || argv.includes("-h"),
    sections: null,
  };
  const sectionArg = argv.find((a) => a.startsWith("--section="));
  if (sectionArg) {
    flags.sections = new Set(
      sectionArg
        .slice("--section=".length)
        .split(",")
        .map((s) => Number(s.trim()))
        .filter((n) => Number.isInteger(n))
    );
  }
  return flags;
}

function printHelp() {
  console.log(`model-audit.mjs — quarterly model & content freshness audit (read-only)

Usage:
  node scripts/model-audit.mjs                         Sections [1]-[4], offline
  node -r dotenv/config scripts/model-audit.mjs --network
                                                         Also runs [5] and [6] (needs DATABASE_URL)
  node scripts/model-audit.mjs --json                   Machine-readable output
  node scripts/model-audit.mjs --section=2              Only run section 2
  node scripts/model-audit.mjs --help                   This message

Sections:
  [1] Blog inventory (counts, duplicate slugs, missing 'updated', readTime drift)
  [2] Model mention inventory (needs human context classification — see warning)
  [3] Link inventory (internal/external links, dead /blog/ links, sitemap gap)
  [4] Quantitative claim candidates (%, Nx, benchmarks, $ amounts — needs human filtering)
  [5] Tool URL status                (--network only)
  [6] lib/tools.ts vs. DB field diff (--network only)

This script never writes to any file or database. It always exits 0 unless
the source files fail to parse at all.`);
}

// ---------------------------------------------------------------------------
// Generic "slug: "..."-delimited object" parsing shared by blog posts and
// tools. Both lib/blog-data-*.ts and lib/tools.ts are arrays of object
// literals whose first field is always `slug: "..."`, so splitting the raw
// file text on that boundary reliably isolates one entry per block without
// needing a real TS/JS parser.
// ---------------------------------------------------------------------------
function splitEntries(fileText) {
  const indices = [];
  const re = /\n\s*slug: "/g;
  let m;
  while ((m = re.exec(fileText))) indices.push(m.index);
  const blocks = [];
  for (let i = 0; i < indices.length; i++) {
    const start = indices[i];
    const end = i + 1 < indices.length ? indices[i + 1] : fileText.length;
    blocks.push(fileText.slice(start, end));
  }
  return blocks;
}

/** Unescape the handful of JS string escapes that show up in this corpus. */
function unescapeJs(s) {
  return s.replace(/\\(.)/g, (_, c) => {
    if (c === "n") return "\n";
    if (c === "t") return "\t";
    return c; // \" -> ", \\ -> \, \' -> ', etc.
  });
}

/** Extract a single-line `field: "value"` (handles escaped quotes/backslashes). */
function extractQuotedField(block, name) {
  const re = new RegExp(name + ':\\s*"((?:\\\\.|[^"\\\\])*)"');
  const m = block.match(re);
  return m ? unescapeJs(m[1]) : undefined;
}

/** Extract a single `field: \`...\`` template-literal (content bodies). */
function extractTemplateField(block, name) {
  const re = new RegExp(name + ":\\s*`([\\s\\S]*?)`");
  const m = block.match(re);
  return m ? m[1] : undefined;
}

/** Extract a `field: ["a", "b", ...]` string array (may span multiple lines). */
function extractStringArray(block, name) {
  const re = new RegExp(name + ":\\s*\\[([\\s\\S]*?)\\]");
  const m = block.match(re);
  if (!m) return undefined;
  const items = [];
  const itemRe = /"((?:\\.|[^"\\])*)"/g;
  let mm;
  while ((mm = itemRe.exec(m[1]))) items.push(unescapeJs(mm[1]));
  return items;
}

function extractFaq(block) {
  const faqMatch = block.match(/faq:\s*\[([\s\S]*?)\n\s*\]/);
  if (!faqMatch) return [];
  const faqText = faqMatch[1];
  const entries = [];
  const re = /q:\s*"((?:\\.|[^"\\])*)"[\s\S]*?a:\s*"((?:\\.|[^"\\])*)"/g;
  let m;
  while ((m = re.exec(faqText))) {
    entries.push({ q: unescapeJs(m[1]), a: unescapeJs(m[2]) });
  }
  return entries;
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&ldquo;/g, "\u201c")
    .replace(/&rdquo;/g, "\u201d")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

// ---------------------------------------------------------------------------
// Load & parse the blog corpus.
// ---------------------------------------------------------------------------
function loadPosts() {
  const posts = [];
  for (const rel of BLOG_FILES) {
    const abs = path.join(ROOT, rel);
    const text = readFileSync(abs, "utf8");
    const blocks = splitEntries(text);
    for (const block of blocks) {
      const slug = extractQuotedField(block, "slug");
      if (!slug) continue;
      const rawContent = extractTemplateField(block, "content") ?? "";
      const faq = extractFaq(block);
      const strippedContent = stripHtml(rawContent);
      const faqText = faq.map((f) => `${f.q} ${f.a}`).join(" ");
      posts.push({
        file: rel,
        slug,
        title: extractQuotedField(block, "title") ?? "",
        excerpt: extractQuotedField(block, "excerpt") ?? "",
        date: extractQuotedField(block, "date"),
        updated: extractQuotedField(block, "updated"),
        readTime: extractQuotedField(block, "readTime"),
        rawContent,
        strippedContent,
        faq,
        faqText,
        // Everything a human or reader would actually see as prose, used
        // for word counts, model-mention scanning, and claim extraction.
        searchText: [
          extractQuotedField(block, "title") ?? "",
          extractQuotedField(block, "excerpt") ?? "",
          strippedContent,
          faqText,
        ].join(" "),
        rawBlock: block,
      });
    }
  }
  return posts;
}

function loadTools() {
  const abs = path.join(ROOT, TOOLS_FILE);
  const text = readFileSync(abs, "utf8");
  const blocks = splitEntries(text);
  const tools = [];
  for (const block of blocks) {
    const slug = extractQuotedField(block, "slug");
    if (!slug) continue;
    tools.push({
      slug,
      title: extractQuotedField(block, "title"),
      description: extractQuotedField(block, "description"),
      pricing: extractQuotedField(block, "pricing"),
      features: extractStringArray(block, "features") ?? [],
    });
  }
  return tools;
}

// ---------------------------------------------------------------------------
// [1] Blog inventory
// ---------------------------------------------------------------------------
function runSection1(posts) {
  const bySlug = new Map();
  for (const p of posts) {
    bySlug.set(p.slug, (bySlug.get(p.slug) || 0) + 1);
  }
  const duplicateSlugs = [...bySlug.entries()].filter(([, n]) => n > 1);
  const missingUpdated = posts.filter((p) => !p.updated).map((p) => p.slug);

  const readTimeDrift = [];
  for (const p of posts) {
    const stated = p.readTime ? parseInt(p.readTime, 10) : NaN;
    if (Number.isNaN(stated)) {
      readTimeDrift.push({
        slug: p.slug,
        stated: p.readTime ?? "(missing)",
        actualMinutes: null,
        diff: null,
        note: "could not parse a leading number from readTime",
      });
      continue;
    }
    const words = countWords(p.strippedContent) + countWords(p.faqText);
    const actualMinutes = Math.round(words / WORDS_PER_MINUTE);
    const diff = Math.abs(actualMinutes - stated);
    if (diff >= READTIME_DRIFT_THRESHOLD_MINUTES) {
      readTimeDrift.push({
        slug: p.slug,
        stated: `${stated} min`,
        words,
        actualMinutes: `${actualMinutes} min`,
        diff,
      });
    }
  }
  readTimeDrift.sort((a, b) => (b.diff ?? 0) - (a.diff ?? 0));

  return {
    totalPosts: posts.length,
    perFile: BLOG_FILES.map((f) => ({
      file: f,
      count: posts.filter((p) => p.file === f).length,
    })),
    duplicateSlugs: duplicateSlugs.map(([slug, count]) => ({ slug, count })),
    missingUpdated,
    readTimeDrift,
  };
}

function printSection1(r) {
  console.log("\n=== [1] Blog Inventory ===");
  console.log(`Total posts: ${r.totalPosts}`);
  for (const f of r.perFile) console.log(`  ${f.file}: ${f.count}`);
  console.log(`Duplicate slugs: ${r.duplicateSlugs.length}`);
  for (const d of r.duplicateSlugs) console.log(`  - ${d.slug} (${d.count}x)`);
  console.log(`Missing 'updated': ${r.missingUpdated.length}`);
  for (const s of r.missingUpdated) console.log(`  - ${s}`);
  console.log(
    `readTime drift >= ${READTIME_DRIFT_THRESHOLD_MINUTES} min: ${r.readTimeDrift.length}`
  );
  for (const d of r.readTimeDrift) {
    console.log(
      `  - ${d.slug}: stated ${d.stated}, actual ~${d.actualMinutes ?? "?"}${
        d.words ? ` (${d.words} words)` : ""
      }${d.note ? ` [${d.note}]` : ""}`
    );
  }
}

// ---------------------------------------------------------------------------
// [2] Model mention inventory
// ---------------------------------------------------------------------------
function runSection2(posts) {
  const mentions = new Map(); // matched string -> { vendor, count, slugs: Set }
  for (const p of posts) {
    for (const { vendor, regex } of MODEL_PATTERNS) {
      regex.lastIndex = 0;
      let m;
      while ((m = regex.exec(p.searchText))) {
        // `[0-9.]+` greedily swallows a sentence-final period after a bare
        // version number (e.g. "...alongside Grok 4.6." -> "Grok 4.6."), which
        // would otherwise fork the same model into two buckets. Trim it.
        const key = m[0].trim().replace(/(\d)\.$/, "$1");
        if (!key) continue;
        if (!mentions.has(key)) {
          mentions.set(key, { vendor, count: 0, slugs: new Set() });
        }
        const entry = mentions.get(key);
        entry.count += 1;
        entry.slugs.add(p.slug);
      }
    }
  }
  const rows = [...mentions.entries()]
    .map(([model, v]) => ({
      model,
      vendor: v.vendor,
      count: v.count,
      posts: [...v.slugs].sort(),
    }))
    .sort((a, b) => b.count - a.count || a.model.localeCompare(b.model));

  return {
    warning:
      "Counts are for prioritization ONLY. Read every mention in context: " +
      "past-tense/historical references (\"the previous generation, X, is still available\") " +
      "are not the same as present-tense current-flagship claims. This audit has mis-scored " +
      "mentions twice by trusting the count alone — always open the post and read the sentence.",
    uniqueModels: rows.length,
    totalMentions: rows.reduce((sum, r) => sum + r.count, 0),
    rows,
  };
}

function printSection2(r) {
  console.log("\n=== [2] Model Mention Inventory ===");
  console.log(`WARNING: ${r.warning}\n`);
  console.log(`Unique model tokens: ${r.uniqueModels}, total mentions: ${r.totalMentions}`);
  for (const row of r.rows) {
    console.log(`  - ${row.model}  [${row.vendor}]  x${row.count}`);
    console.log(`      posts: ${row.posts.join(", ")}`);
  }
}

// ---------------------------------------------------------------------------
// [3] Link inventory
// ---------------------------------------------------------------------------
function runSection3(posts) {
  const knownSlugs = new Set(posts.map((p) => p.slug));
  const internalCounts = new Map();
  const externalSet = new Set();
  const deadBlogLinks = [];

  for (const p of posts) {
    const internalRe = /href="(\/[^"#?]*)/g;
    let m;
    while ((m = internalRe.exec(p.rawBlock))) {
      const href = m[1];
      internalCounts.set(href, (internalCounts.get(href) || 0) + 1);
      const blogMatch = href.match(/^\/blog\/([a-z0-9-]+)/);
      if (blogMatch && !knownSlugs.has(blogMatch[1])) {
        deadBlogLinks.push({ from: p.slug, href });
      }
    }
    const externalRe = /href="(https?:\/\/[^"]*)"/g;
    while ((m = externalRe.exec(p.rawBlock))) externalSet.add(m[1]);
  }

  const internalLinks = [...internalCounts.entries()]
    .map(([href, count]) => ({ href, count }))
    .sort((a, b) => b.count - a.count || a.href.localeCompare(b.href));

  // Sitemap cross-check — only possible after `next build` has produced
  // .next/server/app/sitemap.xml.body. Skip gracefully otherwise.
  const sitemapPath = path.join(ROOT, SITEMAP_BODY);
  let sitemapChecked = false;
  let missingFromSitemap = [];
  if (existsSync(sitemapPath)) {
    sitemapChecked = true;
    const xml = readFileSync(sitemapPath, "utf8");
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const paths = new Set(
      locs.map((loc) => {
        try {
          const u = new URL(loc);
          return u.pathname === "" ? "/" : u.pathname;
        } catch {
          return loc;
        }
      })
    );
    missingFromSitemap = internalLinks
      .map((l) => l.href)
      .filter((href) => !paths.has(href))
      .sort();
  }

  return {
    internalLinks,
    deadBlogLinks,
    externalLinks: [...externalSet].sort(),
    sitemapChecked,
    missingFromSitemap,
  };
}

function printSection3(r) {
  console.log("\n=== [3] Link Inventory ===");
  console.log(`Unique internal links: ${r.internalLinks.length}`);
  for (const l of r.internalLinks.slice(0, 30)) {
    console.log(`  - ${l.href}  (x${l.count})`);
  }
  if (r.internalLinks.length > 30) {
    console.log(`  ... and ${r.internalLinks.length - 30} more`);
  }
  console.log(`\nDead /blog/<slug> links: ${r.deadBlogLinks.length}`);
  for (const d of r.deadBlogLinks) console.log(`  - ${d.href}  (linked from ${d.from})`);

  if (r.sitemapChecked) {
    console.log(`\nInternal links missing from sitemap: ${r.missingFromSitemap.length}`);
    for (const href of r.missingFromSitemap) console.log(`  - ${href}`);
  } else {
    console.log(
      `\nSitemap cross-check skipped: ${SITEMAP_BODY} not found. Run \`next build\` and re-run this script to compare.`
    );
  }

  console.log(`\nExternal links (${r.externalLinks.length}, for manual spot-check):`);
  for (const href of r.externalLinks) console.log(`  - ${href}`);
}

// ---------------------------------------------------------------------------
// [4] Quantitative claim candidates
// ---------------------------------------------------------------------------
function collectMatches(text, regex, slug, results) {
  regex.lastIndex = 0;
  let m;
  while ((m = regex.exec(text))) {
    const start = Math.max(0, m.index - 60);
    const end = Math.min(text.length, m.index + m[0].length + 60);
    results.push({ slug, match: m[0], context: text.slice(start, end).trim() });
    if (regex.lastIndex === m.index) regex.lastIndex++; // guard zero-width matches
  }
}

function runSection4(posts) {
  const percent = [];
  const multiplier = [];
  const benchmark = [];
  const currency = [];
  for (const p of posts) {
    collectMatches(p.searchText, PERCENT_RE, p.slug, percent);
    collectMatches(p.searchText, MULTIPLIER_RE, p.slug, multiplier);
    collectMatches(p.searchText, BENCHMARK_RE, p.slug, benchmark);
    collectMatches(p.searchText, CURRENCY_RE, p.slug, currency);
  }
  return {
    warning:
      "Most of these are rhetorical, not factual claims (\"90% of the work\", \"10x faster\" " +
      "used loosely). A human must read each context and discard the rhetoric before treating " +
      "any of this as a claim that needs a citation or correction.",
    counts: {
      percent: percent.length,
      multiplier: multiplier.length,
      benchmark: benchmark.length,
      currency: currency.length,
    },
    percent,
    multiplier,
    benchmark,
    currency,
  };
}

function printSection4(r) {
  console.log("\n=== [4] Quantitative Claim Candidates ===");
  console.log(`WARNING: ${r.warning}\n`);
  console.log(
    `Counts — percent: ${r.counts.percent}, multiplier: ${r.counts.multiplier}, ` +
      `benchmark: ${r.counts.benchmark}, currency: ${r.counts.currency}`
  );
  const printGroup = (label, items) => {
    console.log(`\n${label} (${items.length}):`);
    for (const it of items) {
      console.log(`  - [${it.slug}] "${it.match}" ... ${it.context}`);
    }
  };
  printGroup("Percentages", r.percent);
  printGroup("Multipliers", r.multiplier);
  printGroup("Benchmarks", r.benchmark);
  printGroup("Currency amounts", r.currency);
}

// ---------------------------------------------------------------------------
// [5] Tool URL status (--network)
// ---------------------------------------------------------------------------
async function checkUrl(url) {
  try {
    const { stdout } = await execFileAsync(
      "curl",
      [
        "-sL",
        "-o",
        "/dev/null",
        "--max-time",
        "20",
        "-w",
        "%{http_code} %{url_effective}",
        url,
      ],
      { timeout: 25000 }
    );
    const [codeStr, ...rest] = stdout.trim().split(" ");
    const status = Number(codeStr);
    const finalUrl = rest.join(" ");
    return { status: Number.isNaN(status) ? null : status, finalUrl };
  } catch (err) {
    return { status: null, finalUrl: null, error: err.message };
  }
}

function hostnameOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

async function runSection5() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  try {
    const tools = await prisma.tool.findMany({
      select: { slug: true, websiteUrl: true },
      orderBy: { slug: "asc" },
    });

    const results = [];
    // Sequential on purpose: this is a quarterly, human-attended script, not
    // a hot path, and sequential requests are far less likely to trip bot
    // detection than a burst of concurrent ones.
    for (const tool of tools) {
      const { status, finalUrl, error } = await checkUrl(tool.websiteUrl);
      const originalHost = hostnameOf(tool.websiteUrl);
      const finalHost = finalUrl ? hostnameOf(finalUrl) : null;

      let flag = "OK";
      if (error || status === null || status === 403 || status === 0) {
        flag = "MANUAL_BROWSER_CHECK_NEEDED";
      } else if (status !== 200) {
        flag = "NON_200";
      } else if (originalHost && finalHost && originalHost !== finalHost) {
        flag = "HOST_CHANGED";
      }

      if (flag !== "OK") {
        results.push({
          slug: tool.slug,
          websiteUrl: tool.websiteUrl,
          status,
          finalUrl,
          error,
          flag,
        });
      }
    }

    return {
      note:
        "Many sites 403/000 to curl because they bot-block non-browser clients " +
        "(adobe.com did this in a prior audit while working fine in a real browser). " +
        "MANUAL_BROWSER_CHECK_NEEDED entries are NOT confirmed-dead sites — verify by hand.",
      totalChecked: tools.length,
      flagged: results,
    };
  } finally {
    await prisma.$disconnect();
  }
}

function printSection5(r) {
  console.log("\n=== [5] Tool URL Status (--network) ===");
  console.log(`NOTE: ${r.note}\n`);
  console.log(`Checked ${r.totalChecked} tool URLs, ${r.flagged.length} flagged.`);
  for (const f of r.flagged) {
    console.log(
      `  - [${f.flag}] ${f.slug}: ${f.websiteUrl} -> status=${f.status ?? "?"} finalUrl=${
        f.finalUrl ?? "?"
      }${f.error ? ` error=${f.error}` : ""}`
    );
  }
}

// ---------------------------------------------------------------------------
// [6] Mirror vs. DB field diff (--network)
// ---------------------------------------------------------------------------
async function runSection6() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  try {
    const localTools = loadTools();
    const dbTools = await prisma.tool.findMany({
      select: { slug: true, description: true, pricing: true, features: true },
    });
    const dbBySlug = new Map(dbTools.map((t) => [t.slug, t]));

    // Field-by-field comparison, not a grep for known-stale strings. Grepping
    // for a specific stale phrase only ever catches the phrase you already
    // knew about; comparing every field of every row catches drift you
    // didn't know to look for. A prior audit relying on grep missed three
    // real mismatches that this comparison caught.
    const mismatches = [];
    const missingInDb = [];
    for (const local of localTools) {
      const db = dbBySlug.get(local.slug);
      if (!db) {
        missingInDb.push(local.slug);
        continue;
      }
      const fieldDiffs = [];
      if ((local.description ?? "") !== (db.description ?? "")) {
        fieldDiffs.push({ field: "description", local: local.description, db: db.description });
      }
      if ((local.pricing ?? "") !== (db.pricing ?? "")) {
        fieldDiffs.push({ field: "pricing", local: local.pricing, db: db.pricing });
      }
      const localFeatures = local.features ?? [];
      const dbFeatures = db.features ?? [];
      if (JSON.stringify(localFeatures) !== JSON.stringify(dbFeatures)) {
        fieldDiffs.push({ field: "features", local: localFeatures, db: dbFeatures });
      }
      if (fieldDiffs.length > 0) {
        mismatches.push({ slug: local.slug, fieldDiffs });
      }
    }

    const localSlugs = new Set(localTools.map((t) => t.slug));
    const missingInMirror = dbTools
      .map((t) => t.slug)
      .filter((slug) => !localSlugs.has(slug));

    return { mismatches, missingInDb, missingInMirror };
  } finally {
    await prisma.$disconnect();
  }
}

function printSection6(r) {
  console.log("\n=== [6] lib/tools.ts vs. DB Field Diff (--network) ===");
  console.log(`Field-level mismatches: ${r.mismatches.length}`);
  for (const m of r.mismatches) {
    console.log(`  - ${m.slug}:`);
    for (const d of m.fieldDiffs) {
      console.log(`      ${d.field}:`);
      console.log(`        local: ${JSON.stringify(d.local)}`);
      console.log(`        db:    ${JSON.stringify(d.db)}`);
    }
  }
  if (r.missingInDb.length > 0) {
    console.log(`\nIn lib/tools.ts but not in DB: ${r.missingInDb.join(", ")}`);
  }
  if (r.missingInMirror.length > 0) {
    console.log(`\nIn DB but not in lib/tools.ts: ${r.missingInMirror.join(", ")}`);
  }
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------
async function main() {
  const flags = parseArgs(process.argv.slice(2));

  if (flags.help) {
    printHelp();
    return;
  }

  const wantSection = (n) => !flags.sections || flags.sections.has(n);

  let posts;
  try {
    posts = loadPosts();
    if (posts.length === 0) {
      throw new Error("parsed zero posts from lib/blog-data-*.ts — parser is out of sync with source format");
    }
  } catch (err) {
    console.error("model-audit: fatal error parsing blog corpus:", err.message);
    process.exit(1);
  }

  const report = {};

  if (wantSection(1)) report.section1 = runSection1(posts);
  if (wantSection(2)) report.section2 = runSection2(posts);
  if (wantSection(3)) report.section3 = runSection3(posts);
  if (wantSection(4)) report.section4 = runSection4(posts);

  if (flags.network) {
    if (wantSection(5)) {
      try {
        report.section5 = await runSection5();
      } catch (err) {
        report.section5 = { error: `Section 5 failed: ${err.message}` };
      }
    }
    if (wantSection(6)) {
      try {
        report.section6 = await runSection6();
      } catch (err) {
        report.section6 = { error: `Section 6 failed: ${err.message}` };
      }
    }
  } else if (wantSection(5) || wantSection(6)) {
    if (!flags.sections || flags.sections.has(5)) {
      report.section5 = { skipped: "pass --network to run tool URL checks" };
    }
    if (!flags.sections || flags.sections.has(6)) {
      report.section6 = { skipped: "pass --network to run the mirror/DB diff" };
    }
  }

  if (flags.json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log("MODEL & CONTENT FRESHNESS AUDIT");
  console.log(`Generated: ${new Date().toISOString()}`);
  console.log(
    "This is a read-only report of material to verify against vendor primary sources. It does not judge accuracy itself."
  );

  if (report.section1) printSection1(report.section1);
  if (report.section2) printSection2(report.section2);
  if (report.section3) printSection3(report.section3);
  if (report.section4) printSection4(report.section4);
  if (report.section5) {
    if (report.section5.skipped) {
      console.log(`\n=== [5] Tool URL Status ===\nSkipped: ${report.section5.skipped}`);
    } else if (report.section5.error) {
      console.log(`\n=== [5] Tool URL Status ===\nERROR: ${report.section5.error}`);
    } else {
      printSection5(report.section5);
    }
  }
  if (report.section6) {
    if (report.section6.skipped) {
      console.log(`\n=== [6] Mirror vs. DB Diff ===\nSkipped: ${report.section6.skipped}`);
    } else if (report.section6.error) {
      console.log(`\n=== [6] Mirror vs. DB Diff ===\nERROR: ${report.section6.error}`);
    } else {
      printSection6(report.section6);
    }
  }

  console.log("\nDone. Reminder: this script only extracts candidates — verify against vendor sources before editing content.");
}

main().catch((err) => {
  console.error("model-audit: unexpected fatal error:", err);
  process.exit(1);
});
