import { LINK_TYPE_PRIORITY, type Project } from "@/types";

export const projects: Project[] = [
  {
    id: "zensho-ai-video-editor",
    slug: "zensho",
    title: "Zensho - AI-Powered Desktop Video Editor",
    problem:
      "Turning raw screencast or facecam footage into a usable rough cut means manually scrubbing through hours of audio to cut stutters, dead air, and rambling takes — tedious work that delays the creative editing that actually matters, and most AI editing tools lock footage into a cloud pipeline or a proprietary subscription instead of a professional NLE workflow.",
    result:
      "Built a full desktop application that transcribes footage, uses an LLM to make AI-driven keep/cut decisions, and exports either directly or as a fully editable OpenTimelineIO timeline for DaVinci Resolve — with a custom LCS-based text-to-timestamp aligner and waveform-aware boundary snapping so cuts land on natural pauses rather than mid-word or mid-syllable.",
    projectSummary:
      "A privacy-first, BYOK desktop video editor (Electron + Python/FastAPI) that auto-generates AI rough cuts from screencasts via Deepgram transcription and LLM-driven editorial decisions, then exports non-destructively to DaVinci Resolve via OpenTimelineIO.",
    description:
      "Zensho is a hybrid desktop application: an Electron/React/Vite frontend drives a locally-spawned Python FastAPI backend over HTTP (bound to 127.0.0.1 for local-only traffic), chosen specifically so CPU/IO-heavy ffmpeg and transcription work never blocks the UI thread. The processing pipeline runs each video through ffmpeg audio extraction, Deepgram Nova-3 word-level transcription, and an LLM rough-cut pass (via LiteLLM, so any OpenAI-compatible or BYOK provider can be swapped in) that decides what to keep, cut, or treat as silence.\n\nKey technical achievements include:\n- Custom LCS-based transcript aligner: the LLM returns only the words worth keeping, and a hand-written Longest-Common-Subsequence dynamic-programming aligner maps that refined script back onto the original word-level timestamps, with 'last-occurrence-wins' tie-breaking so repeated takes resolve to the correct (latest) occurrence, and a minimum-LCS-ratio fallback that preserves all content rather than silently discarding it if the LLM paraphrases instead of cutting.\n- Waveform-aware boundary snapping: a separate preprocessor snaps every cut point to the nearest word boundary and then refines further by extracting a PCM window via ffmpeg and finding the minimum-RMS-energy point, so cuts fall in natural pauses instead of mid-syllable — with a repair pass that clamps overlaps and removes now-redundant silence segments between adjacent kept clips.\n- Serialized async processing queue: a singleton `asyncio.Queue` worker processes one video at a time through a `QUEUED → PREPROCESSING → TRANSCRIBING → ROUGH_CUTTING → COMPLETED` state machine, preventing concurrent ffmpeg instances and LLM rate-limit bans while the UI polls a `/status` endpoint for live progress.\n- Non-destructive DaVinci Resolve export: an OpenTimelineIO exporter builds a multi-FPS-safe `.otio` timeline (plus FCP XML) from the same 'resolved timeline' used for the in-app preview player and MP4 export, linking video/audio clips via matching reel metadata so Resolve treats them as synced pairs — letting editors drag the AI's decisions straight into a professional NLE with every cut still editable.\n- Human-in-the-loop editing model: AI-generated cuts (`rough_cut_ai`) are never overwritten — user edits are stored as a separate `rough_cut_human` layer, with all exporters resolving `rough_cut_human ?? rough_cut_ai` per video, so some clips in a project can carry human edits while others still use the raw AI cut.\n- Dual interface: the same backend core is exposed both through the Electron desktop app and a standalone CLI (`run`, `process`, `export`, `status`, `config`) for scripted or headless use.",
    category: ["AI", "FULL STACK"],
    tags: [
      "Electron",
      "FastAPI",
      "LLM Integration",
      "LiteLLM",
      "Deepgram",
      "OpenTimelineIO",
      "LCS Sequence Alignment",
      "Waveform Analysis",
      "Async Processing Queue",
      "IPC Context Bridge",
      "BYOK",
      "ffmpeg",
      "Pydantic",
      "State Machine Design",
    ],
    techStack: [
      "TypeScript",
      "React",
      "Vite",
      "Electron",
      "Tailwind CSS",
      "Python 3.12+",
      "FastAPI",
      "Uvicorn",
      "Pydantic",
      "asyncio",
      "Deepgram SDK",
      "LiteLLM",
      "OpenTimelineIO",
      "ffmpeg",
      "loguru",
    ],
    productType: ["WEB APP", "CLI"], // Desktop (Electron) app — using WEB APP since ProductType has no Desktop option, plus a standalone CLI
    timeline: { startDate: "2026-02-10", isCurrent: true }, // estimated — see note below

    // media: TEMPLATE — copy this shape once real screenshots/clips exist.
    // 1. Drop files in public/projects/zensho/ (e.g. cover.png, demo.mp4)
    // 2. Reference them here with a leading slash: "/projects/zensho/cover.png"
    // 3. Exactly one item should have role: "thumbnail" — that's what
    //    ProjectThumbnail renders on cards/grids; the rest show up in the
    //    detail-page gallery in `order`.
    // media: [
    //   {
    //     id: "zensho-cover",
    //     kind: "image",
    //     role: "thumbnail",
    //     src: "/projects/zensho/cover.png",
    //     caption: "Rough-cut timeline view",
    //     order: 0,
    //   },
    //   {
    //     id: "zensho-demo",
    //     kind: "video",
    //     role: "demo",
    //     src: "/projects/zensho/demo.mp4",
    //     poster: "/projects/zensho/demo-poster.jpg",
    //     caption: "End-to-end rough cut, screencast to DaVinci export",
    //     order: 1,
    //   },
    //   {
    //     id: "zensho-architecture",
    //     kind: "image",
    //     role: "diagram",
    //     src: "/projects/zensho/architecture.png",
    //     caption: "Electron <-> FastAPI pipeline",
    //     order: 2,
    //   },
    // ],

    media: [
      // {
      //   id: "zensho-demo-show-gif",
      //   kind: "gif",
      //   role: "thumbnail",
      //   src: "https://imgur.com/rbRYD1y",
      //   caption: "Showing demo page gif",
      //   order: 0,
      // },
      {
        id: "editor-paragraph-view-img",
        kind: "image",
        role: "thumbnail",
        src: "/projects/zensho/editor-paragraph-view.webp",
        caption: "MacOS app showing rough-cut paragraph view",
        order: 0,
      },
      {
        id: "",
        kind: "image",
        role: "thumbnail",
        src: "/projects/zensho/editor-segment-view.webp",
        caption: "MacOS app showing rough-cut segment view",
        order: 0,
      },
      {
        id: "zensho-demo-show-img",
        kind: "image",
        role: "demo",
        src: "/projects/zensho/zensho-demo.webp",
        caption: "Showing demo page image",
        order: 5,
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/surajairi/zensho",
        type: "code",
      },
    ],
    featured: true,
    isArchived: false,
    justFunProject: false,
    isMiniProject: false,
  },
  {
    id: "ai-video-editor-v1",
    slug: "ai-video-editor-v1",
    title: "AI Video Editor (V1)",

    problem:
      "Editing talking-head and tutorial videos manually is repetitive and slow, especially when removing retakes, filler words, and pauses before creating a first cut.",

    result:
      "Built an end-to-end AI-assisted editing pipeline that automates transcript-based rough cuts, supports human-in-the-loop review, and exports directly to production formats (MP4 and DaVinci-compatible timelines).",

    projectSummary:
      "Developed an async Python video editing system with FastAPI + CLI that extracts audio, transcribes with word timestamps, generates AI rough cuts, supports manual segment correction, and exports preview/final outputs plus DaVinci project files.",

    description:
      "AI Video Editor V1 is a backend-first editing platform focused on accelerating first-pass video editing. It processes raw videos through audio extraction, Deepgram transcription, and LLM-driven rough-cut generation, then allows users to refine segment validity before export. The system includes project/video lifecycle management, robust JSON persistence, and multiple export targets including preview MP4, high-quality MP4, and OTIO/XML for NLE workflows like DaVinci Resolve.",

    category: ["AI", "BACKEND"],
    tags: [
      "LLM rough-cut generation",
      "human-in-the-loop editing",
      "word-level transcription alignment",
      "video export pipeline",
      "DaVinci Resolve interoperability",
      "async processing",
      "REST API",
      "CLI workflow",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "Deepgram",
      "LiteLLM",
      "Groq",
      "FFmpeg",
      "OpenTimelineIO",
      "Pydantic",
      "Uvicorn",
    ],
    productType: ["API", "CLI"],

    timeline: {
      startDate: "2026-03-03",
      endDate: "2026-04-01",
    },

    // media: see the `zensho` project above for a filled-out example of this shape.
    links: [
      {
        label: "LinkedIn Post",
        url: "https://www.linkedin.com/posts/suraj-kiran-airi_tired-of-manually-scrubbing-through-raw-activity-7438282318278135808-O9BF?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD7jajsBvwGEXi6yaYT2pjENoYaMZaY5_74",
        type: "article",
      },
    ],

    featured: false,
    justFunProject: false,
    isMiniProject: false,
    isArchived: true,
  },
  {
    id: "sherlock-candidate-identifier",
    slug: "sherlock-candidate-identifier",
    title: "Sherlock — Real-Time Candidate Identifier",
    problem:
      "Modern hiring platforms can't verify that the person on screen during a video interview is actually the invited candidate — they may join under a pseudonym, a device name, or a mismatched display name. A one-shot name match is trivially defeated; the system needs to reason continuously as new signals arrive throughout the call.",
    result:
      "Built a complete three-service system (simulator, Next.js dashboard, Python inference engine) that runs 9 independent signal extractors in parallel — 7 rule-based and 2 LLM-backed — and maintains a live Bayesian belief over candidate identity, surfacing a real-time verdict with confidence and a per-signal reasoning trail on the dashboard.",
    projectSummary:
      "A real-time AI identification system that watches a simulated multi-participant video call and determines which participant is the actual interview candidate, using a Bayesian belief engine with log-odds accumulation, per-identifier exponential decay, and a 5-state detection state machine — all streamed live to a Next.js dashboard over WebSocket.",
    description:
      "Sherlock treats candidate identification as a continuous probabilistic inference problem rather than a name lookup. The system is split into three services that communicate over WebSocket: a Python scenario simulator, a Next.js relay dashboard, and a Python FastAPI belief engine.\n\nKey technical achievements include:\n- **Belief Engine**: Maintains two independent log-odds tracks per participant — `logit_candidate` (converted via softmax across all participants, so probabilities are zero-sum) and `logit_not_candidate` (converted via per-participant sigmoid, allowing multiple people to simultaneously be eliminated) — updated on every incoming event.\n- **Per-Identifier Decay**: Each identifier's contribution is stored as its own bucket with a configurable `decay_half_life`. Decayed values are summed lazily at read time (`raw * 0.5^(elapsed / half_life)`) so stale evidence fades without a background timer.\n- **9 Pluggable Identifiers**: `name_match`, `email_identity`, `host_organizer` (rule-based, one-time); `speaking_share`, `qa_pattern`, `screenshare_heuristic`, `silent_observer` (rule-based, continuous); `llm_name_role` and `llm_transcript_role` (LLM-backed via LiteLLM, fail-open — the engine stays fully functional if the LLM provider is unreachable).\n- **DAG-Ordered Processor Registry**: Identifiers are registered in a dependency DAG (Kahn's algorithm); downstream processors are guaranteed to run only after their dependencies have produced output into a shared Feature Cache.\n- **5-State Detection Machine**: `exploring → searching → likely_candidate → stable_candidate → lost_candidate`, with a warmup gate (≥ 20 s elapsed + ≥ 3 evidence pieces) to prevent premature mis-identification, and hysteresis (separate entry/exit thresholds + a streak requirement) to prevent flapping.\n- **Scenario Simulator**: Compiles YAML scenario files into a timed event stream (`participant_join`, `transcript_segment`, `screenshare_start`, etc.) over WebSocket at configurable playback speed; includes 9 authored scenarios covering edge cases like mid-call renames, silent observer farms, and webcam-off sessions.\n- **Next.js Dashboard**: Relays the event stream to the engine, displays live transcript, participant tiles, and an engine panel with real-time confidence scores and per-identifier reasoning lines; uses Zustand for session state and Zod for wire-format validation.",
    category: ["AI", "FULL STACK"],
    tags: [
      "Bayesian Inference",
      "Log-Odds Accumulation",
      "Exponential Decay",
      "Softmax",
      "WebSocket",
      "Event-Driven Architecture",
      "DAG Dependency Ordering",
      "State Machine",
      "LLM Integration",
      "Pluggable Identifiers",
      "Scenario Simulation",
      "YAML Scenario Authoring",
      "Zod Schema Validation",
      "Zustand",
      "Server-Sent Events",
    ],
    techStack: [
      "Python 3.12+",
      "FastAPI",
      "LiteLLM",
      "uvicorn",
      "websockets",
      "pydantic",
      "pyyaml",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Zustand",
      "Zod",
      "shadcn/ui",
      "Turborepo",
      "pnpm",
    ],
    productType: ["WEB APP", "API"],
    timeline: {
      startDate: "2026-07-11",
      endDate: "2026-07-19",
      isCurrent: false,
    },
    links: [
      {
        label: "GitHub",
        url: "https://github.com/SurajAiri/challenge-sherlocks-ai-identify-candidate",
        type: "code",
      },
    ],
    featured: false,
    isArchived: false,
    justFunProject: false,
    isMiniProject: false,
  },

  {
    id: "merobot-ai-assistant",
    slug: "merobot",
    title: "MeroBot - Personal AI Assistant",
    problem:
      "Building a robust personal AI assistant requires integrating multiple components: LLM providers, communication channels, tool execution, and maintaining conversation context, all while ensuring security, extensibility, and performance.",
    result:
      "Developed a fully functional AI assistant with 8 built-in tools, supporting multiple LLM providers and Telegram integration, demonstrating expertise in async Python development, API design, and agent-based architectures.",
    projectSummary:
      "An opinionated personal AI assistant built from scratch with Python, featuring iterative tool-calling, message-bus architecture, and sandboxed execution - enabling complex multi-step tasks through LLM-driven automation.",
    description:
      "MeroBot is a comprehensive AI assistant that bridges communication channels (currently Telegram) with large language models through an async-first message-bus architecture. The system implements an iterative agent loop where the LLM can chain up to 10 tool calls per message, enabling sophisticated multi-step reasoning and task execution.\n\nKey technical achievements include:\n- **Modular Architecture**: Clean separation of concerns with dedicated layers for agents, communication handlers, LLM providers, and tools\n- **Tool Ecosystem**: 8 built-in tools covering file operations, web search/scraping, code execution, database queries, and sub-agent delegation\n- **Provider Flexibility**: Pluggable LLM backend supporting OpenAI-compatible APIs, LiteLLM (100+ providers), and direct HTTP implementations\n- **Security & Sandboxing**: All file and code operations confined to a configurable workspace directory\n- **Async Design**: Full asyncio implementation with message queues for scalable, non-blocking operations\n- **Extensibility**: Well-documented ABCs and interfaces for adding new channels, providers, and tools",
    category: ["AI", "FULL STACK"],
    tags: [
      "Python",
      "Asyncio",
      "Telegram Bot API",
      "LLM Integration",
      "Tool Calling",
      "Web Scraping",
      "Code Execution",
      "SQLite",
      "Message Bus Architecture",
      "API Design",
      "Sandboxing",
      "HTTP Clients",
      "JSON Schema Validation",
    ],
    techStack: [
      "Python 3.12+",
      "python-telegram-bot",
      "httpx",
      "BeautifulSoup4",
      "LiteLLM",
      "loguru",
      "python-dotenv",
      "ai-tools-executor",
    ],
    productType: ["CLI", "API"],
    timeline: {
      startDate: "2026-02-10",
      endDate: "2026-03-01",
      isCurrent: false,
    },
    links: [
      {
        label: "GitHub",
        url: "https://github.com/surajairi/merobot",
        type: "code",
      },
    ],
    homeTags: ["agents"],
    featured: true,
    isArchived: false,
    justFunProject: false,
    isMiniProject: false,
  },
  {
    id: "ai-screenshot-organizer",
    slug: "ai-screenshot-organizer",
    title: "AI Screenshot Organizer",

    problem:
      "Large screenshot folders become hard to search and maintain. Manual sorting is repetitive, inconsistent, and usually skips useful metadata like what the screenshot contains.",
    result:
      "Built a working AI-powered CLI that auto-categorizes screenshots, renames/moves them into structured folders, stores searchable metadata in SQLite, and generates an interactive HTML report for quick review.",
    projectSummary:
      "CLI tool that uses a vision LLM to analyze screenshots, classify them into practical categories, persist metadata in SQLite, and produce a filterable report (grid/table) with Finder shortcuts.",
    description:
      "AI Screenshot Organizer is a Python CLI-first utility designed to reduce screenshot clutter. It scans image files, sends each to a vision-capable LLM through LiteLLM, parses structured JSON output with fallback-safe parsing strategies, and moves files into category folders with collision-safe naming. Each item is saved to SQLite with batch IDs and timestamps, enabling filtered retrieval by category, search term, and run. The project also ships a self-contained HTML visualizer with grid/table modes, category filter pills, and local file links for fast triage. Runtime workspace management and environment key handling are built into the CLI to keep setup simple across providers.",

    category: ["AI", "BACKEND", "OTHER"],
    tags: [
      "Vision LLM",
      "Screenshot Classification",
      "LiteLLM",
      "SQLite",
      "Argparse CLI",
      "Batch Processing",
      "HTML Report Generation",
      "JSON Parsing",
      "File System Automation",
      "Pytest",
    ],
    techStack: [
      "Python 3.12",
      "LiteLLM",
      "SQLite",
      "Loguru",
      "python-dotenv",
      "Pytest",
      "Ruff",
    ],
    productType: ["CLI"],
    timeline: {
      startDate: "2026-03-10",
      isCurrent: true,
    },

    links: [
      {
        label: "GitHub",
        url: "https://github.com/SurajAiri/ai-screenshot-organizer",
        type: "code",
      },
    ],
    featured: false,
    justFunProject: true,
    isMiniProject: false,
    isArchived: false,
  },

  {
    id: "ai-tools-executor",
    slug: "ai-tools-executor",
    title: "AI Tools Executor",

    problem:
      "LLM agents often receive full schemas for all available tools on every turn, which bloats context, increases token cost, and hurts tool-selection accuracy.",

    result:
      "Built and published a Python package on PyPI that introduces a 3-meta-tool execution layer, reducing tool-context overhead by exposing tools on demand and using Python function-call syntax with AST-based validation. Added robust validation/error formatting and 90 automated tests.",

    projectSummary:
      "A zero-dependency Python library that helps AI agents discover and execute tools efficiently through search_tools, execute, and describe_tool, with safe AST parsing, partial-failure handling, and pluggable search strategies.",

    description:
      "AI Tools Executor is an executor abstraction between LLM agents and real tool functions. Instead of sending every tool schema to the model each turn, the agent works through three meta-tools: search_tools for discovery, execute for running one or many calls, and describe_tool for deep docs. The execution path parses Python call syntax via ast.parse (without executing arbitrary code), validates parameters against a registry, and returns structured per-call outcomes so multi-call requests can partially succeed. The library includes async execution, thread-safe registry operations, customizable search strategies, OpenAI-compatible meta-tool schema helpers, and a consistent error format designed for agent self-correction. The project is packaged for PyPI and targets Python 3.10+ with no runtime dependencies.",

    category: ["AI", "BACKEND"],
    tags: [
      "LLM tooling",
      "Agent orchestration",
      "Tool execution layer",
      "AST parsing",
      "Function-call syntax",
      "Token optimization",
      "Meta-tools",
      "Error handling",
      "Async execution",
      "Thread-safe registry",
    ],
    techStack: [
      "Python",
      "AST",
      "PyPI",
      "setuptools",
      "pytest",
      "pytest-asyncio",
      "ruff",
      "uv",
    ],
    productType: ["LIBRARY", "CLI"],

    timeline: {
      startDate: "2026-02-28",
      // isCurrent: true,
      endDate: "2026-03-12",
    },

    links: [
      {
        label: "PyPI",
        url: "https://pypi.org/project/ai-tools-executor/",
        type: "demo",
      },
      {
        label: "GitHub",
        url: "https://github.com/SurajAiri/ai-tools-executor",
        type: "code",
      },
      {
        label: "Architecture Docs",
        url: "https://github.com/SurajAiri/ai-tools-executor/blob/main/docs/architecture.md",
        type: "docs",
      },
      {
        label: "Usage Guide",
        url: "https://github.com/SurajAiri/ai-tools-executor/blob/main/docs/how-to-use.md",
        type: "docs",
      },
    ],

    homeTags: ["libraries"],
    featured: true,
    isArchived: false,
    justFunProject: false,
    isMiniProject: false,
  },
  {
    id: "visualkit",
    slug: "visualkit",
    title: "VisualKit",

    problem:
      "Creating short-form videos from mixed assets (images, clips, subtitles, transitions) usually requires heavy editors or brittle scripts, making repeatable content production slow and hard to automate.",

    result:
      "Built and published a reusable Python library on PyPI (v0.1.4) that renders scripted videos through a deterministic JSON project format, with modular effects/transitions, subtitle animations, and configurable resize strategies.",

    projectSummary:
      "A pure-Python video composition toolkit that converts JSON timelines into rendered MP4 output using OpenCV + NumPy, supporting media effects, transition pipelines, and animated subtitles for automated short-form content workflows.",

    description:
      "VisualKit is a scriptable video-rendering library focused on automation rather than manual editing. The architecture separates concerns into media elements, transition elements, subtitle rendering, timeline orchestration, and video config validation. It supports both image and video assets, multiple motion/stylistic effects, a broad transition set, and subtitle animation modes (typewriter/fade/simple) with wrapping and background styling. The rendering flow loads a JSON project, builds a timeline, resolves frame-by-frame composition, applies transitions between adjacent media nodes, overlays subtitles, and writes encoded output via OpenCV VideoWriter. The package is distributed through PyPI and designed for extension by adding new effects, transitions, and animation branches.",

    category: ["BACKEND", "OTHER"],
    tags: [
      "video-processing",
      "opencv",
      "subtitle-animation",
      "timeline-rendering",
      "json-driven-pipeline",
      "media-effects",
      "transitions",
      "python-package",
    ],
    techStack: ["Python", "OpenCV", "NumPy", "Setuptools", "PyPI"],
    productType: ["LIBRARY"],

    timeline: {
      startDate: "2025-07-13",
      endDate: "2025-08-24",
      isCurrent: false,
    },

    links: [
      {
        label: "GitHub",
        url: "https://github.com/surajairi/visualkit",
        type: "code",
      },
      {
        label: "PyPI",
        url: "https://pypi.org/project/visualkit/",
        type: "demo",
      },
    ],

    homeTags: ["libraries"],
    featured: false,
    isArchived: false,
    justFunProject: false,
    isMiniProject: false,
  },
  {
    id: "openalert-fullstack-mobile-alerting",
    slug: "openalert",
    title: "OpenAlert",
    problem:
      "Critical alerts can be missed when users rely on passive notifications. OpenAlert was built to deliver high-priority, actionable mobile alerts and connect external events (like inbox webhooks) to immediate user attention.",
    result:
      "Delivered a working full-stack alerting system with authenticated mobile users, device token management, webhook-driven push notifications, and in-app alarm controls. The project demonstrates end-to-end ownership across mobile client, API design, authentication, notification delivery, and deployment-ready configuration.",
    projectSummary:
      "OpenAlert is a Flutter + Node.js system that turns external events into actionable mobile alerts. It combines JWT-based auth, FCM push delivery, device registration, and alarm-style notification behavior to support faster user response for urgent events.",
    description:
      "Built a full-stack alerting platform with a Flutter mobile app and an Express/MongoDB backend. The app supports registration/login, token persistence, FCM setup, local notification handling, alarm playback/stop actions, and device connectivity views. The backend exposes REST APIs for auth, device registration, and notification/webhook actions, using JWT auth middleware, Joi validation, Mongoose models, and Firebase Admin for push delivery. A cron-based health-check mechanism was added for service uptime monitoring. Backend was configured for hosted API usage and webhook token validation for controlled external triggering.",
    category: ["FULL STACK", "BACKEND", "FRONTEND"],
    tags: [
      "Firebase Cloud Messaging",
      "Push Notifications",
      "Webhook Integration",
      "JWT Authentication",
      "Device Token Management",
      "Alarm Notifications",
      "REST API",
      "Render Deployment",
    ],
    techStack: [
      "Flutter",
      "Dart",
      "Firebase Core",
      "Firebase Messaging",
      "flutter_local_notifications",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Firebase Admin SDK",
      "JWT",
      "Joi",
      "node-cron",
    ],
    productType: ["MOBILE APP", "API"],
    timeline: {
      startDate: "2025-12-12",
      endDate: "2026-03-10",
      isCurrent: false,
    },
    links: [
      {
        label: "GitHub",
        url: "https://github.com/SurajAiri/openalert-flutter",
        type: "code",
      },
      {
        label: "Backend Repository",
        url: "https://github.com/SurajAiri/OpenAlertBackend",
        type: "code",
      },
    ],
    featured: false,
    isArchived: true,
    justFunProject: false,
    isMiniProject: false,
  },
  {
    id: "proj-roxy-ai-assistant",
    slug: "roxy-ai-assistant",
    title: "Roxy AI Assistant",
    category: ["AI", "BACKEND"],
    problem:
      "Voice assistants lack real-time, full-duplex conversation with contextual reasoning and dynamic tool use.",
    result:
      "Built a real-time voice assistant with on-device VAD, STT, and fast TTS — enabling natural, low-latency conversations with LLM-powered tool use.",
    projectSummary:
      "Real-time voice AI assistant with full-duplex conversation, dynamic MCP tool usage, and low-latency speech pipeline.",
    description:
      "Developed a real-time voice assistant enabling full-duplex conversations with on-device VAD, STT, and fast TTS response. Integrated LangChain + LangGraph agent using MCP tools (FastMCP) for contextual reasoning and dynamic tool use. Implemented a Kokoro TTS pipeline with optional echo cancellation (AEC) for natural low-latency speech output. Built a modular system allowing easy swaps of VAD, STT, TTS, or LLM components for flexible configuration.",
    tags: ["real-time", "voice assistant", "agentic ai", "mcp", "low latency"],
    techStack: [
      "Python",
      "LangChain",
      "LangGraph",
      "Groq",
      "MCP",
      "Faster-Whisper",
      "Kokoro TTS",
    ],
    productType: ["CLI", "API"],
    timeline: {
      startDate: "2025-11-01",
      endDate: "2026-01-15",
    },
    links: [
      {
        label: "GitHub",
        url: "https://github.com/SurajAiri/roxy-ai-assistant",
        type: "code",
      },
    ],
    homeTags: ["agents"],
    featured: false,
    justFunProject: true,
    isMiniProject: true,
    isArchived: false,
  },
  {
    id: "proj-story-stream-automation",
    slug: "story-stream-automation",
    title: "Story Stream Automation",
    category: ["AI", "FULL STACK"],
    problem:
      "Creating polished video content from text stories requires hours of manual editing and production work.",
    result:
      "Engineered a complete AI-powered video automation pipeline, reducing production time from hours to under 2 minutes with 15x faster rendering than MoviePy.",
    projectSummary:
      "End-to-end script-to-video automation system with custom render engine, AI generation, and fast multi-resolution export.",
    description:
      "Engineered a complete AI-powered video automation pipeline transforming text stories into polished video content using a custom video editor, reducing production time from hours to under 2 minutes. Architected a modular video processing engine with 15+ text animations (typewriter, glitch, bounce) and smart media effects, delivering 15x faster rendering than MoviePy. Integrated AI-driven TTS, image generation, and precise audio transcription with timestamp synchronization, enabling fully automated script-to-video workflow with multi-resolution support.",
    tags: [
      "video automation",
      "content pipeline",
      "render engine",
      "ai media",
      "production tooling",
    ],
    techStack: ["Python", "OpenCV", "NumPy", "TTS", "LLM", "Custom Engine"],
    productType: ["WEB APP"],
    timeline: {
      startDate: "2025-05-01",
      endDate: "2025-08-20",
    },
    links: [
      {
        label: "Live Demo",
        url: "https://mystorystream.netlify.app/",
        type: "demo",
      },
    ],
    featured: false,
    justFunProject: false,
    isMiniProject: false,
    isArchived: true,
  },
  {
    id: "proj-orate-me",
    slug: "orate-me",
    title: "Orate Me",
    category: ["AI", "FULL STACK"],
    problem:
      "People preparing for interviews and presentations have no way to get detailed, AI-driven feedback on their speech quality.",
    result:
      "Built a full-stack generative AI platform analyzing 1,000+ speeches with 25%+ better feedback accuracy using Whisper and GPT-4.",
    projectSummary:
      "Speech coaching platform that evaluates recordings with AI models and delivers contextual feedback, scoring, and improvements.",
    description:
      "Developed a full-stack generative AI platform for personalized speech evaluation, helping users improve interviews, presentations, and fluency through AI-driven feedback and performance tracking. Engineered real-time evaluation pipeline analyzing 1,000+ speeches using Whisper and GPT-4 for tone, structure, and vocabulary assessment with 25%+ better feedback accuracy. Integrated LangChain and OpenAI to deliver contextual feedback, response enhancement suggestions, and mind maps — enabling contextual learning and better retention. Designed scalable backend infrastructure with Node.js, MongoDB, and JWT authentication, handling 50+ concurrent users and seamless multimedia processing.",
    tags: [
      "speech analysis",
      "interview prep",
      "llm feedback",
      "audio intelligence",
      "edtech",
    ],
    techStack: [
      "Node.js",
      "Express",
      "MongoDB",
      "LangChain",
      "Whisper",
      "GPT-4",
      "Deepgram",
    ],
    productType: ["WEB APP"],
    timeline: {
      startDate: "2024-12-01",
      endDate: "2025-03-15",
    },
    links: [
      {
        label: "Live Site",
        url: "https://www.orateme.com",
        type: "demo",
      },
    ],
    featured: false,
    justFunProject: false,
    isMiniProject: false,
    isArchived: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

function formatMonthYear(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatProjectTimeline(project: Project): string {
  const { startDate, endDate, isCurrent } = project.timeline;
  const start = formatMonthYear(startDate);

  if (isCurrent || !endDate) {
    return `${start} - Present`;
  }

  return `${start} - ${formatMonthYear(endDate)}`;
}

// Sorts a project's links by type priority, then by optional manual `order`
// as a tie-breaker within the same type.
export function getSortedProjectLinks(project: Project) {
  const links = project.links ?? [];
  return [...links].sort((a, b) => {
    const priorityDiff =
      LINK_TYPE_PRIORITY[a.type] - LINK_TYPE_PRIORITY[b.type];
    if (priorityDiff !== 0) return priorityDiff;
    return (a.order ?? 0) - (b.order ?? 0);
  });
}

// Sorts a project's media items by explicit `order`.
export function getSortedProjectMedia(project: Project) {
  return [...(project.media ?? [])].sort((a, b) => a.order - b.order);
}

// Walks the `oldProjectId` chain to find the project that replaced this one
// (if any), so UI can show "Superseded by X" banners.
export function getSupersedingProject(project: Project) {
  return projects.find((p) => p.oldProjectId === project.id);
}

// Looks up the project this one replaces (if any), so UI can show
// "Rebuilt version of X" banners.
export function getSupersededProject(project: Project) {
  if (!project.oldProjectId) return undefined;
  return projects.find((p) => p.id === project.oldProjectId);
}
