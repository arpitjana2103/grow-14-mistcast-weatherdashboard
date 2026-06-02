import { cn } from "@/lib/utils";

import { LeafletMap } from "./LeafletMap";
import WeatherCardOnMap from "./WeatherCardOnMap";

export default function MapLayout({ className }: { className?: string }) {
    return (
        <div className={cn("relative", className)}>
            <LeafletMap lat={22} lon={56} className={cn("w-full h-full")} />
            <WeatherCardOnMap className="absolute top-5 left-5 z-1000" />
        </div>
    );
}
