"use client"

import { useState, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronRight,
  Gift,
  Globe,
  Home,
  Menu,
  MessageCircle,
  Percent,
  PlayCircle,
  Search,
  ShieldCheck,
  Star,
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
import { useBetting } from "@/contexts/betting-context"

// Re-using mainNavItems from app/page.tsx for layout consistency
const mainNavItems = [
  { name: "Home", icon: <Home className="w-5 h-5" />, href: "/?tab=casino" },
  { name: "Promotions", icon: <Percent className="w-5 h-5" />, href: "/promotions" },
  { name: "Casino Games", icon: <Dice5 className="w-5 h-5" />, href: "/?tab=casino-games" },
  { name: "Live Casino", icon: <PlayCircle className="w-5 h-5" />, href: "/?tab=live-casino" },
  { name: "Sport", icon: <Trophy className="w-5 h-5" />, href: "/sport" },
  { name: "Virtual Games", icon: <Gamepad2 className="w-5 h-5" />, href: "/?tab=virtual-games" },
  { name: "Drops & Wins", icon: <Gift className="w-5 h-5" />, href: "/drops-and-wins" },
]

const GAME_DEMO_URLS: { [key: string]: string } = {
  "Volcano Rising":
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1004998&demo=1&lang=en&exiturl=https://rollblock.io",
  "Diamond Explosion 7s":
    "https://demo.rubyplay.com/launcher?gamename=rp_72&operator=nux_rollblock&mode=demo&lang=en&currency=USD",
  "Rush Fever 7s":
    "https://demo.rubyplay.com/launcher?gamename=rp_73&operator=nux_rollblock&mode=demo&lang=en&currency=USD",
  "Rush Fever 7s Deluxe":
    "https://fungamess.games/api/v1/RollBlock/start?userId=1243305&gameId=1021271&demo=1&lang=en&exiturl=https://rollblock.io",
  "Fruit Invaders":
    "https://fungamess.games/api/v1/RollBlock/start?userId=1243305&gameId=1021271&demo=1&lang=en&exiturl=https://rollblock.io",
  JetX: "https://eu-server.ssgportal.com/GameLauncher/Loader.aspx?GameCategory=JetX&GameName=JetX&PortalName=demo&ReturnUrl=https://rollblock.io&Token=DEMO&Lang=en&StopUrl=https://rollblock.io",
  "Moon Guardians":
    "https://demo.amigogaming.cloud/js-frontend/html5/index.html?session=4786C2D198654D759170964E10351D50&sign=7a8b0e2f54fc81cd5dd142e6555ba69f&launch=https%3A%2F%2Fdemo.amigogaming.cloud%2Forganic2%2Fwebsocket%2Flaunch&exit=https%3A%2F%2Fdemo.amigogaming.cloud%2Forganic2%2Fwebsocket%2Fclose%3Fsession%3D4786C2D198654D759170964E10351D50%26sign%3D7a8b0e2f54fc81cd5dd142e6555ba69f%26exit%3Dhttps%253A%252F%252Flaunch.amigogaming.com%252Fsession%252Fback%253Flink%253Dhttps%253A%252F%252Frollblock.io&endpointUri=wss%3A%2F%2Fsdemo.amigogaming.cloud%2Forganic2%2Fwebsocket%2Fendpoint%2F1&resetSettings=true&profile=nofullscreen.xml",
  Spaceman:
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1007025&demo=1&lang=en&exiturl=https://rollblock.io",
  "Hoot Shot the Sheriff":
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1062643&demo=1&lang=en&exiturl=https://rollblock.io",
  "J Mania 3 Buffalo":
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1062640&demo=1&lang=en&exiturl=https://rollblock.io",
  "Vegas Kingmaker 100":
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1062650&demo=1&lang=en&exiturl=https://rollblock.io",
  "Majestic Crown 100":
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1062635&demo=1&lang=en&exiturl=https://rollblock.io",
  "Grand Express Diamond Class":
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1062316&demo=1&lang=en&exiturl=https://rollblock.io",
  "Caishen Gold: Infinity Dragon":
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1062659&demo=1&lang=en&exiturl=https://rollblock.io",
  "Jurassic Survival Bonus":
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1062652&demo=1&lang=en&exiturl=https://rollblock.io",
  "Zeus the Thunderer":
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1004998&demo=1&lang=en&exiturl=https://rollblock.io",
  "Joker's Jewels":
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1000917&demo=1&lang=en&exiturl=https://rollblock.io",
  "Mayan Blaze":
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1021264&demo=1&lang=en&exiturl=https://rollblock.io",
  "Gates of Olympus":
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1000834&demo=1&lang=en&exiturl=https://rollblock.io",
  Roulette: // Added
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1000997&demo=1&lang=en&exiturl=https://rollblock.io",
  BlackJack: // Added - Note: The game title in app/page.tsx is "BlackJack" (capital J)
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1005210&demo=1&lang=en&exiturl=https://rollblock.io",
  Megamoney: // Added
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1005210&demo=1&lang=en&exiturl=https://rollblock.io",
  "Texas Holdem Poker": // Added
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1005210&demo=1&lang=en&exiturl=https://rollblock.io",
  "Bingo Trevo da Sorte": // Added - Note: The game title in app/page.tsx is "Bingo Trevo da Sorte"
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1006117&demo=1&lang=en&exiturl=https://rollblock.io",
  "Virtual Soccer": // Added
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1005927&demo=1&lang=en&exiturl=https://rollblock.io",
  "Virtual Football Pro": // Added - Note: The game title in app/page.tsx is "Virtual Football Pro"
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1005925&demo=1&lang=en&exiturl=https://rollblock.io",
  "Spain League": // Added
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=77793&demo=1&lang=en&exiturl=https://rollblock.io",
  "England League": // Added
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=77791&demo=1&lang=en&exiturl=https://rollblock.io",
  "Instant Football": // Added
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=77793&demo=1&lang=en&exiturl=https://rollblock.io",
  "Instant Greyhounds": // Added
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1016533&demo=1&lang=en&exiturl=https://rollblock.io",
  "Instant Horses": // Added
    "https://fungamess.games/api/v1/RollBlock/start?userId=6&gameId=1016533&demo=1&lang=en&exiturl=https://rollblock.io",
}

function GamePageContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showGame, setShowGame] = useState(false)

  const gameTitle = searchParams.get("title") || "Game Title"
  const gameProvider = searchParams.get("provider") || "Game Provider"

  const isCasinoActive = pathname?.startsWith("/casino") || pathname === "/"

  const handlePlayDemo = () => {
    if (GAME_DEMO_URLS[gameTitle]) {
      setShowGame(true)
    } else {
      alert("Demo for this game is not available yet.")
    }
  }

  const { balance } = useBetting()

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
                <Link href="/?tab=casino">
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
        </header>

        {/* Game Page Main Content */}
        <main className="flex-grow flex flex-col bg-[#0d0e17]">
          {/* Breadcrumbs */}
          <div className="p-4 text-sm text-gray-400 flex items-center">
            <Link href="/?tab=casino" className="hover:text-yellow-400">
              Casino
            </Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span>{gameTitle}</span>
          </div>

          {/* Game Area */}
          <div className="flex-grow flex flex-col items-center justify-center p-4 relative bg-black">
            <div className="w-full max-w-4xl aspect-video bg-[#1f202e] rounded-lg flex items-center justify-center text-gray-500 relative overflow-hidden">
              {showGame && GAME_DEMO_URLS[gameTitle] ? (
                <iframe
                  src={GAME_DEMO_URLS[gameTitle]}
                  title={gameTitle}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="text-center p-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{gameTitle}</h1>
                  <p className="text-sm text-gray-400 mb-6">{gameProvider}</p>
                  <Button
                    variant="outline"
                    className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 text-base font-semibold"
                    onClick={handlePlayDemo}
                  >
                    Play Demo
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="bg-[#1a1b2e] p-3 flex items-center justify-center sm:justify-start sm:px-6">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-sm font-semibold text-white">{gameTitle}</span>
            <span className="text-xs text-gray-400 ml-2">{gameProvider}</span>
          </div>
        </main>
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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading game...</div>}>
      <GamePageContent />
    </Suspense>
  )
}
