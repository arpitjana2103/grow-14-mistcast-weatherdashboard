import { FullScreenIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef } from "react";

import { useLocalStorageState } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";

import { LeafletMap } from "./LeafletMap";
import MapLayerControl, { type TMapLayers } from "./MapLayerControl";
import MapLegend from "./MapLegend";
import WeatherCardOnMap from "./WeatherCardOnMap";

export default function MapLayout({ className }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentlayer, setCurrentLayer] = useLocalStorageState<TMapLayers>("mapLayer", "search");
    // const [currentlayer, setCurrentLayer] = useState<TMapLayers>("search");

    function onSelectLayer(layer: TMapLayers) {
        setCurrentLayer(layer);
    }

    const toggleFullscreen = async function () {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            await containerRef.current.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    };

    return (
        <div ref={containerRef} className={cn("relative", className)}>
            <LeafletMap className={cn("w-full h-full")} mapLayer={currentlayer} />
            <div className="absolute top-5 left-5 z-1000 flex flex-col items-start gap-3">
                <WeatherCardOnMap />
                <MapLayerControl currentlayer={currentlayer} onSelectLayer={onSelectLayer} />
            </div>
            {currentlayer !== "search" && (
                <MapLegend mapType={currentlayer} className="absolute bottom-5 left-5 z-1000" />
            )}
            <button
                className="absolute top-24 right-5 z-1000 cursor-pointer rounded-sm bg-background p-2 shadow-lg transition-colors hover:bg-background/80"
                onClick={toggleFullscreen}
            >
                <HugeiconsIcon icon={FullScreenIcon} strokeWidth={2} size={18} />
            </button>
        </div>
    );
}
