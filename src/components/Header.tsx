import { MapPin, Bell, ArrowLeft, Info, HelpCircle, FileText, Share2, ClipboardList, X, User } from "lucide-react";
import logoImg from "@/assets/climateloop-logo.png";
import { useLanguage } from "@/i18n/LanguageContext";

interface HeaderProps {
  notificationCount?: number;
  onOpenNotifications?: () => void;
  onOpenMap?: () => void;
  onOpenLocation?: () => void;
  onOpenProfile?: () => void;
}

const Header = ({ notificationCount = 3, onOpenNotifications, onOpenLocation, onOpenProfile }: HeaderProps) => {
  const { t } = useLanguage();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background sticky top-0 z-50 border-b border-border">
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-full hover:bg-muted transition-colors"
        >
          <Bell className="w-5 h-5 text-foreground" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
        <button
          onClick={onOpenProfile}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <User className="w-5 h-5 text-foreground" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenLocation}
          className="flex items-center gap-1 text-muted-foreground text-base font-medium hover:text-foreground transition-colors"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>{t.location}</span>
        </button>
        <img src={logoImg} alt="ClimateLoop" className="h-8 w-auto" />
      </div>
    </header>
  );
};

// Notification Panel
interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: string;
  type: "alert_received" | "report_sent" | "report_verified" | "community_nearby";
  titleKey: "notifAlertReceived" | "notifReportSent" | "notifReportVerified" | "notifCommunityNearby";
  detail: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: "1", type: "alert_received", titleKey: "notifAlertReceived", detail: "Orange Alert: Heavy rain", time: "5 min", read: false },
  { id: "2", type: "report_verified", titleKey: "notifReportVerified", detail: "Flooding – Gran Vía", time: "1h", read: false },
  { id: "3", type: "community_nearby", titleKey: "notifCommunityNearby", detail: "Strong wind – 0.8 km", time: "2h", read: false },
  { id: "4", type: "report_sent", titleKey: "notifReportSent", detail: "Extreme heat – Zona este", time: "3h", read: true },
  { id: "5", type: "alert_received", titleKey: "notifAlertReceived", detail: "Yellow Alert: Moderate wind", time: "5h", read: true },
];

const notifIconColors: Record<string, string> = {
  alert_received: "bg-warning/15 text-warning",
  report_sent: "bg-primary/15 text-primary",
  report_verified: "bg-secondary/15 text-secondary",
  community_nearby: "bg-accent/15 text-accent",
};

export const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background animate-in fade-in duration-200">
      <div className="sticky top-0 bg-background flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-lg font-bold text-foreground">{t.notifTitle}</h2>
        </div>
        <button className="text-xs text-primary font-medium">{t.notifMarkAllRead}</button>
      </div>
      <div className="divide-y divide-border overflow-y-auto" style={{ maxHeight: "calc(100vh - 60px)" }}>
        {notifications.map((n) => (
          <div key={n.id} className={`flex items-start gap-3 px-4 py-3 ${!n.read ? "bg-primary/5" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${notifIconColors[n.type]}`}>
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${!n.read ? "font-semibold" : "font-medium"} text-foreground`}>{t[n.titleKey]}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.detail}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
};

// Menu Panel
interface MenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContributions?: () => void;
}

export const MenuPanel = ({ isOpen, onClose, onOpenContributions }: MenuPanelProps) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  const items = [
    { icon: ClipboardList, label: t.menuMyContributions, onClick: () => { onClose(); onOpenContributions?.(); } },
    { icon: Info, label: t.menuAbout, onClick: () => {} },
    { icon: HelpCircle, label: t.menuHelp, onClick: () => {} },
    { icon: FileText, label: t.menuTerms, onClick: () => {} },
    { icon: Share2, label: t.menuShare, onClick: () => {} },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-end bg-foreground/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-background w-64 mt-14 mr-2 rounded-xl shadow-elevated overflow-hidden animate-in slide-in-from-right duration-200 border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="divide-y divide-border">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
              >
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
