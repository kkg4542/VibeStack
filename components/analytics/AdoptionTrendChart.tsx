"use client";

import { m } from "framer-motion";
import { Users } from "lucide-react";
import { VibeCard } from "@/components/ui/VibeCard";
import { StackInsights as StackInsightsType } from "@/lib/data/stacks";

interface AdoptionTrendChartProps {
  adoptionTrend: StackInsightsType["adoptionTrend"];
}

export function AdoptionTrendChart({ adoptionTrend }: AdoptionTrendChartProps) {
  const maxUsers = Math.max(...adoptionTrend.map((d) => d.users));

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <VibeCard className="p-6" tiltStrength={5}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-vibe-electric" />
              Adoption Trend
            </h4>
            <p className="text-sm text-muted-foreground">
              Number of developers adopting this stack over time
            </p>
          </div>
        </div>

        {/* Custom Bar Chart */}
        <div className="h-[250px] w-full flex items-end gap-2">
          {adoptionTrend.map((data, index) => {
            const height = (data.users / maxUsers) * 100;
            return (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-[200px]">
                  <m.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-full max-w-[40px] bg-linear-to-t from-vibe-electric/20 to-vibe-electric rounded-t-lg relative group"
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background border border-vibe-electric/30 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {data.users} users
                    </div>
                  </m.div>
                </div>
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            );
          })}
        </div>
      </VibeCard>
    </m.div>
  );
}
