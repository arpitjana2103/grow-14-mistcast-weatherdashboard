import MapLayout from "../components/mapPage/MapLayout";
import NavBar from "../components/navbar/NavBar";

export default function MapPage() {
    return (
        <main className="flex h-screen flex-col">
            <NavBar />
            <MapLayout className="grow" />
        </main>
    );
}
