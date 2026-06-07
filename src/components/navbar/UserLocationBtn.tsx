import { Gps01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Suspense, useEffect, useState } from "react";

import { useLocationContext } from "@/contexts/location.context";
import { useLocationLatLng } from "@/queries/locations.query";

import { ErrorBoundary } from "../ErrorBoundary";
import Spinner from "../Spinner";
import { Button } from "../ui/button";

export default function UserLocationBtn() {
    const { currentLatlng } = useLocationContext();
    const latlngKey = currentLatlng.join(",");
    return (
        <ErrorBoundary fallback={<ComponentSkeleton />} resetKey={latlngKey}>
            <Suspense fallback={<ComponentSkeleton />}>
                <Component />
            </Suspense>
        </ErrorBoundary>
    );
}

function Component() {
    const { currentLocation, currentLatlng, handleSetCurrentLatlng } = useLocationContext();
    const [currLat, currLon] = currentLatlng;
    const [fechingLatLng, setFechingLatLng] = useState(false);

    const updateCurrentLocation =
        currentLocation.lat !== `${currLat}` || currentLocation.lon !== `${currLon}`;

    const handleGetLocation = async () => {
        setFechingLatLng(true);

        const permission = await navigator.permissions.query({
            name: "geolocation",
        });

        if (permission.state === "denied") {
            alert("Location access is blocked. Enable it in browser settings.");
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const latVal = position.coords.latitude;
            const lngVal = position.coords.longitude;
            handleSetCurrentLatlng([latVal, lngVal]);
            setFechingLatLng(false);
        }, console.error);
    };

    return (
        <>
            {updateCurrentLocation && <UpdateCurrentLocation />}
            <Button
                className="h-10 w-10 cursor-pointer text-white-foreground"
                onClick={handleGetLocation}
            >
                {fechingLatLng && <Spinner className="size-5" />}
                {!fechingLatLng && (
                    <HugeiconsIcon icon={Gps01Icon} strokeWidth={2} className="size-5" />
                )}
            </Button>
        </>
    );
}

function UpdateCurrentLocation() {
    const { currentLatlng, handleSetCurrentLocation } = useLocationContext();
    const [currLat, currLon] = currentLatlng;
    const { data: latLngLocation } = useLocationLatLng([currLat, currLon]);

    useEffect(
        function () {
            handleSetCurrentLocation(latLngLocation, false);
        },
        [latLngLocation, handleSetCurrentLocation],
    );

    return null;
}

function ComponentSkeleton() {
    return (
        <Button className="pointer-events-none h-10 w-10 cursor-pointer bg-primary text-white-foreground">
            <HugeiconsIcon icon={Gps01Icon} strokeWidth={2} className="size-5" />
        </Button>
    );
}
