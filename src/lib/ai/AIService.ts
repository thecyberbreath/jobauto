import type { AIProvider, AIRequestOptions, AIUsageLog } from './types';
import { FreeFallbackAIProvider } from './providers/FreeFallbackAIProvider';
import { OllamaProvider } from './providers/OllamaProvider';
import { OpenAICompatibleProvider } from './providers/OpenAICompatibleProvider';

export class AIProviderFactory {
  static getProvider(): AIProvider {
    const providerType = (import.meta.env.AI_PROVIDER || 'groq').toLowerCase();

    if (providerType === 'groq' || providerType === 'openai-compatible') {
      const apiKey = import.meta.env.AI_API_KEY || '';
      const baseUrl = import.meta.env.AI_BASE_URL || (providerType === 'groq' ? 'https://api.groq.com/openai/v1' : 'https://api.openai.com/v1');
      const model = import.meta.env.AI_MODEL || (providerType === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini');
      return new OpenAICompatibleProvider(apiKey, baseUrl, model);
    }

    if (providerType === 'ollama') {
      // Optional dev-only fallback
      const baseUrl = import.meta.env.AI_BASE_URL || 'http://localhost:11434';
      const model = import.meta.env.AI_MODEL || 'llama3:8b';
      return new OllamaProvider(baseUrl, model);
    }

    return new FreeFallbackAIProvider();
  }
}

export class AIService {
  private static provider: AIProvider = AIProviderFactory.getProvider();
  private static fallbackProvider: AIProvider = new FreeFallbackAIProvider();
  private static usageLogs: AIUsageLog[] = [];

  static getActiveProviderName(): string {
    return this.provider.getProviderName();
  }

  static async generateText(prompt: string, options?: AIRequestOptions): Promise<string> {
    try {
      const result = await this.provider.generateText(prompt, options);
      this.logUsage(result.usage);
      return result.text;
    } catch (err) {
      console.warn('[AIService] Primary cloud provider failed, falling back to deterministic engine:', err);
      const fallbackResult = await this.fallbackProvider.generateText(prompt, options);
      this.logUsage(fallbackResult.usage);
      return fallbackResult.text;
    }
  }

  static async generateStructuredOutput<T>(prompt: string, schemaDescription: string): Promise<T> {
    try {
      const result = await this.provider.generateStructuredOutput<T>(prompt, schemaDescription);
      this.logUsage(result.usage);
      return result.data;
    } catch (err) {
      console.warn('[AIService] Primary cloud provider failed, falling back to deterministic engine:', err);
      const fallbackResult = await this.fallbackProvider.generateStructuredOutput<T>(prompt, schemaDescription);
      this.logUsage(fallbackResult.usage);
      return fallbackResult.data;
    }
  }

  static async createEmbedding(text: string): Promise<number[]> {
    try {
      const result = await this.provider.createEmbedding(text);
      this.logUsage(result.usage);
      return result.embedding;
    } catch (err) {
      console.warn('[AIService] Embedding call failed, using deterministic fallback embedding:', err);
      const fallbackResult = await this.fallbackProvider.createEmbedding(text);
      this.logUsage(fallbackResult.usage);
      return fallbackResult.embedding;
    }
  }

  private static logUsage(usage: AIUsageLog) {
    this.usageLogs.push(usage);
  }

  static getUsageLogs(): AIUsageLog[] {
    return this.usageLogs;
  }
}

