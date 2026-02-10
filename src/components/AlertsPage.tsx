import AlertCard, { type Alert } from "./AlertCard";
import { Bell, Filter, Clock, AlertTriangle, History } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface AlertsPageProps {
  onAskAI?: (alert: Alert) => void;
}

interface TimedAlert extends Alert {
  category: "immediate" | "future" | "past";
  dateLabel: string;
}

const AlertsPage = ({ onAskAI }: AlertsPageProps) => {
  const { t } = useLanguage();

  const alerts: TimedAlert[] = [
    // Immediate (active now)
    {
      id: "1",
      severity: "red",
      title: t.alertRedTitle,
      description: t.alertRedDesc,
      time: t.alertTimeAgo10,
      actions: [t.alertAction1, t.alertAction2, t.alertAction3, t.alertAction4],
      category: "immediate",
      dateLabel: t.alertCategoryNow,
    },
    {
      id: "2",
      severity: "orange",
      title: t.alertOrangeTitle,
      description: t.alertOrangeDesc,
      time: t.alertTimeAgo1h,
      actions: [t.alertAction5, t.alertAction6, t.alertAction7],
      category: "immediate",
      dateLabel: t.alertCategoryNow,
    },
    // Future
    {
      id: "4",
      severity: "yellow",
      title: t.alertMLHailTitle,
      description: t.alertMLHailDesc,
      time: t.alertTimeAgoML48,
      category: "future",
      dateLabel: t.alertCategoryFuture,
    },
    {
      id: "5",
      severity: "orange",
      title: t.alertFutureHeatTitle,
      description: t.alertFutureHeatDesc,
      time: t.alertFutureHeatTime,
      actions: [t.alertAction5, t.alertAction6, t.alertAction7],
      category: "future",
      dateLabel: t.alertCategoryFuture,
    },
    // Past (D-1 and D-2)
    {
      id: "3",
      severity: "yellow",
      title: t.alertYellowWindTitle,
      description: t.alertYellowWindDesc,
      time: t.alertPastYesterday,
      actions: [t.alertAction8, t.alertAction9],
      category: "past",
      dateLabel: t.alertCategoryPast,
    },
    {
      id: "6",
      severity: "orange",
      title: t.alertPastRainTitle,
      description: t.alertPastRainDesc,
      time: t.alertPast2Days,
      category: "past",
      dateLabel: t.alertCategoryPast,
    },
  ];

  const immediate = alerts.filter((a) => a.category === "immediate");
  const future = alerts.filter((a) => a.category === "future");
  const past = alerts.filter((a) => a.category === "past");

  const renderSection = (
    title: string,
    icon: React.ReactNode,
    items: TimedAlert[],
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
            <AlertCard alert={alert} onAskAI={onAskAI} />
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

      {immediate.length > 0 && renderSection(t.alertCategoryNow, <AlertTriangle className="w-4 h-4 text-destructive" />, immediate)}
      {future.length > 0 && renderSection(t.alertCategoryFuture, <Clock className="w-4 h-4 text-accent" />, future)}
      {past.length > 0 && renderSection(t.alertCategoryPast, <History className="w-4 h-4 text-muted-foreground" />, past, true)}
    </div>
  );
};

export default AlertsPage;
