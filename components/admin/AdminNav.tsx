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

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="px-4 py-2">
      <ul className="space-y-1">
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
    </nav>
  );
}
