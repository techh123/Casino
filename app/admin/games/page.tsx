"use client"

import { useState, useEffect, useTransition, startTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { PlusCircle, Edit3, Trash2, Search, RefreshCw } from "lucide-react"
import { fetchGames, addGame, removeGame, updateGameRtp, type AdminGame } from "../actions"
import Image from "next/image"
import { useActionState } from "react"

const initialFormState = { success: false, message: "" }

export default function AdminGamesPage() {
  const [games, setGames] = useState<AdminGame[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPending, startServerTransition] = useTransition()

  const [searchTerm, setSearchTerm] = useState("")
  const [editingGame, setEditingGame] = useState<AdminGame | null>(null)
  const [newRtp, setNewRtp] = useState<number>(0)

  const [addGameState, addGameAction] = useActionState(addGame, initialFormState)

  const loadGames = () => {
    setIsLoading(true)
    startTransition(() => {
      fetchGames().then((data) => {
        setGames(data)
        setIsLoading(false)
      })
    })
  }

  useEffect(() => {
    loadGames()
  }, [])

  const handleRemoveGame = async (gameId: string) => {
    if (confirm("Are you sure you want to remove this game?")) {
      startServerTransition(async () => {
        const result = await removeGame(gameId)
        if (result.success) {
          alert(result.message)
          loadGames()
        } else {
          alert(`Error: ${result.message}`)
        }
      })
    }
  }

  const handleUpdateRtp = async () => {
    if (editingGame && newRtp > 0 && newRtp <= 100) {
      startServerTransition(async () => {
        const result = await updateGameRtp(editingGame.id, newRtp)
        if (result.success) {
          alert(result.message)
          setEditingGame(null)
          loadGames()
        } else {
          alert(`Error: ${result.message}`)
        }
      })
    } else {
      alert("Invalid RTP value. Must be between 0 and 100.")
    }
  }

  const filteredGames = games.filter(
    (game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.provider.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Manage Games</h2>
        <Dialog
          onOpenChange={(open) => {
            if (!open) addGameState.message = ""
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Game
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Casino Game</DialogTitle>
              <DialogDescription>Fill in the details for the new game.</DialogDescription>
            </DialogHeader>
            <form
              action={async (formData) => {
                await addGameAction(formData)
                // If successful, close dialog and reload games. This part needs careful handling with useFormState.
                // For now, we rely on the user to close or a success message.
                // A better UX would involve closing the dialog automatically on success.
                loadGames() // Reload games after submission
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" name="title" className="col-span-3 bg-gray-700 border-gray-600" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="provider" className="text-right">
                    Provider
                  </Label>
                  <Input id="provider" name="provider" className="col-span-3 bg-gray-700 border-gray-600" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    placeholder="/placeholder.svg?width=100&height=140"
                    className="col-span-3 bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rtp" className="text-right">
                    RTP (%)
                  </Label>
                  <Input
                    id="rtp"
                    name="rtp"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    className="col-span-3 bg-gray-700 border-gray-600"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Input id="category" name="category" className="col-span-3 bg-gray-700 border-gray-600" required />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-700">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-yellow-400 text-black hover:bg-yellow-500" disabled={isPending}>
                  {isPending ? "Adding..." : "Add Game"}
                </Button>
              </DialogFooter>
              {addGameState?.message && (
                <p className={`mt-2 text-sm ${addGameState.success ? "text-green-400" : "text-red-400"}`}>
                  {addGameState.message}
                </p>
              )}
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-md">
        <Search className="text-gray-400" />
        <Input
          type="text"
          placeholder="Search by title or provider..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-0 focus:ring-0 text-white placeholder-gray-500 flex-grow"
        />
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-yellow-400"
          onClick={loadGames}
          disabled={isLoading || isPending}
        >
          <RefreshCw className={`h-5 w-5 ${isLoading || isPending ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-400 py-8">Loading games...</p>
      ) : (
        <div className="overflow-x-auto bg-gray-800 rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-700/30">
                <TableHead className="text-gray-300">Image</TableHead>
                <TableHead className="text-gray-300">Title</TableHead>
                <TableHead className="text-gray-300">Provider</TableHead>
                <TableHead className="text-gray-300">Category</TableHead>
                <TableHead className="text-gray-300 text-right">RTP (%)</TableHead>
                <TableHead className="text-gray-300 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGames.map((game) => (
                <TableRow key={game.id} className="border-gray-700 hover:bg-gray-700/50">
                  <TableCell>
                    <Image
                      src={game.image || "/placeholder.svg?width=50&height=70&query=Game"}
                      alt={game.title}
                      width={50}
                      height={70}
                      className="rounded-sm object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-white">{game.title}</TableCell>
                  <TableCell className="text-gray-400">{game.provider}</TableCell>
                  <TableCell className="text-gray-400">{game.category}</TableCell>
                  <TableCell className="text-right text-white">{game.rtp.toFixed(2)}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-blue-400 border-blue-400/50 hover:bg-blue-400/20 hover:text-blue-300 w-8 h-8"
                      onClick={() => {
                        setEditingGame(game)
                        setNewRtp(game.rtp)
                      }}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-400 border-red-400/50 hover:bg-red-400/20 hover:text-red-300 w-8 h-8"
                      onClick={() => handleRemoveGame(game.id)}
                      disabled={isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredGames.length === 0 && !isLoading && (
            <p className="text-center py-8 text-gray-500">No games found.</p>
          )}
        </div>
      )}

      {editingGame && (
        <Dialog open={!!editingGame} onOpenChange={() => setEditingGame(null)}>
          <DialogContent className="bg-gray-800 border-gray-700 text-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit RTP for {editingGame.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Label htmlFor="rtp-edit">New RTP (%)</Label>
              <Input
                id="rtp-edit"
                type="number"
                value={newRtp}
                onChange={(e) => setNewRtp(Number.parseFloat(e.target.value))}
                step="0.01"
                min="0"
                max="100"
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditingGame(null)}
                className="text-gray-300 border-gray-600 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateRtp}
                className="bg-yellow-400 text-black hover:bg-yellow-500"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save RTP"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
