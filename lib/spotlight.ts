import type { PointerEvent } from "react";

// Pointer handler for any card that carries the `spotlight` class
// (see globals.css). It writes the cursor position, relative to the card,
// into --mx / --my. Writing CSS variables directly (instead of React state)
// keeps this free of re-renders while the mouse moves.
export function spotlightMove(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
}
