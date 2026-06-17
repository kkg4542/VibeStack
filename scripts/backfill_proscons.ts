import { prisma } from "../lib/prisma";
import { tools as staticTools } from "../lib/tools";

// Hand-written pros/cons for tools not present in the static lib/tools.ts (mid-2026).
const NEW: Record<string, { pros: string[]; cons: string[] }> = {
  aider: {
    pros: ["Free and open source", "Works in your terminal with local git", "Model-agnostic — bring any LLM"],
    cons: ["Command-line only, no GUI", "Requires API keys and setup"],
  },
  "builder-io": {
    pros: ["Figma-to-code with Visual Copilot", "Framework-agnostic output (React, Vue, etc.)", "Visual editing for non-developers"],
    cons: ["Generated code often needs cleanup", "Gets pricey for larger teams"],
  },
  "gemini-code-assist": {
    pros: ["Generous free tier for individuals", "Very large context window", "Deep Google Cloud integration"],
    cons: ["Smaller ecosystem than Copilot", "Strongest only inside the Google stack"],
  },
  coderabbit: {
    pros: ["Automated AI reviews on every PR", "Catches bugs and suggests fixes", "Learns your codebase over time"],
    cons: ["Review comments can be noisy", "Per-seat cost adds up for big teams"],
  },
  cody: {
    pros: ["Strong whole-codebase context", "Choice of multiple models", "Solid enterprise and self-host options"],
    cons: ["Setup overhead to index repos", "Best value only at enterprise scale"],
  },
  cosine: {
    pros: ["Top-tier benchmark coding performance", "Handles autonomous, multi-step tasks", "Understands large codebases"],
    cons: ["Newer and less battle-tested", "Limited integrations so far"],
  },
  ollama: {
    pros: ["Runs models fully locally and private", "Free with simple model management", "No data leaves your machine"],
    cons: ["Needs capable hardware (RAM/GPU)", "Local models trail frontier quality"],
  },
  supermaven: {
    pros: ["Extremely fast completions", "Huge context window", "Cheap compared to rivals"],
    cons: ["Autocomplete only — not agentic", "Smaller ecosystem and integrations"],
  },
  tabnine: {
    pros: ["Privacy-first with on-prem options", "Trains on your team's code", "Works across many IDEs"],
    cons: ["Completions less capable than Copilot", "Best features require enterprise plan"],
  },
};

(async () => {
  const db = await prisma.tool.findMany({ select: { slug: true, pros: true, cons: true } });
  const byStatic: Record<string, { pros?: string[] | null; cons?: string[] | null }> = {};
  for (const t of staticTools) byStatic[t.slug] = { pros: t.pros, cons: t.cons };

  let updated = 0;
  const skipped: string[] = [];
  for (const t of db) {
    const isEmpty = !(t.pros && t.pros.length) || !(t.cons && t.cons.length);
    if (!isEmpty) continue; // never overwrite existing content
    const s = byStatic[t.slug];
    let pros: string[] | undefined, cons: string[] | undefined;
    if (s && s.pros && s.pros.length && s.cons && s.cons.length) { pros = s.pros; cons = s.cons; }
    else if (NEW[t.slug]) { pros = NEW[t.slug].pros; cons = NEW[t.slug].cons; }
    if (!pros || !cons) { skipped.push(t.slug); continue; }
    await prisma.tool.update({ where: { slug: t.slug }, data: { pros, cons } });
    updated++;
    console.log(`✓ ${t.slug}`);
  }
  console.log(`\n업데이트 완료: ${updated}개`);
  if (skipped.length) console.log(`여전히 소스 없음(건너뜀): ${skipped.join(", ")}`);
  await prisma.$disconnect();
})();
