import { Outlet } from "react-router";

import NavBar from "@/components/layout/NavBar";

export default function MainPage() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}
