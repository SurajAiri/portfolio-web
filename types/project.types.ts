import type { MediaItem } from "./media.types";
import type { ProjectLink } from "./link.types";

// enum: AI, FULL STACK, FRONTEND, BACKEND, DATA SCIENCE, OTHER
export type ProjectCategory =
  | "AI"
  | "FULL STACK"
  | "FRONTEND"
  | "BACKEND"
  | "DATA SCIENCE"
  | "OTHER";
export type ProductType =
  | "WEB APP"
  | "API"
  | "CLI"
  | "MOBILE APP"
  | "LIBRARY"
  | "OTHER";

export interface ProjectTimeline {
  startDate: string; // ISO format date string
  endDate?: string; // ISO format date string, optional for ongoing projects
  isCurrent?: boolean; // true if this is the current project
}

// A single dated entry in a project's changelog/feature-history — e.g. "what
// was added when". Distinct from `oldProjectId`, which tracks a project
// being *replaced* by a newer, separate project.
export interface ProjectMilestone {
  date: string; // ISO format date string
  title: string; // e.g. "Added BYOK key management"
  description?: string;
}

export interface Project {
  id: string; // stable identifier — never change this even if `slug` changes,
  // since version chains (`oldProjectId`) reference `id`, not `slug`.

  // core project info
  slug: string;
  title: string;
  problem: string; // problem or pain point being addressed
  result: string; // impact or outcome achieved
  projectSummary: string; // concise summary of the project (what, how, impact)
  description: string; // detailed description of the project
  category: ProjectCategory[]; // order matters - primary category should be first
  tags: string[]; // specific technologies, frameworks, or methodologies used
  techStack: string[]; // broader tech stack used (e.g. Python, React, AWS)
  productType: ProductType[];
  timeline: ProjectTimeline;

  // milestones — optional changelog/feature-history timeline for this project
  milestones?: ProjectMilestone[];

  // media — images, gifs, videos, diagrams, demos (internal or external)
  media?: MediaItem[];

  // links — replaces the old fixed demoUrl/codeUrl/references fields.
  // Rendering priority is type-based (see LINK_TYPE_PRIORITY) with an
  // optional manual `order` as a tie-breaker.
  links?: ProjectLink[];

  featured: boolean; // whether to feature this project on the homepage
  isArchived?: boolean; // whether the project is archived or no longer maintained
  justFunProject: boolean; // whether this project was built just for fun or learning, without a specific problem statement or impact goal
  isMiniProject: boolean; // whether this is a smaller-scale project or prototype, not a full product
  oldProjectId?: string; // this project is a refined/replacement version of the project with this `id` (default undefined for new projects)
}
