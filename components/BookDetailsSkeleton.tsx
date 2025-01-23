import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BookDetailsSkeleton() {
  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <Skeleton className="h-[450px] w-full" />
        </div>
        <div className="p-6 md:w-2/3">
          <CardHeader className="px-0">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2 mt-2" />
          </CardHeader>
          <CardContent className="px-0">
            <div className="flex flex-wrap gap-2 mt-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-20" />
              ))}
            </div>
            <Skeleton className="h-24 w-full mt-4" />
            <div className="mt-4 grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
            <div className="mt-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/3 mt-2" />
            </div>
            <div className="mt-6">
              <Skeleton className="h-6 w-1/4" />
              <div className="mt-2 space-y-1">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-5 w-full" />
                ))}
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
