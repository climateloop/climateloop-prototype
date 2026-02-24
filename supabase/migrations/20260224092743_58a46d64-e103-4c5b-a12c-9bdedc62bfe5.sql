
-- Table for CAP (Common Alerting Protocol) alerts
CREATE TABLE public.cap_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL UNIQUE,
  sender TEXT NOT NULL,
  sent TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'Actual',
  msg_type TEXT NOT NULL DEFAULT 'Alert',
  source TEXT,
  scope TEXT NOT NULL DEFAULT 'Public',

  language TEXT NOT NULL DEFAULT 'es-ES',
  category TEXT NOT NULL DEFAULT 'Met',
  event TEXT NOT NULL,
  urgency TEXT NOT NULL,
  severity TEXT NOT NULL,
  certainty TEXT NOT NULL,

  headline TEXT NOT NULL,
  description TEXT NOT NULL,
  instruction TEXT,

  effective TIMESTAMPTZ,
  onset TIMESTAMPTZ,
  expires TIMESTAMPTZ,

  -- Array of areas with areaDesc, polygon bounding boxes, geocodes
  areas JSONB NOT NULL DEFAULT '[]',
  -- Alert parameters (rainfall, wave height, etc.)
  parameters JSONB DEFAULT '{}',

  -- Pre-generated AI explanation
  ai_explanation JSONB,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cap_alerts ENABLE ROW LEVEL SECURITY;

-- Public read access (government alerts are public)
CREATE POLICY "CAP alerts are publicly readable"
  ON public.cap_alerts FOR SELECT USING (true);

-- Index for time-based queries
CREATE INDEX idx_cap_alerts_onset ON public.cap_alerts (onset DESC);
CREATE INDEX idx_cap_alerts_expires ON public.cap_alerts (expires DESC);

-- Seed realistic mock data

-- 1. Galicia: Heavy rain (Orange, active now)
INSERT INTO public.cap_alerts (identifier, sender, sent, source, event, urgency, severity, certainty, headline, description, instruction, effective, onset, expires, areas, parameters, ai_explanation)
VALUES (
  'AEMET-ES-GAL-20260224-RAIN-001',
  'alertas@aemet.es',
  '2026-02-24T08:00:00+01:00',
  'Agencia Estatal de Meteorología (AEMET)',
  'Precipitaciones intensas y persistentes',
  'Immediate',
  'Severe',
  'Likely',
  'Alerta por lluvias intensas en Galicia y occidente de Asturias',
  'Se prevén precipitaciones acumuladas de hasta 80 mm en 12 horas, localmente superiores en áreas costeras y zonas montañosas. Posibilidad de inundaciones repentinas en áreas urbanas y crecidas rápidas de ríos secundarios.',
  'Evite desplazamientos innecesarios. No cruce zonas inundadas. Manténgase informado a través de canales oficiales. En caso de emergencia, llame al 112.',
  '2026-02-24T09:00:00+01:00',
  '2026-02-24T10:00:00+01:00',
  '2026-02-24T23:59:00+01:00',
  '[{"areaDesc":"Comunidad Autónoma de Galicia (A Coruña, Lugo, Ourense, Pontevedra) y occidente del Principado de Asturias","polygon":[[41.8,-9.3],[41.8,-6.7],[43.8,-6.7],[43.8,-9.3]],"geocodes":[{"valueName":"ISO3166-2","value":"ES-GA"}]}]',
  '{"rainfallAccumulation":"80 mm / 12h","alertLevel":"Nivel Naranja"}',
  '{"summary":"Lluvia intensa prevista para toda Galicia y el oeste de Asturias con acumulados de hasta 80 mm en 12 horas. Las zonas costeras y montañosas pueden recibir cantidades superiores. Riesgo elevado de inundaciones repentinas en áreas urbanas y desbordamientos de ríos menores.","recommended_actions":["Evitar desplazamientos por carretera, especialmente en zonas bajas y cercanas a ríos","Limpiar desagües y canaletas si es posible antes del inicio de la lluvia","Alejar vehículos de zonas susceptibles de inundación","Tener preparado un kit de emergencia con linterna, agua y documentos","Llamar al 112 en caso de emergencia"],"risk_level":"high","affected_population":"Toda la población de Galicia y occidente de Asturias, especialmente residentes en áreas urbanas propensas a inundaciones y cercanías de cauces fluviales"}'
);

