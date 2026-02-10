import { createContext, useContext, useState, type ReactNode } from "react";
import { type Locale, translations, localeNames } from "./translations";

export type UnitSystem = "metric" | "imperial";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof translations)["en"];
  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("en");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale], unitSystem, setUnitSystem }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export { localeNames, type Locale };
