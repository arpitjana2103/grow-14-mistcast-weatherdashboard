import type { TLocationsType } from "./LocationSearch";
import type { TLocationData } from "@/schemas/location.schema";

import { LocateFixed } from "lucide-react";

import { cn } from "@/lib/utils";

import { LocationListItem } from "./LocationsListItem";

type Props = {
    isOpen: boolean;
    locations: TLocationData[];
    onSelectLocation: (location: TLocationData, locationType: TLocationsType) => void;
    locationsType: TLocationsType;
};

export default function LocationsPopover({
    isOpen,
    locationsType,
    locations,
    onSelectLocation,
}: Props) {
    return (
        <div
            className={cn(
                "absolute top-12 w-[20rem] shadow-md transition-all duration-300",
                isOpen
                    ? "visible opacity-100 translate-y-0"
                    : "invisible opacity-0 -translate-y-2 pointer-events-none",
            )}
        >
            <ul>
                <FindLocationOnMapItem />
                {locations.map(function (location) {
                    return (
                        <LocationListItem
                            key={location.place_id}
                            location={location}
                            saved={locationsType === "saved"}
                            onSelect={() => onSelectLocation(location, locationsType)}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

function FindLocationOnMapItem() {
    return (
        <li className="flex cursor-pointer items-center gap-3 border border-primary bg-primary/20 px-2.5 py-2 transition hover:bg-primary/30">
            <a href="#" className="flex w-full items-center justify-center gap-2 text-primary">
                <span>
                    <LocateFixed size={19} strokeWidth={2} />
                </span>

                <span>Find on Map</span>
            </a>
        </li>
    );
}
