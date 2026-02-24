import { User, Settings, Bell, Shield, MapPin, LogOut, ChevronRight, Globe, ClipboardList, Ruler } from "lucide-react";
import { useLanguage, localeNames, type Locale, type UnitSystem } from "@/i18n/LanguageContext";
import { useState } from "react";

interface ProfilePageProps {
  onOpenContributions?: () => void;
  onOpenLocation?: () => void;
  onOpenLegal?: () => void;
  onLogout?: () => void;
}

const unitSystemLabels: Record<UnitSystem, Record<string, string>> = {
  metric: { en: "Metric (°C, km/h)", es: "Métrico (°C, km/h)", pt: "Métrico (°C, km/h)", fr: "Métrique (°C, km/h)" },
  imperial: { en: "Imperial (°F, mph)", es: "Imperial (°F, mph)", pt: "Imperial (°F, mph)", fr: "Impérial (°F, mph)" },
};

const ProfilePage = ({ onOpenContributions, onOpenLocation, onOpenLegal, onLogout }: ProfilePageProps) => {
  const { t, locale, setLocale, unitSystem, setUnitSystem } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [unitsOpen, setUnitsOpen] = useState(false);

  const menuItems = [
    { icon: ClipboardList, label: t.menuMyContributions, value: "3", onClick: onOpenContributions, id: "contributions" },
    { icon: MapPin, label: t.profileMyLocation, value: t.profileLocationValue, onClick: onOpenLocation, id: "location" },
    { icon: Bell, label: t.profileNotifications, value: t.profileNotifActive, id: "notifications" },
    { icon: Globe, label: t.profileLanguage, value: localeNames[locale], onClick: () => { setLangOpen(!langOpen); setUnitsOpen(false); }, id: "language" },
    { icon: Ruler, label: t.profileUnits, value: unitSystemLabels[unitSystem][locale], onClick: () => { setUnitsOpen(!unitsOpen); setLangOpen(false); }, id: "units" },
    { icon: Shield, label: t.profilePrivacy, value: "", onClick: onOpenLegal, id: "privacy" },
    { icon: Settings, label: t.profileSettings, value: "", id: "settings" },
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
            <p className="text-lg font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">{t.profileReports}</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">45</p>
            <p className="text-xs text-muted-foreground">{t.profileDaysActive}</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-lg font-bold text-secondary">4.6 ★</p>
            <p className="text-xs text-muted-foreground">{t.profileRating}</p>
            <p className="text-[9px] text-muted-foreground/70 mt-0.5">{t.profileRatingHint}</p>
          </div>
        </div>
      </div>

      <div className="bg-surface-elevated rounded-xl border border-border shadow-card overflow-hidden">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          const isLang = item.id === "language";
          const isUnits = item.id === "units";
          const hasSubmenu = isLang || isUnits;
          const isSubmenuOpen = (isLang && langOpen) || (isUnits && unitsOpen);
          return (
            <div key={item.id}>
              <button
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted transition-colors ${
                  i < menuItems.length - 1 && !isSubmenuOpen ? "border-b border-border" : ""
                }`}
              >
                <Icon className="w-5 h-5 text-primary" />
                <span className="flex-1 text-left text-sm text-foreground">{item.label}</span>
                {item.value && <span className="text-xs text-muted-foreground">{item.value}</span>}
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${hasSubmenu && isSubmenuOpen ? "rotate-90" : ""}`} />
              </button>
              {isLang && langOpen && (
                <div className="border-b border-border">
                  {(Object.keys(localeNames) as Locale[]).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { setLocale(loc); setLangOpen(false); }}
                      className={`w-full text-left px-12 py-2.5 text-sm hover:bg-muted transition-colors ${
                        locale === loc ? "text-primary font-medium bg-primary/5" : "text-foreground"
                      }`}
                    >
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              )}
              {isUnits && unitsOpen && (
                <div className="border-b border-border">
                  {(["metric", "imperial"] as UnitSystem[]).map((sys) => (
                    <button
                      key={sys}
                      onClick={() => { setUnitSystem(sys); setUnitsOpen(false); }}
                      className={`w-full text-left px-12 py-2.5 text-sm hover:bg-muted transition-colors ${
                        unitSystem === sys ? "text-primary font-medium bg-primary/5" : "text-foreground"
                      }`}
                    >
                      {unitSystemLabels[sys][locale]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => onLogout?.()}
        className="w-full flex items-center justify-center gap-2 mt-6 py-3 rounded-xl border border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/5 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        {t.profileLogout}
      </button>
    </div>
  );
};

export default ProfilePage;
