import { Suspense } from "react";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import CurrentWeatherCard, {
    CurrentWeatherCardSkeleton,
} from "@/components/forecastPage/current-weather-card/CurrentWeatherCard";
import { TempChart } from "@/components/forecastPage/hourly-weather-card/TempChart";
import { useLocationContext } from "@/contexts/location.context";

import CurrentLocation from "../components/forecastPage/CurrentLocation";
import Container from "../components/layout/Container";

export default function ForecastPage() {
    const { currentLatlng } = useLocationContext();
    const latlngKey = currentLatlng.join(",");
    return (
        <>
            <main className="pt-4">
                <Container>
                    <CurrentLocation />
                    <div className="xl:grid xl:grid-cols-4 xl:gap-6">
                        <div className="col-span-3">
                            <ErrorBoundary
                                fallback={<CurrentWeatherCardSkeleton />}
                                resetKey={latlngKey}
                            >
                                <Suspense fallback={<CurrentWeatherCardSkeleton />}>
                                    <CurrentWeatherCard />
                                </Suspense>
                            </ErrorBoundary>
                            <div>Daily</div>
                        </div>
                        <div className="bg-amber-200"></div>
                    </div>
                </Container>
            </main>
        </>
    );
}
