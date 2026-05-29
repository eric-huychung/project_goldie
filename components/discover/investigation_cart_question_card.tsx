/**
 * Single tracked question card — draggable into theme groups.
 */

"use client";

import { GripVertical, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { set_cart_question_drag } from "@/lib/discover/cart_drag";
import type {
  tracked_question,
  tracked_question_status,
} from "@/lib/types/discover";
import { cn } from "@/lib/utils";

const status_class_names: Record<tracked_question_status, string> = {
  todo: "bg-slate-100 text-slate-700",
  "in-progress": "bg-amber-100 text-amber-700",
  done: "bg-emerald-100 text-emerald-700",
};

type investigation_cart_question_card_props = {
  question: tracked_question;
  is_dragging?: boolean;
  on_status_change: (status: tracked_question_status) => void;
  on_text_change: (text: string) => void;
  on_notes_change: (notes: string) => void;
  on_remove: () => void;
  on_drag_start?: () => void;
};

/**
 * @param props - Question row handlers (theme assigned via drag-and-drop)
 */
export function InvestigationCartQuestionCard({
  question,
  is_dragging = false,
  on_status_change,
  on_text_change,
  on_notes_change,
  on_remove,
  on_drag_start,
}: investigation_cart_question_card_props) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        set_cart_question_drag(e, question.id);
        on_drag_start?.();
      }}
      className={cn(
        "p-2.5 border border-[#e5e7eb] rounded-lg bg-white flex gap-2 cursor-grab active:cursor-grabbing",
        is_dragging && "opacity-40",
      )}
    >
      <GripVertical
        className="w-4 h-4 text-muted-foreground shrink-0 mt-1"
        aria-hidden
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2 gap-2">
          <select
            value={question.status}
            onChange={(e) =>
              on_status_change(e.target.value as tracked_question_status)
            }
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "text-xs px-2 py-1 rounded-full border-none cursor-pointer shrink-0",
              status_class_names[question.status],
            )}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-red-500 shrink-0"
            onClick={on_remove}
            aria-label="Remove question"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
        <textarea
          value={question.text}
          onChange={(e) => on_text_change(e.target.value)}
          rows={2}
          className="w-full text-sm font-medium text-[#1f2937] mb-2 rounded-md border border-[#e5e7eb] px-2 py-1.5 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/20"
        />
        <textarea
          placeholder="Add notes..."
          value={question.notes}
          onChange={(e) => on_notes_change(e.target.value)}
          rows={2}
          className="w-full text-xs min-h-[48px] rounded-md border border-[#e5e7eb] px-2 py-1.5 resize-none text-[#1f2937] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/20"
        />
      </div>
    </div>
  );
}
