import { useEffect, useRef } from "react";
import { Layers, Navigation } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapPage = () => {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([40.4168, -3.7038], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Risk zones
    L.circle([40.42, -3.71], { radius: 600, color: "hsl(0, 72%, 51%)", fillOpacity: 0.2, weight: 1 }).addTo(map);
    L.circle([40.41, -3.69], { radius: 400, color: "hsl(25, 95%, 53%)", fillOpacity: 0.2, weight: 1 }).addTo(map);
    L.circle([40.425, -3.685], { radius: 350, color: "hsl(48, 96%, 53%)", fillOpacity: 0.15, weight: 1 }).addTo(map);

    // Community report markers
    const redIcon = L.divIcon({ className: "", html: '<div style="width:12px;height:12px;border-radius:50%;background:hsl(0,72%,51%);border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,.3)"></div>' });
    const orangeIcon = L.divIcon({ className: "", html: '<div style="width:12px;height:12px;border-radius:50%;background:hsl(25,95%,53%);border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,.3)"></div>' });
    const yellowIcon = L.divIcon({ className: "", html: '<div style="width:12px;height:12px;border-radius:50%;background:hsl(48,96%,53%);border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,.3)"></div>' });

    L.marker([40.4195, -3.7065], { icon: redIcon }).addTo(map).bindPopup("Calle inundada — María S.");
    L.marker([40.4140, -3.6930], { icon: orangeIcon }).addTo(map).bindPopup("Asfalto derritiéndose — Juan P.");
    L.marker([40.4230, -3.6880], { icon: yellowIcon }).addTo(map).bindPopup("Árbol caído — Ana L.");
    L.marker([40.4070, -3.6940], { icon: redIcon }).addTo(map).bindPopup("Paso subterráneo inundado — Pedro M.");

    // User location
    const userIcon = L.divIcon({
      className: "",
      html: '<div style="width:14px;height:14px;border-radius:50%;background:hsl(210,61%,29%);border:3px solid white;box-shadow:0 0 0 4px hsla(210,61%,29%,0.3)"></div>',
    });
    L.marker([40.4168, -3.7038], { icon: userIcon }).addTo(map).bindPopup("You are here");

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center gap-2 mb-4">
        <Navigation className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">{t.mapTitle}</h2>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-border shadow-card" style={{ height: "400px" }}>
        <div ref={mapRef} className="w-full h-full" />

        {/* Legend overlay */}
        <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm rounded-lg p-2 text-[10px] space-y-1 border border-border z-[1000]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-foreground">{t.mapHighRisk}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-foreground">{t.mapModerateRisk}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-foreground">{t.mapLowRisk}</span>
          </div>
        </div>

        {/* Controls overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-[1000]">
          <button className="w-8 h-8 bg-background/90 backdrop-blur-sm rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
            <Layers className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      <div className="mt-4 bg-surface-elevated rounded-xl border border-border p-4 shadow-card">
        <p className="text-sm font-medium text-foreground mb-2">{t.mapRadius}</p>
        <div className="flex gap-2">
          {["1 km", "5 km", "10 km", "25 km"].map((r, i) => (
            <button
              key={r}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                i === 1
                  ? "gradient-primary text-primary-foreground shadow-card"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
