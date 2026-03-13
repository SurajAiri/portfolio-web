import { personalInfo } from "@/data/personal";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-12 text-center">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-xs tracking-[0.15em] text-white/30">
          &copy; {new Date().getFullYear()} {personalInfo.name}. Built with
          Next.js &amp; Tailwind.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-6 font-mono text-xs tracking-wider">
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-white/40 transition-colors duration-200 hover:text-accent"
          >
            EMAIL
          </a>
          <a
            href={personalInfo.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 transition-colors duration-200 hover:text-accent"
          >
            RESUME
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 transition-colors duration-200 hover:text-accent"
          >
            LINKEDIN
          </a>
        </div>
        {/* Social icons */}
        <div className="mt-6 flex items-center justify-center gap-5">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/25 transition-colors duration-200 hover:text-accent"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/25 transition-colors duration-200 hover:text-accent"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
