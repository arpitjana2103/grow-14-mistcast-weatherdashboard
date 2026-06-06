import type { TLocationData } from "@/schemas/location.schema";

import { createContext, useCallback, useContext, useMemo } from "react";

import { useLocalStorageState } from "@/hooks/useLocalStorage";

const defaultCurrentLocation: TLocationData = {
    place_id: "321245310138",
    lat: "51.5074889",
    lon: "-0.16220741",
    display_name: "Hyde Park, London, United Kingdom",
    display_place: "Hyde Park",
    display_address: "London, United Kingdom",
    address: { country_code: "gb", city: "London", country: "United Kingdom" },
};

const defaultCurrentLatLng: [number, number] = [51.5074889, -0.16220741];

type ContextType = {
    currentLatlng: [number, number];
    currentLocation: TLocationData;
    handleSetCurrentLatlng: (latlng: [number, number]) => void;
    handleSetCurrentLocation: (location: TLocationData, updateCurrentLatLng?: boolean) => void;
};

const LocationContext = createContext<ContextType | null>(null);

type LocationProviderProps = {
    children: React.ReactNode;
};

export const LocationProvider = function ({ children }: LocationProviderProps) {
    const [currentLatlng, setCurrentLatlng] = useLocalStorageState<[number, number]>(
        "currentLatLng",
        defaultCurrentLatLng,
    );
    const [currentLocation, setCurrentLocation] = useLocalStorageState<TLocationData>(
        "currLocation",
        defaultCurrentLocation,
    );

    const handleSetCurrentLocation = useCallback(
        (current: TLocationData, updateCurrentLatLng: boolean = true) => {
            setCurrentLocation(current);
            setCurrentLatlng(function (prev) {
                if (updateCurrentLatLng) return [parseFloat(current.lat), parseFloat(current.lon)];
                return prev;
            });
        },
        [setCurrentLocation, setCurrentLatlng],
    );

    const handleSetCurrentLatlng = useCallback(
        (latlng: [number, number]) => {
            setCurrentLatlng(latlng);
        },
        [setCurrentLatlng],
    );

    const value = useMemo(
        () => ({
            currentLatlng,
            currentLocation,
            handleSetCurrentLatlng,
            handleSetCurrentLocation,
        }),
        [currentLocation, currentLatlng, handleSetCurrentLatlng, handleSetCurrentLocation],
    );

    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};

export const useLocationContext = function () {
    const context = useContext(LocationContext);
    if (context === null) throw new Error("useCities must be used within a LocationProvider");
    return context;
};
