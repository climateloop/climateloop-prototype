import { useState } from "react";
import { ArrowLeft, AlertTriangle, Sparkles, MessageCircle, Copy, Share2, Check, Languages } from "lucide-react";
import { useLanguage, type Locale } from "@/i18n/LanguageContext";
import { translations, localeNames } from "@/i18n/translations";
import { type Alert } from "./AlertCard";

const severityStyles = {
  yellow: {
    bg: "bg-accent/15",
    border: "border-accent",
    title: "text-accent",
    icon: "text-accent",
    badge: "bg-accent/20 text-accent",
  },
  orange: {
    bg: "bg-warning/15",
    border: "border-warning",
    title: "text-warning",
    icon: "text-warning",
    badge: "bg-warning/20 text-warning",
  },
  red: {
    bg: "bg-destructive/15",
    border: "border-destructive",
    title: "text-destructive",
    icon: "text-destructive",
    badge: "bg-destructive/20 text-destructive",
  },
};

// Official full-text per alert id, per locale
type AlertOfficialTexts = Record<string, Record<Locale, string>>;

const alertOfficialTexts: AlertOfficialTexts = {
  main: {
    es: "ALERTA NARANJA — PRECIPITACIONES INTENSAS\n\nEmitido por: Agencia Estatal de Meteorología (AEMET)\nFecha de emisión: Hoy, 09:30 UTC\nÁrea afectada: Comunidad de Madrid — Zona Centro y Sur\nVigencia: Desde las 10:00 hasta las 22:00 UTC\n\nSe prevén precipitaciones superiores a 50 mm en 12 horas, con posibilidad de chubascos puntualmente intensos superiores a 20 mm en 1 hora. Se pueden producir acumulaciones de agua en calzadas y zonas bajas, con riesgo de desbordamiento de pequeños cauces. Se recomienda extremar la precaución durante los desplazamientos.",
    en: "ORANGE ALERT — HEAVY RAINFALL\n\nIssued by: State Meteorological Agency (AEMET)\nIssued: Today, 09:30 UTC\nAffected area: Community of Madrid — Central and Southern Zone\nValid: From 10:00 to 22:00 UTC\n\nRainfall exceeding 50mm in 12 hours is expected, with locally intense showers above 20mm in 1 hour. Water accumulation may occur on roads and low-lying areas, with risk of small watercourse overflow. Exercise extreme caution when traveling.",
    pt: "ALERTA LARANJA — CHUVAS INTENSAS\n\nEmitido por: Agência Estatal de Meteorologia (AEMET)\nData de emissão: Hoje, 09:30 UTC\nÁrea afetada: Comunidade de Madri — Zona Central e Sul\nVigência: Das 10:00 às 22:00 UTC\n\nEsperam-se precipitações superiores a 50 mm em 12 horas, com possibilidade de chuvas localmente intensas superiores a 20 mm em 1 hora. Podem ocorrer acumulações de água em vias e zonas baixas, com risco de transbordamento de pequenos cursos d'água. Recomenda-se extrema cautela durante os deslocamentos.",
    fr: "ALERTE ORANGE — FORTES PRÉCIPITATIONS\n\nÉmis par : Agence d'État de Météorologie (AEMET)\nDate d'émission : Aujourd'hui, 09:30 UTC\nZone concernée : Communauté de Madrid — Zone Centre et Sud\nValidité : De 10:00 à 22:00 UTC\n\nDes précipitations supérieures à 50 mm en 12 heures sont attendues, avec possibilité d'averses localement intenses supérieures à 20 mm en 1 heure. Des accumulations d'eau peuvent se produire sur les chaussées et zones basses, avec risque de débordement de petits cours d'eau. Il est recommandé d'être extrêmement prudent lors des déplacements.",
  },
  "1": {
    es: "ALERTA ROJA — LLUVIAS MUY INTENSAS\n\nEmitido por: Agencia Estatal de Meteorología (AEMET)\nFecha de emisión: Hoy, 08:00 UTC\nÁrea afectada: Gran Vía y Zona Centro de Madrid\nVigencia: Desde las 08:00 hasta las 20:00 UTC\n\nSe prevén precipitaciones superiores a 80 mm/h. Riesgo muy alto de inundaciones repentinas, arrastre de objetos y corte de vías de comunicación. Se activa el nivel 3 del Plan de Emergencias. Las autoridades pueden ordenar evacuaciones preventivas en zonas de riesgo.",
    en: "RED ALERT — EXTREMELY HEAVY RAIN\n\nIssued by: State Meteorological Agency (AEMET)\nIssued: Today, 08:00 UTC\nAffected area: Gran Vía and Central Madrid\nValid: From 08:00 to 20:00 UTC\n\nRainfall exceeding 80mm/h is forecast. Very high risk of flash flooding, object displacement and road closures. Emergency Plan level 3 is activated. Authorities may order preventive evacuations in at-risk areas.",
    pt: "ALERTA VERMELHO — CHUVAS MUITO INTENSAS\n\nEmitido por: Agência Estatal de Meteorologia (AEMET)\nData de emissão: Hoje, 08:00 UTC\nÁrea afetada: Gran Vía e Zona Central de Madri\nVigência: Das 08:00 às 20:00 UTC\n\nEsperam-se precipitações superiores a 80 mm/h. Risco muito alto de inundações repentinas, arrastamento de objetos e interrupção de vias. Ativa-se o nível 3 do Plano de Emergências. As autoridades podem ordenar evacuações preventivas em zonas de risco.",
    fr: "ALERTE ROUGE — PLUIES TRÈS INTENSES\n\nÉmis par : Agence d'État de Météorologie (AEMET)\nDate d'émission : Aujourd'hui, 08:00 UTC\nZone concernée : Gran Vía et Centre de Madrid\nValidité : De 08:00 à 20:00 UTC\n\nDes précipitations supérieures à 80mm/h sont prévues. Risque très élevé d'inondations soudaines, d'entraînement d'objets et de coupure de voies de communication. Le niveau 3 du Plan d'Urgence est activé. Les autorités peuvent ordonner des évacuations préventives dans les zones à risque.",
  },
  "2": {
    es: "ALERTA NARANJA — CALOR EXTREMO\n\nEmitido por: Agencia Estatal de Meteorología (AEMET)\nFecha de emisión: Hoy, 07:00 UTC\nÁrea afectada: Zona Este de Madrid\nVigencia: Mañana de 10:00 a 22:00 UTC\n\nSe esperan temperaturas máximas de 38–40 °C con sensación térmica superior a 42 °C. Riesgo significativo para población vulnerable: personas mayores, menores de 5 años, enfermos crónicos y personas que trabajan al exterior.",
    en: "ORANGE ALERT — EXTREME HEAT\n\nIssued by: State Meteorological Agency (AEMET)\nIssued: Today, 07:00 UTC\nAffected area: Eastern Madrid Zone\nValid: Tomorrow from 10:00 to 22:00 UTC\n\nMaximum temperatures of 38–40°C are expected with heat index above 42°C. Significant risk for vulnerable populations: elderly, children under 5, chronic patients and outdoor workers.",
    pt: "ALERTA LARANJA — CALOR EXTREMO\n\nEmitido por: Agência Estatal de Meteorologia (AEMET)\nData de emissão: Hoje, 07:00 UTC\nÁrea afetada: Zona Leste de Madri\nVigência: Amanhã das 10:00 às 22:00 UTC\n\nEsperam-se temperaturas máximas de 38–40°C com sensação térmica superior a 42°C. Risco significativo para população vulnerável: idosos, menores de 5 anos, doentes crônicos e trabalhadores ao ar livre.",
    fr: "ALERTE ORANGE — CHALEUR EXTRÊME\n\nÉmis par : Agence d'État de Météorologie (AEMET)\nDate d'émission : Aujourd'hui, 07:00 UTC\nZone concernée : Zone Est de Madrid\nValidité : Demain de 10:00 à 22:00 UTC\n\nDes températures maximales de 38–40°C sont attendues avec une sensation thermique supérieure à 42°C. Risque significatif pour les populations vulnérables : personnes âgées, enfants de moins de 5 ans, malades chroniques et travailleurs en extérieur.",
  },
  "3": {
    es: "ALERTA AMARILLA — VIENTO MODERADO\n\nEmitido por: Agencia Estatal de Meteorología (AEMET)\nFecha de emisión: Hoy, 11:00 UTC\nÁrea afectada: Zona Norte de Madrid\nVigencia: Esta tarde de 14:00 a 21:00 UTC\n\nRachas de viento de hasta 60 km/h. Posible caída de ramas y objetos ligeros. Se recomienda precaución en carreteras expuestas y asegurar elementos en terrazas.",
    en: "YELLOW ALERT — MODERATE WIND\n\nIssued by: State Meteorological Agency (AEMET)\nIssued: Today, 11:00 UTC\nAffected area: Northern Madrid Zone\nValid: This afternoon from 14:00 to 21:00 UTC\n\nWind gusts up to 60 km/h. Possible falling branches and lightweight objects. Caution advised on exposed roads; secure items on terraces and balconies.",
    pt: "ALERTA AMARELO — VENTO MODERADO\n\nEmitido por: Agência Estatal de Meteorologia (AEMET)\nData de emissão: Hoje, 11:00 UTC\nÁrea afetada: Zona Norte de Madri\nVigência: Esta tarde das 14:00 às 21:00 UTC\n\nRajadas de vento de até 60 km/h. Possível queda de galhos e objetos leves. Recomenda-se cautela em estradas expostas e fixar objetos em varandas e terraços.",
    fr: "ALERTE JAUNE — VENT MODÉRÉ\n\nÉmis par : Agence d'État de Météorologie (AEMET)\nDate d'émission : Aujourd'hui, 11:00 UTC\nZone concernée : Zone Nord de Madrid\nValidité : Cet après-midi de 14:00 à 21:00 UTC\n\nRafales de vent jusqu'à 60 km/h. Chute possible de branches et d'objets légers. Prudence recommandée sur les routes exposées ; sécurisez les objets sur terrasses et balcons.",
  },
  "4": {
    es: "ALERTA NARANJA — INUNDACIONES URBANAS\n\nEmitido por: Agencia Estatal de Meteorología (AEMET) y Protección Civil\nFecha de emisión: Hoy, 09:00 UTC\nÁrea afectada: Pasos inferiores y túneles del Sur de Madrid\nVigencia: Desde las 09:00 hasta las 18:00 UTC\n\nAcumulación de agua en pasos inferiores y zonas deprimidas por precipitaciones de 45 mm en 6 horas. No acceder a vehículos atrapados en agua. Evitar circular por zonas inundadas.",
    en: "ORANGE ALERT — URBAN FLOODING\n\nIssued by: AEMET and Civil Protection\nIssued: Today, 09:00 UTC\nAffected area: Underpasses and tunnels in Southern Madrid\nValid: From 09:00 to 18:00 UTC\n\nWater accumulation in underpasses and low-lying areas due to 45mm rainfall in 6 hours. Do not access vehicles trapped in water. Avoid driving through flooded areas.",
    pt: "ALERTA LARANJA — INUNDAÇÕES URBANAS\n\nEmitido por: AEMET e Proteção Civil\nData de emissão: Hoje, 09:00 UTC\nÁrea afetada: Passagens inferiores e túneis do Sul de Madri\nVigência: Das 09:00 às 18:00 UTC\n\nAcúmulo de água em passagens inferiores e zonas rebaixadas por precipitações de 45 mm em 6 horas. Não acesse veículos presos em água. Evite trafegar por zonas inundadas.",
    fr: "ALERTE ORANGE — INONDATIONS URBAINES\n\nÉmis par : AEMET et Protection Civile\nDate d'émission : Aujourd'hui, 09:00 UTC\nZone concernée : Passages souterrains et tunnels du Sud de Madrid\nValidité : De 09:00 à 18:00 UTC\n\nAccumulation d'eau dans les passages inférieurs et zones déprimées suite à 45mm de pluie en 6 heures. Ne pas accéder aux véhicules bloqués dans l'eau. Éviter de circuler dans les zones inondées.",
  },
};

