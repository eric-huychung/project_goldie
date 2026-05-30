/**
 * Share dashboard modal — coming soon message plus collaboration preview tab.
 * No share links, invites, or comment data are created or sent.
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import { Share2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ShareCollaborationPreview } from "@/components/workspace/share_collaboration_preview";
import { cn } from "@/lib/utils";

type share_modal_tab = "share" | "preview";

type share_modal_props = {
  open: boolean;
  on_close: () => void;
};

/**
 * @param props - Open state and close callback
 */
export function ShareModal({ open, on_close }: share_modal_props) {
  const [active_tab, set_active_tab] = useState<share_modal_tab>("share");

  const handle_close = useCallback(() => {
    set_active_tab("share");
    on_close();
  }, [on_close]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handle_escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handle_close();
      }
    };

    document.addEventListener("keydown", handle_escape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handle_escape);
      document.body.style.overflow = "";
    };
  }, [open, handle_close]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={handle_close}
      role="presentation"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white border border-[#e5e7eb] shadow-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-labelledby="share-modal-title"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#e5e7eb]">
          <h2 id="share-modal-title" className="text-lg font-semibold text-[#1f2937]">
            Share dashboard
          </h2>
          <button
            type="button"
            onClick={handle_close}
            className="text-muted-foreground hover:text-[#1f2937]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-1 px-6 pt-4">
          {(
            [
              { id: "share" as const, label: "Share" },
              { id: "preview" as const, label: "Preview" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                active_tab === tab.id
                  ? "bg-[#1f2937] text-white"
                  : "text-muted-foreground hover:bg-[#f8f9fa]",
              )}
              onClick={() => set_active_tab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {active_tab === "share" ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#f8f9fa] flex items-center justify-center">
                <Share2 className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-base font-medium text-[#1f2937] mb-2">
                Coming soon
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Invite classmates, share view-only links, and let your professor
                leave feedback on your charts. Switch to Preview to see what
                that will look like.
              </p>
              <Button type="button" onClick={handle_close} className="w-full">
                Got it
              </Button>
            </div>
          ) : (
            <ShareCollaborationPreview />
          )}
        </div>
      </div>
    </div>
  );
}
