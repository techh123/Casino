import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-9 w-48 bg-gray-700" />
        <Skeleton className="h-10 w-[180px] bg-gray-700" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[120px] w-full bg-gray-700 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-[400px] w-full bg-gray-700 rounded-lg" />
    </div>
  )
}
