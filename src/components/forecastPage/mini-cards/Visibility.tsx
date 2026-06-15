import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    visibility: number;
};

function getVisibilityMessage(visibility: number) {
    if (visibility >= 10000) {
        return "Clear conditions with excellent visibility.";
    }

    if (visibility >= 8000) {
        return "Very good visibility across the area.";
    }

    if (visibility >= 5000) {
        return "Good visibility with minor haze.";
    }

    if (visibility >= 2000) {
        return "Moderate visibility, some distant obstruction.";
    }

    if (visibility >= 1000) {
        return "Low visibility, travel with caution.";
    }

    return "Very poor visibility due to conditions.";
}

export default function Visibility({ visibility, className }: Props) {
    return (
        <div
            className={cn(
                "border relative border-border/30 bg-card shadow-2xs p-4 pt-10 flex flex-col justify-between",
                className,
            )}
        >
            <span className="absolute top-4 right-4 text-xs text-secondary-foreground">
                Visibility
            </span>
            <div className="flex h-[50%] flex-col justify-between">
                <div className="mx-auto h-[10%] w-full rounded-full bg-orange-400/25"></div>
                <div className="mx-auto h-[10%] w-[85%] rounded-full bg-orange-400/40"></div>
                <div className="mx-auto h-[10%] w-[70%] rounded-full bg-orange-400/55"></div>
                <div className="mx-auto h-[10%] w-[55%] rounded-full bg-orange-400/70"></div>
                <div className="mx-auto h-[10%] w-[40%] rounded-full bg-orange-400/85"></div>
                <div className="mx-auto h-[10%] w-[25%] rounded-full bg-orange-400"></div>
            </div>
            <div className="flex grow flex-col items-center justify-end gap-[10%] pt-4 text-secondary-foreground">
                <span className="flex items-end gap-1">
                    <span className="text-center text-2xl font-semibold">{visibility}</span>
                    <span className="leading-7">metres</span>
                </span>
                <span className="self-start text-sm">{getVisibilityMessage(visibility)}</span>
            </div>
        </div>
    );
}
