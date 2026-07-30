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

  order?: number; // manual override for display order (home, about, and the /certificates page); defaults to date desc if omitted
  featured?: boolean; // pin to the front when sorting even without a manual order
  type: "specialized" | "single"; // type of certificate, defaults to "single"

  // Visibility controls — the full set always shows on /certificates.
  // These let you keep the home page and About page short by hand-picking
  // a subset instead of dumping every certificate on every page.
  showOnHome?: boolean; // include in the home page strip; defaults to false
  showOnAbout?: boolean; // include in the About page section; defaults to false
}
