import type { TLocationData } from "@/schemas/location.schema";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateAddressStr(location: TLocationData) {
    const { display_place, address } = location;
    const {
        state,
        country,
        postcode,
        quarter,
        city,
        municipality,
        state_district,
        region,
        town,
        road,
        county,
    } = address ?? {};
    const _address = [
        display_place,
        road,
        quarter,
        city,
        town,
        municipality,
        county,
        state_district,
        region,
        state,
        postcode,
        country,
    ]
        .filter(Boolean)
        .join(", ");

    return _address;
}
