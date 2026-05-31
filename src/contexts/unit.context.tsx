import type { Dispatch, SetStateAction } from "react";

import { useMemo, useState, createContext, useContext } from "react";

export type TUnit = "metric" | "imperial";

type ContextType = {
    unit: TUnit;
    setUnit: Dispatch<SetStateAction<TUnit>>;
};

const UnitContext = createContext<ContextType | null>(null);

type UnitProviderProps = {
    children: React.ReactNode;
};

export const UnitProvider = function ({ children }: UnitProviderProps) {
    const [unit, setUnit] = useState<TUnit>("metric");

    const value = useMemo(
        function () {
            return { unit, setUnit };
        },
        [unit],
    );

    return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};

export const useUnitContext = function () {
    const context = useContext(UnitContext);
    if (context === null) throw new Error("useUnitContext must be used within a UnitProvider");
    return context;
};

export const WeatherUnits = {
    metric: {
        temp: "°C",
        feels_like: "°C",
        dew_point: "°C",
        pressure: "hPa",
        humidity: "%",
        uvi: "",
        clouds: "%",
        visibility: "m",
        wind_speed: "km/h",
        wind_deg: "°",
        wind_gust: "km/h",
        pop: "%",
        rain: "mm",
        snow: "mm",
    },
    imperial: {
        temp: "°F",
        feels_like: "°F",
        dew_point: "°F",
        pressure: "hPa",
        humidity: "%",
        uvi: "",
        clouds: "%",
        visibility: "m",
        wind_speed: "mph",
        wind_deg: "°",
        wind_gust: "mph",
        pop: "%",
        rain: "mm",
        snow: "mm",
    },
} as const satisfies Record<TUnit, Record<string, string>>;
