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
// },

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
