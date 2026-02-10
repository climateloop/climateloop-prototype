import { AlertTriangle, ChevronRight } from "lucide-react";

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
}

const AlertCard = ({ alert, compact = false }: AlertCardProps) => {
  const styles = severityStyles[alert.severity];

  return (
    <div className={`rounded-xl ${styles.bg} border ${styles.border} p-4 transition-all`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${styles.icon}`}>
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold ${styles.title}`}>{alert.title}</h3>
          <p className={`text-sm ${styles.text} mt-1 opacity-80`}>{alert.description}</p>
          <p className="text-xs text-muted-foreground mt-1">⏱ {alert.time}</p>

          {!compact && alert.actions && alert.actions.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground mb-2">
                Ações recomendadas
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

          {!compact && (
            <button className="flex items-center gap-1 mt-3 text-sm font-medium text-primary hover:underline">
              Ver mais informações <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { type Alert };
export default AlertCard;
