import type { Dispatch, SetStateAction } from "react";

import { useMemo, useState, createContext } from "react";

type ContextType = {
    unit: "metric" | "imperial";
    setUnit: Dispatch<SetStateAction<"metric" | "imperial">>;
};

const UnitContext = createContext<ContextType | null>(null);

type UnitProviderProps = {
    children: React.ReactNode;
};

const UnitProvider = function ({ children }: UnitProviderProps) {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");

    const value = useMemo(
        function () {
            return { unit, setUnit };
        },
        [unit],
    );

    return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
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
} as const;

export { UnitContext, UnitProvider };
