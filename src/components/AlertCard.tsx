import { AlertTriangle, ChevronRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { type CapAlert, capSeverityToColor } from "@/hooks/useCapAlerts";

// Keep legacy interface for backward compat (home page active alert)
interface LegacyAlert {
  id: string;
  severity: "yellow" | "orange" | "red";
  title: string;
  description: string;
  time: string;
  actions?: string[];
}

export type Alert = LegacyAlert;

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

function formatAlertTime(alert: CapAlert): string {
  const onset = alert.onset ? new Date(alert.onset) : null;
  const expires = alert.expires ? new Date(alert.expires) : null;
  const now = new Date();

  if (expires && expires < now) {
    const diffH = Math.round((now.getTime() - expires.getTime()) / 3600000);
    if (diffH < 24) return `Ended ${diffH}h ago`;
    return `Ended ${Math.round(diffH / 24)}d ago`;
  }
  if (onset && onset > now) {
    const diffH = Math.round((onset.getTime() - now.getTime()) / 3600000);
    if (diffH < 24) return `Starts in ${diffH}h`;
    return `Starts in ${Math.round(diffH / 24)}d`;
  }
  if (onset) {
    const diffH = Math.round((now.getTime() - onset.getTime()) / 3600000);
    if (diffH < 1) return `Started ${Math.round((now.getTime() - onset.getTime()) / 60000)} min ago`;
    return `Started ${diffH}h ago`;
  }
  return "";
}

interface AlertCardProps {
  alert?: LegacyAlert;
  capAlert?: CapAlert;
  compact?: boolean;
  onAskAI?: (alert: any) => void;
}

const AlertCard = ({ alert, capAlert, compact = false, onAskAI }: AlertCardProps) => {
  const { t } = useLanguage();

  // Resolve values from either legacy or CAP alert
  const severity = capAlert ? capSeverityToColor(capAlert.severity) : alert!.severity;
  const title = capAlert ? capAlert.headline : alert!.title;
  const description = capAlert ? capAlert.description : alert!.description;
  const time = capAlert ? formatAlertTime(capAlert) : alert!.time;
  const actions = capAlert?.ai_explanation?.recommended_actions ?? alert?.actions;
  const source = capAlert?.source;
  const styles = severityStyles[severity];
  const target = capAlert || alert!;

  return (
    <div className={`rounded-xl ${styles.bg} border ${styles.border} p-3 transition-all`}>
      <div className="flex items-start gap-2.5">
        <div className={`mt-0.5 flex-shrink-0 ${styles.icon}`}>
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-sm ${styles.title}`}>{title}</h3>
          {source && (
            <p className="text-[10px] text-muted-foreground mt-0.5">{source}</p>
          )}
        </div>
      </div>
      <p className={`text-xs ${styles.text} mt-1 opacity-80 line-clamp-2`}>{description}</p>
      <p className="text-[10px] text-muted-foreground mt-1">⏱ {time}</p>

      {!compact && actions && actions.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
              {t.alertRecommendedActions}
            </p>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent pointer-events-none select-none">
              {t.aiPowered}
            </span>
          </div>
          <ul className="space-y-1">
            {actions.slice(0, 3).map((action, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                {action}
              </li>
            ))}
            {actions.length > 3 && (
              <li className="text-xs text-muted-foreground">+{actions.length - 3} more</li>
            )}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-1.5 mt-2">
        <button
          onClick={(e) => { e.stopPropagation(); onAskAI?.(target); }}
          className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>{t.aiUnderstandAlert}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent pointer-events-none select-none">
          {t.aiPowered}
        </span>
      </div>
    </div>
  );
};

export default AlertCard;
