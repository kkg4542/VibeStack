import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Wrench, Layers, FileText, Users } from "lucide-react";

async function getStats() {
  const [toolsCount, stacksCount, blogCount] = await Promise.all([
    prisma.tool.count(),
    prisma.stack.count(),
    prisma.blogPost.count(),
  ]);

  return {
    tools: toolsCount,
    stacks: stacksCount,
    blogPosts: blogCount,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const statCards = [
    {
      title: "Total Tools",
      value: stats.tools,
      icon: Wrench,
      href: "/admin/tools",
    },
    {
      title: "Total Stacks",
      value: stats.stacks,
      icon: Layers,
      href: "/admin/stacks",
    },
    {
      title: "Blog Posts",
      value: stats.blogPosts,
      icon: FileText,
      href: "/admin/blog",
    },
    {
      title: "Users",
      value: "-",
      icon: Users,
      href: "/admin/users",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the VibeStack admin dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Manage your content from the sidebar navigation.
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>Add or edit AI tools</li>
              <li>Create new stack recommendations</li>
              <li>Publish blog posts</li>
              <li>Manage user accounts</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API</span>
                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                  Operational
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
