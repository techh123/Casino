"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface BetSlipItem {
  id: string
  eventName: string
  market: string
  selection: string
  odds: number
  stake: number
  teamA?: string
  teamB?: string
  league?: string
}

export interface PlacedBet extends BetSlipItem {
  datePlaced: string // ISO string
  status: "open" | "won" | "lost" | "cashed_out" | "cancelled" | "refund"
  potentialWin: number
}

interface BettingContextType {
  balance: number
  placedBets: PlacedBet[]
  placeBets: (betsToPlace: BetSlipItem[]) => { success: boolean; message: string }
  setBalance: (newBalance: number) => void // Allow direct setting for testing/initialization
}

const BettingContext = createContext<BettingContextType | undefined>(undefined)

export const BettingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(100) // Initial balance of 100 Euros
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>([])

  const placeBets = (betsToPlace: BetSlipItem[]): { success: boolean; message: string } => {
    const totalStake = betsToPlace.reduce((sum, bet) => sum + bet.stake, 0)

    if (totalStake <= 0) {
      return { success: false, message: "Total stake must be greater than 0." }
    }
    if (balance < totalStake) {
      return { success: false, message: "Insufficient balance to place bets." }
    }

    const newPlacedBets: PlacedBet[] = betsToPlace.map((bet) => ({
      ...bet,
      datePlaced: new Date().toISOString(),
      status: "open", // All new bets are initially 'open'
      potentialWin: bet.stake * bet.odds,
    }))

    setPlacedBets((prevBets) => [...prevBets, ...newPlacedBets])
    setBalance((prevBalance) => prevBalance - totalStake)
    return { success: true, message: "Bets placed successfully!" }
  }

  return (
    <BettingContext.Provider value={{ balance, placedBets, placeBets, setBalance }}>{children}</BettingContext.Provider>
  )
}

export const useBetting = (): BettingContextType => {
  const context = useContext(BettingContext)
  if (context === undefined) {
    throw new Error("useBetting must be used within a BettingProvider")
  }
  return context
}
