"use server"
import { revalidatePath } from "next/cache"
import {
  getGames as getGamesData,
  addGameData as addGameToDb,
  removeGameData as removeGameFromDb,
  updateGameData as updateGameInDb,
  getUsers as getUsersData,
  updateUserStatusData as updateUserStatusInDb,
  getEarningsData as getEarningsFromDb,
  type AdminGame,
  type AdminUser,
  type DailyEarning,
} from "./data"

// Games Actions
export async function fetchGames(): Promise<AdminGame[]> {
  return getGamesData()
}

export async function addGame(formData: FormData) {
  try {
    const newGame: Omit<AdminGame, "id"> = {
      title: formData.get("title") as string,
      provider: formData.get("provider") as string,
      image: formData.get("image") as string,
      rtp: Number.parseFloat(formData.get("rtp") as string),
      category: formData.get("category") as string,
    }
    if (!newGame.title || !newGame.provider || !newGame.rtp || !newGame.category) {
      return { success: false, message: "Missing required fields." }
    }
    addGameToDb(newGame)
    revalidatePath("/admin/games")
    return { success: true, message: "Game added successfully." }
  } catch (error) {
    return { success: false, message: "Failed to add game." }
  }
}

export async function removeGame(gameId: string) {
  try {
    const success = removeGameFromDb(gameId)
    if (!success) return { success: false, message: "Game not found." }
    revalidatePath("/admin/games")
    return { success: true, message: "Game removed successfully." }
  } catch (error) {
    return { success: false, message: "Failed to remove game." }
  }
}

export async function updateGameRtp(gameId: string, newRtp: number) {
  try {
    const updatedGame = updateGameInDb(gameId, { rtp: newRtp })
    if (!updatedGame) return { success: false, message: "Game not found." }
    revalidatePath("/admin/games")
    return { success: true, message: "Game RTP updated.", game: updatedGame }
  } catch (error) {
    return { success: false, message: "Failed to update RTP." }
  }
}

// Users Actions
export async function fetchUsers(): Promise<AdminUser[]> {
  return getUsersData()
}

export async function updateUserStatus(userId: string, status: "active" | "banned") {
  try {
    const updatedUser = updateUserStatusInDb(userId, status)
    if (!updatedUser) return { success: false, message: "User not found." }
    revalidatePath("/admin/users")
    return { success: true, message: `User ${status === "banned" ? "banned" : "unbanned"}.`, user: updatedUser }
  } catch (error) {
    return { success: false, message: "Failed to update user status." }
  }
}

// Dashboard Actions
export async function fetchEarnings(days: number): Promise<DailyEarning[]> {
  return getEarningsFromDb(days)
}
