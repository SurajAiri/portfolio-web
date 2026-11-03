"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

// A parent that reveals its children one after another when it scrolls into
// view. Wrap each child in the matching *Item component.
//   Stagger / StaggerItem         -> <div> / <div>
//   StaggerList / StaggerListItem -> <ul> / <li>   (keeps list semantics)

const listVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

type ParentProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
};

type ItemProps = { children: ReactNode; className?: string };

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
}: ParentProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={listVariants(stagger, delay)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: ItemProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

export function StaggerList({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
}: ParentProps) {
  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={listVariants(stagger, delay)}
    >
      {children}
    </motion.ul>
  );
}

export function StaggerListItem({ children, className }: ItemProps) {
  return (
    <motion.li className={className} variants={itemVariants}>
      {children}
    </motion.li>
  );
}
