import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function DayCardSkeleton() {
    return (
        <div
            className={cn(
                "p-3 xs:p-2.5 bg-background shadow-2xs rounded-md border border-primary/60 w-48 xs:w-44",
            )}
        >
            {/* Image overlay — aspect-square w-full */}
            <Skeleton className="aspect-square w-full rounded-sm" />

            {/* Date line — text-xs mt-2 */}
            <Skeleton className="mt-4 h-3 w-16 rounded" />

            <div className="mt-1 flex flex-col gap-3">
                {/* Weather icon + temp row */}
                <div>
                    <div className="flex items-end gap-2 pb-0.5">
                        {/* WeatherIcon h-8 w-8 */}
                        <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                        {/* temp + feelsLike — text-lg */}
                        <div className="flex items-end gap-2">
                            <Skeleton className="h-5 w-12 rounded" />
                            <Skeleton className="h-4 w-10 rounded" />
                        </div>
                    </div>

                    {/* Description + info icon — text-sm, mt implicit */}
                    <div className="mt-1 flex items-center gap-1">
                        <Skeleton className="h-3 w-28 rounded" />
                        {/* info circle icon ~10px */}
                        <Skeleton className="h-2.5 w-2.5 shrink-0 rounded-full" />
                    </div>
                </div>

                {/* Wind speed + direction arrow — icon 15px + text + arrow 16px */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 shrink-0 rounded" />
                    <Skeleton className="h-3 w-20 rounded" />
                    <Skeleton className="h-4 w-4 shrink-0 rounded" />
                </div>

                {/* Rain chance — icon 15px + text */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 shrink-0 rounded" />
                    <Skeleton className="h-3 w-28 rounded" />
                </div>

                {/* Humidity — icon 15px + text */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 shrink-0 rounded" />
                    <Skeleton className="h-3 w-24 rounded" />
                </div>

                {/* UV Index — icon 15px + text */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 shrink-0 rounded" />
                    <Skeleton className="h-3 w-20 rounded" />
                </div>

                {/* Pressure — icon 14px + text */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-3.5 w-3.5 shrink-0 rounded" />
                    <Skeleton className="h-3 w-28 rounded" />
                </div>
            </div>
        </div>
    );
}
