import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { NavLink } from "react-router";

import { Button } from "@/components/ui/button";
// import { useTheme } from "@/contexts/theme.context";
import { cn } from "@/lib/utils";

export default function MiniMap({
    lat,
    lon,
    className,
}: {
    lat: number;
    lon: number;
    className?: string;
}) {
    // const { theme } = useTheme();
    const lightMapLayer =
        "https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}@2x.jpg?key=RqBinbOIimuU9Q9zXtXK";
    // const darkMapLayer =
    //     "https://api.maptiler.com/maps/openstreetmap-dark/256/{z}/{x}/{y}@2x.png?key=RqBinbOIimuU9Q9zXtXK";
    // const baseMapLayer = theme === "dark" ? darkMapLayer : lightMapLayer;
    return (
        <div id="miniMap" className={cn("rounded-md overflow-hidden relative", className)}>
            <NavLink to="/map">
                <Button className="absolute top-3 right-3 z-900 w-fit cursor-pointer bg-primary px-2.5 py-4 text-sm font-normal text-foreground hover:bg-primary/95">
                    <span>Open Map</span>{" "}
                    <HugeiconsIcon strokeWidth={2.5} className="h-4 w-4" icon={ArrowRight02Icon} />
                </Button>
            </NavLink>
            <MapContainer
                center={[lat, lon]}
                zoom={7}
                scrollWheelZoom={true}
                className="h-full w-full"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={lightMapLayer}
                />
                <Marker position={[lat, lon]} />
            </MapContainer>
        </div>
    );
}
