"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// One switch for the whole site: visitors who ask their OS for reduced motion
// get no transform / layout animations from `motion` (fades still play).
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
