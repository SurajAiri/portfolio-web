import { getSortedCertificates } from "@/data/certificates";
import CertificatesSection from "@/components/CertificatesSection";
import PageHeader from "@/components/PageHeader";

export default function CertificatesPage() {
  const certificates = getSortedCertificates();

  return (
    <div className="pb-24">
      <PageHeader
        title="Certificates"
        description="Courses and credentials across AI engineering, deep learning, and generative AI."
      />

      <CertificatesSection
        certificates={certificates}
        title={null}
        sectionId="all-certificates"
      />
    </div>
  );
}
