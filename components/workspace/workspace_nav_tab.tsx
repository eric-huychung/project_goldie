/**
 * Single tab in the workspace header navigation.
 */

"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type workspace_nav_tab_props = {
  href: string;
  icon: LucideIcon;
  label: string;
  is_active: boolean;
  active_class_name: string;
};

/**
 * @param props - Tab link target, icon, and active styling
 */
export function WorkspaceNavTab({
  href,
  icon: Icon,
  label,
  is_active,
  active_class_name,
}: workspace_nav_tab_props) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
        is_active
          ? active_class_name
          : "text-muted-foreground hover:text-[#1f2937] hover:bg-[#f8f9fa]",
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}
