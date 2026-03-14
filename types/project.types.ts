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
export interface Project {
  id: string;

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

  // references and media
  mediaUrls?: string[]; // images, gif, videos, or demos showcasing the project
  demoUrl?: string; // link to live demo or prototype
  codeUrl?: string; // link to GitHub repo or codebase
  references?: { [key: string]: string }; // additional links like case studies, articles, or presentations
  featured: boolean; // whether to feature this project on the homepage
  isArchived?: boolean; // whether the project is archived or no longer maintained
  justFunProject?: boolean; // whether this project was built just for fun or learning, without a specific problem statement or impact goal
  oldProjectId: string; // this project is refined version
}
