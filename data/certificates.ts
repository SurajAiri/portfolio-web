import type { Certificate } from "@/types";

// Add your certificates here. Example shape:
//
// {
//   id: "aws-ml-specialty-2025",
//   title: "AWS Certified Machine Learning – Specialty",
//   issuer: "Amazon Web Services",
//   date: "2025-06-01",
//   previewImageUrl: "/certificates/aws-ml-specialty.webp",
//   pdfUrl: "/certificates/aws-ml-specialty.pdf",
//   credentialUrl: "https://www.credly.com/badges/...",
//   skills: ["Machine Learning", "AWS", "MLOps"],
//   highlights: [
//     "Model deployment and monitoring on SageMaker",
//     "Feature engineering and data pipelines",
//   ],
//   featured: true,
//   showOnHome: true,   // include in the home page strip
//   showOnAbout: true,  // include in the About page section
// },
//
// Certificates always show in full on the dedicated /certificates page,
// ordered by `order` (falls back to most-recent-date). Set showOnHome /
// showOnAbout to hand-pick the smaller subset shown on those pages.

export const certificates: Certificate[] = [
  {
    id: "ibm-genai-engineer",
    title: "IBM Generative AI Engineer",
    issuer: "Coursera / IBM",
    date: "2025-06-25",
    previewImageUrl: "/certificates/ibm-genai-engg/preview.webp",
    credentialUrl: "https://coursera.org/verify/professional-cert/M4MLAG8W3N80",
    skills: ["Generative AI", "Prompt Engineering", "AI System Design"],
    order: 1,
    featured: true,
    type: "specialized",
    showOnHome: true,
    showOnAbout: true,
  },
  {
    id: "computer-vision-specialization",
    title: "Computer Vision Specialization",
    issuer: "Coursera / University of Colorado Boulder",
    date: "2026-03-03",
    previewImageUrl: "/certificates/computer-vision-specialization/preview.webp",
    pdfUrl: "/certificates/computer-vision-specialization/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/specialization/9UEDWOH2XKBI",
    skills: ["Computer Vision", "Deep Learning", "Multimodal AI"],
    highlights: [
      "Course 1: Introduction to Computer Vision",
      "Course 2: Deep Learning for Computer Vision",
      "Course 3: Modern AI Models for Vision and Multimodal Understanding",
    ],
    order: 2,
    featured: true,
    type: "specialized",
    showOnHome: true,
    showOnAbout: true,
  },
  {
    id: "genai-engineering-fine-tuning-transformers",
    title: "Generative AI Engineering and Fine-Tuning Transformers",
    issuer: "Coursera / IBM",
    date: "2026-02-27",
    previewImageUrl: "/certificates/genai-engineering-fine-tuning-transformers/preview.webp",
    pdfUrl: "/certificates/genai-engineering-fine-tuning-transformers/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/DYY3YWEYTWB7",
    skills: ["Generative AI", "Transformers", "Fine-Tuning", "LLMs"],
    type: "single",
  },
  {
    id: "genai-advanced-fine-tuning-llms",
    title: "Generative AI Advanced Fine-Tuning for LLMs",
    issuer: "Coursera / IBM",
    date: "2026-06-25",
    previewImageUrl: "/certificates/genai-advanced-fine-tuning-llms/preview.webp",
    pdfUrl: "/certificates/genai-advanced-fine-tuning-llms/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/FXVW0MMNMNVQ",
    skills: ["Generative AI", "LLMs", "Fine-Tuning"],
    type: "single",
  },
  {
    id: "genai-language-modeling-transformers",
    title: "Generative AI Language Modeling with Transformers",
    issuer: "Coursera / IBM",
    date: "2026-02-26",
    previewImageUrl: "/certificates/genai-language-modeling-transformers/preview.webp",
    pdfUrl: "/certificates/genai-language-modeling-transformers/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/V0TOOTJOS6IW",
    skills: ["Generative AI", "Transformers", "Language Modeling"],
    type: "single",
  },
  {
    id: "genai-foundational-models-nlp",
    title: "Gen AI Foundational Models for NLP & Language Understanding",
    issuer: "Coursera / IBM",
    date: "2026-02-26",
    previewImageUrl: "/certificates/genai-foundational-models-nlp/preview.webp",
    pdfUrl: "/certificates/genai-foundational-models-nlp/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/4CVTPEAFTJU7",
    skills: ["Generative AI", "NLP", "Foundation Models"],
    type: "single",
  },
  {
    id: "project-genai-rag-langchain",
    title: "Project: Generative AI Applications with RAG and LangChain",
    issuer: "Coursera / IBM",
    date: "2026-06-25",
    previewImageUrl: "/certificates/project-genai-rag-langchain/preview.webp",
    pdfUrl: "/certificates/project-genai-rag-langchain/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/R8T7NQKP09SL",
    skills: ["RAG", "LangChain", "Generative AI"],
    type: "single",
  },
  {
    id: "ai-agents-rag-langchain",
    title: "Fundamentals of AI Agents Using RAG and LangChain",
    issuer: "Coursera / IBM",
    date: "2025-10-23",
    previewImageUrl: "/certificates/ai-agents-rag-langchain/preview.webp",
    pdfUrl: "/certificates/ai-agents-rag-langchain/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/FUJ812VKQFXZ",
    skills: ["AI Agents", "RAG", "LangChain"],
    type: "single",
  },
  {
    id: "build-rag-applications",
    title: "Build RAG Applications: Get Started",
    issuer: "Coursera / IBM",
    date: "2025-12-13",
    previewImageUrl: "/certificates/build-rag-applications/preview.webp",
    pdfUrl: "/certificates/build-rag-applications/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/NX25PPGJFSUA",
    skills: ["RAG", "Generative AI"],
    type: "single",
  },
  {
    id: "building-genai-powered-apps-python",
    title: "Building Generative AI-Powered Applications with Python",
    issuer: "Coursera / IBM",
    date: "2025-05-15",
    previewImageUrl: "/certificates/building-genai-powered-apps-python/preview.webp",
    pdfUrl: "/certificates/building-genai-powered-apps-python/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/MJIHPIJL5C6M",
    skills: ["Generative AI", "Python", "LLM Applications"],
    type: "single",
  },
  {
    id: "genai-llms-architecture-data-prep",
    title: "Generative AI and LLMs: Architecture and Data Preparation",
    issuer: "Coursera / IBM",
    date: "2025-05-29",
    previewImageUrl: "/certificates/genai-llms-architecture-data-prep/preview.webp",
    pdfUrl: "/certificates/genai-llms-architecture-data-prep/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/KVWHPHX1KHYQ",
    skills: ["LLMs", "Generative AI", "Data Preparation"],
    type: "single",
  },
  {
    id: "build-deploy-ai-apps-flask",
    title: "Build & Deploy AI Applications with Python & Flask",
    issuer: "Coursera / IBM",
    date: "2025-05-14",
    previewImageUrl: "/certificates/build-deploy-ai-apps-flask/preview.webp",
    pdfUrl: "/certificates/build-deploy-ai-apps-flask/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/K5WHV0GAZG9Z",
    skills: ["Python", "Flask", "AI Applications"],
    type: "single",
  },
  {
    id: "machine-learning-with-python",
    title: "Machine Learning with Python: Build Real-World ML Models",
    issuer: "Coursera / IBM",
    date: "2025-10-25",
    previewImageUrl: "/certificates/machine-learning-with-python/preview.webp",
    pdfUrl: "/certificates/machine-learning-with-python/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/QKH605UX41XV",
    skills: ["Machine Learning", "Python"],
    type: "single",
  },
  {
    id: "deep-learning-keras-tensorflow",
    title: "Deep Learning with Keras and Tensorflow",
    issuer: "Coursera / IBM",
    date: "2026-06-25",
    previewImageUrl: "/certificates/deep-learning-keras-tensorflow/preview.webp",
    pdfUrl: "/certificates/deep-learning-keras-tensorflow/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/F5K27FHL1NHR",
    skills: ["Deep Learning", "Keras", "TensorFlow"],
    type: "single",
  },
  {
    id: "neural-networks-pytorch",
    title: "Introduction to Neural Networks and PyTorch",
    issuer: "Coursera / IBM",
    date: "2026-07-17",
    previewImageUrl: "/certificates/neural-networks-pytorch/preview.webp",
    pdfUrl: "/certificates/neural-networks-pytorch/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/O6H6TFY24TJ7",
    skills: ["Neural Networks", "PyTorch", "Deep Learning"],
    type: "single",
  },
  {
    id: "convolutional-neural-networks",
    title: "Convolutional Neural Networks",
    issuer: "Coursera / DeepLearning.AI",
    date: "2025-04-14",
    previewImageUrl: "/certificates/convolutional-neural-networks/preview.webp",
    pdfUrl: "/certificates/convolutional-neural-networks/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/ORZPH9GJ9UQT",
    skills: ["Convolutional Neural Networks", "Deep Learning", "Computer Vision"],
    type: "single",
  },
  {
    id: "cnn-in-tensorflow",
    title: "Convolutional Neural Networks in TensorFlow",
    issuer: "Coursera / DeepLearning.AI",
    date: "2024-01-13",
    previewImageUrl: "/certificates/cnn-in-tensorflow/preview.webp",
    pdfUrl: "/certificates/cnn-in-tensorflow/certificate.pdf",
    credentialUrl: "https://coursera.org/verify/ZXT2WA8NYH4G",
    skills: ["Convolutional Neural Networks", "TensorFlow", "Deep Learning"],
    type: "single",
  },
];

export function getSortedCertificates(): Certificate[] {
  return [...certificates].sort((a, b) => {
    // Featured certs first, then explicit `order`, then most recent date.
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Hand-picked subset for the home page strip.
export function getHomeCertificates(): Certificate[] {
  return getSortedCertificates().filter((c) => c.showOnHome);
}

// Hand-picked subset for the About page section.
export function getAboutCertificates(): Certificate[] {
  return getSortedCertificates().filter((c) => c.showOnAbout);
}
