import {
  personalInfo,
  aboutSections,
  experience,
  education,
  achievements,
} from "@/data/personal";
import { getAboutCertificates } from "@/data/certificates";
import JourneySection from "@/components/JourneySection";
import CertificatesSection from "@/components/CertificatesSection";
import Image from "next/image";
import type { ReactNode } from "react";

// Lightweight inline markdown (**bold**, *italic*) for the about copy.
function parseMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="text-foreground/90 italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

// Every block on this page uses the same two-column row: the heading sits
// on the left, the content on the right, with a hairline above.
function Block({
  title,
  children,
  className = "mt-20",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-5xl px-6 ${className}`}>
      <div className="grid gap-6 border-t border-border pt-10 md:grid-cols-[220px_1fr] md:gap-12">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

const textLink =
  "text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-200 hover:text-accent";

export default function AboutPage() {
  const aboutCertificates = getAboutCertificates();

  return (
    <div className="pb-24">
      <section className="mx-auto max-w-5xl px-6 pt-28 pb-6 sm:pt-36">
        <div className="grid gap-8 md:grid-cols-[1fr_220px] md:gap-14">
          <div className="md:order-1">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              About
            </h1>
            <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-foreground/85">
              {personalInfo.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={`mailto:${personalInfo.email}`} className={textLink}>
                Email me
              </a>
              <a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className={textLink}
              >
                Download resume
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={textLink}
              >
                LinkedIn
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className={textLink}
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="md:order-2">
            <Image
              src="/profile.webp"
              alt={personalInfo.name}
              width={512}
              height={512}
              sizes="(max-width: 768px) 80px, 220px"
              priority
              className="h-20 w-20 rounded-2xl object-cover ring-1 ring-border md:h-auto md:w-full"
            />
          </div>
        </div>
      </section>

      {aboutSections.map((section, i) => (
        <Block
          key={section.title}
          title={section.title}
          className={i === 0 ? "mt-16" : "mt-12"}
        >
          <p className="max-w-[62ch] text-base leading-[1.7] whitespace-pre-line text-muted">
            {parseMarkdown(section.description)}
          </p>
        </Block>
      ))}

      <Block title="Journey">
        <JourneySection />
      </Block>

      <Block title="Experience">
        <div className="space-y-10">
          {experience.map((exp) => (
            <div key={exp.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  {exp.role}
                </h3>
                <p className="text-sm text-faint">{exp.duration}</p>
              </div>
              <p className="text-muted">
                {exp.company}, {exp.location}
              </p>
              <ul className="mt-4 max-w-[62ch] list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/85 marker:text-faint">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Education">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="text-lg font-semibold tracking-tight">
            {education.degree}
          </h3>
          <p className="text-sm text-faint">{education.duration}</p>
        </div>
        <p className="text-muted">
          {education.university}, {education.location}
        </p>
        <p className="mt-4 text-base text-foreground/85">
          CGPA {education.cgpa}
        </p>
        <p className="mt-1 text-base text-muted">
          Coursework: {education.coursework}
        </p>
      </Block>

      {/* Certificates — hand-picked subset; full list lives on /certificates */}
      <CertificatesSection
        certificates={aboutCertificates}
        viewAllHref="/certificates"
      />

      <Block title="Achievements">
        <dl className="space-y-6">
          {achievements.map((ach) => (
            <div key={ach.category}>
              <dt className="text-sm font-medium text-faint">
                {ach.category}
              </dt>
              <dd className="mt-1 max-w-[62ch] text-base leading-relaxed text-foreground/85">
                {ach.description}
              </dd>
            </div>
          ))}
        </dl>
      </Block>

      <section className="mx-auto mt-20 max-w-5xl px-6">
        <p className="max-w-2xl border-t border-border pt-10 font-display text-2xl leading-snug font-semibold tracking-tight">
          Currently available for full-time roles and actively building AI and
          product-focused projects.
        </p>
      </section>
    </div>
  );
}
