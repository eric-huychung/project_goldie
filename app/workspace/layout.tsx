/**
 * Workspace shell shared by Database, Discover, Prep, Analyze, and Communicate routes.
 */

import { WorkspaceHeader } from "@/components/workspace/workspace_header";

type workspace_layout_props = {
  children: React.ReactNode;
};

/**
 * @param props - Active workspace tab page content
 */
export default function WorkspaceLayout({ children }: workspace_layout_props) {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <WorkspaceHeader />
      <div className="flex h-[calc(100vh-56px)]">
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
