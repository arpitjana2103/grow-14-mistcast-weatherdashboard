import type { TUnit } from "@/contexts/unit.context";

import { useUnitContext } from "@/contexts/unit.context";
import { cn } from "@/lib/utils";

type Props = {
    mapType: string;
    className?: string;
};

export default function MapLegend({ mapType, className }: Props) {
    const { unit } = useUnitContext();

    const layerVariants = mapTypeData[mapType];
    const data = layerVariants[unit];

    const maxValue = Math.abs(data.stops[data.stops.length - 1].value);
    const minValue = data.stops[0].value;
    const range = maxValue - minValue || 1;

    const gradientStops = data.stops
        .map((stop) => `${stop.color} ${((stop.value - minValue) / range) * 100}%`)
        .join(", ");

    return (
        <div
            className={cn(
                "flex w-48 flex-col gap-1 rounded-xl bg-background/50 px-4 py-3 shadow-lg xs:w-96",
                className,
            )}
        >
            <h3 className="text-sm text-foreground">{data.title}</h3>
            <div
                className="h-2 w-full rounded-xl border border-accent/70"
                style={{
                    background: `linear-gradient(to right, ${gradientStops})`,
                }}
            />
            <div className="flex justify-between text-xs text-foreground">
                <span>
                    {data.stops[0].value} {data.unit}
                </span>
                <span>
                    {data.stops[data.stops.length - 1].value} {data.unit}
                </span>
            </div>
        </div>
    );
}

type ColorStop = {
    value: number;
    color: string;
};

type LayerData = {
    title: string;
    unit: string;
    stops: ColorStop[];
};

type MapTypeEntry = Record<TUnit, LayerData>;

// Helper: °C → °F conversion for stop values
function cToF(c: number): number {
    return Math.round(((c * 9) / 5 + 32) * 10) / 10;
}

// Helper: m/s → mph
function msToMph(ms: number): number {
    return Math.round(ms * 2.23694 * 10) / 10;
}

