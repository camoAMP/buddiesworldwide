import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/components/cart-provider"
import { WishlistProvider } from "@/components/wishlist-provider"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "sonner"
import { ArticleTracker } from "@/components/article-tracker"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Buddies World Wide - Global Marketplace for Everyday Essentials",
  description:
    "Shop from trusted vendors worldwide. Find 420 products, fresh produce, household essentials, snacks and more. Vendors welcome - join our global marketplace today!",
  keywords: ["marketplace", "ecommerce", "dropshipping", "420", "groceries", "household", "global shipping"],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#22c55e" },
    { media: "(prefers-color-scheme: dark)", color: "#16a34a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ArticleTracker />
          <CartProvider>
            <WishlistProvider>
              <SiteHeader />
              <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
                {children}
              </Suspense>
              <Toaster richColors position="top-right" />
            </WishlistProvider>
          </CartProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
