import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { getWeather } from "@/services/weather.service";

export function useWeatherQuery(lat: number, lon: number) {
    return useQuery({
        queryKey: ["weather", lat, lon],
        queryFn: () => getWeather({ lat, lon }),
        staleTime: 1000 * 60 * 5,
    });
}
