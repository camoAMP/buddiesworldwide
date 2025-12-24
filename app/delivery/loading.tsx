export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 w-32 bg-muted rounded mb-6 animate-pulse" />
        <div className="h-10 w-64 bg-muted rounded mb-2 animate-pulse" />
        <div className="h-6 w-96 bg-muted rounded mb-8 animate-pulse" />
        <div className="h-24 w-full bg-muted rounded mb-8 animate-pulse" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="h-32 w-full bg-muted rounded animate-pulse" />
            <div className="h-32 w-full bg-muted rounded animate-pulse" />
          </div>
          <div className="lg:col-span-2">
            <div className="h-96 w-full bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
