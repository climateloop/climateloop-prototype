import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
  rain_1h: number;
  clouds: number;
  city: string;
}

const DEFAULT_LAT = 42.8782;
const DEFAULT_LON = -8.5448;
const CACHE_KEY = "climateloop_weather_cache";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export function useWeather(lat = DEFAULT_LAT, lon = DEFAULT_LON) {
  const [data, setData] = useState<WeatherData | null>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp, key } = JSON.parse(cached);
        if (key === `${lat},${lon}` && Date.now() - timestamp < CACHE_TTL) {
          return data;
        }
      }
    } catch {}
    return null;
  });
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: result, error: fnError } = await supabase.functions.invoke("weather", {
          body: { lat, lon, units: "metric", lang: "pt" },
        });

        if (fnError) throw fnError;
        if (result?.error) throw new Error(result.error);

        if (!cancelled) {
          setData(result);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: result, timestamp: Date.now(), key: `${lat},${lon}` })
          );
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to fetch weather");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Only fetch if cache is stale
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { timestamp, key } = JSON.parse(cached);
        if (key === `${lat},${lon}` && Date.now() - timestamp < CACHE_TTL) {
          setLoading(false);
          return;
        }
      } catch {}
    }

    fetchWeather();
    return () => { cancelled = true; };
  }, [lat, lon]);

  return { data, loading, error };
}
