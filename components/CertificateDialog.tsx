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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={certificate.title}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {showPdf && certificate.pdfUrl ? (
          <button
            onClick={() => setShowPdf(false)}
            className="absolute top-4 left-4 z-10 flex items-center gap-1 text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground"
            aria-label="Back to certificate details"
          >
            <ArrowLeft size={14} /> Back
          </button>
        ) : null}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-muted transition-colors duration-200 hover:text-foreground"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {showPdf && certificate.pdfUrl ? (
          <div className="mt-10 h-[60vh] w-full overflow-hidden rounded-lg bg-foreground/5">
            <iframe
              src={certificate.pdfUrl}
              title={`${certificate.title} PDF`}
              className="h-full w-full"
            />
          </div>
        ) : (
          <>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-foreground/5">
              <Image
                src={certificate.previewImageUrl}
                alt={certificate.title}
                fill
                sizes="(max-width: 640px) 90vw, 512px"
                className="object-contain"
              />
            </div>

            <h2 className="mt-5 text-2xl font-semibold tracking-tight">
              {certificate.title}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {certificate.issuer}, 
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
                    className="rounded-md border border-border px-2.5 py-1 text-xs text-muted"
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
                    className="flex gap-2 text-[15px] leading-relaxed text-foreground/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-5 text-sm font-medium">
              {certificate.credentialUrl && (
                <Link
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-foreground/80 transition-colors hover:text-accent"
                >
                  Verify credential <ExternalLink size={14} />
                </Link>
              )}
              {certificate.pdfUrl && (
                <button
                  onClick={() => setShowPdf(true)}
                  className="inline-flex items-center gap-1 text-foreground/80 transition-colors hover:text-accent"
                >
                  View PDF <FileText size={14} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
