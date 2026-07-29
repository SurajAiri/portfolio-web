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

export interface SkillCategory {
  name: string;
  items: string[];
}

export * from "./project.types";
export * from "./media.types";
export * from "./link.types";
export * from "./certificate.types";
