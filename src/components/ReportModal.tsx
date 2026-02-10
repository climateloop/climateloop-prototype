import { useState } from "react";
import { X, Camera, Send, CloudRain, Wind, Thermometer, Flame, Snowflake, CloudHail, Waves, CloudLightning, Mountain, Droplets, Zap, Tornado, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CategoryId = "chuva" | "vento" | "calor" | "incendio" | "helada" | "granizo" | "enchente" | "ciclone" | "deslizamento" | "seca" | "tempestade" | "tornado";

interface Category {
  id: CategoryId;
  labelKey: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categories: Category[] = [
  { id: "chuva", labelKey: "catRain", icon: CloudRain },
  { id: "vento", labelKey: "catWind", icon: Wind },
  { id: "calor", labelKey: "catHeat", icon: Thermometer },
  { id: "incendio", labelKey: "catFire", icon: Flame },
  { id: "helada", labelKey: "catCold", icon: Snowflake },
  { id: "granizo", labelKey: "catHail", icon: CloudHail },
  { id: "enchente", labelKey: "catFlood", icon: Waves },
  { id: "ciclone", labelKey: "catCyclone", icon: Tornado },
  { id: "deslizamento", labelKey: "catLandslide", icon: Mountain },
  { id: "seca", labelKey: "catDrought", icon: Droplets },
  { id: "tempestade", labelKey: "catStorm", icon: CloudLightning },
  { id: "tornado", labelKey: "catTornado", icon: Zap },
];

const subOptionKeys: Record<CategoryId, string[]> = {
  chuva: ["subRain1", "subRain2", "subRain3", "subRain4"],
  vento: ["subWind1", "subWind2", "subWind3", "subWind4"],
  calor: ["subHeat1", "subHeat2", "subHeat3"],
  incendio: ["subFire1", "subFire2", "subFire3", "subFire4"],
  helada: ["subCold1", "subCold2", "subCold3"],
  granizo: ["subHail1", "subHail2", "subHail3"],
  enchente: ["subFlood1", "subFlood2", "subFlood3"],
  ciclone: ["subCyclone1", "subCyclone2", "subCyclone3"],
  deslizamento: ["subLandslide1", "subLandslide2", "subLandslide3"],
  seca: ["subDrought1", "subDrought2", "subDrought3"],
  tempestade: ["subStorm1", "subStorm2", "subStorm3"],
  tornado: ["subTornado1", "subTornado2", "subTornado3"],
};

const ReportModal = ({ isOpen, onClose }: ReportModalProps) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    alert(t.reportSuccess);
    setSelectedCategory(null);
    setSelectedSub(null);
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/40 backdrop-blur-sm">
      <div className="bg-background w-full max-w-lg rounded-t-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
        <div className="sticky top-0 bg-background flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">
            {selectedCategory
              ? `${t.reportCategory} ${(t as any)[categories.find((c) => c.id === selectedCategory)?.labelKey || ""]}`
              : t.reportTitle}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {!selectedCategory ? (
            <>
              <p className="text-sm text-muted-foreground">{t.reportSubtitle}</p>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-surface-elevated hover:border-primary hover:shadow-card transition-all"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                      <span className="text-xs font-medium text-foreground">{(t as any)[cat.labelKey]}</span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">{t.reportWhat}</p>
                <div className="flex flex-wrap gap-2">
                  {subOptionKeys[selectedCategory]?.map((key) => {
                    const label = (t as any)[key];
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedSub(key)}
                        className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                          selectedSub === key
                            ? "border-primary bg-primary/10 text-primary font-medium"
                            : "border-border text-foreground hover:border-primary/50"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">{t.reportNotes}</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.reportNotesPlaceholder}
                  className="w-full p-3 rounded-xl border border-border bg-surface-elevated text-sm text-foreground placeholder:text-muted-foreground resize-none h-20 outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  <Camera className="w-5 h-5" />
                  <span className="text-sm font-medium">{t.reportAddPhoto}</span>
                </button>
                <div className="flex items-start gap-2 px-2">
                  <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">{t.reportPhotoWarning}</p>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!selectedSub}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm shadow-card hover:shadow-elevated transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {t.reportSend}
              </button>

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSub(null);
                }}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.reportBack}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
