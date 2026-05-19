import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";

import MainPage from "@/pages/MainPage";

import Forecast from "./components/layout/Forecast";
import Map from "./components/layout/Map";

function App() {
    return (
        <RouterProvider
            router={createBrowserRouter([
                {
                    path: "/",
                    element: <MainPage />,
                    children: [
                        { index: true, element: <Navigate replace to="forecast" /> },
                        { path: "forecast", element: <Forecast /> },
                        { path: "map", element: <Map /> },
                    ],
                },
            ])}
        />
    );
}

export default App;
