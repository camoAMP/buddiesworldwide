"use client"

import type React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/dashboard-sidebar"
import { Separator } from "@/components/ui/separator"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <main className="flex-1 p-4">
          <div className="flex items-center gap-2 mb-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              <img src="/images/connectsync-logo.png" alt="ConnectSync" className="h-6 w-auto md:hidden" />
              <span className="font-semibold md:hidden">ConnectSync</span>
            </div>
          </div>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
