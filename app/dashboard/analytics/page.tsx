"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  Users,
  MousePointer,
  Globe,
  Download,
  Calendar,
  ExternalLink,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const clickData = [
  { date: "Jan 1", clicks: 45, visitors: 38 },
  { date: "Jan 2", clicks: 52, visitors: 42 },
  { date: "Jan 3", clicks: 48, visitors: 39 },
  { date: "Jan 4", clicks: 61, visitors: 51 },
  { date: "Jan 5", clicks: 55, visitors: 46 },
  { date: "Jan 6", clicks: 67, visitors: 58 },
  { date: "Jan 7", clicks: 73, visitors: 62 },
]

const deviceData = [
  { name: "Mobile", value: 68, color: "hsl(var(--chart-1))" },
  { name: "Desktop", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Tablet", value: 7, color: "hsl(var(--chart-3))" },
]

const countryData = [
  { country: "United States", clicks: 342, percentage: 45 },
  { country: "United Kingdom", clicks: 156, percentage: 20 },
  { country: "Canada", clicks: 98, percentage: 13 },
  { country: "Australia", clicks: 76, percentage: 10 },
  { country: "Germany", clicks: 54, percentage: 7 },
  { country: "Others", clicks: 38, percentage: 5 },
]

const topLinks = [
  { title: "My Website", url: "https://johndoe.com", clicks: 234, change: 12 },
  { title: "Instagram Profile", url: "https://instagram.com/johndoe", clicks: 189, change: -5 },
  { title: "YouTube Channel", url: "https://youtube.com/johndoe", clicks: 156, change: 23 },
  { title: "Email Contact", url: "mailto:john@example.com", clicks: 98, change: 8 },
  { title: "LinkedIn Profile", url: "https://linkedin.com/in/johndoe", clicks: 67, change: -2 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedBioLink, setSelectedBioLink] = useState("all")

  const stats = {
    totalClicks: 1247,
    totalVisitors: 892,
    clickThroughRate: 68.5,
    avgSessionTime: "2m 34s",
  }

  const exportData = (format: "csv" | "pdf") => {
    // Mock export functionality
    console.log(`Exporting data as ${format.toUpperCase()}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
            </div>
            <p className="text-muted-foreground">Track performance and understand your audience</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Select value={selectedBioLink} onValueChange={setSelectedBioLink}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select bio-link" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bio-Links</SelectItem>
                <SelectItem value="main">My Main Bio-Link</SelectItem>
                <SelectItem value="event">Event Promotion</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalClicks.toLocaleString()}</p>
                </div>
                <MousePointer className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="h-3 w-3 text-secondary" />
                <span className="text-xs text-secondary">+12% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unique Visitors</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalVisitors.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="h-3 w-3 text-secondary" />
                <span className="text-xs text-secondary">+8% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Click-through Rate</p>
                  <p className="text-2xl font-bold text-foreground">{stats.clickThroughRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowDown className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent">-2% from last week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Session Time</p>
                  <p className="text-2xl font-bold text-foreground">{stats.avgSessionTime}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="h-3 w-3 text-secondary" />
                <span className="text-xs text-secondary">+15% from last week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="links">Top Links</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Clicks Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Clicks Over Time</CardTitle>
                  <CardDescription>Daily clicks and unique visitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={clickData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="clicks"
                        stackId="1"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="visitors"
                        stackId="2"
                        stroke="hsl(var(--secondary))"
                        fill="hsl(var(--secondary))"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Device Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                  <CardDescription>Clicks by device type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    {deviceData.map((device) => (
                      <div key={device.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                        <span className="text-sm text-muted-foreground">{device.name}</span>
                        <span className="text-sm font-medium text-foreground">{device.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Geographic Data */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Countries</CardTitle>
                  <CardDescription>Clicks by geographic location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {countryData.map((country) => (
                      <div key={country.country} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{country.country}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${country.percentage}%` }} />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">{country.clicks}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Direct</span>
                      <span className="text-sm font-medium text-foreground">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Instagram</span>
                      <span className="text-sm font-medium text-foreground">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Twitter</span>
                      <span className="text-sm font-medium text-foreground">15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">LinkedIn</span>
                      <span className="text-sm font-medium text-foreground">8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Other</span>
                      <span className="text-sm font-medium text-foreground">4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="links" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Links</CardTitle>
                <CardDescription>Your most clicked links and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topLinks.map((link, index) => (
                    <div
                      key={link.title}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                          <span className="text-sm font-semibold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{link.title}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <ExternalLink className="h-3 w-3" />
                            {link.url}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{link.clicks}</p>
                          <p className="text-xs text-muted-foreground">clicks</p>
                        </div>
                        <Badge variant={link.change > 0 ? "default" : "secondary"}>
                          {link.change > 0 ? "+" : ""}
                          {link.change}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Export Analytics Data</CardTitle>
                  <CardDescription>Download your analytics data in various formats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button onClick={() => exportData("csv")} className="w-full justify-start" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export as CSV
                    </Button>
                    <Button onClick={() => exportData("pdf")} className="w-full justify-start" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export as PDF Report
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Exports include:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Click and visitor data</li>
                      <li>Geographic breakdown</li>
                      <li>Device and browser stats</li>
                      <li>Top performing links</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>Get regular analytics reports delivered to your email</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Weekly Report
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Monthly Report
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Available on Pro and Business plans</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
