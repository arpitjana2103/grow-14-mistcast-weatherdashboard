import type { TUnit } from "@/contexts/unit.context";

import { useSuspenseQuery } from "@tanstack/react-query";

import { getWeather } from "@/services/weather.service";

export function useWeatherQuery(lat: number, lon: number, unit: TUnit) {
    return useSuspenseQuery({
        queryKey: ["weather", lat, lon, unit],
        queryFn: () => getWeather({ lat, lon, unit }),
        staleTime: 1000 * 60 * 5,
    });
}
