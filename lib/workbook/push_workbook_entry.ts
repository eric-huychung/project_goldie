/**
 * Client navigation from home / templates into the workspace (Phase 2a MVP).
 */

"use client";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { WORKSPACE_ENTRY_PATH } from "@/lib/workbook/paths";
import type { workbook_start } from "@/lib/types/template";

/**
 * Navigates to the Database workspace for any workbook start (MVP ignores start details).
 *
 * @param router - Next.js app router from useRouter()
 * @param _start - How the user began — reserved for Phase 2b+ context
 */
export function push_workbook_entry(
  router: AppRouterInstance,
  _start: workbook_start,
): void {
  void _start;
  router.push(WORKSPACE_ENTRY_PATH);
}
