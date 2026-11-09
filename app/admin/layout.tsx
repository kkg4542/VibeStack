import { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminNav } from "@/components/admin/AdminNav";
import { ADMIN_COOKIE_NAME, isValidAdminToken } from "@/lib/admin-token";

export const dynamic = "force-dynamic";


// The root layout's title template appends " | VibeStack"; do not repeat it.
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "VibeStack admin dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware already guarantees a valid admin cookie on every /admin/* route
  // except /admin/login. Chrome (sidebar, Sign Out) is rendered only when that
  // cookie is present and valid, so the signed-out login page shows the form
  // alone. This is presentation only; middleware remains the access gate.
  const isAdmin = await isValidAdminToken((await cookies()).get(ADMIN_COOKIE_NAME)?.value);

  if (!isAdmin) {
    return <>{children}</>;
  }

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
