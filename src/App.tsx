import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";

import ForecastPage from "./pages/ForecastPage";
import Map from "./pages/MapPage";

function App() {
    return (
        <RouterProvider
            router={createBrowserRouter([
                {
                    path: "/",
                    index: true,
                    element: <Navigate replace to="forecast" />,
                },
                {
                    path: "/forecast",
                    element: <ForecastPage />,
                },
                {
                    path: "/map",
                    element: <Map />,
                },
            ])}
        />
    );
}

export default App;
