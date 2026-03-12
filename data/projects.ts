import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "roxy-ai-assistant",
    title: "Roxy AI Assistant",
    category: "AI · BACKEND",
    problem:
      "Voice assistants lack real-time, full-duplex conversation with contextual reasoning and dynamic tool use.",
    result:
      "Built a real-time voice assistant with on-device VAD, STT, and fast TTS — enabling natural, low-latency conversations with LLM-powered tool use.",
    techSummary:
      "Python, LangChain, LangGraph, Groq LLM, MCP, Faster-Whisper, Kokoro TTS",
    description:
      "Developed a real-time voice assistant enabling full-duplex conversations with on-device VAD, STT, and fast TTS response. Integrated LangChain + LangGraph agent using MCP tools (FastMCP) for contextual reasoning and dynamic tool use. Implemented a Kokoro TTS pipeline with optional echo cancellation (AEC) for natural low-latency speech output. Built a modular system allowing easy swaps of VAD, STT, TTS, or LLM components for flexible configuration.",
    techStack: [
      "Python",
      "LangChain",
      "LangGraph",
      "Groq",
      "MCP",
      "Faster-Whisper",
      "Kokoro TTS",
    ],
    codeUrl: "https://github.com/SurajAiri/roxy-ai-assistant",
    featured: true,
  },
  {
    slug: "story-stream-automation",
    title: "Story Stream Automation",
    category: "AI · FULL STACK",
    problem:
      "Creating polished video content from text stories requires hours of manual editing and production work.",
    result:
      "Engineered a complete AI-powered video automation pipeline, reducing production time from hours to under 2 minutes with 15x faster rendering than MoviePy.",
    techSummary:
      "Python, OpenCV, NumPy, AI APIs, Custom Video Engine, TTS, LLM",
    description:
      "Engineered a complete AI-powered video automation pipeline transforming text stories into polished video content using a custom video editor, reducing production time from hours to under 2 minutes. Architected a modular video processing engine with 15+ text animations (typewriter, glitch, bounce) and smart media effects, delivering 15x faster rendering than MoviePy. Integrated AI-driven TTS, image generation, and precise audio transcription with timestamp synchronization, enabling fully automated script-to-video workflow with multi-resolution support.",
    techStack: ["Python", "OpenCV", "NumPy", "TTS", "LLM", "Custom Engine"],
    liveUrl: "https://mystorystream.netlify.app/",
    featured: true,
  },
  {
    slug: "orate-me",
    title: "Orate Me",
    category: "AI · FULL STACK",
    problem:
      "People preparing for interviews and presentations have no way to get detailed, AI-driven feedback on their speech quality.",
    result:
      "Built a full-stack generative AI platform analyzing 1,000+ speeches with 25%+ better feedback accuracy using Whisper and GPT-4.",
    techSummary:
      "Node.js, Express, MongoDB, LangChain, Whisper, GPT-4, Deepgram",
    description:
      "Developed a full-stack generative AI platform for personalized speech evaluation, helping users improve interviews, presentations, and fluency through AI-driven feedback and performance tracking. Engineered real-time evaluation pipeline analyzing 1,000+ speeches using Whisper and GPT-4 for tone, structure, and vocabulary assessment with 25%+ better feedback accuracy. Integrated LangChain and OpenAI to deliver contextual feedback, response enhancement suggestions, and mind maps — enabling contextual learning and better retention. Designed scalable backend infrastructure with Node.js, MongoDB, and JWT authentication, handling 50+ concurrent users and seamless multimedia processing.",
    techStack: [
      "Node.js",
      "Express",
      "MongoDB",
      "LangChain",
      "Whisper",
      "GPT-4",
      "Deepgram",
    ],
    liveUrl: "https://www.orateme.com",
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
