/**
 * Sticky workspace header with GOLDIE branding and phase navigation tabs.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Compass,
  Database,
  MessageSquare,
  Sparkles,
} from "lucide-react";

import { GoldieLogo } from "@/components/branding/goldie_logo";
import { WorkspaceNavTab } from "@/components/workspace/workspace_nav_tab";

const nav_items = [
  {
    href: "/workspace/database",
    icon: Database,
    label: "Database",
    active_class_name: "bg-[#f3f4f6] text-[#1f2937]",
  },
  {
    href: "/workspace/discover",
    icon: Compass,
    label: "Discover",
    active_class_name: "bg-[#e0f2fe] text-[#0369a1]",
  },
  {
    href: "/workspace/prep",
    icon: Sparkles,
    label: "Prep",
    active_class_name: "bg-[#f3f4f6] text-[#1f2937]",
  },
  {
    href: "/workspace/analyze",
    icon: BarChart3,
    label: "Analyze",
    active_class_name: "bg-[#f3f4f6] text-[#1f2937]",
  },
  {
    href: "/workspace/communicate",
    icon: MessageSquare,
    label: "Communicate",
    active_class_name: "bg-[#ffedd5] text-[#9a3412]",
  },
] as const;

/**
 * Workspace top bar matching docs/example.tsx navigation.
 */
export function WorkspaceHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e5e7eb]">
      <div className="flex items-center justify-between px-4 h-14">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="Back to home"
        >
          <GoldieLogo size="compact" />
        </Link>

        <nav className="flex items-center gap-1">
          {nav_items.map((item) => (
            <WorkspaceNavTab
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              is_active={pathname === item.href}
              active_class_name={item.active_class_name}
            />
          ))}
        </nav>

        <div className="w-[120px]" aria-hidden />
      </div>
    </header>
  );
}
