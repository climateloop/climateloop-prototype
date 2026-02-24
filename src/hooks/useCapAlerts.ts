import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "@/hooks/useLocationContext";

export interface CapAlert {
  id: string;
  identifier: string;
  sender: string;
  sent: string;
  status: string;
  source: string | null;
  language: string;
  event: string;
  urgency: string;
  severity: string;
  certainty: string;
  headline: string;
  description: string;
  instruction: string | null;
  effective: string | null;
  onset: string | null;
  expires: string | null;
  areas: CapAlertArea[];
  parameters: Record<string, string>;
  ai_explanation: CapAIExplanation | null;
  translations: Record<string, { headline?: string; description?: string; instruction?: string }>;
}

export interface CapAlertArea {
  areaDesc: string;
  polygon: number[][];
  geocodes?: { valueName: string; value: string }[];
}

export interface CapAIExplanation {
  summary: string;
  recommended_actions: string[];
  risk_level: string;
  affected_population?: string;
}

export type AlertTimeCategory = "immediate" | "future" | "past";

/** Check if a point (lat, lng) is inside a bounding box defined by polygon corners */
function isPointInBoundingBox(lat: number, lng: number, polygon: number[][]): boolean {
  if (!polygon || polygon.length < 2) return false;
  const lats = polygon.map((p) => p[0]);
  const lngs = polygon.map((p) => p[1]);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
}

function isAlertRelevantToLocation(alert: CapAlert, lat: number, lng: number): boolean {
  const areas = alert.areas;
  if (!areas || areas.length === 0) return true; // no area restriction = global
  return areas.some((area) => isPointInBoundingBox(lat, lng, area.polygon));
}

export function categorizeAlert(alert: CapAlert): AlertTimeCategory {
  const now = new Date();
  const onset = alert.onset ? new Date(alert.onset) : null;
  const expires = alert.expires ? new Date(alert.expires) : null;

  if (expires && expires < now) return "past";
  if (onset && onset > now) return "future";
  return "immediate";
}

/** Map CAP severity to our color scheme */
export function capSeverityToColor(severity: string): "red" | "orange" | "yellow" {
  switch (severity) {
    case "Extreme":
      return "red";
    case "Severe":
      return "orange";
    case "Moderate":
      return "yellow";
    case "Minor":
      return "yellow";
    default:
      return "yellow";
  }
}

export function useCapAlerts() {
  const { location } = useLocation();

  return useQuery({
    queryKey: ["cap-alerts", location.lat, location.lng],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cap_alerts")
        .select("*")
        .order("onset", { ascending: false });

      if (error) throw error;

      const alerts: CapAlert[] = (data || []).map((row: any) => ({
        ...row,
        areas: row.areas as CapAlertArea[],
        parameters: row.parameters as Record<string, string>,
        ai_explanation: row.ai_explanation as CapAIExplanation | null,
        translations: (row.translations || {}) as Record<string, { headline?: string; description?: string; instruction?: string }>,
      }));

      // Filter by user location
      const relevant = alerts.filter((a) =>
        isAlertRelevantToLocation(a, location.lat, location.lng)
      );

      // Categorize
      const immediate = relevant.filter((a) => categorizeAlert(a) === "immediate");
      const future = relevant.filter((a) => categorizeAlert(a) === "future");
      const past = relevant.filter((a) => categorizeAlert(a) === "past");

      return { all: relevant, immediate, future, past };
    },
  });
}
