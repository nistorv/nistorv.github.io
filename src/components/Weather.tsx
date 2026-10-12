import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
    WiCloud,
    WiDayCloudy,
    WiDaySunny,
    WiFog,
    WiNightAltCloudy,
    WiNightClear,
    WiRain,
    WiShowers,
    WiSnow,
    WiSprinkle,
    WiThunderstorm,
} from "react-icons/wi";
import tvData from "../../content/tv.json";

interface WeatherLocation {
    label: string;
    lat: number;
    lon: number;
    refreshMinutes: number;
}

interface WeatherReading {
    temperature: number;
    apparentTemperature: number;
    weatherCode: number;
    isDay: boolean;
    high: number;
    low: number;
}

interface WeatherCondition {
    description: string;
    dayIcon: IconType;
    nightIcon: IconType;
}

const weatherLocation: WeatherLocation = tvData.weather;

// Open-Meteo weather codes
const WEATHER_CONDITIONS: { [code: number]: WeatherCondition } = {
    0: { description: "Clear", dayIcon: WiDaySunny, nightIcon: WiNightClear },
    1: { description: "Mostly clear", dayIcon: WiDaySunny, nightIcon: WiNightClear },
    2: { description: "Partly cloudy", dayIcon: WiDayCloudy, nightIcon: WiNightAltCloudy },
    3: { description: "Overcast", dayIcon: WiCloud, nightIcon: WiCloud },
    45: { description: "Fog", dayIcon: WiFog, nightIcon: WiFog },
    48: { description: "Rime fog", dayIcon: WiFog, nightIcon: WiFog },
    51: { description: "Light drizzle", dayIcon: WiSprinkle, nightIcon: WiSprinkle },
    53: { description: "Drizzle", dayIcon: WiSprinkle, nightIcon: WiSprinkle },
    55: { description: "Heavy drizzle", dayIcon: WiSprinkle, nightIcon: WiSprinkle },
    56: { description: "Freezing drizzle", dayIcon: WiSprinkle, nightIcon: WiSprinkle },
    57: { description: "Freezing drizzle", dayIcon: WiSprinkle, nightIcon: WiSprinkle },
    61: { description: "Light rain", dayIcon: WiRain, nightIcon: WiRain },
    63: { description: "Rain", dayIcon: WiRain, nightIcon: WiRain },
    65: { description: "Heavy rain", dayIcon: WiRain, nightIcon: WiRain },
    66: { description: "Freezing rain", dayIcon: WiRain, nightIcon: WiRain },
    67: { description: "Freezing rain", dayIcon: WiRain, nightIcon: WiRain },
    71: { description: "Light snow", dayIcon: WiSnow, nightIcon: WiSnow },
    73: { description: "Snow", dayIcon: WiSnow, nightIcon: WiSnow },
    75: { description: "Heavy snow", dayIcon: WiSnow, nightIcon: WiSnow },
    77: { description: "Snow grains", dayIcon: WiSnow, nightIcon: WiSnow },
    80: { description: "Light showers", dayIcon: WiShowers, nightIcon: WiShowers },
    81: { description: "Showers", dayIcon: WiShowers, nightIcon: WiShowers },
    82: { description: "Heavy showers", dayIcon: WiShowers, nightIcon: WiShowers },
    85: { description: "Snow showers", dayIcon: WiSnow, nightIcon: WiSnow },
    86: { description: "Snow showers", dayIcon: WiSnow, nightIcon: WiSnow },
    95: { description: "Thunderstorm", dayIcon: WiThunderstorm, nightIcon: WiThunderstorm },
    96: { description: "Thunderstorm", dayIcon: WiThunderstorm, nightIcon: WiThunderstorm },
    99: { description: "Thunderstorm", dayIcon: WiThunderstorm, nightIcon: WiThunderstorm },
};

const UNKNOWN_CONDITION: WeatherCondition = { description: "Unknown", dayIcon: WiCloud, nightIcon: WiCloud };

async function fetchWeather(location: WeatherLocation): Promise<WeatherReading> {
    const params = new URLSearchParams({
        latitude: location.lat.toString(),
        longitude: location.lon.toString(),
        current: "temperature_2m,apparent_temperature,weather_code,is_day",
        daily: "temperature_2m_max,temperature_2m_min",
        timezone: "auto",
        forecast_days: "1",
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) {
        throw new Error(`Weather request failed: ${response.status}`);
    }

    const data = await response.json();
    return {
        temperature: data.current.temperature_2m,
        apparentTemperature: data.current.apparent_temperature,
        weatherCode: data.current.weather_code,
        isDay: data.current.is_day === 1,
        high: data.daily.temperature_2m_max[0],
        low: data.daily.temperature_2m_min[0],
    };
}

export function Weather() {
    const [reading, setReading] = useState<WeatherReading | null>(null);

    useEffect(() => {
        let cancelled = false;

        function refresh(): void {
            fetchWeather(weatherLocation)
                .then((next) => {
                    if (!cancelled) {
                        setReading(next);
                    }
                })
                .catch((error) => console.error(error));
        }

        refresh();
        const timer = setInterval(refresh, weatherLocation.refreshMinutes * 60 * 1000);

        return () => {
            cancelled = true;
            clearInterval(timer);
        };
    }, []);

    if (reading === null) {
        return null;
    }

    const condition = WEATHER_CONDITIONS[reading.weatherCode] ?? UNKNOWN_CONDITION;
    const Icon = reading.isDay ? condition.dayIcon : condition.nightIcon;

    return (
        <div className="flex flex-col justify-center text-white drop-shadow-lg bg-slate-800/30 p-5 border-2 border-white">
            <div className="flex items-center gap-3">
                <Icon className="text-7xl" />
                <div className="text-6xl font-bold tabular-nums leading-none">
                    {Math.round(reading.temperature)}°
                </div>
            </div>
            <div className="mt-2 text-sm text-center font-semibold text-white/80">
                {condition.description} · {weatherLocation.label}
            </div>
            <div className="mt-1 text-xs text-center font-semibold tabular-nums text-white/70">
                H {Math.round(reading.high)}° · L {Math.round(reading.low)}° · Feels {Math.round(reading.apparentTemperature)}°
            </div>
        </div>
    );
}
