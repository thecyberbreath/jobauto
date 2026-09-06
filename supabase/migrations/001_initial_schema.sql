-- Supabase Migration: Job Aggregator & Auto-Apply SaaS Platform Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  linkedin_url TEXT,
  resume_url TEXT,
  resume_text TEXT,
  auto_apply BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. JOBS LISTING CACHE
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  description TEXT,
  salary_min NUMERIC,
  salary_max NUMERIC,
  platform TEXT NOT NULL,
  apply_url TEXT NOT NULL,
  apply_url_hash TEXT UNIQUE NOT NULL,
  posted_at TIMESTAMPTZ DEFAULT NOW(),
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. JOB APPLICATIONS TRACKER
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'queued', -- 'queued' | 'applied' | 'failed' | 'skipped'
  tailored_resume_url TEXT,
  applied_at TIMESTAMPTZ,
  error_log TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SEARCH HISTORY
CREATE TABLE IF NOT EXISTS public.searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  filters JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_jobs_hash ON public.jobs(apply_url_hash);
CREATE INDEX IF NOT EXISTS idx_applications_user ON public.job_applications(user_id);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.searches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read write own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Public read jobs" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Authenticated insert jobs" ON public.jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Users access own applications" ON public.job_applications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own searches" ON public.searches FOR ALL USING (auth.uid() = user_id);
