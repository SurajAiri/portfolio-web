"use client";

import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-foreground"
    >
      Back to top
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors duration-200 group-hover:border-accent group-hover:text-accent">
        <ArrowUp
          size={14}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:-translate-y-0.5"
        />
      </span>
    </button>
  );
}
