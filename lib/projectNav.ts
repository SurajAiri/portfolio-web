// Lightweight sessionStorage-backed helpers that let a project detail page
// send the visitor back to *exactly* where they came from — the featured
// strip on the homepage or a specific scroll offset on /projects — instead
// of always resetting to the top.
//
// Two keys are used, deliberately kept separate:
// - ORIGIN_KEY: written the moment someone clicks into a project. Read (not
//   consumed) by the detail page just to decide the back button's label and
//   target. Safe to leave around — it only ever affects the back button.
// - RESTORE_KEY: written only when the back button is actually pressed.
//   The destination page consumes (reads + deletes) it once on mount. This
//   split means navigating "home" via the navbar never triggers an
//   unexpected scroll jump — only pressing Back does.

export type ProjectOrigin = {
  from: "home" | "projects";
  scrollY: number;
};

type RestoreTarget = {
  path: string;
  scrollY: number;
};

const ORIGIN_KEY = "project-nav:origin";
const RESTORE_KEY = "project-nav:restore";

function isBrowser() {
  return typeof window !== "undefined";
}

/** Call right before navigating into a project's detail page. */
export function saveProjectOrigin(from: ProjectOrigin["from"]) {
  if (!isBrowser()) return;
  try {
    const origin: ProjectOrigin = { from, scrollY: window.scrollY };
    sessionStorage.setItem(ORIGIN_KEY, JSON.stringify(origin));
  } catch {
    // sessionStorage can throw in private-browsing edge cases — non-critical.
  }
}

// useSyncExternalStore requires getSnapshot to return the same reference
// across calls when nothing has changed. JSON.parse-ing on every call (as
// this used to do) returns a brand-new object each time, which reads as
// "always changed" and causes React to loop forever re-rendering. We cache
// the last raw string alongside its parsed result and only re-parse when
// the raw sessionStorage value has actually changed.
let cachedRaw: string | null = null;
let cachedOrigin: ProjectOrigin | null = null;

/** Read-only lookup used by the detail page's back button. Not consumed. */
export function getProjectOrigin(): ProjectOrigin | null {
  if (!isBrowser()) return null;
  try {
    const raw = sessionStorage.getItem(ORIGIN_KEY);
    if (raw === cachedRaw) {
      return cachedOrigin;
    }
    cachedRaw = raw;
    if (!raw) {
      cachedOrigin = null;
      return cachedOrigin;
    }
    const parsed = JSON.parse(raw);
    if (parsed?.from === "home" || parsed?.from === "projects") {
      cachedOrigin = parsed as ProjectOrigin;
    } else {
      cachedOrigin = null;
    }
    return cachedOrigin;
  } catch {
    cachedRaw = null;
    cachedOrigin = null;
    return null;
  }
}

/** Call at the moment the back button is pressed, right before navigating. */
export function armScrollRestore(path: string, scrollY: number) {
  if (!isBrowser()) return;
  try {
    const target: RestoreTarget = { path, scrollY };
    sessionStorage.setItem(RESTORE_KEY, JSON.stringify(target));
  } catch {
    // no-op
  }
}

/**
 * Call once on mount of a page that can be a scroll-restore destination.
 * Consumes (reads + removes) the stored target if it matches `path`, and
 * scrolls to it. Returns whether a restore happened, in case a caller wants
 * to skip its own mount-in animations.
 */
export function consumeScrollRestore(path: string): boolean {
  if (!isBrowser()) return false;
  try {
    const raw = sessionStorage.getItem(RESTORE_KEY);
    if (!raw) return false;
    sessionStorage.removeItem(RESTORE_KEY);
    const target: RestoreTarget = JSON.parse(raw);
    if (target.path !== path) return false;
    window.scrollTo({ top: target.scrollY, behavior: "instant" as ScrollBehavior });
    return true;
  } catch {
    return false;
  }
}
