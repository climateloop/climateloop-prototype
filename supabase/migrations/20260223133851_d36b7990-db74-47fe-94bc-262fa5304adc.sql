
-- Table for IoT stations
CREATE TABLE public.iot_stations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  station_code TEXT NOT NULL UNIQUE,
  name TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  altitude_m DOUBLE PRECISION,
  is_active BOOLEAN NOT NULL DEFAULT true,
  installed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for IoT readings
CREATE TABLE public.iot_readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  station_id UUID NOT NULL REFERENCES public.iot_stations(id) ON DELETE CASCADE,
  datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  temperature_2m DOUBLE PRECISION,
  temperature_80m DOUBLE PRECISION,
  temperature_180m DOUBLE PRECISION,
  apparent_temperature DOUBLE PRECISION,
  relative_humidity_2m DOUBLE PRECISION,
  dew_point_2m DOUBLE PRECISION,
  precipitation DOUBLE PRECISION,
  rain DOUBLE PRECISION,
  showers DOUBLE PRECISION,
  snowfall DOUBLE PRECISION,
  precipitation_probability DOUBLE PRECISION,
  pressure_msl DOUBLE PRECISION,
  surface_pressure DOUBLE PRECISION,
  wind_speed_10m DOUBLE PRECISION,
  wind_speed_80m DOUBLE PRECISION,
  wind_speed_180m DOUBLE PRECISION,
  wind_direction_10m DOUBLE PRECISION,
  wind_direction_80m DOUBLE PRECISION,
  wind_direction_180m DOUBLE PRECISION,
  wind_gusts_10m DOUBLE PRECISION,
  visibility DOUBLE PRECISION,
  weather_code DOUBLE PRECISION,
  evapotranspiration DOUBLE PRECISION,
  et0_fao_evapotranspiration DOUBLE PRECISION,
  soil_temperature_0cm DOUBLE PRECISION,
  soil_temperature_18cm DOUBLE PRECISION,
  sunshine_duration DOUBLE PRECISION,
  temperature_min DOUBLE PRECISION,
  temperature_max DOUBLE PRECISION,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_iot_readings_station_time ON public.iot_readings(station_id, datetime DESC);
CREATE INDEX idx_iot_readings_datetime ON public.iot_readings(datetime DESC);
CREATE INDEX idx_iot_stations_code ON public.iot_stations(station_code);
CREATE INDEX idx_iot_stations_location ON public.iot_stations(latitude, longitude);

-- RLS
ALTER TABLE public.iot_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iot_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "IoT stations are publicly readable"
  ON public.iot_stations FOR SELECT USING (true);

CREATE POLICY "IoT readings are publicly readable"
  ON public.iot_readings FOR SELECT USING (true);

-- Insert initial stations around Lugo
INSERT INTO public.iot_stations (station_code, name, latitude, longitude, altitude_m) VALUES
  ('ES-LUG-0001', 'Lugo Centro', 43.0096, -7.5560, 465),
  ('ES-LUG-0002', 'Lugo - Parque Rosalía', 43.0120, -7.5610, 458),
  ('ES-LUG-0003', 'Lugo - A Ponte', 43.0050, -7.5480, 470),
  ('ES-LUG-0004', 'Lugo - As Fontiñas', 43.0150, -7.5700, 450),
  ('ES-LUG-0005', 'Lugo - O Ceao', 43.0000, -7.5750, 440);
