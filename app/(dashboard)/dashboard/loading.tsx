import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container py-8 space-y-8">
      <div>
        <Skeleton className="h-10 w-[250px] mb-2" />
        <Skeleton className="h-4 w-[350px]" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[80px] mb-2" />
                <Skeleton className="h-4 w-[120px]" />
              </CardContent>
            </Card>
          ))}
      </div>

      <div>
        <Skeleton className="h-10 w-full mb-6" />
        <Card>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3 lg:border-r p-6">
              <Skeleton className="h-8 w-[200px] mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-[80%] mb-6" />
              <Skeleton className="h-8 w-full mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-10 w-[120px]" />
                <Skeleton className="h-10 w-[120px]" />
              </div>
            </div>
            <div className="lg:w-1/3 p-6">
              <Skeleton className="h-6 w-[80%] mb-4" />
              <div className="space-y-3">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-[80%]" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
