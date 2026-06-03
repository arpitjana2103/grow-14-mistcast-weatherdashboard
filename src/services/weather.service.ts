import type { TUnit } from "@/contexts/unit.context";

import axios from "axios";

import { OneCallResponseSchema } from "../schemas/weather.schema";
export const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

const BASE_URL = `https://api.openweathermap.org/data/3.0`;
const axiosClient = axios.create({ baseURL: BASE_URL });

export async function getWeather({ lat, lon, unit }: { lat: number; lon: number; unit: TUnit }) {
    const res = await axiosClient.get("/onecall", {
        params: {
            lat: lat,
            lon: lon,
            units: unit,
            appid: API_KEY,
        },
    });

    const data = OneCallResponseSchema.parse(res.data);
    return data;
}
