export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-6 pt-28 pb-20 sm:pt-32">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <div className="h-10 w-2/3 rounded bg-white/[0.06]" />
          <div className="h-4 w-1/3 rounded bg-white/[0.04]" />
          <div className="h-24 rounded bg-white/[0.03]" />
        </div>
        <div className="mx-auto h-52 w-52 rounded-full bg-white/[0.04] md:h-64 md:w-64" />
      </div>
    </div>
  );
}
