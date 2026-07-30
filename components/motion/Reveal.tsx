"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

const OFFSET = 24;

function getVariants(direction: Direction): Variants {
  const hiddenOffset =
    direction === "up"
      ? { y: OFFSET }
      : direction === "left"
        ? { x: -OFFSET }
        : direction === "right"
          ? { x: OFFSET }
          : {};

  return {
    hidden: { opacity: 0, ...hiddenOffset },
    visible: { opacity: 1, x: 0, y: 0 },
  };
}

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  className,
  amount = 0.2,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants(direction)}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
