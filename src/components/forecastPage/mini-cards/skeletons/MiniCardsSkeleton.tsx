import { Skeleton } from "@/components/ui/skeleton";

const CARD_COUNT = 8;

export default function MiniCardsSkeleton() {
    return (
        <div className="mt-12">
            <Skeleton className="h-6 w-64" />
            <div className="mt-4 grid grid-cols-2 grid-rows-5 gap-4 sm:grid-cols-3 sm:grid-rows-none md:grid-cols-4 lg:grid-cols-5 lgxl:grid-cols-6">
                {Array.from({ length: CARD_COUNT }).map((_, i) => (
                    <Skeleton key={i} className="aspect-square w-full rounded-md" />
                ))}
            </div>
        </div>
    );
}
