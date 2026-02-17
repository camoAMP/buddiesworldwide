import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const controls = [
  { title: "Authentication", detail: "OAuth2/JWT + scoped session policies." },
  { title: "Authorization", detail: "Role-based access control with per-resource permissions." },
  { title: "Data Protection", detail: "Encryption in transit and at rest for sensitive records." },
  { title: "Auditability", detail: "Immutable activity logs for admin and compliance review." },
]

export function SecurityPermissionsDiagram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {controls.map((control) => (
            <div key={control.title} className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm font-semibold text-foreground">{control.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{control.detail}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
