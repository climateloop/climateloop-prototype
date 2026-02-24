export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      cap_alerts: {
        Row: {
          ai_explanation: Json | null
          areas: Json
          category: string
          certainty: string
          created_at: string
          description: string
          effective: string | null
          event: string
          expires: string | null
          headline: string
          id: string
          identifier: string
          instruction: string | null
          language: string
          msg_type: string
          onset: string | null
          parameters: Json | null
          scope: string
          sender: string
          sent: string
          severity: string
          source: string | null
          status: string
          translations: Json | null
          urgency: string
        }
        Insert: {
          ai_explanation?: Json | null
          areas?: Json
          category?: string
          certainty: string
          created_at?: string
          description: string
          effective?: string | null
          event: string
          expires?: string | null
          headline: string
          id?: string
          identifier: string
          instruction?: string | null
          language?: string
          msg_type?: string
          onset?: string | null
          parameters?: Json | null
          scope?: string
          sender: string
          sent: string
          severity: string
          source?: string | null
          status?: string
          translations?: Json | null
          urgency: string
        }
        Update: {
          ai_explanation?: Json | null
          areas?: Json
          category?: string
          certainty?: string
          created_at?: string
          description?: string
          effective?: string | null
          event?: string
          expires?: string | null
          headline?: string
          id?: string
          identifier?: string
          instruction?: string | null
          language?: string
          msg_type?: string
          onset?: string | null
          parameters?: Json | null
          scope?: string
          sender?: string
          sent?: string
          severity?: string
          source?: string | null
          status?: string
          translations?: Json | null
          urgency?: string
        }
        Relationships: []
      }
      community_reports: {
        Row: {
          address: string
          category: string
          created_at: string
          id: string
          latitude: number | null
          longitude: number | null
          notes: string | null
          photo_url: string | null
          status: string
          sub_category: string | null
          title: string
          translations: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          category: string
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          photo_url?: string | null
          status?: string
          sub_category?: string | null
          title: string
          translations?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          category?: string
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          photo_url?: string | null
          status?: string
          sub_category?: string | null
          title?: string
          translations?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      iot_readings: {
        Row: {
          apparent_temperature: number | null
          created_at: string
          datetime: string
          dew_point_2m: number | null
          et0_fao_evapotranspiration: number | null
          evapotranspiration: number | null
          id: string
          precipitation: number | null
          precipitation_probability: number | null
          pressure_msl: number | null
          rain: number | null
          relative_humidity_2m: number | null
          showers: number | null
          snowfall: number | null
          soil_temperature_0cm: number | null
          soil_temperature_18cm: number | null
          station_id: string
          sunshine_duration: number | null
          surface_pressure: number | null
          temperature_180m: number | null
          temperature_2m: number | null
          temperature_80m: number | null
          temperature_max: number | null
          temperature_min: number | null
          visibility: number | null
          weather_code: number | null
          wind_direction_10m: number | null
          wind_direction_180m: number | null
          wind_direction_80m: number | null
          wind_gusts_10m: number | null
          wind_speed_10m: number | null
          wind_speed_180m: number | null
          wind_speed_80m: number | null
        }
        Insert: {
          apparent_temperature?: number | null
          created_at?: string
          datetime: string
          dew_point_2m?: number | null
          et0_fao_evapotranspiration?: number | null
          evapotranspiration?: number | null
          id?: string
          precipitation?: number | null
          precipitation_probability?: number | null
          pressure_msl?: number | null
          rain?: number | null
          relative_humidity_2m?: number | null
          showers?: number | null
          snowfall?: number | null
          soil_temperature_0cm?: number | null
          soil_temperature_18cm?: number | null
          station_id: string
          sunshine_duration?: number | null
          surface_pressure?: number | null
          temperature_180m?: number | null
          temperature_2m?: number | null
          temperature_80m?: number | null
          temperature_max?: number | null
          temperature_min?: number | null
          visibility?: number | null
          weather_code?: number | null
          wind_direction_10m?: number | null
          wind_direction_180m?: number | null
          wind_direction_80m?: number | null
          wind_gusts_10m?: number | null
          wind_speed_10m?: number | null
          wind_speed_180m?: number | null
          wind_speed_80m?: number | null
        }
        Update: {
          apparent_temperature?: number | null
          created_at?: string
          datetime?: string
          dew_point_2m?: number | null
          et0_fao_evapotranspiration?: number | null
          evapotranspiration?: number | null
          id?: string
          precipitation?: number | null
          precipitation_probability?: number | null
          pressure_msl?: number | null
          rain?: number | null
          relative_humidity_2m?: number | null
          showers?: number | null
          snowfall?: number | null
          soil_temperature_0cm?: number | null
          soil_temperature_18cm?: number | null
          station_id?: string
          sunshine_duration?: number | null
          surface_pressure?: number | null
          temperature_180m?: number | null
          temperature_2m?: number | null
          temperature_80m?: number | null
          temperature_max?: number | null
          temperature_min?: number | null
          visibility?: number | null
          weather_code?: number | null
          wind_direction_10m?: number | null
          wind_direction_180m?: number | null
          wind_direction_80m?: number | null
          wind_gusts_10m?: number | null
          wind_speed_10m?: number | null
          wind_speed_180m?: number | null
          wind_speed_80m?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "iot_readings_station_id_fkey"
            columns: ["station_id"]
            isOneToOne: false
            referencedRelation: "iot_stations"
            referencedColumns: ["id"]
          },
        ]
      }
      iot_stations: {
        Row: {
          altitude_m: number | null
          created_at: string
          id: string
          installed_at: string
          is_active: boolean
          latitude: number
          longitude: number
          name: string | null
          station_code: string
        }
        Insert: {
          altitude_m?: number | null
          created_at?: string
          id?: string
          installed_at?: string
          is_active?: boolean
          latitude: number
          longitude: number
          name?: string | null
          station_code: string
        }
        Update: {
          altitude_m?: number | null
          created_at?: string
          id?: string
          installed_at?: string
          is_active?: boolean
          latitude?: number
          longitude?: number
          name?: string | null
          station_code?: string
        }
        Relationships: []
      }
      ml_predictions: {
        Row: {
          created_at: string
          datetime: string
          id: string
          latitude: number
          longitude: number
          precipitation: number | null
          relative_humidity_2m: number | null
          temperature_2m: number | null
          wind_speed_10m: number | null
        }
        Insert: {
          created_at?: string
          datetime: string
          id?: string
          latitude: number
          longitude: number
          precipitation?: number | null
          relative_humidity_2m?: number | null
          temperature_2m?: number | null
          wind_speed_10m?: number | null
        }
        Update: {
          created_at?: string
          datetime?: string
          id?: string
          latitude?: number
          longitude?: number
          precipitation?: number | null
          relative_humidity_2m?: number | null
          temperature_2m?: number | null
          wind_speed_10m?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
