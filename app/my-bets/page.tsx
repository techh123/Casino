"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useBetting } from "@/contexts/betting-context"
import {
  Home,
  ListVideo,
  Star,
  Newspaper,
  Search,
  ChevronLeft,
  BarChartBig,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Trophy,
  Euro,
  Wallet,
  Bell,
  User,
  ArchiveIcon,
  CalendarDays,
} from "lucide-react"

// Re-use from sport/page.tsx or make shared components
const flagPlaceholder = (countryCode: string, size = 20) =>
  `/placeholder.svg?width=${size}&height=${size}&text=${countryCode.toUpperCase()}`
const teamLogoPlaceholder = (teamName: string, size = 24) =>
  `/placeholder.svg?width=${size}&height=${size}&query=${teamName.replace(/\s+/g, "%20")}%20logo`

const sidebarTopIcons = [
  { name: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
  { name: "Live", icon: <ListVideo className="w-5 h-5" />, href: "/sport?tab=live" }, // Assuming live tab on sport page
  { name: "Favorites", icon: <Star className="w-5 h-5" />, href: "#" },
  { name: "My Bets", icon: <Newspaper className="w-5 h-5" />, href: "/my-bets" },
  { name: "Search", icon: <Search className="w-5 h-5" />, href: "#" },
]

const featuredLeagues = [
  { name: "UEFA Nations League", category: "Soccer · International", icon: flagPlaceholder("EU", 24), href: "#" },
  { name: "NBA", category: "Basketball · USA", icon: flagPlaceholder("US", 24), href: "#" },
  { name: "Brasileiro Serie A", category: "Soccer · Brazil", icon: flagPlaceholder("BR", 24), href: "#" },
]

const sportsListData = [
  // Simplified for My Bets page sidebar, actual data can be shared
  {
    name: "Soccer",
    icon: teamLogoPlaceholder("Soccer ball", 20),
    count: 462,
    href: "/sport?sport=soccer",
    id: "soccer",
  },
  {
    name: "FIFA",
    icon: teamLogoPlaceholder("FIFA game controller", 20),
    count: 63,
    href: "/sport?sport=fifa",
    id: "fifa",
    isHot: true,
  },
  {
    name: "Basketball",
    icon: teamLogoPlaceholder("Basketball", 20),
    count: 97,
    href: "/sport?sport=basketball",
    id: "basketball",
  },
  {
    name: "Tennis",
    icon: teamLogoPlaceholder("Tennis racket", 20),
    count: 279,
    href: "/sport?sport=tennis",
    id: "tennis",
  },
]

const MyBetsPage: React.FC = () => {
  const { balance, placedBets } = useBetting()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeFilterTab, setActiveFilterTab] = useState<
    "all" | "open" | "won" | "lost" | "cashed_out" | "cancelled" | "refund"
  >("open")
  const pathname = usePathname()

  const filterTabs: { id: typeof activeFilterTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "open", label: "Open Bets" },
    { id: "won", label: "Won" },
    { id: "lost", label: "Lost" },
    { id: "cashed_out", label: "Cashed Out" },
    { id: "cancelled", label: "Cancelled" },
    { id: "refund", label: "Refund" },
  ]

  const filteredBets = placedBets.filter((bet) => {
    if (activeFilterTab === "all") return true
    return bet.status === activeFilterTab
  })

  const DesktopMyBetsSidebar = () => (
    <aside className="w-60 bg-[#1e2024] p-0 fixed top-0 left-0 h-full z-40 flex flex-col text-sm">
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700 shrink-0">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/placeholder.svg?width=32&height=32" alt="NEWCASINO Logo" width={32} height={32} />
          <span className="text-xl font-bold text-yellow-400">NEWCASINO</span>
        </Link>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>
      <nav className="flex items-center justify-around py-2 border-b border-gray-700 shrink-0">
        {sidebarTopIcons.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            title={item.name}
            className={`p-2 transition-colors ${pathname === item.href ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"}`}
          >
            {item.icon}
          </Link>
        ))}
      </nav>
      <ScrollArea className="flex-grow">
        <div className="p-3 space-y-2">
          {featuredLeagues.map((league) => (
            <Link
              key={league.name}
              href={league.href}
              className="flex items-center space-x-2 p-1.5 rounded hover:bg-gray-700/50 transition-colors"
            >
              <Image
                src={league.icon || "/placeholder.svg"}
                alt={league.category}
                width={20}
                height={20}
                className="rounded-full"
              />
              <div>
                <p className="text-xs text-gray-500">{league.category}</p>
                <p className="text-white font-medium text-xs">{league.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="p-3 flex items-center border-t border-b border-gray-700">
          <Button variant="ghost" className="flex-1 rounded-md py-1.5 text-xs h-auto bg-yellow-400 text-black">
            Sports
          </Button>
          <Button
            variant="ghost"
            className="flex-1 rounded-md py-1.5 text-xs h-auto bg-transparent text-gray-400 hover:bg-gray-700/50"
          >
            Esports
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-yellow-400 ml-1">
            <BarChartBig className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-1">
          {sportsListData.map((sport) => (
            <Link
              key={sport.id}
              href={sport.href}
              className={`flex items-center justify-between p-2 rounded hover:bg-gray-700/50 transition-colors group w-full text-left text-gray-300 hover:text-yellow-400`}
            >
              <div className="flex items-center space-x-2.5">
                <Image src={(sport.icon as string) || "/placeholder.svg"} alt={sport.name} width={16} height={16} />
                <span className="text-xs">{sport.name}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 bg-gray-700 text-gray-400">
                  {sport.count}
                </Badge>
                <ChevronDown className="w-3 h-3 text-gray-500 transform rotate-[-90deg]" />
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </aside>
  )

  const MobileMyBetsSidebar = () => (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[#1e2024] p-0 z-50 flex flex-col text-sm">
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700 shrink-0">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/placeholder.svg?width=32&height=32" alt="NEWCASINO Logo" width={32} height={32} />
          <span className="text-xl font-bold text-yellow-400">NEWCASINO</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      <nav className="flex items-center justify-around py-2 border-b border-gray-700 shrink-0">
        {sidebarTopIcons.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            title={item.name}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`p-2 transition-colors ${pathname === item.href ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"}`}
          >
            {item.icon}
          </Link>
        ))}
      </nav>
      <ScrollArea className="flex-grow">
        {/* Simplified content for mobile sidebar, can be expanded */}
        <div className="p-3 space-y-2">
          {featuredLeagues.map((league) => (
            <Link
              key={league.name}
              href={league.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-1.5 rounded hover:bg-gray-700/50 transition-colors"
            >
              <Image
                src={league.icon || "/placeholder.svg"}
                alt={league.category}
                width={20}
                height={20}
                className="rounded-full"
              />
              <div>
                <p className="text-xs text-gray-500">{league.category}</p>
                <p className="text-white font-medium text-xs">{league.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </aside>
  )

  return (
    <div className="flex min-h-screen bg-[#16181c] text-gray-300">
      <div className="hidden md:block">
        <DesktopMyBetsSidebar />
      </div>
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
          <MobileMyBetsSidebar />
        </>
      )}

      <div className="flex-1 md:ml-60 flex flex-col">
        <header className="sticky top-0 z-30 bg-[#1e2024]/90 backdrop-blur-sm shadow-sm h-16 flex items-center px-4">
          <div className="hidden md:flex flex-1 items-center justify-between">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white px-3 py-1.5 rounded-md text-sm font-semibold h-auto"
                asChild
              >
                <Link href="/">
                  <ShieldCheck className="w-4 h-4 mr-1.5" /> Casino
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="bg-yellow-400 text-black hover:bg-yellow-500 px-3 py-1.5 rounded-md text-sm font-semibold h-auto"
                asChild
              >
                <Link href="/sport">
                  <Trophy className="w-4 h-4 mr-1.5" /> Sport
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-sm text-white">
                <Euro className="w-4 h-4 text-blue-400" />
                <span>{balance.toFixed(2)}</span>
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
              <Button variant="ghost" className="text-gray-400 hover:text-white px-2 py-1 h-auto">
                <Image src={flagPlaceholder("GB", 20) || "/placeholder.svg"} alt="Language" width={20} height={15} />
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
          <div className="md:hidden flex flex-1 items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-300 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </Button>
            <Link href="/" className="flex items-center">
              <Image src="/placeholder.svg?width=30&height=30" alt="NEWCASINO Logo" width={28} height={28} />
              <span className="ml-2 text-lg font-bold text-yellow-400">NEWCASINO</span>
            </Link>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-3 py-1.5 rounded-md text-xs font-semibold h-auto">
              Join Now
            </Button>
          </div>
        </header>

        <main className="flex-grow p-4 sm:p-6 space-y-6 bg-[#16181c]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <Newspaper className="w-7 h-7 text-yellow-400" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">My Bets</h1>
            </div>
            <Button
              variant="default"
              className="bg-yellow-400 text-black hover:bg-yellow-500 text-xs px-3 py-1.5 h-auto"
            >
              <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
              Last Bets
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-700/50">
            {filterTabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => setActiveFilterTab(tab.id)}
                className={`px-3 py-1.5 text-xs rounded-full h-auto
                  ${activeFilterTab === tab.id ? "bg-yellow-400 text-black hover:bg-yellow-500" : "bg-[#2a2b3e] text-gray-300 hover:bg-gray-600"}`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {filteredBets.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 space-y-6">
              <div className="relative">
                <ArchiveIcon className="w-24 h-24 text-gray-600" />
                {/* Decorative plus signs - simplified */}
                <span className="absolute top-0 left-0 text-yellow-500 text-2xl opacity-50">+</span>
                <span className="absolute top-0 right-0 text-yellow-500 text-2xl opacity-50">+</span>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-yellow-500 text-2xl opacity-50">
                  +
                </span>
              </div>
              <p className="text-gray-400 text-lg">No bets are available</p>
              <p className="text-gray-500 text-sm">Choose different dates or filters.</p>
              <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-500 px-6 py-3">
                <Link href="/">Go To Home Page</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBets.map((bet) => (
                <div key={bet.id} className="bg-[#1e2024] p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-semibold text-white">{bet.eventName}</p>
                      <p className="text-xs text-gray-400">{bet.league}</p>
                      <p className="text-xs text-gray-500">Placed: {new Date(bet.datePlaced).toLocaleString()}</p>
                    </div>
                    <Badge
                      className={`text-xs px-2 py-1 capitalize ${
                        bet.status === "open"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : bet.status === "won"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : bet.status === "lost"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                      }`}
                    >
                      {bet.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="border-t border-gray-700/50 pt-2 mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Selection:</span>
                      <span className="text-white">{bet.selection}</span>
                    </div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Odds:</span>
                      <span className="text-white">@{bet.odds.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Stake:</span>
                      <span className="text-white">{bet.stake.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-400">Potential Win:</span>
                      <span className="text-yellow-400">{bet.potentialWin.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-700/50 flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">ODDS FORMAT</span>
              <Button
                variant="outline"
                className="bg-[#2a2b3e] border-gray-600 text-gray-300 hover:bg-gray-700/80 text-xs px-3 py-1 h-auto"
              >
                European <ChevronDown className="w-3 h-3 ml-2" />
              </Button>
            </div>
            <p className="text-xs text-gray-600 max-w-md text-center">
              Although every effort is made to ensure data displayed on our site is accurate,
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MyBetsPage
