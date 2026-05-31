import { useLocationContext } from "@/contexts/location.context";

import CurrentWeatherCard from "../cards/current-weather/CurrentWeatherCard";
import CurrentLocation from "../CurrentLocation";
import Container from "./Container";

export default function Forecast() {
    return (
        <Container>
            <CurrentLocation />

            <div className="lg:grid lg:grid-cols-4">
                <div className="col-span-3">
                    <CurrentWeatherCard />
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
