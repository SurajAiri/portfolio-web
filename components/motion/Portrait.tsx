"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { BrainCircuit, Database, Mic, Trophy } from "lucide-react";
import Image from "next/image";
import type { CSSProperties, PointerEvent, ReactNode } from "react";

type Chip = {
  label: string;
  icon: ReactNode;
  position: string;
  delay: string;
};

// Floating labels around the hero portrait. Each one is something the site
// already claims: the meta description (LLMs, voice AI), the experience list
// (RAG assistant), and the achievements list (SIH 2024).
const chips: Chip[] = [
  {
    label: "LLMs",
    icon: <BrainCircuit size={14} aria-hidden="true" />,
    position: "-left-10 top-8",
    delay: "0s",
  },
  {
    label: "Voice AI",
    icon: <Mic size={14} aria-hidden="true" />,
    position: "-right-4 top-24",
    delay: "-2s",
  },
  {
    label: "RAG",
    icon: <Database size={14} aria-hidden="true" />,
    position: "-left-6 bottom-24",
    delay: "-4s",
  },
  {
    label: "SIH 2024 winner",
    icon: <Trophy size={14} aria-hidden="true" />,
    position: "-right-3 -bottom-4",
    delay: "-1s",
  },
];

// Profile photo with a light travelling around its border, a soft glow, and a
// gentle 3D tilt toward the mouse. `badges` adds the floating labels (desktop
// only), used on the home page.
export default function Portrait({
  alt,
  sizes,
  badges = false,
  priority = false,
}: {
  alt: string;
  sizes: string;
  badges?: boolean;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 160, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 160, damping: 18 });

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 12);
    tiltX.set(-py * 12);
  };

  const onLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      className="relative w-20 md:w-full"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 animate-pulse rounded-[2rem] bg-accent/20 blur-3xl"
      />
      <div className="conic-ring rounded-[1.15rem] p-[2px]">
        <Image
          src="/profile.webp"
          alt={alt}
          width={512}
          height={512}
          sizes={sizes}
          priority={priority}
          className="block h-20 w-20 rounded-2xl object-cover md:h-auto md:w-full"
        />
      </div>

      {badges &&
        chips.map((chip) => (
          <span
            key={chip.label}
            style={{ "--float-delay": chip.delay } as CSSProperties}
            className={`float-y absolute hidden items-center gap-1.5 rounded-full border border-border bg-card/85 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-foreground shadow-lg shadow-black/30 backdrop-blur-md md:inline-flex ${chip.position}`}
          >
            <span className="text-accent">{chip.icon}</span>
            {chip.label}
          </span>
        ))}
    </motion.div>
  );
}
