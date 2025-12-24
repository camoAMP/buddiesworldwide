"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Sparkles, Copy, Download, Trash2, FileText, Zap, ArrowRight, Loader2, CheckCircle } from "lucide-react"

interface Summary {
  id: string
  title: string
  originalText: string
  summary: string
  type: "brief" | "detailed" | "bullet-points"
  createdAt: string
  wordCount: number
}

export default function AISummariesPage() {
  const [inputText, setInputText] = useState("")
  const [summaryType, setSummaryType] = useState<"brief" | "detailed" | "bullet-points">("brief")
  const [isGenerating, setIsGenerating] = useState(false)
  const [summaries, setSummaries] = useState<Summary[]>([
    {
      id: "1",
      title: "Product Launch Strategy",
      originalText: "Our new product launch strategy focuses on...",
      summary:
        "A comprehensive product launch strategy emphasizing digital marketing, influencer partnerships, and customer feedback integration to maximize market penetration and brand awareness.",
      type: "brief",
      createdAt: "2 hours ago",
      wordCount: 1250,
    },
    {
      id: "2",
      title: "Market Research Findings",
      originalText: "Based on our recent market research...",
      summary:
        "• 73% of target audience prefers mobile-first experiences\n• Social media engagement increased by 45% in Q4\n• Customer acquisition cost decreased by 23%\n• Brand awareness improved significantly in key demographics",
      type: "bullet-points",
      createdAt: "1 day ago",
      wordCount: 890,
    },
  ])

  const generateSummary = async () => {
    if (!inputText.trim()) return

    setIsGenerating(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const newSummary: Summary = {
      id: Date.now().toString(),
      title: `Summary ${summaries.length + 1}`,
      originalText: inputText,
      summary: generateMockSummary(inputText, summaryType),
      type: summaryType,
      createdAt: "Just now",
      wordCount: inputText.split(" ").length,
    }

    setSummaries([newSummary, ...summaries])
    setInputText("")
    setIsGenerating(false)
  }

  const generateMockSummary = (text: string, type: "brief" | "detailed" | "bullet-points"): string => {
    const wordCount = text.split(" ").length
    if (type === "bullet-points") {
      return `• Key insight from your ${wordCount}-word content\n• Main theme focuses on core business objectives\n• Strategic recommendations for implementation\n• Actionable next steps identified`
    } else if (type === "detailed") {
      return `This comprehensive analysis of your ${wordCount}-word content reveals several key insights and strategic opportunities. The main themes center around business growth, customer engagement, and operational efficiency. The content demonstrates a clear understanding of market dynamics and presents actionable recommendations for implementation. Key takeaways include strategic positioning, competitive advantages, and measurable outcomes that align with business objectives.`
    } else {
      return `A concise analysis of your ${wordCount}-word content highlighting the main themes of business strategy, customer focus, and growth opportunities with actionable insights for implementation.`
    }
  }

  const copySummary = (summary: string) => {
    navigator.clipboard.writeText(summary)
  }

  const deleteSummary = (id: string) => {
    setSummaries(summaries.filter((s) => s.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-secondary" />
            <h1 className="text-2xl font-semibold text-foreground">AI Content Summaries</h1>
          </div>
          <p className="text-muted-foreground">
            Transform long-form content into concise, engaging summaries for your bio-links and social media.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-secondary" />
                  Generate Summary
                </CardTitle>
                <CardDescription>
                  Paste your content below and let AI create the perfect summary for your audience.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content">Content to Summarize</Label>
                  <Textarea
                    id="content"
                    placeholder="Paste your blog post, article, or any long-form content here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{inputText.split(" ").filter(Boolean).length} words</span>
                    <span>Recommended: 100+ words for best results</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Summary Type</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={summaryType === "brief" ? "default" : "outline"}
                      onClick={() => setSummaryType("brief")}
                      className="h-auto p-3 flex-col"
                    >
                      <FileText className="h-4 w-4 mb-1" />
                      <span className="text-xs">Brief</span>
                    </Button>
                    <Button
                      variant={summaryType === "detailed" ? "default" : "outline"}
                      onClick={() => setSummaryType("detailed")}
                      className="h-auto p-3 flex-col"
                    >
                      <FileText className="h-4 w-4 mb-1" />
                      <span className="text-xs">Detailed</span>
                    </Button>
                    <Button
                      variant={summaryType === "bullet-points" ? "default" : "outline"}
                      onClick={() => setSummaryType("bullet-points")}
                      className="h-auto p-3 flex-col"
                    >
                      <FileText className="h-4 w-4 mb-1" />
                      <span className="text-xs">Bullets</span>
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={generateSummary}
                  disabled={!inputText.trim() || isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Summary...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate AI Summary
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Recent Summaries */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Summaries</CardTitle>
                <CardDescription>Your latest AI-generated content summaries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {summaries.map((summary) => (
                    <div key={summary.id} className="border border-border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-foreground">{summary.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {summary.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mb-3">
                            {summary.wordCount} words • {summary.createdAt}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => copySummary(summary.summary)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSummary(summary.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-md p-3">
                        <p className="text-sm text-foreground whitespace-pre-line">{summary.summary}</p>
                      </div>
                    </div>
                  ))}

                  {summaries.length === 0 && (
                    <div className="text-center py-8">
                      <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium text-foreground mb-2">No summaries yet</h3>
                      <p className="text-sm text-muted-foreground">Generate your first AI summary to see it here.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Tips Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Summaries Generated</span>
                  <span className="font-semibold text-foreground">{summaries.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Words Processed</span>
                  <span className="font-semibold text-foreground">
                    {summaries.reduce((acc, s) => acc + s.wordCount, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Time Saved</span>
                  <span className="font-semibold text-foreground">~{Math.floor(summaries.length * 2.5)}h</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Use detailed content</p>
                    <p className="text-xs text-muted-foreground">Longer content produces better summaries</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Choose the right type</p>
                    <p className="text-xs text-muted-foreground">Brief for social media, detailed for blogs</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Edit and customize</p>
                    <p className="text-xs text-muted-foreground">AI summaries are a starting point</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Export All Summaries
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="mr-2 h-4 w-4" />
                  Summary Templates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
