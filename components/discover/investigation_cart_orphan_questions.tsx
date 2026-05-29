/**
 * Questions without a visible uncategorized group (shown after that group is removed).
 */

"use client";

import { InvestigationCartQuestionCard } from "@/components/discover/investigation_cart_question_card";
import type {
  tracked_question,
  tracked_question_status,
} from "@/lib/types/discover";

type investigation_cart_orphan_questions_props = {
  questions: tracked_question[];
  dragging_question_id: string | null;
  on_status_change: (
    question_id: string,
    status: tracked_question_status,
  ) => void;
  on_text_change: (question_id: string, text: string) => void;
  on_notes_change: (question_id: string, notes: string) => void;
  on_remove: (question_id: string) => void;
  on_question_drag_start?: (question_id: string) => void;
};

/**
 * @param props - Orphaned questions (theme_id null, uncategorized group hidden)
 */
export function InvestigationCartOrphanQuestions({
  questions,
  dragging_question_id,
  on_status_change,
  on_text_change,
  on_notes_change,
  on_remove,
  on_question_drag_start,
}: investigation_cart_orphan_questions_props) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <section className="space-y-2 pb-2">
      <p className="text-xs font-medium text-muted-foreground px-1">
        No theme ({questions.length})
      </p>
      {questions.map((question) => (
        <InvestigationCartQuestionCard
          key={question.id}
          question={question}
          is_dragging={dragging_question_id === question.id}
          on_status_change={(status) => on_status_change(question.id, status)}
          on_text_change={(text) => on_text_change(question.id, text)}
          on_notes_change={(notes) => on_notes_change(question.id, notes)}
          on_remove={() => on_remove(question.id)}
          on_drag_start={() => on_question_drag_start?.(question.id)}
        />
      ))}
    </section>
  );
}
