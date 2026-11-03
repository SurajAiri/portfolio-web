"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Types a phrase, holds it, deletes it, then types the next one. Starts on the
// first phrase already fully typed so the server-rendered HTML is meaningful.
// Pass a stable array (a module-level constant) for `phrases`.
export default function TypedText({
  phrases,
  className,
}: {
  phrases: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(phrases[0] ?? "");

  useEffect(() => {
    if (reduce || phrases.length < 2) return;

    let index = 0;
    let length = phrases[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (deleting) {
        length -= 1;
        setText(phrases[index].slice(0, Math.max(length, 0)));
        if (length <= 0) {
          deleting = false;
          index = (index + 1) % phrases.length;
          timer = setTimeout(tick, 280);
          return;
        }
        timer = setTimeout(tick, 28);
      } else {
        length += 1;
        setText(phrases[index].slice(0, length));
        if (length >= phrases[index].length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
        timer = setTimeout(tick, 55);
      }
    };

    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [reduce, phrases]);

  return (
    <span className={className}>
      {/* Screen readers get the whole list once instead of a typing stream. */}
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="caret" />
      </span>
    </span>
  );
}
