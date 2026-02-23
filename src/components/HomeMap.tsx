import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { communityMapMarkers, communityMarkerIcon } from "@/components/WeatherCard";

const USER_LAT = 42.8782;
const USER_LNG = -8.5448;

const radiusOptions = [
  { label: "1 km", meters: 1000 },
  { label: "5 km", meters: 5000 },
  { label: "10 km", meters: 10000 },
  { label: "25 km", meters: 25000 },
];

// CAP (RSS) alert markers
const capAlertMarkers = [
  { id: "cap-1", lat: 42.9200, lng: -8.6100, severity: "red", label: "CAP: Chuva intensa — AEMET" },
  { id: "cap-2", lat: 42.8500, lng: -8.4800, severity: "orange", label: "CAP: Vento forte — AEMET" },
  { id: "cap-3", lat: 42.8350, lng: -8.5600, severity: "yellow", label: "CAP: Temperatura alta — AEMET" },
];

const capSeverityColor: Record<string, string> = {
  red: "hsl(5,82%,56%)",
  orange: "hsl(24,91%,52%)",
  yellow: "hsl(42,97%,48%)",
};

const capMarkerIcon = (severity: string) => {
  const colour = capSeverityColor[severity] ?? capSeverityColor["orange"];
  return L.divIcon({
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    html: `<div style="
      width:32px;height:32px;border-radius:6px;
      background:white;
      border:2.5px solid ${colour};
      box-shadow:0 2px 6px rgba(0,0,0,.25);
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;
    ">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="${colour}" stroke="${colour}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13" stroke="white" stroke-width="2"/>
        <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" stroke-width="2"/>
      </svg>
    </div>`,
  });
};

// Filter definitions
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

const filterCounts: Record<string, number> = {
  rain: 2, wind: 2, heat: 2, flood: 3, fire: 1, frost: 1, hail: 1, air: 1, alerts: 3, metrics: 3,
};

const filterLabelKey: Record<string, string> = {
  rain: "catRain", wind: "catWind", heat: "catHeat", flood: "catFlood",
  fire: "catFire", frost: "catFrost", hail: "catHail", air: "catAir",
  alerts: "catAlerts", metrics: "catMetrics",
};

interface HomeMapProps {
  onOpenCommunityDetail?: (reportId: string) => void;
}

const HomeMap = ({ onOpenCommunityDetail }: HomeMapProps) => {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);
  const [selectedRadius, setSelectedRadius] = useState(1);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(mapFilterDefs.map(f => f.key)));

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

    // Community report markers
    communityMapMarkers.forEach((m) => {
      const marker = L.marker([m.lat, m.lng], {
        icon: communityMarkerIcon(m.typeKey, m.risk),
      }).addTo(map);
      marker.on("click", () => onOpenCommunityDetail?.(m.id));
      marker.bindTooltip(`<span style="font-size:11px;white-space:nowrap">${m.label}</span>`, {
        permanent: false, direction: "top", offset: [0, -14],
      });
    });

    // CAP alert markers
    capAlertMarkers.forEach((m) => {
      const marker = L.marker([m.lat, m.lng], {
        icon: capMarkerIcon(m.severity),
      }).addTo(map);
      marker.bindTooltip(`<span style="font-size:11px;white-space:nowrap">${m.label}</span>`, {
        permanent: false, direction: "top", offset: [0, -14],
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

  useEffect(() => {
    const circle = radiusCircleRef.current;
    const map = mapInstanceRef.current;
    if (!circle || !map) return;
    const meters = radiusOptions[selectedRadius].meters;
    circle.setRadius(meters);
    map.fitBounds(circle.getBounds(), { padding: [16, 16] });
  }, [selectedRadius]);

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

  return (
    <div className="relative" style={{ height: "520px" }}>
      {/* Full-bleed map */}
      <div ref={mapRef} className="absolute inset-0 z-0" />

      {/* Stats overlay — top */}
      <div className="absolute top-3 left-3 right-14 z-[400] pointer-events-none">
        <div className="flex gap-2 overflow-x-auto pointer-events-auto">
          <div className="bg-background/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-border shadow-card flex items-center gap-2 min-w-fit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            <div>
              <p className="text-lg font-bold text-foreground leading-none">{communityMapMarkers.length + 4}</p>
              <p className="text-[9px] text-muted-foreground">{t.communityReportsToday}</p>
            </div>
          </div>
          <div className="bg-background/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-border shadow-card flex items-center gap-2 min-w-fit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="hsl(42,97%,48%)" stroke="hsl(42,97%,48%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            </svg>
            <div>
              <p className="text-lg font-bold text-foreground leading-none">{capAlertMarkers.length}</p>
              <p className="text-[9px] text-muted-foreground">{t.catAlerts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter panel — bottom, overlapping map */}
      <div className="absolute bottom-0 left-0 right-0 z-[400]">
        <div className="mx-3 mb-3 bg-background/95 backdrop-blur-sm rounded-xl border border-border shadow-card px-3 py-2.5">
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
        <div className="mx-3 mb-3 bg-background/95 backdrop-blur-sm rounded-xl border border-border shadow-card px-3 py-2">
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
    </div>
  );
};

export default HomeMap;
