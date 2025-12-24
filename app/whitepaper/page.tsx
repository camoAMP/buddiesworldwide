"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArchitectureDiagram } from "@/components/diagrams/architecture-diagram"
import { SyncSequenceDiagram } from "@/components/diagrams/sync-sequence-diagram"
import { SecurityPermissionsDiagram } from "@/components/diagrams/security-permissions-diagram"
import { RoadmapTimeline } from "@/components/diagrams/roadmap-timeline"
import { TechStack } from "@/components/tech-stack"
import { Menu, FileText, Printer } from "lucide-react"
import Link from "next/link"

const sections = [
  { id: "abstract", title: "Abstract" },
  { id: "problem", title: "Problem Statement" },
  { id: "solution", title: "Solution Overview" },
  { id: "architecture", title: "System Architecture" },
  { id: "flow", title: "User Interaction Flow" },
  { id: "tech-stack", title: "Technology Stack" },
  { id: "differentiators", title: "Differentiators" },
  { id: "roadmap", title: "Implementation Roadmap" },
  { id: "security", title: "Security & Permissions" },
  { id: "future", title: "Future Work" },
  { id: "conclusion", title: "Conclusion" },
]

const roadmapPhases = [
  {
    phase: "Phase 1",
    title: "Core Integration Layer",
    description: "Build foundational API connectors and authentication framework",
    timeline: "Q1 2025",
  },
  {
    phase: "Phase 2",
    title: "Synchronization Engine",
    description: "Implement real-time sync with conflict resolution",
    timeline: "Q2 2025",
  },
  {
    phase: "Phase 3",
    title: "Automation & Rules",
    description: "Add workflow automation and custom rule builder",
    timeline: "Q3 2025",
  },
  {
    phase: "Phase 4",
    title: "Advanced Analytics",
    description: "Deploy ML-powered insights and predictive analytics",
    timeline: "Q4 2025",
  },
]

