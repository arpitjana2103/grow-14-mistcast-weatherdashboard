import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";

import { cn } from "@/lib/utils";

export function LeafletMap({
    lat,
    lon,
    className,
}: {
    lat: number;
    lon: number;
    className?: string;
}) {
    return (
        <div className={cn("rounded-md overflow-hidden", className)}>
            <MapContainer
                center={[lat, lon]}
                zoom={6}
                scrollWheelZoom={true}
                className="h-full w-full"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lon]} />
                <ZoomControl position="topright" />
            </MapContainer>
        </div>
    );
}
