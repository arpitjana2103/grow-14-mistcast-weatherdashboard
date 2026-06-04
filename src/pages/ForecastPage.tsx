import CurrentWeatherCard from "../components/forecastPage/current-weather-card/CurrentWeatherCard";
import CurrentLocation from "../components/forecastPage/CurrentLocation";
import Container from "../components/layout/Container";

export default function ForecastPage() {
    return (
        <>
            <main>
                <Container>
                    <CurrentLocation />
                    <div className="xl2xl:grid xl2xl:grid-cols-4 xl2xl:gap-4">
                        <div className="col-span-3">
                            <CurrentWeatherCard />
                            <div>Hourly</div>
                            <div>Daily</div>
                        </div>
                        <div className="bg-amber-200">Blocks 01</div>
                    </div>
                </Container>
            </main>
        </>
    );
}
