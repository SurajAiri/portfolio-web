import type {
  PersonalInfo,
  AboutSection,
  Experience,
  Achievement,
  JourneyMilestone,
} from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Suraj Kiran Airi",
  primaryTitle: "AI Engineer",
  secondaryTitle: "Backend",
  headline: "I BUILD AI SYSTEMS THAT SOLVE REAL PROBLEMS.",
  bio: [
    "I'm an engineer who turns complex AI ideas into working products — fast, reliable, and built for real use.",
    "I work at the intersection of AI, backend engineering, and product thinking, focusing on shipping useful systems rather than chasing hype.",
    "Currently finishing my B.E. in Computer Science at Chandigarh University and actively building AI-powered tools and platforms.",
  ],
  email: "surajairi.ml@gmail.com",
  linkedin: "https://linkedin.com/in/suraj-kiran-airi",
  github: "https://github.com/SurajAiri",
  pypi: "https://pypi.org/user/imkas/",
  resumePath: "/resume.pdf",
};

export const aboutSections: AboutSection[] = [
  {
    icon: ">_",
    title: "HOW I WORK",
    description:
      "I start from the problem and define success criteria first. Then I build the smallest useful version, measure what changes, and iterate toward a reliable production system.",
  },
  {
    icon: "⚙",
    title: "WHERE I ADD VALUE",
    description:
      "End-to-end AI system development, fast MVP building, backend reliability, and real-time processing pipelines. I use the stack that best fits the problem, not the other way around.",
  },
  {
    icon: "🤖",
    title: "HOW I USE AI FOR CODING",
    description:
      "**For frontend:** I primarily use AI, then refine with AI. If AI isn't doing what I want, I dig into the code myself.\n **For backend and AI systems:** I first plan the architecture, test feasibility and working of each module separately in isolation (this helps me refine and deeply understand even unfamiliar parts), understand everything, then write a working version myself. I use AI to refine and optimize my existing code so it gets even better. \nDepending on module complexity, I skip some steps but the core principle stays: *understand first, build, then let AI sharpen the result.*",
  },
];

export const experience: Experience[] = [
  {
    role: "Freelance GenAI",
    company: "Self-employed",
    duration: "March 2025 – Present",
    location: "Remote",
    points: [
      "Automated end-to-end lead generation using n8n and Vapi for US based client, replacing manual prospecting with scraping, qualification, and AI-driven outbound voice workflows.",
      "Deployed a RAG-powered assistant that automated routine course and enrollment queries, reducing manual support workload for institute staff.",
    ],
  },
  {
    role: "Flutter Developer Intern",
    company: "YoursThatSenior & SN Silos",
    duration: "Jul 2023 – Sept 2024",
    location: "Remote & Hybrid",
    points: [
      "Completed two paid internships focusing on cross-platform mobile applications and data-driven API integrations.",
      "Gained experience in backend enhancements and performance optimization for improved system reliability.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Engineering in Computer Science and Engineering",
  university: "Chandigarh University",
  location: "Mohali, India",
  duration: "Aug 2022 – July 2026",
  cgpa: "8.65",
  coursework: "Machine Learning, Deep Learning, Generative AI, AI, DSA",
};

export const achievements: Achievement[] = [
  {
    category: "Hackathons",
    description:
      "Winner of Smart India Hackathon (SIH) 2024, Software Edition.",
  },
  {
    category: "Competitions",
    description:
      "Top 12% in Kaggle ML competition (443/3800+ teams); Won Work Force 2023, IEEE CIS CUSB.",
  },
  {
    category: "Technical",
    description:
      "Attended and taught 10+ ML sessions at university; Multiple ML certifications.",
  },
];

// Newest first — rendered top to bottom in JourneySection.
export const journey: JourneyMilestone[] = [
  {
    period: "2026",
    title: "Cooking up Something",
    description:
      "Currently working on a GenAI idea related to AI agent runtime platform & marketplace.",
  },
  {
    period: "2026",
    title: "Graduated B.E. in Computer Science",
    description:
      "Finishing my B.E. in Computer Science at Chandigarh University.",
  },
  {
    period: "2025",
    title: "Freelance GenAI",
    description:
      "Went full-time freelance building GenAI systems — automation workflows, RAG assistants, and agent platforms for clients.",
  },
  {
    period: "2024",
    title: "OrateMe",
    description:
      "Built and shipped OrateMe while learning AI and Generative AI in depth. The project ultimately failed, but it's where the shift into AI engineering really started.",
    tag: "setback",
  },
  {
    period: "2023",
    title: "Two Paid Internships",
    description:
      "Worked as a Flutter developer across two paid internships, shipping cross-platform apps and API integrations.",
  },
  {
    period: "2022",
    title: "Joined Chandigarh University",
    description: "Started my B.E. in Computer Science and Engineering.",
  },
  {
    period: "Before 2022",
    title: "Flutter & Freelancing",
    description: "Picked up Flutter and started freelancing.",
  },
  {
    period: "Before 2022",
    title: "Android (Java) & Unity Games",
    description:
      "Where it all started — building Android apps in Java and games in Unity, before I knew what Git was. Most of it is lost with no records left.",
    tag: "setback",
  },
];

export const valuePropositions = [
  "Practical AI for real product use-cases",
  "End-to-end delivery from concept to production",
  "Outcome-first engineering decisions",
  "Clear communication with product teams",
];
