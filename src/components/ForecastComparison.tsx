import { TrendingUp, TrendingDown, Minus, Brain, Cloud, Sparkles, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ForecastItem {
  sourceKey: "forecastOfficial" | "forecastML";
  icon: React.ReactNode;
  temp: string;
  rain: string;
  trend: "up" | "down" | "stable";
  confidence: number;
}

const forecastData: ForecastItem[] = [
  {
    sourceKey: "forecastOfficial",
    icon: <Cloud className="w-5 h-5 text-primary" />,
    temp: "29°C",
    rain: "40%",
    trend: "up",
    confidence: 85,
  },
  {
    sourceKey: "forecastML",
    icon: <Brain className="w-5 h-5 text-secondary" />,
    temp: "31°C",
    rain: "55%",
    trend: "up",
    confidence: 78,
  },
];

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-destructive" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-secondary" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

interface ForecastComparisonProps {
  onOpenDetail?: () => void;
}

const ForecastComparison = ({ onOpenDetail }: ForecastComparisonProps) => {
  const { t } = useLanguage();

  return (
    <div className="mx-4">
      <h2 className="text-base font-semibold text-foreground mb-3">{t.forecastTitle}</h2>
      <div className="grid grid-cols-2 gap-3">
        {forecastData.map((f) => (
          <div
            key={f.sourceKey}
            className="bg-surface-elevated rounded-xl p-4 shadow-card border border-border"
          >
            <div className="flex items-center gap-2 mb-3">
              {f.icon}
              <span className="text-xs font-medium text-muted-foreground">{t[f.sourceKey]}</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{f.temp}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.forecastRain}: {f.rain}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <TrendIcon trend={f.trend} />
                <span className="text-[10px] text-muted-foreground">{f.confidence}%</span>
              </div>
            </div>
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full gradient-heat transition-all duration-500"
                style={{ width: `${f.confidence}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center italic">
        {t.forecastMLNote}
      </p>
      {/* AI-powered CTA */}
      <button
        onClick={onOpenDetail}
        className="flex items-center justify-center gap-1.5 mt-3 w-full py-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5 text-accent" />
        <span className="text-sm font-medium text-foreground">{t.aiUnderstandForecast}</span>
        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent ml-1 pointer-events-none select-none">
          {t.aiPowered}
        </span>
      </button>
    </div>
  );
};

export default ForecastComparison;
