// No invented metrics here: each card is a qualitative reason, numbered 01-03
// as a layout device only.
const WHY_STACKS_MATTER = [
  {
    title: "Synergy",
    description: "Tools chosen to work together cover each other's gaps instead of overlapping",
    stat: "01",
    statLabel: "Built to fit together"
  },
  {
    title: "Cost Efficiency",
    description: "Fewer overlapping subscriptions means you pay for what you actually use",
    stat: "02",
    statLabel: "Less overlap"
  },
  {
    title: "Learning Curve",
    description: "Curated stacks reduce decision fatigue and setup time",
    stat: "03",
    statLabel: "Fewer choices to make"
  }
];

/**
 * Direction B: three flat card cells, stat in the display face, no icon
 * tiles. Plain markup (no framer opacity:0 entry state).
 */
export function WhyStacksMatter() {
  return (
    <section className="mb-24">
      <div className="mb-10">
        <h2 className="font-display mb-4 text-[clamp(32px,4vw,56px)] leading-[0.88] text-balance text-foreground">
          Why Stacks Matter
        </h2>
        <p className="text-[18px] text-muted-foreground">The right combination does more than the sum of its parts</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {WHY_STACKS_MATTER.map((item) => (
          <div key={item.title} className="reveal h-full bg-card p-8">
            <div className="font-display mb-1 text-[56px] leading-[0.88] tabular-nums text-vibe-link">{item.stat}</div>
            <div className="mb-6 text-[14px] text-muted-foreground">{item.statLabel}</div>
            <h3 className="mb-2 text-[20px] font-semibold text-foreground">{item.title}</h3>
            <p className="text-[16px] text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
