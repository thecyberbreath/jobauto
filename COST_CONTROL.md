# Cost Control & Zero-Cost Infrastructure Strategy

**Objective**: Maintain production operating costs as close to **₹0 / $0** as possible while delivering a fast, secure, scalable AI job search SaaS platform.

---

## 1. Zero-Cost Infrastructure Matrix

| Service Component | Provider | Free Tier Allocation | Cost Prevention Strategy | Hard Quota Limit |
|---|---|---|---|---|
| **Hosting & Global CDN** | Cloudflare Pages / Vercel | Unlimited bandwidth, 100k requests/day | Static asset caching + Edge routing | Alert at 80k daily requests |
| **Relational Database** | Supabase PostgreSQL + `pgvector` | 500 MB database storage, 2 Shared Core CPUs | Strict indexing, query pagination, automated row pruning | Alert at 400 MB storage |
| **Authentication** | Supabase Auth | 50,000 Monthly Active Users (MAU) | JWT token local storage + session caching | Alert at 40,000 MAU |
| **Private File Vault** | Supabase Storage | 1 GB encrypted private bucket storage | Signed URLs, 10MB per resume upload limit | Max 10MB per PDF/DOCX |
| **AI Inference (Primary)**| Ollama (Local/Self-Hosted) | 100% Free local computation | Zero external API calls for local/on-prem deployments | $0.00 unlimited |
| **AI Inference (Cloud)** | Free Provider Fallback / Groq | Generous free requests per minute | Token usage tracking in `ai_usage`, cached prompts | Quotas by tier |
| **Job Aggregation** | Public Feeds, RSS, Company Career Handlers | 0 USD API cost | Background job deduplication & 15-min cache | Deduplication fingerprints |

---

## 2. Tiered Feature Entitlements & Quotas

```
                                  [ User Request ]
                                         │
                             [ EntitlementService Check ]
                                         │
                 ┌───────────────────────┼───────────────────────┐
                 ▼                       ▼                       ▼
            [ FREE Tier ]          [ PRO Tier ]          [ AUTOPILOT Tier ]
            • 10 Matches/Day       • Unlimited Matches   • Unlimited Matches
            • 5 AI Gens/Month      • 500 AI Gens/Month   • Unlimited AI Gens
            • Kanban Tracker       • ATS Resume Opt      • Bulk Review Queue
            • External Portals     • Cover Letter Gen    • Direct API Submissions
```

---

## 3. Unexpected Expense Protection Checklist

- [x] **No Unbounded Queries**: Every list query enforces `LIMIT 20` pagination.
- [x] **No Direct Uncached LLM Calls**: AI prompt results are hashed and cached where appropriate.
- [x] **Strict Token Limits**: Max 1,000 output tokens per AI generation.
- [x] **Private Storage Quota**: 10 MB maximum file size limit on resume uploads.
- [x] **Rate Throttling**: 30 requests/minute per client IP via `RateLimiter`.
