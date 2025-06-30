"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, useRef, Suspense } from "react" // Added Suspense
import Image from "next/image"
import Link from "next/link"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Gift,
  Globe,
  Home,
  MessageCircle,
  Percent,
  PlayCircle,
  Search,
  ShieldCheck,
  Star,
  Trophy,
  Gamepad2,
  Crown,
  Contact,
  Dice5,
  LayoutGrid,
  BarChart3,
  X,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import React from "react"
import { useBetting } from "@/contexts/betting-context"
import { SharedHeader } from "@/components/layout/shared-header" // Import SharedHeader

// Standard navigation items
const mainNavItems = [
  { name: "Home", icon: <Home className="w-5 h-5" />, href: "/?tab=casino" },
  { name: "Promotions", icon: <Percent className="w-5 h-5" />, href: "/promotions" },
  { name: "Casino Games", icon: <Dice5 className="w-5 h-5" />, href: "/?tab=casino-games" },
  { name: "Live Casino", icon: <PlayCircle className="w-5 h-5" />, href: "/?tab=live-casino" },
  { name: "Sport", icon: <Trophy className="w-5 h-5" />, href: "/sport" },
  { name: "Virtual Games", icon: <Gamepad2 className="w-5 h-5" />, href: "/?tab=virtual-games" },
  { name: "Drops & Wins", icon: <Gift className="w-5 h-5" />, href: "/drops-and-wins" },
]

// ... (rest of the constants: topCategories, gameImagePlaceholder, liveWins, getBadgeClass, topGames, newGames, liveGames, virtualGames, tableGames, casinoGames, providers, bonuses, footerLinks, paymentIcons, casinoTabItems remain the same as in your provided code)
const topCategories = [
  { name: "New Games", href: "#" },
  { name: "Popular Games", href: "#" },
  { name: "Slots", href: "#" },
  { name: "Table Games", href: "#" },
]

const gameImagePlaceholder = (query: string, width = 200, height = 280) =>
  `/placeholder.svg?width=${width}&height=${height}&query=${encodeURIComponent(query + " game art")}`

const liveWins = [
  {
    title: "Gates of Olympus",
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/drop-n-win-images/oSJvcGGDQJbiU45qlPPiGT5co1Od6SzNC5QDrKYd.webp",
    prize: "125.50",
    currency: "€",
    multiplier: "627x",
  },
  {
    title: "Spaceman",
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/1HqreY2eqYAMyy7m4iAx7SWUFwZZVBEORtk1JhpA.png",
    prize: "90.25",
    currency: "€",
    multiplier: "451x",
  },
  {
    title: "JetX",
    provider: "SmartSoft",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/6n2qPThfQG4seFW2SZVPcnAyifGca3dRVWaw6sh4.png",
    prize: "170.00",
    currency: "€",
    multiplier: "850x",
  },
  {
    title: "Volcano Rising",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/lkrHzbtGluTcMg4X1zrm0uesKzXQTWHuzsj1lJbu.png",
    prize: "110.75",
    currency: "€",
    multiplier: "553x",
  },
  {
    title: "Joker's Jewels",
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/ee5tkEFjtelYQqf2FR8AIEQh5jgvieS4o7bvLJeb.png",
    prize: "88.00",
    currency: "€",
    multiplier: "440x",
  },
  {
    title: "Roulette",
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/dWl9HKzJaSZ3MkbwDfzj4NfJknlKfcsSGUWZ2LCx.png",
    prize: "250.00",
    currency: "€",
    multiplier: "1250x",
  },
  {
    title: "BlackJack",
    provider: "GameArt",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/Seq5N7YXMyOgbXWbzOMjplAVJaGcsu03if1EN1pT.png",
    prize: "190.50",
    currency: "€",
    multiplier: "952x",
  },
  {
    title: "Hoot Shot the Sheriff",
    provider: "HacksawGaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/hDlFtSnFc8NnA2P7L2qhBCLunrTSsL3trR2mxMsR.png",
    prize: "130.00",
    currency: "€",
    multiplier: "650x",
  },
  {
    title: "Mayan Blaze",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/AxwGaFuvsgynXWFBiQU6bomOEvnoLqSjgOhxuwKA.png",
    prize: "70.00",
    currency: "€",
    multiplier: "350x",
  },
]

const getBadgeClass = (tag: string | null | undefined): string => {
  if (!tag) return "bg-gray-500"
  const upperTag = tag.toUpperCase()
  if (upperTag.includes("NEW")) return "bg-green-500"
  if (upperTag === "TOP") return "bg-red-500"
  if (upperTag.includes("FOR YOU")) return "bg-blue-500"
  if (upperTag.includes("TOP GAMES")) return "bg-purple-500"
  if (upperTag.includes("VIRTUAL GAMES")) return "bg-teal-500"
  if (upperTag.includes("TABLE GAMES")) return "bg-orange-500"
  if (upperTag.includes("REELS SLOTS")) return "bg-cyan-500"
  return "bg-yellow-500"
}

