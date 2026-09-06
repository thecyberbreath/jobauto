import type { AIProvider, AIRequestOptions, AIUsageLog } from '../types';

export class FreeFallbackAIProvider implements AIProvider {
  getProviderName(): string {
    return 'FreeFallback (Deterministic Zero-Cost)';
  }

  async generateText(prompt: string, _options?: AIRequestOptions): Promise<{ text: string; usage: AIUsageLog }> {
    let output = "Thank you for submitting your application. Based on your verified candidate profile, your technical background aligns directly with our engineering goals.";

    if (prompt.toLowerCase().includes('cover letter')) {
      output = "Dear Hiring Committee,\n\nI am writing to express my strong interest in the open software engineering role. With 5.2+ years of experience building high-scale web applications in React, TypeScript, and Node.js, I look forward to contributing immediately to your team's mission.\n\nSincerely,\nAlex Morgan";
    } else if (prompt.toLowerCase().includes('ats') || prompt.toLowerCase().includes('resume')) {
      output = "Executive Summary Optimized: Experienced Senior Software Engineer specializing in high-performance web applications, micro-frontends, and serverless Node.js architectures.";
    }

    return {
      text: output,
      usage: {
        provider: 'FreeFallback',
        model: 'deterministic-rules',
        operation: 'generateText',
        inputTokens: Math.ceil(prompt.length / 4),
        outputTokens: Math.ceil(output.length / 4),
        estimatedCostUSD: 0.0
      }
    };
  }

  async generateStructuredOutput<T>(prompt: string, _schemaDescription: string): Promise<{ data: T; usage: AIUsageLog }> {
    const dummyData: any = {
      overallScore: 94,
      skillsScore: 96,
      experienceScore: 92,
      recommendations: ["Emphasize Next.js 15 Server Actions", "Quantify API latency reductions"]
    };

    return {
      data: dummyData as T,
      usage: {
        provider: 'FreeFallback',
        model: 'deterministic-rules',
        operation: 'generateStructuredOutput',
        inputTokens: Math.ceil(prompt.length / 4),
        outputTokens: 50,
        estimatedCostUSD: 0.0
      }
    };
  }

  async createEmbedding(text: string): Promise<{ embedding: number[]; usage: AIUsageLog }> {
    // Generate deterministic pseudo 384-dim embedding array
    const embedding = Array.from({ length: 384 }, (_, i) => Math.sin(i + text.length) * 0.1);
    return {
      embedding,
      usage: {
        provider: 'FreeFallback',
        model: 'bge-small-deterministic',
        operation: 'createEmbedding',
        inputTokens: Math.ceil(text.length / 4),
        outputTokens: 0,
        estimatedCostUSD: 0.0
      }
    };
  }
}
