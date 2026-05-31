import { cn } from "@/lib/utils";
import { getTimeDetails } from "@/utils/time-fn.util";

export default function Time({
    timezone,
    utcTimestampInSeconds,
    className,
}: {
    timezone: string;
    utcTimestampInSeconds: number;
    className?: string;
}) {
    const timeDetails = getTimeDetails({
        utcTimestampInSeconds: utcTimestampInSeconds,
        timezone: timezone,
    });
    const { fullDate, weekDay, timezoneOffset, hour12, minute, period } = timeDetails;
    return (
        <div className={cn("flex flex-col text-right text-secondary-foreground", className)}>
            <span className="text-sm">{`${hour12}:${minute} ${period.toLocaleLowerCase()} (${timezoneOffset})`}</span>
            <span className="text-sm">{`${weekDay}, ${fullDate}`}</span>
        </div>
    );
}
