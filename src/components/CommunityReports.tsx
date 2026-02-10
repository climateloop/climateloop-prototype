import { Users, FileText, TrendingUp, Camera, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface CommunityReport {
  id: string;
  user: string;
  typeKey: "typeFlooding" | "typeExtremeHeat" | "typeStrongWind" | "typeFire";
  description: string;
  time: string;
  hasPhoto: boolean;
  distance: string;
}

const reports: CommunityReport[] = [
  {
    id: "1",
    user: "María S.",
    typeKey: "typeFlooding",
    description: "Calle completamente inundada en Gran Vía",
    time: "15 min",
    hasPhoto: true,
    distance: "1.2 km",
  },
  {
    id: "2",
    user: "Juan P.",
    typeKey: "typeExtremeHeat",
    description: "Asfalto derritiéndose en la zona este",
    time: "32 min",
    hasPhoto: false,
    distance: "3.5 km",
  },
  {
    id: "3",
    user: "Ana L.",
    typeKey: "typeStrongWind",
    description: "Árbol caído en Calle Alcalá",
    time: "1h",
    hasPhoto: true,
    distance: "0.8 km",
  },
];

const typeColorMap: Record<string, string> = {
  typeFlooding: "bg-primary/10 text-primary",
  typeExtremeHeat: "bg-destructive/10 text-destructive",
  typeStrongWind: "bg-warning/10 text-warning",
  typeFire: "bg-destructive/10 text-destructive",
};

const CommunityReports = () => {
  const { t } = useLanguage();

  return (
    <div className="mx-4">
      <h2 className="text-base font-semibold text-foreground mb-1">{t.communityTitle}</h2>
      <p className="text-xs text-muted-foreground mb-3">{t.communitySubtitle}</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-surface-elevated rounded-xl p-3 text-center shadow-card border border-border">
          <Users className="w-4 h-4 mx-auto text-primary mb-1" />
          <p className="text-xl font-bold text-foreground">84</p>
          <p className="text-[10px] text-muted-foreground">{t.communityActiveNow}</p>
        </div>
        <div className="bg-surface-elevated rounded-xl p-3 text-center shadow-card border border-border">
          <FileText className="w-4 h-4 mx-auto text-secondary mb-1" />
          <p className="text-xl font-bold text-foreground">156</p>
          <p className="text-[10px] text-muted-foreground">{t.communityReportsToday}</p>
        </div>
        <div className="bg-surface-elevated rounded-xl p-3 text-center shadow-card border border-border">
          <TrendingUp className="w-4 h-4 mx-auto text-accent mb-1" />
          <p className="text-xl font-bold text-foreground">91%</p>
          <p className="text-[10px] text-muted-foreground">{t.communityAccuracy}</p>
        </div>
      </div>

      <div className="space-y-3">
        {reports.map((r) => (
          <div key={r.id} className="bg-surface-elevated rounded-xl p-3 shadow-card border border-border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColorMap[r.typeKey] || "bg-muted text-muted-foreground"}`}>
                    {t[r.typeKey]}
                  </span>
                  {r.hasPhoto && <Camera className="w-3.5 h-3.5 text-muted-foreground" />}
                </div>
                <p className="text-sm text-foreground">{r.description}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs text-muted-foreground">{r.user}</span>
                  <span className="text-xs text-muted-foreground">{r.time}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" /> {r.distance}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityReports;
