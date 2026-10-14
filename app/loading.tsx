export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-48 rounded bg-navy-100" />
        <div className="h-10 w-3/4 rounded bg-navy-100" />
        <div className="h-4 w-full rounded bg-navy-100" />
        <div className="h-4 w-5/6 rounded bg-navy-100" />
        <div className="mt-8 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-navy-100" />
          ))}
        </div>
      </div>
    </div>
  )
}