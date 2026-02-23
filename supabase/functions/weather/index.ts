import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lat, lon, units, lang } = await req.json();

    const OPENWEATHER_API_KEY = Deno.env.get("OPENWEATHER_API_KEY");
    if (!OPENWEATHER_API_KEY) {
      throw new Error("OPENWEATHER_API_KEY is not configured");
    }

    if (!lat || !lon) {
      return new Response(
        JSON.stringify({ error: "lat and lon are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const params = new URLSearchParams({
      lat: String(lat),
      lon: String(lon),
      appid: OPENWEATHER_API_KEY,
      units: units || "metric",
      lang: lang || "pt",
    });

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${params}`
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("OpenWeather API error:", response.status, text);
      return new Response(
        JSON.stringify({ error: `OpenWeather API error [${response.status}]` }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    // Return only what we need
    const result = {
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      description: data.weather?.[0]?.description || "",
      icon: data.weather?.[0]?.icon || "",
      rain_1h: data.rain?.["1h"] || 0,
      clouds: data.clouds?.all || 0,
      city: data.name,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("weather error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
