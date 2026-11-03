import { personalInfo, valuePropositions } from "@/data/personal";

export default function CTASection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <p className="inline-flex items-center gap-2 text-sm text-muted">
          <span
            className="h-2 w-2 rounded-full bg-accent"
            aria-hidden="true"
          />
          Available for full-time roles
        </p>

        <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Let&rsquo;s build something impactful.
        </h2>

        <a
          href={`mailto:${personalInfo.email}`}
          className="mt-8 inline-block font-display text-xl font-semibold break-all underline decoration-accent decoration-2 underline-offset-8 transition-colors duration-200 hover:text-accent sm:text-3xl"
        >
          {personalInfo.email}
        </a>

        <ul className="mt-14 grid max-w-3xl gap-x-12 sm:grid-cols-2">
          {valuePropositions.map((vp) => (
            <li
              key={vp}
              className="border-t border-border py-4 text-base text-muted"
            >
              {vp}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
