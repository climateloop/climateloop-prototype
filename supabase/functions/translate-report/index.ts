import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { report_id } = await req.json();
    if (!report_id) {
      return new Response(JSON.stringify({ error: "report_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the report
    const { data: report, error: fetchError } = await supabase
      .from("community_reports")
      .select("title, notes")
      .eq("id", report_id)
      .single();

    if (fetchError || !report) {
      return new Response(JSON.stringify({ error: "Report not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const textToTranslate = `Title: ${report.title}${report.notes ? `\nNotes: ${report.notes}` : ""}`;

    const prompt = `Translate the following community weather report to English (en), Portuguese (pt), and French (fr). The original is in Spanish.

${textToTranslate}

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks):
{
  "en": { "title": "...", "notes": "..." },
  "pt": { "title": "...", "notes": "..." },
  "fr": { "title": "...", "notes": "..." }
}

If notes is empty, set it to null. Keep translations natural and concise.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: "You are a precise translator. Return only valid JSON, no markdown." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      return new Response(JSON.stringify({ error: "Translation failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    let translationText = aiData.choices?.[0]?.message?.content || "";

    // Strip markdown code blocks if present
    translationText = translationText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();

    let translations: Record<string, { title: string; notes: string | null }>;
    try {
      translations = JSON.parse(translationText);
    } catch {
      console.error("Failed to parse AI response:", translationText);
      return new Response(JSON.stringify({ error: "Invalid translation format" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Also add the original Spanish
    translations["es"] = { title: report.title, notes: report.notes };

    // Save translations to DB
    const { error: updateError } = await supabase
      .from("community_reports")
      .update({ translations })
      .eq("id", report_id);

    if (updateError) {
      console.error("DB update error:", updateError);
      return new Response(JSON.stringify({ error: "Failed to save translations" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, translations }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("translate-report error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
