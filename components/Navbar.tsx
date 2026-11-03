import Link from "next/link";
import NavLink from "./NavLink";
import { personalInfo } from "@/data/personal";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6"
      >
        {/* The wordmark doubles as the Home link */}
        <Link
          href="/"
          aria-label={`${personalInfo.name}, home`}
          className="font-display text-base font-semibold tracking-tight"
        >
          <span className="sm:hidden">SA</span>
          <span className="hidden sm:inline">{personalInfo.name}</span>
        </Link>
        <ul className="flex items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
