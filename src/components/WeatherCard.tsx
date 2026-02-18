import { useEffect, useRef, useState } from "react";
import { Droplets, Wind, Thermometer, CloudRain, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const cToF = (c: number) => Math.round(c * 9 / 5 + 32);

const USER_LAT = 40.4168;
const USER_LNG = -3.7038;

const radiusOptions = [
  { label: "1 km",  meters: 1000 },
  { label: "5 km",  meters: 5000 },
  { label: "10 km", meters: 10000 },
  { label: "25 km", meters: 25000 },
];

// Alert markers — severity matches AlertsPage data
const alertMarkers = [
  { id: "1", lat: 40.4195, lng: -3.7065, severity: "red",    label: "Heavy Rain – Gran Vía" },
  { id: "2", lat: 40.4140, lng: -3.6930, severity: "orange", label: "Extreme Heat – Zona Este" },
  { id: "3", lat: 40.4230, lng: -3.6880, severity: "yellow", label: "Strong Wind – Norte" },
  { id: "4", lat: 40.4070, lng: -3.6940, severity: "orange", label: "Flooding – Tunnel" },
];

const severityIcon = (severity: "red" | "orange" | "yellow") => {
  const colours = {
    red:    "hsl(5,82%,56%)",
    orange: "hsl(24,91%,59%)",
    yellow: "hsl(42,97%,56%)",
  };
  const colour = colours[severity];
  return L.divIcon({
    className: "",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    html: `<div style="
      width:22px;height:22px;border-radius:50%;
      background:${colour};
      border:2.5px solid white;
      box-shadow:0 1px 4px rgba(0,0,0,.3);
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;
    ">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </div>`,
  });
};

interface MiniAlertMapProps {
  selectedRadius: number;
  onAlertClick: (alertId: string) => void;
}

const MiniAlertMap = ({ selectedRadius, onAlertClick }: MiniAlertMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      // interactive — drag & zoom enabled
      scrollWheelZoom: false, // pinch to zoom on mobile feels better without scroll
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: false,
      keyboard: false,
    }).setView([USER_LAT, USER_LNG], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    // Zoom control in bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // User location dot
    const userIcon = L.divIcon({
      className: "",
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      html: '<div style="width:14px;height:14px;border-radius:50%;background:hsl(210,61%,29%);border:2.5px solid white;box-shadow:0 0 0 4px hsla(210,61%,29%,0.25)"></div>',
    });
    L.marker([USER_LAT, USER_LNG], { icon: userIcon }).addTo(map);

    // Radius circle
    const circle = L.circle([USER_LAT, USER_LNG], {
      radius: radiusOptions[selectedRadius].meters,
      color: "hsl(210,61%,29%)",
      fillOpacity: 0.06,
      weight: 1.5,
      dashArray: "6 4",
    }).addTo(map);
    radiusCircleRef.current = circle;

    // Alert markers — clickable
    alertMarkers.forEach((m) => {
      const marker = L.marker([m.lat, m.lng], {
        icon: severityIcon(m.severity as "red" | "orange" | "yellow"),
      }).addTo(map);
      marker.on("click", () => onAlertClick(m.id));
      marker.bindTooltip(`<span style="font-size:11px;white-space:nowrap">${m.label}</span>`, {
        permanent: false,
        direction: "top",
        offset: [0, -14],
      });
    });

    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
      radiusCircleRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep global callback for alert clicks fresh
  useEffect(() => {
    (window as any).__miniMapAlertClick__ = onAlertClick;
  }, [onAlertClick]);

  // Update radius circle & fit bounds when selection changes
  useEffect(() => {
    const circle = radiusCircleRef.current;
    const map = mapInstanceRef.current;
    if (!circle || !map) return;
    const meters = radiusOptions[selectedRadius].meters;
    circle.setRadius(meters);
    map.fitBounds(circle.getBounds(), { padding: [16, 16] });
  }, [selectedRadius]);

  return <div ref={mapRef} className="w-full h-full" />;
};

interface WeatherCardProps {
  onOpenAlertDetail?: (alertId: string) => void;
}

const WeatherCard = ({ onOpenAlertDetail }: WeatherCardProps) => {
  const { t, unitSystem } = useLanguage();
  const isImperial = unitSystem === "imperial";
  const [selectedRadius, setSelectedRadius] = useState(1);

  const temp     = isImperial ? cToF(28) : 28;
  const feelsLike = isImperial ? cToF(30) : 30;
  const windVal  = isImperial ? "9 mph" : "15 km/h";
  const unit     = isImperial ? "°F" : "°";

  const handleAlertClick = (alertId: string) => {
    onOpenAlertDetail?.(alertId);
  };

  return (
    <div className="mx-4 rounded-2xl border border-border bg-surface-elevated shadow-card overflow-hidden">
      {/* Compact weather strip */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-primary/10">
        <div className="flex items-center gap-3">
          <CloudRain className="w-5 h-5 text-primary opacity-80" />
          <div>
            <p className="text-[10px] text-muted-foreground font-medium">{t.weatherLocation}</p>
            <p className="text-base font-bold text-foreground leading-tight">
              {temp}{unit}
              <span className="text-xs font-normal text-muted-foreground ml-1.5">{t.weatherPartlyCloudy}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <div className="flex flex-col items-center gap-0.5">
            <Thermometer className="w-3 h-3" />
            <span>{feelsLike}{unit}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <Droplets className="w-3 h-3" />
            <span>72%</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <Wind className="w-3 h-3" />
            <span>{windVal}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <CloudRain className="w-3 h-3" />
            <span>40%</span>
          </div>
        </div>
      </div>

      {/* Interactive map */}
      <div className="relative" style={{ height: "220px" }}>
        <MiniAlertMap selectedRadius={selectedRadius} onAlertClick={handleAlertClick} />

        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1.5 text-[9px] space-y-0.5 border border-border z-[400] pointer-events-none">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-foreground">{t.mapHighRisk}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-foreground">{t.mapModerateRisk}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-foreground">{t.mapLowRisk}</span>
          </div>
        </div>

        {/* Active alerts badge */}
        <div className="absolute top-2 right-2 z-[400] pointer-events-none">
          <div className="flex items-center gap-1 bg-destructive/90 text-destructive-foreground text-[9px] font-semibold px-1.5 py-0.5 rounded-full shadow">
            <AlertTriangle className="w-2.5 h-2.5" />
            <span>2 {t.alertCategoryNow}</span>
          </div>
        </div>
      </div>

      {/* Radius selector */}
      <div className="px-3 py-2 border-t border-border bg-muted/40">
        <p className="text-[9px] text-muted-foreground font-medium mb-1.5 uppercase tracking-wide">{t.mapRadius}</p>
        <div className="flex gap-1.5">
          {radiusOptions.map((r, i) => (
            <button
              key={r.label}
              onClick={() => setSelectedRadius(i)}
              className={`flex-1 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                i === selectedRadius
                  ? "gradient-primary text-primary-foreground shadow-sm"
                  : "bg-background text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
