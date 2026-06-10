import type { TLocationData } from "@/schemas/location.schema";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import sleepQuery from "@/utils/sleep-query.util";

import { getLocationByLatLon, searchLocations } from "../services/location.service";

export function useLocationSearchQuery(query: string) {
    return useQuery<TLocationData[]>({
        queryKey: ["locations", query],
        queryFn: async function ({ signal }) {
            await sleepQuery(1000 * 1, signal);
            return searchLocations(query);
        },
        enabled: query.length > 0,
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
}

export function useLocationLatLng([lat, lng]: [number, number]) {
    return useSuspenseQuery<TLocationData>({
        queryKey: ["location", lat, lng],
        queryFn: () => getLocationByLatLon(lat, lng),
        staleTime: 1000 * 60 * 10,
        retry: false,
    });
}
