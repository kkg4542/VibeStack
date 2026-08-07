/* ============================================================================
 * !!! DO NOT RUN THIS TO "REFRESH" DESCRIPTIONS. !!!
 *
 * Same hazard as the .mjs twin: buildDescription() emits filler copy
 *   "<Title> is an ai <category> tool built for practical workflows.
 *    Core capabilities include A, B, C."
 * which once shipped to production as the <meta name="description"> on
 * /tool/{slug} and the Overview lede on /compare/{slug}. Cleanup lives in
 * scripts/fix-placeholder-tool-descriptions.mjs.
 *
 * Guards added so it cannot clobber human-written copy again:
 *   1. Dry run is the default; writes require --apply.
 *   2. A row is skipped unless its description is empty or already filler.
 * Do not remove those guards. Write real descriptions by hand instead.
 * ==========================================================================*/
import { prisma } from "@/lib/prisma";

/** Matches copy previously emitted by buildDescription(). */
const PLACEHOLDER_PATTERN =
    /\bis an ai [a-z0-9 .+/-]+ tool built for practical workflows\./i;

/** True only for rows that are safe to overwrite: empty or already filler. */
function isSafeToOverwrite(description: string): boolean {
    const current = (description || "").trim();
    if (current.length === 0) return true;
    return PLACEHOLDER_PATTERN.test(current);
}

type ToolRow = {
    id: string;
    title: string;
    category: string;
    features: string[];
    pricing: string;
    description: string;
};

function normalizeCategory(category: string): string {
    if (!category) return "productivity";
    const trimmed = category.trim();
    if (/ai/i.test(trimmed)) return trimmed;
    return `AI ${trimmed}`;
}

function pickFeatures(features: string[], max: number): string[] {
    const clean = (features || [])
        .map((f) => f?.trim())
        .filter((f): f is string => !!f);
    const unique = Array.from(new Set(clean));
    return unique.slice(0, max);
}

function buildDescription(tool: ToolRow): string {
    const category = normalizeCategory(tool.category);
    const features = pickFeatures(tool.features, 3);

    const base = `${tool.title} is an ${category.toLowerCase()} tool built for practical workflows.`;
    if (features.length >= 2) {
        const featureList = features.join(", ");
        return `${base} Core capabilities include ${featureList}.`;
    }
    if (features.length === 1) {
        return `${base} Core capability: ${features[0]}.`;
    }
    return `${base} It focuses on getting results without unnecessary complexity.`;
}

async function main() {
    // Writes require an explicit --apply. A bare run is a preview.
    const dryRun = !process.argv.includes("--apply");

    const tools = await prisma.tool.findMany({
        select: {
            id: true,
            title: true,
            category: true,
            features: true,
            pricing: true,
            description: true,
        },
        orderBy: { title: "asc" },
    });

    // GUARD: never touch a tool that already has real, human-written copy.
    const protectedTools = tools.filter((tool) => !isSafeToOverwrite(tool.description));
    const updates = tools
        .filter((tool) => isSafeToOverwrite(tool.description))
        .map((tool) => {
            const nextDescription = buildDescription(tool);
            return { id: tool.id, nextDescription, prevDescription: tool.description, title: tool.title };
        });

    console.log(
        `Protected ${protectedTools.length} tool(s) with human-written descriptions (untouched).`
    );

    if (dryRun) {
        console.log(`Dry run: ${updates.length} tool(s) eligible. Pass --apply to write.`);
        updates.slice(0, 10).forEach((u) => {
            console.log(`- ${u.title}`);
            console.log(`  before: ${u.prevDescription}`);
            console.log(`  after:  ${u.nextDescription}`);
        });
        return;
    }

    let updated = 0;
    for (const u of updates) {
        if (u.prevDescription === u.nextDescription) continue;
        await prisma.tool.update({
            where: { id: u.id },
            data: { description: u.nextDescription },
        });
        updated += 1;
    }

    console.log(`Updated ${updated} tool descriptions.`);
}

main()
    .catch((error) => {
        console.error("Failed to rewrite tool descriptions:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
