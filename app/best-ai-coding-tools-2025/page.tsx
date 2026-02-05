import type { Metadata } from "next";
import { tools } from "@/lib/tools";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Top 10 Best AI Coding Tools 2025 | VibeStack",
  description: "Discover the best AI coding tools for developers in 2025. Compare Cursor, GitHub Copilot, Claude, and more. Find the perfect AI pair programmer for your workflow.",
  keywords: ["AI coding tools", "best AI code editors", "AI programming assistants", "Cursor vs Copilot", "2025"],
  openGraph: {
    title: "Top 10 Best AI Coding Tools 2025",
    description: "The ultimate guide to AI coding assistants for developers",
  },
};

export default function BestAICodingToolsPage() {
  const codingTools = tools
    .filter(tool => tool.category === "Coding")
    .sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return (b.review?.rating || 0) - (a.review?.rating || 0);
    })
    .slice(0, 10);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-950/20 to-background border-b border-border/50">
        <div className="container max-w-6xl mx-auto px-4 py-20 text-center">
          <Badge variant="secondary" className="mb-4">
            2025 Updated
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Top 10 Best AI Coding Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The ultimate guide to AI-powered coding assistants. We&apos;ve tested and ranked 
            the best tools to supercharge your development workflow.
          </p>
        </div>
      </div>
      
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <section className="prose prose-zinc dark:prose-invert max-w-none mb-16">
          <h2>Why AI Coding Tools Are Essential in 2025</h2>
          <p>
            The landscape of software development has been fundamentally transformed by AI. What started as simple 
            autocomplete has evolved into sophisticated AI pair programmers that understand context, suggest entire 
            functions, and even generate complex applications from natural language descriptions.
          </p>
          <p>
            In 2025, developers using AI coding tools report up to <strong>55% faster development times</strong> and 
            significantly reduced bug rates. Whether you&apos;re building web apps, mobile applications, or complex 
            backend systems, the right AI assistant can be the difference between shipping on time and missing deadlines.
          </p>
          
          <h3>What We Looked For</h3>
          <ul>
            <li><strong>Code Quality:</strong> Accuracy of suggestions and generated code</li>
            <li><strong>Context Awareness:</strong> Understanding of large codebases and project structure</li>
            <li><strong>Language Support:</strong> Breadth of programming languages covered</li>
            <li><strong>Integration:</strong> How well it works with existing workflows and IDEs</li>
            <li><strong>Value:</strong> Pricing relative to productivity gains</li>
          </ul>
        </section>

        <Separator className="my-12" />

        {/* Top 10 List */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">The Rankings</h2>
          <div className="space-y-8">
            {codingTools.map((tool, index) => (
              <div key={tool.slug} className="relative bg-card border rounded-xl p-6 hover:border-indigo-500/50 transition-colors">
                <div className="absolute -left-3 -top-3 w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
                <div className="ml-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">{tool.title}</h3>
                        {tool.isFeatured && (
                          <Badge variant="default" className="bg-indigo-500">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">{tool.description}</p>
                      
                      {tool.features && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tool.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {tool.review && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(tool.review!.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {tool.review.rating}/5
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Badge variant={tool.pricing === "Free" ? "default" : "secondary"}>
                          {tool.pricing}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/tool/${tool.slug}`}>
                          Read Review
                        </Link>
                      </Button>
                      <Button asChild size="sm">
                        <a href={tool.affiliateUrl || tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Try Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Quick Comparison</h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left py-4 px-4 font-semibold">Tool</th>
                  <th className="text-left py-4 px-4 font-semibold">Best For</th>
                  <th className="text-left py-4 px-4 font-semibold">Pricing</th>
                  <th className="text-left py-4 px-4 font-semibold">Key Feature</th>
                </tr>
              </thead>
              <tbody>
                {codingTools.slice(0, 5).map((tool) => (
                  <tr key={tool.slug} className="border-t border-border">
                    <td className="py-4 px-4 font-medium">{tool.title}</td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">
                      {tool.slug === "cursor" && "Full IDE replacement"}
                      {tool.slug === "github-copilot" && "GitHub ecosystem"}
                      {tool.slug === "supermaven" && "Speed and latency"}
                      {tool.slug === "windsurf" && "Agentic workflows"}
                      {tool.slug === "claude" && "Long context tasks"}
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant={tool.pricing === "Free" ? "default" : "secondary"}
                        className={tool.pricing === "Free" ? "bg-green-500" : ""}
                      >
                        {tool.pricing}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">
                      {tool.features?.[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Separator className="my-12" />

        {/* How to Choose */}
        <section className="prose prose-zinc dark:prose-invert max-w-none mb-16">
          <h2>How to Choose the Right AI Coding Tool</h2>
          
          <h3>For Individual Developers</h3>
          <p>
            If you&apos;re working solo, prioritize tools with generous free tiers and excellent IDE integration. 
            <strong> Cursor</strong> and <strong>GitHub Copilot</strong> are excellent starting points. Consider 
            your primary programming language and whether you need local/private code processing.
          </p>

          <h3>For Teams</h3>
          <p>
            Team environments benefit from shared context and collaboration features. <strong>GitHub Copilot</strong> 
            shines here with its deep GitHub integration. Enterprise plans often include admin controls and 
            security features essential for organizational use.
          </p>

          <h3>For Enterprises</h3>
          <p>
            Security and compliance are paramount. Look for tools offering on-premise deployment, SOC 2 compliance, 
            and custom model training on your codebase. <strong>Tabnine</strong> and enterprise versions of Copilot 
            and Cursor are designed for these requirements.
          </p>
        </section>

        <Separator className="my-12" />

        {/* FAQ */}
        <section className="prose prose-zinc dark:prose-invert max-w-none">
          <h2>Frequently Asked Questions</h2>
          
          <h3>Will AI coding tools replace developers?</h3>
          <p>
            No. AI tools augment developer productivity but don&apos;t replace the need for human judgment, 
            architecture decisions, and creative problem-solving. They&apos;re best viewed as incredibly capable 
            assistants that handle boilerplate and accelerate implementation.
          </p>

          <h3>Are AI coding tools secure?</h3>
          <p>
            Most reputable tools offer enterprise-grade security. However, be cautious about sending proprietary 
            code to cloud-based services. Tools like Tabnine offer local/self-hosted options for sensitive codebases.
          </p>

          <h3>Can I use multiple AI coding tools together?</h3>
          <p>
            Yes! Many developers use different tools for different tasks. For example, using Cursor for general 
            development, Claude for documentation and complex reasoning, and specialized tools for specific workflows.
          </p>

          <h3>What&apos;s the best free AI coding tool?</h3>
          <p>
            <strong>Continue</strong> is the best open-source option, integrating with local models. For cloud-based,
            <strong> Cursor</strong> offers a generous free tier. <strong>Aider</strong> is completely free and 
            excellent for command-line workflows.
          </p>
        </section>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-indigo-950/30 to-purple-950/30 rounded-xl border border-indigo-500/20 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
          <p className="text-muted-foreground mb-6">
            Browse our complete collection of AI tools and find the perfect stack for your workflow.
          </p>
          <Button asChild size="lg" className="bg-indigo-500 hover:bg-indigo-600">
            <Link href="/tools">
              Explore All Tools
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
