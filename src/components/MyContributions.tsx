import { ArrowLeft, Camera, MapPin, Clock, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface Contribution {
  id: string;
  typeKey: string;
  description: string;
  time: string;
  verified: boolean;
  hasPhoto: boolean;
}

const myContributions: Contribution[] = [
  { id: "c1", typeKey: "typeFlooding", description: "Calle inundada en Puerta del Sol", time: "2h", verified: true, hasPhoto: true },
  { id: "c2", typeKey: "typeExtremeHeat", description: "Temperatura extrema en Retiro", time: "1d", verified: true, hasPhoto: false },
  { id: "c3", typeKey: "typeStrongWind", description: "Ramas caídas en Malasaña", time: "3d", verified: false, hasPhoto: true },
];

const typeColorMap: Record<string, string> = {
  typeFlooding: "bg-primary/10 text-primary",
  typeExtremeHeat: "bg-destructive/10 text-destructive",
  typeStrongWind: "bg-warning/10 text-warning",
  typeFire: "bg-destructive/10 text-destructive",
};

interface MyContributionsProps {
  onBack: () => void;
}

const MyContributions = ({ onBack }: MyContributionsProps) => {
  const { t } = useLanguage();

  return (
    <div className="px-4 pb-4 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.backButton}
      </button>

      <h2 className="text-lg font-bold text-foreground mb-4">{t.myContribTitle}</h2>

      <div className="space-y-3">
        {myContributions.map((c) => {
          const typeLabel = (t as any)[c.typeKey] || c.typeKey;
          return (
            <div key={c.id} className="bg-surface-elevated rounded-xl p-4 shadow-card border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColorMap[c.typeKey] || "bg-muted text-muted-foreground"}`}>
                      {typeLabel}
                    </span>
                    {c.hasPhoto && <Camera className="w-3.5 h-3.5 text-muted-foreground" />}
                  </div>
                  <p className="text-sm text-foreground">{c.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {c.time}
                    </span>
                    {c.verified ? (
                      <span className="flex items-center gap-1 text-xs text-secondary font-medium">
                        <CheckCircle className="w-3 h-3" />
                        {t.myContribVerified}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                        <AlertCircle className="w-3 h-3" />
                        {t.myContribPending}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground mt-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyContributions;
