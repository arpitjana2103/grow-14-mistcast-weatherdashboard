import { MapContainer, Marker, TileLayer } from "react-leaflet";

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
    return (
        <div id="miniMap" className={cn(className, "rounded-md overflow-hidden")}>
            <MapContainer
                center={[lat, lon]}
                zoom={7}
                scrollWheelZoom={true}
                className="h-full w-full"
                zoomControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lon]} />
            </MapContainer>
        </div>
    );
}
