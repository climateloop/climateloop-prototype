import { Users, FileText, TrendingUp, Camera, MapPin, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface CommunityReport {
  id: string;
  user: string;
  typeKey: string;
  description: string;
  time: string;
  hasPhoto: boolean;
  distance: string;
  isMine?: boolean;
}

const reportPhotos: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=400&h=300&fit=crop", // flooded street
  "3": "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=400&h=300&fit=crop", // fallen tree / strong wind
  "4": "https://images.unsplash.com/photo-1600336153113-d66c79de3e91?w=400&h=300&fit=crop", // flooded underpass
  "5": "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=300&fit=crop", // heavy rain
  "6": "https://images.unsplash.com/photo-1599245066244-12ef tried2c5?w=400&h=300&fit=crop", // storm damage
  "7": "https://images.unsplash.com/photo-1446034295857-c899f4c5e2c5?w=400&h=300&fit=crop", // overflowing drain / water
  "8": "https://images.unsplash.com/photo-1509803874385-db7c23652552?w=400&h=300&fit=crop", // heavy rain puddles
};

const reports: CommunityReport[] = [
  {
    id: "1",
    user: "María S.",
    typeKey: "typeFlooding",
    description: "Rua completamente inundada na Rúa do Franco",
    time: "15 min",
    hasPhoto: true,
    distance: "1.2 km",
    isMine: true,
  },
  {
    id: "3",
    user: "Ana L.",
    typeKey: "typeStrongWind",
    description: "Árvore caída na Rúa das Orfas após vendaval",
    time: "1h",
    hasPhoto: true,
    distance: "0.8 km",
    isMine: true,
  },
  {
    id: "4",
    user: "Pedro M.",
    typeKey: "typeFlooding",
    description: "Passagem subterrânea inundada em Praza de Galicia",
    time: "2h",
    hasPhoto: true,
    distance: "2.1 km",
  },
  {
    id: "5",
    user: "Lucía G.",
    typeKey: "typeRain",
    description: "Chuva forte persistente na Alameda",
    time: "45 min",
    hasPhoto: true,
    distance: "0.5 km",
  },
  {
    id: "6",
    user: "Carlos R.",
    typeKey: "typeStrongWind",
    description: "Danos por vento forte no Parque de Belvís",
    time: "1h 20 min",
    hasPhoto: true,
    distance: "4.2 km",
  },
  {
    id: "7",
    user: "Isabel F.",
    typeKey: "typeFlooding",
    description: "Bueiro transbordando na Rúa da Senra",
    time: "55 min",
    hasPhoto: true,
    distance: "1.8 km",
  },
  {
    id: "8",
    user: "Diego T.",
    typeKey: "typeRain",
    description: "Chuva intermitente com poças na Praza do Obradoiro",
    time: "25 min",
    hasPhoto: true,
    distance: "0.3 km",
  },
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

interface CommunityReportsProps {
  onOpenReport?: (reportId: string) => void;
  preview?: boolean;
}

const CommunityReports = ({ onOpenReport, preview }: CommunityReportsProps) => {
  const { t } = useLanguage();
  const displayReports = preview ? reports.slice(0, 3) : reports;

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
        {displayReports.map((r) => (
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
        ))}
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
