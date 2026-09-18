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
    slug: "devin-ai",
    title: "Devin",
    description: "Cognition's autonomous AI software engineer, now shipped alongside Devin Desktop — the IDE that was Windsurf before the 2026 rebrand.",
    category: "Assistance",
    pricing: "Paid",
    websiteUrl: "https://devin.ai",
    color: "text-purple-500",
    bgGradient: "from-purple-500/20 to-purple-600/20",
    features: ["Autonomous Coding", "Self Debugging", "Integration Planning", "Continuous Deployment"],
    pros: ["Can handle complex tickets alone", "Learns from its mistakes", "Works 24/7"],
    cons: ["Still in early access", "Can be unpredictable on large monolithic legacy codebases"],
    isFeatured: true,
    tier: "premium"
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
