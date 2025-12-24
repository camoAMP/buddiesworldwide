import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const techItems = [
  {
    name: "Next.js",
    description: "React framework for production-ready applications",
    category: "Frontend",
  },
  {
    name: "Vercel",
    description: "Deployment and hosting platform",
    category: "Infrastructure",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development",
    category: "Styling",
  },
  {
    name: "shadcn/ui",
    description: "Accessible and customizable component library",
    category: "Components",
  },
  {
    name: "Stripe",
    description: "Payment processing and subscription management",
    category: "Payments",
  },
  {
    name: "NextAuth",
    description: "Authentication library for Next.js applications",
    category: "Auth",
  },
  {
    name: "Prisma",
    description: "Type-safe database ORM and query builder",
    category: "Database",
  },
  {
    name: "TypeScript",
    description: "Type-safe JavaScript for better development experience",
    category: "Language",
  },
]

export function TechStack() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {techItems.map((item) => (
        <Card key={item.name} className="text-center hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <Badge variant="secondary" className="w-fit mx-auto mb-2">
              {item.category}
            </Badge>
            <CardTitle className="text-sm">{item.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription className="text-xs">{item.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
