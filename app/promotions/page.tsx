"use client"

import type React from "react"
import { usePathname } from "next/navigation" // Import usePathname

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Gift,
  Home,
  Percent,
  PlayCircle,
  Trophy,
  Gamepad2,
  Dice5,
  CalendarClock,
  Menu,
  X,
  Search,
  Globe,
  ChevronDown,
  ShieldCheck,
  Contact,
  MessageCircle,
  Euro,
  Wallet,
  Bell,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Standard navigation items for pages other than /sport
const mainNavItems = [
  { name: "Home", icon: <Home className="w-5 h-5" />, href: "/?tab=casino" },
  { name: "Promotions", icon: <Percent className="w-5 h-5" />, href: "/promotions" },
  { name: "Casino Games", icon: <Dice5 className="w-5 h-5" />, href: "/?tab=casino-games" }, // Assuming Casino Games is part of Home
  { name: "Live Casino", icon: <PlayCircle className="w-5 h-5" />, href: "/?tab=live-casino" }, // Assuming Live Casino is part of Home
  { name: "Sport", icon: <Trophy className="w-5 h-5" />, href: "/sport" },
  { name: "Virtual Games", icon: <Gamepad2 className="w-5 h-5" />, href: "/?tab=virtual-games" }, // Placeholder
  { name: "Drops & Wins", icon: <Gift className="w-5 h-5" />, href: "/drops-and-wins" },
]

const topCategories = [
  { name: "New Games", href: "#" },
  { name: "Popular Games", href: "#" },
  { name: "Slots", href: "#" },
  { name: "Table Games", href: "#" },
]

const placeholderPromotions = [
  // All promotions were placeholders, so this array is now empty.
  // If you have actual image URLs, you can add them back here.
  // Example:
  // {
  //   id: "promo1",
  //   title: "Welcome Bonus Bonanza",
  //   description: "Get a 100% match bonus up to $200 on your first deposit. Kickstart your adventure!",
  //   image: "actual_url_for_promo1.jpg",
  //   ctaText: "Claim Bonus",
  //   tags: ["Casino", "New Players"],
  //   termsLink: "#",
  //   expiryDate: "2025-12-31",
  // },
]

interface Promotion {
  id: string
  title: string
  description: string
  image: string
  ctaText: string
  tags: string[]
  termsLink: string
  expiryDate?: string
}

