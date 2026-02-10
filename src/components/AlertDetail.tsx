import { ArrowLeft, AlertTriangle, Sparkles, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { type Alert } from "./AlertCard";

const severityStyles = {
  yellow: {
    bg: "bg-accent/15",
    border: "border-accent",
    title: "text-accent",
    icon: "text-accent",
  },
  orange: {
    bg: "bg-warning/15",
    border: "border-warning",
    title: "text-warning",
    icon: "text-warning",
  },
  red: {
    bg: "bg-destructive/15",
    border: "border-destructive",
    title: "text-destructive",
    icon: "text-destructive",
  },
};

interface AlertDetailProps {
  alert: Alert;
  onBack: () => void;
  onOpenChat: () => void;
}

const AlertDetail = ({ alert, onBack }: AlertDetailProps) => {
  const { t } = useLanguage();
  const styles = severityStyles[alert.severity];

  return (
    <div className="px-4 pb-4 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.backButton}
      </button>

      {/* Alert header */}
      <div className={`rounded-xl ${styles.bg} border ${styles.border} p-5 mb-4`}>
        <div className="flex items-start gap-3">
          <AlertTriangle className={`w-6 h-6 ${styles.icon} mt-0.5`} />
          <div>
            <h2 className={`text-lg font-bold ${styles.title}`}>{alert.title}</h2>
            <p className="text-sm text-foreground mt-1 opacity-80">{alert.description}</p>
            <p className="text-xs text-muted-foreground mt-2">⏱ {alert.time}</p>
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">{t.alertDetailTitle}</h3>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent pointer-events-none select-none">
            {t.aiPowered}
          </span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {t.alertDetailExplanation}
        </p>
      </div>

      {/* Recommended actions */}
      {alert.actions && alert.actions.length > 0 && (
        <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-5 mb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground mb-3">
            {t.alertRecommendedActions}
          </p>
          <ul className="space-y-2">
            {alert.actions.map((action, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">
                  {i + 1}
                </span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Invite to use floating AI icon */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4 text-center">
        <MessageCircle className="w-5 h-5 text-primary mx-auto mb-2" />
        <p className="text-sm text-foreground font-medium mb-1">{t.alertDetailAskTitle}</p>
        <p className="text-xs text-muted-foreground">{t.alertDetailAskDesc}</p>
      </div>
    </div>
  );
};

export default AlertDetail;
