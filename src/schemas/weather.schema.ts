import { z } from "zod";

const WeatherIconSchema = z.enum([
    "01d",
    "01n",
    "02d",
    "02n",
    "03d",
    "03n",
    "04d",
    "04n",
    "09d",
    "09n",
    "10d",
    "10n",
    "11d",
    "11n",
    "13d",
    "13n",
    "50d",
    "50n",
]);

const WeatherConditionSchema = z.object({
    id: z.number().int(),
    main: z.string(),
    description: z.string(),
    icon: WeatherIconSchema,
});

const CurrentWeatherSchema = z.object({
    dt: z.number().int(),
    sunrise: z.number().int().optional(),
    sunset: z.number().int().optional(),
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number().int(),
    humidity: z.number().int(),
    dew_point: z.number(),
    uvi: z.number().min(0),
    clouds: z.number().int(),
    visibility: z.number().int().min(0).optional().default(0),
    wind_speed: z.number().min(0),
    wind_deg: z.number().int().min(0).max(360),
    wind_gust: z.number().min(0).optional(),
    weather: z.array(WeatherConditionSchema).min(1),
});

const HourlyWeatherSchema = z.object({
    dt: z.number().int(),
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number().int(),
    humidity: z.number().int(),
    dew_point: z.number(),
    uvi: z.number().min(0).optional().default(0),
    clouds: z.number().int(),
    visibility: z.number().int().min(0).optional().default(0),
    wind_speed: z.number().min(0),
    wind_deg: z.number().int(),
    wind_gust: z.number().min(0).optional(),
    weather: z.array(WeatherConditionSchema).min(1),
    pop: z.number().min(0).max(1),
    rain: z.object({ "1h": z.number().min(0) }).optional(),
    snow: z.object({ "1h": z.number().min(0) }).optional(),
});

const DailyTempSchema = z.object({
    day: z.number(),
    min: z.number(),
    max: z.number(),
    night: z.number(),
    eve: z.number(),
    morn: z.number(),
});

const DailyFeelsLikeSchema = z.object({
    day: z.number(),
    night: z.number(),
    eve: z.number(),
    morn: z.number(),
});

const DailyWeatherSchema = z.object({
    dt: z.number().int(),
    sunrise: z.number().int(),
    sunset: z.number().int(),
    moonrise: z.number().int().optional().default(0),
    moonset: z.number().int().optional().default(0),
    moon_phase: z.number().min(0).max(1),
    summary: z.string().optional(),
    temp: DailyTempSchema,
    feels_like: DailyFeelsLikeSchema,
    pressure: z.number().int(),
    humidity: z.number().int(),
    dew_point: z.number(),
    wind_speed: z.number().min(0),
    wind_deg: z.number().int().min(0).max(360),
    wind_gust: z.number().min(0).optional(),
    weather: z.array(WeatherConditionSchema).min(1),
    clouds: z.number().int(),
    pop: z.number().min(0).max(1), // Precipitation
    rain: z.number().min(0).optional(),
    snow: z.number().min(0).optional(),
    uvi: z.number().min(0),
});

export const OneCallResponseSchema = z.object({
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
    timezone: z.string(),
    timezone_offset: z.number().int(),
    current: CurrentWeatherSchema,
    hourly: z.array(HourlyWeatherSchema),
    daily: z.array(DailyWeatherSchema),
});

export type TOneCallResponse = z.infer<typeof OneCallResponseSchema>;
export type TCurrentWeather = z.infer<typeof CurrentWeatherSchema>;
export type THourlyWeather = z.infer<typeof HourlyWeatherSchema>;
export type TDailyWeather = z.infer<typeof DailyWeatherSchema>;
export type TWeatherCondition = z.infer<typeof WeatherConditionSchema>;
export type TDailyTemp = z.infer<typeof DailyTempSchema>;
export type TDailyFeelsLike = z.infer<typeof DailyFeelsLikeSchema>;
export type TWeatherIcon = z.infer<typeof WeatherIconSchema>;

/*
"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "An area chart with axes"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaAxes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Axes</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

*/
