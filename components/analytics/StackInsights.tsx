"use client";

import { m } from "framer-motion";
import { TrendingUp, Clock, DollarSign, BarChart3 } from "lucide-react";
import { VibeCard } from "@/components/ui/VibeCard";
import { StackInsights as StackInsightsType } from "@/lib/data/stacks";
import { designSystem } from "@/lib/design-system";
import dynamic from "next/dynamic";

const AdoptionTrendChart = dynamic(
  () => import('./AdoptionTrendChart').then(mod => mod.AdoptionTrendChart),
  { ssr: false, loading: () => <div className="h-[250px] w-full bg-secondary rounded-none" /> }
);

interface StackInsightsProps {
  insights: StackInsightsType;
}

export function StackInsights({ insights }: StackInsightsProps) {
  const fadeInUp = designSystem.animations.fadeInUp;

  return (
    <div className="space-y-8">
      {/* Header */}
      <m.div
        initial={fadeInUp.initial}
        whileInView={fadeInUp.animate}
        viewport={{ once: true }}
        transition={fadeInUp.transition}
      >
        <p className="mb-2 text-base font-semibold text-vibe-link">
          Real impact data
        </p>
        <h3 className="font-display uppercase text-[clamp(32px,4vw,56px)] leading-[0.88] tracking-[-0.005em]">Stack Performance Insights</h3>
        <p className="text-muted-foreground mt-2">
          See how this stack is helping developers worldwide
        </p>
      </m.div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          icon={<Clock className="w-5 h-5" />}
          label="Avg. Time Saved"
          value={insights.avgTimeSaved}
          color="text-foreground"
          delay={0}
        />
        <MetricCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Avg. Cost Savings"
          value={insights.avgCostSaved}
          color="text-foreground"
          delay={0.1}
        />
        <MetricCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Productivity Boost"
          value={`${insights.productivityBoost}x`}
          color="text-vibe-link"
          delay={0.2}
        />
      </div>

      {/* Adoption Trend Chart */}
      <AdoptionTrendChart adoptionTrend={insights.adoptionTrend} />

      {/* Tool Popularity */}
      {insights.toolPopularity.length > 0 && (
        <m.div
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <VibeCard className="p-6 rounded-none" tiltStrength={5}>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-vibe-link" />
              Tool Popularity
            </h4>
            <div className="space-y-3">
              {insights.toolPopularity.map((tool) => (
                <div key={tool.toolId} className="flex items-center gap-3">
                  <span className="text-base w-28 truncate">{tool.toolName}</span>
                  <div className="flex-1 h-2 bg-secondary overflow-hidden">
                    <div
                      style={{ width: `${(tool.usage / 100) * 100}%` }}
                      className="h-full bg-vibe-electric"
                    />
                  </div>
                  <span className="text-base text-muted-foreground w-14 text-right tabular-nums">{tool.usage}%</span>
                </div>
              ))}
            </div>
          </VibeCard>
        </m.div>
      )}
    </div>
  );
}

// Metric Card Component
interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  delay: number;
}

function MetricCard({ icon, label, value, color, delay }: MetricCardProps) {
  return (
    <m.div
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <VibeCard className="p-4 rounded-none" tiltStrength={5}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-base text-muted-foreground mb-1">{label}</p>
            <p className={`font-display text-4xl leading-none ${color}`}>{value}</p>
          </div>
          <div className="text-vibe-link" aria-hidden="true">
            {icon}
          </div>
        </div>
      </VibeCard>
    </m.div>
  );
}