-- 2. Galicia/Portugal: Coastal waves (Yellow, future — tomorrow)
INSERT INTO public.cap_alerts (identifier, sender, sent, source, event, urgency, severity, certainty, headline, description, instruction, effective, onset, expires, areas, parameters, ai_explanation)
VALUES (
  'CLIMATELOOP-IBERIA-NW-20260224-COAST-001',
  'alerts@climateloop.org',
  '2026-02-24T08:05:00Z',
  'IPMA / AEMET',
  'Agitação marítima — Noroeste Ibérico',
  'Expected',
  'Moderate',
  'Likely',
  'Aviso por agitación marítima en el litoral de Galicia y norte de Portugal',
  'Se esperan olas de oeste/noroeste de 4 a 4,5 metros afectando el litoral gallego y los distritos de Braga, Viana do Castelo y Porto en Portugal. Riesgo costero aumentado en zonas expuestas.',
  'Aléjese de la línea de costa en zonas expuestas (rompientes, espigones, acantilados). Adie actividades marítimas. En caso de emergencia, llame al 112.',
  '2026-02-25T09:00:00Z',
  '2026-02-25T09:00:00Z',
  '2026-02-25T21:00:00Z',
  '[{"areaDesc":"España — Galicia (litoral: A Coruña y Pontevedra)","polygon":[[41.85,-9.35],[41.85,-8.10],[43.85,-8.10],[43.85,-9.35]],"geocodes":[{"valueName":"ISO3166-2","value":"ES-GA"}]},{"areaDesc":"Portugal Continental — Distritos de Braga, Viana do Castelo e Porto","polygon":[[41.0,-8.95],[41.0,-7.95],[42.15,-7.95],[42.15,-8.95]],"geocodes":[{"valueName":"ISO3166-2","value":"PT-03"},{"valueName":"ISO3166-2","value":"PT-16"},{"valueName":"ISO3166-2","value":"PT-13"}]}]',
  '{"waveHeight":"4.0–4.5 m (W/NW)","warningColour":"Amarillo","crossBorder":"true"}',
  '{"summary":"Oleaje de 4 a 4,5 metros del oeste-noroeste previsto para mañana en todo el litoral gallego y norte de Portugal. Fenómeno transfronterizo que afecta a la fachada atlántica del noroeste ibérico. Riesgo moderado para navegación y actividades costeras.","recommended_actions":["No acercarse a zonas de rompientes, espigones ni acantilados","Aplazar actividades de pesca, deportes náuticos y paseos costeros","Asegurar embarcaciones en los puertos","Prestar atención a las mareas altas, que pueden potenciar el oleaje"],"risk_level":"medium","affected_population":"Residentes y visitantes del litoral de Galicia (especialmente A Coruña y Pontevedra) y del norte de Portugal (Braga, Viana do Castelo, Porto)"}'
);

-- 3. Galicia: Strong winds (Yellow, past — yesterday)
INSERT INTO public.cap_alerts (identifier, sender, sent, source, event, urgency, severity, certainty, headline, description, instruction, effective, onset, expires, areas, parameters, ai_explanation)
VALUES (
  'AEMET-ES-GAL-20260223-WIND-001',
  'alertas@aemet.es',
  '2026-02-23T06:00:00+01:00',
  'Agencia Estatal de Meteorología (AEMET)',
  'Viento fuerte del suroeste',
  'Immediate',
  'Moderate',
  'Observed',
  'Rachas de viento fuerte en Galicia y Cantábrico occidental',
  'Rachas de viento de hasta 90 km/h registradas en zonas altas y litoral de Galicia. Se produjeron caídas puntuales de árboles y mobiliario urbano, especialmente en las provincias de A Coruña y Pontevedra.',
  'Asegure objetos en terrazas y balcones. Extreme la precaución en desplazamientos por carretera. Evite zonas arboladas.',
  '2026-02-23T06:00:00+01:00',
  '2026-02-23T08:00:00+01:00',
  '2026-02-23T20:00:00+01:00',
  '[{"areaDesc":"Galicia (A Coruña, Pontevedra) y Cantábrico occidental","polygon":[[42.0,-9.3],[42.0,-6.5],[43.8,-6.5],[43.8,-9.3]],"geocodes":[{"valueName":"ISO3166-2","value":"ES-GA"}]}]',
  '{"windGusts":"90 km/h","alertLevel":"Nivel Amarillo"}',
  '{"summary":"Episodio de viento fuerte del suroeste que afectó a Galicia ayer, con rachas de hasta 90 km/h en zonas expuestas. Se registraron incidencias menores como caída de árboles y mobiliario urbano. El episodio ya ha finalizado.","recommended_actions":["Revisar posibles daños en tejados, antenas y estructuras exteriores","Reportar árboles caídos o daños al 012 o al ayuntamiento","Mantenerse alerta ante posibles ramas sueltas en zonas arboladas"],"risk_level":"low","affected_population":"Provincias costeras de Galicia y franja del Cantábrico occidental"}'
);

