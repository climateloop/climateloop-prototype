import { ArrowLeft, Camera, MapPin, Clock, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ReportData {
  id: string;
  user: string;
  typeKey: string;
  description: string;
  time: string;
  hasPhoto: boolean;
  distance: string;
}

const reportDetails: Record<string, ReportData & { verified: boolean; photoUrl?: string; location: string }> = {
  "1": {
    id: "1",
    user: "María S.",
    typeKey: "typeFlooding",
    description: "Calle completamente inundada en Gran Vía",
    time: "15 min",
    hasPhoto: true,
    distance: "1.2 km",
    verified: true,
    location: "Gran Vía 42, Madrid",
    photoUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&h=400&fit=crop",
  },
  "2": {
    id: "2",
    user: "Juan P.",
    typeKey: "typeExtremeHeat",
    description: "Asfalto derritiéndose en la zona este",
    time: "32 min",
    hasPhoto: false,
    distance: "3.5 km",
    verified: false,
    location: "Calle Alcalá 120, Madrid",
  },
  "3": {
    id: "3",
    user: "Ana L.",
    typeKey: "typeStrongWind",
    description: "Árbol caído en Calle Alcalá",
    time: "1h",
    hasPhoto: true,
    distance: "0.8 km",
    verified: true,
    location: "Calle Alcalá 85, Madrid",
    photoUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
  },
};

const typeColorMap: Record<string, string> = {
  typeFlooding: "bg-primary/10 text-primary",
  typeExtremeHeat: "bg-destructive/10 text-destructive",
  typeStrongWind: "bg-warning/10 text-warning",
  typeFire: "bg-destructive/10 text-destructive",
};

interface CommunityReportDetailProps {
  reportId: string;
  onBack: () => void;
  onOpenChat: () => void;
}

const CommunityReportDetail = ({ reportId, onBack, onOpenChat }: CommunityReportDetailProps) => {
  const { t } = useLanguage();
  const report = reportDetails[reportId];

  if (!report) return null;

  const typeLabel = (t as any)[report.typeKey] || report.typeKey;

  return (
    <div className="px-4 pb-4 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.backButton}
      </button>

      <h2 className="text-lg font-bold text-foreground mb-4">{t.communityDetailTitle}</h2>

      {/* Photo */}
      {report.photoUrl ? (
        <div className="rounded-xl overflow-hidden mb-4 border border-border shadow-card">
          <img
            src={report.photoUrl}
            alt={report.description}
            className="w-full h-48 object-cover"
          />
        </div>
      ) : (
        <div className="rounded-xl bg-muted border border-border mb-4 h-48 flex items-center justify-center">
          <Camera className="w-10 h-10 text-muted-foreground" />
        </div>
      )}

      {/* Type badge & verification */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColorMap[report.typeKey] || "bg-muted text-muted-foreground"}`}>
          {typeLabel}
        </span>
        {report.verified ? (
          <span className="flex items-center gap-1 text-xs text-secondary font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            {t.communityDetailVerified}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            {t.communityDetailPending}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-base text-foreground font-medium mb-4">{report.description}</p>

      {/* Metadata */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4 space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">{t.communityDetailLocation}</p>
            <p className="text-sm text-foreground">{report.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">{t.communityDetailTime}</p>
            <p className="text-sm text-foreground">{report.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">{t.communitySubtitle.split(" ")[0]}</p>
            <p className="text-sm text-foreground">{report.distance}</p>
          </div>
        </div>
      </div>

      {/* Reporter info */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-bold text-muted-foreground">{report.user.charAt(0)}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{report.user}</p>
            <p className="text-xs text-muted-foreground">{t.communityDetailTime}: {report.time}</p>
          </div>
        </div>
      </div>

      {/* Ask AI */}
      <button
        onClick={onOpenChat}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary/10 hover:bg-primary/15 transition-colors"
      >
        <MessageCircle className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">{t.alertDetailContinueChat}</span>
      </button>
    </div>
  );
};

export default CommunityReportDetail;
