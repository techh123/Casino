import { Skeleton } from "@/components/ui/skeleton"
import { Home, Percent, Dice5, PlayCircle, Trophy, Gamepad2, Gift } from "lucide-react"

const mainNavItems = [
  { name: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
  { name: "Promotions", icon: <Percent className="w-5 h-5" />, href: "/promotions" },
  { name: "Casino Games", icon: <Dice5 className="w-5 h-5" />, href: "/" },
  { name: "Live Casino", icon: <PlayCircle className="w-5 h-5" />, href: "/" },
  { name: "Sport", icon: <Trophy className="w-5 h-5" />, href: "/sport" },
  { name: "Virtual Games", icon: <Gamepad2 className="w-5 h-5" />, href: "#" },
  { name: "Drops & Wins", icon: <Gift className="w-5 h-5" />, href: "/drops-and-wins" },
]

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-[#0f101c] text-gray-300">
      {/* Desktop Sidebar Skeleton */}
      <aside className="w-64 bg-[#1a1b2e] p-4 space-y-6 hidden md:flex flex-col fixed top-0 left-0 h-full z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
            <Skeleton className="h-6 w-28 bg-gray-700" />
          </div>
        </div>
        <nav className="flex-grow overflow-y-auto">
          <ul className="space-y-2">
            {mainNavItems.map((item) => (
              <li key={item.name}>
                <div className="flex items-center p-2 space-x-3 rounded-md">
                  <Skeleton className="h-5 w-5 bg-gray-700" />
                  <Skeleton className="h-4 w-32 bg-gray-700" />
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-700">
          <div className="flex items-center p-2 space-x-3 rounded-md">
            <Skeleton className="h-5 w-5 bg-gray-700" />
            <Skeleton className="h-4 w-24 bg-gray-700" />
          </div>
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Header Skeleton */}
        <header className="sticky top-0 z-30 bg-[#1a1b2e]/80 backdrop-blur-md shadow-sm">
          <div className="hidden md:flex p-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-24 rounded-full bg-gray-700" />
              <Skeleton className="h-8 w-24 rounded-full bg-gray-700" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-8 w-20 bg-gray-700 rounded-md" />
              <Skeleton className="h-8 w-24 bg-gray-700 rounded-md" />
              <Skeleton className="h-8 w-8 bg-gray-700 rounded-full" />
              <Skeleton className="h-8 w-12 bg-gray-700 rounded-full" />
            </div>
          </div>
          <div className="md:hidden p-3 flex items-center justify-between">
            <Skeleton className="h-8 w-8 bg-gray-700 rounded-md" />
            <Skeleton className="h-7 w-28 bg-gray-700" />
            <Skeleton className="h-7 w-20 bg-gray-700 rounded-md" />
          </div>
        </header>

        {/* Drops & Wins Main Content Skeleton */}
        <main className="flex-grow">
          {/* Hero Section Skeleton */}
          <section className="relative h-[400px] sm:h-[450px] md:h-[500px] flex flex-col items-center justify-center text-center p-4">
            <Skeleton className="absolute inset-0 bg-gray-700 opacity-40" />
            <div className="relative z-10 space-y-4">
              <Skeleton className="h-10 w-72 sm:h-12 sm:w-96 bg-gray-600 mx-auto" />
              <Skeleton className="h-8 w-48 sm:h-10 sm:w-64 bg-gray-600 mx-auto" />
              <Skeleton className="h-12 w-64 sm:h-16 sm:w-80 bg-gray-600 mx-auto" />
              <Skeleton className="h-4 w-56 bg-gray-600 mx-auto" />
              <div className="mt-6 flex space-x-4 justify-center">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-16 sm:h-20 sm:w-20 bg-gray-600 rounded-md" />
                ))}
              </div>
              <Skeleton className="h-3 w-80 sm:h-4 sm:w-96 bg-gray-600 mx-auto mt-4" />
            </div>
          </section>

          {/* Tabs Section Skeleton */}
          <section className="p-4 sm:p-6 bg-[#0f101c]">
            <div className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 bg-[#1a1b2e] p-1 rounded-lg mb-4">
              <Skeleton className="h-10 bg-gray-700 rounded-md" />
              <Skeleton className="h-10 bg-gray-700 rounded-md" />
              <Skeleton className="h-10 bg-gray-700 rounded-md" />
            </div>
            <div className="bg-[#1a1b2e] p-4 sm:p-6 rounded-lg space-y-6">
              <Skeleton className="h-8 w-1/3 bg-gray-700" />
              <Skeleton className="h-4 w-1/2 bg-gray-700" />
              <Skeleton className="h-4 w-1/2 bg-gray-700" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-1/4 bg-gray-700" />
                    <Skeleton className="h-4 w-1/4 bg-gray-700" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Participating Games Section Skeleton */}
          <section className="p-4 sm:p-6 bg-[#0f101c]">
            <Skeleton className="h-10 w-1/2 sm:w-1/3 bg-gray-700 mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="bg-[#1a1b2e] rounded-lg overflow-hidden shadow-lg">
                  <Skeleton className="aspect-[3/4] w-full bg-gray-700" />
                  <div className="p-2 sm:p-3">
                    <Skeleton className="h-4 w-3/4 bg-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <footer className="bg-[#1a1b2e] text-gray-400 p-4 sm:p-8 mt-auto">
          <Skeleton className="h-4 w-1/3 mx-auto bg-gray-700" />
        </footer>
      </div>
      <Skeleton className="fixed bottom-6 right-6 w-14 h-14 bg-gray-700 rounded-full" />
    </div>
  )
}