-- 4. Madrid: Thunderstorms (Yellow, active now)
INSERT INTO public.cap_alerts (identifier, sender, sent, source, event, urgency, severity, certainty, headline, description, instruction, effective, onset, expires, areas, parameters, ai_explanation)
VALUES (
  'AEMET-ES-MAD-20260224-TORM-001',
  'alertas@aemet.es',
  '2026-02-24T10:00:00+01:00',
  'Agencia Estatal de Meteorología (AEMET)',
  'Tormentas con posible granizo',
  'Immediate',
  'Moderate',
  'Likely',
  'Tormentas localmente fuertes en la Comunidad de Madrid y áreas limítrofes',
  'Se prevén tormentas acompañadas de granizo pequeño y rachas de viento de hasta 70 km/h durante la tarde. Posibles acumulaciones de 20-30 mm en una hora en puntos de la sierra y zona sur metropolitana. Riesgo de inundaciones puntuales en pasos subterráneos.',
  'Evite actividades al aire libre durante las tormentas. No se refugie bajo árboles aislados. Extreme la precaución si conduce. En caso de granizo, proteja su vehículo.',
  '2026-02-24T13:00:00+01:00',
  '2026-02-24T14:00:00+01:00',
  '2026-02-24T22:00:00+01:00',
  '[{"areaDesc":"Comunidad de Madrid, sur de Guadalajara y norte de Toledo","polygon":[[39.8,-4.3],[39.8,-3.0],[41.0,-3.0],[41.0,-4.3]],"geocodes":[{"valueName":"ISO3166-2","value":"ES-MD"},{"valueName":"ISO3166-2","value":"ES-GU"},{"valueName":"ISO3166-2","value":"ES-TO"}]}]',
  '{"rainfallIntensity":"20–30 mm/h","hailSize":"pequeño","windGusts":"70 km/h","alertLevel":"Nivel Amarillo"}',
  '{"summary":"Tormentas de desarrollo vespertino previstas para la Comunidad de Madrid y provincias limítrofes (sur de Guadalajara, norte de Toledo). Pueden ir acompañadas de granizo pequeño y rachas de viento. Acumulaciones localmente intensas que podrían causar encharcamientos en zonas urbanas.","recommended_actions":["Evitar actividades al aire libre entre las 14:00 y las 22:00","No refugiarse bajo árboles aislados ni estructuras metálicas","Aparcar el vehículo bajo cubierto si es posible para protegerlo del granizo","Precaución en pasos subterráneos y zonas bajas susceptibles de encharcamiento","Desconectar aparatos eléctricos durante la tormenta"],"risk_level":"medium","affected_population":"Residentes de la Comunidad de Madrid, especialmente zona sur metropolitana y sierra, así como áreas limítrofes de Guadalajara y Toledo"}'
);

