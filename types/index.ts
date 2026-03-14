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
