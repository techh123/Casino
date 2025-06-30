import { Skeleton } from "@/components/ui/skeleton"

const sidebarTopIcons = [
  { name: "Home" },
  { name: "Live" },
  { name: "Favorites" },
  { name: "My Bets" },
  { name: "Search" },
]
const featuredLeaguesSkel = [1, 2, 3]
const sportsListSkel = Array(7).fill(0)
const highlightedMatchesSkel = Array(4).fill(0)
const popularSportsTabsSkel = Array(10).fill(0)
const eventsTableSkel = Array(3).fill(0)

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-[#16181c] text-gray-300">
      {/* Desktop Sidebar Skeleton */}
      <aside className="w-60 bg-[#1e2024] p-0 fixed top-0 left-0 h-full z-40 flex flex-col text-sm hidden md:flex">
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700 shrink-0">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-md bg-gray-700" />
            <Skeleton className="h-5 w-24 bg-gray-700" />
          </div>
          <Skeleton className="h-6 w-6 bg-gray-700" />
        </div>
        <nav className="flex items-center justify-around py-2 border-b border-gray-700 shrink-0">
          {sidebarTopIcons.map((_, index) => (
            <Skeleton key={index} className="h-6 w-6 bg-gray-700 rounded" />
          ))}
        </nav>
        <div className="flex-grow p-3 space-y-2 overflow-y-auto">
          {featuredLeaguesSkel.map((_, index) => (
            <div key={index} className="flex items-center space-x-2 p-1.5">
              <Skeleton className="h-5 w-5 rounded-full bg-gray-700" />
              <div className="space-y-1">
                <Skeleton className="h-2.5 w-24 bg-gray-700" />
                <Skeleton className="h-3 w-32 bg-gray-700" />
              </div>
            </div>
          ))}
          <div className="p-3 flex items-center border-t border-b border-gray-700 my-2">
            <Skeleton className="h-7 w-20 bg-gray-700 rounded-md" />
            <Skeleton className="h-7 w-20 bg-gray-700 rounded-md ml-2" />
            <Skeleton className="h-5 w-5 bg-gray-700 ml-1" />
          </div>
          {sportsListSkel.map((_, index) => (
            <div key={index} className="flex items-center justify-between p-2">
              <div className="flex items-center space-x-2.5">
                <Skeleton className="h-4 w-4 bg-gray-700" />
                <Skeleton className="h-3 w-20 bg-gray-700" />
              </div>
              <div className="flex items-center space-x-1.5">
                <Skeleton className="h-4 w-6 bg-gray-700 rounded-sm" />
                <Skeleton className="h-3 w-3 bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <div className="flex-1 md:ml-60 flex flex-col">
        <header className="sticky top-0 z-30 bg-[#1e2024]/90 backdrop-blur-sm shadow-sm h-16 flex items-center px-4">
          <div className="hidden md:flex flex-1 items-center justify-between">
            <div className="flex items-center space-x-1">
              <Skeleton className="h-8 w-24 bg-gray-700 rounded-md" />
              <Skeleton className="h-8 w-24 bg-gray-700 rounded-md" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-7 w-16 bg-gray-700 rounded-md" />
              <Skeleton className="h-7 w-20 bg-gray-700 rounded-md" />
              <Skeleton className="h-7 w-7 bg-gray-700 rounded-full" />
              <Skeleton className="h-7 w-10 bg-gray-700 rounded-md" />
            </div>
          </div>
          <div className="md:hidden flex flex-1 items-center justify-between">
            <Skeleton className="h-7 w-7 bg-gray-700" />
            <Skeleton className="h-7 w-28 bg-gray-700" />
            <Skeleton className="h-7 w-20 bg-gray-700 rounded-md" />
          </div>
        </header>

        <main className="flex-grow p-3 sm:p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-32 bg-gray-700 rounded-md" />
            <Skeleton className="h-8 w-36 bg-gray-700 rounded-md" />
          </div>
          <div className="flex space-x-3 overflow-hidden pb-3">
            {highlightedMatchesSkel.map((_, index) => (
              <Skeleton key={index} className="bg-[#2a2d33] rounded-lg p-3 w-[240px] h-[130px] shrink-0 space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-2/3 bg-gray-600" />
                  <Skeleton className="h-3 w-1/4 bg-gray-600" />
                </div>
                <Skeleton className="h-4 w-1/2 bg-gray-600" />
                <Skeleton className="h-4 w-1/2 bg-gray-600" />
                <div className="grid grid-cols-3 gap-1 pt-1">
                  <Skeleton className="h-6 bg-gray-600 rounded" />
                  <Skeleton className="h-6 bg-gray-600 rounded" />
                  <Skeleton className="h-6 bg-gray-600 rounded" />
                </div>
              </Skeleton>
            ))}
          </div>
          <div className="bg-[#1e2024] p-0 rounded-lg">
            <div className="flex items-center space-x-2 p-3 border-b border-gray-700/50">
              <Skeleton className="h-5 w-5 bg-gray-700 rounded-full" />
              <Skeleton className="h-4 w-20 bg-gray-700" />
            </div>
            <div className="flex space-x-1 p-3 mb-2 overflow-hidden">
              {popularSportsTabsSkel.map((_, index) => (
                <Skeleton key={index} className="h-7 w-20 bg-gray-700 rounded-full shrink-0" />
              ))}
            </div>
            <div className="overflow-x-auto p-2">
              {eventsTableSkel.map((_, rowIndex) => (
                <div key={rowIndex} className="flex items-start space-x-2 py-2 border-b border-gray-700/30">
                  <div className="w-1/3 space-y-1">
                    <Skeleton className="h-3 w-3/4 bg-gray-600" />
                    <Skeleton className="h-3 w-1/2 bg-gray-600" />
                    <Skeleton className="h-3 w-1/2 bg-gray-600" />
                  </div>
                  <Skeleton className="h-16 w-1/6 bg-gray-700 rounded" />
                  <Skeleton className="h-16 w-1/6 bg-gray-700 rounded" />
                  <Skeleton className="h-16 w-1/6 bg-gray-700 rounded" />
                  <Skeleton className="h-16 w-1/6 bg-gray-700 rounded" />
                </div>
              ))}
            </div>
          </div>
        </main>
        <Skeleton className="h-10 bg-[#1e2024] border-t border-gray-700/50" />
      </div>
      <Skeleton className="fixed bottom-4 right-4 md:right-[340px] lg:right-[360px] z-40 bg-[#2a2d33] p-3 rounded-lg shadow-xl w-72 h-32" />
      <Skeleton className="fixed bottom-4 right-4 z-40 h-12 w-48 bg-yellow-400 rounded-full" />
    </div>
  )
}
