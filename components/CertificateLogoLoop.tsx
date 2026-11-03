"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { getHomeCertificates } from "@/data/certificates";
import type { Certificate } from "@/types";
import CertificateCard from "./CertificateCard";
import SectionHeading from "./SectionHeading";

const CertificateDialog = dynamic(() => import("./CertificateDialog"), {
  ssr: false,
});

// A short cert list (1-3 items) still needs to fill the strip so it reads
// as a continuous loop instead of one card stuttering across the screen.
// Repeat the list until it hits this floor, then the render below
// duplicates it once more for the seamless 0% -> -50% translate loop.
const MIN_CARDS = 6;
// Roughly how many seconds each card should stay on screen — keeps the
// scroll speed constant no matter how many certificates exist.
const SECONDS_PER_CARD = 3.2;

export default function CertificateLogoLoop() {
  const certificates = useMemo(() => getHomeCertificates(), []);
  const [selected, setSelected] = useState<Certificate | null>(null);

  // No certificates flagged for the home page (see data/certificates.ts) —
  // skip the whole section rather than showing an empty strip.
  if (certificates.length === 0) return null;

  const repeats = Math.max(1, Math.ceil(MIN_CARDS / certificates.length));
  const padded = Array.from({ length: repeats }, () => certificates).flat();
  const track = [...padded, ...padded];
  const duration = padded.length * SECONDS_PER_CARD;

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          title="Certificates"
          href="/certificates"
          hrefLabel="All certificates"
        />
      </div>

      <div className="mx-auto mt-8 max-w-5xl px-6">
        <div className="logo-loop-row -my-3 overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div
            className="logo-loop-track flex w-max gap-4"
            style={{ animationDuration: `${duration}s` }}
          >
            {track.map((cert, i) => (
              <CertificateCard
                key={`${cert.id}-${i}`}
                certificate={cert}
                onOpen={() => setSelected(cert)}
              />
            ))}
          </div>
        </div>
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
