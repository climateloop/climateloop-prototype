
-- Add translations column to community_reports
ALTER TABLE public.community_reports 
ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}'::jsonb;

-- Comment for clarity
COMMENT ON COLUMN public.community_reports.translations IS 'Auto-translated title and notes in multiple languages. Structure: { "en": { "title": "...", "notes": "..." }, "pt": {...}, "fr": {...} }';
