// app/admin/data.ts
// This file simulates an in-memory database for the admin panel.

export interface AdminGame {
  id: string
  title: string
  provider: string
  image: string
  rtp: number // e.g., 96.5 for 96.5%
  category: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  status: "active" | "banned"
  joinedDate: string
  lastLogin: string
  totalWagered: number
  totalWon: number
}

export interface DailyEarning {
  date: string // YYYY-MM-DD
  earnings: number
}

// Helper for placeholder images
function gameImagePlaceholder(query: string, width = 200, height = 280) {
  return `/placeholder.svg?width=${width}&height=${height}&query=${encodeURIComponent(query + " game art")}`
}

// Game data from app/page.tsx (or similar sources)
const liveWinsSource = [
  {
    title: "Gates of Olympus",
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/drop-n-win-images/oSJvcGGDQJbiU45qlPPiGT5co1Od6SzNC5QDrKYd.webp",
  },
  {
    title: "Spaceman",
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/1HqreY2eqYAMyy7m4iAx7SWUFwZZVBEORtk1JhpA.png",
  },
  {
    title: "JetX",
    provider: "SmartSoft",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/6n2qPThfQG4seFW2SZVPcnAyifGca3dRVWaw6sh4.png",
  },
  {
    title: "Volcano Rising",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/lkrHzbtGluTcMg4X1zrm0uesKzXQTWHuzsj1lJbu.png",
  },
  {
    title: "Joker's Jewels",
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/ee5tkEFjtelYQqf2FR8AIEQh5jgvieS4o7bvLJeb.png",
  },
  {
    title: "Roulette",
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/dWl9HKzJaSZ3MkbwDfzj4NfJknlKfcsSGUWZ2LCx.png",
  },
  {
    title: "BlackJack",
    provider: "GameArt",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/Seq5N7YXMyOgbXWbzOMjplAVJaGcsu03if1EN1pT.png",
  },
  {
    title: "Hoot Shot the Sheriff",
    provider: "HacksawGaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/hDlFtSnFc8NnA2P7L2qhBCLunrTSsL3trR2mxMsR.png",
  },
  {
    title: "Mayan Blaze",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/AxwGaFuvsgynXWFBiQU6bomOEvnoLqSjgOhxuwKA.png",
  },
]

const topGamesSource = [
  {
    title: "Volcano Rising",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/lkrHzbtGluTcMg4X1zrm0uesKzXQTWHuzsj1lJbu.png",
  },
  {
    title: "Diamond Explosion 7s",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/INGiFfxMCGIMM0y91y1RiUhb0Q7zeWW9Kjg5iuiS.png",
  },
  {
    title: "Rush Fever 7s Deluxe",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/cgdIBPwltePjhS6oqQ6VzO5ltbjPFQJlAlXcx1DK.png",
  },
  {
    title: "Fruit Invaders",
    provider: "AmigoGaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/hX6mms4OQi3gIWFxhYH3OihYkLhr71fyXjQiYFZq.png",
  },
  {
    title: "Moon Guardians",
    provider: "AmigoGaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/hhV8J1AWkLvmRWKLwuUyLPvha4FjeqlMJ68dRAhr.png",
  },
  {
    title: "Spaceman",
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/1HqreY2eqYAMyy7m4iAx7SWUFwZZVBEORtk1JhpA.png",
  },
  {
    title: "JetX",
    provider: "SmartSoft",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/6n2qPThfQG4seFW2SZVPcnAyifGca3dRVWaw6sh4.png",
  },
]

const newGamesSource = [
  {
    title: "Hoot Shot the Sheriff",
    provider: "HacksawGaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/hDlFtSnFc8NnA2P7L2qhBCLunrTSsL3trR2mxMsR.png",
  },
  {
    title: "Vegas Kingmaker 100",
    provider: "GameArt",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/gVONaoYVNLyFqqasvzkaDGUjqvRo8TqkTeGbgM7g.png",
  },
  {
    title: "J Mania 3 Buffalo",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/hYjLetJmGiq7IKCvQM0pPqo3nDsa3Rrz3iSyO1s2.png",
  },
  {
    title: "Grand Express Diamond Class",
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/KFr3ZHXYmx2qacKc8LrIH3UCIUP4p0vQNB89ehAZ.png",
  },
  {
    title: "Majestic Crown 100",
    provider: "Fazi",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/U1fhUFuO0UZdosE0uWbn03O7uEa8R4PScaNvXSZq.png",
  },
  {
    title: "Caishen Gold: Infinity Dragon",
    provider: "Mancala",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/wq8hQKxuxHu7R39bV4kdYFxaifsLupcQDK2671Fb.png",
  },
  {
    title: "Jurassic Survival Bonus",
    provider: "Tpg",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/JNbcdB3DnkYEbyeuiIKYsfH7dIXyN14rHgZiecFj.png",
  },
]

