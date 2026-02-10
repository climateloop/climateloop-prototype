import AlertCard, { type Alert } from "./AlertCard";
import { Bell, Filter } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface AlertsPageProps {
  onAskAI?: (alert: Alert) => void;
}

const AlertsPage = ({ onAskAI }: AlertsPageProps) => {
  const { t } = useLanguage();

  const alerts: Alert[] = [
    {
      id: "1",
      severity: "red",
      title: t.alertRedTitle,
      description: t.alertRedDesc,
      time: t.alertTimeAgo10,
      actions: [t.alertAction1, t.alertAction2, t.alertAction3, t.alertAction4],
    },
    {
      id: "2",
      severity: "orange",
      title: t.alertOrangeTitle,
      description: t.alertOrangeDesc,
      time: t.alertTimeAgo1h,
      actions: [t.alertAction5, t.alertAction6, t.alertAction7],
    },
    {
      id: "3",
      severity: "yellow",
      title: t.alertYellowWindTitle,
      description: t.alertYellowWindDesc,
      time: t.alertTimeAgo2h,
      actions: [t.alertAction8, t.alertAction9],
    },
    {
      id: "4",
      severity: "yellow",
      title: t.alertMLHailTitle,
      description: t.alertMLHailDesc,
      time: t.alertTimeAgoML48,
    },
  ];

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
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} onClick={() => onAskAI?.(alert)} className="cursor-pointer">
            <AlertCard alert={alert} onAskAI={onAskAI} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPage;
