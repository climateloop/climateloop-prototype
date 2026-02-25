import { ArrowLeft, Camera, MapPin, Clock, CheckCircle, ChevronRight, Star } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

function getRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

interface Contribution {
  id: string;
  typeKey: string;
  description: string;
  time: string;
  verified: boolean;
  hasPhoto: boolean;
  positiveRatings: number;
  totalRatings: number;
  translations?: Record<string, { title?: string; notes?: string | null }>;
}

const myContributions: Contribution[] = [
  { id: "1", typeKey: "typeFlooding", description: "Rúa da Raíña completamente inundada tras forte chuveira", time: "2h", verified: true, hasPhoto: true, positiveRatings: 18, totalRatings: 21, translations: { es: { title: "Rúa da Raíña completamente inundada tras forte chuveira" }, en: { title: "Rúa da Raíña completely flooded after heavy rain" }, pt: { title: "Rúa da Raíña completamente inundada após chuva forte" }, fr: { title: "Rúa da Raíña complètement inondée après de fortes pluies" } } },
  { id: "3", typeKey: "typeStrongWind", description: "Árbore caída na Rúa Nova bloqueando o tráfico", time: "1h", verified: true, hasPhoto: true, positiveRatings: 15, totalRatings: 17, translations: { es: { title: "Árbore caída na Rúa Nova bloqueando o tráfico" }, en: { title: "Fallen tree on Rúa Nova blocking traffic" }, pt: { title: "Árvore caída na Rúa Nova bloqueando o trânsito" }, fr: { title: "Arbre tombé sur la Rúa Nova bloquant la circulation" } } },
];

const typeColorMap: Record<string, string> = {
  typeFlooding: "bg-primary/10 text-primary",
  typeExtremeHeat: "bg-destructive/10 text-destructive",
  typeStrongWind: "bg-warning/10 text-warning",
  typeFire: "bg-destructive/10 text-destructive",
};

interface MyContributionsProps {
  onBack: () => void;
  onOpenReport?: (reportId: string) => void;
}

const MyContributions = ({ onBack, onOpenReport }: MyContributionsProps) => {
  const { t, locale } = useLanguage();
  const [userInitial, setUserInitial] = useState("U");
  const [dbContributions, setDbContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const name = user.user_metadata?.display_name || user.email || "";
        setUserInitial((name.charAt(0) || "U").toUpperCase());

        // Fetch real contributions from database
        supabase
          .from("community_reports")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "verified")
          .order("created_at", { ascending: false })
          .then(({ data }) => {
            if (data) {
              const categoryToTypeKey: Record<string, string> = {
                flooding: "typeFlooding",
                extreme_heat: "typeExtremeHeat",
                strong_wind: "typeStrongWind",
                fire: "typeFire",
                rain: "typeRain",
                hail: "typeHail",
                frost: "typeFrost",
                chuva: "typeRain",
                vento: "typeStrongWind",
                calor: "typeExtremeHeat",
                incendio: "typeFire",
                helada: "typeFrost",
                granizo: "typeHail",
                enchente: "typeFlooding",
                ciclone: "typeStrongWind",
                deslizamento: "typeFlooding",
                seca: "typeExtremeHeat",
                tempestade: "typeRain",
                tornado: "typeStrongWind",
              };
              setDbContributions(
                data.map((r) => ({
                  id: r.id,
                  typeKey: categoryToTypeKey[r.category] || r.category,
                  description: r.title,
                  time: getRelativeTime(r.created_at),
                  verified: true,
                  hasPhoto: !!r.photo_url,
                  positiveRatings: 0,
                  totalRatings: 0,
                  translations: r.translations as any,
                }))
              );
            }
          });
      }
    });
  }, []);

  const allContributions = [...myContributions, ...dbContributions];

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
        {allContributions.map((c) => {
          const typeLabel = (t as any)[c.typeKey] || c.typeKey;
          return (
            <button key={c.id} onClick={() => onOpenReport?.(c.id)} className="w-full text-left bg-surface-elevated rounded-xl p-4 shadow-card border border-border hover:bg-muted transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary-foreground">{userInitial}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColorMap[c.typeKey] || "bg-muted text-muted-foreground"}`}>
                      {typeLabel}
                    </span>
                    {c.hasPhoto && <Camera className="w-3.5 h-3.5 text-muted-foreground" />}
                  </div>
                  <p className="text-sm text-foreground">{c.translations?.[locale]?.title || c.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {c.time}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-secondary font-medium">
                      <CheckCircle className="w-3 h-3" />
                      {t.myContribVerified}
                    </span>
                    {c.totalRatings > 0 && (
                      <span className="flex items-center gap-1 text-xs text-warning font-medium">
                        <Star className="w-3 h-3 fill-warning" /> {((c.positiveRatings / c.totalRatings) * 5).toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground mt-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MyContributions;
