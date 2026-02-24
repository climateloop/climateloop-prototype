import { useState } from "react";
import { ArrowLeft, AlertTriangle, Sparkles, MessageCircle, Copy, Share2, Check, Languages } from "lucide-react";
import { useLanguage, type Locale } from "@/i18n/LanguageContext";
import { translations, localeNames } from "@/i18n/translations";
import { type Alert } from "./AlertCard";
import { type CapAlert, capSeverityToColor } from "@/hooks/useCapAlerts";

const severityStyles = {
  yellow: {
    bg: "bg-accent/15",
    bgLight: "bg-accent/5",
    border: "border-accent",
    title: "text-accent",
    icon: "text-accent",
    badge: "bg-accent/20 text-accent",
  },
  orange: {
    bg: "bg-warning/15",
    bgLight: "bg-warning/5",
    border: "border-warning",
    title: "text-warning",
    icon: "text-warning",
    badge: "bg-warning/20 text-warning",
  },
  red: {
    bg: "bg-destructive/15",
    bgLight: "bg-destructive/5",
    border: "border-destructive",
    title: "text-destructive",
    icon: "text-destructive",
    badge: "bg-destructive/20 text-destructive",
  },
};

// Official full-text per alert id, per locale (legacy)
type AlertOfficialTexts = Record<string, Record<Locale, string>>;

