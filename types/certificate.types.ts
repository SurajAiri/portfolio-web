export interface Certificate {
  id: string; // stable id, e.g. "aws-ml-specialty-2025"
  title: string; // "AWS Certified Machine Learning – Specialty"
  issuer: string; // "Amazon Web Services"
  date: string; // ISO date issued
  expiryDate?: string; // optional, for certs that expire

  previewImageUrl: string; // internal path or external URL — shown in the horizontal scroll strip
  pdfUrl?: string; // internal path or external URL — "View PDF" in lightbox
  credentialUrl?: string; // external verify link (Credly, issuer page, etc.)

  skills: string[]; // tech/skills tags — reuses the same pill UI as project tags
  highlights?: string[]; // optional bullet points: what was learned / key topics

  order?: number; // manual override for scroll-strip order; defaults to date desc if omitted
  featured?: boolean; // pin to the front of the strip even without a manual order
  type: "specialized" | "single"; // type of certificate, defaults to "single"
}
