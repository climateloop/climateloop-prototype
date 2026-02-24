# ClimateLoop — Backend API Documentation

> **Base URL**: `https://<SUPABASE_PROJECT_REF>.supabase.co`  
> All Edge Function endpoints are under `/functions/v1/<function-name>`  
> Database tables are accessed via PostgREST at `/rest/v1/<table>`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Edge Functions](#edge-functions)
   - [weather](#1-weather)
   - [chat](#2-chat)
   - [validate-photo](#3-validate-photo)
   - [translate-report](#4-translate-report)
3. [Database Tables & RLS](#database-tables--rls)
   - [cap_alerts](#cap_alerts)
   - [community_reports](#community_reports)
   - [iot_stations](#iot_stations)
   - [iot_readings](#iot_readings)
   - [ml_predictions](#ml_predictions)
4. [Storage Buckets](#storage-buckets)
5. [Environment Variables / Secrets](#environment-variables--secrets)

---

## Authentication

The project uses **Supabase Auth** (email + password). All requests to protected endpoints must include:

```
Authorization: Bearer <user_jwt>
apikey: <SUPABASE_ANON_KEY>
```

Public read access is available for most tables (see RLS policies below).

---

## Edge Functions

All Edge Functions accept `POST` requests with `Content-Type: application/json` and support CORS preflight (`OPTIONS`).

### Common Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | `Bearer <SUPABASE_ANON_KEY>` or user JWT |
| `Content-Type` | Yes | `application/json` |

---

### 1. `weather`

Proxies the OpenWeatherMap Current Weather API, returning a simplified payload.

**Endpoint**: `POST /functions/v1/weather`

#### Request Body

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `lat` | `number` | ✅ | — | Latitude |
| `lon` | `number` | ✅ | — | Longitude |
| `units` | `string` | ❌ | `"metric"` | Unit system (`metric`, `imperial`, `standard`) |
| `lang` | `string` | ❌ | `"pt"` | Language code for descriptions |

#### Response `200`

```json
{
  "temp": 22,
  "feels_like": 20,
  "humidity": 65,
  "wind_speed": 3.5,
  "description": "céu limpo",
  "icon": "01d",
  "rain_1h": 0,
  "clouds": 10,
  "city": "Lugo"
}
```

#### Errors

| Status | Body |
|--------|------|
| `400` | `{"error": "lat and lon are required"}` |
| `4xx/5xx` | `{"error": "OpenWeather API error [status]"}` |
| `500` | `{"error": "<message>"}` |

#### Secrets Used

- `OPENWEATHER_API_KEY`

---

### 2. `chat`

AI-powered weather assistant with streaming responses. Uses the Lovable AI Gateway.

**Endpoint**: `POST /functions/v1/chat`

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `messages` | `Array<{role, content}>` | ✅ | Chat history in OpenAI message format |
| `locale` | `string` | ❌ | Language code (`en`, `es`, `pt`, `fr`) to force response language |

#### Response `200` — `text/event-stream`

Server-Sent Events (SSE) stream in OpenAI-compatible format. Each chunk:

```
data: {"choices":[{"delta":{"content":"..."}}]}
```

#### Errors

| Status | Body |
|--------|------|
| `402` | `{"error": "AI credits exhausted. Please add credits in Settings."}` |
| `429` | `{"error": "Rate limit exceeded. Please try again in a moment."}` |
| `500` | `{"error": "AI service temporarily unavailable."}` |

#### Secrets Used

- `LOVABLE_API_KEY`

#### System Prompt Behavior

- Responds in the language specified by `locale`
- Specializes in weather, climate, and meteorological advice
- Understands CAP alerts and community reports context
- Plain text output (no markdown)

---

### 3. `validate-photo`

Analyzes an uploaded photo using AI vision to detect if it contains people (privacy check).

**Endpoint**: `POST /functions/v1/validate-photo`

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `imageBase64` | `string` | ✅ | Base64-encoded image data |
| `mimeType` | `string` | ❌ | MIME type (default: `image/jpeg`) |

#### Response `200`

```json
{
  "hasPeople": false
}
```

#### Fail-Open Policy

On AI gateway errors, the function returns `{"hasPeople": false}` to avoid blocking user uploads.

#### Secrets Used

- `LOVABLE_API_KEY`

---

### 4. `translate-report`

Translates a community report's title and notes into all 4 supported languages using AI, then saves translations back to the database.

**Endpoint**: `POST /functions/v1/translate-report`

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `report_id` | `string (UUID)` | ✅ | ID of the community report to translate |

#### Response `200`

```json
{
  "success": true,
  "translations": {
    "en": { "title": "Flooding on Main St", "notes": "Water level rising" },
    "es": { "title": "Inundación en la calle principal", "notes": "El nivel del agua sube" },
    "pt": { "title": "Enchente na rua principal", "notes": "Nível da água subindo" },
    "fr": { "title": "Inondation rue principale", "notes": "Le niveau d'eau monte" }
  }
}
```

#### Errors

| Status | Body |
|--------|------|
| `400` | `{"error": "report_id required"}` |
| `404` | `{"error": "Report not found"}` |
| `500` | `{"error": "Translation failed"}` or `{"error": "Invalid translation format"}` |

#### Secrets Used

- `LOVABLE_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## Database Tables & RLS

All tables are in the `public` schema. Row-Level Security (RLS) is **enabled** on all tables.

---

### `cap_alerts`

Official CAP (Common Alerting Protocol) weather alerts.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | No | `gen_random_uuid()` | Primary key |
| `identifier` | `text` | No | — | CAP alert identifier |
| `sender` | `text` | No | — | Issuing authority |
| `sent` | `timestamptz` | No | — | When the alert was issued |
| `status` | `text` | No | `'Actual'` | Alert status |
| `msg_type` | `text` | No | `'Alert'` | Message type |
| `scope` | `text` | No | `'Public'` | Scope of distribution |
| `category` | `text` | No | `'Met'` | Alert category |
| `event` | `text` | No | — | Event type (e.g., "Thunderstorm") |
| `severity` | `text` | No | — | `Minor`, `Moderate`, `Severe`, `Extreme` |
| `urgency` | `text` | No | — | Urgency level |
| `certainty` | `text` | No | — | Certainty level |
| `headline` | `text` | No | — | Short headline |
| `description` | `text` | No | — | Full description |
| `instruction` | `text` | Yes | — | Recommended actions |
| `language` | `text` | No | `'es-ES'` | Original language |
| `effective` | `timestamptz` | Yes | — | Effective from |
| `onset` | `timestamptz` | Yes | — | Expected onset |
| `expires` | `timestamptz` | Yes | — | Expiration time |
| `areas` | `jsonb` | No | `'[]'` | Affected geographic areas |
| `parameters` | `jsonb` | Yes | `'{}'` | Additional parameters |
| `source` | `text` | Yes | — | Data source |
| `ai_explanation` | `jsonb` | Yes | — | AI-generated plain-language explanation |
| `translations` | `jsonb` | Yes | `'{}'` | Multi-language translations |
| `created_at` | `timestamptz` | No | `now()` | Record creation time |

**RLS Policies**:
- ✅ `SELECT` — Public (everyone)
- ❌ `INSERT` / `UPDATE` / `DELETE` — Not allowed via client

---

### `community_reports`

User-submitted weather incident reports.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | No | `gen_random_uuid()` | Primary key |
| `user_id` | `uuid` | No | — | Author (auth.users reference) |
| `title` | `text` | No | — | Report title |
| `category` | `text` | No | — | Main category |
| `sub_category` | `text` | Yes | — | Sub-category |
| `notes` | `text` | Yes | — | Additional notes |
| `address` | `text` | No | — | Location address |
| `latitude` | `float8` | Yes | — | Latitude |
| `longitude` | `float8` | Yes | — | Longitude |
| `photo_url` | `text` | Yes | — | URL to uploaded photo |
| `status` | `text` | No | `'pending'` | Report status |
| `translations` | `jsonb` | Yes | `'{}'` | AI-generated translations |
| `created_at` | `timestamptz` | No | `now()` | Creation time |
| `updated_at` | `timestamptz` | No | `now()` | Last update time |

**RLS Policies**:
- ✅ `SELECT` — Public (everyone)
- ✅ `INSERT` — Own records only (`auth.uid() = user_id`)
- ✅ `UPDATE` — Own records only (`auth.uid() = user_id`)
- ✅ `DELETE` — Own records only (`auth.uid() = user_id`)

---

### `iot_stations`

Registered IoT weather stations.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | No | `gen_random_uuid()` | Primary key |
| `station_code` | `text` | No | — | Unique station identifier |
| `name` | `text` | Yes | — | Human-readable name |
| `latitude` | `float8` | No | — | Station latitude |
| `longitude` | `float8` | No | — | Station longitude |
| `altitude_m` | `float8` | Yes | — | Altitude in meters |
| `is_active` | `boolean` | No | `true` | Active status |
| `installed_at` | `timestamptz` | No | `now()` | Installation date |
| `created_at` | `timestamptz` | No | `now()` | Record creation time |

**RLS Policies**:
- ✅ `SELECT` — Public (everyone)
- ❌ `INSERT` / `UPDATE` / `DELETE` — Not allowed via client

---

### `iot_readings`

Sensor readings from IoT weather stations.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | No | `gen_random_uuid()` | Primary key |
| `station_id` | `uuid` | No | — | FK → `iot_stations.id` |
| `datetime` | `timestamptz` | No | — | Reading timestamp |
| `temperature_2m` | `float8` | Yes | — | Temperature at 2m (°C) |
| `temperature_80m` | `float8` | Yes | — | Temperature at 80m (°C) |
| `temperature_180m` | `float8` | Yes | — | Temperature at 180m (°C) |
| `temperature_min` | `float8` | Yes | — | Daily minimum temperature |
| `temperature_max` | `float8` | Yes | — | Daily maximum temperature |
| `apparent_temperature` | `float8` | Yes | — | Feels-like temperature |
| `relative_humidity_2m` | `float8` | Yes | — | Relative humidity (%) |
| `dew_point_2m` | `float8` | Yes | — | Dew point (°C) |
| `precipitation` | `float8` | Yes | — | Total precipitation (mm) |
| `precipitation_probability` | `float8` | Yes | — | Precipitation probability (%) |
| `rain` | `float8` | Yes | — | Rain (mm) |
| `showers` | `float8` | Yes | — | Showers (mm) |
| `snowfall` | `float8` | Yes | — | Snowfall (cm) |
| `pressure_msl` | `float8` | Yes | — | Sea-level pressure (hPa) |
| `surface_pressure` | `float8` | Yes | — | Surface pressure (hPa) |
| `wind_speed_10m` | `float8` | Yes | — | Wind speed at 10m (km/h) |
| `wind_speed_80m` | `float8` | Yes | — | Wind speed at 80m |
| `wind_speed_180m` | `float8` | Yes | — | Wind speed at 180m |
| `wind_direction_10m` | `float8` | Yes | — | Wind direction at 10m (°) |
| `wind_direction_80m` | `float8` | Yes | — | Wind direction at 80m |
| `wind_direction_180m` | `float8` | Yes | — | Wind direction at 180m |
| `wind_gusts_10m` | `float8` | Yes | — | Wind gusts at 10m (km/h) |
| `visibility` | `float8` | Yes | — | Visibility (m) |
| `weather_code` | `float8` | Yes | — | WMO weather code |
| `evapotranspiration` | `float8` | Yes | — | Evapotranspiration (mm) |
| `et0_fao_evapotranspiration` | `float8` | Yes | — | FAO ET₀ (mm) |
| `soil_temperature_0cm` | `float8` | Yes | — | Soil temp at surface |
| `soil_temperature_18cm` | `float8` | Yes | — | Soil temp at 18cm |
| `sunshine_duration` | `float8` | Yes | — | Sunshine duration (s) |
| `created_at` | `timestamptz` | No | `now()` | Record creation time |

**RLS Policies**:
- ✅ `SELECT` — Public (everyone)
- ❌ `INSERT` / `UPDATE` / `DELETE` — Not allowed via client

---

### `ml_predictions`

Machine Learning weather predictions.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | `uuid` | No | `gen_random_uuid()` | Primary key |
| `latitude` | `float8` | No | — | Prediction latitude |
| `longitude` | `float8` | No | — | Prediction longitude |
| `datetime` | `timestamptz` | No | — | Prediction target time |
| `temperature_2m` | `float8` | Yes | — | Predicted temperature (°C) |
| `relative_humidity_2m` | `float8` | Yes | — | Predicted humidity (%) |
| `precipitation` | `float8` | Yes | — | Predicted precipitation (mm) |
| `wind_speed_10m` | `float8` | Yes | — | Predicted wind speed (km/h) |
| `created_at` | `timestamptz` | No | `now()` | Record creation time |

**RLS Policies**:
- ✅ `SELECT` — Public (everyone)
- ❌ `INSERT` / `UPDATE` / `DELETE` — Not allowed via client

---

## Storage Buckets

| Bucket | Public | Purpose |
|--------|--------|---------|
| `report-photos` | ✅ Yes | Community report photos |

**Upload path convention**: `<user_id>/<timestamp>_<filename>`

---

## Environment Variables / Secrets

| Secret | Used By | Description |
|--------|---------|-------------|
| `SUPABASE_URL` | `translate-report` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Client SDK | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | `translate-report` | Admin access for server-side operations |
| `LOVABLE_API_KEY` | `chat`, `validate-photo`, `translate-report` | AI Gateway authentication |
| `OPENWEATHER_API_KEY` | `weather` | OpenWeatherMap API access |

---

## Supported Locales

| Code | Language |
|------|----------|
| `en` | English |
| `es` | Spanish |
| `pt` | Portuguese |
| `fr` | French |

---

*Generated on 2026-02-24 — ClimateLoop v1.0*
