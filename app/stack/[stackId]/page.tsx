import { notFound } from "next/navigation";
import { Metadata } from "next";
import { stacks } from "@/lib/stacks";
import { StackDetailClient } from "./StackDetailClient";
import { StackRelatedLinks } from "@/components/seo/StackRelatedLinks";

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
    const ogImage = `${url}/opengraph-image`;

    return {
        title: stack.name,
        description: stack.description,
        alternates: { canonical: url },
        openGraph: {
            title: `${stack.name} | AI Stack for ${stack.idealFor.join(", ")}`,
            description: stack.description,
            url,
            type: "website",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: stack.name,
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: stack.name,
            description: stack.description,
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

    const canonicalUrl = `https://usevibestack.com/stack/${stack.id}`;

    // Structured data for Google rich results. Stack pages had zero JSON-LD
    // despite tool/, best/, and compare/ pages all shipping it.
    // BreadcrumbList: shows the breadcrumb trail in search results.
    // ItemList: the stack's whole reason to exist is "these tools, together"
    // — an ItemList of its tools models that directly.
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://usevibestack.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Stacks",
                item: "https://usevibestack.com/build",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: stack.name,
                item: canonicalUrl,
            },
        ],
    };

    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Tools in ${stack.name}`,
        itemListElement: stackTools.map((tool, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: tool.title,
            url: `https://usevibestack.com/tool/${tool.slug}`,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {stackTools.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
                />
            )}
            <StackDetailClient stack={stack} metrics={metrics} stackTools={stackTools} />
            <div className="container max-w-7xl mx-auto px-4 pb-16">
                <StackRelatedLinks stack={stack} stackTools={stackTools} allTools={allTools} />
            </div>
        </>
    );
}
