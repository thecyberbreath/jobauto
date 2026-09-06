export interface AIRequestOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface AIUsageLog {
  provider: string;
  model: string;
  operation: string;
  inputTokens: number;
  outputTokens: number;
  estimatedCostUSD: number;
}

export interface AIProvider {
  getProviderName(): string;
  generateText(prompt: string, options?: AIRequestOptions): Promise<{ text: string; usage: AIUsageLog }>;
  generateStructuredOutput<T>(prompt: string, schemaDescription: string): Promise<{ data: T; usage: AIUsageLog }>;
  createEmbedding(text: string): Promise<{ embedding: number[]; usage: AIUsageLog }>;
}
