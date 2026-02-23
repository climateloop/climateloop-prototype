import { useEffect, useState } from "react";
import { ArrowLeft, Brain, Cloud, Radio, Sparkles, MessageCircle, Info } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useWeather } from "@/hooks/useWeather";
import { useLocation } from "@/hooks/useLocationContext";
import { supabase } from "@/integrations/supabase/client";

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface ForecastDetailProps {
  onBack: () => void;
  onOpenChat: () => void;
}

const cToF = (c: number) => Math.round(c * 9 / 5 + 32);

const ForecastDetail = ({ onBack }: ForecastDetailProps) => {
  const { t, unitSystem } = useLanguage();
  const isImperial = unitSystem === "imperial";
  const { data: weather } = useWeather();
  const { location } = useLocation();

  const [mlData, setMlData] = useState<{ temperature_2m: number | null; precipitation: number | null; relative_humidity_2m: number | null; wind_speed_10m: number | null } | null>(null);
  const [iotData, setIotData] = useState<{ temperature_2m: number | null; precipitation: number | null; relative_humidity_2m: number | null; wind_speed_10m: number | null } | null>(null);

  useEffect(() => {
    const now = new Date().toISOString();
    supabase
      .from("ml_predictions")
      .select("temperature_2m, precipitation, relative_humidity_2m, wind_speed_10m")
      .gte("datetime", now)
      .order("datetime", { ascending: true })
      .limit(1)
      .single()
      .then(({ data }) => { if (data) setMlData(data); });
  }, []);

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

  const fmtTemp = (c: number | null) => {
    if (c == null) return "—";
    return isImperial ? `${cToF(c)}°F` : `${Math.round(c * 10) / 10}°C`;
  };
  const fmtWind = (kmh: number | null) => {
    if (kmh == null) return "N/A";
    return isImperial ? `${Math.round(kmh * 0.621)} mph` : `${Math.round(kmh)} km/h`;
  };

  // Official values
  const offTemp = weather ? Math.round(weather.temp) : null;
  const offRain = weather ? `${weather.clouds}%` + (weather.rain_1h ? ` · ${weather.rain_1h}mm` : "") : "N/A";
  const offHumidity = weather ? `${weather.humidity}%` : "N/A";
  const offWind = weather ? fmtWind(Math.round(weather.wind_speed * 3.6)) : "N/A";

  // ML values
  const mlTemp = mlData?.temperature_2m ?? null;
  const mlRain = mlData?.precipitation != null ? `${mlData.precipitation.toFixed(1)}mm` : "N/A";
  const mlHumidity = mlData?.relative_humidity_2m != null ? `${Math.round(mlData.relative_humidity_2m)}%` : "N/A";
  const mlWind = fmtWind(mlData?.wind_speed_10m ?? null);

  // IoT values
  const iotTemp = iotData?.temperature_2m ?? null;
  const iotRain = iotData?.precipitation != null ? `${iotData.precipitation.toFixed(1)}mm` : "N/A";
  const iotHumidity = iotData?.relative_humidity_2m != null ? `${Math.round(iotData.relative_humidity_2m)}%` : "N/A";
  const iotWind = fmtWind(iotData?.wind_speed_10m ?? null);

  return (
    <div className="px-4 pb-4 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.backButton}
      </button>

      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-bold text-foreground">{t.forecastDetailTitle}</h2>
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent pointer-events-none select-none">
          {t.aiPowered}
        </span>
      </div>

      {/* Official */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Cloud className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">{t.forecastOfficial}</h3>
        </div>
        <div className="p-3 rounded-lg bg-muted mb-3">
          <p className="text-2xl font-bold text-foreground">{fmtTemp(offTemp)}</p>
          <p className="text-xs text-muted-foreground">{t.forecastRain}: {offRain}</p>
          <p className="text-xs text-muted-foreground">{t.weatherHumidity}: {offHumidity} · {t.weatherWind}: {offWind}</p>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {t.forecastDetailOfficialExplanation}
        </p>
      </div>

      {/* ML */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-secondary" />
          <h3 className="text-sm font-semibold text-foreground">{t.forecastML}</h3>
        </div>
        <div className="p-3 rounded-lg bg-muted mb-3">
          <p className="text-2xl font-bold text-foreground">{fmtTemp(mlTemp)}</p>
          <p className="text-xs text-muted-foreground">{t.forecastPrecip}: {mlRain}</p>
          <p className="text-xs text-muted-foreground">{t.weatherHumidity}: {mlHumidity} · {t.weatherWind}: {mlWind}</p>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {t.forecastDetailMLExplanation}
        </p>
      </div>

      {/* IoT */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Radio className="w-5 h-5 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">{t.forecastIoT}</h3>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-semibold">
            {t.iotLive}
          </span>
        </div>
        <div className="p-3 rounded-lg bg-muted mb-3">
          <p className="text-2xl font-bold text-foreground">{fmtTemp(iotTemp)}</p>
          <p className="text-xs text-muted-foreground">{t.forecastPrecip}: {iotRain}</p>
          <p className="text-xs text-muted-foreground">{t.weatherHumidity}: {iotHumidity} · {t.weatherWind}: {iotWind}</p>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {t.forecastDetailIoTExplanation}
        </p>
      </div>

      {/* Why compare */}
      <div className="bg-accent/5 rounded-xl border border-accent/20 shadow-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">{t.forecastDetailDeeperTitle}</h3>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {t.forecastDetailWhyCompare}
        </p>
      </div>

      {/* CTA */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4 text-center">
        <MessageCircle className="w-5 h-5 text-primary mx-auto mb-2" />
        <p className="text-sm text-foreground font-medium mb-1">{t.alertDetailAskTitle}</p>
        <p className="text-xs text-muted-foreground">{t.forecastDetailDeeperDesc}</p>
      </div>
    </div>
  );
};

export default ForecastDetail;
