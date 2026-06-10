import type { TUnit } from "@/contexts/unit.context";

import axios from "axios";

import { AirPollutionResponseSchema, OneCallResponseSchema } from "../schemas/weather.schema";
export const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

const BASE_URL = `https://api.openweathermap.org/data`;
const axiosClient = axios.create({ baseURL: BASE_URL });

export async function getWeather({ lat, lon, unit }: { lat: number; lon: number; unit: TUnit }) {
    const res = await axiosClient.get("/3.0/onecall", {
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

export async function getAirPollution({ lat, lon }: { lat: number; lon: number }) {
    const res = await axiosClient.get("/2.5/air_pollution", {
        params: {
            lat: lat,
            lon: lon,
            appid: API_KEY,
        },
    });
    const data = AirPollutionResponseSchema.parse(res.data);
    return data;
}
