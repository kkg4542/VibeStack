import { prisma } from "./prisma";
import { ToolData } from "@/lib/tool-types";
import { tools } from "./tools";

/**
 * Curated popularity ranking. Tools appear in this order at the top of every
 * listing (tools page, /best pages, etc.); anything not listed falls after,
 * sorted alphabetically. Edit this list to re-rank the directory.
 */
export const POPULARITY_ORDER: string[] = [
    "chatgpt",
    "claude",
    "cursor",
    "github-copilot",
    "midjourney",
    "perplexity",
    "notion-ai",
    "v0-by-vercel",
    "bolt-new",
    "windsurf-ide",
    "elevenlabs",
    "runway",
    "framer",
    "linear",
    "vercel",
    "replit",
    "descript",
    "devin-ai",
    "openai-sora",
    "galileo-ai",
];

function popularityRank(slug: string): number {
    const i = POPULARITY_ORDER.indexOf(slug);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
}

/** Sort by curated popularity, then alphabetically by title for the rest. */
export function sortByPopularity(list: ToolData[]): ToolData[] {
    return [...list].sort((a, b) => {
        const ra = popularityRank(a.slug);
        const rb = popularityRank(b.slug);
        if (ra !== rb) return ra - rb;
        return a.title.localeCompare(b.title);
    });
}

/**
 * Floor for how many rows the production `Tool` table is expected to hold.
 * Static generation is strict about this: `/tool/[slug]` runs with
 * `dynamicParams = false`, so any tool missing from the build-time query is
 * deployed as a hard 404 instead of being rendered on demand (and drops out of
 * the sitemap along with its comparison pages). Silently shipping a half-sized
 * directory is worse than a failed deploy, so a short read makes the build throw.
 *
 * The in-repo fallback array (`lib/tools.ts`) currently holds ~21 tools while
 * the database holds 48; this floor sits above the fallback so a fallback (or a
 * build pointed at an empty/seed database) can never pass unnoticed.
 * Update this number if the directory is ever intentionally trimmed.
 */
export const MIN_EXPECTED_TOOLS = 40;

/** True while `next build` is prerendering (set by Next.js in the build workers). */
function isBuildPhase(): boolean {
    return process.env.NEXT_PHASE === "phase-production-build";
}

function mapTool(tool: Awaited<ReturnType<typeof prisma.tool.findMany>>[number]): ToolData {
    return {
        slug: tool.slug,
        title: tool.title,
        description: tool.description,
        category: tool.category as "Coding" | "Management" | "Productivity" | "Assistance" | "Design" | "Other",
        pricing: tool.pricing as "Free" | "Freemium" | "Paid" | "Enterprise",
        websiteUrl: tool.websiteUrl,
        affiliateUrl: tool.affiliateUrl || undefined,
        features: tool.features,
        color: tool.color || "text-foreground",
        bgGradient: tool.bgGradient || "from-transparent to-transparent",
        pros: tool.pros,
        cons: tool.cons,
        isFeatured: tool.isFeatured,
        adCopy: undefined,
        updatedAt: tool.updatedAt?.toISOString(),
        createdAt: tool.createdAt?.toISOString(),
    };
}

/**
 * Prisma error codes that describe a *transient* failure — the database is
 * reachable in principle, this particular attempt just lost a race. Anything
 * else (bad credentials, missing table, malformed query) is a hard failure and
 * is rethrown immediately instead of burning retries.
 *
 * P2024 is the one that actually bites during `next build`: with
 * `connection_limit=1` a burst of concurrent prerenders queues on a single
 * pooled connection and the losers time out.
 */
const TRANSIENT_PRISMA_CODES = new Set([
    "P2024", // Timed out fetching a new connection from the connection pool
    "P1001", // Can't reach database server
    "P1002", // Database server reached but timed out
    "P1008", // Operation timed out
    "P1017", // Server has closed the connection
]);

/**
 * Fallback detection by message. Needed because `PrismaClientInitializationError`
 * declares `errorCode` but frequently leaves it `undefined` (verified with
 * Prisma 5.22 against an unreachable host), so code matching alone misses the
 * "can't reach database server" class of transient network blips.
 */
const TRANSIENT_MESSAGE_PATTERN =
    /connection pool|timed out|can't reach database server|ECONNRESET|ETIMEDOUT|ECONNREFUSED|EPIPE|connection closed|server has closed/i;

