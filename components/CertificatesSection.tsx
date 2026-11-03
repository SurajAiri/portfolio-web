"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { LayoutGrid, GalleryHorizontal } from "lucide-react";
import { getSortedCertificates } from "@/data/certificates";
import type { Certificate } from "@/types";
import CertificateCard from "./CertificateCard";
import SectionHeading from "./SectionHeading";

const CertificateDialog = dynamic(() => import("./CertificateDialog"), {
  ssr: false,
});

// Below this count a scrolling strip just loops the same 1-3 logos, which
// looks broken rather than impressive — plain grid reads better until
// there's a real wall of certificates.
const MIN_FOR_MARQUEE = 6;

export default function CertificatesSection({
  certificates: certificatesProp,
  title = "Certificates",
  sectionId = "certificates",
  viewAllHref,
}: {
  certificates?: Certificate[];
  title?: string | null; // pass null when the page already has an h1
  sectionId?: string;
  viewAllHref?: string; // if set, shows an "All certificates" link
}) {
  const allSorted = useMemo(() => getSortedCertificates(), []);
  const certificates = certificatesProp ?? allSorted;
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [view, setView] = useState<"scroll" | "grid">(
    certificates.length >= MIN_FOR_MARQUEE ? "scroll" : "grid"
  );

  if (certificates.length === 0) return null;

  const canMarquee = certificates.length >= MIN_FOR_MARQUEE;
  const mid = Math.ceil(certificates.length / 2);
  const rowA = certificates.slice(0, mid);
  const rowB = certificates.slice(mid);

  const toggleClass = (active: boolean) =>
    `rounded-md p-1.5 transition-colors duration-200 ${
      active ? "bg-foreground/10 text-foreground" : "text-faint hover:text-foreground"
    }`;

  return (
    <section id={sectionId} className="mx-auto mt-20 max-w-5xl px-6">
      <SectionHeading
        title={title}
        href={viewAllHref}
        hrefLabel={viewAllHref ? "All certificates" : undefined}
      >
        {canMarquee && (
          <div
            role="group"
            aria-label="Certificate layout"
            className="flex gap-1 rounded-lg border border-border p-1"
          >
            <button
              type="button"
              onClick={() => setView("scroll")}
              aria-label="Scrolling rows"
              aria-pressed={view === "scroll"}
              className={toggleClass(view === "scroll")}
            >
              <GalleryHorizontal size={16} />
            </button>
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-label="Grid"
              aria-pressed={view === "grid"}
              className={toggleClass(view === "grid")}
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        )}
      </SectionHeading>

      <div className="mt-8">
        {view === "scroll" && canMarquee ? (
          <div className="space-y-4">
            {[rowA, rowB].map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="marquee-row -my-3 overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
              >
                <div
                  className={`flex w-max gap-4 ${
                    rowIndex === 0 ? "marquee-track" : "marquee-track-reverse"
                  }`}
                >
                  {/* Duplicated once so the 0%->-50% translate loops seamlessly */}
                  {[...row, ...row].map((cert, i) => (
                    <CertificateCard
                      key={`${cert.id}-${i}`}
                      certificate={cert}
                      onOpen={() => setSelected(cert)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-3">
            {certificates.map((cert) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onOpen={() => setSelected(cert)}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <CertificateDialog
          certificate={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