const liveGamesSource = [
  {
    title: "Roulette 1 - Azure",
    provider: "Pragmatic live",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/rAd9jAA2jQ8Izjq6ZohLP4RP0BxGgzjr9lgaimaP.png",
  },
  {
    title: "Mega Roulette",
    provider: "Pragmatic live",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/LLZSGMYwnbOB8wVHzfuoed2RVrfgkJxDiGD8w78M.png",
  },
  {
    title: "Sweet Bonanza CandyLand",
    provider: "Pragmatic live",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/UXEgMIOklSD9xxYGiJTxsScQ0L6hi74Kr1dFPLw3.png",
  },
  {
    title: "Auto-Roulette 1",
    provider: "Pragmatic live",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/hXJJw9ieucDS6ETh2sszJbLGV2djwhlQDEXzm2wi.png",
  },
  {
    title: "Game Shows",
    provider: "Pragmatic live",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/zk07b5c7XgB4PeOVHYIcHbey53e4wFI7DQpKGRdy.png",
  },
  {
    title: "Golden Wealth Baccarat",
    provider: "Evolution Gaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/xrV1LvCUsWfwsO9gpWERuytTWadgj8m5gZbcuVtE.png",
  },
  {
    title: "PowerUp Roulette",
    provider: "Pragmatic live",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/6kQTMAkufAw5UltbAffitfBis2yNN1gBn0HQPbin.png",
  },
]

const virtualGamesSource = [
  {
    title: "Virtual Soccer",
    provider: "1x2 Network",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/PEDvlApKawpWWNJwSXnboxAYlLNeh4P5O2vFYYQH.png",
  },
  {
    title: "England League",
    provider: "GoldenRace",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/QnXe2BnUElR6CRQXHJ4oXI8e9841gUSjbT06pyU0.png",
  },
  {
    title: "Instant Football",
    provider: "Leap Gaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/LzbUsf8mhqVZeTm6iQ1dgjjuj3hySjfI9uNji9rh.png",
  },
  {
    title: "Instant Greyhounds",
    provider: "Leap Gaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/9R53pKFtuBkMyALkOl2qw2OVNQwnLHbD0NcKAdkl.png",
  },
  {
    title: "Instant Horses",
    provider: "Leap Gaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/o6GfizmI6GNfIoShjOrwtxoCPFSb7E3M7wo6B89T.png",
  },
  {
    title: "Virtual Football Pro",
    provider: "1x2 Network",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/clSzdJ9OqIgoaLE2GCdYSerkUVxj8U2URfPGJqMi.png",
  },
  {
    title: "Spain League",
    provider: "GoldenRace",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/R6iaT2cTXLzGLZe4jL3AXz0hxHdSRDNASLmGDrGN.png",
  },
]

const tableGamesSource = [
  {
    title: "BlackJack Lucky Sevens",
    provider: "Evoplay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/W3FyOvOs7koelwEe2FS1Ikkjb6tbNBSuTSBIlcjJ.png",
  },
  {
    title: "Roulette", // Duplicate from liveWins, will be handled
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/dWl9HKzJaSZ3MkbwDfzj4NfJknlKfcsSGUWZ2LCx.png",
  },
  {
    title: "BlackJack", // Duplicate from liveWins, will be handled
    provider: "GameArt",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/Seq5N7YXMyOgbXWbzOMjplAVJaGcsu03if1EN1pT.png",
  },
  {
    title: "Megamoney",
    provider: "RedRake",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/k7Slo5ixZ2FxeL2HK2f6Ib3TFZeVHpVzAGAUhQbf.png",
  },
  {
    title: "Texas Holdem Poker",
    provider: "Evoplay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/VskevIAcHvuVwVujqNg9mknSPUIZOjWt5tQ5RHoc.png",
  },
  {
    title: "Bingo Trevo da Sorte",
    provider: "Caleta Gaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/d5xI2DaXRTZyF7llC7LM67wB5cwgU2nnRoucFhOD.png",
  },
]

const casinoGamesSource = [
  {
    title: "Zeus the Thunderer",
    provider: "Mascot Gaming",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/iQM9CaTpGxse9yho4u3QmQhhqFLqKjcgNcCAj1l2.png",
  },
  {
    title: "Joker's Jewels", // Duplicate
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/ee5tkEFjtelYQqf2FR8AIEQh5jgvieS4o7bvLJeb.png",
  },
  {
    title: "Volcano Rising", // Duplicate
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/lkrHzbtGluTcMg4X1zrm0uesKzXQTWHuzsj1lJbu.png",
  },
  {
    title: "Diamond Explosion 7s", // Duplicate
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/INGiFfxMCGIMM0y91y1RiUhb0Q7zeWW9Kjg5iuiS.png",
  },
  {
    title: "Rush Fever 7s Deluxe", // Duplicate
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/cgdIBPwltePjhS6oqQ6VzO5ltbjPFQJlAlXcx1DK.png",
  },
  {
    title: "Mayan Blaze", // Duplicate
    provider: "RubyPlay",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/games/AxwGaFuvsgynXWFBiQU6bomOEvnoLqSjgOhxuwKA.png",
  },
  {
    title: "Gates of Olympus", // Duplicate
    provider: "Pragmatic Play",
    image:
      "https://fungamess.games/cdn-cgi/image/w=400,f=avif,q=80/https://fungamess.games/images/drop-n-win-images/oSJvcGGDQJbiU45qlPPiGT5co1Od6SzNC5QDrKYd.webp",
  },
]

