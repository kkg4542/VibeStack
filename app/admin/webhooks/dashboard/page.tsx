"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, TrendingUp } from "lucide-react";

interface WebhookStats {
    summary: {
        total: number;
        processed: number;
        failed: number;
        successRate: number;
    };
    byType: Record<string, { count: number; failed: number }>;
    recentFailures: Array<{
        eventId: string;
        type: string;
        error: string | null;
        createdAt: string;
    }>;
}

export default function WebhookDashboard() {
    const [stats, setStats] = useState<WebhookStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    async function fetchStats() {
        try {
            const res = await fetch("/api/admin/webhooks/stats?hours=24");
            if (!res.ok) throw new Error("Failed to fetch stats");
            const data = await res.json();
            setStats(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 animate-spin" />
                    <p>Loading webhook statistics...</p>
                </div>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="container mx-auto p-6">
                <Alert variant="destructive">
                    <AlertDescription>{error || "Failed to load stats"}</AlertDescription>
                </Alert>
            </div>
        );
    }

    const successPercentage = Math.round(stats.summary.successRate * 100);
    const eventTypes = Object.entries(stats.byType).sort((a, b) => b[1].count - a[1].count);

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Webhook Monitoring Dashboard</h1>
                <p className="text-muted-foreground">Last 24 hours</p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.summary.total}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Processed</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.summary.processed}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Failed</CardTitle>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{stats.summary.failed}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{successPercentage}%</div>
                        <div className={`w-full bg-secondary rounded-full h-2 mt-2`}>
                            <div
                                className={`h-2 rounded-full ${successPercentage >= 95 ? 'bg-green-500' : successPercentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${successPercentage}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Event Types Distribution */}
            <Card>
                <CardHeader>
                    <CardTitle>Events by Type</CardTitle>
                    <CardDescription>Breakdown of webhook events received</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {eventTypes.map(([type, data]) => (
                            <div key={type} className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{type}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-full bg-secondary rounded-full h-2 max-w-xs">
                                            <div
                                                className="bg-primary h-2 rounded-full"
                                                style={{ width: `${(data.count / stats.summary.total) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-muted-foreground">{data.count}</span>
                                    </div>
                                </div>
                                {data.failed > 0 && (
                                    <Badge variant="destructive" className="ml-4">
                                        {data.failed} failed
                                    </Badge>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Failures */}
            {stats.recentFailures.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Failures</CardTitle>
                        <CardDescription>Last 10 failed webhook events</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.recentFailures.map((failure) => (
                                <div key={failure.eventId} className="border rounded-lg p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline">{failure.type}</Badge>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(failure.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-sm font-mono text-muted-foreground">
                                        ID: {failure.eventId}
                                    </p>
                                    {failure.error && (
                                        <Alert variant="destructive" className="mt-2">
                                            <AlertDescription className="text-xs font-mono">
                                                {failure.error}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
