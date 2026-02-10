import { Home, Bell, PlusCircle, Map, User } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { t } = useLanguage();

  const tabs = [
    { id: "inicio", label: t.navHome, icon: Home },
    { id: "alertas", label: t.navAlerts, icon: Bell },
    { id: "reportar", label: t.navReport, icon: PlusCircle },
    { id: "mapa", label: t.navMap, icon: Map },
    { id: "perfil", label: t.navProfile, icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 pb-safe">
      <div className="flex items-center justify-around max-w-lg mx-auto py-1">
        {tabs.map((tab) => {
          const isCenter = tab.id === "reportar";
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          if (isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center gap-0.5 -mt-4"
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-elevated transition-transform hover:scale-105 active:scale-95">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-[10px] font-semibold text-primary">{tab.label}</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-lg transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
