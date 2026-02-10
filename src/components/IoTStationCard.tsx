import { Radio, Thermometer, Droplets, Wind, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const IoTStationCard = () => {
  const { t } = useLanguage();

  const station = {
    name: "EST-MAD-017",
    distance: "1.2 km",
    temp: "29°C",
    humidity: "68%",
    wind: "12 km/h",
    lastUpdate: "2 min",
    online: true,
  };

  return (
    <div className="mx-4">
      <div className="flex items-center gap-2 mb-3">
        <Radio className="w-4 h-4 text-secondary" />
        <h2 className="text-base font-semibold text-foreground">{t.iotTitle}</h2>
      </div>

      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-semibold text-foreground">{station.name}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-semibold">
              {t.iotLive}
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="text-[10px]">{station.distance}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
            <Thermometer className="w-4 h-4 text-destructive" />
            <span className="text-lg font-bold text-foreground">{station.temp}</span>
            <span className="text-[10px] text-muted-foreground">{t.weatherFeelsLike}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
            <Droplets className="w-4 h-4 text-primary" />
            <span className="text-lg font-bold text-foreground">{station.humidity}</span>
            <span className="text-[10px] text-muted-foreground">{t.weatherHumidity}</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted">
            <Wind className="w-4 h-4 text-accent" />
            <span className="text-lg font-bold text-foreground">{station.wind}</span>
            <span className="text-[10px] text-muted-foreground">{t.weatherWind}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span className="text-[10px]">{t.iotLastUpdate}: {station.lastUpdate}</span>
          </div>
          <span className="text-[10px] text-muted-foreground italic">{t.iotRadiusNote}</span>
        </div>
      </div>
    </div>
  );
};

export default IoTStationCard;
