"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ExternalLink, FileText, ArrowLeft } from "lucide-react";
import type { Certificate } from "@/types";

export default function CertificateDialog({
  certificate,
  onClose,
}: {
  certificate: Certificate;
  onClose: () => void;
}) {
  // Toggling this swaps the preview image for an inline PDF viewer within
  // the same popup, rather than navigating away to a new tab.
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showPdf) setShowPdf(false);
        else onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose, showPdf]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-[#111] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {showPdf && certificate.pdfUrl ? (
          <button
            onClick={() => setShowPdf(false)}
            className="absolute top-4 left-4 z-10 flex items-center gap-1 font-mono text-xs tracking-wider text-white/40 transition-colors duration-200 hover:text-accent"
            aria-label="Back to certificate details"
          >
            <ArrowLeft size={14} /> BACK
          </button>
        ) : null}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/30 transition-colors duration-200 hover:text-accent"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {showPdf && certificate.pdfUrl ? (
          <div className="mt-10 h-[60vh] w-full overflow-hidden rounded-lg bg-white/5">
            <iframe
              src={certificate.pdfUrl}
              title={`${certificate.title} PDF`}
              className="h-full w-full"
            />
          </div>
        ) : (
          <>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white/5">
              <Image
                src={certificate.previewImageUrl}
                alt={certificate.title}
                fill
                sizes="(max-width: 640px) 90vw, 512px"
                className="object-contain"
              />
            </div>

            <h2 className="mt-5 font-mono text-lg font-bold tracking-tight">
              {certificate.title}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {certificate.issuer} &middot;{" "}
              {new Date(`${certificate.date}T00:00:00Z`).toLocaleDateString(
                "en-US",
                { month: "short", year: "numeric", timeZone: "UTC" }
              )}
            </p>

            {certificate.skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded bg-white/6 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {certificate.highlights && certificate.highlights.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {certificate.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed text-foreground/70"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/6 pt-5 font-mono text-xs tracking-wider">
              {certificate.credentialUrl && (
                <Link
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-foreground/70 transition-colors hover:text-accent"
                >
                  VERIFY <ExternalLink size={12} />
                </Link>
              )}
              {certificate.pdfUrl && (
                <button
                  onClick={() => setShowPdf(true)}
                  className="inline-flex items-center gap-1 text-foreground/70 transition-colors hover:text-accent"
                >
                  VIEW PDF <FileText size={12} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
