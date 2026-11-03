import { personalInfo } from "@/data/personal";

const linkClass =
  "text-muted transition-colors duration-200 hover:text-foreground";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-faint">
          &copy; {new Date().getFullYear()} {personalInfo.name}. Built with
          Next.js and Tailwind.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li>
            <a href={`mailto:${personalInfo.email}`} className={linkClass}>
              Email
            </a>
          </li>
          <li>
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Resume
            </a>
          </li>
          <li>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
