"use client";

import type { HTMLAttributes } from "react";
import { spotlightMove } from "@/lib/spotlight";

// A plain <div> with the cursor-following light from globals.css (.spotlight).
// Use it from server components, where an event handler can't be passed.
export default function SpotlightCard({
  className = "",
  onPointerMove,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      onPointerMove={(event) => {
        spotlightMove(event);
        onPointerMove?.(event);
      }}
      className={`spotlight relative ${className}`}
    />
  );
}
