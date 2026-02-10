import { prisma } from "@/lib/prisma";

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
    const unique: string[] = [];
    for (const f of clean) {
        if (!unique.includes(f)) unique.push(f);
    }
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
    const dryRun = process.argv.includes("--dry-run");

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

    const updates = tools.map((tool) => {
        const nextDescription = buildDescription(tool);
        return { id: tool.id, nextDescription, prevDescription: tool.description, title: tool.title };
    });

    if (dryRun) {
        console.log(`Dry run: ${updates.length} tools`);
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
