import type { AIProvider, AIRequestOptions, AIUsageLog } from '../types';

export class OllamaProvider implements AIProvider {
  private baseUrl: string;
  private model: string;

  constructor(baseUrl = 'http://localhost:11434', model = 'llama3:8b') {
    this.baseUrl = baseUrl;
    this.model = model;
  }

  getProviderName(): string {
    return `Ollama Local (${this.model})`;
  }

  async generateText(prompt: string, options?: AIRequestOptions): Promise<{ text: string; usage: AIUsageLog }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          prompt: options?.systemPrompt ? `${options.systemPrompt}\n\n${prompt}` : prompt,
          stream: false,
          options: {
            temperature: options?.temperature ?? 0.7
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama request failed with status ${response.status}`);
      }

      const data = await response.json();
      const outputText = data.response || '';

      return {
        text: outputText,
        usage: {
          provider: 'Ollama',
          model: this.model,
          operation: 'generateText',
          inputTokens: data.prompt_eval_count || Math.ceil(prompt.length / 4),
          outputTokens: data.eval_count || Math.ceil(outputText.length / 4),
          estimatedCostUSD: 0.0 // 100% Free local computation
        }
      };
    } catch (err) {
      console.warn('Ollama unavailable, falling back to local deterministic generator:', err);
      const fallback = new (await import('./FreeFallbackAIProvider')).FreeFallbackAIProvider();
      return fallback.generateText(prompt, options);
    }
  }

  async generateStructuredOutput<T>(prompt: string, schemaDescription: string): Promise<{ data: T; usage: AIUsageLog }> {
    const fullPrompt = `${prompt}\n\nOutput ONLY valid JSON adhering to schema:\n${schemaDescription}`;
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
    try {
      const response = await fetch(`${this.baseUrl}/api/embeddings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: this.model, prompt: text })
      });

      if (!response.ok) throw new Error('Ollama embedding request failed');
      const data = await response.json();

      return {
        embedding: data.embedding || [],
        usage: {
          provider: 'Ollama',
          model: this.model,
          operation: 'createEmbedding',
          inputTokens: Math.ceil(text.length / 4),
          outputTokens: 0,
          estimatedCostUSD: 0.0
        }
      };
    } catch {
      const fallback = new (await import('./FreeFallbackAIProvider')).FreeFallbackAIProvider();
      return fallback.createEmbedding(text);
    }
  }
}
