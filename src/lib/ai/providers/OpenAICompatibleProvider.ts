import type { AIProvider, AIRequestOptions, AIUsageLog } from '../types';

export class OpenAICompatibleProvider implements AIProvider {
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor(apiKey = '', baseUrl = 'https://api.openai.com/v1', model = 'gpt-4o-mini') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.model = model;
  }

  getProviderName(): string {
    return `OpenAI-Compatible (${this.model})`;
  }

  async generateText(prompt: string, options?: AIRequestOptions): Promise<{ text: string; usage: AIUsageLog }> {
    if (!this.apiKey) {
      const fallback = new (await import('./FreeFallbackAIProvider')).FreeFallbackAIProvider();
      return fallback.generateText(prompt, options);
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            ...(options?.systemPrompt ? [{ role: 'system', content: options.systemPrompt }] : []),
            { role: 'user', content: prompt }
          ],
          temperature: options?.temperature ?? 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API request failed: ${response.status}`);
      }

      const data = await response.json();
      const outputText = data.choices?.[0]?.message?.content || '';
      const inTokens = data.usage?.prompt_tokens || Math.ceil(prompt.length / 4);
      const outTokens = data.usage?.completion_tokens || Math.ceil(outputText.length / 4);

      return {
        text: outputText,
        usage: {
          provider: 'OpenAI-Compatible',
          model: this.model,
          operation: 'generateText',
          inputTokens: inTokens,
          outputTokens: outTokens,
          estimatedCostUSD: (inTokens * 0.15 + outTokens * 0.6) / 1000000 // Estimated gpt-4o-mini rates
        }
      };
    } catch {
      const fallback = new (await import('./FreeFallbackAIProvider')).FreeFallbackAIProvider();
      return fallback.generateText(prompt, options);
    }
  }

  async generateStructuredOutput<T>(prompt: string, schemaDescription: string): Promise<{ data: T; usage: AIUsageLog }> {
    const fullPrompt = `${prompt}\n\nSchema Requirement:\n${schemaDescription}\n\nRespond ONLY with valid JSON.`;
    const result = await this.generateText(fullPrompt);
    try {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/) || result.text.match(/\[[\s\S]*\]/);
      const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : result.text);
      return { data: parsed as T, usage: result.usage };
    } catch {
      const fallback = new (await import('./FreeFallbackAIProvider')).FreeFallbackAIProvider();
      return fallback.generateStructuredOutput<T>(prompt, schemaDescription);
    }
  }

  async createEmbedding(text: string): Promise<{ embedding: number[]; usage: AIUsageLog }> {
    const fallback = new (await import('./FreeFallbackAIProvider')).FreeFallbackAIProvider();
    return fallback.createEmbedding(text);
  }
}
