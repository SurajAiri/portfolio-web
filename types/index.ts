export interface PersonalInfo {
  name: string;
  title: string;
  headline: string;
  bio: string[];
  email: string;
  linkedin: string;
  github: string;
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

export interface Project {
  slug: string;
  title: string;
  category: string;
  problem: string;
  result: string;
  techSummary: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  codeUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
}

export interface SkillCategory {
  name: string;
  items: string[];
}
