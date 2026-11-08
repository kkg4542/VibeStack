import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, Sparkles, Heart, Scale } from "lucide-react";
import { ToolIconRenderer } from "@/components/tools/ToolIconRenderer";
import { AffiliateLink } from "@/components/ui/AffiliateLink";
import { SocialShare } from "@/components/ui/SocialShare";
import Link from "next/link";

/**
 * Tool page hero: one flat surface field (bg-card) with no lines, glow or
 * gradient. The tool icon sits on a flat square one tone step down
 * (bg-background; bg-secondary is the same tone as bg-card in both themes and
 * would disappear here) in text-foreground, never in the tool's own colour.
 *
 * Server component, no entrance animation: everything is in the SSR HTML at
 * full opacity.
 *
 * 375px: the text column is `w-full self-stretch min-w-0` so long titles and
 * descriptions wrap instead of widening the flex row, and every action row
 * wraps.
 */
export function ToolHero({ tool }: { tool: any }) {
  const stats = [
    { label: "Category", value: tool.category },
    { label: "Pricing", value: tool.pricing },
    { label: "Features", value: tool.features?.length || 0 },
  ];

  return (
    <section className="mb-16 bg-card px-5 py-8 text-foreground sm:px-8 md:px-12 md:py-12">
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
        {/* Icon & rating */}
        <div className="flex shrink-0 items-center gap-5 lg:flex-col lg:items-start">
          <div className="flex h-24 w-24 items-center justify-center bg-background text-foreground md:h-28 md:w-28">
            <ToolIconRenderer slug={tool.slug} className="h-12 w-12 text-foreground md:h-14 md:w-14" />
          </div>
          {tool.review && (
            <p className="flex items-baseline gap-1.5">
              <Star aria-hidden="true" className="h-5 w-5 self-center fill-current text-vibe-link" />
              <span className="font-display text-[40px] leading-[0.88] tabular-nums">{tool.review.rating}</span>
              <span className="text-[15px] text-muted-foreground">/ 5</span>
            </p>
          )}
        </div>

        <div className="w-full min-w-0 flex-1 self-stretch">
          {/* Tags: flat squares and plain text, no tinted pills */}
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px]">
            <span className="bg-background px-3 py-1.5 font-semibold text-foreground">{tool.category}</span>
            <span className="bg-vibe-electric px-3 py-1.5 font-semibold text-vibe-deep">{tool.pricing}</span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-foreground" />
              Vetted
            </span>
            {tool.isFeatured && (
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Sparkles aria-hidden="true" className="h-4 w-4 text-foreground" />
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mb-6 font-display text-[clamp(40px,6vw,96px)] uppercase leading-[0.88] tracking-[-0.005em] text-foreground text-balance wrap-break-word">
            {tool.title}
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-3xl text-[18px] leading-normal text-muted-foreground md:text-[20px]">
            {tool.description}
          </p>

          {/* Quick stats: three flat cells one tone step down */}
          <dl className="mb-8 grid max-w-3xl grid-cols-1 gap-1 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex min-w-0 flex-col-reverse gap-1 bg-background px-4 py-3">
                <dt className="text-[14px] text-muted-foreground">{stat.label}</dt>
                <dd className="truncate text-[18px] font-semibold text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>

          {/* Action buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <AffiliateLink
              url={tool.affiliateUrl || tool.websiteUrl}
              toolSlug={tool.slug}
              toolName={tool.title}
              pricing={tool.pricing}
              className="h-12 rounded-none px-8 text-[16px] font-semibold"
            >
              Visit Website
            </AffiliateLink>
            <div className="flex flex-wrap gap-3">
              <SocialShare
                toolSlug={tool.slug}
                toolName={tool.title}
                url={`https://usevibestack.com/tool/${tool.slug}`}
              />
              <Button
                variant="secondary"
                className="h-12 rounded-none bg-background px-6 text-[16px] text-foreground hover:bg-accent"
              >
                <Heart aria-hidden="true" className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button
                variant="secondary"
                className="h-12 rounded-none bg-background px-6 text-[16px] text-foreground hover:bg-accent"
                asChild
              >
                <Link href={`/compare?tools=${tool.slug}`}>
                  <Scale aria-hidden="true" className="mr-2 h-4 w-4" />
                  Compare
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
