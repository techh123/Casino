"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBetting } from "@/contexts/betting-context"
import { User, Edit2, X, BarChartBig, Trophy, Sigma, Coins, Landmark, Gem, ListIcon as RankIcon } from "lucide-react"

interface ProfileStatisticCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
}

const ProfileStatisticCard: React.FC<ProfileStatisticCardProps> = ({ title, value, icon }) => (
  <div className="bg-[#2a2b3e] p-3 rounded-lg flex flex-col items-center justify-center text-center">
    <div className="text-yellow-400 mb-1.5">{icon}</div>
    <p className="text-xs text-gray-400 mb-0.5">{title}</p>
    <p className="text-sm font-semibold text-white">{value}</p>
  </div>
)

export function ProfilePopup({ onClose }: { onClose?: () => void }) {
  const { placedBets } = useBetting()
  const [activeTab, setActiveTab] = useState("my-profile")

  const totalBets = placedBets.length
  const wonBets = placedBets.filter((bet) => bet.status === "won")
  const totalBetsWon = wonBets.length
  const totalWinnings = wonBets.reduce((sum, bet) => sum + bet.potentialWin, 0)
  const totalDeposits = 0 // Placeholder, replace with actual data

  // Mock data based on screenshot
  const username = "player1243305"
  const memberSince = "Jun 03, 2025"
  const progress = 0
  const rank = "RB Novice"

  return (
    <div className="w-[360px] bg-[#1e2024] text-gray-300 rounded-lg shadow-xl border border-gray-700/50">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <Tabs defaultValue="my-profile" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-[#2a2b3e] p-0 h-9">
              <TabsTrigger
                value="my-profile"
                className="text-xs data-[state=active]:bg-[#3b3e46] data-[state=active]:text-white rounded-sm h-full"
              >
                My Profile
              </TabsTrigger>
              <TabsTrigger
                value="edit-profile"
                className="text-xs data-[state=active]:bg-[#3b3e46] data-[state=active]:text-white rounded-sm h-full"
              >
                Edit Profile
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="ml-2 text-gray-400 hover:text-white w-7 h-7 -mt-0.5"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {activeTab === "my-profile" && (
          <>
            <div className="flex flex-col items-center mb-4">
              <div className="relative mb-2">
                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center border-2 border-yellow-400">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <div className="absolute bottom-0 right-0 bg-yellow-400 p-1 rounded-full border-2 border-[#1e2024]">
                  <Gem className="w-2.5 h-2.5 text-black" />
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-white">{username}</p>
                <Button variant="ghost" size="icon" className="ml-1 text-gray-400 hover:text-white w-6 h-6">
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">Member since {memberSince}</p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-white">Your progress</p>
                <p className="text-sm font-medium text-white">{progress}%</p>
              </div>
              <Progress value={progress} className="h-2 bg-[#2a2b3e] [&>div]:bg-yellow-400" />
              <div className="flex justify-between items-center mt-1.5 text-xs">
                <div className="flex items-center text-yellow-400">
                  <RankIcon className="w-3.5 h-3.5 mr-1" /> {/* Using Shield for RB Novice icon */}
                  <span>{rank}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Coins className="w-3.5 h-3.5 mr-1 text-yellow-500" /> {/* Placeholder for Ether icon */}
                  <span>Ether</span>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700/50 my-4" />

            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <BarChartBig className="w-5 h-5 text-gray-400 mr-2" />
                  <h3 className="text-md font-semibold text-white">Statistic</h3>
                </div>
                <Select defaultValue="global">
                  <SelectTrigger className="w-[100px] h-8 text-xs bg-[#2a2b3e] border-gray-600 focus:ring-yellow-400">
                    <SelectValue placeholder="Scope" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2b3e] border-gray-600 text-gray-300">
                    <SelectItem value="global" className="text-xs focus:bg-[#3b3e46]">
                      Global
                    </SelectItem>
                    <SelectItem value="casino" className="text-xs focus:bg-[#3b3e46]">
                      Casino
                    </SelectItem>
                    <SelectItem value="sport" className="text-xs focus:bg-[#3b3e46]">
                      Sport
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <ProfileStatisticCard
                  title="Total Bets Won"
                  value={totalBetsWon}
                  icon={<Trophy className="w-6 h-6" />}
                />
                <ProfileStatisticCard title="Total Bets" value={totalBets} icon={<Sigma className="w-6 h-6" />} />
                <ProfileStatisticCard
                  title="Total Winnings"
                  value={`€${totalWinnings.toFixed(2)}`}
                  icon={<Coins className="w-6 h-6" />}
                />
                <ProfileStatisticCard
                  title="Total Deposits"
                  value={`€${totalDeposits.toFixed(2)}`}
                  icon={<Landmark className="w-6 h-6" />}
                />
              </div>
            </div>
          </>
        )}
        {activeTab === "edit-profile" && (
          <div className="py-8 text-center">
            <p className="text-gray-400">Edit profile form will be here.</p>
            {/* You can add form fields for editing profile here */}
          </div>
        )}
      </div>
    </div>
  )
}
