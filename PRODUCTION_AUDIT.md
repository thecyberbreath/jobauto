# Production Audit — CareerPulse AI SaaS Platform

**Date**: September 6, 2026  
**Auditor**: Lead Architect, Principal Full-Stack & Security Engineer  
**Status**: Comprehensive Technical & Infrastructure Audit  

---

## 1. Architecture Overview

CareerPulse AI is a job discovery, AI resume parsing, match scoring, cover letter generation, bulk review, Kanban tracking, and interview preparation platform. The application is built with a client-side React 19 + TypeScript + Vite architecture using a stateful React Context (`AppContext.tsx`).

While the UI/UX is fully designed around Anthropic's Claude warm-canvas design system (`DESIGN-claude.md`), the current state of the application lacks production-grade backend persistence, environment variable management, AI provider abstractions, secure database schemas with Row Level Security (RLS), real resume parsing, job source feed ingestion, rate limiting, and automated testing.

---

## 2. Current Stack Audit

| Component | Current Technology | Production Target | Assessment |
|---|---|---|---|
| **Framework** | Vite 8 + React 19 + TypeScript 6 | Vite React TS / Next.js compatible SPA + Serverless Handlers | High performance, instant builds (<600ms). |
| **Styling** | Tailwind CSS 4 + Lucide React | Tailwind CSS 4 + Claude Design System | Production-ready design tokens & CSS rules. |
| **State** | React Context (`AppContext.tsx`) | React Context + Supabase Realtime Client | In-memory only; needs Supabase PostgreSQL persistence. |
| **Database** | In-Memory Mock Data (`mockData.ts`) | Supabase PostgreSQL + `pgvector` | Blocking production; missing database schema & RLS. |
| **Authentication**| Simulated state toggles | Supabase Auth (Email + Google OAuth) | Missing real JWT token verification & session persistence. |
| **Storage** | Browser Memory / Blob URLs | Supabase Storage (Private Buckets) | Resume uploads currently simulated via in-memory state. |
| **AI Integration** | Hardcoded mock template responses | Vendor-Agnostic `AIProvider` Abstraction | Needs Ollama / OpenAI / Free Provider fallback abstraction. |
| **Job Sources** | Static Mock Jobs Array | Modular `JobSource` Interface (LinkedIn, Naukri, RSS, Feeds) | Needs job normalization & deterministic deduplication. |

---

## 3. Current Dependencies Audit

- **Core Dependencies**: `react`, `react-dom`, `lucide-react`, `clsx`, `tailwind-merge`, `canvas-confetti`.
- **Dev Dependencies**: `@tailwindcss/vite`, `tailwindcss`, `typescript`, `vite`, `oxlint`, `@types/node`, `@types/canvas-confetti`.
- **Audit Result**: Zero bloat. Packages are lightweight and mature. We will add `@supabase/supabase-js` and `vitest` for production data integration and automated testing.

---

## 4. Security Findings & Vulnerabilities

1. **In-Memory State Vulnerability**: All user candidate data, resumes, applications, and notes reside in non-persisted client-side memory.
2. **Missing Row Level Security (RLS)**: Users currently have no isolated database permissions. Production requires strict Supabase RLS policies (`auth.uid() = user_id`).
3. **Resume Security**: Uploaded files must be placed in private, non-public Supabase storage buckets with signed URL access control and strict MIME-type validation.
4. **Secrets Exposure Risk**: No environment variables configured. Production secrets (Supabase Service Keys, AI Provider API Keys) must never leak into client JS bundles.
5. **Rate-Limiting Absence**: No throttling on AI request endpoints or authentication attempts.

---

## 5. Cost Analysis & Zero-Cost Architecture (₹0 / $0 Goal)

| Service Layer | Zero-Cost Infrastructure Selection | Free Tier Limits |
|---|---|---|
| **Hosting & CDN** | Cloudflare Pages / Vercel Free Tier | Unlimited bandwidth, 100k requests/day |
| **Database** | Supabase PostgreSQL + `pgvector` | 500 MB database storage, 2 Core Shared CPU |
| **Auth & Storage** | Supabase Auth + Supabase Storage | 50,000 MAU, 1 GB private file storage |
| **Local AI Inference** | Ollama (Development/Self-Hosted) | 100% Free local LLM execution (Llama 3 / Mistral / Qwen) |
| **Cloud AI Fallback** | Groq / Gemini Free API / OpenAI-Compatible | Generous free tier requests per minute |
| **Job Discovery** | Public Feeds, RSS, Permitted Company Career APIs | 0 USD API cost |

---

## 6. Migration & Implementation Plan

1. **Phase 4**: Implement `.env.example` & Environment Variable Management.
2. **Phase 5**: Deploy full 22-table relational database schema with Supabase RLS policies.
3. **Phase 7 & 8**: Create `AIProvider` vendor abstraction (`OpenAIProvider`, `OllamaProvider`, `FreeFallbackAIProvider`) with token quotas.
4. **Phase 11**: Build modular `JobSource` interface, job normalization, and deterministic matching engine (35% skills, 20% exp, 20% role, 10% loc, 10% seniority, 5% salary).
5. **Phase 17 & 29**: Build Client/Server Security Rate Limiter and `EntitlementService` (Free/Pro/Autopilot tier limits).
6. **Phase 31 & 32**: Add Vitest automated tests covering matching algorithm, AI provider fallback, and rate limits.
7. **Phase 43-47**: Generate production documentation artifacts (`COST_CONTROL.md`, `ARCHITECTURE.md`, `PRODUCTION_CHECKLIST.md`, Legal Privacy/Terms policies).
