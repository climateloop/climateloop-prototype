import { Droplets, Wind, Thermometer, CloudRain } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const WeatherCard = () => {
  const { t } = useLanguage();

  return (
    <div className="mx-4 rounded-2xl gradient-primary p-3 text-primary-foreground shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs opacity-80 font-medium">{t.weatherLocation}</p>
          <p className="text-3xl font-bold mt-0.5 tracking-tight">28°</p>
          <p className="text-xs opacity-70 mt-0.5">{t.weatherPartlyCloudy}</p>
        </div>
        <CloudRain className="w-10 h-10 opacity-80" />
      </div>
      <div className="flex items-center justify-around mt-2 pt-2 border-t border-primary-foreground/20">
        <div className="flex flex-col items-center gap-0.5">
          <Thermometer className="w-3.5 h-3.5 opacity-70" />
          <span className="text-[10px] opacity-70">{t.weatherFeelsLike}</span>
          <span className="text-xs font-semibold">30°</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <Droplets className="w-3.5 h-3.5 opacity-70" />
          <span className="text-[10px] opacity-70">{t.weatherHumidity}</span>
          <span className="text-xs font-semibold">72%</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <Wind className="w-3.5 h-3.5 opacity-70" />
          <span className="text-[10px] opacity-70">{t.weatherWind}</span>
          <span className="text-xs font-semibold">15 km/h</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <CloudRain className="w-3.5 h-3.5 opacity-70" />
          <span className="text-[10px] opacity-70">{t.weatherRainChance}</span>
          <span className="text-xs font-semibold">40% · 8mm</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
