import { ArrowLeft, Camera, MapPin, Clock, CheckCircle, MessageCircle, EyeOff } from "lucide-react";
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

const reportDetails: Record<string, ReportData & { verified: boolean; photoUrl?: string; location: string; photoBlurred?: boolean }> = {
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
  "4": {
    id: "4",
    user: "Pedro M.",
    typeKey: "typeFlooding",
    description: "Paso subterráneo inundado en Atocha",
    time: "2h",
    hasPhoto: true,
    distance: "2.1 km",
    verified: true,
    location: "Estación de Atocha, Madrid",
    photoUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&h=400&fit=crop",
    photoBlurred: true,
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
        <div className="rounded-xl overflow-hidden mb-4 border border-border shadow-card relative">
          <img
            src={report.photoUrl}
            alt={report.description}
            className={`w-full h-48 object-cover ${report.photoBlurred ? "blur-xl" : ""}`}
          />
          {report.photoBlurred && (
            <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center gap-2 px-4">
              <EyeOff className="w-5 h-5 text-background flex-shrink-0" />
              <span className="text-xs font-medium text-background text-center">{t.photoBlurWarning}</span>
            </div>
          )}
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
        <span className="flex items-center gap-1 text-xs text-secondary font-medium">
          <CheckCircle className="w-3.5 h-3.5" />
          {t.communityDetailVerified}
        </span>
      </div>

      <p className="text-base text-foreground font-medium mb-4">{report.description}</p>

      {/* Metadata */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4 space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">{t.communityDetailLocation}</p>
            <p className="text-sm text-foreground">{report.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-primary flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">{t.communityDetailTime}</p>
            <p className="text-sm text-foreground">{report.time}</p>
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

      {/* Invite to use floating AI icon */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4 text-center">
        <MessageCircle className="w-5 h-5 text-primary mx-auto mb-2" />
        <p className="text-sm text-foreground font-medium mb-1">{t.alertDetailAskTitle}</p>
        <p className="text-xs text-muted-foreground">{t.alertDetailAskDesc}</p>
      </div>
    </div>
  );
};

export default CommunityReportDetail;