const allGameSources = [
  { games: liveWinsSource, defaultCategory: "Slots" }, // Or infer based on title
  { games: topGamesSource, defaultCategory: "Slots" },
  { games: newGamesSource, defaultCategory: "Slots" },
  { games: liveGamesSource, defaultCategory: "Live Casino" },
  { games: virtualGamesSource, defaultCategory: "Virtual Games" },
  { games: tableGamesSource, defaultCategory: "Table Games" },
  { games: casinoGamesSource, defaultCategory: "Casino Games" }, // General category
]

const processedGames = new Map<string, AdminGame>()
let gameIdCounter = 1

allGameSources.forEach(({ games, defaultCategory }) => {
  games.forEach((game) => {
    const uniqueKey = `${game.title.toLowerCase()}-${game.provider.toLowerCase()}`
    if (!processedGames.has(uniqueKey)) {
      let category = defaultCategory
      // Basic category inference (can be expanded)
      const titleLower = game.title.toLowerCase()
      if (
        titleLower.includes("roulette") ||
        titleLower.includes("blackjack") ||
        titleLower.includes("baccarat") ||
        titleLower.includes("poker")
      ) {
        category = "Table Games"
      } else if (defaultCategory === "Live Casino" || titleLower.includes("live")) {
        category = "Live Casino"
      } else if (titleLower.includes("virtual") || defaultCategory === "Virtual Games") {
        category = "Virtual Games"
      } else if (defaultCategory === "Slots" || defaultCategory === "Casino Games") {
        category = "Slots" // Default to slots if not clearly table/live/virtual
      }

      processedGames.set(uniqueKey, {
        id: `game-${gameIdCounter++}`,
        title: game.title,
        provider: game.provider,
        image: game.image || gameImagePlaceholder(game.title, 100, 140),
        rtp: 96.5, // Default RTP, can be adjusted
        category: category,
      })
    }
  })
})

let gamesStore: AdminGame[] = Array.from(processedGames.values())

// Initial Mock Data for Users
const usersStore: AdminUser[] = [
  {
    id: "u1",
    name: "Alice Wonderland",
    email: "alice@example.com",
    status: "active",
    joinedDate: "2023-01-15",
    lastLogin: "2025-06-04",
    totalWagered: 1500,
    totalWon: 1450,
  },
  {
    id: "u2",
    name: "Bob The Gambler",
    email: "bob@example.com",
    status: "active",
    joinedDate: "2023-03-22",
    lastLogin: "2025-06-03",
    totalWagered: 25000,
    totalWon: 24800,
  },
  {
    id: "u3",
    name: "Charlie Cheater",
    email: "charlie@example.com",
    status: "banned",
    joinedDate: "2023-05-10",
    lastLogin: "2025-05-20",
    totalWagered: 500,
    totalWon: 4000,
  },
  {
    id: "u4",
    name: "Diana Player",
    email: "diana@example.com",
    status: "active",
    joinedDate: "2024-02-10",
    lastLogin: "2025-06-05",
    totalWagered: 800,
    totalWon: 750,
  },
]

// --- Games Data Access ---
export const getGames = (): AdminGame[] => JSON.parse(JSON.stringify(gamesStore))

export const addGameData = (game: Omit<AdminGame, "id">): AdminGame => {
  const newGame = { ...game, id: `g${Date.now()}` }
  gamesStore.push(newGame)
  return JSON.parse(JSON.stringify(newGame))
}
export const removeGameData = (gameId: string): boolean => {
  const initialLength = gamesStore.length
  gamesStore = gamesStore.filter((g) => g.id !== gameId)
  return gamesStore.length < initialLength
}
export const updateGameData = (gameId: string, updates: Partial<AdminGame>): AdminGame | null => {
  const gameIndex = gamesStore.findIndex((g) => g.id === gameId)
  if (gameIndex > -1) {
    gamesStore[gameIndex] = { ...gamesStore[gameIndex], ...updates }
    return JSON.parse(JSON.stringify(gamesStore[gameIndex]))
  }
  return null
}

// --- Users Data Access ---
export const getUsers = (): AdminUser[] => JSON.parse(JSON.stringify(usersStore))
export const updateUserStatusData = (userId: string, status: "active" | "banned"): AdminUser | null => {
  const userIndex = usersStore.findIndex((u) => u.id === userId)
  if (userIndex > -1) {
    usersStore[userIndex].status = status
    return JSON.parse(JSON.stringify(usersStore[userIndex]))
  }
  return null
}

// --- Earnings Data Access ---
export const getEarningsData = (days: number): DailyEarning[] => {
  const endDate = new Date()
  const earnings: DailyEarning[] = []
  for (let i = 0; i < days; i++) {
    const date = new Date(endDate)
    date.setDate(endDate.getDate() - i)
    earnings.push({
      date: date.toISOString().split("T")[0],
      earnings: Math.floor(Math.random() * (5000 - 1000 + 1) + 1000) * (1 - i / (days * 2)),
    })
  }
  return earnings.reverse()
}
