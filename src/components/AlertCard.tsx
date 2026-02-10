import { AlertTriangle, ChevronRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface Alert {
  id: string;
  severity: "yellow" | "orange" | "red";
  title: string;
  description: string;
  time: string;
  actions?: string[];
}

const severityStyles = {
  yellow: {
    bg: "bg-accent/15",
    border: "border-accent",
    text: "text-accent-foreground",
    title: "text-accent",
    icon: "text-accent",
  },
  orange: {
    bg: "bg-warning/15",
    border: "border-warning",
    text: "text-foreground",
    title: "text-warning",
    icon: "text-warning",
  },
  red: {
    bg: "bg-destructive/15",
    border: "border-destructive",
    text: "text-foreground",
    title: "text-destructive",
    icon: "text-destructive",
  },
};

interface AlertCardProps {
  alert: Alert;
  compact?: boolean;
  onAskAI?: (alert: Alert) => void;
}

const AlertCard = ({ alert, compact = false, onAskAI }: AlertCardProps) => {
  const styles = severityStyles[alert.severity];
  const { t } = useLanguage();

  return (
    <div className={`rounded-xl ${styles.bg} border ${styles.border} p-3 transition-all`}>
      <div className="flex items-start gap-2.5">
        <div className={`mt-0.5 flex-shrink-0 ${styles.icon}`}>
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-sm ${styles.title}`}>{alert.title}</h3>
        </div>
      </div>
      <p className={`text-xs ${styles.text} mt-1 opacity-80`}>{alert.description}</p>
      <p className="text-[10px] text-muted-foreground mt-1">⏱ {alert.time}</p>

      {!compact && alert.actions && alert.actions.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground mb-2">
            {t.alertRecommendedActions}
          </p>
          <ul className="space-y-1">
            {alert.actions.map((action, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AI-powered CTA */}
      <button
        onClick={() => onAskAI?.(alert)}
        className="flex items-center gap-1.5 mt-2 text-xs font-medium text-primary hover:underline"
      >
        <Sparkles className="w-3.5 h-3.5 text-accent" />
        <span>{t.aiUnderstandAlert}</span>
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent ml-1 pointer-events-none">
          {t.aiPowered}
        </span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export { type Alert };
export default AlertCard;
