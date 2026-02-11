import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertTriangle, FileText, Image as ImageIcon, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContentGuidelinesPage() {
    return (
        <PageBackground {...BackgroundPresets.content}>
            <div className="container max-w-4xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent">
                        <Link href="/submit-tool" className="flex items-center text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Submission
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Content Quality Guidelines</h1>
                    <p className="text-muted-foreground">
                        Please follow these guidelines to ensure your tool listing gets approved quickly and looks professional.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Images Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-vibe-electric/10 rounded-lg">
                                <ImageIcon className="w-5 h-5 text-vibe-electric" />
                            </div>
                            <h2 className="text-2xl font-semibold">1. Images & Visuals</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Logo / Icon</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <strong>Aspect Ratio:</strong> 1:1 (Square)
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <strong>Format:</strong> SVG (Best) or transparent PNG
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                        <div className="text-sm text-muted-foreground">
                                            Do not use pre-rounded images; our UI handles the border radius.
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Screenshots</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <strong>Aspect Ratio:</strong> 16:9 (Widescreen)
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <strong>Content:</strong> Show the actual tool interface, not just a marketing banner.
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Text Style Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-pink-500/10 rounded-lg">
                                <FileText className="w-5 h-5 text-pink-500" />
                            </div>
                            <h2 className="text-2xl font-semibold">2. Text & Descriptions</h2>
                        </div>

                        <Card>
                            <CardContent className="p-6 space-y-6">
                                <div>
                                    <h3 className="font-medium mb-2">Naming</h3>
                                    <p className="text-sm text-muted-foreground mb-2">Use the official product name without slogans.</p>
                                    <div className="flex gap-4 text-sm">
                                        <div className="text-emerald-500">✅ GitHub Copilot</div>
                                        <div className="text-red-500">❌ GitHub Copilot - Best AI Coding Tool</div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Tagline (Short Description)</h3>
                                    <p className="text-sm text-muted-foreground mb-2">Keep it objective and under 60 characters.</p>
                                    <div className="flex flex-col gap-2 text-sm">
                                        <div className="text-emerald-500">✅ AI pair programmer that helps you write code faster.</div>
                                        <div className="text-red-500">❌ The world&apos;s best and most amazing tool that you will ever use!!!</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Taxonomy Section */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Tag className="w-5 h-5 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-semibold">3. Categories & Tags</h2>
                        </div>

                        <Card>
                            <CardContent className="p-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-medium mb-2">Preferred Categories</h3>
                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                            <li>• Coding</li>
                                            <li>• Design</li>
                                            <li>• Productivity</li>
                                            <li>• Marketing</li>
                                            <li>• Video</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-2">Tagging Rules</h3>
                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                            <li>• Use kebab-case (e.g., <code>open-source</code>)</li>
                                            <li>• Focus on features and tech stack</li>
                                            <li>• Avoid duplicates (e.g., use <code>gpt-4</code>, skip <code>gpt4</code>)</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </PageBackground>
    );
}
