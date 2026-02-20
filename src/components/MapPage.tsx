import { useEffect, useRef, useState } from "react";
import { Layers, Navigation } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { communityMapMarkers, communityMarkerIcon } from "@/components/WeatherCard";

const USER_LAT = 40.4168;
const USER_LNG = -3.7038;

const radiusOptions = [
  { label: "1 km", meters: 1000 },
  { label: "5 km", meters: 5000 },
  { label: "10 km", meters: 10000 },
  { label: "25 km", meters: 25000 },
];

interface MapPageProps {
  onOpenCommunityDetail?: (reportId: string) => void;
}

const MapPage = ({ onOpenCommunityDetail }: MapPageProps) => {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);
  const [selectedRadius, setSelectedRadius] = useState(1);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([USER_LAT, USER_LNG], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Community report markers — themed icons, click opens detail directly
    communityMapMarkers.forEach((m) => {
      const marker = L.marker([m.lat, m.lng], {
        icon: communityMarkerIcon(m.typeKey),
      }).addTo(map);
      marker.on("click", () => onOpenCommunityDetail?.(m.id));
      marker.bindTooltip(
        `<span style="font-size:11px;white-space:nowrap">${m.label}</span>`,
        { permanent: false, direction: "top", offset: [0, -14] }
      );
    });

    // User location
    const userIcon = L.divIcon({
      className: "",
      html: '<div style="width:14px;height:14px;border-radius:50%;background:hsl(210,61%,29%);border:3px solid white;box-shadow:0 0 0 4px hsla(210,61%,29%,0.3)"></div>',
    });
    L.marker([USER_LAT, USER_LNG], { icon: userIcon }).addTo(map);

    // Radius circle
    const circle = L.circle([USER_LAT, USER_LNG], {
      radius: radiusOptions[1].meters,
      color: "hsl(210, 61%, 29%)",
      fillOpacity: 0.06,
      weight: 1.5,
      dashArray: "6 4",
    }).addTo(map);
    radiusCircleRef.current = circle;

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      radiusCircleRef.current = null;
    };
  }, []);

  // Keep callback fresh without recreating the map
  useEffect(() => {
    (window as any).__openReport__ = (id: string) => {
      onOpenCommunityDetail?.(id);
    };
    return () => {
      delete (window as any).__openReport__;
    };
  }, [onOpenCommunityDetail]);

  // Update radius circle when selection changes
  useEffect(() => {
    const circle = radiusCircleRef.current;
    const map = mapInstanceRef.current;
    if (!circle || !map) return;

    const meters = radiusOptions[selectedRadius].meters;
    circle.setRadius(meters);
    map.fitBounds(circle.getBounds(), { padding: [20, 20] });
  }, [selectedRadius]);

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center gap-2 mb-4">
        <Navigation className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">{t.mapTitle}</h2>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-border shadow-card z-0" style={{ height: "400px" }}>
        <div ref={mapRef} className="w-full h-full z-0" />

        {/* Legend overlay */}
        <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm rounded-lg p-2 text-[10px] space-y-1 border border-border z-[400]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: "hsl(210,61%,45%)" }} />
            <span className="text-foreground">{t.typeFlooding}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: "hsl(5,82%,56%)" }} />
            <span className="text-foreground">{t.typeExtremeHeat}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: "hsl(42,97%,48%)" }} />
            <span className="text-foreground">{t.typeStrongWind}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: "hsl(24,91%,52%)" }} />
            <span className="text-foreground">{t.typeFire}</span>
          </div>
        </div>

        {/* Controls overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-[400]">
          <button className="w-8 h-8 bg-background/90 backdrop-blur-sm rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
            <Layers className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      <div className="mt-4 bg-surface-elevated rounded-xl border border-border p-4 shadow-card">
        <p className="text-sm font-medium text-foreground mb-2">{t.mapRadius}</p>
        <div className="flex gap-2">
          {radiusOptions.map((r, i) => (
            <button
              key={r.label}
              onClick={() => setSelectedRadius(i)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                i === selectedRadius
                  ? "gradient-primary text-primary-foreground shadow-card"
                  : "bg-muted text-muted-foreground hover:text-foreground"
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

export default MapPage;
