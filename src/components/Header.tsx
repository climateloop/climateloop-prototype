import { MapPin, Bell, Menu, Globe } from "lucide-react";
import { useLanguage, localeNames, type Locale } from "@/i18n/LanguageContext";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  notificationCount?: number;
}

const Header = ({ notificationCount = 3 }: HeaderProps) => {
  const { t, locale, setLocale } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background sticky top-0 z-50 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">C</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">ClimateLoop</h1>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <MapPin className="w-3 h-3" />
            <span>{t.location}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Language selector */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors text-xs font-medium text-muted-foreground"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{locale}</span>
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-xl shadow-elevated overflow-hidden z-50 min-w-[140px]">
              {(Object.keys(localeNames) as Locale[]).map((loc) => (
                <button
                  key={loc}
                  onClick={() => { setLocale(loc); setLangOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors ${
                    locale === loc ? "text-primary font-medium" : "text-foreground"
                  }`}
                >
                  {localeNames[loc]}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
        <button className="p-2 rounded-full hover:bg-muted transition-colors">
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </header>
  );
};

export default Header;
