import type { TWeatherIcon } from "@/schemas/weather.schema";

import { cn } from "@/lib/utils";

const weatherImageDescription = {
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
} as const satisfies Record<TWeatherIcon, string>;

export default function ImageOverlay({
    icon,
    className,
}: {
    icon: TWeatherIcon;
    className?: string;
}) {
    return (
        <div className={cn("relative overflow-hidden dark:border-primary rounded-md", className)}>
            {/* Background weather image */}
            <img
                src={`/images/${icon}.jpg`}
                alt={weatherImageDescription[icon]}
                className="absolute inset-0 h-full w-full object-cover"
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
