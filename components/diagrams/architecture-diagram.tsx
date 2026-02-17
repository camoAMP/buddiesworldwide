import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ArchitectureDiagram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Architecture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Integration Layer</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Connectors, auth adapters, and API normalization for third-party platforms.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sync Engine</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Event queues and conflict resolution for real-time data consistency.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Automation Layer</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Rule-driven workflows, alerts, and observability for operations teams.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
