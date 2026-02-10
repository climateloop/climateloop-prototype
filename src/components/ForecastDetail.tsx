import { ArrowLeft, Brain, Cloud, Sparkles, MessageCircle } from "lucide-react";
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
        <div className="flex items-center gap-3 mb-3 p-3 rounded-lg bg-primary/5">
          <div>
            <p className="text-2xl font-bold text-foreground">29°C</p>
            <p className="text-xs text-muted-foreground">{t.forecastRain}: 40%</p>
          </div>
          <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full rounded-full w-[85%]" style={{ background: "hsl(210 61% 29%)" }} />
          </div>
          <span className="text-xs text-muted-foreground">85%</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
          {t.forecastDetailOfficialExplanation.split("**").map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
          )}
        </p>
      </div>

      {/* ML forecast explanation */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-secondary" />
          <h3 className="text-sm font-semibold text-foreground">{t.forecastML}</h3>
        </div>
        <div className="flex items-center gap-3 mb-3 p-3 rounded-lg bg-secondary/5">
          <div>
            <p className="text-2xl font-bold text-foreground">31°C</p>
            <p className="text-xs text-muted-foreground">{t.forecastRain}: 55%</p>
          </div>
          <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full rounded-full w-[78%]" style={{ background: "hsl(155 67% 32%)" }} />
          </div>
          <span className="text-xs text-muted-foreground">78%</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
          {t.forecastDetailMLExplanation.split("**").map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
          )}
        </p>
      </div>

      {/* Invite to use floating AI icon */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4 text-center">
        <MessageCircle className="w-5 h-5 text-primary mx-auto mb-2" />
        <p className="text-sm text-foreground font-medium mb-1">{t.forecastDetailDeeperTitle}</p>
        <p className="text-xs text-muted-foreground">{t.forecastDetailDeeperDesc}</p>
      </div>
    </div>
  );
};

export default ForecastDetail;
