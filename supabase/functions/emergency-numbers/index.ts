import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Emergency numbers database by ISO-3166 country code
const emergencyNumbersByCountry: Record<
  string,
  { labelKey: string; number: string; secondary?: string }[]
> = {
  ES: [
    { labelKey: "emergencyPolice", number: "112", secondary: "091" },
    { labelKey: "emergencyFire", number: "112", secondary: "080" },
    { labelKey: "emergencyMedical", number: "112", secondary: "061" },
    { labelKey: "emergencyCivilDefense", number: "112" },
    { labelKey: "emergencyRedCross", number: "900 22 22 92" },
  ],
  BR: [
    { labelKey: "emergencyPolice", number: "190" },
    { labelKey: "emergencyFire", number: "193" },
    { labelKey: "emergencyMedical", number: "192" },
    { labelKey: "emergencyCivilDefense", number: "199" },
    { labelKey: "emergencyRedCross", number: "0800 707 0192" },
  ],
  PT: [
    { labelKey: "emergencyPolice", number: "112", secondary: "217 654 242" },
    { labelKey: "emergencyFire", number: "112" },
    { labelKey: "emergencyMedical", number: "112", secondary: "808 24 24 24" },
    { labelKey: "emergencyCivilDefense", number: "112" },
    { labelKey: "emergencyRedCross", number: "213 913 900" },
  ],
  FR: [
    { labelKey: "emergencyPolice", number: "17", secondary: "112" },
    { labelKey: "emergencyFire", number: "18", secondary: "112" },
    { labelKey: "emergencyMedical", number: "15", secondary: "112" },
    { labelKey: "emergencyCivilDefense", number: "112" },
    { labelKey: "emergencyRedCross", number: "01 44 14 14 14" },
  ],
  US: [
    { labelKey: "emergencyPolice", number: "911" },
    { labelKey: "emergencyFire", number: "911" },
    { labelKey: "emergencyMedical", number: "911" },
    { labelKey: "emergencyCivilDefense", number: "911" },
    { labelKey: "emergencyRedCross", number: "1-800-733-2767" },
  ],
  GB: [
    { labelKey: "emergencyPolice", number: "999", secondary: "112" },
    { labelKey: "emergencyFire", number: "999", secondary: "112" },
    { labelKey: "emergencyMedical", number: "999", secondary: "112" },
    { labelKey: "emergencyCivilDefense", number: "999" },
    { labelKey: "emergencyRedCross", number: "0344 871 11 11" },
  ],
  DE: [
    { labelKey: "emergencyPolice", number: "110", secondary: "112" },
    { labelKey: "emergencyFire", number: "112" },
    { labelKey: "emergencyMedical", number: "112" },
    { labelKey: "emergencyCivilDefense", number: "112" },
    { labelKey: "emergencyRedCross", number: "030 85 40 40" },
  ],
  IT: [
    { labelKey: "emergencyPolice", number: "112", secondary: "113" },
    { labelKey: "emergencyFire", number: "115", secondary: "112" },
    { labelKey: "emergencyMedical", number: "118", secondary: "112" },
    { labelKey: "emergencyCivilDefense", number: "112" },
    { labelKey: "emergencyRedCross", number: "06 5510" },
  ],
  AR: [
    { labelKey: "emergencyPolice", number: "101", secondary: "911" },
    { labelKey: "emergencyFire", number: "100" },
    { labelKey: "emergencyMedical", number: "107" },
    { labelKey: "emergencyCivilDefense", number: "103" },
    { labelKey: "emergencyRedCross", number: "0800 222 0101" },
  ],
  MX: [
    { labelKey: "emergencyPolice", number: "911" },
    { labelKey: "emergencyFire", number: "911" },
    { labelKey: "emergencyMedical", number: "911" },
    { labelKey: "emergencyCivilDefense", number: "911" },
    { labelKey: "emergencyRedCross", number: "065" },
  ],
  SN: [
    { labelKey: "emergencyPolice", number: "17" },
    { labelKey: "emergencyFire", number: "18" },
    { labelKey: "emergencyMedical", number: "15", secondary: "33 824 24 18" },
    { labelKey: "emergencyCivilDefense", number: "18" },
    { labelKey: "emergencyRedCross", number: "33 823 39 31" },
  ],
};

// Default (international)
const defaultNumbers = [
  { labelKey: "emergencyPolice", number: "112" },
  { labelKey: "emergencyFire", number: "112" },
  { labelKey: "emergencyMedical", number: "112" },
  { labelKey: "emergencyCivilDefense", number: "112" },
];

// Reverse geocode lat/lng to country code using Nominatim
async function getCountryCode(lat: number, lng: number): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=3&addressdetails=1`;
    const res = await fetch(url, {
      headers: { "User-Agent": "ClimateLoop/1.0" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.address?.country_code?.toUpperCase() ?? null;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lat, lng } = await req.json();

    if (typeof lat !== "number" || typeof lng !== "number") {
      return new Response(
        JSON.stringify({ error: "lat and lng are required numbers" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const countryCode = await getCountryCode(lat, lng);
    const numbers = emergencyNumbersByCountry[countryCode ?? ""] ?? defaultNumbers;

    return new Response(
      JSON.stringify({ country_code: countryCode, numbers }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
