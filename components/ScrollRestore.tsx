"use client";

import { useEffect } from "react";
import { consumeScrollRestore } from "@/lib/projectNav";

/**
 * Invisible helper: on mount, checks whether the visitor just pressed
 * "Back" on a project detail page targeting this exact path, and if so
 * jumps to their saved scroll offset. Renders nothing.
 *
 * Mount this once on any page that a project detail page can return to
 * (currently: the homepage and /projects), passing the same path string
 * used in ProjectBackNav's routing.
 */
export default function ScrollRestore({ path }: { path: string }) {
  useEffect(() => {
    consumeScrollRestore(path);
    // Only ever run once, right after mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
