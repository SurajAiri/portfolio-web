// Generalized, orderable link model — replaces the old fixed
// demoUrl/codeUrl/references fields on Project. Rendering priority is
// type-based (demo > code > docs > case-study > article > other) with an
// optional manual `order` as a tie-breaker within the same type, so new
// projects don't need per-link ordering to look right by default.

export type LinkType =
  | "demo"
  | "code"
  | "docs"
  | "case-study"
  | "article"
  | "other";

export interface ProjectLink {
  label: string; // "Live Demo", "GitHub", "Case Study", or any custom label
  url: string;
  type: LinkType;
  order?: number; // optional manual override within the same type
}

// Priority used by UI to decide default sort order (lower = shown first).
export const LINK_TYPE_PRIORITY: Record<LinkType, number> = {
  demo: 0,
  code: 1,
  docs: 2,
  "case-study": 3,
  article: 4,
  other: 5,
};
