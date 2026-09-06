import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rtoictufbjzqkucnfjbg.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ProfileRecord {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  resume_url?: string;
  resume_text?: string;
  auto_apply: boolean;
  created_at?: string;
}

export interface JobRecord {
  id: string;
  title: string;
  company: string;
  location?: string;
  description?: string;
  salary_min?: number;
  salary_max?: number;
  platform: string;
  apply_url: string;
  apply_url_hash: string;
  posted_at?: string;
  fetched_at?: string;
}

export interface JobApplicationRecord {
  id: string;
  user_id: string;
  job_id: string;
  status: 'queued' | 'applied' | 'failed' | 'skipped';
  tailored_resume_url?: string;
  applied_at?: string;
  error_log?: string;
  created_at?: string;
  job?: JobRecord;
}
