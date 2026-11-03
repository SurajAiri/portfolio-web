"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

export default function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`relative flex h-14 items-center px-2.5 text-sm font-medium transition-colors duration-200 sm:px-4 ${
        isActive ? "text-foreground" : "text-muted hover:text-foreground"
      }`}
    >
      {label}
      {isActive && (
        // Sits on the header's bottom border and slides between links.
        <motion.span
          layoutId="nav-active-underline"
          className="absolute inset-x-2.5 bottom-0 h-0.5 bg-accent sm:inset-x-4"
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
        />
      )}
    </Link>
  );
}
