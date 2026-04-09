"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Wrench,
  Layers,
  FileText,
  Users,
  Settings,
  Inbox,
  Webhook,
  Megaphone,
} from "lucide-react";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/tools",
    label: "Tools",
    icon: Wrench,
  },
  {
    href: "/admin/submissions",
    label: "Submissions",
    icon: Inbox,
  },
  {
    href: "/admin/sponsorships",
    label: "Sponsorships",
    icon: Megaphone,
  },
  {
    href: "/admin/webhooks",
    label: "Webhooks",
    icon: Webhook,
  },
  {
    href: "/admin/stacks",
    label: "Stacks",
    icon: Layers,
  },
  {
    href: "/admin/blog",
    label: "Blog Posts",
    icon: FileText,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

import { adminLogout } from "@/app/admin/actions/auth";

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full justify-between pb-8">
      <ul className="space-y-1 px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      
      <div className="px-4 pt-4 border-t border-border/40">
        <form action={adminLogout}>
          <button 
            type="submit" 
            className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Sign Out
          </button>
        </form>
      </div>
    </nav>
  );
}
