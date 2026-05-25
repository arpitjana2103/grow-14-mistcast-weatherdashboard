import { useLocationContext } from "@/contexts/location.context";
import { useWeatherQuery } from "@/queries/weather.query";

import WeatherIcons from "./WeatherIcons";

export default function CurrentWeather() {
    const { currentLocation } = useLocationContext();
    const { isFetching, data } = useWeatherQuery(
        Number(currentLocation?.lat || 0),
        Number(currentLocation?.lon || 0),
    );

    const icon = data?.current.weather[0].icon;
    const description = data?.current.weather[0].description;
    const temperature = data?.current.temp;

    if (isFetching) return <div>Loading...</div>;

    return (
        <div className="border p-4">
            <div className="w-60">
                <img src={`/images/${icon}.jpg`} alt={`${description}`} />
            </div>
            <div>
                <WeatherIcons type={icon!} size="lg" />
                <span>{temperature}</span>
                <span>{description}</span>
            </div>
        </div>
    );
}
