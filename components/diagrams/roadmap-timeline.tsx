import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type RoadmapPhase = {
  phase: string
  title: string
  description: string
  timeline: string
}

type RoadmapTimelineProps = {
  phases: RoadmapPhase[]
}

export function RoadmapTimeline({ phases }: RoadmapTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {phases.map((phase) => (
            <div key={phase.phase} className="rounded-lg border bg-muted/30 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">
                  {phase.phase}: {phase.title}
                </p>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
                  {phase.timeline}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{phase.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
