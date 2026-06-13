import { Suspense } from "react";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useLocationContext } from "@/contexts/location.context";
import { useUnitContext } from "@/contexts/unit.context";
import { cn } from "@/lib/utils";
import { useWeatherQuery } from "@/queries/weather.query";

import CurrentWeatherDetails from "./CurrentWeatherDetails";
import ImageOverlay from "./ImageOverlay";
import MiniMap from "./Minimap";
import CurrentWeatherSkeleton from "./skeletons/CurrentWeatherSkeleton";
import Time from "./Time";

export default function CurrentWeatherCard({ className }: { className?: string }) {
    const { currentLatlng } = useLocationContext();
    const latlngKey = currentLatlng.join(",");
    return (
        <ErrorBoundary
            fallback={<CurrentWeatherSkeleton className={className} />}
            resetKey={latlngKey}
        >
            <Suspense fallback={<CurrentWeatherSkeleton className={className} />}>
                <CurrentWeatherCardComponent className={className} />
            </Suspense>
        </ErrorBoundary>
    );
}

function CurrentWeatherCardComponent({ className }: { className?: string }) {
    const { currentLatlng } = useLocationContext();
    const [lat, lon] = currentLatlng;
    const { unit: unitType } = useUnitContext();
    const { data: wData } = useWeatherQuery(lat, lon, unitType);

    const icon = wData.current.weather[0].icon;
    const description = wData.current.weather[0].description;
    const temperature = wData.current.temp;
    const feelsLike = wData.current.feels_like;
    const utcTimestampInSeconds = wData.current.dt || 0;
    const timezone = wData.timezone || "";
    const wind_speed = wData.current.wind_speed;
    const wind_deg = wData.current.wind_deg;
    const humidity = wData.current.humidity;
    const visibility = wData.current.visibility;
    const pressure = wData.current.pressure;
    const dewPoint = wData.current.dew_point;

    return (
        <div
            className={cn(
                "rounded-md bg-linear-to-tr from-orange-200 to-orange-500 p-2 shadow-2xl sm:p-3 dark:from-blue-800 dark:to-blue-400",
                className,
            )}
        >
            <div
                className={cn(
                    "w-full",
                    "grid gap-2",
                    "grid-cols-1 grid-rows-2",
                    "sm:gap-3",
                    "md:grid-cols-[15rem_auto_auto]",
                    "lg:h-64 lg:grid-cols-[16rem_auto_16rem] lg:grid-rows-1",
                )}
            >
                <ImageOverlay icon={icon} className="h-full w-full md:aspect-square" />
                <div
                    className={cn(
                        "w-full  min-w-0",
                        "bg-background/95 rounded-md p-3 flex flex-col",
                        "md:col-span-2 md:col-start-2 ",
                        "lg:col-span-1 relative",
                    )}
                >
                    <Time
                        utcTimestampInSeconds={utcTimestampInSeconds}
                        timezone={timezone}
                        className="mb-4"
                    />
                    <CurrentWeatherDetails
                        icon={icon}
                        unitType={unitType}
                        temperature={temperature}
                        feelsLike={feelsLike}
                        description={description}
                        wind_speed={wind_speed}
                        wind_deg={wind_deg}
                        humidity={humidity}
                        visibility={visibility}
                        pressure={pressure}
                        dew_point={dewPoint}
                    />
                </div>
                <MiniMap
                    lat={lat}
                    lon={lon}
                    className={cn(
                        "w-full aspect-square, col-span-3",
                        "lg:col-span-1",
                        "hidden md:block",
                    )}
                />
            </div>
        </div>
    );
}
