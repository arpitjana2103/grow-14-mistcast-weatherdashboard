import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export default function Spinner({ className }: { className?: string }) {
    return (
        <div>
            <LoaderCircle className={cn("animate-spin", className)} size={18} strokeWidth={2} />
        </div>
    );
}
