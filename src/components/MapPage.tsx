import { Map, Layers, Navigation } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const MapPage = () => {
  const { t } = useLanguage();

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center gap-2 mb-4">
        <Map className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">{t.mapTitle}</h2>
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-surface-elevated border border-border shadow-card aspect-square">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-warning/10" />
        
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="absolute top-1/4 left-1/3 w-20 h-20 rounded-full bg-destructive/20 blur-xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-warning/20 blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/4 w-14 h-14 rounded-full bg-accent/20 blur-xl animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-1/4 right-1/3 w-12 h-12 rounded-full bg-secondary/20 blur-xl animate-pulse" style={{ animationDelay: "1.5s" }} />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 rounded-full bg-primary shadow-elevated ring-4 ring-primary/20" />
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-primary/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="absolute top-[30%] left-[40%] w-3 h-3 rounded-full bg-destructive shadow-sm" />
        <div className="absolute top-[55%] right-[30%] w-3 h-3 rounded-full bg-warning shadow-sm" />
        <div className="absolute bottom-[35%] left-[25%] w-3 h-3 rounded-full bg-accent shadow-sm" />

        <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm rounded-lg p-2 text-[10px] space-y-1 border border-border">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-foreground">{t.mapHighRisk}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-foreground">{t.mapModerateRisk}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-foreground">{t.mapLowRisk}</span>
          </div>
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="w-8 h-8 bg-background/90 backdrop-blur-sm rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
            <Layers className="w-4 h-4 text-foreground" />
          </button>
          <button className="w-8 h-8 bg-background/90 backdrop-blur-sm rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
            <Navigation className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      <div className="mt-4 bg-surface-elevated rounded-xl border border-border p-4 shadow-card">
        <p className="text-sm font-medium text-foreground mb-2">{t.mapRadius}</p>
        <div className="flex gap-2">
          {["1 km", "5 km", "10 km", "25 km"].map((r, i) => (
            <button
              key={r}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                i === 1
                  ? "gradient-primary text-primary-foreground shadow-card"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
