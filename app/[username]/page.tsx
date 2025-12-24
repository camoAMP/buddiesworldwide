import { Card, CardContent } from "@/components/ui/card"
import { Globe, Instagram, Twitter, Youtube, Mail, Phone, ExternalLink } from "lucide-react"
import { notFound } from "next/navigation"

interface BioLinkPageProps {
  params: {
    username: string
  }
}

// Mock data - in real app this would come from database
const getUserData = (username: string) => {
  if (username === "johndoe") {
    return {
      name: "John Doe",
      bio: "Content creator & entrepreneur. Sharing insights about tech and business.",
      avatar: "",
      links: [
        {
          id: "1",
          type: "link",
          title: "My Website",
          url: "https://johndoe.com",
          icon: "globe",
          isActive: true,
        },
        {
          id: "2",
          type: "social",
          title: "Follow me on Instagram",
          url: "https://instagram.com/johndoe",
          icon: "instagram",
          isActive: true,
        },
        {
          id: "3",
          type: "social",
          title: "YouTube Channel",
          url: "https://youtube.com/johndoe",
          icon: "youtube",
          isActive: true,
        },
        {
          id: "4",
          type: "contact",
          title: "Email Me",
          url: "mailto:john@example.com",
          icon: "mail",
          isActive: true,
        },
      ],
    }
  }
  return null
}

const getIconComponent = (iconName: string) => {
  const icons = {
    globe: Globe,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    mail: Mail,
    phone: Phone,
  }
  const IconComponent = icons[iconName as keyof typeof icons] || Globe
  return <IconComponent className="h-5 w-5" />
}

export default function BioLinkPage({ params }: BioLinkPageProps) {
  const userData = getUserData(params.username)

  if (!userData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            {/* Profile Section */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-semibold text-primary">{userData.name.charAt(0)}</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3">{userData.name}</h1>
              <p className="text-muted-foreground leading-relaxed">{userData.bio}</p>
            </div>

            {/* Links Section */}
            <div className="space-y-4">
              {userData.links
                .filter((link) => link.isActive)
                .map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02] group"
                  >
                    <div className="flex-shrink-0 text-primary">{getIconComponent(link.icon)}</div>
                    <span className="flex-1 font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.title}
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Created with{" "}
                <a href="/" className="text-primary hover:underline font-medium">
                  ConnectSync
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
