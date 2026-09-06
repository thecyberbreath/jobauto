# Cloud AI Provider Specification — CareerPulse AI

**Architecture**: 100% Cloud-Native HTTPS AI APIs  
**Local AI Dependencies**: **NONE** (Zero Ollama, Zero local model files, Zero GPU requirement)  
**Operating Cost**: **$0.00 / month** (Leveraging Cloud API Free Tiers)  

---

## 1. Primary Cloud AI Provider: Groq Cloud API

CareerPulse AI uses **Groq Cloud API** as its primary cloud AI provider. Groq provides ultra-fast hardware acceleration (LPU) with a generous free API tier.

| Property | Specification |
|---|---|
| **Provider Name** | Groq Cloud |
| **API Protocol** | OpenAI-Compatible HTTPS REST API |
| **Endpoint Base URL** | `https://api.groq.com/openai/v1` |
| **Primary Model** | `llama-3.3-70b-versatile` |
| **Fast/Lightweight Model** | `llama3-8b-8192` |
| **Structured JSON Model** | `mixtral-8x7b-32768` |
| **Free Tier Quota** | **14,400 requests / day** (Free forever) |
| **Rate Limit** | 30 Requests Per Minute (RPM), 14.4k Requests Per Day (RPD) |
| **Input Context Limit** | 128,000 tokens |
| **Output Token Limit** | 8,192 tokens |
| **Cost** | **$0.00** on Free Tier |

---

## 2. Secondary Fallback AI Providers

If the primary Groq Cloud API endpoint encounters network timeouts or rate limits (HTTP 429), `AIService` automatically routes requests to secondary cloud APIs without interrupting the candidate's session.

### Provider Matrix

```
Client Request
      │
      ▼
┌───────────────────────────┐
│   Groq Cloud API (LPU)    │ ── (Success) ──► Return Output
└─────────────┬─────────────┘
              │ (Failure / Rate Limit)
              ▼
┌───────────────────────────┐
│ OpenRouter Free Cloud API │ ── (Success) ──► Return Output
└─────────────┬─────────────┘
              │ (Failure)
              ▼
┌───────────────────────────┐
│ FreeFallbackAIProvider    │ ── (Deterministic Fallback Engine)
└───────────────────────────┘
```

1. **OpenRouter Free Tier** (Secondary Cloud):
   - Base URL: `https://openrouter.ai/api/v1`
   - Models: `meta-llama/llama-3.2-11b-vision-instruct:free`, `mistralai/mistral-7b-instruct:free`
   - Cost: $0.00
2. **Mistral AI Cloud** (Alternative Cloud):
   - Base URL: `https://api.mistral.ai/v1`
   - Model: `mistral-small-latest`
   - Free API credits: $0.00 free tier
3. **Deterministic Free Fallback Engine** (`FreeFallbackAIProvider`):
   - Zero network dependency local rule engine that generates structured JSON templates, ATS keyword gap analysis, and cover letter drafts directly in memory if all external APIs are unreachable.

---

## 3. Provider Abstraction Architecture

Business logic across CareerPulse AI never invokes provider SDKs directly. All calls route through `AIService`:

```typescript
import { AIService } from '@/lib/ai/AIService';

// Generate tailored resume bullet points via Cloud AI
const tailoredResume = await AIService.generateText(prompt, {
  maxTokens: 1000,
  temperature: 0.3,
});
```

### Environment Configuration (`.env`)

```env
# Cloud AI Provider Settings (No Local Ollama Required)
AI_PROVIDER=groq
AI_API_KEY=gsk_your_free_groq_api_key
AI_BASE_URL=https://api.groq.com/openai/v1
AI_MODEL=llama-3.3-70b-versatile
```

---

## 4. Cost Protection & Quota Limits

To ensure no unexpected costs occur:
- **Max Input Length**: 4,000 characters per prompt request.
- **Max Output Tokens**: 1,000 tokens per completion.
- **Per-User Quota**: 20 AI generations/day on `FREE` tier, 100/day on `PRO`.
- **Token Usage Tracking**: Logged automatically into Supabase PostgreSQL table `ai_usage`.

---

## 5. Summary of Zero Local Dependencies

- ❌ NO Ollama installed on developer/user machine.
- ❌ NO GPU memory allocated on host computer.
- ❌ NO local model files downloaded (.gguf / .bin).
- ❌ NO `localhost:11434` connections in production.
- ✅ 100% Cloud HTTPS API execution.
- ✅ Machine can be powered off after git push; application continues functioning globally in the cloud.
