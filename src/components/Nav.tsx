import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

export default function Nav() {
    return (
        <ul className="flex h-10 items-center gap-[0.3rem] border px-[0.29rem]">
            <li>
                <NavLink
                    to="forecast"
                    className={({ isActive }) =>
                        cn(
                            "block border px-2 py-0.5 transition-colors",
                            "hover:bg-primary/10 hover:text-primary bg-accent/30",
                            isActive && "bg-primary/10 text-primary border-primary/30",
                        )
                    }
                >
                    Forecast
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="map"
                    className={({ isActive }) =>
                        cn(
                            "block border px-2 py-0.5 transition-colors",
                            "hover:bg-primary/10 hover:text-primary bg-accent/30",
                            isActive && "bg-primary/10 text-primary border-primary/30",
                        )
                    }
                >
                    Map
                </NavLink>
            </li>
        </ul>
    );
}
