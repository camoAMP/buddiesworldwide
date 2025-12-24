import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  ExternalLink,
  Edit,
  BarChart3,
  Copy,
  Trash2,
  Activity,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data for bio-links
  const bioLinks = [
    {
      id: 1,
      title: "My Main Bio-Link",
      url: "connectsync.app/johndoe",
      clicks: 1247,
      isActive: true,
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      title: "Event Promotion",
      url: "connectsync.app/johndoe-event",
      clicks: 89,
      isActive: false,
      lastUpdated: "3 days ago",
    },
  ]

  // Mock data for integrations and real-time activity
  const integrations = [
    { name: "Google Calendar", status: "connected", lastSync: "2 min ago", syncCount: 45 },
    { name: "Slack", status: "connected", lastSync: "5 min ago", syncCount: 23 },
    { name: "Trello", status: "error", lastSync: "1 hour ago", syncCount: 0 },
    { name: "Notion", status: "syncing", lastSync: "Just now", syncCount: 12 },
  ]

  const recentActivity = [
    { type: "sync", message: "Google Calendar synced 3 new events", time: "2 min ago", status: "success" },
    { type: "trigger", message: "Slack notification sent for new Trello card", time: "5 min ago", status: "success" },
    { type: "error", message: "Trello sync failed - API limit reached", time: "1 hour ago", status: "error" },
    { type: "sync", message: "Notion database updated with 2 new entries", time: "2 hours ago", status: "success" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Real-time sync status and bio-link management</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Manage Integrations
            </Button>
            <Link href="/dashboard/builder">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Bio-Link
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Connected Apps</CardDescription>
              <CardTitle className="text-2xl">4</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Syncs</CardDescription>
              <CardTitle className="text-2xl text-green-600">3</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Bio-Links</CardDescription>
              <CardTitle className="text-2xl">2</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Clicks</CardDescription>
              <CardTitle className="text-2xl">1,336</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>AI Summaries</CardDescription>
              <CardTitle className="text-2xl">5</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Integration Status */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Integration Status
                </CardTitle>
                <CardDescription>Real-time sync status for connected applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          integration.status === "connected"
                            ? "bg-green-500"
                            : integration.status === "syncing"
                              ? "bg-yellow-500 animate-pulse"
                              : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-foreground">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Last sync: {integration.lastSync} • {integration.syncCount} items synced
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        integration.status === "connected"
                          ? "default"
                          : integration.status === "syncing"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {integration.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Bio-Links List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Bio-Links</CardTitle>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {bioLinks.map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{link.title}</h3>
                        <Badge variant={link.isActive ? "default" : "secondary"}>
                          {link.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" />
                          {link.url}
                        </span>
                        <span>{link.clicks} clicks</span>
                        <span>Updated {link.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Link href={`/dashboard/builder/${link.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Real-time Activity Feed */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Live updates from your connected apps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="mt-1">
                      {activity.status === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : activity.status === "error" ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Integration
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Zap className="mr-2 h-4 w-4" />
                  Create Automation
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Insights
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
