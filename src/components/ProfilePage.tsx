import { User, Settings, Bell, Shield, MapPin, LogOut, ChevronRight, Globe, ClipboardList } from "lucide-react";
import { useLanguage, localeNames } from "@/i18n/LanguageContext";

interface ProfilePageProps {
  onOpenContributions?: () => void;
}

const ProfilePage = ({ onOpenContributions }: ProfilePageProps) => {
  const { t, locale } = useLanguage();

  const menuItems = [
    { icon: ClipboardList, label: t.menuMyContributions, value: "12", onClick: onOpenContributions },
    { icon: MapPin, label: t.profileMyLocation, value: t.profileLocationValue },
    { icon: Bell, label: t.profileNotifications, value: t.profileNotifActive },
    { icon: Globe, label: t.profileLanguage, value: localeNames[locale] },
    { icon: Shield, label: t.profilePrivacy, value: "" },
    { icon: Settings, label: t.profileSettings, value: "" },
  ];

  return (
    <div className="px-4 pb-4">
      <div className="flex flex-col items-center py-6">
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-3">
          <User className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-lg font-bold text-foreground">{t.profileDemoUser}</h2>
        <p className="text-sm text-muted-foreground">usuario@climateloop.app</p>
        <div className="flex items-center gap-4 mt-4">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">{t.profileReports}</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">45</p>
            <p className="text-xs text-muted-foreground">{t.profileDaysActive}</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-lg font-bold text-secondary">92%</p>
            <p className="text-xs text-muted-foreground">{t.profileAccuracy}</p>
          </div>
        </div>
      </div>

      <div className="bg-surface-elevated rounded-xl border border-border shadow-card overflow-hidden">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted transition-colors ${
                i < menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="flex-1 text-left text-sm text-foreground">{item.label}</span>
              {item.value && <span className="text-xs text-muted-foreground">{item.value}</span>}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          );
        })}
      </div>

      <button className="w-full flex items-center justify-center gap-2 mt-6 py-3 rounded-xl border border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/5 transition-colors">
        <LogOut className="w-4 h-4" />
        {t.profileLogout}
      </button>
    </div>
  );
};

export default ProfilePage;