const alertExplanationKeys: Record<string, keyof typeof translations.en> = {
  main: "alertExplainOrangeRain",
  "1": "alertExplainRedRain",
  "2": "alertExplainOrangeHeat",
  "3": "alertExplainYellowWind",
  "4": "alertExplainMLHail",
};

const severityLabel: Record<string, Record<Locale, string>> = {
  red:    { en: "Red Alert", es: "Alerta Roja",    pt: "Alerta Vermelho", fr: "Alerte Rouge"   },
  orange: { en: "Orange Alert", es: "Alerta Naranja", pt: "Alerta Laranja",  fr: "Alerte Orange"  },
  yellow: { en: "Yellow Alert", es: "Alerta Amarilla", pt: "Alerta Amarelo", fr: "Alerte Jaune"  },
};

const localeOrder: Locale[] = ["es", "en", "pt", "fr"];

interface AlertDetailProps {
  alert: Alert;
  onBack: () => void;
  onOpenChat: () => void;
}

const AlertDetail = ({ alert, onBack }: AlertDetailProps) => {
  const { t, locale } = useLanguage();
  const styles = severityStyles[alert.severity];
  const explanationKey = alertExplanationKeys[alert.id] || "alertExplainOrangeRain";

  // Text language: default to app locale, fall back to "es" (original)
  const textsForAlert = alertOfficialTexts[alert.id] ?? alertOfficialTexts["main"];
  const defaultTextLocale: Locale = textsForAlert[locale] ? locale : "es";
  const [textLocale, setTextLocale] = useState<Locale>(defaultTextLocale);
  const officialText = textsForAlert[textLocale] ?? textsForAlert["es"];

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(officialText);
    } catch {
      const el = document.createElement("textarea");
      el.value = officialText;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: alert.title, text: officialText }); } catch { /* cancelled */ }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="px-4 pb-4 animate-in fade-in duration-200">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.backButton}
      </button>

      {/* Alert header */}
      <div className={`rounded-xl ${styles.bg} border ${styles.border} p-4 mb-4`}>
        <div className="flex items-start gap-3">
          <AlertTriangle className={`w-6 h-6 ${styles.icon} mt-0.5 flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${styles.badge}`}>
                {severityLabel[alert.severity]?.[locale] ?? alert.severity}
              </span>
            </div>
            <h2 className={`text-lg font-bold ${styles.title} leading-tight`}>{alert.title}</h2>
            <p className="text-xs text-muted-foreground mt-1">⏱ {alert.time}</p>
          </div>
        </div>
      </div>

      {/* ① Official full text */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card mb-4 overflow-hidden">
        {/* Header row */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className={`w-3.5 h-3.5 ${styles.icon}`} />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t.alertOfficialTextLabel}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
            >
              {copied ? (
                <><Check className="w-3.5 h-3.5 text-primary" /><span className="text-primary">{t.alertOfficialTextCopied}</span></>
              ) : (
                <><Copy className="w-3.5 h-3.5" /><span>{t.alertOfficialTextCopy}</span></>
              )}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
            >
              <Share2 className="w-3.5 h-3.5" /><span>{t.alertOfficialTextShare}</span>
            </button>
          </div>
        </div>

        {/* Language picker */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
          <Languages className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          <span className="text-[11px] text-muted-foreground">{t.alertOfficialTextTranslate}:</span>
          <div className="flex gap-1 flex-wrap">
            {localeOrder.map((loc) => (
              <button
                key={loc}
                onClick={() => setTextLocale(loc)}
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full transition-all ${
                  loc === textLocale
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {localeNames[loc]}
              </button>
            ))}
          </div>
        </div>

        {/* Text body */}
        <div className="px-4 py-3">
          <pre className="text-xs text-foreground font-mono leading-relaxed whitespace-pre-wrap break-words opacity-90">
            {officialText}
          </pre>
        </div>
      </div>

      {/* ② AI Personalized Explanation */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">{t.alertDetailTitle}</h3>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent pointer-events-none select-none">
            {t.aiPowered}
          </span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {t[explanationKey as keyof typeof t] as string}
        </p>
      </div>

      {/* ③ Recommended actions */}
      {alert.actions && alert.actions.length > 0 && (
        <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4 mb-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground mb-3">
            {t.alertRecommendedActions}
          </p>
          <ul className="space-y-2">
            {alert.actions.map((action, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">
                  {i + 1}
                </span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AI chat CTA */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card p-4 text-center">
        <MessageCircle className="w-5 h-5 text-primary mx-auto mb-2" />
        <p className="text-sm text-foreground font-medium mb-1">{t.alertDetailAskTitle}</p>
        <p className="text-xs text-muted-foreground">{t.alertDetailAskDesc}</p>
      </div>
    </div>
  );
};

export default AlertDetail;
