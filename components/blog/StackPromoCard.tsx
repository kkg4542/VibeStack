"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStackById } from "@/lib/stacks";

interface StackPromoCardProps {
    stackId: string;
}

export function StackPromoCard({ stackId }: StackPromoCardProps) {
    const stack = getStackById(stackId);

    if (!stack) return null;

    return (
        <Card className="my-12 overflow-hidden border-indigo-500/20 bg-linear-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5">
            <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Icon Area */}
                    <div className="shrink-0 relative">
                        <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
                        <div className="relative text-6xl bg-background/50 p-6 rounded-2xl border border-indigo-500/10 backdrop-blur-sm shadow-xl">
                            {stack.icon}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <Badge variant="outline" className="border-indigo-500/30 text-indigo-500 bg-indigo-500/5">
                            <Sparkles className="mr-1 h-3 w-3" />
                            Recommended Stack
                        </Badge>
                        <h3 className="text-2xl font-bold">{stack.name}</h3>
                        <p className="text-muted-foreground text-lg">{stack.description}</p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {stack.tags.slice(0, 3).map(tag => (
                                <Badge key={tag} variant="secondary" className="bg-background/50">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="shrink-0">
                        <Link href={`/stack/${stack.id}`}>
                            <Button size="lg" className="rounded-full h-12 px-8 shadow-lg shadow-indigo-500/20">
                                Try This Stack
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
