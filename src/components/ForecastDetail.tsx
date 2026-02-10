import { ArrowLeft, Brain, Cloud, Sparkles, MessageCircle, Info } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ForecastDetailProps {
  onBack: () => void;
  onOpenChat: () => void;
}

const ForecastDetail = ({ onBack }: ForecastDetailProps) => {
  const { t } = useLanguage();

  return (
    <div className="px-4 pb-4 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.backButton}
      </button>

      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-bold text-foreground">{t.forecastDetailTitle}</h2>
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent pointer-events-none select-none">
          {t.aiPowered}
        </span>
      </div>

      {/* Official forecast explanation */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Cloud className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">{t.forecastOfficial}</h3>
        </div>
        <div className="p-3 rounded-lg bg-muted mb-3">
          <div className="flex items-center gap-3 mb-2">
            <div>
              <p className="text-2xl font-bold text-foreground">29°C</p>
              <p className="text-xs text-muted-foreground">{t.forecastRain}: 40%</p>
            </div>
          </div>
          {/* Confidence bar with background */}
          <div className="mt-2">
            <div className="h-2.5 w-full bg-border rounded-full overflow-hidden">
              <div className="h-full rounded-full gradient-heat transition-all duration-500" style={{ width: "85%" }} />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 text-right">85 / 100%</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground italic mb-3 flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          {t.forecastDetailConfidenceLabel}
        </p>
        <p className="text-sm text-foreground leading-relaxed">
          {t.forecastDetailOfficialExplanation}
        </p>
      </div>

      {/* ML forecast explanation */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-secondary" />
          <h3 className="text-sm font-semibold text-foreground">{t.forecastML}</h3>
        </div>
        <div className="p-3 rounded-lg bg-muted mb-3">
          <div className="flex items-center gap-3 mb-2">
            <div>
              <p className="text-2xl font-bold text-foreground">31°C</p>
              <p className="text-xs text-muted-foreground">{t.forecastRain}: 55%</p>
            </div>
          </div>
          {/* Confidence bar with background */}
          <div className="mt-2">
            <div className="h-2.5 w-full bg-border rounded-full overflow-hidden">
              <div className="h-full rounded-full gradient-heat transition-all duration-500" style={{ width: "78%" }} />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 text-right">78 / 100%</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground italic mb-3 flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          {t.forecastDetailConfidenceLabel}
        </p>
        <p className="text-sm text-foreground leading-relaxed">
          {t.forecastDetailMLExplanation}
        </p>
      </div>

      {/* Why compare section */}
      <div className="bg-accent/5 rounded-xl border border-accent/20 shadow-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">{t.forecastDetailDeeperTitle}</h3>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {t.forecastDetailWhyCompare}
        </p>
      </div>

      {/* Invite to use floating AI icon */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4 text-center">
        <MessageCircle className="w-5 h-5 text-primary mx-auto mb-2" />
        <p className="text-sm text-foreground font-medium mb-1">{t.alertDetailAskTitle}</p>
        <p className="text-xs text-muted-foreground">{t.forecastDetailDeeperDesc}</p>
      </div>
    </div>
  );
};

export default ForecastDetail;
