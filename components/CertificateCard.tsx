"use client";

import Image from "next/image";
import type { Certificate } from "@/types";
import { spotlightMove } from "@/lib/spotlight";

// Shared by the homepage strip and the full certificates grid. The whole
// certificate image is shown (never cropped) on a quiet frame. A mint light
// follows the cursor across the card on hover (.spotlight in globals.css).
export default function CertificateCard({
  certificate,
  onOpen,
}: {
  certificate: Certificate;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerMove={spotlightMove}
      className="spotlight group relative flex w-64 shrink-0 flex-col rounded-2xl border border-border bg-card p-3 text-left transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-foreground/25 hover:shadow-[0_24px_50px_-30px_rgba(79,217,160,0.4)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-foreground/5">
        <Image
          src={certificate.previewImageUrl}
          alt={`${certificate.title} certificate`}
          fill
          sizes="256px"
          className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <h3 className="mt-3 line-clamp-2 px-1 text-[15px] font-semibold leading-snug">
        {certificate.title}
      </h3>
      <p className="mt-1 px-1 pb-1 text-sm text-faint">{certificate.issuer}</p>
    </button>
  );
}
