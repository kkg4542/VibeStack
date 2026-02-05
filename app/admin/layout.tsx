import { Metadata } from "next";
import { AdminNav } from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Admin Dashboard | VibeStack",
  description: "VibeStack admin dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background pt-14">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-14 w-64 h-[calc(100vh-3.5rem)] border-r border-border/40 bg-background/60 backdrop-blur-xl overflow-y-auto z-40">
          <div className="p-6">
            <h1 className="text-xl font-bold tracking-tight bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Vibe Admin</h1>
            <p className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">Productivity Lab</p>
          </div>
          <AdminNav />
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
