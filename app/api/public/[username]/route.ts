import { type NextRequest, NextResponse } from "next/server"

// GET /api/public/[username] - Fetch public bio-link data
export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    const { username } = params

    // Mock data - in real app, fetch from database
    if (username === "johndoe") {
      const userData = {
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
        analytics: {
          views: 1247,
          clicks: 892,
        },
      }

      // Track page view (in real app, increment in database)
      console.log(`[Analytics] Page view for ${username}`)

      return NextResponse.json({ user: userData })
    }

    return NextResponse.json({ error: "User not found" }, { status: 404 })
  } catch (error) {
    console.error("Error fetching public bio-link:", error)
    return NextResponse.json({ error: "Failed to fetch bio-link" }, { status: 500 })
  }
}
