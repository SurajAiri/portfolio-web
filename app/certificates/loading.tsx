export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-6 pt-28 pb-20 sm:pt-32">
      <div className="h-8 w-1/3 rounded bg-white/[0.06]" />
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] rounded-2xl bg-white/[0.03]" />
        ))}
      </div>
    </div>
  );
}
