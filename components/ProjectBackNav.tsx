"use client";

import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  armScrollRestore,
  getProjectOrigin,
  type ProjectOrigin,
} from "@/lib/projectNav";

// sessionStorage is never going to change out from under us mid-render, so
// subscribe is a no-op — this is really just a hydration-safe way to read
// browser-only state (server and first client paint both get `null`, then
// the real value appears on the next tick without a manual effect+setState).
function subscribe() {
  return () => {};
}

function getServerSnapshot(): ProjectOrigin | null {
  return null;
}

export default function ProjectBackNav() {
  const router = useRouter();
  const origin = useSyncExternalStore(
    subscribe,
    getProjectOrigin,
    getServerSnapshot
  );

  if (!origin) {
    // No known origin (direct link, shared URL, fresh tab) — just offer the
    // full catalog rather than guessing.
    return (
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 font-mono text-xs tracking-wider text-white/40 transition-colors duration-200 hover:text-accent"
      >
        <ArrowLeft size={14} /> ALL PROJECTS
      </Link>
    );
  }

  const target = origin.from === "home" ? "/" : "/projects";
  const label =
    origin.from === "home" ? "BACK TO PROJECTS" : "BACK TO ALL PROJECTS";

  const handleBack = () => {
    armScrollRestore(target, origin.scrollY);
    router.push(target);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-1 font-mono text-xs tracking-wider text-white/40 transition-colors duration-200 hover:text-accent"
    >
      <ArrowLeft size={14} /> {label}
    </button>
  );
}
