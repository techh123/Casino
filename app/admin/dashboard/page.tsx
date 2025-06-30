"use client"

import { useState, useEffect, startTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { fetchEarnings, type DailyEarning } from "../actions"
import { DollarSign, Users, Dice6, AlertTriangle } from "lucide-react"

const timePeriods = [
  { label: "Last 24 hours", value: "1" },
  { label: "Last 3 days", value: "3" },
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 60 days", value: "60" },
  { label: "Last 90 days", value: "90" },
]

export default function AdminDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("30")
  const [earningsData, setEarningsData] = useState<DailyEarning[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    startTransition(() => {
      fetchEarnings(Number.parseInt(selectedPeriod)).then((data) => {
        setEarningsData(data)
        setIsLoading(false)
      })
    })
  }, [selectedPeriod])

  const totalEarnings = earningsData.reduce((sum, item) => sum + item.earnings, 0)
  const averageDailyEarnings = earningsData.length > 0 ? totalEarnings / earningsData.length : 0

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-2 rounded shadow-lg border border-gray-700">
          <p className="label">{`Date: ${label}`}</p>
          <p className="intro">{`Earnings: €${payload[0].value.toFixed(2)}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Dashboard</h2>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            {timePeriods.map((period) => (
              <SelectItem key={period.value} value={period.value} className="hover:bg-gray-700">
                {period.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-gray-400">Over the selected period</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div> {/* Placeholder */}
            <p className="text-xs text-gray-400">Currently active</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Games</CardTitle>
            <Dice6 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div> {/* Placeholder */}
            <p className="text-xs text-gray-400">Available in casino</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div> {/* Placeholder */}
            <p className="text-xs text-gray-400">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Casino Earnings Over Time</CardTitle>
          <CardDescription>Showing daily earnings for the selected period.</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p>Loading chart data...</p>
            </div>
          ) : earningsData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis
                  dataKey="date"
                  stroke="#A0AEC0"
                  tickFormatter={(tick) =>
                    new Date(tick).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  }
                />
                <YAxis stroke="#A0AEC0" tickFormatter={(value) => `€${value / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: "#A0AEC0" }} />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#F6E05E"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#F6E05E" }}
                  activeDot={{ r: 6 }}
                  name="Daily Earnings"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No data available for this period.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
