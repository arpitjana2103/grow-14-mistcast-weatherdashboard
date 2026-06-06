import type { TUnit } from "@/contexts/unit.context";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { getWeather } from "@/services/weather.service";

export function useWeatherQuery(lat: number, lon: number, unit: TUnit) {
    return useSuspenseQuery({
        queryKey: ["weather", { lat, lon }, unit],
        queryFn: () => getWeather({ lat, lon, unit }),
        // queryFn: () => getWeather({ lat, lon, unit }),
        retry: false,
        staleTime: 1000 * 60 * 60 * 10,
    });
}

export function useWeatherQuery2(lat: number, lon: number, unit: TUnit) {
    return useQuery({
        queryKey: ["weather", { lat, lon }, unit],
        queryFn: () => getWeather({ lat, lon, unit }),
        // queryFn: () => getWeather({ lat, lon, unit }),
        retry: false,
    });
}
