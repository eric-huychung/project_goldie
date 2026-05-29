/**
 * Workspace index — redirects to Database (Phase 2a entry).
 */

import { redirect } from "next/navigation";

import { WORKSPACE_ENTRY_PATH } from "@/lib/notebook/paths";

/**
 * Sends /workspace to the Database tab.
 */
export default function WorkspacePage() {
  redirect(WORKSPACE_ENTRY_PATH);
}
