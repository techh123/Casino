"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ProfilePopup } from "./profile-popup"
import { useBetting } from "@/contexts/betting-context"
import { ShieldCheck, Trophy, Search, Bell, ChevronDown, Euro, Wallet, User, Menu } from "lucide-react"

interface SharedHeaderProps {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (isOpen: boolean) => void
  activeSection?: "casino" | "sport"
}

export function SharedHeader({ isMobileMenuOpen, setIsMobileMenuOpen, activeSection }: SharedHeaderProps) {
  const pathname = usePathname()
  const { balance } = useBetting()

  const isCasinoPage =
    activeSection === "casino" ||
    (!activeSection &&
      (pathname === "/" ||
        pathname.startsWith("/promotions") ||
        pathname.startsWith("/drops-and-wins") ||
        pathname.startsWith("/casino")))
  const isSportPage = activeSection === "sport" || (!activeSection && pathname.startsWith("/sport"))

  const flagPlaceholder = (countryCode: string, size: number) =>
    `/placeholder.svg?width=${size}&height=${Math.round(size * 0.75)}&query=${encodeURIComponent(
      countryCode + " flag",
    )}`

  return (
    <header className="sticky top-0 z-30 bg-[#1a1b2e]/80 backdrop-blur-md shadow-sm">
      {/* Desktop Header */}
      <div className="hidden md:flex p-4 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            className={`${isCasinoPage ? "bg-yellow-400 text-black hover:bg-yellow-500" : "text-gray-400 hover:text-white"} px-4 py-2 rounded-full text-sm font-semibold`}
            asChild
          >
            <Link href="/?tab=casino">
              <ShieldCheck className="w-4 h-4 mr-2" /> Casino
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={`${isSportPage ? "bg-yellow-400 text-black hover:bg-yellow-500" : "text-gray-400 hover:text-white"} px-4 py-2 rounded-full text-sm font-semibold`}
            asChild
          >
            <Link href="/sport">
              <Trophy className="w-4 h-4 mr-2" /> Sport
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

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white w-8 h-8">
                <User className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-transparent border-none shadow-none mr-4 mt-1"
              side="bottom"
              align="end"
            >
              <ProfilePopup />
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white w-8 h-8">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white w-8 h-8">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white px-2 py-1 h-auto flex items-center">
            <Image src={flagPlaceholder("GB", 20) || "/placeholder.svg"} alt="Language" width={20} height={15} />
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>

      {/* Mobile Header */}
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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white w-8 h-8">
              <User className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-transparent border-none shadow-none mr-2 mt-1"
            side="bottom"
            align="end"
          >
            <ProfilePopup />
          </PopoverContent>
        </Popover>
      </div>

      {/* Mobile Casino/Sport Toggle */}
      <div className="md:hidden flex items-center justify-center space-x-2 p-2 bg-[#0f101c]">
        <Button
          variant="ghost"
          className={`flex-1 ${isCasinoPage ? "bg-yellow-400 text-black hover:bg-yellow-500" : "text-gray-400 bg-[#2a2b3e] hover:text-white"} px-4 py-2 rounded-full text-sm font-semibold`}
          asChild
        >
          <Link href="/?tab=casino">
            <ShieldCheck className="w-4 h-4 mr-2" /> Casino
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={`flex-1 ${isSportPage ? "bg-yellow-400 text-black hover:bg-yellow-500" : "text-gray-400 bg-[#2a2b3e] hover:text-white"} px-4 py-2 rounded-full text-sm font-semibold`}
          asChild
        >
          <Link href="/sport">
            <Trophy className="w-4 h-4 mr-2" /> Sport
          </Link>
        </Button>
      </div>
    </header>
  )
}
