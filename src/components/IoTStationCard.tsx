import { useState } from "react";
import { Radio, Thermometer, Droplets, Wind, Clock, MapPin, Info, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const IoTStationCard = () => {
  const { t } = useLanguage();
  const [showInfo, setShowInfo] = useState(false);

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
        <button
          onClick={() => setShowInfo(true)}
          className="p-0.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Info"
        >
          <Info className="w-4 h-4" />
        </button>
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

      {/* IoT Info Sheet */}
      {showInfo && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[100] animate-in fade-in duration-200"
            onClick={() => setShowInfo(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-[101] max-w-lg mx-auto animate-in slide-in-from-bottom duration-300">
            <div className="bg-background rounded-t-2xl border-t border-border shadow-elevated p-5 pb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-secondary" />
                  <h3 className="text-base font-bold text-foreground">{t.iotInfoTitle}</h3>
                </div>
                <button
                  onClick={() => setShowInfo(false)}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-foreground leading-relaxed">{t.iotInfoDesc1}</p>
                <p className="text-sm text-foreground leading-relaxed">{t.iotInfoDesc2}</p>
                <p className="text-sm text-foreground leading-relaxed">{t.iotInfoDesc3}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IoTStationCard;
