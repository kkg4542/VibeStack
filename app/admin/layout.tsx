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
    <div className="min-h-svh bg-background pt-14">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-14 z-40 h-[calc(100svh-3.5rem)] w-64 overflow-y-auto bg-card">
          <div className="p-6">
            <h1 className="font-display text-[32px] uppercase leading-[0.9] tracking-[-0.005em] text-foreground">Vibe Admin</h1>
            <p className="mt-1 text-[14px] text-muted-foreground">Productivity Lab</p>
          </div>
          <AdminNav />
        </aside>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
