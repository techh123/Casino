"use client"

import { useState, useEffect, useTransition, startTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserX, UserCheck, Search, RefreshCw } from "lucide-react"
import { fetchUsers, updateUserStatus, type AdminUser } from "../actions"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPending, startServerTransition] = useTransition()
  const [searchTerm, setSearchTerm] = useState("")

  const loadUsers = () => {
    setIsLoading(true)
    startTransition(() => {
      fetchUsers().then((data) => {
        setUsers(data)
        setIsLoading(false)
      })
    })
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleToggleUserStatus = async (userId: string, currentStatus: "active" | "banned") => {
    const newStatus = currentStatus === "active" ? "banned" : "active"
    const actionVerb = newStatus === "banned" ? "ban" : "unban"
    if (confirm(`Are you sure you want to ${actionVerb} this user?`)) {
      startServerTransition(async () => {
        const result = await updateUserStatus(userId, newStatus)
        if (result.success) {
          alert(result.message)
          loadUsers()
        } else {
          alert(`Error: ${result.message}`)
        }
      })
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Manage Users</h2>
      </div>

      <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-md">
        <Search className="text-gray-400" />
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-0 focus:ring-0 text-white placeholder-gray-500 flex-grow"
        />
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-yellow-400"
          onClick={loadUsers}
          disabled={isLoading || isPending}
        >
          <RefreshCw className={`h-5 w-5 ${isLoading || isPending ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-400 py-8">Loading users...</p>
      ) : (
        <div className="overflow-x-auto bg-gray-800 rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-700/30">
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Joined Date</TableHead>
                <TableHead className="text-gray-300">Last Login</TableHead>
                <TableHead className="text-gray-300 text-right">Wagered (€)</TableHead>
                <TableHead className="text-gray-300 text-right">Won (€)</TableHead>
                <TableHead className="text-gray-300 text-center">Status</TableHead>
                <TableHead className="text-gray-300 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-gray-700 hover:bg-gray-700/50">
                  <TableCell className="font-medium text-white">{user.name}</TableCell>
                  <TableCell className="text-gray-400">{user.email}</TableCell>
                  <TableCell className="text-gray-400">{new Date(user.joinedDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-gray-400">{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right text-white">{user.totalWagered.toFixed(2)}</TableCell>
                  <TableCell className="text-right text-white">{user.totalWon.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={user.status === "active" ? "default" : "destructive"}
                      className={
                        user.status === "active"
                          ? "bg-green-500/20 text-green-300 border-green-500/40"
                          : "bg-red-500/20 text-red-300 border-red-500/40"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {user.status === "active" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-400 border-red-400/50 hover:bg-red-400/20 hover:text-red-300 px-2 py-1 h-auto text-xs"
                        onClick={() => handleToggleUserStatus(user.id, user.status)}
                        disabled={isPending}
                      >
                        <UserX className="mr-1 h-3.5 w-3.5" /> Ban
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-400 border-green-400/50 hover:bg-green-400/20 hover:text-green-300 px-2 py-1 h-auto text-xs"
                        onClick={() => handleToggleUserStatus(user.id, user.status)}
                        disabled={isPending}
                      >
                        <UserCheck className="mr-1 h-3.5 w-3.5" /> Unban
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredUsers.length === 0 && !isLoading && (
            <p className="text-center py-8 text-gray-500">No users found.</p>
          )}
        </div>
      )}
    </div>
  )
}
