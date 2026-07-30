export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-4 px-6 pt-28 pb-20 sm:pt-32">
      <div className="h-10 w-1/2 rounded bg-white/[0.06]" />
      <div className="h-4 w-1/3 rounded bg-white/[0.04]" />
      <div className="h-40 rounded bg-white/[0.03]" />
      <div className="h-40 rounded bg-white/[0.03]" />
    </div>
  );
}