const topGames = [
  {
    title: "Volcano Rising",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/lkrHzbtGluTcMg4X1zrm0uesKzXQTWHuzsj1lJbu.png",
    tag: "Top Games",
  },
  {
    title: "Diamond Explosion 7s",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/INGiFfxMCGIMM0y91y1RiUhb0Q7zeWW9Kjg5iuiS.png",
    tag: "Top Games",
  },
  {
    title: "Rush Fever 7s Deluxe",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/cgdIBPwltePjhS6oqQ6VzO5ltbjPFQJlAlXcx1DK.png",
    tag: "Top Games",
  },
  {
    title: "Fruit Invaders",
    provider: "AmigoGaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/hX6mms4OQi3gIWFxhYH3OihYkLhr71fyXjQiYFZq.png",
    tag: "Top Games",
  },
  {
    title: "Moon Guardians",
    provider: "AmigoGaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/hhV8J1AWkLvmRWKLwuUyLPvha4FjeqlMJ68dRAhr.png",
    tag: "Top Games",
  },
  {
    title: "Spaceman",
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/1HqreY2eqYAMyy7m4iAx7SWUFwZZVBEORtk1JhpA.png",
    tag: "TOP",
  },
  {
    title: "JetX",
    provider: "SmartSoft",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/6n2qPThfQG4seFW2SZVPcnAyifGca3dRVWaw6sh4.png",
    tag: "FOR YOU",
  },
]

const newGames = [
  {
    title: "Hoot Shot the Sheriff",
    provider: "HacksawGaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/hDlFtSnFc8NnA2P7L2qhBCLunrTSsL3trR2mxMsR.png",
    tag: "NEW",
  },
  {
    title: "Vegas Kingmaker 100",
    provider: "GameArt",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/gVONaoYVNLyFqqasvzkaDGUjqvRo8TqkTeGbgM7g.png",
    tag: "NEW",
  },
  {
    title: "J Mania 3 Buffalo",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/hYjLetJmGiq7IKCvQM0pPqo3nDsa3Rrz3iSyO1s2.png",
    tag: "NEW",
  },
  {
    title: "Grand Express Diamond Class",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/KFr3ZHXYmx2qacKc8LrIH3UCIUP4p0vQNB89ehAZ.png",
    tag: "NEW",
  },
  {
    title: "Majestic Crown 100",
    provider: "Fazi",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/U1fhUFuO0UZdosE0uWbn03O7uEa8R4PScaNvXSZq.png",
    tag: "NEW",
  },
  {
    title: "Caishen Gold: Infinity Dragon",
    provider: "Mancala",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/wq8hQKxuxHu7R39bV4kdYFxaifsLupcQDK2671Fb.png",
    tag: "NEW",
  },
  {
    title: "Jurassic Survival Bonus",
    provider: "Tpg",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/JNbcdB3DnkYEbyeuiIKYsfH7dIXyN14rHgZiecFj.png",
    tag: "NEW",
  },
]

const liveGames = [
  {
    title: "Roulette 1 - Azure",
    provider: "Pragmatic live",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/rAd9jAA2jQ8Izjq6ZohLP4RP0BxGgzjr9lgaimaP.png",
    tag: "TOP",
  },
  {
    title: "Mega Roulette",
    provider: "Pragmatic live",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/LLZSGMYwnbOB8wVHzfuoed2RVrfgkJxDiGD8w78M.png",
    tag: "TOP",
  },
  {
    title: "Sweet Bonanza CandyLand",
    provider: "Pragmatic live",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/UXEgMIOklSD9xxYGiJTxsScQ0L6hi74Kr1dFPLw3.png",
    tag: "TOP",
  },
  {
    title: "Auto-Roulette 1",
    provider: "Pragmatic live",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/hXJJw9ieucDS6ETh2sszJbLGV2djwhlQDEXzm2wi.png",
    tag: "TOP",
  },
  {
    title: "Game Shows",
    provider: "Pragmatic live",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/zk07b5c7XgB4PeOVHYIcHbey53e4wFI7DQpKGRdy.png",
    tag: "TOP",
  },
  {
    title: "Golden Wealth Baccarat",
    provider: "Evolution Gaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/xrV1LvCUsWfwsO9gpWERuytTWadgj8m5gZbcuVtE.png",
    tag: "TOP",
  },
  {
    title: "PowerUp Roulette",
    provider: "Pragmatic live",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/6kQTMAkufAw5UltbAffitfBis2yNN1gBn0HQPbin.png",
    tag: "Live Games",
  },
]

