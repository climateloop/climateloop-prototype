import { useState } from "react";
import { Users, FileText, TrendingUp, Camera, MapPin, Filter } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface CommunityReport {
  id: string;
  user: string;
  typeKey: string;
  description: string;
  time: string;
  hasPhoto: boolean;
  distance: string;
  distanceKm: number;
  isMine?: boolean;
}

const reportPhotos: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=400&h=300&fit=crop",
  "3": "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=400&h=300&fit=crop",
  "4": "https://images.unsplash.com/photo-1600336153113-d66c79de3e91?w=400&h=300&fit=crop",
  "5": "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=300&fit=crop",
  "6": "https://images.unsplash.com/photo-1599245066244-12ef tried2c5?w=400&h=300&fit=crop",
  "7": "https://images.unsplash.com/photo-1446034295857-c899f4c5e2c5?w=400&h=300&fit=crop",
  "8": "https://images.unsplash.com/photo-1509803874385-db7c23652552?w=400&h=300&fit=crop",
};

const reports: CommunityReport[] = [
  { id: "1", user: "María S.", typeKey: "typeFlooding", description: "Rua completamente inundada na Rúa do Franco", time: "15 min", hasPhoto: true, distance: "1.2 km", distanceKm: 1.2, isMine: true },
  { id: "3", user: "Ana L.", typeKey: "typeStrongWind", description: "Árvore caída na Rúa das Orfas após vendaval", time: "1h", hasPhoto: true, distance: "0.8 km", distanceKm: 0.8, isMine: true },
  { id: "4", user: "Pedro M.", typeKey: "typeFlooding", description: "Passagem subterrânea inundada em Praza de Galicia", time: "2h", hasPhoto: true, distance: "2.1 km", distanceKm: 2.1 },
  { id: "5", user: "Lucía G.", typeKey: "typeRain", description: "Chuva forte persistente na Alameda", time: "45 min", hasPhoto: true, distance: "0.5 km", distanceKm: 0.5 },
  { id: "6", user: "Carlos R.", typeKey: "typeStrongWind", description: "Danos por vento forte no Parque de Belvís", time: "1h 20 min", hasPhoto: true, distance: "4.2 km", distanceKm: 4.2 },
  { id: "7", user: "Isabel F.", typeKey: "typeFlooding", description: "Bueiro transbordando na Rúa da Senra", time: "55 min", hasPhoto: true, distance: "1.8 km", distanceKm: 1.8 },
  { id: "8", user: "Diego T.", typeKey: "typeRain", description: "Chuva intermitente com poças na Praza do Obradoiro", time: "25 min", hasPhoto: true, distance: "0.3 km", distanceKm: 0.3 },
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
const radiusOptions = [1, 2, 5, 10, 25, 50];

interface CommunityReportsProps {
  onOpenReport?: (reportId: string) => void;
  preview?: boolean;
}

const CommunityReports = ({ onOpenReport, preview }: CommunityReportsProps) => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  let displayReports = preview ? reports.slice(0, 3) : reports;

  if (!preview) {
    if (selectedType) {
      displayReports = displayReports.filter((r) => r.typeKey === selectedType);
    }
    if (selectedRadius) {
      displayReports = displayReports.filter((r) => r.distanceKm <= selectedRadius);
    }
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
          {/* Radius filter */}
          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5">{t.filterByRadius}</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedRadius(null)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full transition-colors ${
                  !selectedRadius ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.filterAll}
              </button>
              {radiusOptions.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRadius(selectedRadius === r ? null : r)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full transition-colors ${
                    selectedRadius === r ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r} km
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-surface-elevated rounded-lg px-2 py-1.5 text-center border border-border">
          <div className="flex items-center justify-center gap-1">
            <Users className="w-3 h-3 text-primary" />
            <span className="text-sm font-bold text-foreground">84</span>
          </div>
          <p className="text-[9px] text-muted-foreground leading-tight">{t.communityActiveNow}</p>
        </div>
        <div className="bg-surface-elevated rounded-lg px-2 py-1.5 text-center border border-border">
          <div className="flex items-center justify-center gap-1">
            <FileText className="w-3 h-3 text-secondary" />
            <span className="text-sm font-bold text-foreground">156</span>
          </div>
          <p className="text-[9px] text-muted-foreground leading-tight">{t.communityReportsToday}</p>
        </div>
        <div className="bg-surface-elevated rounded-lg px-2 py-1.5 text-center border border-border">
          <div className="flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3 text-accent" />
            <span className="text-sm font-bold text-foreground">91%</span>
          </div>
          <p className="text-[9px] text-muted-foreground leading-tight">{t.communityAccuracy}</p>
        </div>
      </div>

      <div className="space-y-3">
        {displayReports.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">{t.myContribEmpty}</p>
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
                      <MapPin className="w-3 h-3" /> {r.distance}
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

      {preview && (
        <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          {t.communitySeeAllCTA}
        </p>
      )}
    </div>
  );
};

export default CommunityReports;
