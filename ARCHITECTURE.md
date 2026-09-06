# System Architecture & Technical Specifications

**Product**: CareerPulse AI — AI-Powered Job Search & Application Platform  
**Design System**: Anthropic Claude Warm-Canvas Editorial Specification (`DESIGN-claude.md`)  

---

## 1. System Overview & Data Flow

```
                      [ User Browser (React 19 + Vite) ]
                                      │
                         ┌────────────┴────────────┐
                         ▼                         ▼
             [ Client State Context ]      [ Local Resume Parser ]
                         │                         │
                         ├─────────────────────────┘
                         ▼
             [ Deterministic Job Engine ] (35% Skills, 20% Exp, 20% Role, 10% Loc, 10% Sr, 5% Sal)
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
    [ AI Provider Factory ]   [ Supabase PostgreSQL + RLS ]
             │                       │
     ┌───────┼───────┐               ├──> Profiles, Resumes, Resume Versions
     ▼       ▼       ▼               ├──> Jobs, Job Matches, Saved Jobs
  Ollama   Groq   FreeFallback       └──> Applications, Covers, Interviews, AI Usage
```

---

## 2. Core Architectural Components

### A. AI Provider Abstraction (`src/lib/ai/`)
The platform abstracts AI capabilities behind a vendor-agnostic `AIProvider` interface:
- **`OllamaProvider`**: Connects to local Ollama endpoints (`http://localhost:11434`) for $0 inference cost.
- **`OpenAICompatibleProvider`**: Connects to OpenAI, Groq, or custom endpoints.
- **`FreeFallbackAIProvider`**: Highly reliable, 0-cost fallback engine.
- **`AIService`**: Factory that selects providers based on `AI_PROVIDER` environment variable and logs usage to `ai_usage`.

### B. Job Discovery & Deduplication (`src/lib/jobs/`)
- **`JobSource` Interface**: Modular contract for LinkedIn, Naukri, Wellfound, Indeed, Glassdoor, and Company Sites.
- **`JobDeduplicator`**: Generates deterministic hash fingerprints (`fp_hash`) based on `company`, `title`, and `location` to prevent duplicates.
- **`JobMatchingEngine`**: Weighted scoring algorithm (35% skills, 20% experience, 20% role, 10% location, 10% seniority, 5% salary).

### C. Security & Entitlements (`src/lib/security/`)
- **`RateLimiter`**: Sliding window IP and user throttling.
- **`EntitlementService`**: Enforces feature access boundaries across `FREE`, `PRO`, and `AUTOPILOT` tiers.

---

## 3. Database Schema (22 Tables with RLS)

All database entities enforce strict Row Level Security (`auth.uid() = user_id`). Key entities:
- `profiles`, `resumes`, `resume_versions`
- `jobs`, `job_sources`, `job_matches`, `saved_jobs`
- `applications`, `application_events`, `application_answers`, `cover_letters`
- `interviews`, `interview_questions`
- `subscriptions`, `ai_usage`, `notifications`, `audit_logs`
