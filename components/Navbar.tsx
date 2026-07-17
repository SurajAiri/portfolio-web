import NavLink from "./NavLink";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-1.5 backdrop-blur-xl">
        {navLinks.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label} />
        ))}
      </nav>
    </header>
  );
}
