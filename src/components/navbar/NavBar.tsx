import { NavLink } from "react-router";

import { cn } from "@/lib/utils";

import GitHubBtn from "../GitHubBtn";
import Container from "../layout/Container";
import Logo from "../Logo";
import LightDarkToggle from "./LightDarkToggle";
import LocationSearch from "./LocationSearch";
import Nav from "./Nav";
import UnitSystemToggle from "./UnitSystemToggle";
import UserLocationBtn from "./UserLocationBtn";

export default function NavBar({ className }: { className?: string }) {
    return (
        <header className={cn("w-screen", className)}>
            <div className="z-1000 w-full border-b border-border/20 bg-background">
                <Container>
                    <div className="flex flex-col items-center justify-between gap-4 py-4 mdlg:flex-row">
                        <div>
                            <NavLink to="/forecast">
                                <Logo />
                            </NavLink>
                        </div>

                        <ul className="flex flex-col items-center gap-2 md:flex-row md:gap-5">
                            <li className="flex items-center gap-1">
                                <LocationSearch />
                                <UserLocationBtn />
                            </li>
                            <div className="flex items-center justify-between gap-2 sm:flex-row">
                                <li>
                                    <Nav />
                                </li>
                                <li>
                                    <LightDarkToggle />
                                </li>

                                <li>
                                    <UnitSystemToggle />
                                </li>

                                <li>
                                    <GitHubBtn />
                                </li>
                            </div>
                        </ul>
                    </div>
                </Container>
            </div>
        </header>
    );
}
