import { Moon02Icon, MoonFastWindIcon, MoonsetIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";
import { getTimeDetails } from "@/utils/time-fn.util";

type Props = {
    className?: string;
    timezone: string;
    moonRiseDt?: number;
    moonSetDt?: number;
    currentTimeDt: number;
};

function getMoonlightDuration(
    moonrise: {
        hh: number;
        mm: number;
    },
    moonset: {
        hh: number;
        mm: number;
    },
) {
    const moonriseMinutes = moonrise.hh * 60 + moonrise.mm;
    const moonsetMinutes = moonset.hh * 60 + moonset.mm;

    const totalMinutes =
        moonsetMinutes >= moonriseMinutes
            ? moonsetMinutes - moonriseMinutes
            : 24 * 60 - moonriseMinutes + moonsetMinutes;

    return {
        hours: Math.floor(totalMinutes / 60),
        minutes: totalMinutes % 60,
    };
}

function getMoonAngleDegree(currentTimeDt: number, moonRiseDt: number, moonSetDt: number): number {
    if (currentTimeDt <= moonRiseDt) {
        return 0;
    } else if (currentTimeDt >= moonSetDt) {
        return 180;
    } else {
        const progress = (currentTimeDt - moonRiseDt) / (moonSetDt - moonRiseDt);
        return progress * 180;
    }
}

export default function MoonRise({
    timezone,
    moonRiseDt,
    moonSetDt,
    currentTimeDt,
    className,
}: Props) {
    if (!moonRiseDt || !moonSetDt) return null;

    const valueDeg = getMoonAngleDegree(currentTimeDt, moonRiseDt, moonSetDt);
    const angle = Math.PI - (valueDeg * Math.PI) / 180;
    const x = 50 + 50 * Math.cos(angle);
    const y = 100 - 100 * Math.sin(angle);

    const moonRiseTime = getTimeDetails({ utcTimestampInSeconds: moonRiseDt, timezone: timezone });
    const moonSetTime = getTimeDetails({ utcTimestampInSeconds: moonSetDt, timezone: timezone });

    const nightLightDuration = getMoonlightDuration(
        { hh: +moonRiseTime.hour24, mm: +moonRiseTime.minute },
        { hh: +moonSetTime.hour24, mm: +moonSetTime.minute },
    );
    const currentTime = getTimeDetails({
        utcTimestampInSeconds: currentTimeDt,
        timezone: timezone,
    });

    return (
        <div
            className={cn(
                "border border-border/30 shadow-2xs p-4 pt-8 flex flex-col w-full justify-between bg-card relative",
                className,
            )}
        >
            <span className="absolute top-4 right-4 text-xs text-secondary-foreground">Moon</span>
            <div className="px-4">
                <div className="relative aspect-2/1 w-full rounded-t-full border-[1.5px] border-b-0 border-dashed border-blue-500">
                    <div
                        className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card"
                        style={{
                            left: `${x}%`,
                            top: `${y}%`,
                        }}
                    >
                        <HugeiconsIcon
                            size={21}
                            icon={Moon02Icon}
                            strokeWidth={1.5}
                            className={cn(
                                "text-blue-500",
                                valueDeg === 0 && "text-secondary-foreground",
                            )}
                            fill="currentColor"
                        />
                    </div>

                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-secondary-foreground">{`${currentTime.hour24}:${currentTime.minute}`}</span>
                </div>
            </div>

            <div className="pt-3">
                <p className="mx-auto text-center text-sm text-secondary-foreground">{`${nightLightDuration.hours} hrs ${nightLightDuration.minutes} mins`}</p>
            </div>

            <div className="flex justify-between">
                <p className="flex flex-col items-start">
                    <span>
                        <HugeiconsIcon
                            icon={MoonFastWindIcon}
                            strokeWidth={1.5}
                            size={23}
                            className="text-secondary"
                        />
                    </span>
                    <span className="pt-2 text-lg leading-none font-semibold text-blue-500">{`${moonRiseTime.hour24}:${moonRiseTime.minute}`}</span>
                </p>
                <p className="flex flex-col items-end">
                    <span>
                        <HugeiconsIcon
                            icon={MoonsetIcon}
                            strokeWidth={1.5}
                            size={23}
                            className="text-secondary"
                        />
                    </span>
                    <span className="pt-2 text-lg leading-none font-semibold text-blue-500">{`${moonSetTime.hour24}:${moonSetTime.minute}`}</span>
                </p>
            </div>
        </div>
    );
}
