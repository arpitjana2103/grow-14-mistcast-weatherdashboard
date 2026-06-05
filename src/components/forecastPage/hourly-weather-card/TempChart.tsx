"use client";

import { Clock01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { useLocationContext } from "@/contexts/location.context";
import { useUnitContext } from "@/contexts/unit.context";
import { useWeatherQuery } from "@/queries/weather.query";
import { getTimeDetails } from "@/utils/time-fn.util";

const CustomToolTip = function ({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border bg-white p-3 shadow-md">
            <p className="font-semibold">{label}</p>
            {payload.map((entry: any) => (
                <p key={entry.dataKey} style={{ color: entry.color }}>
                    {entry.name}: {entry.value}°
                </p>
            ))}
        </div>
    );
};

// Custom tick renders a HugeIcon above the tick value
const CustomXTick = ({ x, y, payload, hourlyDataMap }: any) => {
    const ISOKey = payload.value;
    const hourData = hourlyDataMap.get(ISOKey);

    const iconSize = 16;
    return (
        <g transform={`translate(${x},${y})`}>
            <foreignObject
                x={-iconSize / 2}
                y={2}
                width={iconSize}
                height={iconSize}
                style={{ overflow: "visible" }}
            >
                <HugeiconsIcon
                    icon={Clock01Icon}
                    size={iconSize}
                    strokeWidth={1.5}
                    color="currentColor"
                />
            </foreignObject>
            <text
                x={0}
                y={iconSize + 14}
                textAnchor="middle"
                fill="currentColor"
                fontSize={11}
                opacity={0.7}
            >
                {hourData.timeData.hour24} {hourData.timeData.minute}
            </text>
        </g>
    );
};

export const description = "An area chart with axes";

export function TempChart() {
    const { currentLocation } = useLocationContext();
    const { unit: unitType } = useUnitContext();
    const { isFetching, data } = useWeatherQuery(
        Number(currentLocation?.lat || 0),
        Number(currentLocation?.lon || 0),
        unitType,
    );
    const timezone = data?.timezone;
    const hourlyData = data?.hourly;
    const hourlyDataMap = new Map(
        hourlyData?.map(function (hour) {
            const timeData = getTimeDetails({
                utcTimestampInSeconds: hour.dt,
                timezone: timezone!,
            });
            const key = timeData.ISOString;
            const value = {
                timeData: timeData,
                temp: hour.temp,
                feels_like: hour.feels_like,
                uvi: hour.uvi,
                icon: hour.weather[0].icon,
            };
            return [key, value];
        }),
    );
    const chartData = Array.from(hourlyDataMap.entries()).map(function ([isoKey, hour]) {
        return {
            time: isoKey,
            temp: hour.temp,
            feels_like: hour.feels_like,
        };
    });

    const chartConfig = {
        temp: {
            label: "Temperature",
            color: "var(--chart-1)",
        },
        feels_like: {
            label: "Feels Like",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig;

    console.log(chartData);

    const dataPoints = chartData.length;
    const minWidthPerPoint = 25;

    if (isFetching) {
        return <div>Loading...</div>;
    }
    return (
        <div className="w-full overflow-x-auto border p-4">
            <div style={{ minWidth: `${(dataPoints || 0) * minWidthPerPoint}px` }}>
                <ChartContainer config={chartConfig} className="h-80 w-full">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: -20,
                            right: 12,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            interval={2}
                            tick={<CustomXTick hourlyDataMap={hourlyDataMap} />}
                            height={44}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickCount={5}
                            height={50}
                        />
                        <ChartTooltip cursor={true} content={<CustomToolTip />} />
                        {/*<ChartTooltip cursor={true} content={<ChartTooltipContent />} />*/}
                        <Area
                            dataKey="temp"
                            type="natural"
                            fill="var(--color-temp)"
                            fillOpacity={0.4}
                            stroke="var(--color-temp)"
                            stackId="a"
                        />
                        <Area
                            dataKey="feels_like"
                            type="natural"
                            fill="var(--color-feels_like)"
                            fillOpacity={0.4}
                            stroke="var(--color-feels_like)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </div>
        </div>
    );
}
