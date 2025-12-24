"use client"

export default function DebugPage() {
  return (
    <div className="p-6 space-y-3">
      <h1 className="text-xl font-semibold">Debug</h1>
      <button
        onClick={() =>
          fetch("/api/_diag")
            .then((r) => r.json())
            .then(console.log)
        }
        className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Run /api/_diag
      </button>
      <p>Open the console to see results.</p>
    </div>
  )
}
