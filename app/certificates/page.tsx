import { getSortedCertificates } from "@/data/certificates";
import CertificatesSection from "@/components/CertificatesSection";

export default function CertificatesPage() {
  const certificates = getSortedCertificates();

  return (
    <div className="pb-20">
      <section className="mx-auto max-w-5xl px-6 pt-28 sm:pt-32">
        <p className="font-mono text-xs tracking-[0.2em] text-muted">
          CREDENTIALS &raquo;
        </p>
        <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight sm:text-4xl">
          ALL CERTIFICATES
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
          Certifications and credentials earned across AI engineering, cloud,
          and product work.
        </p>
      </section>

      <CertificatesSection
        certificates={certificates}
        title="ALL CERTIFICATES"
        sectionId="all-certificates"
      />
    </div>
  );
}
