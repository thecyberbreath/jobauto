# CareerPulse AI — Production Cloud Deployment Guide

This guide details the complete 100% cloud-native deployment procedure for **CareerPulse AI**. Once deployed using this specification, the platform operates autonomously in the cloud with zero dependencies on local hardware, local servers, or desktop software.

---

## 1. Cloud Architecture Overview

```
                 [ Custom Domain / Cloudflare Edge CDN ]
                                   │
                                   ▼
                    [ Cloudflare Pages SPA Frontend ]
                                   │
                 ┌─────────────────┴─────────────────┐
                 │                                   │
                 ▼                                   ▼
   [ Supabase Cloud Services ]             [ Cloud AI APIs ]
   ├── PostgreSQL DB (RLS Enabled)         ├── Groq Cloud API (Primary)
   ├── Auth (JWT + OAuth)                  ├── OpenRouter Cloud (Secondary)
   └── Storage (Private Buckets)           └── Free Fallback AI Engine
```

---

## 2. Prerequisites & Cloud Accounts ($0 Cost)

1. **Supabase Account**: Free project hosting PostgreSQL + Auth + Storage.
2. **Cloudflare Account**: Free Pages hosting + DNS + SSL.
3. **Groq Cloud API Key**: Free API key from `console.groq.com` (14.4k requests/day free).
4. **GitHub Repository**: Continuous deployment trigger.

---

## 3. Environment Variables Configuration

Set these secrets in Cloudflare Pages Dashboard under **Settings > Environment Variables**:

| Variable Name | Purpose | Example Value |
|---|---|---|
| `VITE_APP_URL` | Canonical Production Domain | `https://careerpulse.pages.dev` |
| `VITE_SUPABASE_URL` | Supabase Cloud API Base URL | `https://xyzcompany.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Public Supabase Client Key | `eyJhbGciOiJIUzI1NiIsIn...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Private Admin Key (Server Only) | `eyJhbGciOiJIUzI1NiIsIn...` |
| `AI_PROVIDER` | Primary Cloud AI Vendor | `groq` |
| `AI_API_KEY` | Cloud AI API Authorization | `gsk_8F3k...` |
| `AI_BASE_URL` | Cloud HTTPS Endpoint | `https://api.groq.com/openai/v1` |
| `AI_MODEL` | Cloud Model Identifier | `llama-3.3-70b-versatile` |

---

## 4. Step-by-Step Production Deployment Procedure

### Step 4.1: Database & Storage Migration (Supabase)
1. Log in to [Supabase Console](https://database.new) and create a new project.
2. Navigate to **SQL Editor** -> **New Query**.
3. Copy and paste the complete content of [`supabase/migrations/001_initial_schema.sql`](file:///c:/Users/usern/OneDrive/Documents/sides/jobs/businessmodel/jobapply/supabase/migrations/001_initial_schema.sql).
4. Click **Run** to provision 22 relational tables, indexes, `pgvector`, and Row Level Security (RLS) policies.
5. Under **Storage**, confirm the private bucket `resumes-private` is initialized.

### Step 4.2: Frontend & API Deployment (Cloudflare Pages)
1. Push code to `main` branch on GitHub:
   ```bash
   git add .
   git commit -m "feat: production deployment setup"
   git push origin main
   ```
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) -> **Workers & Pages** -> **Create Application** -> **Pages**.
3. Connect your GitHub repository.
4. Select Framework Preset: **Vite / React**.
5. Set Build Command: `npm run build`
6. Set Output Directory: `dist`
7. Add the environment variables from Section 3 above and click **Save and Deploy**.

---

## 5. Rollback Procedure

If a deployed build introduces bugs or regression:
1. Go to **Cloudflare Dashboard** -> **Workers & Pages** -> **CareerPulse AI** -> **Deployments**.
2. Select the previous stable deployment hash.
3. Click **Rollback to this deployment**.
4. Cloudflare instantly restores the previous static assets and route handlers in under 3 seconds.

---

## 6. Health Checks & Observability

- **Health Monitoring Endpoint**: Access `/api/health` or client status checker to retrieve status JSON:
  ```json
  {
    "status": "ok",
    "timestamp": "2026-09-06T23:45:00.000Z",
    "version": "1.0.0-production",
    "environment": "production",
    "services": {
      "database": { "status": "healthy", "provider": "Supabase PostgreSQL (Cloud)" },
      "storage": { "status": "healthy", "provider": "Supabase Storage (Private Buckets)" },
      "ai": { "status": "healthy", "activeProvider": "groq (Cloud HTTPS API)" }
    }
  }
  ```

---

## 7. Zero Local Infrastructure Verification

To verify that the production platform operates completely independent of your local machine:
1. Turn off your computer completely.
2. Open your smartphone on cellular network (Wi-Fi off).
3. Navigate to `https://careerpulse.pages.dev`.
4. Upload a resume, run job matching, and generate a cover letter.
5. All operations will succeed via Supabase Cloud and Groq Cloud APIs.
