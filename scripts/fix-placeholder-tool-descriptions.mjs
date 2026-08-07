/**
 * Replace the 9 remaining auto-generated placeholder `Tool.description` values
 * ("X is an ai <category> tool built for practical workflows. Core capabilities
 * include A, B, C.") with hand-written copy.
 *
 * These descriptions are user-visible SEO surface area:
 *   - /tool/{slug}         → <meta name="description"> + body copy
 *   - /compare/{slug}      → first paragraph of the Overview section
 *
 * SAFETY MODEL
 *   - Dry run is the DEFAULT. Nothing is written unless you pass --apply.
 *   - Only the 9 slugs listed in UPDATES are touched. Ever.
 *   - Idempotent: a slug is skipped if its current value is already the new
 *     copy, or if it no longer matches the known placeholder (i.e. a human
 *     edited it after this script was written).
 *   - Every previous value is recorded below in PREVIOUS_DESCRIPTIONS and is
 *     re-printed at the end of an --apply run so it can be pasted into a
 *     rollback if needed.
 *
 * USAGE (from the repo root — `-r dotenv/config` loads DATABASE_URL from .env)
 *
 *   Preview the diff (safe, no writes):
 *     node -r dotenv/config scripts/fix-placeholder-tool-descriptions.mjs
 *     node -r dotenv/config scripts/fix-placeholder-tool-descriptions.mjs --dry-run
 *
 *   Actually write to the database:
 *     node -r dotenv/config scripts/fix-placeholder-tool-descriptions.mjs --apply
 *
 * NOTE: /tool and /compare pages are statically rendered, so a Vercel redeploy
 * is required after --apply before the new copy shows up on the live site.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** Meta descriptions get truncated by Google past ~155 chars. */
const MAX_DESCRIPTION_LENGTH = 155;

/**
 * The exact values currently in production (captured 2026-08-07).
 * Kept verbatim for rollback and to verify we are overwriting what we think.
 */
const PREVIOUS_DESCRIPTIONS = {
  aider:
    "Aider is an ai coding tool built for practical workflows. Core capabilities include CLI First, Git-aware, Multi-file Editing.",
  "builder-io":
    "Builder.io is an ai design tool built for practical workflows. Core capabilities include Design to Code, Visual CMS, Figma Import.",
  coderabbit:
    "CodeRabbit is an ai coding tool built for practical workflows. Core capabilities include Auto-summaries, Contextual Feedback, Line-by-line Reviews.",
  cody:
    "Cody is an ai coding tool built for practical workflows. Core capabilities include Codebase Search, Context Awareness, Unit Test Generation.",
  cosine:
    "Cosine is an ai coding tool built for practical workflows. Core capabilities include Genie 2 Architecture, Deep Semantic Search, On-prem Isolation.",
  lovable:
    "Lovable is an ai design tool built for practical workflows. Core capabilities include Full-stack Generation, Supabase Integration, Visual Editing.",
  ollama:
    "Ollama is an ai other tool built for practical workflows. Core capabilities include Local Inference, Privacy, Llama 3 / Mistral Support.",
  supermaven:
    "Supermaven is an ai coding tool built for practical workflows. Core capabilities include 1M Context Window, Instant Completion, Low Latency.",
  tabnine:
    "Tabnine is an ai coding tool built for practical workflows. Core capabilities include Private Codebase Training, Local Mode, Security.",
};

/**
 * The replacement copy. One sentence, says what the tool actually does and how
 * it differs from the obvious alternative. No feature lists, no adjectives we
 * can't back up.
 */
const UPDATES = {
  aider:
    "An open-source AI pair programmer that runs in your terminal, edits several files at once, and commits each change straight to git.",

  "builder-io":
    "Visual editor and headless CMS for React, Vue, and other frameworks, with Figma imports that convert designs into component code.",

  // Deliberately leads with "reviews" — CodeRabbit is a PR reviewer, not a
  // code generator, and /compare/github-copilot-vs-coderabbit ranks for
  // queries where that distinction is the whole answer.
  coderabbit:
    "An AI code reviewer that reads every pull request and leaves a summary plus line-by-line comments and suggested fixes — it reviews code, not writes it.",

  cody:
    "Sourcegraph's AI coding assistant: it answers questions, writes code, and generates tests using search-powered context from your whole repo.",

  cosine:
    "An autonomous coding agent that searches a codebase semantically, then plans and carries out multi-step tasks. Self-hosted deployment available.",

  lovable:
    "Describe an app in plain English and Lovable builds the whole thing — React front end, Supabase back end, and a GitHub repo you own.",

  ollama:
    "Run open models like Llama, Mistral, and Gemma on your own machine with one command. No API keys, no cloud, nothing leaves your laptop.",

  supermaven:
    "An autocomplete-only coding assistant built for speed: a 1M-token context window over your project, with suggestions that keep up with your typing.",

  tabnine:
    "Privacy-first AI code completion that can run inside your own infrastructure and be tuned on your team's private codebase.",
};

