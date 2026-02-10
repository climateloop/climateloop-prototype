import { TrendingUp, TrendingDown, Minus, Brain, Cloud, Radio, Sparkles, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ForecastItem {
  sourceKey: "forecastOfficial" | "forecastML" | "forecastIoT";
  icon: React.ReactNode;
  tempC: number;
  rainChance: string | null;
  rainMm: string | null;
  wind: string | null;
  humidity: string | null;
  trend: "up" | "down" | "stable";
  confidence: number;
}

const forecastData: ForecastItem[] = [
  {
    sourceKey: "forecastOfficial",
    icon: <Cloud className="w-4 h-4 text-primary" />,
    tempC: 28,
    rainChance: "40%",
    rainMm: "8mm",
    wind: "15 km/h",
    humidity: "72%",
    trend: "up",
    confidence: 85,
  },
  {
    sourceKey: "forecastML",
    icon: <Brain className="w-4 h-4 text-secondary" />,
    tempC: 31,
    rainChance: "55%",
    rainMm: null,
    wind: null,
    humidity: null,
    trend: "up",
    confidence: 78,
  },
  {
    sourceKey: "forecastIoT",
    icon: <Radio className="w-4 h-4 text-accent" />,
    tempC: 29,
    rainChance: null,
    rainMm: null,
    wind: "12 km/h",
    humidity: "68%",
    trend: "stable",
    confidence: 95,
  },
];

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-destructive" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-secondary" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
};

const cToF = (c: number) => Math.round(c * 9 / 5 + 32);
const kmhToMph = (kmh: string) => {
  const num = parseFloat(kmh);
  return `${Math.round(num * 0.621)} mph`;
};

interface ForecastComparisonProps {
  onOpenDetail?: () => void;
}

const ForecastComparison = ({ onOpenDetail }: ForecastComparisonProps) => {
  const { t, unitSystem } = useLanguage();
  const isImperial = unitSystem === "imperial";

  const formatTemp = (c: number) => isImperial ? `${cToF(c)}°F` : `${c}°C`;
  const formatWind = (w: string | null) => {
    if (!w) return null;
    return isImperial ? kmhToMph(w) : w;
  };

  return (
    <div className="mx-4">
      <h2 className="text-base font-semibold text-foreground mb-3">{t.forecastTitle}</h2>
      <div className="grid grid-cols-3 gap-2">
        {forecastData.map((f) => (
          <div
            key={f.sourceKey}
            className="bg-surface-elevated rounded-xl p-3 shadow-card border border-border flex flex-col"
          >
            <div className="flex items-center gap-1.5 mb-2">
              {f.icon}
              <span className="text-[10px] font-medium text-muted-foreground leading-tight">{t[f.sourceKey]}</span>
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-lg font-bold text-foreground">{formatTemp(f.tempC)}</p>
              <p className="text-[10px] text-muted-foreground">{t.forecastRain}: {f.rainChance ?? "N/A"}</p>
              <p className="text-[10px] text-muted-foreground">{t.forecastPrecip}: {f.rainMm ?? "N/A"}</p>
              <p className="text-[10px] text-muted-foreground">{t.weatherWind}: {formatWind(f.wind) ?? "N/A"}</p>
              <p className="text-[10px] text-muted-foreground">{t.weatherHumidity}: {f.humidity ?? "N/A"}</p>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendIcon trend={f.trend} />
              <span className="text-[10px] text-muted-foreground">{f.confidence}%</span>
            </div>
            <div className="mt-1.5 h-1 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full gradient-heat transition-all duration-500"
                style={{ width: `${f.confidence}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ML insight + CTA */}
      <div className="mt-3 bg-surface-elevated rounded-xl border border-border shadow-card p-3">
        <p className="text-xs text-muted-foreground italic text-center">{t.forecastMLNote}</p>
        <button
          onClick={onOpenDetail}
          className="flex items-center justify-center gap-1.5 mt-2 w-full py-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-sm font-medium text-foreground">{t.aiUnderstandForecast}</span>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent ml-1 pointer-events-none select-none">
            {t.aiPowered}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ForecastComparison;
