"use client";

import { m } from "framer-motion";
import { TrendingUp, Clock, DollarSign, Users, Sparkles, BarChart3 } from "lucide-react";
import { VibeCard } from "@/components/ui/VibeCard";
import { Badge } from "@/components/ui/badge";
import { StackInsights as StackInsightsType } from "@/lib/data/stacks";
import { designSystem } from "@/lib/design-system";
import dynamic from "next/dynamic";

const AdoptionTrendChart = dynamic(
  () => import('./AdoptionTrendChart').then(mod => mod.AdoptionTrendChart),
  { ssr: false, loading: () => <div className="h-[250px] w-full animate-pulse bg-zinc-800/50 rounded-xl" /> }
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
        <Badge variant="outline" className="mb-2 border-vibe-electric/30 text-vibe-electric">
          <Sparkles className="mr-2 h-3 w-3" />
          Real Impact Data
        </Badge>
        <h3 className="text-2xl font-bold">Stack Performance Insights</h3>
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
          color="text-vibe-purple"
          delay={0}
        />
        <MetricCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Avg. Cost Savings"
          value={insights.avgCostSaved}
          color="text-vibe-neon"
          delay={0.1}
        />
        <MetricCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Productivity Boost"
          value={`${insights.productivityBoost}x`}
          color="text-vibe-electric"
          delay={0.2}
        />
      </div>

      {/* Adoption Trend Chart */}
      <AdoptionTrendChart adoptionTrend={insights.adoptionTrend} />

      {/* Tool Popularity */}
      {insights.toolPopularity.length > 0 && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <VibeCard className="p-6" tiltStrength={5}>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-vibe-electric" />
              Tool Popularity
            </h4>
            <div className="space-y-3">
              {insights.toolPopularity.map((tool, index) => (
                <div key={tool.toolId} className="flex items-center gap-3">
                  <span className="text-sm w-24 truncate">{tool.toolName}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <m.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(tool.usage / 100) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full bg-linear-to-r from-vibe-electric to-vibe-purple rounded-full"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">{tool.usage}%</span>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <VibeCard className="p-4" tiltStrength={5}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
          <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
            {icon}
          </div>
        </div>
      </VibeCard>
    </m.div>
  );
}
