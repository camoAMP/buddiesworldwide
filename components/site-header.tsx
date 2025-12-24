"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { WishlistButton } from "@/components/wishlist-button"
import { CartButton } from "@/components/cart-button"
import { Globe, Menu, Store, User, Search, Package } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-foreground">Buddies</span>
              <span className="text-xl font-light text-primary"> World Wide</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search products, categories..." className="w-full pl-9 bg-background" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            <Link
              href="/category/420"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium whitespace-nowrap"
            >
              420 Shop
            </Link>
            <Link
              href="/category/produce"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium whitespace-nowrap"
            >
              Produce
            </Link>
            <Link
              href="/category/household"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium whitespace-nowrap"
            >
              Household
            </Link>
            <Link
              href="/category/snacks"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium whitespace-nowrap"
            >
              Snacks
            </Link>
            <Link
              href="/products"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium whitespace-nowrap"
            >
              All Products
            </Link>
            <Link
              href="/web3-starter"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium whitespace-nowrap"
            >
              Web3
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/orders" className="hidden xl:block">
              <Button variant="ghost" size="sm">
                <Package className="h-4 w-4 mr-2" />
                Orders
              </Button>
            </Link>
            <ThemeToggle />
            <WishlistButton />
            <CartButton />
            <Link href="/account" className="hidden sm:block">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
            <Link href="/vendor/register" className="hidden xl:block">
              <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Store className="h-4 w-4 mr-2" />
                Vendor
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] overflow-y-auto">
                <nav className="flex flex-col gap-4 mt-8">
                  {/* Search - Mobile */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="search" placeholder="Search..." className="w-full pl-9" />
                  </div>

                  <hr className="border-border" />

                  {/* Categories */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Categories
                    </p>
                    <Link
                      href="/category/420"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      420 Shop
                    </Link>
                    <Link
                      href="/category/produce"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      Fresh Produce
                    </Link>
                    <Link
                      href="/category/household"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      Household
                    </Link>
                    <Link
                      href="/category/snacks"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      Snacks
                    </Link>
                    <Link
                      href="/category/health"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      Health & Wellness
                    </Link>
                    <Link
                      href="/category/baby"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      Baby & Kids
                    </Link>
                    <Link
                      href="/category/pets"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      Pet Supplies
                    </Link>
                    <Link
                      href="/category/beauty"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      Beauty & Personal
                    </Link>
                  </div>

                  <hr className="border-border" />

                  {/* Quick Links */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Quick Links
                    </p>
                    <Link
                      href="/products"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      All Products
                    </Link>
                    <Link
                      href="/web3-starter"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      Web3 Starter Kit
                    </Link>
                    <Link
                      href="/orders"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      My Orders
                    </Link>
                    <Link
                      href="/delivery"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      Track Delivery
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      My Wishlist
                    </Link>
                    <Link
                      href="/account"
                      className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      My Account
                    </Link>
                  </div>

                  <hr className="border-border" />

                  {/* Auth Actions */}
                  <Link href="/login">
                    <Button variant="outline" className="w-full bg-transparent">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" className="w-full bg-transparent">
                      Register Free
                    </Button>
                  </Link>
                  <Link href="/vendor/register">
                    <Button className="w-full bg-secondary text-secondary-foreground">
                      <Store className="h-4 w-4 mr-2" />
                      Become a Vendor
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
