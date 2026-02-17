import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  "Client app emits a data-change event",
  "Integration layer validates schema and auth",
  "Sync engine diffs state and resolves conflicts",
  "Destination systems are updated in parallel",
  "Status events are persisted for audit and retry",
]

export function SyncSequenceDiagram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Synchronization Sequence</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                {index + 1}
              </span>
              <p className="text-sm text-muted-foreground">{step}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
