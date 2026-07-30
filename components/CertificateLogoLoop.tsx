"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Award } from "lucide-react";
import { getHomeCertificates } from "@/data/certificates";
import type { Certificate } from "@/types";

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
      {/* Full certificate image, centered and never cropped, so the
          certificate itself — not a tight crop of it — is what stands out. */}
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
    <section className="mx-auto mt-8 max-w-5xl px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-accent">
            <Award size={18} />
          </span>
          <h2 className="font-mono text-lg font-bold tracking-[0.1em]">
            CERTIFICATES
          </h2>
        </div>
        <Link
          href="/certificates"
          className="font-mono text-xs tracking-wider text-white/35 transition-colors duration-200 hover:text-accent"
        >
          VIEW ALL &raquo;
        </Link>
      </div>

      <div className="logo-loop-row group mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
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

      {selected && (
        <CertificateDialog
          certificate={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