-- 5. Madrid: Extreme heat forecast (Orange, future — in 2 days)
INSERT INTO public.cap_alerts (identifier, sender, sent, source, event, urgency, severity, certainty, headline, description, instruction, effective, onset, expires, areas, parameters, ai_explanation)
VALUES (
  'AEMET-ES-MAD-20260224-HEAT-001',
  'alertas@aemet.es',
  '2026-02-24T07:00:00+01:00',
  'Agencia Estatal de Meteorología (AEMET)',
  'Temperaturas máximas significativamente altas',
  'Future',
  'Severe',
  'Likely',
  'Ola de calor prevista en el centro y sur peninsular',
  'Se espera un episodio de temperaturas excepcionalmente altas para la época del año, con máximas que podrían alcanzar los 28-30 °C en el valle del Tajo y zonas del sur de Madrid. Noches tropicales con mínimas por encima de 18 °C en áreas urbanas. Situación inusual para finales de febrero, posiblemente vinculada a una masa de aire cálido sahariano.',
  'Hidrátese con frecuencia. Evite la exposición solar en las horas centrales del día (12-17h). Preste especial atención a personas mayores y niños pequeños. Ventile las viviendas durante la noche.',
  '2026-02-26T08:00:00+01:00',
  '2026-02-26T10:00:00+01:00',
  '2026-02-27T22:00:00+01:00',
  '[{"areaDesc":"Comunidad de Madrid, Toledo, Ciudad Real y norte de Andalucía","polygon":[[38.0,-5.5],[38.0,-2.5],[41.0,-2.5],[41.0,-5.5]],"geocodes":[{"valueName":"ISO3166-2","value":"ES-MD"},{"valueName":"ISO3166-2","value":"ES-TO"},{"valueName":"ISO3166-2","value":"ES-CR"}]}]',
  '{"maxTemperature":"28–30 °C","minTemperature":"18 °C (noches)","alertLevel":"Nivel Naranja","anomaly":"+10 °C sobre la media climática"}',
  '{"summary":"Episodio de calor anómalo previsto para el 26 y 27 de febrero, con temperaturas hasta 10 °C por encima de la media climática. Máximas de 28-30 °C en el centro-sur peninsular y noches tropicales en áreas urbanas de Madrid. Fenómeno asociado a una advección de aire cálido sahariano, inusual para esta época del año.","recommended_actions":["Hidratarse con frecuencia, especialmente personas mayores y niños","Evitar ejercicio físico intenso al aire libre entre las 12:00 y las 17:00","Ventilar las viviendas por la noche y mantener persianas bajadas durante el día","Vigilar a personas vulnerables (mayores que viven solos, enfermos crónicos)","Proteger mascotas y animales del calor extremo"],"risk_level":"high","affected_population":"Población del centro y sur peninsular, especialmente personas mayores, niños, trabajadores al aire libre y personas con enfermedades crónicas"}'
);

-- 6. Galicia: Dense fog (Yellow, active now)
INSERT INTO public.cap_alerts (identifier, sender, sent, source, event, urgency, severity, certainty, headline, description, instruction, effective, onset, expires, areas, parameters, ai_explanation)
VALUES (
  'AEMET-ES-GAL-20260224-FOG-001',
  'alertas@aemet.es',
  '2026-02-24T05:30:00+01:00',
  'Agencia Estatal de Meteorología (AEMET)',
  'Nieblas densas y persistentes',
  'Immediate',
  'Minor',
  'Observed',
  'Bancos de niebla densa en el interior de Lugo y Ourense',
  'Se observan bancos de niebla densa con visibilidad inferior a 200 metros en los valles interiores de las provincias de Lugo y Ourense, especialmente en la Tierra Llana lucense y en la ribera del Miño. Posible formación de escarcha en superficies.',
  'Extreme la precaución al volante: reduzca la velocidad, encienda las luces antiniebla y aumente la distancia de seguridad. Tenga cuidado con posibles placas de hielo en la calzada.',
  '2026-02-24T05:30:00+01:00',
  '2026-02-24T05:30:00+01:00',
  '2026-02-24T12:00:00+01:00',
  '[{"areaDesc":"Interior de Lugo (Tierra Llana) y Ourense (Ribera del Miño)","polygon":[[42.2,-8.2],[42.2,-7.0],[43.2,-7.0],[43.2,-8.2]],"geocodes":[{"valueName":"ISO3166-2","value":"ES-LU"},{"valueName":"ISO3166-2","value":"ES-OU"}]}]',
  '{"visibility":"< 200 m","alertLevel":"Nivel Amarillo","frostRisk":"Escarcha en superficies"}',
  '{"summary":"Bancos de niebla densa en los valles interiores de Lugo y Ourense, con visibilidad inferior a 200 metros. Fenómeno habitual en invierno en estas zonas, pero con intensidad notable esta mañana. Posible formación de escarcha que puede hacer las carreteras resbaladizas.","recommended_actions":["Reducir velocidad y usar luces antiniebla si conduce","Aumentar significativamente la distancia de seguridad","Tener precaución con posibles placas de hielo en tramos de sombra","Esperar a la disipación de la niebla si el trayecto no es urgente"],"risk_level":"low","affected_population":"Conductores y trabajadores al aire libre en el interior de Lugo y Ourense"}'
);
