import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Settings, Database, Globe, Bell } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Settings</h1>
        <p className="text-muted-foreground">
          Manage system settings and configurations.
        </p>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <CardTitle>General Settings</CardTitle>
            </div>
            <CardDescription>
              Basic site configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="site-name" className="text-sm font-medium">Site Name</label>
              <Input id="site-name" defaultValue="VibeStack" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="site-description" className="text-sm font-medium">Site Description</label>
              <Input 
                id="site-description" 
                defaultValue="Curated AI tools for developers" 
              />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Database Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <CardTitle>Database</CardTitle>
            </div>
            <CardDescription>
              Database connection status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Connection Status</p>
                <p className="text-sm text-muted-foreground">Supabase PostgreSQL</p>
              </div>
              <Badge className="bg-green-100 text-green-700">Connected</Badge>
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <CardTitle>SEO Settings</CardTitle>
            </div>
            <CardDescription>
              Search engine optimization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-sm font-medium">Enable Sitemap</span>
                <p className="text-sm text-muted-foreground">
                  Automatically generate sitemap.xml
                </p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-sm font-medium">Enable RSS Feed</span>
                <p className="text-sm text-muted-foreground">
                  Generate RSS feed for blog posts
                </p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Email and notification settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-sm font-medium">New Tool Submissions</span>
                <p className="text-sm text-muted-foreground">
                  Get notified when users submit new tools
                </p>
              </div>
              <input type="checkbox" className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-sm font-medium">Weekly Reports</span>
                <p className="text-sm text-muted-foreground">
                  Receive weekly analytics reports
                </p>
              </div>
              <input type="checkbox" className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
