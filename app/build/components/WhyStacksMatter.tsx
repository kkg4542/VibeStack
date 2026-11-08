const WHY_STACKS_MATTER = [
  {
    title: "Synergy",
    description: "Tools that work together multiply your productivity",
    stat: "3.2x",
    statLabel: "Productivity Boost"
  },
  {
    title: "Cost Efficiency",
    description: "Bundled tools often cost less than individual subscriptions",
    stat: "40%",
    statLabel: "Average Savings"
  },
  {
    title: "Learning Curve",
    description: "Curated stacks reduce decision fatigue and setup time",
    stat: "70%",
    statLabel: "Faster Onboarding"
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
        <p className="text-[18px] text-muted-foreground">The right combination multiplies your productivity</p>
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
