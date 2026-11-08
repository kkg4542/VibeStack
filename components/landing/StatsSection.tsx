import {
  Wrench,
  Layers,
  Star,
  FileText,
} from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";

export interface StatsSectionProps {
  /** Total AI tools in the directory. Falls back to a safe default. */
  toolCount?: number;
  /** Total curated stacks. */
  stackCount?: number;
  /** Total guides (blog articles + comparisons). */
  guideCount?: number;
}

/**
 * Round a count down to a clean "30+", "45+" style floor so the displayed
 * number stays truthful (we have *at least* this many) and doesn't churn on
 * every single addition. e.g. 48 -> 45, 41 -> 40, 7 -> 7.
 */
function floorToShowcase(n: number): number {
  if (n < 10) return n; // small counts shown exactly (e.g. stacks)
  if (n < 50) return Math.floor(n / 5) * 5; // nearest 5 below
  return Math.floor(n / 10) * 10; // nearest 10 below
}

function buildStats(toolCount: number, stackCount: number, guideCount: number) {
  return [
    {
      icon: Wrench,
      value: floorToShowcase(toolCount),
      suffix: "+",
      label: "AI Tools",
      description: "Hand-picked & reviewed",
    },
    {
      icon: Layers,
      value: stackCount,
      suffix: "",
      label: "Curated Stacks",
      description: "Ready-to-use workflows",
    },
    {
      icon: FileText,
      value: floorToShowcase(guideCount),
      suffix: "+",
      label: "Guides",
      description: "Comparisons & reviews",
    },
    {
      icon: Star,
      value: 100,
      suffix: "%",
      label: "Free",
      description: "No account needed",
    },
  ];
}

/**
 * Renders a stat figure. Deliberately not animated.
 *
 * This used to count up from 0 on scroll, which meant the server-rendered
 * markup held a 0 — and that is the number crawlers read. Google's snippet
 * for the homepage advertised "0+ AI Tools" to anyone who searched for the
 * brand, on the site's single most important page.
 *
 * Keeping the count-up would mean putting the real figure in the SSR markup
 * and rewinding it to 0 on the client, which either flashes the correct
 * number away before animating it or needs viewport arithmetic on mount to
 * decide. Neither is worth it for a decorative flourish, so the figure is
 * simply the figure. The section has no entrance animation beyond the CSS `.reveal`.
 */
function StatNumber({
  value,
  suffix = "",
  isDecimal = false,
}: {
  value: number;
  suffix?: string;
  isDecimal?: boolean;
}) {
  return (
    <span>
      {isDecimal ? value.toFixed(1) : value}{suffix}
    </span>
  );
}

/**
 * Legacy section (not on the home page). Direction B: one flat card cell per
 * stat, figure in the display face, plain icons. No gradient text, glow,
 * glass, grid pattern or pill. Plain markup, so the figures are in the SSR
 * HTML at full opacity.
 */
export function StatsSection({
  toolCount = 45,
  stackCount = 7,
  guideCount = 40,
}: StatsSectionProps = {}) {
  const stats = buildStats(toolCount, stackCount, guideCount);
  return (
    <Section spacing="large" container={false} className="bg-background">
      <Container>
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <h2 className="font-display mb-6 text-[clamp(32px,4vw,56px)] leading-[0.88] text-balance text-foreground">
            Everything you need to build with AI
          </h2>
          <p className="text-[18px] text-muted-foreground">
            Hand-picked tools, ready-to-use stacks, and honest comparison guides, free to browse.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="reveal bg-card p-8">
                <Icon className="mb-6 h-6 w-6 text-foreground" aria-hidden="true" />
                <div className="font-display mb-3 text-[clamp(48px,5vw,72px)] leading-[0.88] tabular-nums text-vibe-link">
                  <StatNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="mb-1 text-[18px] font-semibold text-foreground">
                  {stat.label}
                </h3>
                <p className="text-[16px] text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-12 text-[16px] text-muted-foreground">
          Growing daily with new tools and stacks
        </p>
      </Container>
    </Section>
  );
}
