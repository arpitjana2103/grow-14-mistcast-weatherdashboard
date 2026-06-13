import { Skeleton } from "@/components/ui/skeleton";

export default function TempChartSkeleton() {
    const VISIBLE_COLS = 12;
    return (
        <div className="w-full max-w-280 rounded-md border border-border/30 bg-slate-100 p-4 shadow-2xs dark:bg-slate-900">
            {/* Header row: label + nav buttons */}
            <div className="mb-4 flex w-full items-center justify-between">
                <Skeleton className="h-4 w-52" />
                <div className="flex gap-1">
                    <Skeleton className="h-8 w-9 rounded-sm" />
                    <Skeleton className="h-8 w-9 rounded-sm" />
                </div>
            </div>

            {/* Chart area — mirrors the scrollable ChartContainer h-108 + bottom: 65 margin */}
            <div className="relative w-full overflow-x-hidden">
                {/* Inner container width matches 12 cols × 60px each */}
                <div style={{ minWidth: `${VISIBLE_COLS * 60}px` }}>
                    {/* Y-axis + chart body */}
                    <div className="flex h-86.5 items-end gap-0">
                        {/* Y-axis placeholder: 5 ticks */}
                        <div className="flex w-8 flex-col justify-between self-stretch py-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-3 w-7" />
                            ))}
                        </div>

                        {/* Chart columns — vertical bars mimicking the area chart */}
                        <div className="bg-red mb-2 ml-3.5 flex flex-1 items-end gap-0 self-stretch px-1">
                            <Skeleton className="h-full w-full" />
                        </div>
                    </div>

                    {/* X-axis custom tick zone: icon + date + time + temp — matches bottom margin 65px + foreignObject height */}
                    <div className="mt-2 flex" style={{ paddingLeft: "2rem" }}>
                        {Array.from({ length: VISIBLE_COLS }).map((_, i) => (
                            <div key={i} className="flex flex-1 flex-col items-center gap-1 px-0.5">
                                {/* Weather icon */}
                                <Skeleton className="h-8 w-8 rounded-full" />
                                {/* Day/date label */}
                                <Skeleton className="h-3 w-10" />
                                {/* Time label */}
                                <Skeleton className="h-3 w-12" />
                                {/* Temp / feels-like */}
                                <Skeleton className="h-3 w-14" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
