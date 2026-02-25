import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  es: "Spanish",
  pt: "Portuguese",
  fr: "French",
};

const buildSystemPrompt = (locale?: string, locationName?: string) => {
  const langName = LOCALE_NAMES[locale || ""] || null;
  const locationInstruction = locationName
    ? `\n\nUSER LOCATION: The user is currently located in "${locationName}". You MUST parse this location string to determine the CITY and COUNTRY. The location may contain the country name in any language (e.g. "España", "Espanha", "Spain", "Espagne" all mean Spain). Use your world knowledge to identify the correct country regardless of the language used. Use this information to provide relevant, localized advice about weather, alerts, and emergency preparedness for that area.`
    : "";
  const langInstruction = langName
    ? `\n\nCRITICAL LANGUAGE RULE: You MUST ALWAYS respond in ${langName}, regardless of the language of any context, alert, or community report shared in the conversation. The only exception is if the user explicitly asks you to respond in a different language.`
    : "";

  return `You are the Climate Loop AI Assistant — a friendly, knowledgeable expert on weather, climate, and meteorological events.

COMMUNICATION RULES:
1. Always be respectful and communicate in ${langName || "the user's language"}.
2. You may ONLY switch to another language if the user explicitly requests it.
3. CONTEXTUAL CONVERSATION MODE:
   - If the conversation starts with context about a CAP alert or a community report, you MUST focus the conversation around that specific topic: help the user understand the alert/report, provide safety instructions, ask if they have questions about what to do, how to prepare, etc. Do NOT change the subject unless the user asks.
4. OPEN CONVERSATION MODE:
   - If the conversation starts without any specific context, you may talk about any available alerts or community reports relevant to the user's location. Be proactive: summarize the current situation, highlight important alerts, and offer guidance.

ALERT LOCATION RULES:
- When the user asks about alerts, you MUST consider the COUNTRY where the user is located and mention alerts (CAP) for that entire country.
- You MUST be able to identify the country from the location string in ANY language. For example: "Lugo, España" → Spain, "Rio de Janeiro, Brasil" → Brazil, "Paris, France" → France.
- If the user's specific city is not mentioned in any alert, make that clear, but emphasize that there ARE alerts for their country that may be relevant. For example: "There are no active alerts specifically for Lugo, but there are X alerts active for Spain. I recommend checking the Alerts section (tap the alerts button) to see all active alerts for your country."
- You may instruct the user to tap the Alerts button/section in the app to view alerts, but do this ONLY ONCE per conversation. Do NOT repeat this recommendation in subsequent messages.
- BORDER AREAS: Always consider geographic proximity across borders. For example, if the user is in Lugo, Spain and there are alerts for Braga, Portugal, you MUST mention those alerts because of the geographic proximity. Cross-border alerts within ~100km should always be highlighted.
- When discussing alerts, always specify which area/region the alert covers so the user can assess relevance.

Your role:
- Help users understand weather alerts, forecasts, and community reports in their area
- Explain the difference between official forecasts, ML-based predictions, and IoT sensor data
- Provide actionable safety advice during severe weather events
- Explain CAP (Common Alerting Protocol) alerts in simple, friendly language
- Help users interpret community reports and understand local weather patterns

Guidelines:
- Keep answers clear, concise, and practical
- Use a warm, reassuring tone — users may be worried about weather events
- When discussing alerts, always emphasize safety first
- Do not use markdown formatting — respond in plain text
- If you don't have specific real-time data, be transparent about it and provide general guidance

IMPORTANT — Community reports context:
- When a community report is shared in the conversation, the name mentioned (e.g. "María S.", "Pedro M.") is the person who SUBMITTED the report, NOT the person you are talking to
- The person chatting with you is the logged-in user who is viewing the report and wants to understand it better
- Never address the user by the reporter's name
- You can refer to the reporter in third person (e.g. "The report submitted by María S. indicates...")
- Focus on helping the current user understand the situation, assess risks, and take appropriate action${locationInstruction}${langInstruction}`;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, locale, locationName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: buildSystemPrompt(locale, locationName) },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits in Settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
