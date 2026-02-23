
CREATE TABLE public.ml_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  temperature_2m DOUBLE PRECISION,
  precipitation DOUBLE PRECISION,
  relative_humidity_2m DOUBLE PRECISION,
  wind_speed_10m DOUBLE PRECISION,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Allow public read access (weather data is public)
ALTER TABLE public.ml_predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ML predictions are publicly readable"
  ON public.ml_predictions FOR SELECT
  USING (true);

-- Index for location + time queries
CREATE INDEX idx_ml_predictions_location_time 
  ON public.ml_predictions (latitude, longitude, datetime);
