"use client";

import Link from "next/link";
import { m } from "framer-motion";
import {
  Code2,
  Palette,
  MessageSquare,
  Zap,
  Briefcase,
  Lightbulb,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VibeCard } from "@/components/primitives/VibeCard";
import { Section } from "@/components/primitives/Section";
import { GradientText } from "@/components/primitives/GradientText";
import { designSystem } from "@/lib/design-system";

const categories = [
  {
    id: "coding",
    name: "AI Coding",
    description: "Code faster with AI-powered IDEs and assistants",
    icon: Code2,
    count: 24,
    color: "from-vibe-electric to-vibe-cyan",
    bgColor: "bg-vibe-electric/10",
    tools: ["Cursor", "GitHub Copilot", "Claude Code", "Windsurf"],
  },
  {
    id: "design",
    name: "AI Design",
    description: "Create stunning visuals with generative AI",
    icon: Palette,
    count: 12,
    color: "from-vibe-neon to-vibe-purple",
    bgColor: "bg-vibe-neon/10",
    tools: ["Midjourney", "DALL-E", "Figma AI", "Canva"],
  },
  {
    id: "assistance",
    name: "AI Assistants",
    description: "Supercharge your workflow with smart helpers",
    icon: MessageSquare,
    count: 18,
    color: "from-emerald-400 to-emerald-600",
    bgColor: "bg-emerald-500/10",
    tools: ["ChatGPT", "Claude", "Gemini", "Perplexity"],
  },
  {
    id: "productivity",
    name: "Productivity",
    description: "Automate tasks and streamline your process",
    icon: Zap,
    count: 15,
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-500/10",
    tools: ["Notion", "Mem", "Otter", "Grammarly"],
  },
  {
    id: "management",
    name: "Management",
    description: "Project management with AI-powered insights",
    icon: Briefcase,
    count: 8,
    color: "from-blue-400 to-indigo-600",
    bgColor: "bg-blue-500/10",
    tools: ["Linear", "ClickUp", "Asana", "Trello"],
  },
  {
    id: "other",
    name: "More Tools",
    description: "Explore specialized AI tools for every need",
    icon: Lightbulb,
    count: 32,
    color: "from-pink-400 to-rose-600",
    bgColor: "bg-pink-500/10",
    tools: ["ElevenLabs", "Runway", "Descript", "Hugging Face"],
  },
];

export function ToolCategories() {
  return (
    <Section spacing="large" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/50 to-background" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-vibe-purple/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-vibe-electric/10 blur-[100px] rounded-full -z-10" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <m.div
            initial={designSystem.animations.fadeInUp.initial}
            whileInView={designSystem.animations.fadeInUp.animate}
            viewport={{ once: true }}
            transition={designSystem.animations.fadeInUp.transition}
          >
            <Badge
              variant="outline"
              className="mb-4 border-vibe-neon/20 bg-vibe-neon/5 text-vibe-neon"
            >
              <Sparkles className="mr-2 h-3 w-3" />
              Browse by Category
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Find Your Perfect{" "}
              <GradientText variant="neon">AI Tool</GradientText>
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our curated collection of AI tools organized by category.
              From coding assistants to design generators.
            </p>
          </m.div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <m.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <Link href={`/categories/${category.id}`} className="block h-full">
                  <VibeCard
                    variant="glass"
                    hover="both"
                    spotlight
                    className="h-full p-6"
                  >
                    <div className="relative z-10">
                      {/* Icon & Count */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${category.bgColor}`}>
                          <Icon className={`w-6 h-6 text-transparent bg-clip-text bg-linear-to-br ${category.color}`} />
                        </div>
                        <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-full">
                          {category.count} tools
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.description}
                      </p>

                      {/* Featured Tools */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {category.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-xs px-2 py-1 rounded-full bg-background border border-border/50 text-muted-foreground"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center text-sm text-vibe-electric hover:text-vibe-cyan transition-colors">
                        <span>Explore category</span>
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </VibeCard>
                </Link>
              </m.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
