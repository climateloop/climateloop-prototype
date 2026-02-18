import { useState } from "react";
import { ArrowLeft, AlertTriangle, Sparkles, MessageCircle, Copy, Share2, Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
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

// Official full-text of each alert (as if issued by a meteorological agency)
const alertOfficialText: Record<string, string> = {
  main: "ALERTA NARANJA — PRECIPITACIONES INTENSAS\n\nEmitido por: Agencia Estatal de Meteorología (AEMET)\nFecha de emisión: Hoy, 09:30 UTC\nÁrea afectada: Comunidad de Madrid — Zona Centro y Sur\nVigencia: Desde las 10:00 hasta las 22:00 UTC\n\nSe prevén precipitaciones superiores a 50 mm en 12 horas, con posibilidad de chubascos puntualmente intensos superiores a 20 mm en 1 hora. Se pueden producir acumulaciones de agua en calzadas y zonas bajas, con riesgo de desbordamiento de pequeños cauces. Se recomienda extremar la precaución durante los desplazamientos.",
  "1": "ALERTA ROJA — LLUVIAS MUY INTENSAS\n\nEmitido por: Agencia Estatal de Meteorología (AEMET)\nFecha de emisión: Hoy, 08:00 UTC\nÁrea afectada: Gran Vía y Zona Centro de Madrid\nVigencia: Desde las 08:00 hasta las 20:00 UTC\n\nSe prevén precipitaciones superiores a 80 mm/h. Riesgo muy alto de inundaciones repentinas, arrastre de objetos y corte de vías de comunicación. Se activa el nivel 3 del Plan de Emergencias. Las autoridades pueden ordenar evacuaciones preventivas en zonas de riesgo. Evitar salir al exterior si no es estrictamente necesario.",
  "2": "ALERTA NARANJA — CALOR EXTREMO\n\nEmitido por: Agencia Estatal de Meteorología (AEMET)\nFecha de emisión: Hoy, 07:00 UTC\nÁrea afectada: Zona Este de Madrid (Vallecas, Moratalaz, Vicálvaro)\nVigencia: Mañana de 10:00 a 22:00 UTC\n\nSe esperan temperaturas máximas de 38–40 °C con sensación térmica superior a 42 °C. Riesgo significativo para población vulnerable: personas mayores, menores de 5 años, enfermos crónicos y personas que trabajan al exterior. Se recomienda mantener espacios interiores frescos, hidratarse continuamente y evitar exposición solar en horas centrales.",
  "3": "ALERTA AMARILLA — VIENTO MODERADO\n\nEmitido por: Agencia Estatal de Meteorología (AEMET)\nFecha de emisión: Hoy, 11:00 UTC\nÁrea afectada: Zona Norte de Madrid (Fuencarral, Hortaleza, San Sebastián de los Reyes)\nVigencia: Esta tarde de 14:00 a 21:00 UTC\n\nRachas de viento de hasta 60 km/h. Posible caída de ramas y objetos ligeros en zonas de arbolado. Se recomienda precaución en carreteras expuestas y asegurar elementos en terrazas y balcones.",
  "4": "ALERTA NARANJA — INUNDACIONES URBANAS\n\nEmitido por: Agencia Estatal de Meteorología (AEMET) y Protección Civil\nFecha de emisión: Hoy, 09:00 UTC\nÁrea afectada: Pasos inferiores y túneles del Sur de Madrid\nVigencia: Desde las 09:00 hasta las 18:00 UTC\n\nAcumulación de agua en pasos inferiores y zonas deprimidas por precipitaciones de 45 mm en 6 horas. No acceder a vehículos atrapados en agua. Evitar circular por zonas inundadas. Contactar con emergencias (112) ante situaciones de riesgo.",
};

// Personalized AI explanations per alert
const alertExplanationKeys: Record<string, keyof typeof import("@/i18n/translations").translations.en> = {
  main: "alertExplainOrangeRain",
  "1": "alertExplainRedRain",
  "2": "alertExplainOrangeHeat",
  "3": "alertExplainYellowWind",
  "4": "alertExplainMLHail",
};

const severityLabel: Record<string, string> = {
  red: "Alerta Roja",
  orange: "Alerta Naranja",
  yellow: "Alerta Amarilla",
};

interface AlertDetailProps {
  alert: Alert;
  onBack: () => void;
  onOpenChat: () => void;
}

const AlertDetail = ({ alert, onBack }: AlertDetailProps) => {
  const { t } = useLanguage();
  const styles = severityStyles[alert.severity];
  const explanationKey = alertExplanationKeys[alert.id] || "alertExplainOrangeRain";
  const officialText = alertOfficialText[alert.id] || alertOfficialText["main"];

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(officialText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers that don't support clipboard API
      const el = document.createElement("textarea");
      el.value = officialText;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: alert.title,
      text: officialText,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled, no-op
      }
    } else {
      // Fallback: copy to clipboard
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
                {severityLabel[alert.severity] ?? alert.severity}
              </span>
            </div>
            <h2 className={`text-lg font-bold ${styles.title} leading-tight`}>{alert.title}</h2>
            <p className="text-xs text-muted-foreground mt-1">⏱ {alert.time}</p>
          </div>
        </div>
      </div>

      {/* ① Official full text */}
      <div className="bg-surface-elevated rounded-xl border border-border shadow-card mb-4 overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-3.5 h-3.5 ${styles.icon}`} />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Texto oficial do alerta</h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
              title="Copiar texto"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-primary" />
                  <span className="text-primary">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
              title="Compartilhar"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
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
