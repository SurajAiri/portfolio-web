"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-white/10 text-foreground"
          : "text-muted hover:text-accent"
      }`}
    >
      {label}
    </Link>
  );
}
