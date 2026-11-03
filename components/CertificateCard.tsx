"use client";

import Image from "next/image";
import type { Certificate } from "@/types";

// Shared by the homepage strip and the full certificates grid. The whole
// certificate image is shown (never cropped) on a quiet frame.
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
      className="group flex w-64 shrink-0 flex-col rounded-2xl border border-border bg-card p-3 text-left transition-colors duration-200 hover:border-foreground/25"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-foreground/5">
        <Image
          src={certificate.previewImageUrl}
          alt={`${certificate.title} certificate`}
          fill
          sizes="256px"
          className="object-contain p-2"
        />
      </div>
      <h3 className="mt-3 line-clamp-2 px-1 text-[15px] font-semibold leading-snug">
        {certificate.title}
      </h3>
      <p className="mt-1 px-1 pb-1 text-sm text-faint">{certificate.issuer}</p>
    </button>
  );
}
