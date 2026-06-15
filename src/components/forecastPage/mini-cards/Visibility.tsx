import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};

export default function Visibility({ className }: Props) {
    return (
        <div
            className={cn(
                "border relative border-border/30 bg-card shadow-2xs p-4 flex flex-col justify-between",
                className,
            )}
        >
            <div className="flex h-[60%] flex-col justify-between">
                <div className="mx-auto h-[10%] w-full rounded-full bg-orange-400/25"></div>
                <div className="mx-auto h-[10%] w-[85%] rounded-full bg-orange-400/40"></div>
                <div className="mx-auto h-[10%] w-[70%] rounded-full bg-orange-400/55"></div>
                <div className="mx-auto h-[10%] w-[55%] rounded-full bg-orange-400/70"></div>
                <div className="mx-auto h-[10%] w-[40%] rounded-full bg-orange-400/85"></div>
                <div className="mx-auto h-[10%] w-[25%] rounded-full bg-orange-400"></div>
            </div>
        </div>
    );
}
