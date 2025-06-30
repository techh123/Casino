"use client"

import { usePathname } from "next/navigation"
import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronDown,
  Menu,
  Search,
  ShieldCheck,
  Trophy,
  X,
  Home,
  ListVideo,
  Star,
  Newspaper,
  ChevronLeft,
  BarChartBig,
  Crown,
  Ticket,
  PlusCircle,
  Flame,
  BookOpen,
  GiftIcon,
  Settings2,
  Trash2,
  ChevronUp,
  Headphones,
  Gamepad2,
  MousePointer,
  Swords,
  Shield,
  Cpu,
  Euro,
  Wallet,
  Bell,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useBetting } from "@/contexts/betting-context"
import React from "react"

// Placeholder for country/team flag images
const flagPlaceholder = (countryCode: string, size = 20) =>
  `/placeholder.svg?width=${size}&height=${size}&text=${countryCode.toUpperCase()}`
const teamLogoPlaceholder = (teamName: string, size = 24) =>
  `/placeholder.svg?width=${size}&height=${size}&query=${teamName.replace(/\s+/g, "%20")}%20logo`
const userAvatarPlaceholder = (size = 32) => `/placeholder.svg?width=${size}&height=${size}&query=User%20Avatar`

interface BetSlipItem {
  id: string
  eventName: string
  market: string // e.g., "1x2", "To Qualify"
  selection: string // e.g., "Germany", "Draw", "Over 2.5"
  odds: number
  stake: number
  teamA?: string
  teamB?: string
  league?: string
}