function isTransientDbError(error: unknown): boolean {
    // PrismaClientKnownRequestError exposes `code`; PrismaClientInitializationError
    // (P1001 & friends) exposes `errorCode`. Check both.
    const candidate = error as { code?: unknown; errorCode?: unknown } | null;
    for (const code of [candidate?.code, candidate?.errorCode]) {
        if (typeof code === "string" && TRANSIENT_PRISMA_CODES.has(code)) return true;
    }
    return error instanceof Error && TRANSIENT_MESSAGE_PATTERN.test(error.message);
}

/** Total attempts (1 initial + 2 retries) for the tool-list read. */
const DB_RETRY_ATTEMPTS = 3;
/** Backoff base; attempt N waits ~BASE * 2^(N-1) ms plus jitter. */
const DB_RETRY_BASE_DELAY_MS = 300;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * `prisma.tool.findMany()` with a short exponential backoff for transient
 * failures (pool timeouts, dropped connections).
 *
 * This narrows the window where a momentary pool contention spike kills a build
 * without ever masking a real outage: once the attempts are exhausted the last
 * error is rethrown unchanged, so callers still fail loudly.
 */
async function findManyToolsWithRetry(context: string) {
    let lastError: unknown;

    for (let attempt = 1; attempt <= DB_RETRY_ATTEMPTS; attempt++) {
        try {
            return await prisma.tool.findMany();
        } catch (error) {
            lastError = error;

            const isLastAttempt = attempt === DB_RETRY_ATTEMPTS;
            if (isLastAttempt || !isTransientDbError(error)) break;

            const delay = DB_RETRY_BASE_DELAY_MS * 2 ** (attempt - 1) + Math.floor(Math.random() * 100);
            console.warn(
                `[${context}] Tool query attempt ${attempt}/${DB_RETRY_ATTEMPTS} failed with a transient error ` +
                `(${error instanceof Error ? error.message.split("\n").filter(Boolean).slice(-1)[0]?.trim() : String(error)}). ` +
                `Retrying in ${delay}ms.`
            );
            await sleep(delay);
        }
    }

    throw lastError;
}

/** The strict read itself — see {@link getToolsStrict} for the contract. */
async function loadToolsStrict(context: string): Promise<ToolData[]> {
    let dbTools: Awaited<ReturnType<typeof prisma.tool.findMany>>;
    try {
        dbTools = await findManyToolsWithRetry(context);
    } catch (error) {
        throw new Error(
            `[${context}] Tool database query failed after ${DB_RETRY_ATTEMPTS} attempt(s), so the set of tool URLs cannot be determined. ` +
            `Refusing to build a partial site (the pages missing from generateStaticParams() would ship as hard 404s). ` +
            `Check DATABASE_URL. Cause: ${error instanceof Error ? error.message : String(error)}`,
            { cause: error }
        );
    }

    if (dbTools.length < MIN_EXPECTED_TOOLS) {
        throw new Error(
            `[${context}] Tool database returned ${dbTools.length} tools but at least ${MIN_EXPECTED_TOOLS} were expected ` +
            `(in-repo fallback array holds ${tools.length}). ` +
            `Refusing to build: the missing tool pages would ship as hard 404s and drop out of the sitemap. ` +
            `Either the build is pointed at the wrong/empty database, or the directory shrank on purpose — ` +
            `in that case lower MIN_EXPECTED_TOOLS in lib/tools-db.ts.`
        );
    }

    return sortByPopularity(dbTools.map(mapTool));
}

/**
 * Build-phase memo for the strict read.
 *
 * The tool table cannot change during a single `next build`, but ~200 call
 * sites read it (every `/compare/[slug]`, `/tool/[slug]`, `/blog/[slug]`,
 * `/best/[category]` render plus their `generateMetadata`). With
 * `connection_limit=1` those concurrent reads queue on one pooled connection
 * and the losers die with Prisma P2024 — a build that fails for no reason other
 * than its own fan-out.
 *
 * Keyed off `globalThis` with a registered symbol rather than a plain module
 * variable: Next.js compiles each route into its own server bundle, so a module
 * variable can end up duplicated per bundle even inside one worker process.
 * `Symbol.for` is process-wide, so every route in a worker shares one query.
 *
 * The promise is stored (not the value) so concurrent callers dedupe rather
 * than racing. Rejections are cached deliberately: `findManyToolsWithRetry()`
 * has already retried, so a failure that reaches here is real and every
 * subsequent caller should fail immediately instead of re-running a doomed
 * query ~200 more times.
 *
 * Only active during the build phase — at runtime each request must be free to
 * see fresh data.
 */
