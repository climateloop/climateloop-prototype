import { TrendingUp, TrendingDown, Minus, Brain, Cloud } from "lucide-react";

interface ForecastItem {
  source: string;
  icon: React.ReactNode;
  temp: string;
  rain: string;
  trend: "up" | "down" | "stable";
  confidence: number;
}

const forecasts: ForecastItem[] = [
  {
    source: "Previsão Oficial",
    icon: <Cloud className="w-5 h-5 text-primary" />,
    temp: "29°C",
    rain: "40%",
    trend: "up",
    confidence: 85,
  },
  {
    source: "Previsão ML",
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

const ForecastComparison = () => {
  return (
    <div className="mx-4">
      <h2 className="text-base font-semibold text-foreground mb-3">Previsão comparada</h2>
      <div className="grid grid-cols-2 gap-3">
        {forecasts.map((f) => (
          <div
            key={f.source}
            className="bg-surface-elevated rounded-xl p-4 shadow-card border border-border"
          >
            <div className="flex items-center gap-2 mb-3">
              {f.icon}
              <span className="text-xs font-medium text-muted-foreground">{f.source}</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{f.temp}</p>
                <p className="text-xs text-muted-foreground mt-1">Chuva: {f.rain}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <TrendIcon trend={f.trend} />
                <span className="text-[10px] text-muted-foreground">{f.confidence}%</span>
              </div>
            </div>
            {/* Confidence bar */}
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${f.confidence}%`,
                  background: f.source.includes("ML")
                    ? "hsl(155 67% 32%)"
                    : "hsl(210 61% 29%)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center italic">
        O modelo ML detecta +15% de chance de chuva intensa nas próximas 6h
      </p>
    </div>
  );
};

export default ForecastComparison;
