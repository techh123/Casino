import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-9 w-48 bg-gray-700" />
        <Skeleton className="h-10 w-36 bg-gray-700" />
      </div>
      <Skeleton className="h-12 w-full bg-gray-700" /> {/* Search bar */}
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full bg-gray-700 rounded-md" />
        ))}
      </div>
    </div>
  )
}
