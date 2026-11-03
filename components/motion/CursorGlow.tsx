"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect } from "react";

// A soft mint light that trails the mouse across the whole site. Only on
// devices with a real hover pointer, and never with reduced motion.
export default function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const opacity = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 110, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 110, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      opacity.set(1);
    };
    const onLeave = () => opacity.set(0);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, x, y, opacity]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY, opacity }}
      className="pointer-events-none fixed top-0 left-0 z-0 -mt-[260px] -ml-[260px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(79,217,160,0.09),transparent_65%)]"
    />
  );
}
