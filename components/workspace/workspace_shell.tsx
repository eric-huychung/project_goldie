/**
 * Client workspace shell — header, main content, and investigation cart panel.
 */

"use client";

import { InvestigationCart } from "@/components/discover/investigation_cart";
import { InvestigationCartProvider } from "@/components/workspace/investigation_cart_provider";
import { WorkspaceHeader } from "@/components/workspace/workspace_header";

type workspace_shell_props = {
  children: React.ReactNode;
};

/**
 * @param props - Active workspace route page
 */
export function WorkspaceShell({ children }: workspace_shell_props) {
  return (
    <InvestigationCartProvider>
      <div className="min-h-screen bg-[#f8f9fa]">
        <WorkspaceHeader />
        <WorkspaceBody>{children}</WorkspaceBody>
      </div>
    </InvestigationCartProvider>
  );
}

function WorkspaceBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-56px)]">
      <main className="flex-1 overflow-hidden">{children}</main>
      <InvestigationCart />
    </div>
  );
}
