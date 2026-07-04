import { notFound } from "next/navigation";
import { Metadata } from "next";
import { stacks } from "@/lib/stacks";
import { StackDetailClient } from "./StackDetailClient";

interface Props {
    params: Promise<{ stackId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { stackId } = await params;
    const stack = stacks.find(s => s.id === stackId);

    if (!stack) {
        return {
            title: "Stack Not Found",
            description: "The requested AI stack could not be found."
        };
    }

    const url = `https://usevibestack.com/stack/${stackId}`;

    return {
        title: stack.name,
        description: stack.description,
        alternates: { canonical: url },
        openGraph: {
            title: `${stack.name} | AI Stack for ${stack.idealFor.join(", ")}`,
            description: stack.description,
            url,
            type: "website",
        }
    };
}

export async function generateStaticParams() {
    return stacks.map((stack) => ({
        stackId: stack.id,
    }));
}

import { getStackMetrics } from "@/lib/data/stacks";
import { getTools } from "@/lib/tools-db";

export default async function StackDetailPage({ params }: Props) {
    const { stackId } = await params;
    const stack = stacks.find(s => s.id === stackId);

    if (!stack) {
        notFound();
    }

    const [metrics, allTools] = await Promise.all([
        getStackMetrics(stackId),
        getTools(),
    ]);
    const stackTools = stack.tools
        .map(slug => allTools.find(t => t.slug === slug))
        .filter((t): t is NonNullable<typeof t> => t !== undefined);

    return <StackDetailClient stack={stack} metrics={metrics} stackTools={stackTools} />;
}