const alertOfficialTexts: AlertOfficialTexts = {
  main: {
    es: "ALERTA NARANJA — PRECIPITACIONES INTENSAS\n\nEmitido por: Agencia Estatal de Meteorología (AEMET)\nFecha de emisión: Hoy, 09:30 UTC\nÁrea afectada: Comunidad de Madrid — Zona Centro y Sur\nVigencia: Desde las 10:00 hasta las 22:00 UTC\n\nSe prevén precipitaciones superiores a 50 mm en 12 horas, con posibilidad de chubascos puntualmente intensos superiores a 20 mm en 1 hora. Se pueden producir acumulaciones de agua en calzadas y zonas bajas, con riesgo de desbordamiento de pequeños cauces. Se recomienda extremar la precaución durante los desplazamientos.",
    en: "ORANGE ALERT — HEAVY RAINFALL\n\nIssued by: State Meteorological Agency (AEMET)\nIssued: Today, 09:30 UTC\nAffected area: Community of Madrid — Central and Southern Zone\nValid: From 10:00 to 22:00 UTC\n\nRainfall exceeding 50mm in 12 hours is expected, with locally intense showers above 20mm in 1 hour. Water accumulation may occur on roads and low-lying areas, with risk of small watercourse overflow. Exercise extreme caution when traveling.",
    pt: "ALERTA LARANJA — CHUVAS INTENSAS\n\nEmitido por: Agência Estatal de Meteorologia (AEMET)\nData de emissão: Hoje, 09:30 UTC\nÁrea afetada: Comunidade de Madri — Zona Central e Sul\nVigência: Das 10:00 às 22:00 UTC\n\nEsperam-se precipitações superiores a 50 mm em 12 horas, com possibilidade de chuvas localmente intensas superiores a 20 mm em 1 hora. Podem ocorrer acumulações de água em vias e zonas baixas, com risco de transbordamento de pequenos cursos d'água. Recomenda-se extrema cautela durante os deslocamentos.",
    fr: "ALERTE ORANGE — FORTES PRÉCIPITATIONS\n\nÉmis par : Agence d'État de Météorologie (AEMET)\nDate d'émission : Aujourd'hui, 09:30 UTC\nZone concernée : Communauté de Madrid — Zone Centre et Sud\nValidité : De 10:00 à 22:00 UTC\n\nDes précipitations supérieures à 50 mm en 12 heures sont attendues, avec possibilité d'averses localement intenses supérieures à 20 mm en 1 heure. Des accumulations d'eau peuvent se produire sur les chaussées et zones basses, avec risque de débordement de petits cours d'eau. Il est recommandé d'être extrêmement prudent lors des déplacements.",
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
  alert?: Alert;
  capAlert?: CapAlert;
  onBack: () => void;
  onOpenChat: () => void;
}

const AlertDetail = ({ alert, capAlert, onBack, onOpenChat }: AlertDetailProps) => {
  const { t, locale } = useLanguage();

  // Resolve from CAP or legacy
  const isCapAlert = !!capAlert;
  const severity = isCapAlert ? capSeverityToColor(capAlert!.severity) : alert!.severity;
  const title = isCapAlert ? capAlert!.headline : alert!.title;
  const time = isCapAlert
    ? (capAlert!.onset ? new Date(capAlert!.onset).toLocaleString() : "")
    : alert!.time;
  const description = isCapAlert ? capAlert!.description : alert!.description;
  const actions = isCapAlert
    ? capAlert!.ai_explanation?.recommended_actions
    : alert!.actions;
  const aiSummary = isCapAlert ? capAlert!.ai_explanation?.summary : null;
  const source = isCapAlert ? capAlert!.source : null;
  const affectedPopulation = isCapAlert ? capAlert!.ai_explanation?.affected_population : null;

  const styles = severityStyles[severity];

  // Official text: for CAP alerts, build from description + instruction
  const buildCapOfficialText = () => {
    if (!capAlert) return "";
    const parts: string[] = [];
    const sev = capAlert.parameters?.alertLevel || capAlert.severity;
    parts.push(`${sev.toUpperCase()} — ${capAlert.event.toUpperCase()}`);
    parts.push("");
    if (capAlert.source) parts.push(`Emitido por: ${capAlert.source}`);
    if (capAlert.sent) parts.push(`Fecha de emisión: ${new Date(capAlert.sent).toLocaleString()}`);
    const areaDescs = capAlert.areas?.map(a => a.areaDesc).join("; ");
    if (areaDescs) parts.push(`Área afectada: ${areaDescs}`);
    if (capAlert.onset && capAlert.expires) {
      parts.push(`Vigencia: ${new Date(capAlert.onset).toLocaleString()} — ${new Date(capAlert.expires).toLocaleString()}`);
    }
    parts.push("");
    parts.push(capAlert.description);
    if (capAlert.instruction) {
      parts.push("");
      parts.push(capAlert.instruction);
    }
    return parts.join("\n");
  };

  // For legacy alerts, use stored texts; for CAP, build from data
  const officialTextBase = isCapAlert
    ? buildCapOfficialText()
    : (alertOfficialTexts[alert!.id]?.[locale] ?? alertOfficialTexts["main"]?.[locale] ?? alertOfficialTexts["main"]?.["es"] ?? description);

  const [officialText] = useState(officialTextBase);

  // For legacy alerts: explanation from translations; for CAP: from ai_explanation
  const explanationText = isCapAlert
    ? aiSummary
    : (t[alertExplanationKeys[alert!.id] as keyof typeof t] as string || description);

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
      try { await navigator.share({ title, text: officialText }); } catch { /* cancelled */ }
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
                {severityLabel[severity]?.[locale] ?? severity}
              </span>
            </div>
            <h2 className={`text-lg font-bold ${styles.title} leading-tight`}>{title}</h2>
            {source && <p className="text-[10px] text-muted-foreground mt-0.5">{source}</p>}
            <p className="text-xs text-muted-foreground mt-1">⏱ {time}</p>
          </div>
        </div>
      </div>

      {/* ① AI Personalized Explanation */}
      <div className={`rounded-xl ${styles.bgLight} border ${styles.border} p-4 mb-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">{t.alertDetailTitle}</h3>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent/15 text-accent pointer-events-none select-none">
            {t.aiPowered}
          </span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {explanationText}
        </p>

        {affectedPopulation && (
          <p className="text-xs text-muted-foreground mt-2 italic">
            {affectedPopulation}
          </p>
        )}

        {/* Recommended actions inside AI card */}
        {actions && actions.length > 0 && (
          <div className="mt-4 pt-3 border-t border-current/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground mb-3">
              {t.alertRecommendedActions}
            </p>
            <ul className="space-y-2">
              {actions.map((action, i) => (
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

        {/* Chat button */}
        <div className="mt-4 pt-3 border-t border-current/10">
          <button
            onClick={() => {
              const contextMessage = `[${severityLabel[severity]?.[locale] ?? severity}] ${title}\n\n${officialText}${actions?.length ? `\n\n${t.alertRecommendedActions}:\n${actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}` : ''}`;
              onOpenChat();
              setTimeout(() => {
                const event = new CustomEvent('alert-chat-context', { detail: contextMessage });
                window.dispatchEvent(event);
              }, 100);
            }}
            className="inline-flex items-center gap-2 w-full justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {t.alertDetailChatButton}
          </button>
        </div>
      </div>

      {/* ② Official full text */}
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

        {/* Text body */}
        <div className="px-4 py-3">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words opacity-90">
            {officialText}
          </p>
        </div>
      </div>

    </div>
  );
};

export default AlertDetail;
