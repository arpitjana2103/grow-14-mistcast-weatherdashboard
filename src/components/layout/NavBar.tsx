import { NavLink } from "react-router";

import Container from "../Container";
import GitHubBtn from "../GitHubBtn";
import LightDarkToggle from "../LightDarkToggle";
import LocationSearch from "../LocationSearch";
import Logo from "../Logo";
import Nav from "../Nav";

export default function NavBar() {
    return (
        <header className="w-screen">
            <Container>
                <div className="flex items-center justify-between py-4">
                    <div>
                        <NavLink to="/">
                            <Logo />
                        </NavLink>
                    </div>

                    <ul className="flex items-center gap-2.5">
                        <li>
                            <LocationSearch />
                        </li>
                        <li>
                            <Nav />
                        </li>
                        <li>
                            <LightDarkToggle />
                        </li>
                        <li>
                            <GitHubBtn />
                        </li>
                    </ul>
                </div>
            </Container>
        </header>
    );
}
