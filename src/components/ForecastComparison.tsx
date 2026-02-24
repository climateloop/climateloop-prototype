import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, Brain, Cloud, Radio, Sparkles, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useWeather } from "@/hooks/useWeather";
import { useLocation } from "@/hooks/useLocationContext";
import { supabase } from "@/integrations/supabase/client";

interface ForecastItem {
  sourceKey: "forecastOfficial" | "forecastML" | "forecastIoT";
  icon: React.ReactNode;
  tempC: number | null;
  rainChance: string | null;
  rainMm: string | null;
  wind: string | null;
  humidity: string | null;
  trend: "up" | "down" | "stable";
}

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-destructive" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-secondary" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
};

const cToF = (c: number) => Math.round(c * 9 / 5 + 32);
const kmhToMph = (kmh: string) => {
  const num = parseFloat(kmh);
  return `${Math.round(num * 0.621)} mph`;
};

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface ForecastComparisonProps {
  onOpenDetail?: () => void;
}

const ForecastComparison = ({ onOpenDetail }: ForecastComparisonProps) => {
  const { t, unitSystem } = useLanguage();
  const isImperial = unitSystem === "imperial";
  const { data: weather } = useWeather();
  const { location } = useLocation();

  const [mlData, setMlData] = useState<{ temperature_2m: number | null; precipitation: number | null; relative_humidity_2m: number | null; wind_speed_10m: number | null } | null>(null);
  const [iotData, setIotData] = useState<{ temperature_2m: number | null; precipitation: number | null; relative_humidity_2m: number | null; wind_speed_10m: number | null } | null>(null);

  // Fetch ML prediction closest to now
  useEffect(() => {
    const fetchML = async () => {
      const now = new Date().toISOString();
      const { data } = await supabase
        .from("ml_predictions")
        .select("temperature_2m, precipitation, relative_humidity_2m, wind_speed_10m")
        .gte("datetime", now)
        .order("datetime", { ascending: true })
        .limit(1)
        .single();
      if (data) setMlData(data);
    };
    fetchML();
  }, []);

  // Fetch nearest IoT station's latest reading
  useEffect(() => {
    const fetchIoT = async () => {
      const { data: stations } = await supabase
        .from("iot_stations")
        .select("id, latitude, longitude")
        .eq("is_active", true);
      if (!stations?.length) return;

      let nearestId = stations[0].id;
      let minDist = Infinity;
      for (const s of stations) {
        const d = haversineDistance(location.lat, location.lng, s.latitude, s.longitude);
        if (d < minDist) { minDist = d; nearestId = s.id; }
      }

      const { data } = await supabase
        .from("iot_readings")
        .select("temperature_2m, precipitation, relative_humidity_2m, wind_speed_10m")
        .eq("station_id", nearestId)
        .order("datetime", { ascending: false })
        .limit(1)
        .single();
      if (data) setIotData(data);
    };
    fetchIoT();
  }, [location.lat, location.lng]);

  const forecastData: ForecastItem[] = [
    {
      sourceKey: "forecastOfficial",
      icon: <Cloud className="w-4 h-4 text-primary" />,
      tempC: weather ? Math.round(weather.temp) : null,
      rainChance: weather ? `${weather.clouds}%` : null,
      rainMm: weather?.rain_1h ? `${weather.rain_1h}mm` : "0mm",
      wind: weather ? `${Math.round(weather.wind_speed * 3.6)} km/h` : null,
      humidity: weather ? `${weather.humidity}%` : null,
      trend: weather && weather.temp > 15 ? "up" : "stable",
    },
    {
      sourceKey: "forecastML",
      icon: <Brain className="w-4 h-4 text-secondary" />,
      tempC: mlData?.temperature_2m != null ? Math.round(mlData.temperature_2m * 10) / 10 : null,
      rainChance: mlData?.precipitation != null ? (mlData.precipitation > 0.1 ? `${Math.round(mlData.precipitation * 100)}%` : "0%") : null,
      rainMm: mlData?.precipitation != null ? `${mlData.precipitation.toFixed(1)}mm` : null,
      wind: mlData?.wind_speed_10m != null ? `${Math.round(mlData.wind_speed_10m)} km/h` : null,
      humidity: mlData?.relative_humidity_2m != null ? `${Math.round(mlData.relative_humidity_2m)}%` : null,
      trend: mlData?.temperature_2m != null && mlData.temperature_2m > 15 ? "up" : "stable",
    },
    {
      sourceKey: "forecastIoT",
      icon: <Radio className="w-4 h-4 text-accent" />,
      tempC: iotData?.temperature_2m != null ? Math.round(iotData.temperature_2m * 10) / 10 : null,
      rainChance: null,
      rainMm: iotData?.precipitation != null ? `${iotData.precipitation.toFixed(1)}mm` : null,
      wind: iotData?.wind_speed_10m != null ? `${Math.round(iotData.wind_speed_10m)} km/h` : null,
      humidity: iotData?.relative_humidity_2m != null ? `${Math.round(iotData.relative_humidity_2m)}%` : null,
      trend: "stable",
    },
  ];

  const hasData = (f: ForecastItem) => f.tempC != null || f.wind != null || f.humidity != null;

  const formatTemp = (c: number | null) => {
    if (c == null) return "—";
    return isImperial ? `${cToF(c)}°F` : `${c}°C`;
  };
  const formatWind = (w: string | null) => {
    if (!w) return null;
    return isImperial ? kmhToMph(w) : w;
  };

  return (
    <div className="mx-4">
      <h2 className="text-base font-semibold text-foreground mb-3">{t.forecastTitle}</h2>
      <div className="grid grid-cols-3 gap-2">
        {forecastData.map((f) => {
          const disabled = !hasData(f);
          return (
            <div
              key={f.sourceKey}
              className={`rounded-xl p-3 shadow-card border flex flex-col ${disabled ? "bg-muted/50 border-border/50 opacity-50" : "bg-surface-elevated border-border"}`}
            >
              <div className="flex items-center gap-1.5 mb-2">
                {f.icon}
                <span className="text-[10px] font-medium text-muted-foreground leading-tight">{t[f.sourceKey]}</span>
              </div>
              <div className="flex-1 space-y-1">
                {disabled ? (
                  <p className="text-xs text-muted-foreground italic mt-1">{t.forecastNoData ?? "Sin datos"}</p>
                ) : (
                  <>
                    <p className="text-lg font-bold text-foreground">{formatTemp(f.tempC)}</p>
                    <p className="text-[10px] text-muted-foreground">{t.forecastRain}: {f.rainChance ?? "N/A"}</p>
                    <p className="text-[10px] text-muted-foreground">{t.forecastPrecip}: {f.rainMm ?? "N/A"}</p>
                    <p className="text-[10px] text-muted-foreground">{t.weatherWind}: {formatWind(f.wind) ?? "N/A"}</p>
                    <p className="text-[10px] text-muted-foreground">{t.weatherHumidity}: {f.humidity ?? "N/A"}</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ML insight + CTA */}
      <div className="mt-3 bg-surface-elevated rounded-xl border border-border shadow-card p-3">
        <p className="text-xs text-muted-foreground italic text-center">{t.forecastMLNote}</p>
        <button
          onClick={onOpenDetail}
          className="flex items-center justify-center gap-1.5 mt-2 w-full py-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-sm font-medium text-foreground">{t.aiUnderstandForecast}</span>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent ml-1 pointer-events-none select-none">
            {t.aiPowered}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ForecastComparison;
