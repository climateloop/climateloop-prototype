import { TrendingUp, TrendingDown, Minus, Brain, Cloud, Radio, Sparkles, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ForecastItem {
  sourceKey: "forecastOfficial" | "forecastML" | "forecastIoT";
  icon: React.ReactNode;
  temp: string;
  rain: string;
  trend: "up" | "down" | "stable";
  confidence: number;
}

const forecastData: ForecastItem[] = [
  {
    sourceKey: "forecastOfficial",
    icon: <Cloud className="w-4 h-4 text-primary" />,
    temp: "28°C",
    rain: "40% · 8mm",
    trend: "up",
    confidence: 85,
  },
  {
    sourceKey: "forecastML",
    icon: <Brain className="w-4 h-4 text-secondary" />,
    temp: "31°C",
    rain: "55%",
    trend: "up",
    confidence: 78,
  },
  {
    sourceKey: "forecastIoT",
    icon: <Radio className="w-4 h-4 text-accent" />,
    temp: "29°C",
    rain: "—",
    trend: "stable",
    confidence: 95,
  },
];

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-destructive" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-secondary" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
};

interface ForecastComparisonProps {
  onOpenDetail?: () => void;
}

const ForecastComparison = ({ onOpenDetail }: ForecastComparisonProps) => {
  const { t } = useLanguage();

  return (
    <div className="mx-4">
      <h2 className="text-base font-semibold text-foreground mb-3">{t.forecastTitle}</h2>
      <div className="grid grid-cols-3 gap-2">
        {forecastData.map((f) => (
            <div
              key={f.sourceKey}
              className="bg-surface-elevated rounded-xl p-3 shadow-card border border-border"
            >
              <div className="flex items-center gap-1.5 mb-2">
                {f.icon}
                <span className="text-[10px] font-medium text-muted-foreground leading-tight">{t[f.sourceKey]}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{f.temp}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{t.forecastRain}: {f.rain}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendIcon trend={f.trend} />
                <span className="text-[10px] text-muted-foreground">{f.confidence}%</span>
              </div>
              <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
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
