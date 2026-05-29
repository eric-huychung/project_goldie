/**
 * MVP modal placeholder for the future template builder.
 */

"use client";

import { useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type create_template_modal_props = {
  open: boolean;
  on_close: () => void;
};

/**
 * @param props - Open state and close callback
 */
export function CreateTemplateModal({ open, on_close }: create_template_modal_props) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handle_escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        on_close();
      }
    };

    document.addEventListener("keydown", handle_escape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handle_escape);
      document.body.style.overflow = "";
    };
  }, [open, on_close]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={on_close}
      role="presentation"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white border border-[#e5e7eb] shadow-xl p-6 text-center"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-labelledby="create-template-title"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={on_close}
          className="absolute right-4 top-4 text-muted-foreground hover:text-[#1f2937]"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>

        <h2 id="create-template-title" className="text-xl font-semibold text-[#1f2937] mb-2">
          Design your template
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Lay out charts, guided questions, and domain context here. The template builder is
          coming soon — for now, start from a blank notebook or pick a public template.
        </p>

        <Button type="button" onClick={on_close} className="w-full">
          Got it
        </Button>
      </div>
    </div>
  );
}
