/**
 * Collapsible theme group — drop target for dragged questions.
 */

"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";

import { DeleteThemeConfirm } from "@/components/discover/delete_theme_confirm";
import { InvestigationCartQuestionCard } from "@/components/discover/investigation_cart_question_card";
import { ThemeColorPicker } from "@/components/discover/theme_color_picker";
import { Button } from "@/components/ui/button";
import {
  allow_cart_question_drop,
  read_cart_question_drag,
} from "@/lib/discover/cart_drag";
import type { cart_question_group } from "@/lib/discover/group_cart_questions";
import { INVESTIGATION_THEME_COLOR_STYLES } from "@/lib/discover/investigation_theme_colors";
import { UNCATEGORIZED_THEME_ID } from "@/lib/discover/uncategorized_theme";
import type {
  investigation_theme_color_key,
  tracked_question_status,
} from "@/lib/types/discover";
import { cn } from "@/lib/utils";

type investigation_cart_theme_group_props = {
  group: cart_question_group;
  default_collapsed?: boolean;
  dragging_question_id: string | null;
  on_status_change: (
    question_id: string,
    status: tracked_question_status,
  ) => void;
  on_text_change: (question_id: string, text: string) => void;
  on_notes_change: (question_id: string, notes: string) => void;
  on_drop_question: (question_id: string, theme_id: string) => void;
  on_remove: (question_id: string) => void;
  on_delete_theme: (theme_id: string) => void;
  on_update_theme_color: (
    theme_id: string,
    color_key: investigation_theme_color_key,
  ) => void;
  on_question_drag_start?: (question_id: string) => void;
};

/**
 * @param props - Group data, drag-drop handlers, and theme management
 */
export function InvestigationCartThemeGroup({
  group,
  default_collapsed = false,
  dragging_question_id,
  on_status_change,
  on_text_change,
  on_notes_change,
  on_drop_question,
  on_remove,
  on_delete_theme,
  on_update_theme_color,
  on_question_drag_start,
}: investigation_cart_theme_group_props) {
  const is_uncategorized = group.theme.id === UNCATEGORIZED_THEME_ID;
  const has_in_progress = group.questions.some(
    (q) => q.status === "in-progress",
  );
  const [collapsed, set_collapsed] = useState(
    default_collapsed && !has_in_progress,
  );
  const [drag_over, set_drag_over] = useState(false);
  const [confirm_delete, set_confirm_delete] = useState(false);

  const color_style = INVESTIGATION_THEME_COLOR_STYLES[group.theme.color_key];

  const handle_drop = (event: React.DragEvent) => {
    event.preventDefault();
    set_drag_over(false);
    const question_id = read_cart_question_drag(event);
    if (!question_id) {
      return;
    }
    on_drop_question(question_id, group.theme.id);
  };

  return (
    <section
      className={cn(
        "border-l-2 pl-3 transition-colors rounded-r-lg",
        color_style.border_class,
        drag_over && "bg-[#f8f9fa]/80 ring-1 ring-inset ring-[#e5e7eb]",
      )}
      onDragOver={(e) => {
        allow_cart_question_drop(e);
        set_drag_over(true);
      }}
      onDragLeave={() => set_drag_over(false)}
      onDrop={handle_drop}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <button
          type="button"
          onClick={() => set_collapsed((c) => !c)}
          className="p-0.5 text-muted-foreground hover:text-[#1f2937] shrink-0"
          aria-label={collapsed ? "Expand group" : "Collapse group"}
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        <ThemeColorPicker
          color_key={group.theme.color_key}
          on_select={(key) => on_update_theme_color(group.theme.id, key)}
        />

        <button
          type="button"
          onClick={() => set_collapsed((c) => !c)}
          className="flex items-center gap-2 flex-1 min-w-0 text-left"
        >
          <span className="text-sm font-medium text-[#1f2937] truncate">
            {group.label}
          </span>
          <span className="text-xs text-muted-foreground shrink-0">
            {group.questions.length}
          </span>
        </button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-red-500 shrink-0"
          onClick={() => set_confirm_delete(true)}
          aria-label={
            is_uncategorized
              ? "Remove uncategorized group"
              : `Delete theme ${group.label}`
          }
          title="Delete theme"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      {confirm_delete ? (
        <DeleteThemeConfirm
          theme_label={group.label}
          question_count={group.questions.length}
          is_uncategorized={is_uncategorized}
          on_cancel={() => set_confirm_delete(false)}
          on_confirm={() => {
            on_delete_theme(group.theme.id);
            set_confirm_delete(false);
          }}
        />
      ) : null}

      {!collapsed ? (
        <div className="space-y-2 pb-3 min-h-[2rem]">
          {group.questions.length === 0 ? (
            <p
              className={cn(
                "text-xs text-muted-foreground text-center py-3 rounded-lg border border-dashed border-[#e5e7eb]",
                drag_over && "border-amber-400 bg-amber-50/40 text-amber-800",
              )}
            >
              Drop questions here
            </p>
          ) : (
            group.questions.map((question) => (
              <InvestigationCartQuestionCard
                key={question.id}
                question={question}
                is_dragging={dragging_question_id === question.id}
                on_status_change={(status) =>
                  on_status_change(question.id, status)
                }
                on_text_change={(text) => on_text_change(question.id, text)}
                on_notes_change={(notes) => on_notes_change(question.id, notes)}
                on_remove={() => on_remove(question.id)}
                on_drag_start={() => on_question_drag_start?.(question.id)}
              />
            ))
          )}
        </div>
      ) : null}
    </section>
  );
}