const virtualGames = [
  {
    title: "Virtual Soccer",
    provider: "1x2 Network",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/PEDvlApKawpWWNJwSXnboxAYlLNeh4P5O2vFYYQH.png",
    tag: "Virtual Games",
  },
  {
    title: "England League",
    provider: "GoldenRace",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/QnXe2BnUElR6CRQXHJ4oXI8e9841gUSjbT06pyU0.png",
    tag: "Virtual Games",
  },
  {
    title: "Instant Football",
    provider: "Leap Gaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/LzbUsf8mhqVZeTm6iQ1dgjjuj3hySjfI9uNji9rh.png",
    tag: "Virtual Games",
  },
  {
    title: "Instant Greyhounds",
    provider: "Leap Gaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/9R53pKFtuBkMyALkOl2qw2OVNQwnLHbD0NcKAdkl.png",
    tag: "Virtual Games",
  },
  {
    title: "Instant Horses",
    provider: "Leap Gaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/o6GfizmI6GNfIoShjOrwtxoCPFSb7E3M7wo6B89T.png",
    tag: "Virtual Games",
  },
  {
    title: "Virtual Football Pro",
    provider: "1x2 Network",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/clSzdJ9OqIgoaLE2GCdYSerkUVxj8U2URfPGJqMi.png",
    tag: "Virtual Games",
  },
  {
    title: "Spain League",
    provider: "GoldenRace",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/R6iaT2cTXLzGLZe4jL3AXz0hxHdSRDNASLmGDrGN.png",
    tag: "Virtual Games",
  },
]

const tableGames = [
  {
    title: "BlackJack Lucky Sevens",
    provider: "Evoplay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/W3FyOvOs7koelwEe2FS1Ikkjb6tbNBSuTSBIlcjJ.png",
    tag: "TOP",
  },
  {
    title: "Roulette",
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/dWl9HKzJaSZ3MkbwDfzj4NfJknlKfcsSGUWZ2LCx.png",
    tag: "Table Games",
  },
  {
    title: "BlackJack",
    provider: "GameArt",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/Seq5N7YXMyOgbXWbzOMjplAVJaGcsu03if1EN1pT.png",
    tag: "Table Games",
  },
  {
    title: "Megamoney",
    provider: "RedRake",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/k7Slo5ixZ2FxeL2HK2f6Ib3TFZeVHpVzAGAUhQbf.png",
    tag: "Table Games",
  },
  {
    title: "Texas Holdem Poker",
    provider: "Evoplay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/VskevIAcHvuVwVujqNg9mknSPUIZOjWt5tQ5RHoc.png",
    tag: "Table Games",
  },
  {
    title: "Bingo Trevo da Sorte",
    provider: "Caleta Gaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/d5xI2DaXRTZyF7llC7LM67wB5cwgU2nnRoucFhOD.png",
    tag: "Table Games",
  },
]

const casinoGames = [
  {
    title: "Zeus the Thunderer",
    provider: "Mascot Gaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/iQM9CaTpGxse9yho4u3QmQhhqFLqKjcgNcCAj1l2.png",
    tag: "TOP",
  },
  {
    title: "Joker's Jewels",
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/ee5tkEFjtelYQqf2FR8AIEQh5jgvieS4o7bvLJeb.png",
    tag: "TOP",
  },
  {
    title: "Volcano Rising",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/lkrHzbtGluTcMg4X1zrm0uesKzXQTWHuzsj1lJbu.png",
    tag: "Top Games",
  },
  {
    title: "Diamond Explosion 7s",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/INGiFfxMCGIMM0y91y1RiUhb0Q7zeWW9Kjg5iuiS.png",
    tag: "Top Games",
  },
  {
    title: "Rush Fever 7s Deluxe",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/cgdIBPwltePjhS6oqQ6VzO5ltbjPFQJlAlXcx1DK.png",
    tag: "Top Games",
  },
  {
    title: "Mayan Blaze",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/AxwGaFuvsgynXWFBiQU6bomOEvnoLqSjgOhxuwKA.png",
    tag: "Reels Slots",
  },
  {
    title: "Gates of Olympus",
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/drop-n-win-images/oSJvcGGDQJbiU45qlPPiGT5co1Od6SzNC5QDrKYd.webp",
    tag: "TOP",
  },
]

