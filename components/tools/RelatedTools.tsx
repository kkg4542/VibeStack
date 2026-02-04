import Link from "next/link";
import { tools } from "@/lib/tools";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
    currentSlug: string;
    category: string;
}

export function RelatedTools({ currentSlug, category }: Props) {
    // Filter related tools: same category, exclude current, limit to 3
    const relatedTools = tools
        .filter((t) => t.category === category && t.slug !== currentSlug)
        .slice(0, 3);

    if (relatedTools.length === 0) return null;

    return (
        <section className="mt-24">
            <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {relatedTools.map((tool) => (
                    <Link
                        key={tool.slug}
                        href={`/tool/${tool.slug}`}
                        className="block relative group"
                    >
                        <Card className="h-full relative overflow-hidden border-white/5 bg-zinc-900/40 transition-all duration-300 hover:border-white/10 hover:bg-zinc-900/60">
                            <div className={`absolute inset-0 bg-linear-to-br ${tool.bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                            <CardHeader>
                                <div className="mb-2 flex items-center justify-between">
                                    <div className={`rounded-lg bg-zinc-900/80 p-2 ring-1 ring-white/10 ${tool.color}`}>
                                        <tool.icon className="h-5 w-5" />
                                    </div>
                                    <Badge variant="secondary" className="bg-zinc-800/50 text-xs font-normal text-muted-foreground">
                                        {tool.category}
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg font-medium text-foreground">{tool.title}</CardTitle>
                                <CardDescription className="text-muted-foreground line-clamp-2">
                                    {tool.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
}
