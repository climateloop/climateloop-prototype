import { Bell, Filter, Clock, AlertTriangle, History, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useCapAlerts, capSeverityToColor, type CapAlert } from "@/hooks/useCapAlerts";
import AlertCard from "./AlertCard";

interface AlertsPageProps {
  onAskAI?: (alert: CapAlert) => void;
}

const AlertsPage = ({ onAskAI }: AlertsPageProps) => {
  const { t } = useLanguage();
  const { data, isLoading } = useCapAlerts();

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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">{t.alertsTitle}</h2>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
          <Filter className="w-3.5 h-3.5" />
          {t.alertsFilter}
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {data && data.immediate.length > 0 && renderSection(t.alertCategoryNow, <AlertTriangle className="w-4 h-4 text-destructive" />, data.immediate)}
          {data && data.future.length > 0 && renderSection(t.alertCategoryFuture, <Clock className="w-4 h-4 text-accent" />, data.future)}
          {data && data.past.length > 0 && renderSection(t.alertCategoryPast, <History className="w-4 h-4 text-muted-foreground" />, data.past, true)}
          {data && data.all.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              {t.alertsTitle} — No alerts for your area
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AlertsPage;
