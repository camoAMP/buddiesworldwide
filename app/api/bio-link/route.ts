import { type NextRequest, NextResponse } from "next/server"

// GET /api/bio-link - Retrieve user's bio-links
export async function GET(request: NextRequest) {
  try {
    // Mock data - in real app, fetch from database based on user auth
    const bioLinks = [
      {
        id: "1",
        title: "My Main Bio-Link",
        url: "connectsync.app/johndoe",
        clicks: 1247,
        isActive: true,
        lastUpdated: "2 hours ago",
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
        ],
      },
    ]

    return NextResponse.json({ bioLinks })
  } catch (error) {
    console.error("Error fetching bio-links:", error)
    return NextResponse.json({ error: "Failed to fetch bio-links" }, { status: 500 })
  }
}

// POST /api/bio-link - Create new bio-link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, customUrl, profile, links } = body

    // Mock creation - in real app, save to database
    const newBioLink = {
      id: Date.now().toString(),
      title,
      url: `connectsync.app/${customUrl}`,
      clicks: 0,
      isActive: true,
      lastUpdated: "Just now",
      profile,
      links,
    }

    return NextResponse.json({ bioLink: newBioLink }, { status: 201 })
  } catch (error) {
    console.error("Error creating bio-link:", error)
    return NextResponse.json({ error: "Failed to create bio-link" }, { status: 500 })
  }
}

// PATCH /api/bio-link - Update bio-link
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, updates } = body

    // Mock update - in real app, update in database
    console.log(`Updating bio-link ${id} with:`, updates)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating bio-link:", error)
    return NextResponse.json({ error: "Failed to update bio-link" }, { status: 500 })
  }
}
