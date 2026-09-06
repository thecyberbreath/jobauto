export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
}

export class RateLimiter {
  private static requests = new Map<string, number[]>();

  static checkLimit(key: string, maxRequests = 30, windowSeconds = 60): RateLimitResult {
    const now = Date.now();
    const windowMs = windowSeconds * 1000;
    const timestamps = this.requests.get(key) || [];

    // Filter out expired timestamps
    const validTimestamps = timestamps.filter((t) => now - t < windowMs);

    if (validTimestamps.length >= maxRequests) {
      const oldest = validTimestamps[0];
      const resetSeconds = Math.ceil((oldest + windowMs - now) / 1000);
      return {
        allowed: false,
        remaining: 0,
        resetSeconds
      };
    }

    validTimestamps.push(now);
    this.requests.set(key, validTimestamps);

    return {
      allowed: true,
      remaining: maxRequests - validTimestamps.length,
      resetSeconds: windowSeconds
    };
  }
}

export class EntitlementService {
  static checkFeatureAccess(
    tier: 'FREE' | 'PRO' | 'AUTOPILOT',
    feature: 'ai_generation' | 'bulk_queue' | 'interview_prep' | 'direct_api'
  ): { allowed: boolean; reason?: string } {
    if (tier === 'AUTOPILOT') {
      return { allowed: true };
    }

    if (tier === 'PRO') {
      if (feature === 'direct_api') {
        return { allowed: false, reason: 'Direct API Submissions require the Autopilot plan.' };
      }
      return { allowed: true };
    }

    // FREE TIER RESTRICTIONS
    if (feature === 'bulk_queue' || feature === 'direct_api') {
      return { allowed: false, reason: 'Bulk review queue and direct API submissions require Pro or Autopilot plans.' };
    }

    return { allowed: true };
  }
}
