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
  { label: "50 km", meters: 50000 },
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

interface HomeMapProps {
  onOpenCommunityDetail?: (reportId: string) => void;
}

const HomeMap = ({ onOpenCommunityDetail }: HomeMapProps) => {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);
  const [selectedRadius, setSelectedRadius] = useState(1);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
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

  return (
    <div className="mx-4">
      <div className="rounded-xl overflow-hidden border border-border shadow-card relative" style={{ height: "280px" }}>
        <div ref={mapRef} className="absolute inset-0 z-0" />

        {/* Simple radius selector overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-[400]">
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
      <p className="text-[11px] text-muted-foreground text-center mt-1.5">{t.homeMapHint}</p>
    </div>
  );
};

export default HomeMap;
