import { useState } from "react";
import { Bell, Clock, AlertTriangle, History, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useCapAlerts, capSeverityToColor, categorizeAlert, type CapAlert, type AlertTimeCategory } from "@/hooks/useCapAlerts";
import AlertCard from "./AlertCard";

interface AlertsPageProps {
  onAskAI?: (alert: CapAlert) => void;
}

type SeverityFilter = "all" | "red" | "orange" | "yellow";
type TimeFilter = "all" | "immediate" | "future" | "past";

const AlertsPage = ({ onAskAI }: AlertsPageProps) => {
  const { t } = useLanguage();
  const { data, isLoading } = useCapAlerts();
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");

  const filterAlerts = (alerts: CapAlert[]) => {
    return alerts.filter((a) => {
      if (severityFilter !== "all" && capSeverityToColor(a.severity) !== severityFilter) return false;
      if (timeFilter !== "all" && categorizeAlert(a) !== timeFilter) return false;
      return true;
    });
  };

  const filtered = data ? filterAlerts(data.all) : [];
  const immediate = filtered.filter((a) => categorizeAlert(a) === "immediate");
  const future = filtered.filter((a) => categorizeAlert(a) === "future");
  const past = filtered.filter((a) => categorizeAlert(a) === "past");

  const severityOptions: { value: SeverityFilter; label: string; color: string }[] = [
    { value: "all", label: t.alertsFilterAll, color: "bg-muted text-muted-foreground" },
    { value: "red", label: t.alertsSeverityRed, color: "bg-destructive/15 text-destructive border-destructive" },
    { value: "orange", label: t.alertsSeverityOrange, color: "bg-warning/15 text-warning border-warning" },
    { value: "yellow", label: t.alertsSeverityYellow, color: "bg-accent/15 text-accent border-accent" },
  ];

  const timeOptions: { value: TimeFilter; label: string; icon: React.ReactNode }[] = [
    { value: "all", label: t.alertsFilterAll, icon: null },
    { value: "immediate", label: t.alertCategoryNow, icon: <AlertTriangle className="w-3 h-3" /> },
    { value: "future", label: t.alertCategoryFuture, icon: <Clock className="w-3 h-3" /> },
    { value: "past", label: t.alertCategoryPast, icon: <History className="w-3 h-3" /> },
  ];

  const renderSection = (
    title: string,
    icon: React.ReactNode,
    items: CapAlert[],
    dimmed?: boolean
  ) => (
    <div className={dimmed ? "opacity-60" : ""}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">{items.length}</span>
      </div>
      <div className="space-y-3 mb-5">
        {items.map((alert) => (
          <div key={alert.id} onClick={() => onAskAI?.(alert)} className="cursor-pointer">
            <AlertCard capAlert={alert} onAskAI={onAskAI} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">{t.alertsTitle}</h2>
      </div>

      {/* Filters */}
      <div className="space-y-2 mb-4">
        {/* Severity filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mr-1">{t.alertsFilterSeverity}:</span>
          {severityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSeverityFilter(opt.value)}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                severityFilter === opt.value
                  ? opt.value === "all"
                    ? "bg-primary text-primary-foreground border-primary"
                    : `${opt.color} border`
                  : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Time category filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mr-1">⏱:</span>
          {timeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTimeFilter(opt.value)}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 ${
                timeFilter === opt.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {immediate.length > 0 && renderSection(t.alertCategoryNow, <AlertTriangle className="w-4 h-4 text-destructive" />, immediate)}
          {future.length > 0 && renderSection(t.alertCategoryFuture, <Clock className="w-4 h-4 text-accent" />, future)}
          {past.length > 0 && renderSection(t.alertCategoryPast, <History className="w-4 h-4 text-muted-foreground" />, past, true)}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              {t.alertsNoAlerts}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AlertsPage;
