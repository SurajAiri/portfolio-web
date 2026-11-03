export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-6 pt-28 pb-20 sm:pt-32">
      <div className="h-8 w-1/3 rounded bg-white/[0.06]" />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 rounded-2xl bg-white/[0.03]" />
        ))}
      </div>
    </div>
  );
}
