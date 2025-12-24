"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  Save,
  ArrowLeft,
  LinkIcon,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Mail,
  Phone,
  GripVertical,
  Trash2,
} from "lucide-react"
import Link from "next/link"

interface BioLink {
  id: string
  type: "link" | "social" | "contact"
  title: string
  url: string
  icon: string
  isActive: boolean
}

export default function BuilderPage() {
  const [bioLinks, setBioLinks] = useState<BioLink[]>([
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
  ])

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    bio: "Content creator & entrepreneur. Sharing insights about tech and business.",
    avatar: "",
    customUrl: "johndoe",
  })

  const addNewLink = (type: "link" | "social" | "contact") => {
    const newLink: BioLink = {
      id: Date.now().toString(),
      type,
      title: "",
      url: "",
      icon: type === "link" ? "globe" : type === "social" ? "instagram" : "mail",
      isActive: true,
    }
    setBioLinks([...bioLinks, newLink])
  }

  const updateLink = (id: string, updates: Partial<BioLink>) => {
    setBioLinks(bioLinks.map((link) => (link.id === id ? { ...link, ...updates } : link)))
  }

  const removeLink = (id: string) => {
    setBioLinks(bioLinks.filter((link) => link.id !== id))
  }

  const getIconComponent = (iconName: string) => {
    const icons = {
      globe: Globe,
      instagram: Instagram,
      twitter: Twitter,
      youtube: Youtube,
      mail: Mail,
      phone: Phone,
      link: LinkIcon,
    }
    const IconComponent = icons[iconName as keyof typeof icons] || Globe
    return <IconComponent className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Bio-Link Builder</h1>
              <p className="text-sm text-muted-foreground">Create and customize your bio-link page</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Builder Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="links">Links</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Set up your profile details and custom URL</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        placeholder="Tell people about yourself..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customUrl">Custom URL</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                          connectsync.app/
                        </span>
                        <Input
                          id="customUrl"
                          value={profileData.customUrl}
                          onChange={(e) => setProfileData({ ...profileData, customUrl: e.target.value })}
                          className="rounded-l-none"
                          placeholder="your-username"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="links" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Links</CardTitle>
                    <CardDescription>Add different types of links to your bio-link page</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" onClick={() => addNewLink("link")} className="h-20 flex-col">
                        <Globe className="h-6 w-6 mb-2" />
                        <span className="text-xs">Website</span>
                      </Button>
                      <Button variant="outline" onClick={() => addNewLink("social")} className="h-20 flex-col">
                        <Instagram className="h-6 w-6 mb-2" />
                        <span className="text-xs">Social</span>
                      </Button>
                      <Button variant="outline" onClick={() => addNewLink("contact")} className="h-20 flex-col">
                        <Mail className="h-6 w-6 mb-2" />
                        <span className="text-xs">Contact</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  {bioLinks.map((link, index) => (
                    <Card key={link.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                              {getIconComponent(link.icon)}
                              <Badge variant="secondary" className="text-xs">
                                {link.type}
                              </Badge>
                              <Switch
                                checked={link.isActive}
                                onCheckedChange={(checked) => updateLink(link.id, { isActive: checked })}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                placeholder="Link title"
                                value={link.title}
                                onChange={(e) => updateLink(link.id, { title: e.target.value })}
                              />
                              <Input
                                placeholder="URL"
                                value={link.url}
                                onChange={(e) => updateLink(link.id, { url: e.target.value })}
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLink(link.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="design" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Design & Theme</CardTitle>
                    <CardDescription>Customize the appearance of your bio-link page</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" className="h-16 bg-white border-2">
                          Light
                        </Button>
                        <Button variant="outline" className="h-16 bg-gray-900 text-white border-2">
                          Dark
                        </Button>
                        <Button
                          variant="outline"
                          className="h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-2"
                        >
                          Gradient
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Button Style</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="justify-start bg-transparent">
                          Rounded
                        </Button>
                        <Button variant="outline" className="justify-start rounded-none bg-transparent">
                          Square
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Live Preview
                </CardTitle>
                <CardDescription>See how your bio-link page will look to visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-background border border-border rounded-lg p-6 max-w-sm mx-auto">
                  {/* Profile Section */}
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-semibold text-primary">{profileData.name.charAt(0) || "J"}</span>
                    </div>
                    <h2 className="text-lg font-semibold text-foreground mb-2">{profileData.name || "Your Name"}</h2>
                    <p className="text-sm text-muted-foreground">{profileData.bio || "Your bio will appear here..."}</p>
                  </div>

                  {/* Links Section */}
                  <div className="space-y-3">
                    {bioLinks
                      .filter((link) => link.isActive && link.title && link.url)
                      .map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                        >
                          {getIconComponent(link.icon)}
                          <span className="text-sm font-medium text-foreground">{link.title}</span>
                        </div>
                      ))}
                    {bioLinks.filter((link) => link.isActive && link.title && link.url).length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">Add some links to see them here</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