const PromotionCard: React.FC<{ promotion: Promotion }> = ({ promotion }) => {
  return (
    <Card className="bg-[#1a1b2e] border-gray-700 overflow-hidden flex flex-col">
      <CardHeader className="p-0">
        <div className="relative w-full h-48 sm:h-56">
          <Image src={promotion.image || "/placeholder.svg"} alt={promotion.title} layout="fill" objectFit="cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg sm:text-xl font-semibold text-yellow-400 mb-2">{promotion.title}</CardTitle>
        <div className="flex flex-wrap gap-1 mb-3">
          {promotion.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-700 text-yellow-300 text-xs px-1.5 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-300 mb-3 line-clamp-3">{promotion.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-gray-700 mt-auto">
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          {promotion.expiryDate && (
            <>
              <CalendarClock className="w-3.5 h-3.5" />
              <span>{promotion.expiryDate === "Ongoing" ? "Ongoing Offer" : `Expires: ${promotion.expiryDate}`}</span>
            </>
          )}
        </div>
        <Button className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-500 text-sm px-4 py-2">
          {promotion.ctaText}
        </Button>
      </CardFooter>
      <div className="p-2 text-center border-t border-gray-700">
        <Link href={promotion.termsLink} className="text-xs text-gray-500 hover:text-yellow-400">
          Terms & Conditions Apply
        </Link>
      </div>
    </Card>
  )
}

export default function PromotionsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isCasinoActive = pathname === "/" || pathname === "/promotions" || pathname === "/drops-and-wins"

  return (
    <div className="flex min-h-screen bg-[#0f101c] text-gray-300">
      {/* Desktop Sidebar - Standard Navigation */}
      <aside className="w-64 bg-[#1a1b2e] p-4 space-y-6 hidden md:flex flex-col fixed top-0 left-0 h-full z-40">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/placeholder.svg?width=40&height=40" alt="NEWCASINO Logo" width={40} height={40} />
            <span className="text-2xl font-bold text-yellow-400">NEWCASINO</span>
          </Link>
        </div>
        <nav className="flex-grow overflow-y-auto">
          <ul className="space-y-2">
            {mainNavItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-yellow-400 transition-colors ${
                    pathname === item.href ? "bg-gray-700 text-yellow-400" : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-700">
          <Link
            href="#"
            className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-yellow-400 transition-colors"
          >
            <Contact className="w-5 h-5" />
            <span>Contact us</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Slide-In Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="fixed top-0 left-0 h-full w-64 bg-[#1a1b2e] p-4 space-y-6 flex flex-col">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/placeholder.svg?width=40&height=40" alt="NEWCASINO Logo" width={40} height={40} />
                <span className="text-xl font-bold text-yellow-400">NEWCASINO</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <nav className="flex-grow overflow-y-auto">
              <ul className="space-y-2">
                {mainNavItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-yellow-400 transition-colors ${
                        pathname === item.href ? "bg-gray-700 text-yellow-400" : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto pt-6 border-t border-gray-700">
              <Link
                href="#"
                className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-yellow-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Contact className="w-5 h-5" />
                <span>Contact us</span>
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="sticky top-0 z-30 bg-[#1a1b2e]/80 backdrop-blur-md shadow-sm">
          <div className="hidden md:flex p-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className={`${isCasinoActive ? "bg-yellow-400 text-black hover:bg-yellow-500" : "text-gray-400 hover:text-white"} px-4 py-2 rounded-full text-sm font-semibold`}
                asChild
              >
                <Link href="/">
                  <ShieldCheck className="w-4 h-4 mr-2" /> Casino
                </Link>
              </Button>
              <Button
                variant="ghost"
                className={`${pathname === "/sport" ? "bg-yellow-400 text-black hover:bg-yellow-500" : "text-gray-400 hover:text-white"} px-4 py-2 rounded-full text-sm font-semibold`}
                asChild
              >
                <Link href="/sport">
                  <Trophy className="w-4 h-4 mr-2" /> Sport
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              {/* New elements for logged-in state */}
              <div className="flex items-center space-x-1 text-sm text-white">
                <Euro className="w-4 h-4 text-blue-400" />
                <span>0</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-4 py-2 rounded-md text-sm font-semibold flex items-center space-x-1.5">
                <Wallet className="w-4 h-4" />
                <span>Wallet</span>
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white w-8 h-8">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white w-8 h-8">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white w-8 h-8">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Globe className="w-5 h-5" />
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
          <div className="md:hidden p-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-300 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </Button>
            <Link href="/" className="flex items-center">
              <Image src="/placeholder.svg?width=30&height=30" alt="NEWCASINO Logo" width={30} height={30} />
              <span className="ml-2 text-lg font-bold text-yellow-400">NEWCASINO</span>
            </Link>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-3 py-1.5 rounded-md text-xs font-semibold">
              Join Now
            </Button>
          </div>
          <div className="md:hidden flex items-center justify-center space-x-2 p-2 bg-[#0f101c]">
            <Button
              variant="ghost"
              className={`flex-1 ${isCasinoActive ? "bg-yellow-400 text-black hover:bg-yellow-500" : "text-gray-400 bg-[#2a2b3e] hover:text-white"} px-4 py-2 rounded-full text-sm font-semibold`}
              asChild
            >
              <Link href="/">
                <ShieldCheck className="w-4 h-4 mr-2" /> Casino
              </Link>
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 ${pathname === "/sport" ? "bg-yellow-400 text-black hover:bg-yellow-500" : "text-gray-400 bg-[#2a2b3e] hover:text-white"} px-4 py-2 rounded-full text-sm font-semibold`}
              asChild
            >
              <Link href="/sport">
                <Trophy className="w-4 h-4 mr-2" /> Sport
              </Link>
            </Button>
          </div>
        </header>
        <main className="flex-grow p-4 sm:p-6">
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-yellow-400">Promotions</h1>
            <p className="text-gray-400 mt-1">Check out our latest offers and bonuses!</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {placeholderPromotions.map((promotion) => (
              <PromotionCard key={promotion.id} promotion={promotion} />
            ))}
          </div>
        </main>
        <footer className="bg-[#1a1b2e] text-gray-400 p-4 sm:p-8 mt-auto">
          <div className="text-center text-xs">Promotions content. &copy; 2018-2025 All Rights Reserved.</div>
        </footer>
      </div>
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg z-40"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </Button>
    </div>
  )
}
