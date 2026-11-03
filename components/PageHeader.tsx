// Top of every inner page (Projects, Certificates): one h1 and one sentence.
export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-28 sm:pt-36">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{title}</h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        {description}
      </p>
    </section>
  );
}
