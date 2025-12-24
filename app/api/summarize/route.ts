import { type NextRequest, NextResponse } from "next/server"

// POST /api/summarize - Generate AI summary
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, type = "brief" } = body

    if (!content || content.trim().length < 50) {
      return NextResponse.json({ error: "Content must be at least 50 characters long" }, { status: 400 })
    }

    // Mock AI processing - in real app, call AI service
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const wordCount = content.split(" ").length
    let summary = ""

    switch (type) {
      case "bullet-points":
        summary = `• Key insight from your ${wordCount}-word content\n• Main theme focuses on core business objectives\n• Strategic recommendations for implementation\n• Actionable next steps identified`
        break
      case "detailed":
        summary = `This comprehensive analysis of your ${wordCount}-word content reveals several key insights and strategic opportunities. The main themes center around business growth, customer engagement, and operational efficiency. The content demonstrates a clear understanding of market dynamics and presents actionable recommendations for implementation. Key takeaways include strategic positioning, competitive advantages, and measurable outcomes that align with business objectives.`
        break
      default: // brief
        summary = `A concise analysis of your ${wordCount}-word content highlighting the main themes of business strategy, customer focus, and growth opportunities with actionable insights for implementation.`
    }

    const summaryData = {
      id: Date.now().toString(),
      title: `Summary ${Date.now()}`,
      originalText: content,
      summary,
      type,
      createdAt: new Date().toISOString(),
      wordCount,
    }

    return NextResponse.json({ summary: summaryData })
  } catch (error) {
    console.error("Error generating summary:", error)
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 })
  }
}