const BUILD_TOOLS_CACHE_KEY = Symbol.for("vibestack.buildTimeToolsPromise");

type BuildToolsCache = { [BUILD_TOOLS_CACHE_KEY]?: Promise<ToolData[]> };

function buildTimeTools(context: string): Promise<ToolData[]> {
    const store = globalThis as typeof globalThis & BuildToolsCache;
    const cached = store[BUILD_TOOLS_CACHE_KEY];
    if (cached) return cached;

    const pending = loadToolsStrict(context);
    store[BUILD_TOOLS_CACHE_KEY] = pending;
    return pending;
}

/**
 * Database read with **no fallback**. Throws if the query fails or returns
 * fewer than {@link MIN_EXPECTED_TOOLS} rows.
 *
 * Use this anywhere the result decides which URLs exist — `generateStaticParams()`
 * and `app/sitemap.ts`. Never use it in a page body: request-time resilience is
 * what `getTools()` is for.
 *
 * During `next build` the result is memoized per worker process (see
 * {@link buildTimeTools}); a fresh copy of the array is handed to each caller so
 * nobody can reorder the shared list in place.
 */
export async function getToolsStrict(context: string): Promise<ToolData[]> {
    if (!isBuildPhase()) return loadToolsStrict(context);
    return [...(await buildTimeTools(context))];
}

/**
 * Database read with a request-time safety net: if the query fails at runtime we
 * serve the in-repo tool array so a transient outage degrades instead of 500ing.
 *
 * During `next build` that safety net is disabled — a fallback there would bake
 * a half-sized directory into the deployment.
 */
export async function getTools(): Promise<ToolData[]> {
    // At build time every caller ultimately feeds prerendered output, so apply the
    // same strictness as getToolsStrict(). Verified: NEXT_PHASE is set for every
    // build-time call, including /compare/[slug]'s generateStaticParams and the
    // homepage, so a fallback can never get baked into the deployment.
    if (isBuildPhase()) return getToolsStrict("getTools");

    try {
        const dbTools = await prisma.tool.findMany();
        return sortByPopularity(dbTools.map(mapTool));
    } catch (error) {
        console.error(
            `Failed to fetch tools from database, falling back to the in-repo array (${tools.length} tools):`,
            error
        );
        if (tools && tools.length > 0) return sortByPopularity(tools); // Fallback to hardcoded array
        return []; // Fallback to empty array so a request can still be served
    }
}

export async function getToolBySlug(slug: string): Promise<ToolData | null> {

    // At build time, serve from the memoized full-table read instead of issuing
    // one findUnique per prerendered page (48 tool pages × page + metadata + OG
    // image ≈ 140 extra queries competing for the same single pooled connection).
    // Same source table, same mapping, so the result is identical — and it stays
    // strict: a failed read throws rather than silently falling back to the
    // in-repo array, which with dynamicParams = false would ship hard 404s.
    if (isBuildPhase()) {
        const all = await buildTimeTools(`getToolBySlug(${slug})`);
        return all.find((t) => t.slug === slug) ?? null;
    }

    try {
        const tool = await prisma.tool.findUnique({ where: { slug } });
        if (!tool) return null;
        return {
            slug: tool.slug,
            title: tool.title,
            description: tool.description,
            category: tool.category as "Coding" | "Management" | "Productivity" | "Assistance" | "Design" | "Other",
            pricing: tool.pricing as "Free" | "Freemium" | "Paid" | "Enterprise",
            websiteUrl: tool.websiteUrl,
            affiliateUrl: tool.affiliateUrl || undefined,
            features: tool.features,
            color: tool.color || "text-foreground",
            bgGradient: tool.bgGradient || "from-transparent to-transparent",
            pros: tool.pros,
            cons: tool.cons,
            isFeatured: tool.isFeatured,
            adCopy: undefined,
            updatedAt: tool.updatedAt?.toISOString(),
            createdAt: tool.createdAt?.toISOString(),
        };
    } catch (error) {
        console.error(`Failed to fetch tool ${slug} from database:`, error);
        return tools.find(t => t.slug === slug) || null;
    }
}
