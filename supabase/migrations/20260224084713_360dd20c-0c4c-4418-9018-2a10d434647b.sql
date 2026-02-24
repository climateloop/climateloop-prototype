
-- Create community_reports table
CREATE TABLE public.community_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT,
  notes TEXT,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  photo_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.community_reports ENABLE ROW LEVEL SECURITY;

-- Everyone can read reports
CREATE POLICY "Community reports are publicly readable"
ON public.community_reports
FOR SELECT
USING (true);

-- Authenticated users can insert their own reports
CREATE POLICY "Users can create their own reports"
ON public.community_reports
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own reports
CREATE POLICY "Users can update their own reports"
ON public.community_reports
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own reports
CREATE POLICY "Users can delete their own reports"
ON public.community_reports
FOR DELETE
USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_community_reports_updated_at
BEFORE UPDATE ON public.community_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for report photos
INSERT INTO storage.buckets (id, name, public) VALUES ('report-photos', 'report-photos', true);

-- Public read access for report photos
CREATE POLICY "Report photos are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'report-photos');

-- Authenticated users can upload report photos
CREATE POLICY "Authenticated users can upload report photos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'report-photos' AND auth.role() = 'authenticated');
