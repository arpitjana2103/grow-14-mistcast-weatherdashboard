import { Skeleton } from "@/components/ui/skeleton";
import { useLocationContext } from "@/contexts/location.context";
import { useUnitContext } from "@/contexts/unit.context";
import { cn } from "@/lib/utils";
import { useWeatherQuery } from "@/queries/weather.query";

import CurrentWeatherDetails from "./CurrentWeatherDetails";
import ImageOverlay from "./ImageOverlay";
import MiniMap from "./Minimap";
import Time from "./Time";

export default function CurrentWeatherCard() {
    const { currentLatlng } = useLocationContext();
    const [lat, lon] = currentLatlng;
    console.log(lat, lon);
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
        <div className="max-w-280 rounded-md bg-linear-to-tr from-orange-200 to-orange-500 p-2 shadow-2xl sm:p-3 dark:from-blue-800 dark:to-blue-400">
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

export function CurrentWeatherCardSkeleton() {
    console.log("CurrentWeatherCardSkeleton...");
    return (
        <div className="max-w-280 rounded-md bg-linear-to-tr from-orange-200 to-orange-500 p-2 shadow-2xl sm:p-3 dark:from-blue-800 dark:to-blue-400">
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
                {/* ImageOverlay placeholder */}
                <Skeleton className="h-full w-full rounded-md md:aspect-square md:h-full" />

                {/*<ImageOverlay icon={icon} className="h-full w-full md:aspect-square" />*/}
                {/* Center panel — Time + WeatherDetails */}
                <div
                    className={cn(
                        "w-full min-w-0",
                        "bg-background/95 rounded-md p-3 flex flex-col",
                        "md:col-span-2 md:col-start-2",
                        "lg:col-span-1 relative",
                    )}
                >
                    {/* Time: two text-sm rows with mb-4 */}
                    <div className="mb-4 flex flex-col gap-1.5">
                        <Skeleton className="h-5 w-44" />
                        <Skeleton className="h-5 w-36" />
                    </div>

                    {/* CurrentWeatherDetails */}
                    <div className="flex flex-col justify-between gap-6">
                        {/* Icon + temp + description + feels-like */}
                        <div className="flex items-center gap-3">
                            {/* Weather icon h-18/h-20 */}
                            <Skeleton className="h-18 w-18 flex-none rounded-full xs:h-20 xs:w-20" />
                            <span className="flex flex-col gap-1">
                                {/* temp (text-3xl/5xl) + description (text-lg/2xl) on same row */}
                                <div className="flex items-end gap-3">
                                    <Skeleton className="h-10 w-20 xs:h-14 xs:w-24" />
                                    <Skeleton className="h-7 w-24 xs:h-9 xs:w-32" />
                                </div>
                                {/* Feels like (text-sm/base) */}
                                <Skeleton className="h-5 w-32" />
                            </span>
                        </div>

                        {/* Stat chips row — 5 chips in scrollable row */}
                        <div className="flex gap-1 overflow-x-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-14 w-20 flex-none rounded-sm" />
                            ))}
                        </div>
                    </div>
                </div>
                <Skeleton className={cn("w-full col-span-3", "lg:col-span-1", "hidden md:block")} />
            </div>
        </div>
    );
}
