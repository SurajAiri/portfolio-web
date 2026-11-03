"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

// Counts from 0 to `to` the first time it scrolls into view. The final value
// is in the server-rendered HTML, so it's correct with JavaScript off and for
// anyone who prefers reduced motion.
export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        el.textContent = `${prefix}${Math.round(value)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
