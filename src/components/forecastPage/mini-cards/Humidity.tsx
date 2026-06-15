import { WeatherUnits, type TUnit } from "@/contexts/unit.context";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    humidity: number;
    dewPoint: number;
    unit: TUnit;
};

export default function Humidity({ unit, className, humidity, dewPoint }: Props) {
    const tempUnit = WeatherUnits[unit].temp;
    return (
        <div className={cn("border border-border/30 shadow-2xs p-4 bg-card flex", className)}>
            <div className="flex w-[40%] justify-between">
                <Metrix humidity={humidity} />
            </div>
            <div className="gap-auto flex grow flex-col justify-start pl-4 text-secondary-foreground xs:gap-1 sm:gap-2">
                <div>
                    <p className="text-sm leading-5">Humidity</p>
                    <span
                        className={cn("text-2xl font-semibold", "text-blue-500")}
                    >{`${humidity}%`}</span>
                </div>
                <div>
                    <p className="text-sm">Dew Point </p>
                    <span className="text-base font-semibold">
                        {dewPoint}
                        {tempUnit}
                    </span>
                </div>
            </div>
        </div>
    );
}

function Metrix({ humidity }: { humidity: number }) {
    return (
        <>
            {Array.from({ length: 4 }).map(function (_, i) {
                return (
                    <div key={i} className="flex h-full w-[22%] flex-col gap-1 rounded-md">
                        <div
                            className="w-full rounded-sm bg-blue-500/20"
                            style={{ height: `${100 - humidity}%` }}
                        ></div>
                        <div
                            className="w-full rounded-sm bg-blue-500"
                            style={{ height: `${humidity}%` }}
                        ></div>
                    </div>
                );
            })}
        </>
    );
}
