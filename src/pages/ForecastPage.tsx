import CurrentWeatherCard from "../components/forecastPage/current-weather-card/CurrentWeatherCard";
import CurrentLocation from "../components/forecastPage/CurrentLocation";
import Container from "../components/layout/Container";
import NavBar from "../components/navbar/NavBar";

export default function ForecastPage() {
    return (
        <>
            <NavBar />
            <main>
                <Container>
                    <CurrentLocation />
                    <div className="lg:grid lg:grid-cols-4">
                        <div className="col-span-3">
                            <CurrentWeatherCard />
                        </div>
                    </div>
                </Container>
            </main>
        </>
    );
}
