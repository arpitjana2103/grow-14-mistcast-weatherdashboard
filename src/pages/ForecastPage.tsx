import CurrentWeatherCard from "@/components/forecastPage/current-weather-card/CurrentWeatherCard";
import Charts from "@/components/forecastPage/hourly-weather-card/Charts";

import CurrentLocation from "../components/forecastPage/CurrentLocation";
import Container from "../components/layout/Container";

export default function ForecastPage() {
    return (
        <>
            <main className="pt-4">
                <Container>
                    <CurrentLocation />
                    <div className="xl:grid xl:grid-cols-4 xl:gap-6">
                        <div className="col-span-3">
                            <CurrentWeatherCard />
                            <Charts />
                            <div>Daily</div>
                        </div>
                        <div className="bg-amber-200"></div>
                    </div>
                </Container>
            </main>
        </>
    );
}