export default function WhitepaperPage() {
  const [tocOpen, setTocOpen] = useState(false)
  const articleRef = useRef<HTMLElement>(null)

  const handlePrint = () => {
    window.print()
  }

  // #region agent log
  useEffect(() => {
    const logArticleMetrics = () => {
      if (typeof window === 'undefined') return;
      const articleElements = document.querySelectorAll('article');
      articleElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);
        fetch('http://127.0.0.1:7242/ingest/cace0a0d-2960-4685-8e58-7d394a95f449',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/whitepaper/page.tsx:60',message:'Article element metrics',data:{index:idx,height:rect.height,width:rect.width,scrollHeight:el.scrollHeight,clientHeight:el.clientHeight,overflow:computedStyle.overflow,overflowY:computedStyle.overflowY,maxHeight:computedStyle.maxHeight,className:el.className,childrenCount:el.children.length},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
      });
    };
    logArticleMetrics();
    const resizeObserver = new ResizeObserver(() => {
      logArticleMetrics();
    });
    if (articleRef.current) {
      resizeObserver.observe(articleRef.current);
    }
    const timeoutId = setTimeout(logArticleMetrics, 100);
    const intervalId = setInterval(logArticleMetrics, 2000);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      resizeObserver.disconnect();
    };
  }, []);
  // #endregion

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold">ConnectSync Whitepaper</span>
            </Link>
            <Sheet open={tocOpen} onOpenChange={setTocOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden bg-transparent">
                  <Menu className="h-4 w-4" />
                  Contents
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Table of Contents</SheetTitle>
                </SheetHeader>
                <nav className="mt-6">
                  <ul className="space-y-2">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                          onClick={() => setTocOpen(false)}
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="print:hidden bg-transparent">
              <Printer className="h-4 w-4 mr-2" />
              Print PDF
            </Button>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex gap-8">
        {/* Desktop TOC */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <nav>
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl">
          <article ref={articleRef} className="prose prose-gray dark:prose-invert max-w-none">
            <header className="mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                ConnectSync: A Unified Integration Platform for Modern Workflows
              </h1>
              <p className="text-lg text-muted-foreground">Technical Whitepaper - Version 1.0 | January 2025</p>
            </header>

            <section id="abstract" className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Abstract</h2>
              <p className="text-muted-foreground leading-relaxed">
                ConnectSync addresses the growing challenge of data fragmentation across modern business tools. As
                organizations adopt specialized software for different functions, data silos emerge, leading to
                inefficiencies and inconsistencies. Our platform provides a unified integration layer that enables
                real-time synchronization, automated workflows, and comprehensive analytics across disparate systems.
              </p>
            </section>

            <section id="problem" className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Problem Statement</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Modern businesses rely on an average of 87 different software tools, creating significant challenges:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Data inconsistency across platforms leads to conflicting information</li>
                  <li>Manual data entry increases error rates and reduces productivity</li>
                  <li>Lack of real-time synchronization causes delays in decision-making</li>
                  <li>Complex integration requirements demand significant technical resources</li>
                  <li>Security concerns arise from multiple authentication systems</li>
                </ul>
              </div>
            </section>

            <section id="solution" className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Solution Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                ConnectSync provides a comprehensive integration platform that unifies data across business tools
                through three core components: an Integration Layer for secure connections, a Synchronization Engine for
                real-time data flow, and an Automation Framework for intelligent workflow management.
              </p>
            </section>

            <section id="architecture" className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">System Architecture</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The ConnectSync architecture follows a modular design pattern, enabling scalable integration across
                diverse platforms while maintaining security and performance standards.
              </p>
              <div className="my-8">
                <ArchitectureDiagram />
              </div>
            </section>

            <section id="flow" className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">User Interaction Flow</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The synchronization process follows a structured sequence that ensures data integrity and conflict
                resolution across all connected platforms.
              </p>
              <div className="my-8">
                <SyncSequenceDiagram />
              </div>
            </section>

            <section id="tech-stack" className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Technology Stack</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                ConnectSync leverages modern, battle-tested technologies to ensure reliability, scalability, and
                developer experience.
              </p>
              <div className="my-8">
                <TechStack />
              </div>
            </section>

            <section id="differentiators" className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Differentiators</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Real-time Synchronization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Unlike batch-based solutions, ConnectSync provides instant data updates across all connected
                      platforms.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Intelligent Conflict Resolution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Advanced algorithms automatically resolve data conflicts based on configurable business rules.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>No-Code Automation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Visual rule builder enables non-technical users to create complex workflow automations.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Enterprise Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      SOC 2 compliant with end-to-end encryption and granular permission controls.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="roadmap" className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Implementation Roadmap</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our development roadmap focuses on delivering core functionality first, then expanding capabilities
                based on user feedback and market demands.
              </p>
              <div className="my-8">
                <RoadmapTimeline phases={roadmapPhases} />
              </div>
            </section>

            <section id="security" className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Security & Permissions</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Security is paramount in ConnectSync's design, implementing multiple layers of protection and granular
                access controls.
              </p>
              <div className="my-8">
                <SecurityPermissionsDiagram />
              </div>
            </section>

            <section id="future" className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Future Work</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Future enhancements will focus on expanding platform capabilities and intelligence:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Machine learning-powered data mapping and transformation</li>
                  <li>Predictive analytics for workflow optimization</li>
                  <li>Advanced compliance frameworks (GDPR, HIPAA, SOX)</li>
                  <li>Mobile-first management interface</li>
                  <li>API marketplace for custom integrations</li>
                </ul>
              </div>
            </section>

            <section id="conclusion" className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Conclusion</h2>
              <p className="text-muted-foreground leading-relaxed">
                ConnectSync represents a paradigm shift in how organizations manage their data ecosystem. By providing
                real-time synchronization, intelligent automation, and comprehensive security, we enable businesses to
                focus on their core objectives while maintaining data consistency and operational efficiency across all
                platforms.
              </p>
            </section>
          </article>
        </main>
      </div>
    </div>
    </div>
  )
}
