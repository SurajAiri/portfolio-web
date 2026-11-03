import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

// One heading pattern for every section: title, an optional one-line
// description, and optional controls / a "see all" link on the right.
export default function SectionHeading({
  title,
  description,
  href,
  hrefLabel,
  children,
}: {
  title?: string | null;
  description?: string;
  href?: string;
  hrefLabel?: string;
  children?: ReactNode; // extra controls, rendered before the link
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="max-w-xl">
        {title && (
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
        )}
        {description && (
          <p className="mt-3 text-base leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
      {(children || (href && hrefLabel)) && (
        <div className="flex items-center gap-4">
          {children}
          {href && hrefLabel && (
            <Link
              href={href}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
            >
              {hrefLabel}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
