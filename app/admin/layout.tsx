import type React from "react"
import Link from "next/link"
import { BarChart2, LogOut, ShieldCheck, Dice5, UserCog } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const adminNavItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart2 },
  { name: "Games", href: "/admin/games", icon: Dice5 },
  { name: "Users", href: "/admin/users", icon: UserCog },
  // { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <aside className="w-64 bg-gray-800 p-4 space-y-6 flex flex-col fixed top-0 left-0 h-full z-40">
        <Link href="/admin/dashboard" className="flex items-center space-x-2 px-2">
          <Image
            src="/placeholder.svg?width=36&height=36"
            alt="Admin Logo"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="text-xl font-bold text-yellow-400">Admin Panel</span>
        </Link>
        <nav className="flex-grow">
          <ul className="space-y-2">
            {adminNavItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center p-3 space-x-3 rounded-md hover:bg-gray-700 hover:text-yellow-400 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-700">
          <Link
            href="/"
            className="flex items-center p-3 space-x-3 rounded-md hover:bg-gray-700 hover:text-yellow-400 transition-colors"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Back to Casino</span>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start p-3 space-x-3 text-gray-300 hover:bg-red-700 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="sticky top-0 z-30 bg-gray-800/80 backdrop-blur-md shadow-sm h-16 flex items-center px-6 justify-between">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          {/* Add any header specific items here, like user profile for admin */}
        </header>
        <main className="flex-grow p-6 bg-gray-900">{children}</main>
      </div>
    </div>
  )
}