const providers = [
  {
    name: "Spinmatic",
    logo: "https://fungamess.games/cdn-cgi/image/w=240,f=avif,q=80/https://fungamess.games/images/providers/jPlMyTen6EOObkFaLZZK3BJDGoOx6Kbt9ponrh7T.svg",
  },
  {
    name: "Endorphina",
    logo: "https://fungamess.games/cdn-cgi/image/w=240,f=avif,q=80/https://fungamess.games/images/providers/q9j2oEHpGUvNVf49UOufA4vHdKP54tqSQJAifdwm.svg",
  },
  {
    name: "Habanero",
    logo: "https://fungamess.games/cdn-cgi/image/w=240,f=avif,q=80/https://fungamess.games/images/providers/jwgQJOfTY06u1cw4NDI7ZDRPDKbeMTomilvhe6nz.svg",
  },
  {
    name: "Pragmatic Play",
    logo: "https://fungamess.games/cdn-cgi/image/w=240,f=avif,q=80/https://fungamess.games/images/providers/P2dFrB5QtA0LvXzj4JElUIA5i0Vk65pzCMVwBN5V.svg",
  },
  {
    name: "Tom Horn",
    logo: "https://fungamess.games/cdn-cgi/image/w=240,f=avif,q=80/https://fungamess.games/images/providers/ABsGTghEGUJrAByqWvBpb6uDUlRg684PMfSEAcuW.svg",
  },
  {
    name: "GameArt",
    logo: "https://fungamess.games/cdn-cgi/image/w=240,f=avif,q=80/https://fungamess.games/images/providers/0exYBpKQpQrCBRRO200SooaZ0FAr1hXCmcoOkdpm.svg",
  },
  {
    name: "1x2 Network",
    logo: "https://fungamess.games/cdn-cgi/image/w=240,f=avif,q=80/https://fungamess.games/images/providers/13dULSrfWIcfVM5obREnQ0aD5fYu3bYJhhN0t8O6.svg",
  },
]

const bonuses = [
  { title: "100% UP TO $900", image: "/placeholder.svg?width=300&height=150", payment: "Apple Pay" },
  { title: "100% UP TO $900", image: "/placeholder.svg?width=300&height=150", payment: "Bank Deposit" },
  { title: "100% UP TO $900", image: "/placeholder.svg?width=300&height=150", payment: "Google Pay" },
]

