"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Award, LayoutGrid, GalleryHorizontal } from "lucide-react";
import { getSortedCertificates } from "@/data/certificates";
import type { Certificate } from "@/types";

const CertificateDialog = dynamic(() => import("./CertificateDialog"), {
  ssr: false,
});

// Below this count a scrolling strip just loops the same 1-3 logos, which
// looks broken rather than impressive — plain grid reads better until
// there's a real wall of certificates.
const MIN_FOR_MARQUEE = 6;

function CertificateCard({
  certificate,
  onOpen,
}: {
  certificate: Certificate;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="group flex w-64 shrink-0 flex-col rounded-2xl bg-white/[0.03] p-4 text-left transition-all duration-200 hover:bg-white/[0.06] hover:shadow-[0_0_24px_-8px_rgba(34,197,94,0.2)]"
    >
      {/* Full certificate image, centered and never cropped — the image
          itself is the focal point of the card, sitting on a neutral
          rounded-rect frame rather than being cropped to fill a box. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/5">
        <Image
          src={certificate.previewImageUrl}
          alt={certificate.title}
          fill
          sizes="256px"
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm font-bold leading-snug transition-colors duration-200 group-hover:text-accent">
        {certificate.title}
      </h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/35">
        {certificate.issuer}
      </p>
    </button>
  );
}

export default function CertificatesSection({
  certificates: certificatesProp,
  title = "CERTIFICATES",
  sectionId = "certificates",
  viewAllHref,
}: {
  certificates?: Certificate[];
  title?: string;
  sectionId?: string;
  viewAllHref?: string; // if set, shows a "VIEW ALL" link next to the header
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

  return (
    <section id={sectionId} className="mx-auto mt-16 max-w-5xl px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-accent">
            <Award size={18} />
          </span>
          <h2 className="font-mono text-lg font-bold tracking-[0.1em]">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="font-mono text-xs tracking-wider text-white/35 transition-colors duration-200 hover:text-accent"
            >
              VIEW ALL &raquo;
            </Link>
          )}
          {canMarquee && (
            <div className="flex gap-1 rounded-full bg-white/[0.04] p-1">
              <button
                onClick={() => setView("scroll")}
                aria-label="Scrolling view"
                className={`rounded-full p-1.5 transition-colors duration-200 ${
                  view === "scroll"
                    ? "bg-accent/15 text-accent"
                    : "text-white/35 hover:text-foreground/70"
                }`}
              >
                <GalleryHorizontal size={14} />
              </button>
              <button
                onClick={() => setView("grid")}
                aria-label="Grid view"
                className={`rounded-full p-1.5 transition-colors duration-200 ${
                  view === "grid"
                    ? "bg-accent/15 text-accent"
                    : "text-white/35 hover:text-foreground/70"
                }`}
              >
                <LayoutGrid size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        {view === "scroll" && canMarquee ? (
          <div className="space-y-4">
            {[rowA, rowB].map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="marquee-row overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
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
