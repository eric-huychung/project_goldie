/**
 * Investigation cart — questions grouped by theme, plus editable stories.
 */

"use client";

import { useMemo, useState } from "react";
import { ClipboardList, X } from "lucide-react";

import { InvestigationCartAddStory } from "@/components/discover/investigation_cart_add_story";
import { InvestigationCartAddTheme } from "@/components/discover/investigation_cart_add_theme";
import { InvestigationCartOrphanQuestions } from "@/components/discover/investigation_cart_orphan_questions";
import { InvestigationCartPanelToggle } from "@/components/discover/investigation_cart_panel_toggle";
import { InvestigationCartStoryCard } from "@/components/discover/investigation_cart_story_card";
import { InvestigationCartThemeGroup } from "@/components/discover/investigation_cart_theme_group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { use_investigation_cart } from "@/components/workspace/investigation_cart_provider";
import { group_cart_questions } from "@/lib/discover/group_cart_questions";
import { resolve_question_theme_id } from "@/lib/discover/uncategorized_theme";

/** Investigation cart panel width (readable questions + theme names). */
const CART_PANEL_CLASS = "w-[min(100vw,28rem)] shrink-0";

/**
 * Slide-out panel for questions and stories across workspace tabs.
 */
export function InvestigationCart() {
  const {
    cart_open,
    set_cart_open,
    themes,
    tracked_questions,
    tracked_stories,
    cart_panel,
    set_cart_panel,
    uncategorized_color_key,
    show_uncategorized_group,
    untrack_question,
    update_question_text,
    update_question_status,
    update_question_notes,
    set_question_theme,
    add_theme,
    add_custom_story,
    delete_theme_group,
    update_theme_color,
    update_story_title,
    update_story_body,
    remove_story,
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

  const theme_name_by_id = useMemo(
    () => new Map(themes.map((theme) => [theme.id, theme.name])),
    [themes],
  );

  const has_theme_content =
    themes.length > 0 ||
    tracked_questions.length > 0 ||
    orphan_questions.length > 0;

  const cart_item_count = tracked_questions.length + tracked_stories.length;

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
            {cart_item_count}
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

      <div className="px-4 pt-4">
        <InvestigationCartPanelToggle
          active_panel={cart_panel}
          theme_count={groups.length}
          story_count={tracked_stories.length}
          on_change={set_cart_panel}
        />
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onDragEnd={() => set_dragging_question_id(null)}
      >
        {cart_panel === "themes" ? (
          <>
            <InvestigationCartAddTheme on_add={add_theme} />

            {!has_theme_content ? (
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
          </>
        ) : (
          <>
            <InvestigationCartAddStory on_add={add_custom_story} />

            {tracked_stories.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-sm font-medium text-[#1f2937] mb-1">
                  No stories yet
                </p>
                <p className="text-xs text-muted-foreground">
                  Add your own story above, or pick one from Communicate.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {tracked_stories.map((story, index) => (
                  <InvestigationCartStoryCard
                    key={story.id}
                    story={story}
                    theme_label={
                      story.theme_id
                        ? (theme_name_by_id.get(story.theme_id) ?? null)
                        : null
                    }
                    default_collapsed={index > 0}
                    on_title_change={(title) =>
                      update_story_title(story.id, title)
                    }
                    on_body_change={(body) => update_story_body(story.id, body)}
                    on_remove={() => remove_story(story.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="p-4 border-t border-[#e5e7eb]">
        <p className="text-xs text-muted-foreground text-center">
          {cart_panel === "themes"
            ? "Drag questions between themes · Click dot to pick a color"
            : "+ Story to add your own · Edit title and body below"}
        </p>
      </div>
    </aside>
  );
}
