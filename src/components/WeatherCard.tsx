import { Droplets, Wind, Thermometer, CloudRain } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const cToF = (c: number) => Math.round(c * 9 / 5 + 32);

// SVG paths for each community report type
const reportTypeIconSVG: Record<string, string> = {
  typeFlooding:    `<path d="M2 12h20M2 18h20M6 6h.01M10 6h.01M14 6h.01M18 6h.01M4 9h16a1 1 0 0 1 1 1v2H3v-2a1 1 0 0 1 1-1z"/>`,
  typeExtremeHeat: `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`,
  typeStrongWind:  `<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>`,
  typeFire:        `<path d="M12 12c-2-2.5-4-5-2-9C9 8 12.5 9 13 10c.5-1.5.5-4 2-6-1 3 1 5 1 7 1-1 3-2 3-5 0 4-2 7-7 8z"/>`,
  typeRain:        `<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><path d="M8 16l-2 3m6-3l-2 3m6-3l-2 3"/>`,
  typeHail:        `<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><circle cx="8" cy="19" r="1"/><circle cx="12" cy="21" r="1"/><circle cx="16" cy="19" r="1"/>`,
  typeFrost:       `<path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>`,
  typeLandslide:   `<path d="M2 22L12 2l10 20z"/><line x1="12" y1="10" x2="12" y2="14"/><line x1="12" y1="18" x2="12.01" y2="18"/>`,
};

// Risk level → marker colour
const riskColour: Record<string, string> = {
  high:     "hsl(5,82%,56%)",
  moderate: "hsl(24,91%,52%)",
  low:      "hsl(42,97%,48%)",
};

import L from "leaflet";

// Community reports — expanded with more entries and photos
export const communityMapMarkers = [
  { id: "1", lat: 42.8782, lng: -8.5448, typeKey: "typeFlooding",    risk: "high",     label: "Rua inundada — María S.", filterCat: "flood" },
  { id: "3", lat: 42.8900, lng: -8.5100, typeKey: "typeStrongWind",  risk: "moderate", label: "Árvore caída — Ana L.", filterCat: "wind" },
  { id: "4", lat: 42.8700, lng: -8.5350, typeKey: "typeFlooding",    risk: "high",     label: "Passagem subterrânea inundada — Pedro M.", filterCat: "flood" },
  { id: "5", lat: 42.8820, lng: -8.5600, typeKey: "typeRain",        risk: "moderate", label: "Chuva forte persistente — Lucía G.", filterCat: "rain" },
  { id: "6", lat: 42.8600, lng: -8.5500, typeKey: "typeStrongWind",  risk: "moderate", label: "Danos por vento forte — Carlos R.", filterCat: "wind" },
  { id: "7", lat: 42.8850, lng: -8.5250, typeKey: "typeFlooding",    risk: "moderate", label: "Bueiro transbordando — Isabel F.", filterCat: "flood" },
  { id: "8", lat: 42.8750, lng: -8.5150, typeKey: "typeRain",        risk: "low",      label: "Chuva intermitente — Diego T.", filterCat: "rain" },
];

// Filter category → fill color
const filterCatFillColor: Record<string, string> = {
  flood: "hsl(220,65%,50%)", rain: "hsl(210,60%,55%)", wind: "hsl(200,15%,55%)",
  heat: "hsl(5,82%,56%)", fire: "hsl(24,91%,52%)", frost: "hsl(195,70%,55%)",
  hail: "hsl(260,40%,55%)", air: "hsl(160,50%,45%)",
};

export const communityMarkerIcon = (typeKey: string, risk: string, filterCat?: string) => {
  const borderColour = riskColour[risk] ?? riskColour["moderate"];
  const fillColour = filterCat ? (filterCatFillColor[filterCat] ?? borderColour) : borderColour;
  const iconPath = reportTypeIconSVG[typeKey] ?? reportTypeIconSVG["typeFlooding"];
  return L.divIcon({
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    html: `<div style="
      width:30px;height:30px;border-radius:50%;
      background:${fillColour};
      border:3px solid ${borderColour};
      box-shadow:0 2px 6px rgba(0,0,0,.35);
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;
    ">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        ${iconPath}
      </svg>
    </div>`,
  });
};

const WeatherCard = () => {
  const { t, unitSystem } = useLanguage();
  const isImperial = unitSystem === "imperial";

  const temp     = isImperial ? cToF(28) : 28;
  const feelsLike = isImperial ? cToF(30) : 30;
  const windVal  = isImperial ? "9 mph" : "15 km/h";
  const unit     = isImperial ? "°F" : "°";

  return (
    <div className="mx-4 rounded-2xl border border-border bg-surface-elevated shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-primary/10">
        <div className="flex items-center gap-3">
          <CloudRain className="w-5 h-5 text-primary opacity-80" />
          <div>
            <p className="text-[10px] text-muted-foreground font-medium">{t.weatherLocation}</p>
            <p className="text-base font-bold text-foreground leading-tight">
              {temp}{unit}
              <span className="text-xs font-normal text-muted-foreground ml-1.5">{t.weatherPartlyCloudy}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <div className="flex flex-col items-center gap-0.5">
            <Thermometer className="w-3 h-3" />
            <span>{feelsLike}{unit}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <Droplets className="w-3 h-3" />
            <span>72%</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <Wind className="w-3 h-3" />
            <span>{windVal}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <CloudRain className="w-3 h-3" />
            <span>40%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