const sidebarTopIcons = [
  { name: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
  { name: "Live", icon: <ListVideo className="w-5 h-5" />, href: "#" },
  { name: "Favorites", icon: <Star className="w-5 h-5" />, href: "#" },
  { name: "My Bets", icon: <Newspaper className="w-5 h-5" />, href: "/my-bets" },
  { name: "Search", icon: <Search className="w-5 h-5" />, href: "#" },
]

const featuredLeagues = [
  {
    name: "UEFA Nations League",
    category: "Soccer · International",
    icon: flagPlaceholder("EU", 24),
    href: "#",
  },
  { name: "NBA", category: "Basketball · USA", icon: flagPlaceholder("US", 24), href: "#" },
  { name: "Brasileiro Serie A", category: "Soccer · Brazil", icon: flagPlaceholder("BR", 24), href: "#" },
]

const sportsListData = [
  { name: "Soccer", icon: teamLogoPlaceholder("Soccer ball", 20), count: 462, href: "#", id: "soccer" },
  {
    name: "FIFA",
    icon: teamLogoPlaceholder("FIFA game controller", 20),
    count: 63,
    href: "#",
    id: "fifa",
    isHot: true,
  },
  { name: "Basketball", icon: teamLogoPlaceholder("Basketball", 20), count: 97, href: "#", id: "basketball" },
  { name: "Tennis", icon: teamLogoPlaceholder("Tennis racket", 20), count: 279, href: "#", id: "tennis" },
  { name: "Ice Hockey", icon: teamLogoPlaceholder("Ice Hockey puck", 20), count: 10, href: "#", id: "ice-hockey" },
  { name: "Chess", icon: teamLogoPlaceholder("Chess piece", 20), count: 7, href: "#", id: "chess" },
  { name: "Formula 1", icon: teamLogoPlaceholder("F1 car", 20), count: 3, href: "#", id: "formula1" },
  { name: "Squash", icon: teamLogoPlaceholder("Squash racket", 20), count: 8, href: "#", id: "squash" },
  { name: "Lacrosse", icon: teamLogoPlaceholder("Lacrosse stick", 20), count: 2, href: "#", id: "lacrosse" },
  { name: "Nascar", icon: teamLogoPlaceholder("Nascar car", 20), count: 4, href: "#", id: "nascar" },
  { name: "Rally", icon: teamLogoPlaceholder("Rally car", 20), count: 1, href: "#", id: "rally" },
  { name: "Indy Racing", icon: teamLogoPlaceholder("Indy car", 20), count: 1, href: "#", id: "indy-racing" },
  { name: "Speedway", icon: teamLogoPlaceholder("Speedway bike", 20), count: 1, href: "#", id: "speedway" },
  { name: "Kabaddi", icon: teamLogoPlaceholder("Kabaddi player", 20), count: 1, href: "#", id: "kabaddi" },
  {
    name: "Motorcycle Racing",
    icon: teamLogoPlaceholder("Motorcycle", 20),
    count: 2,
    href: "#",
    id: "motorcycle-racing",
  },
  {
    name: "eCricket: Super Over",
    icon: teamLogoPlaceholder("Cricket bat", 20),
    count: 4,
    href: "#",
    id: "ecricket-super-over",
  },
  {
    name: "eCricket: X-Battle Bats",
    icon: teamLogoPlaceholder("Cricket ball", 20),
    count: 5,
    href: "#",
    id: "ecricket-xbattle",
  },
  { name: "eVaquejada", icon: teamLogoPlaceholder("Bull", 20), count: 8, href: "#", id: "evaquejada" },
]

// New data for eSports categories
const esportsListData = [
  {
    name: "Esports Hub",
    icon: <Headphones className="w-4 h-4 text-gray-400 group-hover:text-yellow-400" />,
    count: 145,
    href: "#",
    id: "esports-hub",
  },
  {
    name: "Counter-Strike",
    icon: <MousePointer className="w-4 h-4 text-gray-400 group-hover:text-yellow-400" />,
    count: 25,
    href: "#",
    id: "counter-strike",
  },
  {
    name: "Valorant",
    icon: <Shield className="w-4 h-4 text-gray-400 group-hover:text-yellow-400" />,
    count: 13,
    href: "#",
    id: "valorant",
  },
  {
    name: "Dota 2",
    icon: <Swords className="w-4 h-4 text-gray-400 group-hover:text-yellow-400" />,
    count: 17,
    href: "#",
    id: "dota2",
  },
  {
    name: "League of Legends",
    icon: <Gamepad2 className="w-4 h-4 text-gray-400 group-hover:text-yellow-400" />,
    count: 17,
    href: "#",
    id: "lol",
  },
  {
    name: "King of Glory",
    icon: <Crown className="w-4 h-4 text-gray-400 group-hover:text-yellow-400" />,
    count: 6,
    href: "#",
    id: "king-of-glory",
  },
  {
    name: "StarCraft 2",
    icon: <Cpu className="w-4 h-4 text-gray-400 group-hover:text-yellow-400" />,
    count: 4,
    href: "#",
    id: "starcraft2",
  },
]

const highlightedMatchesData = [
  {
    id: "hl1",
    league: "England · Premier League",
    status: "45' 2nd half",
    isLive: true,
    teamA: { name: "Man. United", logo: teamLogoPlaceholder("Man United", 32), score: 2 },
    teamB: { name: "Arsenal FC", logo: teamLogoPlaceholder("Arsenal", 32), score: 0 },
    odds: { "Over 3.5": 1.95, "Under 3.5": 1.95, "Arsenal FC Win": 1.75 },
  },
  {
    id: "hl2",
    league: "Spain · La Liga",
    time: "Today, 17:01",
    isLive: false,
    teamA: { name: "Sevilla FC", logo: teamLogoPlaceholder("Sevilla", 32) },
    teamB: { name: "Valencia CF", logo: teamLogoPlaceholder("Valencia", 32) },
    odds: { "Sevilla FC Win": 1.0, Draw: 1.85, "Valencia CF Win": 3.4, "2": 3.5 },
  },
  {
    id: "hl3",
    league: "Italy · Serie A",
    time: "Today, 17:04",
    isLive: false,
    teamA: { name: "Fiorentina", logo: teamLogoPlaceholder("Fiorentina", 32) },
    teamB: { name: "Roma", logo: teamLogoPlaceholder("Roma", 32) },
    odds: { "Fiorentina Win": 1.0, Draw: 5.1, "Roma Win": 3.5, "2": 1.55 },
  },
  {
    id: "hl4",
    league: "International · Champions League",
    time: "Today, 17:22",
    isLive: false,
    teamA: { name: "FC Barcelona", logo: teamLogoPlaceholder("Barcelona", 32) },
    teamB: { name: "Bayern", logo: teamLogoPlaceholder("Bayern Munich", 32) },
    odds: { "FC Barcelona Win": 1.0, Draw: 2.4, "Bayern Win": 3.35, "2": 2.55 },
  },
]

const popularSportsTabsData = [
  { id: "soccer", name: "Soccer", icon: teamLogoPlaceholder("Soccer ball", 18) },
  { id: "tennis", name: "Tennis", icon: teamLogoPlaceholder("Tennis racket", 18) },
  { id: "basketball", name: "Basketball", icon: teamLogoPlaceholder("Basketball", 18) },
  { id: "ice-hockey", name: "Ice Hockey", icon: teamLogoPlaceholder("Ice Hockey puck", 18) },
  { id: "volleyball", name: "Volleyball", icon: teamLogoPlaceholder("Volleyball", 18) },
  { id: "counter-strike", name: "Counter-Strike", icon: teamLogoPlaceholder("CSGO", 18) },
  { id: "mixed-martial-arts", name: "Mixed Martial Arts", icon: teamLogoPlaceholder("MMA glove", 18) },
  { id: "table-tennis", name: "Table Tennis", icon: teamLogoPlaceholder("Table Tennis racket", 18) },
  { id: "fifa", name: "FIFA", icon: teamLogoPlaceholder("FIFA game controller", 18) },
  { id: "handball", name: "Handball", icon: teamLogoPlaceholder("Handball", 18) },
]

const initialBetSlipItems: BetSlipItem[] = []

export default function SportPage() {
  const [selectedSportId, setSelectedSportId] = useState<string>(sportsListData[0]?.id || "soccer")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentBetSlipItems, setCurrentBetSlipItems] = useState<BetSlipItem[]>(initialBetSlipItems)
  const [activeMainContentTab, setActiveMainContentTab] = useState("highlights")
  const [activeSportsEsportsToggle, setActiveSportsEsportsToggle] = useState("sports")
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false)
  const [activeBetSlipTab, setActiveBetSlipTab] = useState<"single" | "combo" | "system">("single")

  // Get balance and placeBets function from BettingContext
  const { balance, placeBets } = useBetting()

  const pathname = usePathname()

  const addBetToSlip = (bet: Omit<BetSlipItem, "id" | "stake">) => {
    setCurrentBetSlipItems((prev) => {
      const existingBet = prev.find(
        (item) => item.eventName === bet.eventName && item.market === bet.market && item.selection === bet.selection,
      )
      if (existingBet) {
        const newBet: BetSlipItem = {
          ...bet,
          id: `bet-${Date.now()}-${Math.random()}`,
          stake: 10,
        }
        return [...prev, newBet]
      }
      const newBet: BetSlipItem = {
        ...bet,
        id: `bet-${Date.now()}-${Math.random()}`,
        stake: 10,
      }
      return [...prev, newBet]
    })
    setIsBetSlipOpen(true)
  }

  const removeBetFromSlip = (betId: string) => {
    setCurrentBetSlipItems((prev) => prev.filter((item) => item.id !== betId))
  }

  const updateBetStake = (betId: string, newStake: number) => {
    setCurrentBetSlipItems((prev) =>
      prev.map((item) => (item.id === betId ? { ...item, stake: Math.max(0, newStake) } : item)),
    )
  }

  const setStakeForAllOrLast = (stakeValue: number) => {
    if (currentBetSlipItems.length === 0) return
    if (activeBetSlipTab === "single" && currentBetSlipItems.length > 0) {
      const lastBetId = currentBetSlipItems[currentBetSlipItems.length - 1].id
      updateBetStake(lastBetId, stakeValue)
    } else {
      const lastBetId = currentBetSlipItems[currentBetSlipItems.length - 1].id
      updateBetStake(lastBetId, stakeValue)
    }
  }

  const clearAllBets = () => {
    setCurrentBetSlipItems([])
  }

  const handlePlaceBet = () => {
    if (currentBetSlipItems.length === 0) {
      console.log("Bet slip is empty. Add selections to place a bet.")
      return
    }

    // Use the placeBets function from BettingContext
    const result = placeBets(currentBetSlipItems)

    if (result.success) {
      alert(result.message)
      clearAllBets()
      setIsBetSlipOpen(false)
    } else {
      alert(result.message)
    }
  }

  const totalStake = currentBetSlipItems.reduce((sum, item) => sum + item.stake, 0)
  const potentialWinnings = currentBetSlipItems.reduce((sum, item) => sum + item.stake * item.odds, 0)

  const DesktopSportSidebar = () => (
    <aside className="w-60 bg-[#1a1b2e] p-0 fixed top-0 left-0 h-full z-40 flex flex-col text-sm">
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
            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
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
          <Button
            variant="ghost"
            onClick={() => setActiveSportsEsportsToggle("sports")}
            className={`flex-1 rounded-md py-1.5 text-xs h-auto ${activeSportsEsportsToggle === "sports" ? "bg-yellow-400 text-black" : "bg-transparent text-gray-400 hover:bg-gray-700/50"}`}
          >
            Sports
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveSportsEsportsToggle("esports")}
            className={`flex-1 rounded-md py-1.5 text-xs h-auto ${activeSportsEsportsToggle === "esports" ? "bg-yellow-400 text-black" : "bg-transparent text-gray-400 hover:bg-gray-700/50"}`}
          >
            Esports
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-yellow-400 ml-1">
            <BarChartBig className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-1">
          {activeSportsEsportsToggle === "sports"
            ? sportsListData.map((sport) => (
                <Button
                  key={sport.id}
                  variant="ghost"
                  onClick={() => setSelectedSportId(sport.id)}
                  className={`flex items-center justify-between p-2 rounded hover:bg-gray-700/50 transition-colors group w-full text-left ${
                    selectedSportId === sport.id
                      ? "bg-yellow-400/20 text-yellow-400 border-l-2 border-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Image src={(sport.icon as string) || "/placeholder.svg"} alt={sport.name} width={16} height={16} />
                    <span className={`text-xs ${selectedSportId === sport.id ? "font-semibold" : ""}`}>
                      {sport.name}
                    </span>
                    {sport.isHot && <Flame className="w-3 h-3 text-red-500" />}
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Badge
                      variant="secondary"
                      className={`text-[10px] px-1.5 py-0.5 ${selectedSportId === sport.id ? "bg-yellow-400/30 text-yellow-200" : "bg-gray-700 text-gray-400"}`}
                    >
                      {sport.count}
                    </Badge>
                    <ChevronDown className="w-3 h-3 text-gray-500 transform rotate-[-90deg]" />
                  </div>
                </Button>
              ))
            : esportsListData.map((esport) => (
                <Button
                  key={esport.id}
                  variant="ghost"
                  onClick={() => setSelectedSportId(esport.id)}
                  className={`flex items-center justify-between p-2 rounded hover:bg-gray-700/50 transition-colors group w-full text-left ${
                    selectedSportId === esport.id
                      ? "bg-yellow-400/20 text-yellow-400 border-l-2 border-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {typeof esport.icon === "string" ? (
                      <Image src={esport.icon || "/placeholder.svg"} alt={esport.name} width={16} height={16} />
                    ) : (
                      React.cloneElement(esport.icon as React.ReactElement, {
                        className: `w-4 h-4 ${selectedSportId === esport.id ? "text-yellow-400" : "text-gray-400 group-hover:text-yellow-400"}`,
                      })
                    )}
                    <span className={`text-xs ${selectedSportId === esport.id ? "font-semibold" : ""}`}>
                      {esport.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Badge
                      variant="secondary"
                      className={`text-[10px] px-1.5 py-0.5 ${selectedSportId === esport.id ? "bg-yellow-400/30 text-yellow-200" : "bg-gray-700 text-gray-400"}`}
                    >
                      {esport.count}
                    </Badge>
                    <ChevronDown className="w-3 h-3 text-gray-500 transform rotate-[-90deg]" />
                  </div>
                </Button>
              ))}
        </div>
      </ScrollArea>
    </aside>
  )

  const MobileSportSidebar = () => (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[#1a1b2e] p-0 z-50 flex flex-col text-sm">
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
            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
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
        <div className="p-3 flex items-center border-t border-b border-gray-700">
          <Button
            variant="ghost"
            onClick={() => {
              setActiveSportsEsportsToggle("sports")
              setIsMobileMenuOpen(false)
            }}
            className={`flex-1 rounded-md py-1.5 text-xs h-auto ${activeSportsEsportsToggle === "sports" ? "bg-yellow-400 text-black" : "bg-transparent text-gray-400 hover:bg-gray-700/50"}`}
          >
            Sports
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setActiveSportsEsportsToggle("esports")
              setIsMobileMenuOpen(false)
            }}
            className={`flex-1 rounded-md py-1.5 text-xs h-auto ${activeSportsEsportsToggle === "esports" ? "bg-yellow-400 text-black" : "bg-transparent text-gray-400 hover:bg-gray-700/50"}`}
          >
            Esports
          </Button>
        </div>
        <div className="p-1">
          {activeSportsEsportsToggle === "sports"
            ? sportsListData.map((sport) => (
                <Button
                  key={sport.id}
                  variant="ghost"
                  onClick={() => {
                    setSelectedSportId(sport.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center justify-between p-2 rounded hover:bg-gray-700/50 transition-colors group w-full text-left ${
                    selectedSportId === sport.id
                      ? "bg-yellow-400/20 text-yellow-400 border-l-2 border-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Image src={(sport.icon as string) || "/placeholder.svg"} alt={sport.name} width={16} height={16} />
                    <span className={`text-xs ${selectedSportId === sport.id ? "font-semibold" : ""}`}>
                      {sport.name}
                    </span>
                    {sport.isHot && <Flame className="w-3 h-3 text-red-500" />}
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Badge
                      variant="secondary"
                      className={`text-[10px] px-1.5 py-0.5 ${selectedSportId === sport.id ? "bg-yellow-400/30 text-yellow-200" : "bg-gray-700 text-gray-400"}`}
                    >
                      {sport.count}
                    </Badge>
                    <ChevronDown className="w-3 h-3 text-gray-500 transform rotate-[-90deg]" />
                  </div>
                </Button>
              ))
            : esportsListData.map((esport) => (
                <Button
                  key={esport.id}
                  variant="ghost"
                  onClick={() => {
                    setSelectedSportId(esport.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center justify-between p-2 rounded hover:bg-gray-700/50 transition-colors group w-full text-left ${
                    selectedSportId === esport.id
                      ? "bg-yellow-400/20 text-yellow-400 border-l-2 border-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {typeof esport.icon === "string" ? (
                      <Image src={esport.icon || "/placeholder.svg"} alt={esport.name} width={16} height={16} />
                    ) : (
                      React.cloneElement(esport.icon as React.ReactElement, {
                        className: `w-4 h-4 ${selectedSportId === esport.id ? "text-yellow-400" : "text-gray-400 group-hover:text-yellow-400"}`,
                      })
                    )}
                    <span className={`text-xs ${selectedSportId === esport.id ? "font-semibold" : ""}`}>
                      {esport.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Badge
                      variant="secondary"
                      className={`text-[10px] px-1.5 py-0.5 ${selectedSportId === esport.id ? "bg-yellow-400/30 text-yellow-200" : "bg-gray-700 text-gray-400"}`}
                    >
                      {esport.count}
                    </Badge>
                    <ChevronDown className="w-3 h-3 text-gray-500 transform rotate-[-90deg]" />
                  </div>
                </Button>
              ))}
        </div>
      </ScrollArea>
    </aside>
  )

  const HighlightMatchCard = ({ match }: { match: (typeof highlightedMatchesData)[0] }) => (
    <div className="bg-[#2a2b3e] rounded-lg p-3 w-[240px] sm:w-[260px] shrink-0 space-y-2 text-xs">
      <div className="flex items-center justify-between text-gray-400">
        <span className="truncate max-w-[150px]">{match.league}</span>
        {match.isLive ? (
          <Badge className="bg-red-600/20 text-red-400 border border-red-600/50 text-[10px] px-1.5 py-0.5">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1 animate-pulse"></span>
            {match.status}
          </Badge>
        ) : (
          <span className="text-[10px]">{match.time}</span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image src={match.teamA.logo || "/placeholder.svg"} alt={match.teamA.name} width={20} height={20} />
          <span className="text-white font-medium truncate">{match.teamA.name}</span>
        </div>
        {match.teamA.score !== undefined && <span className="text-yellow-400 font-bold">{match.teamA.score}</span>}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image src={match.teamB.logo || "/placeholder.svg"} alt={match.teamB.name} width={20} height={20} />
          <span className="text-white font-medium truncate">{match.teamB.name}</span>
        </div>
        {match.teamB.score !== undefined && <span className="text-yellow-400 font-bold">{match.teamB.score}</span>}
      </div>
      <div className="grid grid-cols-3 gap-1 pt-1">
        {Object.entries(match.odds).map(([selection, oddValue]) => (
          <Button
            key={selection}
            variant="outline"
            className="bg-[#3b3e46] border-transparent hover:bg-gray-600 text-gray-300 text-[11px] h-7 px-1"
            onClick={() =>
              addBetToSlip({
                eventName: `${match.teamA.name} vs ${match.teamB.name}`,
                market: "Highlight Odds",
                selection: selection,
                odds: oddValue,
                teamA: match.teamA.name,
                teamB: match.teamB.name,
                league: match.league,
              })
            }
          >
            {oddValue.toFixed(2)}
          </Button>
        ))}
      </div>
    </div>
  )

  interface EventData {
    id: string
    sportId: string
    league: string
    time: string
    isLive: boolean
    hasVideo?: boolean
    teamA: { name: string; flag?: string; logo?: string }
    teamB: { name: string; flag?: string; logo?: string }
    isFavorite?: boolean
    odds: {
      [market: string]: { [selection: string]: number }
    }
    scoreA?: number
    scoreB?: number
    period?: string
  }

  const sampleEventsData: EventData[] = [
    {
      id: "evt-soccer-1",
      sportId: "soccer",
      league: "International · UEFA Nations League",
      time: "Today, 21:00",
      isLive: true,
      hasVideo: true,
      teamA: { name: "Germany", flag: flagPlaceholder("DE") },
      teamB: { name: "Portugal", flag: flagPlaceholder("PT") },
      isFavorite: true,
      odds: {
        "1x2": { "1": 1.9, Draw: 3.75, "2": 3.8 },
        toQualify: { "1": 1.48, "2": 2.6 },
        doubleChance: { "1X": 1.27, "12": 1.26, X2: 1.89 },
        total: { "Over 2.5": 1.58, "Under 2.5": 2.38 },
      },
      scoreA: 1,
      scoreB: 0,
      period: "HT",
    },
    {
      id: "evt-soccer-2",
      sportId: "soccer",
      league: "International · World Cup Qualification, AFC",
      time: "Tomorrow, 13:10",
      isLive: false,
      hasVideo: true,
      teamA: { name: "Australia", flag: flagPlaceholder("AU") },
      teamB: { name: "Japan", flag: flagPlaceholder("JP") },
      isFavorite: true,
      odds: {
        "1x2": { "1": 2.6, Draw: 3.0, "2": 2.9 },
        doubleChance: { "1X": 1.4, "12": 1.36, X2: 1.49 },
        total: { "Over 2.5": 2.3, "Under 2.5": 1.62 },
      },
    },
    {
      id: "evt-basketball-1",
      sportId: "basketball",
      league: "USA · NBA",
      time: "Today, 20:30",
      isLive: false,
      teamA: { name: "LA Lakers", logo: teamLogoPlaceholder("LA Lakers") },
      teamB: { name: "Boston Celtics", logo: teamLogoPlaceholder("Boston Celtics") },
      odds: {
        "1x2": { "1": 1.85, "2": 1.95 },
        total: { "Over 215.5": 1.9, "Under 215.5": 1.9 },
      },
    },
    {
      id: "evt-tennis-1",
      sportId: "tennis",
      league: "ATP · Wimbledon",
      time: "Tomorrow, 14:00",
      isLive: false,
      teamA: { name: "N. Djokovic", flag: flagPlaceholder("RS") },
      teamB: { name: "R. Nadal", flag: flagPlaceholder("ES") },
      odds: {
        "1x2": { "1": 1.5, "2": 2.5 },
        total: { "Over 22.5": 1.85, "Under 22.5": 1.85 },
      },
    },
  ]

  const filteredEvents = useMemo(() => {
    if (!selectedSportId) return sampleEventsData
    return sampleEventsData.filter((event) => event.sportId === selectedSportId)
  }, [selectedSportId])

  const currentSportDetails = useMemo(() => {
    const allSports = [...sportsListData, ...esportsListData]
    return allSports.find((sport) => sport.id === selectedSportId)
  }, [selectedSportId])
  const mainContentTitle = currentSportDetails ? currentSportDetails.name : "Popular"

  const PopularEventsTable = ({ events }: { events: EventData[] }) => {
    if (events.length === 0) {
      return <p className="text-center text-gray-500 py-8">No events found for the selected sport.</p>
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-xs">
          <thead className="text-gray-500 uppercase">
            <tr>
              <th className="p-2 text-left font-normal">Match</th>
              <th className="p-2 text-center font-normal">1x2</th>
              <th className="p-2 text-center font-normal">To qualify</th>
              <th className="p-2 text-center font-normal">Double chance</th>
              <th className="p-2 text-center font-normal">Total</th>
              <th className="p-2 text-center font-normal"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-700/30">
                <td className="p-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-gray-400 text-[11px]">{event.league}</div>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <Image
                          src={event.teamA.logo || event.teamA.flag || "/placeholder.svg"}
                          alt={event.teamA.name}
                          width={16}
                          height={16}
                          className={event.teamA.logo ? "" : "rounded-sm"}
                        />
                        <span className="text-white">{event.teamA.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <Image
                          src={event.teamB.logo || event.teamB.flag || "/placeholder.svg"}
                          alt={event.teamB.name}
                          width={16}
                          height={16}
                          className={event.teamB.logo ? "" : "rounded-sm"}
                        />
                        <span className="text-white">{event.teamB.name}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-gray-400 text-[11px]">
                      <span>{event.time}</span>
                      <div className="flex items-center space-x-1 mt-1">
                        {event.isLive && (
                          <Badge className="bg-red-600/20 text-red-400 border border-red-600/50 text-[9px] px-1 py-0">
                            LIVE
                          </Badge>
                        )}
                        {event.hasVideo && <ListVideo className="w-3 h-3 text-blue-400" />}
                        <Star
                          className={`w-3 h-3 ${event.isFavorite ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-2.5 space-x-1 text-center">
                  {Object.entries(event.odds["1x2"] || {}).map(([sel, odd]) => (
                    <Button
                      key={`1x2-${sel}`}
                      variant="outline"
                      className="bg-[#2a2b3e] border-transparent hover:bg-gray-600 text-gray-300 h-8 w-12 text-[11px] px-0"
                      onClick={() =>
                        addBetToSlip({
                          eventName: `${event.teamA.name} vs ${event.teamB.name}`,
                          market: "1x2",
                          selection: sel === "1" ? event.teamA.name : sel === "2" ? event.teamB.name : "Draw",
                          odds: odd,
                          teamA: event.teamA.name,
                          teamB: event.teamB.name,
                          league: event.league,
                        })
                      }
                    >
                      {odd.toFixed(2)}
                    </Button>
                  ))}
                </td>
                <td className="p-2.5 space-x-1 text-center">
                  {event.odds.toQualify ? (
                    Object.entries(event.odds.toQualify).map(([sel, odd]) => (
                      <Button
                        key={`toQualify-${sel}`}
                        variant="outline"
                        className="bg-[#2a2b3e] border-transparent hover:bg-gray-600 text-gray-300 h-8 w-12 text-[11px] px-0"
                        onClick={() =>
                          addBetToSlip({
                            eventName: `${event.teamA.name} vs ${event.teamB.name}`,
                            market: "To Qualify",
                            selection: sel === "1" ? event.teamA.name : event.teamB.name,
                            odds: odd,
                            teamA: event.teamA.name,
                            teamB: event.teamB.name,
                            league: event.league,
                          })
                        }
                      >
                        {odd.toFixed(2)}
                      </Button>
                    ))
                  ) : (
                    <span className="text-gray-600">-</span>
                  )}
                </td>
                <td className="p-2.5 space-x-1 text-center">
                  {Object.entries(event.odds.doubleChance || {}).map(([sel, odd]) => (
                    <Button
                      key={`doubleChance-${sel}`}
                      variant="outline"
                      className="bg-[#2a2b3e] border-transparent hover:bg-gray-600 text-gray-300 h-8 w-12 text-[11px] px-0"
                      onClick={() =>
                        addBetToSlip({
                          eventName: `${event.teamA.name} vs ${event.teamB.name}`,
                          market: "Double Chance",
                          selection: sel,
                          odds: odd,
                          teamA: event.teamA.name,
                          teamB: event.teamB.name,
                          league: event.league,
                        })
                      }
                    >
                      {odd.toFixed(2)}
                    </Button>
                  ))}
                </td>
                <td className="p-2.5 space-x-1 text-center">
                  {Object.entries(event.odds.total || {}).map(([sel, odd]) => (
                    <Button
                      key={`total-${sel}`}
                      variant="outline"
                      className="bg-[#2a2b3e] border-transparent hover:bg-gray-600 text-gray-300 h-8 w-12 text-[11px] px-0"
                      onClick={() =>
                        addBetToSlip({
                          eventName: `${event.teamA.name} vs ${event.teamB.name}`,
                          market: "Total",
                          selection: sel,
                          odds: odd,
                          teamA: event.teamA.name,
                          teamB: event.teamB.name,
                          league: event.league,
                        })
                      }
                    >
                      {odd.toFixed(2)}
                    </Button>
                  ))}
                </td>
                <td className="p-2.5 text-center">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 text-[10px]">
                    +123
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const BetSlipPanel = () => (
    <div className="fixed bottom-[70px] right-4 z-50 w-[330px] bg-[#24272c] rounded-lg shadow-2xl text-white flex flex-col max-h-[calc(100vh-100px)]">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Ticket className="w-5 h-5 text-yellow-400" />
          <h3 className="font-semibold text-sm">BETSLIP</h3>
          {currentBetSlipItems.length > 0 && (
            <Badge className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {currentBetSlipItems.length}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsBetSlipOpen(false)}
          className="text-gray-400 hover:text-white w-7 h-7"
        >
          {isBetSlipOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex p-1 bg-[#1a1b2e]">
        {(["single", "combo", "system"] as const).map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            onClick={() => setActiveBetSlipTab(tab)}
            className={`flex-1 text-xs h-8 rounded-sm ${activeBetSlipTab === tab ? "bg-[#2f3237] text-white" : "text-gray-400 hover:bg-[#2f3237]/70"}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white w-8 h-8 ml-1">
          <BookOpen className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white w-8 h-8">
          <GiftIcon className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-grow p-3 space-y-2">
        {currentBetSlipItems.length === 0 ? (
          <p className="text-center text-gray-500 text-xs py-4">
            Your bet slip is empty. Click on odds to add selections.
          </p>
        ) : (
          currentBetSlipItems.map((item) => (
            <div key={item.id} className="bg-[#2f3237] p-2.5 rounded text-xs space-y-1.5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-[10px] truncate max-w-[200px]">{item.league || item.eventName}</p>
                  <p className="font-medium text-white truncate max-w-[200px]">{item.selection}</p>
                  <p className="text-gray-400 text-[10px]">{item.market}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBetFromSlip(item.id)}
                  className="text-gray-500 hover:text-red-500 w-5 h-5 shrink-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 font-semibold">@{item.odds.toFixed(2)}</span>
                <div className="flex items-center bg-[#1a1b2e] rounded">
                  <Input
                    type="number"
                    value={item.stake}
                    onChange={(e) => updateBetStake(item.id, Number.parseFloat(e.target.value) || 0)}
                    className="h-7 w-16 text-xs bg-transparent border-0 text-center text-white focus:ring-0 px-1"
                    placeholder="Stake"
                  />
                  <span className="text-gray-400 px-1.5 text-[10px]">€</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-yellow-400 hover:text-yellow-300 h-7 px-1.5 text-[10px]"
                  >
                    MAX
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </ScrollArea>

      {currentBetSlipItems.length > 0 && (
        <div className="p-3 border-t border-gray-700 space-y-2">
          <div className="flex space-x-1">
            {[10, 20, 50, 100].map((val) => (
              <Button
                key={val}
                variant="outline"
                onClick={() => setStakeForAllOrLast(val)}
                className="flex-1 bg-[#2f3237] border-transparent text-gray-300 hover:bg-gray-600 h-7 text-xs"
              >
                {val}
              </Button>
            ))}
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Total Bet:</span>
            <span className="text-white font-medium">{totalStake.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Potential Win:</span>
            <span className="text-yellow-400 font-semibold">{potentialWinnings.toFixed(2)} €</span>
          </div>
          <Button
            onClick={handlePlaceBet}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-sm h-9"
          >
            Place Bet
          </Button>
          <div className="flex items-center justify-between mt-1">
            <Button variant="ghost" onClick={clearAllBets} className="text-gray-400 hover:text-red-500 p-1 h-auto">
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              <span className="text-xs">Clear All</span>
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white p-1 h-auto">
              <Settings2 className="w-3.5 h-3.5 mr-1" />
              <span className="text-xs">Odds Settings</span>
            </Button>
          </div>
        </div>
      )}
      <div className="p-2 bg-[#1a1b2e] border-t border-gray-700 flex items-center justify-center">
        <Image
          src={userAvatarPlaceholder(24) || "/placeholder.svg"}
          alt="User Avatar"
          width={24}
          height={24}
          className="rounded-full"
        />
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-[#0f101c] text-gray-300">
      <div className="hidden md:block">
        <DesktopSportSidebar />
      </div>

      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
          <MobileSportSidebar />
        </>
      )}

      <div className="flex-1 md:ml-60 flex flex-col">
        <header className="sticky top-0 z-30 bg-[#1a1b2e]/90 backdrop-blur-sm shadow-sm h-16 flex items-center px-4">
          <div className="hidden md:flex flex-1 items-center justify-between">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                className={`${pathname !== "/sport" ? "bg-yellow-400 text-black hover:bg-yellow-500" : "text-gray-400 hover:text-white"} px-3 py-1.5 rounded-md text-sm font-semibold h-auto`}
                asChild
              >
                <Link href="/">
                  <ShieldCheck className="w-4 h-4 mr-1.5" /> Casino
                </Link>
              </Button>
              <Button
                variant="ghost"
                className={`${pathname === "/sport" ? "bg-yellow-400 text-black hover:bg-yellow-500" : "text-gray-400 hover:text-white"} px-3 py-1.5 rounded-md text-sm font-semibold h-auto`}
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

        <div className="md:hidden flex items-center justify-center space-x-2 p-2 bg-[#0f101c] border-b border-gray-700">
          <Button
            variant="ghost"
            className={`flex-1 ${pathname !== "/sport" ? "bg-yellow-400 text-black hover:bg-yellow-500" : "text-gray-400 bg-[#2a2b3e] hover:text-white"} px-4 py-2 rounded-full text-sm font-semibold`}
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

        <main className="flex-grow p-3 sm:p-4 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white px-1 pt-1">{mainContentTitle}</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => setActiveMainContentTab("highlights")}
              className={`px-4 py-2 text-xs font-semibold rounded-md h-auto ${activeMainContentTab === "highlights" ? "bg-yellow-400 text-black" : "bg-[#2a2b3e] text-gray-300 hover:bg-gray-600"}`}
            >
              <BarChartBig className="w-3.5 h-3.5 mr-1.5" /> HIGHLIGHTS
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveMainContentTab("event-builder")}
              className={`px-4 py-2 text-xs font-semibold rounded-md h-auto relative ${activeMainContentTab === "event-builder" ? "bg-yellow-400 text-black" : "bg-[#2a2b3e] text-gray-300 hover:bg-gray-600"}`}
            >
              <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> EVENT BUILDER
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
            </Button>
          </div>

          {activeMainContentTab === "highlights" && (
            <ScrollArea className="pb-3 -mb-3">
              <div className="flex space-x-3">
                {highlightedMatchesData.map((match) => (
                  <HighlightMatchCard key={match.id} match={match} />
                ))}
              </div>
            </ScrollArea>
          )}

          {activeMainContentTab === "event-builder" && (
            <div className="bg-[#1a1b2e] p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Event Builder</h3>
              <p className="text-gray-400">Event builder functionality will be here.</p>
            </div>
          )}

          <section className="bg-[#1a1b2e] p-0 rounded-lg">
            <div className="flex items-center space-x-2 p-3 border-b border-gray-700/50">
              <Crown className="w-5 h-5 text-yellow-400" />
              <h2 className="text-base font-semibold text-white">Popular Matches</h2>
            </div>
            <ScrollArea className="px-3 pt-3 pb-1 -mb-1">
              <div className="flex space-x-1 mb-2">
                {popularSportsTabsData.map((tab) => (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    onClick={() => setSelectedSportId(tab.id)}
                    className={`px-3 py-1.5 h-auto text-xs rounded-full flex items-center space-x-1.5
          ${selectedSportId === tab.id ? "bg-yellow-400 text-black hover:bg-yellow-500" : "bg-[#2a2b3e] text-gray-300 hover:bg-gray-600"}`}
                  >
                    <Image src={tab.icon || "/placeholder.svg"} alt={tab.name} width={14} height={14} />
                    <span>{tab.name}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
            <PopularEventsTable events={filteredEvents} />
          </section>
        </main>

        <footer className="bg-[#1a1b2e] text-gray-500 p-4 text-center text-xs mt-auto border-t border-gray-700/50">
          Sportsbook content. &copy; 2018-2025 All Rights Reserved.
        </footer>
      </div>

      {!isBetSlipOpen && (
        <Button
          onClick={() => setIsBetSlipOpen(true)}
          className="fixed bottom-4 right-4 z-40 bg-[#2f3237] hover:bg-yellow-500 text-white hover:text-black rounded-full shadow-lg h-12 px-3.5"
        >
          <Ticket className="w-5 h-5" />
          <span className="font-semibold text-xs ml-1.5 mr-1">BETSLIP</span>
          {currentBetSlipItems.length > 0 && (
            <Badge variant="destructive" className="bg-red-600 text-white text-[10px] px-1.5 h-4 leading-tight">
              {currentBetSlipItems.length}
            </Badge>
          )}
          <Image
            src={userAvatarPlaceholder(28) || "/placeholder.svg"}
            alt="User"
            width={28}
            height={28}
            className="ml-2 rounded-full border-2 border-black/20"
          />
        </Button>
      )}

      {isBetSlipOpen && <BetSlipPanel />}
    </div>
  )
}
