import { useEffect, useRef, useState } from "react";
import { Droplets, Wind, Thermometer, CloudRain } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const cToF = (c: number) => Math.round(c * 9 / 5 + 32);

const USER_LAT = 42.8782;
const USER_LNG = -8.5448;

const radiusOptions = [
  { label: "1 km",  meters: 1000 },
  { label: "5 km",  meters: 5000 },
  { label: "10 km", meters: 10000 },
  { label: "25 km", meters: 25000 },
];

// SVG paths for each community report type
const reportTypeIconSVG: Record<string, string> = {
  typeFlooding:    `<path d="M2 12h20M2 18h20M6 6h.01M10 6h.01M14 6h.01M18 6h.01M4 9h16a1 1 0 0 1 1 1v2H3v-2a1 1 0 0 1 1-1z"/>`,
  typeExtremeHeat: `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`,
  typeStrongWind:  `<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>`,
  typeFire:        `<path d="M12 12c-2-2.5-4-5-2-9C9 8 12.5 9 13 10c.5-1.5.5-4 2-6-1 3 1 5 1 7 1-1 3-2 3-5 0 4-2 7-7 8z"/>`,
};

// Risk level → marker colour
const riskColour: Record<string, string> = {
  high:     "hsl(5,82%,56%)",
  moderate: "hsl(24,91%,52%)",
  low:      "hsl(42,97%,48%)",
};

// Community reports shown on the mini-map (matches CommunityReports data)
export const communityMapMarkers = [
  { id: "1", lat: 42.8782, lng: -8.5448, typeKey: "typeFlooding",    risk: "high",     label: "Rua inundada — María S.", filterCat: "flood" },
  { id: "2", lat: 42.8650, lng: -8.5200, typeKey: "typeExtremeHeat", risk: "moderate", label: "Asfalto derretendo — Juan P.", filterCat: "heat" },
  { id: "3", lat: 42.8900, lng: -8.5100, typeKey: "typeStrongWind",  risk: "low",      label: "Árvore caída — Ana L.", filterCat: "wind" },
  { id: "4", lat: 42.8700, lng: -8.5350, typeKey: "typeFlooding",    risk: "high",     label: "Passagem subterrânea inundada — Pedro M.", filterCat: "flood" },
];

export const communityMarkerIcon = (typeKey: string, risk: string) => {
  const colour   = riskColour[risk] ?? riskColour["moderate"];
  const iconPath = reportTypeIconSVG[typeKey] ?? reportTypeIconSVG["typeFlooding"];
  return L.divIcon({
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    html: `<div style="
      width:30px;height:30px;border-radius:50%;
      background:${colour};
      border:3px solid white;
      box-shadow:0 2px 6px rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;
    ">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        ${iconPath}
      </svg>
    </div>`,
  });
};

