import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <Skeleton className="h-10 w-[250px] mb-2" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="space-y-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 bg-muted p-6 flex flex-col justify-center">
                  <Skeleton className="h-8 w-[80%] mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-6 w-[60px]" />
                </div>
                <div className="md:w-3/4 p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-[60px]" />
                        <Skeleton className="h-4 w-[40px]" />
                      </div>
                      <Skeleton className="h-2 w-full" />
                    </div>

                    <div className="flex flex-wrap gap-6">
                      <Skeleton className="h-4 w-[120px]" />
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>

                    <Skeleton className="h-10 w-[150px]" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}
