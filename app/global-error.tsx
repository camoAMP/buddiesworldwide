"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error("GlobalError:", error)

  return (
    <html>
      <body className="min-h-screen grid place-items-center p-8">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
          <p className="text-sm text-muted-foreground mb-4">Request failed or a component crashed.</p>
          <button onClick={() => reset()} className="px-3 py-2 rounded bg-black text-white hover:bg-gray-800">
            Try again
          </button>
          {process.env.NODE_ENV !== "production" && (
            <pre className="mt-4 text-left text-xs whitespace-pre-wrap bg-gray-100 p-2 rounded">{error.message}</pre>
          )}
        </div>
      </body>
    </html>
  )
}
