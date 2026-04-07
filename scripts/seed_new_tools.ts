import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const newTools = [
  {
    slug: "bolt-new",
    title: "Bolt.new",
    description: "The AI-powered web development platform that generates full-stack code instantly in your browser.",
    category: "Coding",
    pricing: "Freemium",
    websiteUrl: "https://bolt.new",
    color: "text-blue-500",
    bgGradient: "from-blue-500/20 to-blue-600/20",
    features: ["Instant Preview", "Full-stack Generation", "Browser IDE", "WebContainer Integration"],
    pros: ["Zero setup time", "Great for next.js projects", "Live preview"],
    cons: ["Only for web frameworks", "Cloud dependency"],
    isFeatured: true,
    tier: "free"
  },
  {
    slug: "windsurf-ide",
    title: "Windsurf",
    description: "Codeium's agentic IDE that predicts your next steps and works as an intelligent pair programmer.",
    category: "Coding",
    pricing: "Paid",
    websiteUrl: "https://codeium.com/windsurf",
    color: "text-emerald-500",
    bgGradient: "from-emerald-500/20 to-emerald-600/20",
    features: ["Flow State", "Deep Codebase Context", "Agentic Chat", "Refactoring Engine"],
    pros: ["Very fast AI responses", "Deep context understanding", "Built-in intelligent chat"],
    cons: ["Paid only", "Requires learning new workflows"],
    isFeatured: true,
    tier: "premium"
  },
  {
    slug: "openai-sora",
    title: "Sora",
    description: "OpenAI's groundbreaking text-to-video AI model that creates hyper-realistic and imaginative scenes.",
    category: "Design",
    pricing: "Enterprise",
    websiteUrl: "https://openai.com/sora",
    color: "text-indigo-500",
    bgGradient: "from-indigo-500/20 to-indigo-600/20",
    features: ["Text-to-Video", "Photorealism", "Physical World Simulation", "High Quality Generaton"],
    pros: ["Unmatched quality", "Understands physical dynamics", "Longer video generations"],
    cons: ["Not widely available yet", "High cost API"],
    isFeatured: true,
    tier: "enterprise"
  },
  {
    slug: "devin-ai",
    title: "Devin",
    description: "The world's first fully autonomous AI software engineer capable of taking Jira tickets to production.",
    category: "Assistance",
    pricing: "Paid",
    websiteUrl: "https://cognition-labs.ai",
    color: "text-purple-500",
    bgGradient: "from-purple-500/20 to-purple-600/20",
    features: ["Autonomous Coding", "Self Debugging", "Integration Planning", "Continuous Deployment"],
    pros: ["Can handle complex tickets alone", "Learns from its mistakes", "Works 24/7"],
    cons: ["Still in early access", "Can be unpredictable on large monolithic legacy codebases"],
    isFeatured: true,
    tier: "premium"
  },
  {
    slug: "galileo-ai",
    title: "Galileo AI",
    description: "Generative UI design tool that turns text prompts into editable Figma designs instantly.",
    category: "Design",
    pricing: "Freemium",
    websiteUrl: "https://usegalileo.ai",
    color: "text-pink-500",
    bgGradient: "from-pink-500/20 to-pink-600/20",
    features: ["Text to Figma", "Design System Integration", "Component Auto-Generation", "UI Variations"],
    pros: ["Speeds up initial wireframing", "Outputs real Figma layers", "Modern design defaults"],
    cons: ["Can produce generic designs", "Requires manual polish"],
    isFeatured: true,
    tier: "free"
  }
];

async function main() {
    console.log('Seeding new AI tools...');
    for (const tool of newTools) {
        await prisma.tool.upsert({
            where: { slug: tool.slug },
            update: tool,
            create: tool,
        });
        console.log(`Inserted: ${tool.title}`);
    }
    console.log('Done!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
