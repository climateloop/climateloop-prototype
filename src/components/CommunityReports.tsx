import { useState, useMemo } from "react";
import { Users, Camera, MapPin, Filter, Search } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocation } from "@/hooks/useLocationContext";

import reportPhoto1 from "@/assets/community/report-1-flooding-street.jpg";
import reportPhoto3 from "@/assets/community/report-3-fallen-tree.jpg";
import reportPhoto4 from "@/assets/community/report-4-flooded-underpass.jpg";
import reportPhoto5 from "@/assets/community/report-5-heavy-rain-plaza.jpg";
import reportPhoto6 from "@/assets/community/report-6-wind-damage.jpg";
import reportPhoto7 from "@/assets/community/report-7-river-overflow.jpg";
import reportPhoto8 from "@/assets/community/report-8-rain-puddles.jpg";

interface CommunityReport {
  id: string;
  user: string;
  typeKey: string;
  description: string;
  time: string;
  hasPhoto: boolean;
  lat: number;
  lng: number;
  isMine?: boolean;
}

const reportPhotos: Record<string, string> = {
  "1": reportPhoto1,
  "3": reportPhoto3,
  "4": reportPhoto4,
  "5": reportPhoto5,
  "6": reportPhoto6,
  "7": reportPhoto7,
  "8": reportPhoto8,
};

// Haversine distance in km
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const reports: CommunityReport[] = [
  { id: "1", user: "María S.", typeKey: "typeFlooding", description: "Rúa da Raíña completamente inundada tras forte chuveira", time: "15 min", hasPhoto: true, lat: 43.0101, lng: -7.5570, isMine: true },
  { id: "3", user: "Ana L.", typeKey: "typeStrongWind", description: "Árbore caída na Rúa Nova bloqueando o tráfico", time: "1h", hasPhoto: true, lat: 43.0090, lng: -7.5545, isMine: true },
  { id: "4", user: "Pedro M.", typeKey: "typeFlooding", description: "Paso subterráneo inundado preto da Muralla Romana", time: "2h", hasPhoto: true, lat: 43.0120, lng: -7.5530 },
  { id: "5", user: "Lucía G.", typeKey: "typeRain", description: "Chuvia forte persistente na Praza Maior de Lugo", time: "45 min", hasPhoto: true, lat: 43.0098, lng: -7.5565 },
  { id: "6", user: "Carlos R.", typeKey: "typeStrongWind", description: "Ramas partidas e destrozos polo vento na Praza de Santa María", time: "1h 20 min", hasPhoto: true, lat: 43.0130, lng: -7.5610 },
  { id: "7", user: "Isabel F.", typeKey: "typeFlooding", description: "Río Miño crecido con desbordamento parcial na zona do Balneario", time: "55 min", hasPhoto: true, lat: 43.0060, lng: -7.5620 },
  { id: "8", user: "Diego T.", typeKey: "typeRain", description: "Chuvia intermitente con pozas na Rúa San Pedro", time: "25 min", hasPhoto: true, lat: 43.0105, lng: -7.5555 },
];

const typeColorMap: Record<string, string> = {
  typeFlooding: "bg-primary/10 text-primary",
  typeExtremeHeat: "bg-destructive/10 text-destructive",
  typeStrongWind: "bg-warning/10 text-warning",
  typeFire: "bg-destructive/10 text-destructive",
  typeRain: "bg-primary/10 text-primary",
  typeHail: "bg-accent/10 text-accent",
  typeFrost: "bg-secondary/10 text-secondary",
};

const availableTypes = ["typeFlooding", "typeStrongWind", "typeRain", "typeExtremeHeat", "typeFire", "typeHail", "typeFrost"];


interface CommunityReportsProps {
  onOpenReport?: (reportId: string) => void;
  preview?: boolean;
}

const CommunityReports = ({ onOpenReport, preview }: CommunityReportsProps) => {
  const { t } = useLanguage();
  const { location: userLoc } = useLocation();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<number>(10);
  const [showFilters, setShowFilters] = useState(false);

  const reportsWithDistance = useMemo(
    () =>
      reports.map((r) => ({
        ...r,
        distanceKm: haversineKm(userLoc.lat, userLoc.lng, r.lat, r.lng),
      })),
    [userLoc.lat, userLoc.lng]
  );

  // Always filter by radius (both preview and full view)
  let displayReports = reportsWithDistance.filter((r) => r.distanceKm <= selectedRadius);

  if (!preview) {
    if (selectedType) {
      displayReports = displayReports.filter((r) => r.typeKey === selectedType);
    }
  } else {
    displayReports = displayReports.slice(0, 3);
  }

  return (
    <div className="mx-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-semibold text-foreground">{t.communityTitle}</h2>
        {!preview && (
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`p-1.5 rounded-lg transition-colors ${showFilters ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Filter className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-3">{t.communitySubtitle}</p>

      {/* Filters */}
      {!preview && showFilters && (
        <div className="mb-3 space-y-2 bg-surface-elevated rounded-xl border border-border p-3">
          {/* Type filter */}
          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5">{t.filterByType}</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedType(null)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full transition-colors ${
                  !selectedType ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.filterAll}
              </button>
              {availableTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full transition-colors ${
                    selectedType === type ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {(t as any)[type] || type}
                </button>
              ))}
            </div>
          </div>
          {/* Radius filter — slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{t.filterByRadius}</p>
              <span className="text-xs font-semibold text-foreground">{selectedRadius} km</span>
            </div>
            <input
              type="range"
              min={1}
              max={800}
              step={1}
              value={selectedRadius}
              onChange={(e) => setSelectedRadius(Number(e.target.value))}
              className="w-full accent-primary h-1.5"
            />
            <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5">
              <span>1 km</span>
              <span>800 km</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {displayReports.length === 0 ? (
          <div className="flex flex-col items-center py-8 text-center px-4">
            <Search className="w-8 h-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">{t.communityNoReportsNearby}</p>
          </div>
        ) : (
          displayReports.map((r) => (
            <button
              key={r.id}
              onClick={() => onOpenReport?.(r.id)}
              className="w-full text-left bg-surface-elevated rounded-xl overflow-hidden shadow-card border border-border hover:border-primary/50 hover:shadow-elevated transition-all group"
            >
              <div className="p-3 flex gap-3">
                {r.hasPhoto && (
                  <img
                    src={reportPhotos[r.id] || "/placeholder.svg"}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColorMap[r.typeKey] || "bg-muted text-muted-foreground"}`}>
                      {(t as any)[r.typeKey] || r.typeKey}
                    </span>
                    {r.hasPhoto && <Camera className="w-3.5 h-3.5 text-muted-foreground" />}
                  </div>
                  <p className="text-sm text-foreground">{r.description}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-muted-foreground">{r.isMine ? t.communitySentByMe : r.user}</span>
                    <span className="text-xs text-muted-foreground">{r.time}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" /> {r.distanceKm.toFixed(1)} km
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                    {t.communityViewDetails}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {preview && displayReports.length > 0 && (
        <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          {t.communitySeeAllCTA}
        </p>
      )}
    </div>
  );
};

export default CommunityReports;
