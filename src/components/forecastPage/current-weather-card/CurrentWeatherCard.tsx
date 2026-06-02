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

    if (isFetching) return <div>Loading...</div>;

    return (
        <div className="rounded-md bg-linear-to-bl from-orange-400 to-orange-100/10 p-2 shadow-2xl sm:p-3 dark:from-blue-500 dark:to-slate-900/10">
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
                        "smmd:col-span-2 smmd:col-start-2 bg-background rounded-md p-3",
                        "mdlg:col-span-1 relative",
                    )}
                >
                    <Time
                        utcTimestampInSeconds={utcTimestampInSeconds}
                        timezone={timezone}
                        className="absolute right-3"
                    />
                    <CurrentWeatherDetails
                        icon={icon!}
                        unitType={unitType}
                        temperature={temperature!}
                        feelsLike={feelsLike!}
                        description={description!}
                    />
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
