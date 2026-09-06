-- Supabase PostgreSQL Schema Migration 001: Core Architecture & RLS Policies
-- Target: Zero-cost production infrastructure with pgvector and strict Row Level Security

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  "current_role" TEXT,
  years_of_experience NUMERIC(4, 1) DEFAULT 0.0,
  education TEXT,
  preferred_location TEXT,
  work_model_preference TEXT DEFAULT 'Remote',
  experience_level_pref TEXT,
  salary_expectation TEXT,
  job_freshness_pref TEXT DEFAULT '7d',
  ats_baseline_score INT DEFAULT 71,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- 2. RESUMES (Private Upload Vault Metadata)
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size_bytes INT NOT NULL,
  mime_type TEXT NOT NULL CHECK (mime_type IN ('application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain')),
  parsed_skills TEXT[] DEFAULT '{}',
  raw_text TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RESUME VERSIONS
CREATE TABLE IF NOT EXISTS public.resume_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  target_role TEXT NOT NULL,
  ats_score INT DEFAULT 71,
  is_default BOOLEAN DEFAULT FALSE,
  summary TEXT NOT NULL,
  skills_emphasized TEXT[] DEFAULT '{}',
  experience_bullets JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SKILLS & CANDIDATE SKILLS
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT DEFAULT 'Technical',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.candidate_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  proficiency_level TEXT DEFAULT 'Intermediate',
  UNIQUE(user_id, skill_id)
);

-- 5. COMPANIES & JOB SOURCES
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  website_url TEXT,
  industry TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.job_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE CHECK (name IN ('LinkedIn', 'Naukri', 'Indeed', 'Wellfound', 'Glassdoor', 'Company Site')),
  api_endpoint TEXT,
  is_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. JOBS
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  source_job_id TEXT NOT NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  company_logo TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  remote_type TEXT NOT NULL CHECK (remote_type IN ('Remote', 'Hybrid', 'Onsite')),
  salary_range TEXT,
  experience_level TEXT,
  skills TEXT[] DEFAULT '{}',
  url TEXT NOT NULL,
  submission_type TEXT NOT NULL CHECK (submission_type IN ('Direct API Integration', 'Open & Apply Portal')),
  fingerprint TEXT NOT NULL UNIQUE,
  posted_at TIMESTAMPTZ DEFAULT NOW(),
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. JOB MATCHES & SAVED JOBS
CREATE TABLE IF NOT EXISTS public.job_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  overall_score INT NOT NULL CHECK (overall_score BETWEEN 0 AND 100),
  skills_score INT NOT NULL,
  experience_score INT NOT NULL,
  location_score INT NOT NULL,
  seniority_score INT NOT NULL,
  industry_score INT NOT NULL,
  salary_score INT NOT NULL,
  why_match TEXT[] DEFAULT '{}',
  missing_requirements TEXT[] DEFAULT '{}',
  strategy_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

CREATE TABLE IF NOT EXISTS public.saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

-- 8. APPLICATIONS & EVENTS
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  company TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Saved', 'Ready to Apply', 'Applied', 'Assessment', 'Interview', 'Offer', 'Rejected')),
  submission_type TEXT NOT NULL,
  resume_version_used TEXT,
  applied_date TIMESTAMPTZ,
  next_step TEXT,
  next_step_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

CREATE TABLE IF NOT EXISTS public.application_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. COVER LETTERS & APPLICATION ANSWERS
CREATE TABLE IF NOT EXISTS public.cover_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  tone TEXT NOT NULL CHECK (tone IN ('Professional', 'Confident', 'Concise', 'Conversational')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.application_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  verified_from_profile BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. INTERVIEWS & QUESTIONS
CREATE TABLE IF NOT EXISTS public.interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  "role" TEXT NOT NULL,
  interview_date TIMESTAMPTZ NOT NULL,
  readiness_score INT DEFAULT 78,
  company_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.interview_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id UUID NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('Technical', 'Behavioral', 'Company')),
  question TEXT NOT NULL,
  star_answer TEXT NOT NULL,
  tips TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. SUBSCRIPTIONS, AI USAGE, NOTIFICATIONS, AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('FREE', 'PRO', 'AUTOPILOT')) DEFAULT 'FREE',
  status TEXT NOT NULL DEFAULT 'active',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  operation TEXT NOT NULL,
  input_tokens INT DEFAULT 0,
  output_tokens INT DEFAULT 0,
  estimated_cost NUMERIC(10, 6) DEFAULT 0.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  "type" TEXT NOT NULL CHECK ("type" IN ('match', 'interview', 'application', 'system')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  ip_address TEXT,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR PRODUCTION QUERY OPTIMIZATION
CREATE INDEX IF NOT EXISTS idx_jobs_source ON public.jobs(source);
CREATE INDEX IF NOT EXISTS idx_jobs_remote ON public.jobs(remote_type);
CREATE INDEX IF NOT EXISTS idx_matches_user_score ON public.job_matches(user_id, overall_score DESC);
CREATE INDEX IF NOT EXISTS idx_applications_user_status ON public.applications(user_id, status);
CREATE INDEX IF NOT EXISTS idx_ai_usage_user_date ON public.ai_usage(user_id, created_at DESC);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cover_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Strict User Isolation Policies
CREATE POLICY "Profiles self access" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Resumes self access" ON public.resumes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Resume versions self access" ON public.resume_versions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Job matches self access" ON public.job_matches FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Saved jobs self access" ON public.saved_jobs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Applications self access" ON public.applications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Cover letters self access" ON public.cover_letters FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Answers self access" ON public.application_answers FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Interviews self access" ON public.interviews FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "AI usage self access" ON public.ai_usage FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Notifications self access" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- Public Read Access for Normalized Jobs
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read jobs" ON public.jobs FOR SELECT USING (true);
