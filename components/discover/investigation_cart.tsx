/**
 * Investigation cart — questions grouped by theme with drag-and-drop.
 */

"use client";

import { useMemo, useState } from "react";
import { ClipboardList, X } from "lucide-react";

import { InvestigationCartAddTheme } from "@/components/discover/investigation_cart_add_theme";
import { InvestigationCartOrphanQuestions } from "@/components/discover/investigation_cart_orphan_questions";
import { InvestigationCartThemeGroup } from "@/components/discover/investigation_cart_theme_group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { use_investigation_cart } from "@/components/workspace/investigation_cart_provider";
import { group_cart_questions } from "@/lib/discover/group_cart_questions";
import { resolve_question_theme_id } from "@/lib/discover/uncategorized_theme";

/** Investigation cart panel width (readable questions + theme names). */
const CART_PANEL_CLASS = "w-[min(100vw,28rem)] shrink-0";

/**
 * Slide-out panel for questions under investigation across workspace tabs.
 */
export function InvestigationCart() {
  const {
    cart_open,
    set_cart_open,
    themes,
    tracked_questions,
    uncategorized_color_key,
    show_uncategorized_group,
    untrack_question,
    update_question_text,
    update_question_status,
    update_question_notes,
    set_question_theme,
    add_theme,
    delete_theme_group,
    update_theme_color,
  } = use_investigation_cart();

  const [dragging_question_id, set_dragging_question_id] = useState<
    string | null
  >(null);

  const orphan_questions = useMemo(
    () =>
      show_uncategorized_group
        ? []
        : tracked_questions.filter((q) => q.theme_id === null),
    [show_uncategorized_group, tracked_questions],
  );

  const groups = useMemo(
    () =>
      group_cart_questions(
        themes,
        tracked_questions,
        uncategorized_color_key,
        show_uncategorized_group,
      ),
    [
      themes,
      tracked_questions,
      uncategorized_color_key,
      show_uncategorized_group,
    ],
  );

  const has_content =
    themes.length > 0 ||
    tracked_questions.length > 0 ||
    orphan_questions.length > 0;

  if (!cart_open) {
    return null;
  }

  return (
    <aside
      className={`${CART_PANEL_CLASS} bg-white border-l border-[#e5e7eb] flex flex-col`}
    >
      <div className="p-4 border-b border-[#e5e7eb] flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <ClipboardList className="w-4 h-4 text-amber-500 shrink-0" />
          <h3 className="font-semibold text-[#1f2937] truncate">
            Investigation cart
          </h3>
          <Badge variant="secondary" className="text-xs shrink-0">
            {tracked_questions.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={() => set_cart_open(false)}
          aria-label="Close investigation cart"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onDragEnd={() => set_dragging_question_id(null)}
      >
        <InvestigationCartAddTheme on_add={add_theme} />

        {!has_content ? (
          <div className="text-center py-6">
            <p className="text-sm font-medium text-[#1f2937] mb-1">
              No questions yet
            </p>
            <p className="text-xs text-muted-foreground">
              Track questions from Discover or add a theme to organize them.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {groups.map((group, index) => (
              <InvestigationCartThemeGroup
                key={group.key}
                group={group}
                default_collapsed={index > 0}
                dragging_question_id={dragging_question_id}
                on_status_change={(question_id, status) =>
                  update_question_status(question_id, status)
                }
                on_text_change={(question_id, text) =>
                  update_question_text(question_id, text)
                }
                on_notes_change={(question_id, notes) =>
                  update_question_notes(question_id, notes)
                }
                on_drop_question={(question_id, theme_id) => {
                  set_question_theme(
                    question_id,
                    resolve_question_theme_id(theme_id),
                  );
                  set_dragging_question_id(null);
                }}
                on_remove={(question_id) => untrack_question(question_id)}
                on_delete_theme={delete_theme_group}
                on_update_theme_color={update_theme_color}
                on_question_drag_start={set_dragging_question_id}
              />
            ))}

            <InvestigationCartOrphanQuestions
              questions={orphan_questions}
              dragging_question_id={dragging_question_id}
              on_status_change={(question_id, status) =>
                update_question_status(question_id, status)
              }
              on_text_change={(question_id, text) =>
                update_question_text(question_id, text)
              }
              on_notes_change={(question_id, notes) =>
                update_question_notes(question_id, notes)
              }
              on_remove={(question_id) => untrack_question(question_id)}
              on_question_drag_start={set_dragging_question_id}
            />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[#e5e7eb]">
        <p className="text-xs text-muted-foreground text-center">
          Drag questions between themes · Click dot to pick a color
        </p>
      </div>
    </aside>
  );
}
