import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Clock, CheckCircle, MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

import reportPhoto1 from "@/assets/community/report-1-flooding-street.jpg";
import reportPhoto3 from "@/assets/community/report-3-fallen-tree.jpg";
import reportPhoto4 from "@/assets/community/report-4-flooded-underpass.jpg";
import reportPhoto5 from "@/assets/community/report-5-heavy-rain-plaza.jpg";
import reportPhoto6 from "@/assets/community/report-6-wind-damage.jpg";
import reportPhoto7 from "@/assets/community/report-7-river-overflow.jpg";
import reportPhoto8 from "@/assets/community/report-8-rain-puddles.jpg";

interface ReportData {
  id: string;
  user: string;
  typeKey: string;
  description: string;
  time: string;
  hasPhoto: boolean;
  distance: string;
}

const myReportIds = ["1", "3"];

const reportDetails: Record<string, ReportData & { photoUrl: string; location: string; risk: string }> = {
  "1": {
    id: "1",
    user: "María S.",
    typeKey: "typeFlooding",
    description: "Rúa da Raíña completamente inundada tras forte chuveira",
    time: "15 min",
    hasPhoto: true,
    distance: "1.2 km",
    location: "Rúa da Raíña 12, Lugo",
    photoUrl: reportPhoto1,
    risk: "high",
  },
  "3": {
    id: "3",
    user: "Ana L.",
    typeKey: "typeStrongWind",
    description: "Árbore caída na Rúa Nova bloqueando o tráfico",
    time: "1h",
    hasPhoto: true,
    distance: "0.8 km",
    location: "Rúa Nova 28, Lugo",
    photoUrl: reportPhoto3,
    risk: "moderate",
  },
  "4": {
    id: "4",
    user: "Pedro M.",
    typeKey: "typeFlooding",
    description: "Paso subterráneo inundado preto da Muralla Romana",
    time: "2h",
    hasPhoto: true,
    distance: "2.1 km",
    location: "Paso subterráneo da Muralla, Lugo",
    photoUrl: reportPhoto4,
    risk: "high",
  },
  "5": {
    id: "5",
    user: "Lucía G.",
    typeKey: "typeRain",
    description: "Chuvia forte persistente na Praza Maior de Lugo",
    time: "45 min",
    hasPhoto: true,
    distance: "0.5 km",
    location: "Praza Maior, Lugo",
    photoUrl: reportPhoto5,
    risk: "moderate",
  },
  "6": {
    id: "6",
    user: "Carlos R.",
    typeKey: "typeStrongWind",
    description: "Ramas partidas e destrozos polo vento na Praza de Santa María",
    time: "1h 20 min",
    hasPhoto: true,
    distance: "4.2 km",
    location: "Praza de Santa María, Lugo",
    photoUrl: reportPhoto6,
    risk: "moderate",
  },
  "7": {
    id: "7",
    user: "Isabel F.",
    typeKey: "typeFlooding",
    description: "Río Miño crecido con desbordamento parcial na zona do Balneario",
    time: "55 min",
    hasPhoto: true,
    distance: "1.8 km",
    location: "Paseo do Río Miño, Lugo",
    photoUrl: reportPhoto7,
    risk: "moderate",
  },
  "8": {
    id: "8",
    user: "Diego T.",
    typeKey: "typeRain",
    description: "Chuvia intermitente con pozas na Rúa San Pedro",
    time: "25 min",
    hasPhoto: true,
    distance: "0.3 km",
    location: "Rúa San Pedro, Lugo",
    photoUrl: reportPhoto8,
    risk: "low",
  },
};

const typeColorMap: Record<string, string> = {
  typeFlooding: "bg-primary/10 text-primary",
  typeExtremeHeat: "bg-destructive/10 text-destructive",
  typeStrongWind: "bg-warning/10 text-warning",
  typeFire: "bg-destructive/10 text-destructive",
  typeRain: "bg-primary/10 text-primary",
  typeHail: "bg-accent/10 text-accent",
  typeFrost: "bg-secondary/10 text-secondary",
};

const riskColorMap: Record<string, { bg: string; text: string; label: string }> = {
  high: { bg: "bg-destructive/10", text: "text-destructive", label: "mapHighRisk" },
  moderate: { bg: "bg-warning/10", text: "text-warning", label: "mapModerateRisk" },
  low: { bg: "bg-accent/10", text: "text-accent", label: "mapLowRisk" },
};

interface CommunityReportDetailProps {
  reportId: string;
  onBack: () => void;
  onOpenChat: () => void;
}

const CommunityReportDetail = ({ reportId, onBack, onOpenChat }: CommunityReportDetailProps) => {
  const { t } = useLanguage();
  const report = reportDetails[reportId];
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  if (!report) return null;

  const typeLabel = (t as any)[report.typeKey] || report.typeKey;
  const riskInfo = riskColorMap[report.risk] || riskColorMap["moderate"];

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
            className="w-full h-48 object-cover"
            onError={(e) => { e.currentTarget.src = "/placeholder.svg"; e.currentTarget.className = "w-full h-48 object-contain bg-muted p-8"; }}
          />
        </div>
      ) : (
        <div className="rounded-xl bg-muted border border-border mb-4 h-48 flex items-center justify-center">
          <Camera className="w-10 h-10 text-muted-foreground" />
        </div>
      )}

      {/* Type badge, risk & verification */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColorMap[report.typeKey] || "bg-muted text-muted-foreground"}`}>
          {typeLabel}
        </span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${riskInfo.bg} ${riskInfo.text}`}>
          {(t as any)[riskInfo.label]}
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
            <p className="text-sm font-medium text-foreground">
              {myReportIds.includes(report.id) ? t.communitySentByMe : report.user}
            </p>
            <p className="text-xs text-muted-foreground">{t.communityDetailTime}: {report.time}</p>
          </div>
        </div>
      </div>

      {/* Rate this report — only if not mine */}
      {!myReportIds.includes(report.id) && (
        <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4 mb-4">
          <p className="text-sm font-medium text-foreground mb-2">{t.communityRateTitle}</p>
          <p className="text-xs text-muted-foreground mb-3">{t.communityRateDesc}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setVote(vote === "up" ? null : "up")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all border ${
                vote === "up"
                  ? "bg-secondary/15 border-secondary text-secondary"
                  : "bg-muted border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              {t.communityRateHelpful}
            </button>
            <button
              onClick={() => setVote(vote === "down" ? null : "down")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all border ${
                vote === "down"
                  ? "bg-destructive/15 border-destructive text-destructive"
                  : "bg-muted border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              {t.communityRateNotHelpful}
            </button>
          </div>
          {vote && (
            <p className="text-xs text-secondary mt-2 text-center">{t.communityRateThanks}</p>
          )}
        </div>
      )}

      {/* AI Chat Button */}
      <button
        onClick={() => {
          const typeLabel2 = (t as any)[report.typeKey] || report.typeKey;
          const contextMessage = `[${typeLabel2}] ${report.description}\n\nUbicación: ${report.location}\nReportado por: ${report.user}\nHace: ${report.time}\nDistancia: ${report.distance}\nRiesgo: ${(t as any)[riskInfo.label]}`;
          onOpenChat();
          setTimeout(() => {
            const event = new CustomEvent('alert-chat-context', { detail: contextMessage });
            window.dispatchEvent(event);
          }, 100);
        }}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        {t.alertDetailChatButton}
      </button>
    </div>
  );
};

export default CommunityReportDetail;