const mapTypeData: Record<string, MapTypeEntry> = {
    precipitation_new: {
        metric: {
            title: "Rain (mm)",
            unit: "mm",
            stops: [
                { value: 0, color: "rgba(225, 200, 100, 0)" },
                { value: 0.1, color: "rgba(200, 150, 150, 0)" },
                { value: 0.2, color: "rgba(150, 150, 170, 0)" },
                { value: 0.5, color: "rgba(120, 120, 190, 0)" },
                { value: 1, color: "rgba(110, 110, 205, 0.3)" },
                { value: 10, color: "rgba(80, 80, 225, 0.7)" },
                { value: 140, color: "rgba(20, 20, 255, 0.9)" },
            ],
        },
        imperial: {
            title: "Rain (in)",
            unit: "in",
            stops: [
                { value: 0, color: "rgba(225, 200, 100, 0)" },
                { value: 0, color: "rgba(200, 150, 150, 0)" },
                { value: 0.01, color: "rgba(150, 150, 170, 0)" },
                { value: 0.02, color: "rgba(120, 120, 190, 0)" },
                { value: 0.04, color: "rgba(110, 110, 205, 0.3)" },
                { value: 0.39, color: "rgba(80, 80, 225, 0.7)" },
                { value: 5.51, color: "rgba(20, 20, 255, 0.9)" },
            ],
        },
    },
    temp_new: {
        metric: {
            title: "Temperature (°C)",
            unit: "°C",
            stops: [
                { value: -65, color: "rgba(130, 22, 146, 1)" },
                { value: -55, color: "rgba(130, 22, 146, 1)" },
                { value: -45, color: "rgba(130, 22, 146, 1)" },
                { value: -40, color: "rgba(130, 22, 146, 1)" },
                { value: -30, color: "rgba(130, 87, 219, 1)" },
                { value: -20, color: "rgba(32, 140, 236, 1)" },
                { value: -10, color: "rgba(32, 196, 232, 1)" },
                { value: 0, color: "rgba(35, 221, 221, 1)" },
                { value: 10, color: "rgba(194, 255, 40, 1)" },
                { value: 20, color: "rgba(255, 240, 40, 1)" },
                { value: 25, color: "rgba(255, 194, 40, 1)" },
                { value: 30, color: "rgba(252, 128, 20, 1)" },
            ],
        },
        imperial: {
            title: "Temperature (°F)",
            unit: "°F",
            stops: [
                { value: cToF(-65), color: "rgba(130, 22, 146, 1)" },
                { value: cToF(-55), color: "rgba(130, 22, 146, 1)" },
                { value: cToF(-45), color: "rgba(130, 22, 146, 1)" },
                { value: cToF(-40), color: "rgba(130, 22, 146, 1)" },
                { value: cToF(-30), color: "rgba(130, 87, 219, 1)" },
                { value: cToF(-20), color: "rgba(32, 140, 236, 1)" },
                { value: cToF(-10), color: "rgba(32, 196, 232, 1)" },
                { value: cToF(0), color: "rgba(35, 221, 221, 1)" },
                { value: cToF(10), color: "rgba(194, 255, 40, 1)" },
                { value: cToF(20), color: "rgba(255, 240, 40, 1)" },
                { value: cToF(25), color: "rgba(255, 194, 40, 1)" },
                { value: cToF(30), color: "rgba(252, 128, 20, 1)" },
            ],
        },
    },
    clouds_new: {
        // Clouds are always %, same for both units
        metric: {
            title: "Clouds (%)",
            unit: "%",
            stops: [
                { value: 0, color: "rgba(255, 255, 255, 0.0)" },
                { value: 10, color: "rgba(253, 253, 255, 0.1)" },
                { value: 20, color: "rgba(252, 251, 255, 0.2)" },
                { value: 30, color: "rgba(250, 250, 255, 0.3)" },
                { value: 40, color: "rgba(249, 248, 255, 0.4)" },
                { value: 50, color: "rgba(247, 247, 255, 0.5)" },
                { value: 60, color: "rgba(246, 245, 255, 0.75)" },
                { value: 70, color: "rgba(244, 244, 255, 1)" },
                { value: 80, color: "rgba(243, 242, 255, 1)" },
                { value: 90, color: "rgba(242, 241, 255, 1)" },
                { value: 100, color: "rgba(240, 240, 255, 1)" },
            ],
        },
        imperial: {
            title: "Clouds (%)",
            unit: "%",
            stops: [
                { value: 0, color: "rgba(255, 255, 255, 0.0)" },
                { value: 10, color: "rgba(253, 253, 255, 0.1)" },
                { value: 20, color: "rgba(252, 251, 255, 0.2)" },
                { value: 30, color: "rgba(250, 250, 255, 0.3)" },
                { value: 40, color: "rgba(249, 248, 255, 0.4)" },
                { value: 50, color: "rgba(247, 247, 255, 0.5)" },
                { value: 60, color: "rgba(246, 245, 255, 0.75)" },
                { value: 70, color: "rgba(244, 244, 255, 1)" },
                { value: 80, color: "rgba(243, 242, 255, 1)" },
                { value: 90, color: "rgba(242, 241, 255, 1)" },
                { value: 100, color: "rgba(240, 240, 255, 1)" },
            ],
        },
    },
    pressure_new: {
        // Pressure is hPa for both (OWM tiles use Pa internally but display is hPa / same in both systems)
        metric: {
            title: "Pressure (hPa)",
            unit: "hPa",
            stops: [
                { value: 940, color: "rgba(0, 115, 255, 1)" },
                { value: 960, color: "rgba(0, 170, 255, 1)" },
                { value: 980, color: "rgba(75, 208, 214, 1)" },
                { value: 1000, color: "rgba(141, 231, 199, 1)" },
                { value: 1010, color: "rgba(176, 247, 32, 1)" },
                { value: 1020, color: "rgba(240, 184, 0, 1)" },
                { value: 1040, color: "rgba(251, 85, 21, 1)" },
                { value: 1060, color: "rgba(243, 54, 59, 1)" },
                { value: 1080, color: "rgba(198, 0, 0, 1)" },
            ],
        },
        imperial: {
            title: "Pressure (hPa)",
            unit: "hPa",
            stops: [
                { value: 940, color: "rgba(0, 115, 255, 1)" },
                { value: 960, color: "rgba(0, 170, 255, 1)" },
                { value: 980, color: "rgba(75, 208, 214, 1)" },
                { value: 1000, color: "rgba(141, 231, 199, 1)" },
                { value: 1010, color: "rgba(176, 247, 32, 1)" },
                { value: 1020, color: "rgba(240, 184, 0, 1)" },
                { value: 1040, color: "rgba(251, 85, 21, 1)" },
                { value: 1060, color: "rgba(243, 54, 59, 1)" },
                { value: 1080, color: "rgba(198, 0, 0, 1)" },
            ],
        },
    },
    wind_new: {
        metric: {
            title: "Wind (m/s)",
            unit: "m/s",
            stops: [
                { value: 1, color: "rgba(255, 255, 255, 0)" },
                { value: 5, color: "rgba(238, 206, 206, 0.4)" },
                { value: 15, color: "rgba(179, 100, 188, 0.7)" },
                { value: 25, color: "rgba(63, 33, 59, 0.8)" },
                { value: 50, color: "rgba(116, 76, 172, 0.9)" },
                { value: 100, color: "rgba(70, 0, 175, 1)" },
                { value: 200, color: "rgba(13, 17, 38, 1)" },
            ],
        },
        imperial: {
            title: "Wind (mph)",
            unit: "mph",
            stops: [
                { value: msToMph(1), color: "rgba(255, 255, 255, 0)" },
                { value: msToMph(5), color: "rgba(238, 206, 206, 0.4)" },
                { value: msToMph(15), color: "rgba(179, 100, 188, 0.7)" },
                { value: msToMph(25), color: "rgba(63, 33, 59, 0.8)" },
                { value: msToMph(50), color: "rgba(116, 76, 172, 0.9)" },
                { value: msToMph(100), color: "rgba(70, 0, 175, 1)" },
                { value: msToMph(200), color: "rgba(13, 17, 38, 1)" },
            ],
        },
    },
};