// Filter definitions with icon SVGs and colors
const mapFilterDefs = [
  { key: "rain",    color: "hsl(210,60%,55%)", iconSvg: `<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><path d="M8 16l-2 3m6-3l-2 3m6-3l-2 3"/>` },
  { key: "wind",    color: "hsl(200,15%,55%)", iconSvg: `<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>` },
  { key: "heat",    color: "hsl(5,82%,56%)",   iconSvg: `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>` },
  { key: "flood",   color: "hsl(220,65%,50%)", iconSvg: `<path d="M2 12h20M2 18h20M4 9h16a1 1 0 0 1 1 1v2H3v-2a1 1 0 0 1 1-1z"/>` },
  { key: "fire",    color: "hsl(24,91%,52%)",  iconSvg: `<path d="M12 12c-2-2.5-4-5-2-9C9 8 12.5 9 13 10c.5-1.5.5-4 2-6-1 3 1 5 1 7 1-1 3-2 3-5 0 4-2 7-7 8z"/>` },
  { key: "frost",   color: "hsl(195,70%,55%)", iconSvg: `<path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>` },
  { key: "hail",    color: "hsl(260,40%,55%)", iconSvg: `<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><circle cx="8" cy="19" r="1"/><circle cx="12" cy="21" r="1"/><circle cx="16" cy="19" r="1"/>` },
  { key: "air",     color: "hsl(160,50%,45%)", iconSvg: `<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>` },
  { key: "alerts",  color: "hsl(45,90%,50%)",  iconSvg: `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>` },
  { key: "metrics", color: "hsl(140,45%,45%)", iconSvg: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>` },
];

// Mock counts per filter
const filterCounts: Record<string, number> = {
  rain: 1, wind: 1, heat: 1, flood: 1, fire: 1, frost: 1, hail: 1, air: 1, alerts: 3, metrics: 3,
};

const filterLabelKey: Record<string, string> = {
  rain: "catRain", wind: "catWind", heat: "catHeat", flood: "catFlood",
  fire: "catFire", frost: "catFrost", hail: "catHail", air: "catAir",
  alerts: "catAlerts", metrics: "catMetrics",
};

interface MiniAlertMapProps {
  selectedRadius: number;
  onReportClick: (reportId: string) => void;
}

const MiniAlertMap = ({ selectedRadius, onReportClick }: MiniAlertMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: false,
      keyboard: false,
    }).setView([USER_LAT, USER_LNG], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

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

    // Community report markers — clickable
    communityMapMarkers.forEach((m) => {
      const marker = L.marker([m.lat, m.lng], {
        icon: communityMarkerIcon(m.typeKey, m.risk),
      }).addTo(map);
      marker.on("click", () => onReportClick(m.id));
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

  // Keep global callback fresh
  useEffect(() => {
    (window as any).__miniMapReportClick__ = onReportClick;
  }, [onReportClick]);

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
  onOpenCommunityDetail?: (reportId: string) => void;
}

const WeatherCard = ({ onOpenCommunityDetail }: WeatherCardProps) => {
  const { t, unitSystem } = useLanguage();
  const isImperial = unitSystem === "imperial";
  const [selectedRadius, setSelectedRadius] = useState(1);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(mapFilterDefs.map(f => f.key)));

  const temp     = isImperial ? cToF(28) : 28;
  const feelsLike = isImperial ? cToF(30) : 30;
  const windVal  = isImperial ? "9 mph" : "15 km/h";
  const unit     = isImperial ? "°F" : "°";

  const handleAlertClick = (reportId: string) => {
    onOpenCommunityDetail?.(reportId);
  };

  const toggleFilter = (key: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleAll = () => {
    if (activeFilters.size === mapFilterDefs.length) {
      setActiveFilters(new Set());
    } else {
      setActiveFilters(new Set(mapFilterDefs.map(f => f.key)));
    }
  };

  const allActive = activeFilters.size === mapFilterDefs.length;

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
        <MiniAlertMap selectedRadius={selectedRadius} onReportClick={handleAlertClick} />

        {/* Community reports badge */}
        <div className="absolute top-2 right-2 z-[400] pointer-events-none">
          <div className="flex items-center gap-1 bg-primary/90 text-primary-foreground text-[9px] font-semibold px-1.5 py-0.5 rounded-full shadow">
            <span>4 {t.communityReportsToday}</span>
          </div>
        </div>
      </div>

      {/* Filter chips panel */}
      <div className="px-3 py-2.5 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-foreground">{t.mapFilters}</p>
          <button
            onClick={toggleAll}
            className="text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.mapFilterAll}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {mapFilterDefs.map((f) => {
            const isActive = activeFilters.has(f.key);
            const label = (t as any)[filterLabelKey[f.key]] || f.key;
            const count = filterCounts[f.key] ?? 0;
            return (
              <button
                key={f.key}
                onClick={() => toggleFilter(f.key)}
                className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium transition-all border"
                style={{
                  borderColor: isActive ? f.color : "hsl(var(--border))",
                  background: isActive ? `${f.color}15` : "transparent",
                  color: isActive ? f.color : "hsl(var(--muted-foreground))",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: f.iconSvg }} />
                <span>{label}</span>
                <span
                  className="inline-flex items-center justify-center rounded-full text-[8px] font-bold min-w-[14px] h-[14px] px-0.5"
                  style={{
                    background: isActive ? f.color : "hsl(var(--muted))",
                    color: isActive ? "white" : "hsl(var(--muted-foreground))",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
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
