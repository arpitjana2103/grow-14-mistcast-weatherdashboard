import { useLocationContext } from "@/contexts/location.context";
import { useUnitContext } from "@/contexts/unit.context";
import { cn } from "@/lib/utils";
import { useWeatherQuery } from "@/queries/weather.query";

import CurrentWeatherDetails from "./CurrentWeatherDetails";
import ImageOverlay from "./ImageOverlay";
import MiniMap from "./Minimap";
import Time from "./Time";

export default function CurrentWeatherCard() {
    const { currentLocation } = useLocationContext();
    const { unit: unitType } = useUnitContext();
    const { isFetching, data } = useWeatherQuery(
        Number(currentLocation?.lat || 0),
        Number(currentLocation?.lon || 0),
        unitType,
    );

    const icon = data?.current.weather[0].icon;
    const description = data?.current.weather[0].description;
    const temperature = data?.current.temp;
    const feelsLike = data?.current.feels_like;
    const utcTimestampInSeconds = data?.current.dt || 0;
    const timezone = data?.timezone || "";
    const wind_speed = data?.current.wind_speed;
    const wind_deg = data?.current.wind_deg;
    const humidity = data?.current.humidity;
    const visibility = data?.current.visibility;
    const pressure = data?.current.pressure;
    const dewPoint = data?.current.dew_point;

    if (isFetching) return <div>Loading...</div>;

    return (
        <div className="max-w-280 rounded-md bg-linear-to-tr from-orange-200 to-orange-500 p-2 shadow-2xl sm:p-3 dark:from-blue-800 dark:to-blue-400">
            <div
                className={cn(
                    "grid gap-2",
                    "grid-cols-1 grid-rows-2",
                    "sm:gap-3",
                    "md:grid-cols-[15rem_auto_auto]",
                    "lg:h-64 lg:grid-cols-[16rem_auto_16rem] lg:grid-rows-1",
                )}
            >
                <ImageOverlay icon={icon!} className="w-full md:aspect-square" />
                <div
                    className={cn(
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
                        icon={icon!}
                        unitType={unitType}
                        temperature={temperature!}
                        feelsLike={feelsLike!}
                        description={description!}
                        wind_speed={wind_speed!}
                        wind_deg={wind_deg!}
                        humidity={humidity!}
                        visibility={visibility!}
                        pressure={pressure!}
                        dew_point={dewPoint!}
                        className="grow"
                    />
                </div>
                <MiniMap
                    lat={Number(currentLocation?.lat || 0)}
                    lon={Number(currentLocation?.lon || 0)}
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
