import { MapsLocation02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

export default function Nav() {
    return (
        <ul className="flex items-center gap-1 p-0.5">
            <li>
                <NavLink to="forecast">
                    {({ isActive }) => (
                        <div
                            className={cn(
                                "border pr-2 pl-3.5 h-10 transition-colors flex items-center gap-1 rounded-s-full",
                                "hover:bg-accent/20 bg-accent",
                                isActive &&
                                    "hover:bg-primary/10 bg-primary/10 text-primary border-primary",
                            )}
                        >
                            <span>Forecast</span>
                        </div>
                    )}
                </NavLink>
            </li>
            <li>
                <NavLink to="map">
                    {({ isActive }) => (
                        <div
                            className={cn(
                                "border h-10 pl-2 pr-3.5 transition-colors flex items-center gap-1 rounded-e-full",
                                "hover:bg-accent/20 bg-accent",
                                isActive &&
                                    "hover:bg-primary/10 bg-primary/10 text-primary border-primary",
                            )}
                        >
                            <HugeiconsIcon icon={MapsLocation02Icon} size={17} />
                            <span>Map</span>
                        </div>
                    )}
                </NavLink>
            </li>
        </ul>
    );
}
