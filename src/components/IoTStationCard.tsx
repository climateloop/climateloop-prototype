import { useState, useEffect, useMemo } from "react";
import { Radio, Thermometer, Droplets, Wind, Clock, MapPin, Info, X, CloudRain } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocation } from "@/hooks/useLocationContext";
import { supabase } from "@/integrations/supabase/client";

const cToF = (c: number) => Math.round(c * 9 / 5 + 32);
const kmhToMph = (k: number) => Math.round(k * 0.621371);

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface Station {
  id: string;
  station_code: string;
  name: string | null;
  latitude: number;
  longitude: number;
  is_active: boolean;
}

interface Reading {
  datetime: string;
  temperature_2m: number | null;
  relative_humidity_2m: number | null;
  wind_speed_10m: number | null;
  precipitation: number | null;
}

const IoTStationCard = () => {
  const { t, unitSystem } = useLanguage();
  const { location } = useLocation();
  const [showInfo, setShowInfo] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [latestReading, setLatestReading] = useState<Reading | null>(null);
  const [loading, setLoading] = useState(true);
  const isImperial = unitSystem === "imperial";

  // Find nearest station
  const nearestStation = useMemo(() => {
    if (!stations.length) return null;
    let nearest = stations[0];
    let minDist = Infinity;
    for (const s of stations) {
      const d = haversineDistance(location.lat, location.lng, s.latitude, s.longitude);
      if (d < minDist) {
        minDist = d;
        nearest = s;
      }
    }
    return { station: nearest, distance: minDist };
  }, [stations, location.lat, location.lng]);

  // Fetch stations
  useEffect(() => {
    const fetchStations = async () => {
      const { data } = await supabase
        .from("iot_stations")
        .select("id, station_code, name, latitude, longitude, is_active")
        .eq("is_active", true);
      if (data) setStations(data);
    };
    fetchStations();
  }, []);

  // Fetch latest reading for nearest station
  useEffect(() => {
    if (!nearestStation) return;
    const fetchReading = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("iot_readings")
        .select("datetime, temperature_2m, relative_humidity_2m, wind_speed_10m, precipitation")
        .eq("station_id", nearestStation.station.id)
        .order("datetime", { ascending: false })
        .limit(1)
        .single();
      if (data) setLatestReading(data);
      setLoading(false);
    };
    fetchReading();
  }, [nearestStation?.station.id]);

  const distanceLabel = nearestStation
    ? isImperial
      ? `${(nearestStation.distance * 0.621371).toFixed(1)} mi`
      : `${nearestStation.distance.toFixed(1)} km`
    : "—";

  const temp = latestReading?.temperature_2m != null
    ? isImperial ? `${cToF(latestReading.temperature_2m)}°F` : `${latestReading.temperature_2m.toFixed(1)}°C`
    : "—";

  const humidity = latestReading?.relative_humidity_2m != null
    ? `${Math.round(latestReading.relative_humidity_2m)}%`
    : "—";

  const wind = latestReading?.wind_speed_10m != null
    ? isImperial ? `${kmhToMph(latestReading.wind_speed_10m)} mph` : `${latestReading.wind_speed_10m.toFixed(1)} km/h`
    : "—";

  const isRaining = (latestReading?.precipitation ?? 0) > 0.1;
  const rainIntensity = latestReading?.precipitation != null
    ? `${latestReading.precipitation.toFixed(1)} mm/h`
    : "—";

  const timeSince = latestReading
    ? (() => {
        const diff = Math.round((Date.now() - new Date(latestReading.datetime).getTime()) / 60000);
        if (diff < 1) return "agora";
        if (diff < 60) return `${diff} min`;
        return `${Math.round(diff / 60)}h`;
      })()
    : "—";

  const stationName = nearestStation?.station.station_code ?? "—";

  return (
    <div className="mx-4">
      <div className="flex items-center gap-2 mb-3">
        <Radio className="w-4 h-4 text-secondary" />
        <h2 className="text-base font-semibold text-foreground">{t.iotTitle}</h2>
        <button
          onClick={() => setShowInfo(true)}
          className="p-0.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Info"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-semibold text-foreground">{stationName}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-semibold">
              {t.iotLive}
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="text-[10px]">{distanceLabel}</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg bg-muted animate-pulse h-12" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg bg-muted">
              <Thermometer className="w-3 h-3 text-destructive" />
              <span className="text-[11px] font-bold text-foreground leading-none">{temp}</span>
              <span className="text-[8px] text-muted-foreground leading-none">{t.weatherFeelsLike}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg bg-muted">
              <Droplets className="w-3 h-3 text-primary" />
              <span className="text-[11px] font-bold text-foreground leading-none">{humidity}</span>
              <span className="text-[8px] text-muted-foreground leading-none">{t.weatherHumidity}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg bg-muted">
              <Wind className="w-3 h-3 text-accent" />
              <span className="text-[11px] font-bold text-foreground leading-none">{wind}</span>
              <span className="text-[8px] text-muted-foreground leading-none">{t.weatherWind}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg bg-muted">
              <CloudRain className={`w-3 h-3 ${isRaining ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-[11px] font-bold text-foreground leading-none">{isRaining ? rainIntensity : "0 mm/h"}</span>
              <span className="text-[8px] text-muted-foreground leading-none">{t.weatherRainChance}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span className="text-[10px]">{t.iotLastUpdate}: {timeSince}</span>
          </div>
          <span className="text-[10px] text-muted-foreground italic">{t.iotRadiusNote}</span>
        </div>
      </div>

      {/* IoT Info Sheet */}
      {showInfo && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[100] animate-in fade-in duration-200"
            onClick={() => setShowInfo(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-[101] max-w-lg mx-auto animate-in slide-in-from-bottom duration-300">
            <div className="bg-background rounded-t-2xl border-t border-border shadow-elevated p-5 pb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-secondary" />
                  <h3 className="text-base font-bold text-foreground">{t.iotInfoTitle}</h3>
                </div>
                <button
                  onClick={() => setShowInfo(false)}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-foreground leading-relaxed">{t.iotInfoDesc1}</p>
                <p className="text-sm text-foreground leading-relaxed">{t.iotInfoDesc2}</p>
                <p className="text-sm text-foreground leading-relaxed">{t.iotInfoDesc3}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IoTStationCard;
