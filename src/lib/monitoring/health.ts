export interface HealthStatus {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  version: string;
  environment: string;
  services: {
    database: { status: 'healthy' | 'unhealthy'; provider: string };
    storage: { status: 'healthy' | 'unhealthy'; provider: string };
    ai: { status: 'healthy' | 'unhealthy'; activeProvider: string };
    jobsEngine: { status: 'healthy' | 'unhealthy'; normalizedSources: number };
  };
}

export class HealthCheckService {
  static getHealthStatus(): HealthStatus {
    const isProduction = import.meta.env.PROD;
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0-production',
      environment: isProduction ? 'production' : 'development',
      services: {
        database: {
          status: 'healthy',
          provider: 'Supabase PostgreSQL (Cloud)',
        },
        storage: {
          status: 'healthy',
          provider: 'Supabase Storage (Private Buckets)',
        },
        ai: {
          status: 'healthy',
          activeProvider: import.meta.env.AI_PROVIDER || 'groq (Cloud HTTPS API)',
        },
        jobsEngine: {
          status: 'healthy',
          normalizedSources: 4,
        },
      },
    };
  }
}
