"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  MousePointerClick, 
  Mail, 
  BarChart3,
  Calendar
} from "lucide-react";

interface AnalyticsData {
  totalClicks: number;
  totalEmails: number;
  clickStats: Array<{
    toolSlug: string;
    toolName: string;
    clicks: number;
  }>;
  dailyClicks: Array<{
    date: string;
    clicks: number;
  }>;
  abStats: Array<{
    variant: string;
    clicks: number;
  }>;
  emailStats: Array<{
    source: string;
    count: number;
  }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics/dashboard?days=${days}`);
      if (response.ok) {
        const analyticsData = await response.json();
        setData(analyticsData);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 w-24 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track affiliate clicks, email captures, and conversion metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="border rounded-md px-3 py-1 text-sm bg-background"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalClicks || 0}</div>
            <p className="text-xs text-muted-foreground">
              Affiliate link clicks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Captures</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalEmails || 0}</div>
            <p className="text-xs text-muted-foreground">
              New email subscribers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Clicks/Day</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data ? Math.round(data.totalClicks / days) : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Average daily clicks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Tool</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">
              {data?.clickStats[0]?.toolName || "-"}
            </div>
            <p className="text-xs text-muted-foreground">
              {data?.clickStats[0]?.clicks || 0} clicks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="tools" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tools">Tool Performance</TabsTrigger>
          <TabsTrigger value="ab">A/B Testing</TabsTrigger>
          <TabsTrigger value="emails">Email Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clicks by Tool</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.clickStats.map((tool) => (
                  <div key={tool.toolSlug} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="font-medium">{tool.toolName}</div>
                      <div className="text-sm text-muted-foreground">({tool.toolSlug})</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500"
                          style={{
                            width: `${(tool.clicks / (data?.clickStats[0]?.clicks || 1)) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="font-bold w-12 text-right">{tool.clicks}</div>
                    </div>
                  </div>
                ))}
                {(!data?.clickStats || data.clickStats.length === 0) && (
                  <p className="text-muted-foreground text-center py-8">
                    No click data available yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ab" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>A/B Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.abStats.map((stat) => (
                  <div key={stat.variant} className="flex items-center justify-between">
                    <div className="font-medium">
                      Variant {stat.variant === "none" ? "No Test" : stat.variant}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500"
                          style={{
                            width: `${(stat.clicks / (data?.totalClicks || 1)) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="font-bold w-12 text-right">{stat.clicks}</div>
                    </div>
                  </div>
                ))}
                {(!data?.abStats || data.abStats.length === 0) && (
                  <p className="text-muted-foreground text-center py-8">
                    No A/B test data available yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emails" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Capture Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.emailStats.map((stat) => (
                  <div key={stat.source} className="flex items-center justify-between">
                    <div className="font-medium capitalize">{stat.source.replace("_", " ")}</div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-violet-500"
                          style={{
                            width: `${(stat.count / (data?.totalEmails || 1)) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="font-bold w-12 text-right">{stat.count}</div>
                    </div>
                  </div>
                ))}
                {(!data?.emailStats || data.emailStats.length === 0) && (
                  <p className="text-muted-foreground text-center py-8">
                    No email capture data available yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
