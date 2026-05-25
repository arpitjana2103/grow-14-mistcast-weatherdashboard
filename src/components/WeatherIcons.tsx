import type { TWeatherIcon } from "../schemas/weather.schema";

import { clsx } from "clsx";

import img01d from "./../assets/icons/01d.png";
import img01n from "./../assets/icons/01n.png";
import img02d from "./../assets/icons/02d.png";
import img02n from "./../assets/icons/02n.png";
import img03d from "./../assets/icons/03d.png";
import img03n from "./../assets/icons/03n.png";
import img04d from "./../assets/icons/04d.png";
import img04n from "./../assets/icons/04n.png";
import img09d from "./../assets/icons/09d.png";
import img09n from "./../assets/icons/09n.png";
import img10d from "./../assets/icons/10d.png";
import img10n from "./../assets/icons/10n.png";
import img11d from "./../assets/icons/11d.png";
import img11n from "./../assets/icons/11n.png";
import img13d from "./../assets/icons/13d.png";
import img13n from "./../assets/icons/13n.png";
import img50d from "./../assets/icons/50d.png";
import img50n from "./../assets/icons/50n.png";
import imgFullmoon from "./../assets/icons/fullmoon.png";
import imgHumidity from "./../assets/icons/humidity.png";
import imgMoonphase from "./../assets/icons/moonphase.png";
import imgMoonrise from "./../assets/icons/moonrise.png";
import imgMoonset from "./../assets/icons/moonset.png";
import imgPressure from "./../assets/icons/pressure.png";
import imgRainchance from "./../assets/icons/rainchance.png";
import imgSunrise from "./../assets/icons/sunrise.png";
import imgSunset from "./../assets/icons/sunset.png";
import imgUvindex from "./../assets/icons/uvindex.png";
import imgWindspeed from "./../assets/icons/windspeed.png";

type TIcons =
    | TWeatherIcon
    | "fullmoon"
    | "humidity"
    | "moonphase"
    | "moonrise"
    | "moonset"
    | "pressure"
    | "rainchance"
    | "sunrise"
    | "sunset"
    | "uvindex"
    | "windspeed";

type TIconSize = "sm" | "md" | "lg";

type TProps = {
    type: TIcons;
    size?: TIconSize;
    className?: string;
};

const ICONS: Record<TIcons, string> = {
    "01d": img01d,
    "01n": img01n,
    "02d": img02d,
    "02n": img02n,
    "03d": img03d,
    "03n": img03n,
    "04d": img04d,
    "04n": img04n,
    "09d": img09d,
    "09n": img09n,
    "10d": img10d,
    "10n": img10n,
    "11d": img11d,
    "11n": img11n,
    "13d": img13d,
    "13n": img13n,
    "50d": img50d,
    "50n": img50n,
    fullmoon: imgFullmoon,
    humidity: imgHumidity,
    moonphase: imgMoonphase,
    moonrise: imgMoonrise,
    moonset: imgMoonset,
    pressure: imgPressure,
    rainchance: imgRainchance,
    sunrise: imgSunrise,
    sunset: imgSunset,
    uvindex: imgUvindex,
    windspeed: imgWindspeed,
} as const satisfies Record<TIcons, string>;

const sizes = {
    sm: "h-[4.5rem] w-[4.5rem]",
    md: "h-[6rem] w-[6rem]",
    lg: "h-[9rem] w-[9rem]",
} as const satisfies Record<TIconSize, string>;

export default function WeatherIcons({ type, size = "sm", className = "" }: TProps) {
    return <img className={clsx(sizes[size], className)} src={ICONS[type]} alt={type} />;
}
