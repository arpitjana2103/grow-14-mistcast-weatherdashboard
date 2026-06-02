import CurrentWeatherCard from "../components/forecastPage/current-weather-card/CurrentWeatherCard";
import Container from "../components/layout/Container";
import CurrentLocation from "../components/navbar/CurrentLocation";
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
