import { Location01Icon, Time01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect } from "react";
import { NavLink } from "react-router";

import { useLocationContext } from "@/contexts/location.context";
import { useUnitContext, WeatherUnits } from "@/contexts/unit.context";
import { cn, generateAddressStr } from "@/lib/utils";
import { useLocationLatLng } from "@/queries/locations.query";
import { useWeatherQuery } from "@/queries/weather.query";
import { getTimeDetails } from "@/utils/time-fn.util";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import WeatherIcons from "../WeatherIcons";

export default function WeatherCardOnMap({ className }: { className?: string }) {
    const { currentLocation, currentLatlng, handleSetCurrentLocation } = useLocationContext();
    const _address = generateAddressStr(currentLocation);
    const address = _address.substring(0, 50) + (_address.length > 50 ? "..." : "");
    const [lat, lng] = currentLatlng;

    const { data: latLngLocation } = useLocationLatLng([lat, lng]);

    const { unit: unitType } = useUnitContext();
    const { data: weatherData } = useWeatherQuery(lat, lng, unitType);

    const updateCurrentLocation =
        currentLocation.lat !== String(lat) || currentLocation.lon !== String(lng);
    useEffect(
        function () {
            if (updateCurrentLocation) {
                handleSetCurrentLocation(latLngLocation, false);
            }
        },
        [
            lat,
            lng,
            handleSetCurrentLocation,
            latLngLocation,
            currentLocation,
            updateCurrentLocation,
        ],
    );

    const icon = weatherData.current.weather[0].icon;
    const description = weatherData.current.weather[0].description;
    const temperature = weatherData.current.temp;
    const feelsLike = weatherData.current.feels_like;
    const utcTimestampInSeconds = weatherData.current.dt || 0;
    const timezone = weatherData.timezone || "";

    const timeDetails = getTimeDetails({
        utcTimestampInSeconds: utcTimestampInSeconds,
        timezone: timezone,
    });
    const { timezoneOffset, hour12, minute, period } = timeDetails;
    const tempUnit = WeatherUnits[unitType].temp;

    return (
        <div
            className={cn(
                "w-[18rem] rounded-md bg-linear-to-bl to-orange-500 from-orange-200 p-2 shadow-2xl  dark:to-blue-400 dark:from-blue-800",
                className,
            )}
        >
            <div
                className={cn(
                    " dark:bg-slate-50 bg-slate-950 p-3 rounded-md",
                    "animate-[fade-in_0s_ease-out_forwards]",
                )}
            >
                <div className="flex flex-col text-slate-400 dark:text-slate-500">
                    <span className="text-sm">
                        <HugeiconsIcon
                            icon={Time01Icon}
                            className="mr-1 inline w-4 -translate-y-0.5"
                        />
                        {`${hour12}:${minute} ${period.toLocaleLowerCase()} (${timezoneOffset})`}
                    </span>
                    <span className="relative flex gap-2">
                        <span className="text-sm">
                            <HugeiconsIcon
                                icon={Location01Icon}
                                className="absolute mr-1 inline w-4 translate-y-[-0.2rem]"
                            />
                            &#160;&#160;&#160;&#160;&#160;&#160;{address}
                        </span>
                    </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                    <WeatherIcons
                        type={icon}
                        strokeWidth={1}
                        className="align-end block h-12 w-12 text-primary"
                    />
                    <span className="flex flex-col">
                        <span className="border-b border-slate-600 text-lg text-primary dark:border-slate-400">
                            {Math.round(temperature)}
                            {tempUnit}
                        </span>

                        <span className="block pt-0.5 text-base text-slate-400 dark:text-slate-500">
                            {Math.round(feelsLike)}
                            {tempUnit}
                        </span>
                    </span>
                </div>

                <span>
                    <span className="flex items-end gap-3 text-slate-100 dark:text-slate-700">
                        <span className="text-base">{description}</span>
                    </span>
                    <span></span>
                </span>

                <div className="flex justify-end">
                    <NavLink to="/forecast">
                        <Button className="mt-4 w-fit cursor-pointer border-primary bg-primary/10 py-3 text-sm font-normal text-primary hover:bg-primary/20">
                            See Full Forecast
                        </Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export function WeatherCardOnMapSkeleton({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "w-[18rem] rounded-md bg-linear-to-bl to-orange-500 from-orange-200 p-2 shadow-2xl dark:to-blue-400 dark:from-blue-800 ",
                className,
            )}
        >
            <div className="h-[207px] rounded-md bg-slate-950 p-3 dark:bg-slate-50">
                {/* Time row */}
                <div className="flex flex-col gap-2 text-slate-400 dark:text-slate-500">
                    <Skeleton className="h-4 w-40 bg-slate-700 dark:bg-slate-300" />

                    {/* Location row */}
                    <Skeleton className="h-8 w-full bg-slate-700 dark:bg-slate-300" />
                </div>

                {/* Icon + temperature block */}
                <div className="mt-2 flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full bg-slate-700 dark:bg-slate-300" />
                    <span className="flex flex-col gap-1">
                        <Skeleton className="h-6 w-12 bg-slate-700 dark:bg-slate-300" />
                        <Skeleton className="h-6 w-12 bg-slate-700 dark:bg-slate-300" />
                    </span>
                </div>

                {/* Description */}
                <Skeleton className="mt-2 h-6 w-32 bg-slate-700 dark:bg-slate-300" />

                {/* Button */}
                <div className="flex justify-end">
                    <Skeleton className="mt-4 h-8 w-30 rounded-md bg-slate-700 dark:bg-slate-300" />
                </div>
            </div>
        </div>
    );
}
