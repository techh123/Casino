"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronDown,
  Gift,
  Globe,
  Home,
  Menu,
  MessageCircle,
  Percent,
  PlayCircle,
  Search,
  ShieldCheck,
  Trophy,
  Gamepad2,
  Contact,
  Dice5,
  X,
  Euro,
  Wallet,
  Bell,
  User,
} from "lucide-react"

// Re-using GameCard and gameImagePlaceholder from app/page.tsx
// If these are in separate files, adjust imports accordingly
const gameImagePlaceholder = (query: string, width = 200, height = 280) =>
  `/placeholder.svg?width=${width}&height=${height}&query=${query}`

interface GameCardProps {
  title: string
  provider?: string // Provider is optional for this page's game cards
  image: string
  tag?: string | null
}

const GameCard: React.FC<GameCardProps> = ({ title, image, tag }) => {
  return (
    <div className="bg-[#1a1b2e] rounded-lg overflow-hidden shadow-lg w-full group transition-all duration-300 hover:scale-105">
      <div className="relative aspect-[3/4]">
        {" "}
        {/* Aspect ratio for game cards */}
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="group-hover:opacity-80 transition-opacity"
        />
        {tag && (
          <Badge
            className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 text-xs px-1.5 py-0.5 ${tag === "NEW" ? "bg-green-500" : "bg-red-500"} text-white`}
          >
            {tag}
          </Badge>
        )}
      </div>
      <div className="p-2 sm:p-3">
        <h3 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-yellow-400 transition-colors">
          {title}
        </h3>
      </div>
    </div>
  )
}

const mainNavItems = [
  { name: "Home", icon: <Home className="w-5 h-5" />, href: "/?tab=casino" },
  { name: "Promotions", icon: <Percent className="w-5 h-5" />, href: "/promotions" },
  { name: "Casino Games", icon: <Dice5 className="w-5 h-5" />, href: "/?tab=casino-games" },
  { name: "Live Casino", icon: <PlayCircle className="w-5 h-5" />, href: "/?tab=live-casino" },
  { name: "Sport", icon: <Trophy className="w-5 h-5" />, href: "/sport" },
  { name: "Virtual Games", icon: <Gamepad2 className="w-5 h-5" />, href: "/?tab=virtual-games" },
  { name: "Drops & Wins", icon: <Gift className="w-5 h-5" />, href: "/drops-and-wins" },
]

const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date()
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearTimeout(timer)
  })

  return (
    <div className="flex space-x-2 sm:space-x-4 text-center">
      {Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="bg-black/30 p-2 sm:p-3 rounded-md min-w-[50px] sm:min-w-[70px]">
          <div className="text-xl sm:text-2xl font-bold text-yellow-400">{value}</div>
          <div className="text-[10px] sm:text-xs uppercase text-gray-400">{interval}</div>
        </div>
      ))}
    </div>
  )
}

const prizePoolData = {
  dailyPrizeDrops: {
    weeklyPool: "€255,000",
    dailyPool: "€35,000",
    prizes: [
      { quantity: 1, prize: "€2,500" },
      { quantity: 2, prize: "€1,000" },
      { quantity: 5, prize: "€500" },
      { quantity: 12, prize: "€250" },
      { quantity: 30, prize: "€100" },
      { quantity: 80, prize: "€50" },
      { quantity: 220, prize: "€20" },
      { quantity: 350, prize: "€10" },
    ],
  },
  weeklyBlackjack: {
    weeklyPool: "€108,000",
    prizes: [
      { rank: 1, prize: "€10,000" },
      { rank: 2, prize: "€5,000" },
      { rank: 3, prize: "€2,000" },
      { rank: "4-10", prize: "€1,000" },
      { rank: "11-30", prize: "€500" },
      { rank: "31-80", prize: "€100" },
      { rank: "81-200", prize: "€50" },
      { rank: "201-500", prize: "€25" },
    ],
  },
  dailyGameShows: {
    weeklyPool: "€70,000",
    dailyPool: "€10,000",
    prizes: [
      { rank: 1, prize: "€1,000" },
      { rank: 2, prize: "€500" },
      { rank: 3, prize: "€300" },
      { rank: "4-10", prize: "€100" },
      { rank: "11-50", prize: "€50" },
      { rank: "51-100", prize: "€20" },
      { rank: "101-300", prize: "€10" },
    ],
  },
}

const participatingGames = [
  // All games were placeholders, so this array is now empty.
  // If you have actual image URLs, you can add them back here.
  // Example:
  // { title: "Wolf Gold", image: "actual_url_for_wolf_gold.jpg" },
]

export default function DropsAndWinsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isCasinoActive = pathname === "/" || pathname === "/promotions" || pathname === "/drops-and-wins"

  // Target date for countdown - March 6, 2024. For testing, use a future date.
  // const promotionEndDate = "2024-03-06T23:59:59"
  const promotionEndDate = "2025-03-06T23:59:59" // Future date for demo

  return (
    <div className="flex min-h-screen bg-[#0f101c] text-gray-300">
      {/* Desktop Sidebar */}
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
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Header */}
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

        {/* Drops & Wins Main Content */}
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative h-[400px] sm:h-[450px] md:h-[500px] flex flex-col items-center justify-center text-center p-4 text-white">
            <Image
              src="/drops-and-wins-hero-banner.jpeg"
              alt="Drops & Wins Slots"
              layout="fill"
              objectFit="cover"
              className="opacity-40"
              priority
            />
            <div className="relative z-10 space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider">
                DROPS & WINS SLOTS
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-400">PRAGMATIC PLAY</p>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-300">$2,000,000</div>
              <p className="text-sm sm:text-base uppercase text-gray-300">EXPECTED MONTHLY PRIZE POOL</p>
              <div className="mt-4 sm:mt-6">
                <p className="text-xs sm:text-sm text-gray-400 mb-2 uppercase">Ends In:</p>
                <CountdownTimer targetDate={promotionEndDate} />
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-3 sm:mt-4 max-w-md mx-auto">
                OPT-IN REQUIRED. PROMOTION RUNS FROM 5TH APRIL 2023 TO 6TH MARCH 2024.
              </p>
            </div>
          </section>

          {/* Tabs Section */}
          <section className="p-4 sm:p-6 bg-[#0f101c]">
            <Tabs defaultValue="prize-pool" className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 bg-[#1a1b2e] p-1 rounded-lg mb-4">
                <TabsTrigger
                  value="prize-pool"
                  className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-gray-300 hover:bg-gray-700/50 py-2.5 text-sm font-semibold"
                >
                  PRIZE POOL
                </TabsTrigger>
                <TabsTrigger
                  value="leaderboard"
                  className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-gray-300 hover:bg-gray-700/50 py-2.5 text-sm font-semibold"
                >
                  LEADERBOARD
                </TabsTrigger>
                <TabsTrigger
                  value="rules"
                  className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-gray-300 hover:bg-gray-700/50 py-2.5 text-sm font-semibold"
                >
                  RULES
                </TabsTrigger>
              </TabsList>

              <TabsContent value="prize-pool" className="bg-[#1a1b2e] p-4 sm:p-6 rounded-lg space-y-6">
                {/* Daily Prize Drops */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-3">Daily Prize Drops</h2>
                  <p className="text-sm text-gray-400 mb-1">
                    Expected Weekly Prize Pool:{" "}
                    <span className="font-semibold text-white">{prizePoolData.dailyPrizeDrops.weeklyPool}</span>
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    Expected Daily Prize Pool:{" "}
                    <span className="font-semibold text-white">{prizePoolData.dailyPrizeDrops.dailyPool}</span> / 700
                    prizes
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[400px] text-sm text-left">
                      <thead className="bg-gray-700/30 text-gray-400 uppercase text-xs">
                        <tr>
                          <th className="p-2 sm:p-3">Quantity</th>
                          <th className="p-2 sm:p-3">Prize</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {prizePoolData.dailyPrizeDrops.prizes.map((p, i) => (
                          <tr key={i}>
                            <td className="p-2 sm:p-3">{p.quantity}</td>
                            <td className="p-2 sm:p-3 font-semibold text-white">{p.prize}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Weekly Blackjack Tournament */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-3">
                    Weekly Blackjack Tournament
                  </h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Expected Weekly Prize Pool:{" "}
                    <span className="font-semibold text-white">{prizePoolData.weeklyBlackjack.weeklyPool}</span> / 500
                    prizes
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[400px] text-sm text-left">
                      <thead className="bg-gray-700/30 text-gray-400 uppercase text-xs">
                        <tr>
                          <th className="p-2 sm:p-3">Rank</th>
                          <th className="p-2 sm:p-3">Prize</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {prizePoolData.weeklyBlackjack.prizes.map((p, i) => (
                          <tr key={i}>
                            <td className="p-2 sm:p-3">{p.rank}</td>
                            <td className="p-2 sm:p-3 font-semibold text-white">{p.prize}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Daily Game Shows Tournament */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-3">
                    Daily Game Shows Tournament
                  </h2>
                  <p className="text-sm text-gray-400 mb-1">
                    Expected Weekly Prize Pool:{" "}
                    <span className="font-semibold text-white">{prizePoolData.dailyGameShows.weeklyPool}</span>
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    Expected Daily Prize Pool:{" "}
                    <span className="font-semibold text-white">{prizePoolData.dailyGameShows.dailyPool}</span> / 300
                    prizes
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[400px] text-sm text-left">
                      <thead className="bg-gray-700/30 text-gray-400 uppercase text-xs">
                        <tr>
                          <th className="p-2 sm:p-3">Rank</th>
                          <th className="p-2 sm:p-3">Prize</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {prizePoolData.dailyGameShows.prizes.map((p, i) => (
                          <tr key={i}>
                            <td className="p-2 sm:p-3">{p.rank}</td>
                            <td className="p-2 sm:p-3 font-semibold text-white">{p.prize}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="leaderboard" className="bg-[#1a1b2e] p-4 sm:p-6 rounded-lg">
                <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-4">Leaderboard</h2>
                <p className="text-gray-400">
                  Leaderboard data will be displayed here. This typically involves fetching dynamic data for player
                  rankings, scores, and potential prizes.
                </p>
                {/* Placeholder for leaderboard table */}
              </TabsContent>

              <TabsContent value="rules" className="bg-[#1a1b2e] p-4 sm:p-6 rounded-lg">
                <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-4">Rules</h2>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>The Network Promotion includes 364 Daily Prize Drops and 52 Weekly Tournaments.</p>
                  <p>
                    To participate in any Daily Prize Drops and/or Weekly Tournaments in the Network Promotion, players
                    must open any of the participating games and join/opt in.
                  </p>
                  <p>The total expected prize pool for the entire Network Promotion is €24,000,000.</p>
                  <p>Prizes will be paid out as per the 'Prizes' tab, found in each of the participating games.</p>
                  <p>All amounts are displayed in-game in the Player's Currency.</p>
                  <p>
                    Pragmatic Play reserves the right to amend, suspend or cancel the Network Promotion, Tournament
                    and/or Prize Drop at any time.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Participating Games Section */}
          <section className="p-4 sm:p-6 bg-[#0f101c]">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 sm:mb-6 text-center sm:text-left">
              Participating Games
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {participatingGames.map((game, index) => (
                <GameCard key={index} title={game.title} image={game.image} />
              ))}
            </div>
          </section>
        </main>

        {/* Footer (can be a shared component or copied) */}
        <footer className="bg-[#1a1b2e] text-gray-400 p-4 sm:p-8 mt-auto">
          <div className="text-center text-xs">Drops & Wins content. &copy; 2018-2025 All Rights Reserved.</div>
        </footer>
      </div>

      {/* Floating Chat Button */}
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
