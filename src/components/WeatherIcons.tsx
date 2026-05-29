import type { TWeatherIcon } from "../schemas/weather.schema";
import type { IconSvgObject } from "@hugeicons/core-free-icons";

import {
    CloudAngledRainIcon,
    CloudAngledZapIcon,
    CloudIcon,
    CloudMidRainIcon,
    CloudMidSnowIcon,
    Moon02Icon,
    MoonCloudIcon,
    Sun03Icon,
    SunCloud02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type TIcons = TWeatherIcon;
// | "fullmoon"
// | "humidity"
// | "moonphase"
// | "moonrise"
// | "moonset"
// | "pressure"
// | "rainchance"
// | "sunrise"
// | "sunset"
// | "uvindex"
// | "windspeed";

const CloudyIcon = function (props: React.SVGProps<SVGSVGElement>) {
    const strokeWidth = props.strokeWidth;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={48}
            height={48}
            color={"currentColor"}
            fill={"none"}
            {...props}
        >
            <path
                d="M14.3821 12.8C14.388 12.8 14.394 12.8 14.4 12.8C16.3882 12.8 18 14.4118 18 16.4C18 18.3882 16.3882 20 14.4 20H6C3.79086 20 2 18.2091 2 16C2 13.9203 3.58718 12.2113 5.61634 12.0182M13.8675 14.5C14.1469 13.9866 14.327 13.4113 14.3821 12.8C14.3939 12.6683 14.4 12.5349 14.4 12.4C14.4 9.96995 12.4301 8 10 8C7.69859 8 5.80986 9.7669 5.61634 12.0182M5.61634 12.0182C5.74261 12.0061 5.87059 12 6 12C6.72857 12 7.41165 12.1948 8 12.5351"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M18.3829 8.80004C18.3889 8.80001 18.3949 8.8 18.4008 8.8C20.3891 8.8 22.0008 10.4118 22.0008 12.4C22.0008 13.3661 21.6203 14.2434 21.0009 14.89M18.3829 8.80004C18.3948 8.66829 18.4008 8.53485 18.4008 8.4C18.4008 5.96995 16.4309 4 14.0008 4C11.6994 4 9.81071 5.7669 9.61719 8.01816M18.3829 8.80004C18.3451 9.21981 18.2483 9.62258 18.1009 10"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
        </svg>
    );
};

const CloudFogIcon = function (props: React.SVGProps<SVGSVGElement>) {
    const strokeWidth = props.strokeWidth;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={48}
            height={48}
            color={"currentColor"}
            fill={"none"}
            {...props}
        >
            <path
                d="M17.4776 9.50005C17.485 9.50002 17.4925 9.5 17.5 9.5C19.9853 9.5 22 11.5147 22 14C22 15.7415 21.0108 17.2519 19.5636 18M16.9003 11.5C17.2119 10.8904 17.4131 10.2149 17.4776 9.50005C17.4924 9.33536 17.5 9.16856 17.5 9C17.5 5.96243 15.0376 3.5 12 3.5C9.12324 3.5 6.76233 5.70862 6.52042 8.5227M6.52042 8.5227C3.98398 8.76407 2 10.9003 2 13.5C2 15.1358 2.78555 16.5882 4 17.5004M6.52042 8.5227C6.67826 8.50768 6.83823 8.5 7 8.5C7.7111 8.5 8.38754 8.64845 9 8.91604"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M15 16.5H8"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M16 20.5H10"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
        </svg>
    );
};

type HugeIconType = typeof Sun03Icon;
type CustomIconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const HUGE_ICONS: Partial<Record<TIcons, HugeIconType>> = {
    "01d": Sun03Icon,
    "01n": Moon02Icon,
    "02d": SunCloud02Icon,
    "02n": MoonCloudIcon,
    "03d": CloudIcon,
    "03n": CloudIcon,

    "09d": CloudMidRainIcon,
    "09n": CloudMidRainIcon,
    "10d": CloudAngledRainIcon,
    "10n": CloudAngledRainIcon,
    "11d": CloudAngledZapIcon,
    "11n": CloudAngledZapIcon,
    "13d": CloudMidSnowIcon,
    "13n": CloudMidSnowIcon,
};

const CUSTOM_ICONS: Partial<Record<TIcons, CustomIconComponent>> = {
    "04d": CloudyIcon,
    "04n": CloudyIcon,
    "50d": CloudFogIcon,
    "50n": CloudFogIcon,
};

export default function WeatherIcons({
    type,
    className = "h-6 w-6",
    strokeWidth = 2,
}: {
    type: TIcons;
    className?: string;
    strokeWidth?: number;
}) {
    const HugeIcon = HUGE_ICONS[type];
    const CustomIcon = CUSTOM_ICONS[type];

    if (HugeIcon) {
        return <HugeiconsIcon icon={HugeIcon} strokeWidth={strokeWidth} className={className} />;
    }

    if (CustomIcon) {
        return <CustomIcon className={className} strokeWidth={strokeWidth} />;
    }

    return null;
}
