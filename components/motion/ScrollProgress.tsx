"use client";

import { motion, useScroll, useSpring } from "motion/react";

// A thin mint-to-sky bar along the bottom edge of the navbar that fills as
// the page is scrolled. Place it inside the (fixed) header.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-gradient-to-r from-accent to-accent-2"
    />
  );
}
