import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { useLocationContext } from "@/contexts/location.context";
import { cn } from "@/lib/utils";
import { useWeatherQuery } from "@/queries/weather.query";
import { getTimeDetails, type TTimeDetails } from "@/utils/time-fn.util";

export default function CurrentWeather() {
    const { currentLocation } = useLocationContext();
    const { isFetching, data } = useWeatherQuery(
        Number(currentLocation?.lat || 0),
        Number(currentLocation?.lon || 0),
    );

    const icon = data?.current.weather[0].icon;
    const description = data?.current.weather[0].description;
    const temperature = data?.current.temp;
    const timeObj = getTimeDetails({
        utcTimestampInSeconds: data?.current.dt || 0,
        timezone: data?.timezone || "",
    });

    if (isFetching) return <div>Loading...</div>;

    return (
        <div className="rounded-md bg-card bg-linear-to-bl from-orange-400 to-orange-100 p-2 shadow-2xl sm:p-3 dark:from-blue-500 dark:to-slate-900/12">
            <div
                className={cn(
                    "grid gap-2 sm:gap-3",
                    "h-124 grid-cols-1 grid-rows-2",
                    "smmd:grid-cols-[15rem_auto_auto] smmd:grid-rows-2",
                    "mdlg:h-64 mdlg:grid-cols-[16rem_auto_16rem] mdlg:grid-rows-1",
                )}
            >
                <ImageOverlay icon={icon!} className="w-full smmd:aspect-square" />
                <div
                    className={cn(
                        "smmd:col-span-2 smmd:col-start-2 bg-background rounded-md p-4",
                        "mdlg:col-span-1",
                    )}
                >
                    <Time timeD />
                </div>
                <MiniMap
                    lat={Number(currentLocation?.lat || 0)}
                    lon={Number(currentLocation?.lon || 0)}
                    className={cn(
                        "w-full aspect-square, col-span-3",
                        "mdlg:col-span-1",
                        "hidden smmd:block",
                    )}
                />
            </div>
        </div>
    );
}

function Time({ timeDetails }: { timeDetails: TTimeDetails }) {
    return <div>TimeDetails</div>;
}

const weatherImageDescription: Record<string, string> = {
    "01d": "Bright crystal clear sky",
    "01n": "Calm starlit clear night",

    "02d": "Sunny skies with clouds",
    "02n": "Cloudy calm night sky",

    "03d": "Soft scattered clouds",
    "03n": "Gentle cloudy evening",

    "04d": "Thick clouds overhead",
    "04n": "Heavy clouds at night",

    "09d": "Passing daytime showers",
    "09n": "Cool rainy night air",

    "10d": "Steady rain all around",
    "10n": "Relaxing nighttime rain",

    "11d": "Thunderstorms on horizon",
    "11n": "Loud stormy night sky",

    "13d": "Fresh snow covering tree",
    "13n": "Silent freezing snowfall",

    "50d": "Mist covering far views",
    "50n": "Foggy low visibility",
} as const;

function ImageOverlay({ icon, className }: { icon: string; className?: string }) {
    return (
        <div className={cn("relative overflow-hidden dark:border-primary rounded-md", className)}>
            {/* Background weather image */}
            <img
                src={`/images/${icon}.jpg`}
                alt={weatherImageDescription[icon]}
                className="absolute inset-0 h-auto w-full object-cover"
            />

            {/* Dark gradient overlay (transparent → black, bottom-heavy) */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0), rgba(255,255,255,0), rgba(0,0,0,0.8))",
                }}
            />

            {/* Content pinned to bottom */}
            <div className="absolute bottom-0 z-10 px-4 py-2.5 text-left text-sm leading-5.5 text-white/95">
                <p>{weatherImageDescription[icon]}</p>
            </div>
        </div>
    );
}

function MiniMap({ lat, lon, className }: { lat: number; lon: number; className?: string }) {
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
