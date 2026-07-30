"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Award } from "lucide-react";
import { getSortedCertificates } from "@/data/certificates";
import type { Certificate } from "@/types";

const CertificateDialog = dynamic(() => import("./CertificateDialog"), {
  ssr: false,
});

// A short cert list (1-3 items) still needs to fill the strip so it reads
// as a continuous loop instead of one logo stuttering across the screen.
// Repeat the list until it hits this floor, then the render below
// duplicates it once more for the seamless 0% -> -50% translate loop.
const MIN_LOGOS = 8;
// Roughly how many seconds each logo pill should stay on screen — keeps
// the scroll speed constant no matter how many certificates exist.
const SECONDS_PER_LOGO = 2.4;

function LogoPill({
  certificate,
  onOpen,
}: {
  certificate: Certificate;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="group flex shrink-0 items-center gap-3 rounded-full border border-white/8 bg-white/[0.03] py-2 pr-5 pl-2 transition-all duration-200 hover:border-accent/30 hover:bg-white/[0.06] hover:shadow-[0_0_20px_-8px_rgba(34,197,94,0.25)]"
    >
      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white/5">
        <Image
          src={certificate.previewImageUrl}
          alt={certificate.title}
          fill
          sizes="36px"
          className="object-cover"
        />
      </span>
      <span className="flex flex-col text-left">
        <span className="line-clamp-1 max-w-[11rem] text-xs font-bold leading-tight transition-colors duration-200 group-hover:text-accent">
          {certificate.title}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">
          {certificate.issuer}
        </span>
      </span>
    </button>
  );
}

export default function CertificateLogoLoop() {
  const certificates = useMemo(() => getSortedCertificates(), []);
  const [selected, setSelected] = useState<Certificate | null>(null);

  // No certificates added yet (see data/certificates.ts) — skip the whole
  // section rather than showing an empty strip.
  if (certificates.length === 0) return null;

  const repeats = Math.max(1, Math.ceil(MIN_LOGOS / certificates.length));
  const padded = Array.from({ length: repeats }, () => certificates).flat();
  const track = [...padded, ...padded];
  const duration = padded.length * SECONDS_PER_LOGO;

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
          href="/about#certificates"
          className="font-mono text-xs tracking-wider text-white/35 transition-colors duration-200 hover:text-accent"
        >
          VIEW ALL &raquo;
        </Link>
      </div>

      <div className="logo-loop-row group mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          className="logo-loop-track flex w-max gap-3"
          style={{ animationDuration: `${duration}s` }}
        >
          {track.map((cert, i) => (
            <LogoPill
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
