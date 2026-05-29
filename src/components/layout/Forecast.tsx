import { useLocationContext } from "@/contexts/location.context";
import { useWeatherQuery } from "@/queries/weather.query";

import CurrentLocation from "../CurrentLocation";
import CurrentWeather from "../CurrentWeather";
import WeatherIcons from "../WeatherIcons";
import Container from "./Container";

export default function Forecast() {
    const { currentLocation } = useLocationContext();
    const { isError, error, isFetching, data } = useWeatherQuery(
        Number(currentLocation?.lat || 0),
        Number(currentLocation?.lon || 0),
    );

    if (isFetching) return <div>Loading...</div>;
    if (isError) {
        return <div>{error.message}</div>;
    }

    return (
        <Container>
            <CurrentLocation />

            <div className="lg:grid lg:grid-cols-4">
                <div className="col-span-3">
                    <CurrentWeather />
                </div>
            </div>

            {/*
                    <CurrentWeather />
                    <MapMini />
                    <DailyHourly />
                    <TemperatureCard />
                    <CloudsCard />
            */}
        </Container>
    );
}
