/**
 * Wireframe preview of dashboard sharing — avatars, sample thread, disabled permissions.
 * Renders fictional demo personas only; no invite or share data is collected.
 */

import { GraduationCap, MessageSquare, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  DASHBOARD_COLLABORATION_PREVIEW_PINS,
  DEMO_PEER,
  DEMO_PROFESSOR,
  NOTEBOOK_OWNER,
} from "@/lib/mock/dashboard_collaboration_preview";

const permission_rows = [
  { label: "View", description: "See charts and story" },
  { label: "Comment", description: "Leave feedback on charts" },
  { label: "Edit", description: "Change layout and copy" },
] as const;

/**
 * Static collaboration teaser shown inside the share modal Preview tab.
 */
export function ShareCollaborationPreview() {
  const sample_thread = DASHBOARD_COLLABORATION_PREVIEW_PINS.find(
    (pin) => pin.id === "chen-fy-spike",
  );

  return (
    <div className="space-y-5 text-left">
      <div className="rounded-xl border border-[#e5e7eb] bg-[#f8f9fa] p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
          Sample feedback on {NOTEBOOK_OWNER.name}&apos;s dashboard
        </p>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex -space-x-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-800 ring-2 ring-white">
              {NOTEBOOK_OWNER.initials}
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 text-xs font-semibold text-violet-800 ring-2 ring-white">
              {DEMO_PROFESSOR.initials}
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700 ring-2 ring-white">
              {DEMO_PEER.initials}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {DEMO_PROFESSOR.name} and peers reviewing charts
          </span>
        </div>

        {sample_thread ? (
          <div className="rounded-lg bg-white border border-[#e5e7eb] p-3">
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="secondary"
                className="gap-1 bg-violet-50 text-violet-800 border-violet-200 font-normal"
              >
                <GraduationCap className="w-3 h-3" />
                {DEMO_PROFESSOR.name} · Professor
              </Badge>
              <span className="text-xs text-muted-foreground">
                on Spend by fiscal year
              </span>
            </div>
            <p className="text-sm text-[#1f2937] leading-relaxed">
              {sample_thread.text}
            </p>
            {sample_thread.replies?.[0] ? (
              <div className="mt-2 pl-3 border-l-2 border-[#f3f4f6]">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-0.5">
                  <Users className="w-3 h-3" />
                  {sample_thread.replies[0].author}
                </div>
                <p className="text-sm text-[#1f2937]">
                  {sample_thread.replies[0].text}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
          Permissions (coming soon)
        </p>
        <div className="space-y-2">
          {permission_rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-lg border border-[#e5e7eb] px-3 py-2 opacity-50"
              aria-disabled="true"
            >
              <div>
                <p className="text-sm font-medium text-[#1f2937]">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.description}</p>
              </div>
              <Badge variant="secondary" className="font-normal">
                Soon
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <MessageSquare className="w-3.5 h-3.5 shrink-0" />
        Open Communicate to see comment pins on your live charts. Demo names
        are fictional and nothing is stored or shared.
      </p>
    </div>
  );
}
