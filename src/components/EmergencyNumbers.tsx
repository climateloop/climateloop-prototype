import { useState, useEffect } from "react";
import { Phone, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocation } from "@/hooks/useLocationContext";
import { supabase } from "@/integrations/supabase/client";

interface EmergencyEntry {
  labelKey: string;
  number: string;
  secondary?: string;
}

// Fallback for Spain while loading
const fallbackData: EmergencyEntry[] = [
  { labelKey: "emergencyPolice", number: "112", secondary: "091" },
  { labelKey: "emergencyFire", number: "112", secondary: "080" },
  { labelKey: "emergencyMedical", number: "112", secondary: "061" },
  { labelKey: "emergencyCivilDefense", number: "112" },
  { labelKey: "emergencyRedCross", number: "900 22 22 92" },
];

const EmergencyNumbers = () => {
  const { t, locale } = useLanguage();
  const { location } = useLocation();
  const [numbers, setNumbers] = useState<EmergencyEntry[]>(fallbackData);
  const [countryName, setCountryName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchNumbers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("emergency-numbers", {
          body: { lat: location.lat, lng: location.lng },
        });
        if (!cancelled && data?.numbers) {
          setNumbers(data.numbers);
          if (data.country_names) {
            setCountryName(data.country_names[locale] || data.country_names["en"] || null);
          } else {
            setCountryName(null);
          }
        }
      } catch {
        // keep fallback
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchNumbers();
    return () => { cancelled = true; };
  }, [location.lat, location.lng]);

  return (
    <div className="mx-4">
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Phone className="w-4 h-4 text-destructive" />
          <h3 className="text-sm font-semibold text-foreground">
            {t.emergencyTitlePrefix}{countryName ? ` — ${countryName}` : ""}
          </h3>
          {loading && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
        </div>
        <div className="space-y-2">
          {numbers.map((item) => (
            <div key={item.labelKey} className="flex items-center justify-between py-1.5">
              <span className="text-xs text-muted-foreground">{(t as any)[item.labelKey] ?? item.labelKey}</span>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${item.number.replace(/\s/g, "")}`}
                  className="text-sm font-semibold text-primary"
                >
                  {item.number}
                </a>
                {item.secondary && (
                  <>
                    <span className="text-muted-foreground text-xs">/</span>
                    <a
                      href={`tel:${item.secondary.replace(/\s/g, "")}`}
                      className="text-sm font-semibold text-primary"
                    >
                      {item.secondary}
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyNumbers;
