/**
 * HTML drag-and-drop helpers for the investigation cart.
 */

import type { DragEvent } from "react";

export const CART_QUESTION_DRAG_TYPE = "application/x-goldie-question-id";

/**
 * Stores a question id on the drag data transfer object.
 *
 * @param event - Drag start event from a question card
 * @param question_id - Tracked question id
 */
export function set_cart_question_drag(
  event: DragEvent,
  question_id: string,
): void {
  event.dataTransfer.setData(CART_QUESTION_DRAG_TYPE, question_id);
  event.dataTransfer.effectAllowed = "move";
}

/**
 * Reads the question id from a drop event.
 *
 * @param event - Drop event on a theme group
 * @returns Question id or null
 */
export function read_cart_question_drag(event: DragEvent): string | null {
  const id = event.dataTransfer.getData(CART_QUESTION_DRAG_TYPE);
  return id || null;
}

/**
 * @param event - Drag over event
 */
export function allow_cart_question_drop(event: DragEvent): void {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}
