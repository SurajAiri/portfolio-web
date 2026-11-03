"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// The email address as a big mailto link, with a one-click copy beside it.
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context): fall back to opening mail.
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
      <a
        href={`mailto:${email}`}
        className="font-display text-xl font-semibold break-all underline decoration-accent decoration-2 underline-offset-8 transition-colors duration-200 hover:text-accent sm:text-3xl"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3.5 py-2 text-sm font-medium backdrop-blur-sm transition-colors duration-200 hover:border-accent/60 hover:text-accent"
      >
        {copied ? (
          <Check size={16} aria-hidden="true" className="text-accent" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
