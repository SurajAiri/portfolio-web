export interface PersonalInfo {
  name: string;
  primaryTitle: string;
  secondaryTitle: string;
  headline: string;
  bio: string[];
  email: string;
  linkedin: string;
  github: string;
  pypi?: string;
  resumePath: string;
  otherLinks?: { label: string; url: string }[]; // additional labeled links (portfolio-wide, not project-specific)
}

export interface AboutSection {
  icon: string;
  title: string;
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  points: string[];
}

export interface Achievement {
  category: string;
  description: string;
}

// A single dated entry in the personal "journey" timeline shown on the
// About page — broader than `Experience`/`education`, spans the whole
// career arc (early hobby projects, internships, pivots, setbacks, etc).
export interface JourneyMilestone {
  period: string; // display label, e.g. "2024" or "Before 2022"
  title: string;
  description: string;
  tag?: "milestone" | "setback"; // "setback" renders with a muted/dashed style instead of the accent
  dividerAfter?: string; // if set, renders a dotted horizontal divider (with this label) right after this entry
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export * from "./project.types";
export * from "./media.types";
export * from "./link.types";
export * from "./certificate.types";
