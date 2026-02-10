import { Droplets, Wind, Thermometer, CloudRain } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const WeatherCard = () => {
  const { t } = useLanguage();

  return (
    <div className="mx-4 rounded-2xl gradient-primary p-5 text-primary-foreground shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm opacity-80 font-medium">{t.weatherLocation}</p>
          <p className="text-5xl font-bold mt-1 tracking-tight">28°</p>
          <p className="text-sm opacity-70 mt-1">{t.weatherPartlyCloudy}</p>
        </div>
        <CloudRain className="w-14 h-14 opacity-80" />
      </div>
      <div className="flex items-center gap-6 mt-5 pt-4 border-t border-primary-foreground/20">
        <div className="flex flex-col items-center gap-1">
          <Thermometer className="w-4 h-4 opacity-70" />
          <span className="text-xs opacity-70">{t.weatherFeelsLike}</span>
          <span className="text-sm font-semibold">30°</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Droplets className="w-4 h-4 opacity-70" />
          <span className="text-xs opacity-70">{t.weatherHumidity}</span>
          <span className="text-sm font-semibold">72%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Wind className="w-4 h-4 opacity-70" />
          <span className="text-xs opacity-70">{t.weatherWind}</span>
          <span className="text-sm font-semibold">15 km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
