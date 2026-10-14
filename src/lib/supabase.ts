import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ReportType = 'individual' | 'vehicle';

export interface Report {
  id: string;
  image_url: string;
  report_type: ReportType;
  description: string;
  location: string;
  incident_date: string;
  license_plate: string | null;
  status: string;
  share_count: number;
  created_at: string;
}

export type ReportInsert = Omit<Report, 'id' | 'status' | 'share_count' | 'created_at'>;
