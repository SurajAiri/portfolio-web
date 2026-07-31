export default function Loading() {
  return (
    <div className="pb-20">
      <article className="mx-auto max-w-3xl animate-pulse px-6 pt-28 sm:pt-32">
        {/* Back nav */}
        <div className="h-3.5 w-28 rounded bg-white/[0.06]" />

        {/* Category + title + meta */}
        <div className="mt-6">
          <div className="h-4 w-20 rounded-full bg-white/[0.06]" />
          <div className="mt-3 h-7 w-2/3 rounded bg-white/[0.07]" />
          <div className="mt-3 h-3 w-1/3 rounded bg-white/[0.04]" />
        </div>

        {/* Gallery */}
        <div className="mt-8 aspect-video w-full rounded-xl bg-white/[0.04]" />

        {/* Summary + sections */}
        <div className="mt-10 space-y-8">
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-white/[0.05]" />
            <div className="h-4 w-4/5 rounded bg-white/[0.05]" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-white/[0.06]" />
            <div className="h-3.5 w-full rounded bg-white/[0.04]" />
            <div className="h-3.5 w-11/12 rounded bg-white/[0.04]" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-white/[0.06]" />
            <div className="h-3.5 w-full rounded bg-white/[0.04]" />
            <div className="h-3.5 w-3/4 rounded bg-white/[0.04]" />
          </div>
        </div>
      </article>
    </div>
  );
}
