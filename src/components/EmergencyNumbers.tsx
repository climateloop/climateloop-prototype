import { Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const emergencyData = [
  { labelKey: "emergencyPolice" as const, number: "112", secondary: "091" },
  { labelKey: "emergencyFire" as const, number: "112", secondary: "080" },
  { labelKey: "emergencyMedical" as const, number: "112", secondary: "061" },
  { labelKey: "emergencyCivilDefense" as const, number: "112" },
  { labelKey: "emergencyRedCross" as const, number: "900 22 22 92" },
];

const EmergencyNumbers = () => {
  const { t } = useLanguage();

  return (
    <div className="mx-4">
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Phone className="w-4 h-4 text-destructive" />
          <h3 className="text-sm font-semibold text-foreground">{t.emergencyTitle}</h3>
        </div>
        <div className="space-y-2">
          {emergencyData.map((item) => (
            <div key={item.labelKey} className="flex items-center justify-between py-1.5">
              <span className="text-xs text-muted-foreground">{t[item.labelKey]}</span>
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
                      href={`tel:${item.secondary}`}
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
