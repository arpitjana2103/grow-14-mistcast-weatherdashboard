import type { TWeatherIcon } from "@/schemas/weather.schema";

import WeatherIcons from "@/components/WeatherIcons";
import { WeatherUnits, type TUnit } from "@/contexts/unit.context";

type Props = {
    icon: TWeatherIcon;
    unitType: TUnit;
    temperature: number;
    feelsLike: number;
    description: string;
};

export default function CurrentWeatherDetails({
    icon,
    unitType,
    temperature,
    feelsLike,
    description,
}: Props) {
    const tempUnit = WeatherUnits[unitType].temp;
    return (
        <div className="flex items-center gap-3 p-2">
            <WeatherIcons
                type={icon}
                strokeWidth={1}
                className="align-end block h-20 w-20 text-primary"
            />
            <span>
                <span className="flex items-end gap-3 border-b-2">
                    <span className="flex items-start gap-1">
                        <span className="text-5xl">{Math.round(temperature)}</span>
                        <span className="text-2xl font-semibold">{tempUnit}</span>
                    </span>
                    <span className="text-2xl">{description}</span>
                </span>
                <span>
                    <span className="block pt-0.5 text-secondary-foreground">
                        Feels like : {Math.round(feelsLike)}
                        {tempUnit}
                    </span>
                </span>
            </span>
        </div>
    );
}
