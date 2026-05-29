/**
 * Workspace shell shared by Database, Discover, Prep, Analyze, and Communicate routes.
 */

import { WorkspaceShell } from "@/components/workspace/workspace_shell";

type workspace_layout_props = {
  children: React.ReactNode;
};

/**
 * @param props - Active workspace tab page content
 */
export default function WorkspaceLayout({ children }: workspace_layout_props) {
  return <WorkspaceShell>{children}</WorkspaceShell>;
}