const SLUGS = Object.keys(UPDATES);

/** Matches anything produced by scripts/rewrite-tool-descriptions.mjs. */
const PLACEHOLDER_PATTERN =
  /\bis an ai [a-z0-9 .+/-]+ tool built for practical workflows\./i;

function isPlaceholder(description) {
  return PLACEHOLDER_PATTERN.test(description || "");
}

/** Fail fast before touching the database if any copy is too long. */
function validateCopy() {
  const problems = [];
  for (const [slug, next] of Object.entries(UPDATES)) {
    if (!next || !next.trim()) {
      problems.push(`${slug}: empty description`);
      continue;
    }
    if (next.length > MAX_DESCRIPTION_LENGTH) {
      problems.push(
        `${slug}: ${next.length} chars (max ${MAX_DESCRIPTION_LENGTH})`
      );
    }
    if (isPlaceholder(next)) {
      problems.push(`${slug}: replacement still looks like a placeholder`);
    }
  }
  if (problems.length > 0) {
    throw new Error(`Refusing to run:\n  - ${problems.join("\n  - ")}`);
  }
}

async function main() {
  const apply = process.argv.includes("--apply");
  const dryRun = !apply;

  if (process.argv.includes("--dry-run") && apply) {
    throw new Error("Pass either --dry-run or --apply, not both.");
  }

  validateCopy();

  console.log(
    dryRun
      ? "DRY RUN — no writes. Re-run with --apply to persist these changes.\n"
      : "APPLY — writing to the database.\n"
  );

  const tools = await prisma.tool.findMany({
    where: { slug: { in: SLUGS } },
    select: { id: true, slug: true, title: true, description: true },
    orderBy: { slug: "asc" },
  });

  const found = new Set(tools.map((t) => t.slug));
  for (const slug of SLUGS) {
    if (!found.has(slug)) {
      console.log(`MISSING  ${slug} — no such tool in the database, skipping.`);
    }
  }

  const planned = [];
  const skipped = [];

  for (const tool of tools) {
    const next = UPDATES[tool.slug];
    const current = tool.description || "";

    if (current === next) {
      skipped.push({ slug: tool.slug, reason: "already up to date" });
      continue;
    }

    // Idempotency / safety guard: only overwrite the known placeholder text.
    // If someone hand-edited this row since 2026-08-07, leave it alone.
    const isKnownPrevious = current === PREVIOUS_DESCRIPTIONS[tool.slug];
    if (!isKnownPrevious && !isPlaceholder(current)) {
      skipped.push({
        slug: tool.slug,
        reason: "current value is not the known placeholder — leaving it alone",
        current,
      });
      continue;
    }

    planned.push({ id: tool.id, slug: tool.slug, title: tool.title, current, next });
  }

  for (const item of planned) {
    console.log(`\n${item.slug} (${item.title})`);
    console.log(`  before [${item.current.length}]: ${item.current}`);
    console.log(`  after  [${item.next.length}]: ${item.next}`);
  }

  if (skipped.length > 0) {
    console.log("\nSkipped:");
    for (const s of skipped) {
      console.log(`  - ${s.slug}: ${s.reason}`);
      if (s.current) console.log(`      current: ${s.current}`);
    }
  }

  if (dryRun) {
    console.log(
      `\nDry run complete. ${planned.length} would change, ${skipped.length} skipped.`
    );
    return;
  }

  // Rollback record — printed BEFORE the writes so it survives a mid-run crash.
  console.log("\n--- ROLLBACK DATA (previous values, keep this log) ---");
  console.log(
    JSON.stringify(
      Object.fromEntries(planned.map((p) => [p.slug, p.current])),
      null,
      2
    )
  );
  console.log("--- END ROLLBACK DATA ---\n");

  let updated = 0;
  for (const item of planned) {
    await prisma.tool.update({
      where: { id: item.id },
      data: { description: item.next },
    });
    updated += 1;
    console.log(`updated  ${item.slug}`);
  }

  console.log(
    `\nDone. Updated ${updated} tool description(s), skipped ${skipped.length}.`
  );
  console.log(
    "Reminder: /tool and /compare pages are statically rendered — redeploy on Vercel to publish."
  );
}

main()
  .catch((error) => {
    console.error("Failed to fix placeholder tool descriptions:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
