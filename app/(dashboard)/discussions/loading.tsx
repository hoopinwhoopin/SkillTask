import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

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

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-[200px]" />
          </div>

          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-[70%]" />
                      <Skeleton className="h-6 w-[80px]" />
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-[90%] mb-3" />
                    <div className="flex flex-wrap gap-2">
                      {Array(3)
                        .fill(0)
                        .map((_, j) => (
                          <Skeleton key={j} className="h-6 w-[60px]" />
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-[40px]" />
                      <Skeleton className="h-4 w-[40px]" />
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>

        <div className="md:w-1/4 space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[120px]" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-6 w-[80px]" />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