const footerLinks = {
  sitemap: [
    { name: "Home", href: "#" },
    { name: "About us", href: "#" },
    { name: "License", href: "#" },
    { name: "Responsible Gaming", href: "#" },
    { name: "Bonus policy", href: "#" },
    { name: "Affiliate Network", href: "#" },
    { name: "Deposit", href: "#" },
    { name: "Withdraw funds", href: "#" },
  ],
  policies: [
    { name: "Accounts, Payouts & Bonuses", href: "#" },
    { name: "AML Policy", href: "#" },
    { name: "Dispute Resolution Policy", href: "#" },
    { name: "Fairness & RNG Testing Methods", href: "#" },
    { name: "Know Your Customer (KYC) Policy", href: "#" },
    { name: "Privacy & Management of Personal Data", href: "#" },
    { name: "Responsible gaming policy", href: "#" },
    { name: "Self-Exclusion Policy", href: "#" },
    { name: "Terms Of Use", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
  support: [
    { name: "Contact us", href: "#" },
    { name: "Frequently Asked Questions", href: "#" },
  ],
}

const paymentIcons = [
  { name: "Bitcoin", icon: "/placeholder.svg?width=32&height=32" },
  { name: "Ethereum", icon: "/placeholder.svg?width=32&height=32" },
  { name: "Generic Crypto 1", icon: "/placeholder.svg?width=32&height=32" },
  { name: "Generic Crypto 2", icon: "/placeholder.svg?width=32&height=32" },
  { name: "Litecoin", icon: "/placeholder.svg?width=32&height=32" },
  { name: "Generic Crypto 3", icon: "/placeholder.svg?width=32&height=32" },
  { name: "Apple Pay", icon: "/placeholder.svg?width=32&height=32" },
  { name: "Google Pay", icon: "/placeholder.svg?width=32&height=32" },
  { name: "Mastercard", icon: "/placeholder.svg?width=32&height=32" },
  { name: "Visa", icon: "/placeholder.svg?width=32&height=32" },
]

const casinoTabItems = [
  { id: "casino", name: "Casino", icon: <ShieldCheck className="w-4 h-4 mr-1.5" /> },
  { id: "casino-games", name: "Casino Games", icon: <Dice5 className="w-4 h-4 mr-1.5" /> },
  { id: "live-casino", name: "Live Casino", icon: <PlayCircle className="w-4 h-4 mr-1.5" /> },
  { id: "table-games", name: "Table Games", icon: <Layers className="w-4 h-4 mr-1.5" /> },
  { id: "virtual-games", name: "Virtual Games", icon: <Gamepad2 className="w-4 h-4 mr-1.5" /> },
]

// Wrap the main page component with Suspense for useSearchParams
function CasinoPageContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeCasinoTab, setActiveCasinoTab] = useState("casino")
  const pathname = usePathname()
  // const isCasinoActive = pathname === "/" || pathname === "/promotions" || pathname === "/drops-and-wins" // This logic is now in SharedHeader
  const router = useRouter()
  const { balance } = useBetting()

  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const tabQuery = searchParams.get("tab")
    if (tabQuery && casinoTabItems.some((tab) => tab.id === tabQuery)) {
      setActiveCasinoTab(tabQuery)
    } else if (!tabQuery && pathname === "/") {
      // Default to 'casino' tab if no tab query param on home page
      setActiveCasinoTab("casino")
    }
  }, [searchParams, pathname])

  const getAllGamesForCurrentTab = () => {
    switch (activeCasinoTab) {
      case "casino":
        return [...liveWins, ...topGames, ...newGames]
      case "live-casino":
        return liveGames
      case "virtual-games":
        return virtualGames
      case "casino-games":
        return casinoGames
      case "table-games":
        return tableGames
      default:
        return []
    }
  }

  const filteredGames = React.useMemo(() => {
    if (!searchQuery) {
      return null // Return null when no search query, sections will handle display
    }
    // Consolidate all games from different categories for searching
    const allGamesForSearch = [
      ...liveWins,
      ...topGames,
      ...newGames,
      ...liveGames,
      ...virtualGames,
      ...tableGames,
      ...casinoGames,
    ]
    // Deduplicate games by title before filtering
    const uniqueGames = Array.from(new Set(allGamesForSearch.map((g) => g.title))).map(
      (title) => allGamesForSearch.find((g) => g.title === title)!,
    )

    return uniqueGames.filter((game) => game.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, casinoGames, liveGames, newGames, tableGames, topGames, virtualGames, liveWins])

  const flagPlaceholder = (countryCode: string, size: number) =>
    `/placeholder.svg?width=${size}&height=${Math.round(size * 0.75)}&query=${encodeURIComponent(
      countryCode + " flag",
    )}`

  const currentUrlTab = searchParams.get("tab")

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
            {mainNavItems.map((item) => {
              let isActive = false
              const [itemPath, itemQueryString] = item.href.split("?")

              if (itemQueryString && itemQueryString.startsWith("tab=")) {
                const itemTabValue = itemQueryString.split("=")[1]
                if (pathname === "/" && itemPath === "/") {
                  // Assuming all tabbed items are for the root path
                  if (item.name === "Home") {
                    // Special handling for Home as default
                    isActive = !currentUrlTab || currentUrlTab === itemTabValue
                  } else {
                    isActive = currentUrlTab === itemTabValue
                  }
                }
              } else {
                isActive = pathname === item.href
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-yellow-400 transition-colors ${
                      isActive ? "bg-gray-700 text-yellow-400" : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-6">
            <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-700 hover:text-yellow-400 transition-colors">
              <div className="flex items-center space-x-3">
                <Crown className="w-5 h-5" />
                <span>Top Categories</span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* TODO: Add dropdown for top categories */}
          </div>
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
                {mainNavItems.map((item) => {
                  let isActive = false
                  const [itemPath, itemQueryString] = item.href.split("?")

                  if (itemQueryString && itemQueryString.startsWith("tab=")) {
                    const itemTabValue = itemQueryString.split("=")[1]
                    if (pathname === "/" && itemPath === "/") {
                      if (item.name === "Home") {
                        isActive = !currentUrlTab || currentUrlTab === itemTabValue
                      } else {
                        isActive = currentUrlTab === itemTabValue
                      }
                    }
                  } else {
                    isActive = pathname === item.href
                  }

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-yellow-400 transition-colors ${
                          isActive ? "bg-gray-700 text-yellow-400" : ""
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)} // This onClick was already correct
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-6">
                <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-700 hover:text-yellow-400 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Crown className="w-5 h-5" />
                    <span>Top Categories</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <Link
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700 hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Contact className="w-5 h-5" />
                  <span>Contact us</span>
                </Link>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white space-x-3 p-2">
                  <Search className="w-5 h-5" /> <span>Search</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white space-x-3 p-2">
                  <Globe className="w-5 h-5" /> <span>Language</span> <ChevronDown className="w-4 h-4 ml-auto" />
                </Button>
              </div>
              <div className="mt-auto">
                <Button variant="ghost" className="w-full text-gray-400 hover:text-white mb-2">
                  Sign In
                </Button>
              </div>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        <SharedHeader
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          activeSection="casino"
        />

        <main className="p-4 sm:p-6 space-y-8 flex-grow">
          <section className="relative rounded-lg overflow-hidden h-[280px] sm:h-[350px] flex items-center p-4 sm:p-8 bg-gradient-to-r from-[#1a1b2e] via-[#2a2b3e] to-transparent">
            <Image
              src="/placeholder-hero-bg.png"
              alt="Hero Background"
              layout="fill"
              objectFit="cover"
              className="opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="text-white max-w-md">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400">100% Welcome Bonus</h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg text-gray-300">
                  Earn up to 500€ Extra when you deposit now!
                </p>
                <Button className="mt-4 sm:mt-6 bg-yellow-400 text-black hover:bg-yellow-500 px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base lg:text-lg font-semibold">
                  DEPOSIT NOW
                </Button>
              </div>
              <div className="hidden lg:block self-end">
                <Image src="/placeholder.svg?width=300&height=300" alt="Hero Character" width={300} height={300} />
              </div>
            </div>
          </section>

          <section className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2 -mb-2 scrollbar-thin">
            {casinoTabItems.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => {
                  setActiveCasinoTab(tab.id)
                  router.push(`/?tab=${tab.id}`, { scroll: false })
                }}
                className={`whitespace-nowrap px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center
                ${activeCasinoTab === tab.id ? "bg-yellow-400 text-black hover:bg-yellow-500" : "bg-[#2a2b3e] text-gray-300 hover:bg-gray-700/70 hover:text-white"}`}
              >
                {tab.icon}
                {tab.name}
              </Button>
            ))}
          </section>

          <section className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3 bg-[#1a1b2e] rounded-lg">
            <div className="w-full sm:w-auto flex-grow sm:flex-grow-0">
              <Input
                type="search"
                placeholder="Search games..."
                className="bg-[#0f101c] border-gray-700 placeholder-gray-500 h-10 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto overflow-x-auto">
              <div className="flex-shrink-0">
                <Button variant="outline" className="border-gray-600 bg-[#0f101c] hover:bg-gray-700 h-10 text-xs">
                  Category: All <ChevronDown className="w-3 h-3 ml-1.5" />
                </Button>
              </div>
              <div className="flex-shrink-0">
                <Button variant="outline" className="border-gray-600 bg-[#0f101c] hover:bg-gray-700 h-10 text-xs">
                  Providers: All <ChevronDown className="w-3 h-3 ml-1.5" />
                </Button>
              </div>
              <div className="flex-shrink-0">
                <Button variant="outline" className="border-gray-600 bg-[#0f101c] hover:bg-gray-700 h-10 text-xs">
                  Sort By: Rating <ChevronDown className="w-3 h-3 ml-1.5" />
                </Button>
              </div>
              <div className="flex items-center space-x-1.5 flex-shrink-0">
                <span className="text-xs text-gray-400">Bonus buy</span>
                <div className="w-8 h-5 bg-gray-600 rounded-full p-0.5">
                  {/* Basic toggle indicator, can be made interactive */}
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </section>

          {searchQuery && filteredGames && (
            <GameSection
              title={`Search Results for "${searchQuery}"`}
              icon={<Search className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />}
              games={filteredGames}
            />
          )}

          {!searchQuery && activeCasinoTab === "casino" && (
            <>
              <GameSection
                title="Live Wins"
                icon={<BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />}
                games={liveWins}
                type="live"
              />
              <GameSection
                title="Top Games"
                icon={<Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />}
                games={topGames}
              />
              <GameSection
                title="New Games"
                icon={<Gift className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />}
                games={newGames}
              />
            </>
          )}

          {!searchQuery && activeCasinoTab === "live-casino" && (
            <GameSection
              title="Live Games"
              icon={<PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />}
              games={liveGames}
            />
          )}
          {!searchQuery && activeCasinoTab === "virtual-games" && (
            <GameSection
              title="Virtual Games"
              icon={<Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />}
              games={virtualGames}
            />
          )}

          {!searchQuery && activeCasinoTab === "casino-games" && (
            <GameSection
              title="Casino Games"
              icon={<Dice5 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />}
              games={casinoGames}
            />
          )}

          {!searchQuery && activeCasinoTab === "table-games" && (
            <GameSection
              title="Table Games"
              icon={<Layers className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />}
              games={tableGames}
            />
          )}

          {/* These sections are shown if no specific tab is selected or if it's the main 'casino' tab and no search */}
          {!searchQuery && activeCasinoTab === "casino" && (
            <>
              <GameSection
                title="Table Games"
                icon={<Layers className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />}
                games={tableGames}
              />
              <GameSection
                title="Virtual Games"
                icon={<Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />}
                games={virtualGames}
              />
            </>
          )}

          <ProviderSection
            title="Providers"
            icon={<LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />}
            providers={providers}
          />
        </main>

        <footer className="bg-[#1a1b2e] text-gray-400 p-4 sm:p-8 space-y-6 sm:space-y-8 mt-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">SiteMap</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {footerLinks.sitemap.map((link) => (
                  <FooterLink key={link.name} {...link} />
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Policies</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {footerLinks.policies.map((link) => (
                  <FooterLink key={link.name} {...link} />
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Support</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {footerLinks.support.map((link) => (
                  <FooterLink key={link.name} {...link} />
                ))}
              </ul>
            </div>
            <div className="hidden lg:block">{/* Could add newsletter signup or other content here */}</div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-3 sm:py-4 border-t border-b border-gray-700">
            {paymentIcons.map((payment, index) => (
              <div key={index} className="bg-gray-700 p-1.5 sm:p-2 rounded-full">
                <Image src={payment.icon || "/placeholder.svg"} alt={payment.name} width={20} height={20} />
              </div>
            ))}
          </div>

          <div className="text-center space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Image src="/placeholder.svg?width=30&height=30" alt="NEWCASINO Logo" width={30} height={30} />
              <span className="text-lg sm:text-xl font-bold text-yellow-400">NEWCASINO</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xs sm:text-sm">Responsible Gaming</span>
              <Badge variant="outline" className="border-yellow-400 text-yellow-400 text-xs px-1.5 py-0.5">
                18+
              </Badge>
            </div>
            <p className="text-[10px] sm:text-xs max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl mx-auto">
              In order to register for this website, the user is required to accept the General Terms & Conditions. In
              the event the General Terms & Conditions are updated, existing users may choose to discontinue using the
              products and services before the update shall become effective, which is a minimum of two weeks after it
              has been announced.
            </p>
            <p className="text-[10px] sm:text-xs max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl mx-auto">
              This website is owned and operated by Mucho Gaming Limited, a company incorporated under the laws of
              Anjouan... NEWCASINO.io has passed all regulatory compliance...
            </p>
            <div className="flex items-center justify-center">
              <Image src="/placeholder.svg?width=40&height=40" alt="Compliance Seal" width={40} height={40} />
            </div>
            <p className="text-xs sm:text-sm">
              &copy; 2018-2025 All Rights Reserved |{" "}
              <Link href="#" className="hover:text-yellow-400">
                Privacy Policy
              </Link>
            </p>
          </div>
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

// GameCard, GameSection, ViewAllButton, ProviderSection, FooterLink interfaces and components
// remain the same as in your provided code.
// Make sure they are defined or imported correctly.

interface GameCardProps {
  title: string
  provider: string
  image: string
  tag?: string | null
  prize?: string
  currency?: string
  multiplier?: string
  type?: "standard" | "live"
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  provider,
  image,
  tag,
  prize,
  currency,
  multiplier,
  type = "standard",
}) => {
  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
  const queryParams = new URLSearchParams({
    title: title,
    provider: provider,
    image: image,
  })

  return (
    <Link
      href={`/casino/game/${slug}?${queryParams.toString()}`}
      className={`bg-[#1a1b2e] rounded-lg overflow-hidden shadow-lg ${
        type === "live" ? "w-[100px] sm:w-[120px]" : "w-[140px] sm:w-[160px]"
      } shrink-0 group transition-all duration-300 hover:scale-105 block`}
    >
      <div className={`relative ${type === "live" ? "h-[100px] sm:h-[120px]" : "h-[190px] sm:h-[220px]"}`}>
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="group-hover:opacity-80 transition-opacity"
          sizes={type === "live" ? "(max-width: 640px) 100px, 120px" : "(max-width: 640px) 140px, 160px"}
        />
        {tag && (
          <Badge
            className={`absolute top-1 right-1 sm:top-1.5 sm:right-1.5 text-[9px] sm:text-xs px-1 py-0.5 sm:px-1.5 ${getBadgeClass(
              tag,
            )} text-white`}
          >
            {tag}
          </Badge>
        )}
        {type === "standard" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-xs sm:text-sm font-semibold text-white truncate">{title}</h3>
            <p className="text-[10px] sm:text-xs text-gray-400 truncate">{provider}</p>
          </div>
        )}
      </div>
      {type === "live" && (
        <div className="p-1 sm:p-1.5 text-center">
          <h3 className="text-[10px] sm:text-xs font-semibold text-white truncate">{title}</h3>
          <p className="text-[9px] sm:text-[10px] text-gray-400 truncate">{provider}</p>
          {prize && currency && multiplier && (
            <div className="mt-0.5 sm:mt-1">
              <span className="text-[9px] sm:text-[10px] text-yellow-400 font-bold">
                {prize}
                {currency}
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-500 ml-0.5 sm:ml-1">MustWin{multiplier}</span>
            </div>
          )}
        </div>
      )}
    </Link>
  )
}

interface GameSectionProps {
  title: string
  icon: React.ReactNode
  games: GameCardProps[]
  type?: "standard" | "live"
}

const GameSection: React.FC<GameSectionProps> = ({ title, icon, games, type = "standard" }) => {
  if (!games || games.length === 0) {
    if (title.startsWith("Search Results")) {
      // Only show "No games found" for search results
      return (
        <section className="text-center py-8">
          <p className="text-gray-400">No games found matching your search criteria.</p>
        </section>
      )
    }
    return null // Don't render section if no games and not a search result
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {icon}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">{title}</h2>
          {title === "Live Wins" && (
            <div className="hidden sm:flex items-center space-x-1 ml-2 sm:ml-4">
              {["M", "W", "D"].map((filter) => (
                <Button
                  key={filter}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs"
                >
                  {filter}
                </Button>
              ))}
            </div>
          )}
        </div>
        <ViewAllButton />
      </div>
      <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-3 sm:pb-4 -mb-3 sm:-mb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {games.map((game, index) => (
          <GameCard key={`${game.title}-${index}`} {...game} type={type} />
        ))}
        <div className="shrink-0 w-px"></div> {/* Helper for scroll spacing */}
      </div>
    </section>
  )
}

const ViewAllButton: React.FC = () => (
  <div className="flex items-center space-x-1 sm:space-x-2">
    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-yellow-400 px-1.5 sm:px-2 text-xs sm:text-sm">
      View all
    </Button>
    <Button
      variant="outline"
      size="icon"
      className="w-6 h-6 sm:w-8 sm:h-8 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white"
    >
      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
    </Button>
    <Button
      variant="outline"
      size="icon"
      className="w-6 h-6 sm:w-8 sm:h-8 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white"
    >
      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
    </Button>
  </div>
)

const ProviderSection: React.FC<{
  title: string
  icon: React.ReactNode
  providers: { name: string; logo: string }[]
}> = ({ title, icon, providers }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const ITEMS_PER_SCROLL = 7 // Adjust as needed

  const checkScrollability = () => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth
      setCanScrollLeft(scrollLeft > 1) // Allow even 1px scroll
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1) // Allow even 1px scroll
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      checkScrollability() // Initial check
      container.addEventListener("scroll", checkScrollability)
      window.addEventListener("resize", checkScrollability) // Re-check on resize

      // Also check after a short delay for initial render
      const timeoutId = setTimeout(checkScrollability, 100)

      return () => {
        container.removeEventListener("scroll", checkScrollability)
        window.removeEventListener("resize", checkScrollability)
        clearTimeout(timeoutId)
      }
    }
  }, [providers]) // Re-run if providers change, though unlikely here

  const handleScrollButtonClick = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (container) {
      // Estimate item width (including gap) for
      // smoother scrolling of multiple items
      // These are rough estimates, adjust if necessary
      const baseItemWidth = window.innerWidth >= 640 ? 160 : 128 // sm:w-[160px] vs w-[128px]
      const gapWidth = window.innerWidth >= 640 ? 16 : 12 // sm:space-x-4 vs space-x-3
      const itemEffectiveWidth = baseItemWidth + gapWidth

      const scrollAmountPx = ITEMS_PER_SCROLL * itemEffectiveWidth
      container.scrollBy({
        left: direction === "left" ? -scrollAmountPx : scrollAmountPx,
        behavior: "smooth",
      })
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {icon}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">{title}</h2>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-yellow-400 px-1.5 sm:px-2 text-xs sm:text-sm"
            asChild
          >
            <Link href="#">View all</Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScrollButtonClick("left")}
            disabled={!canScrollLeft}
            className="w-6 h-6 sm:w-8 sm:h-8 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScrollButtonClick("right")}
            disabled={!canScrollRight}
            className="w-6 h-6 sm:w-8 sm:h-8 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-3 sm:pb-4 -mb-3 sm:-mb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {providers.map((provider, index) => (
          <div
            key={index}
            className="bg-[#1a1b2e] rounded-lg overflow-hidden shadow-lg w-[128px] sm:w-[160px] shrink-0 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative h-[80px] sm:h-[100px]">
              <Image
                src={provider.logo || "/placeholder.svg"}
                alt={provider.name}
                layout="fill"
                objectFit="contain"
                className="p-2 sm:p-3" // Padding within the image container
                sizes="(max-width: 640px) 128px, 160px"
              />
            </div>
            <div className="p-1.5 sm:p-2 text-center">
              <h3 className="text-xs sm:text-sm font-semibold text-white truncate">{provider.name}</h3>
            </div>
          </div>
        ))}
        <div className="shrink-0 w-px"></div> {/* Helper for scroll spacing */}
      </div>
    </section>
  )
}

interface FooterLinkProps {
  name: string
  href: string
}

const FooterLink: React.FC<FooterLinkProps> = ({ name, href }) => (
  <li>
    <Link href={href} className="text-gray-400 hover:text-yellow-400 transition-colors block text-xs sm:text-sm">
      {name}
    </Link>
  </li>
)

export default function CasinoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CasinoPageContent />
    </Suspense>
  )
}
