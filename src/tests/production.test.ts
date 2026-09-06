import { describe, it, expect } from 'vitest';
import { JobMatchingEngine, JobDeduplicator } from '../lib/jobs/MatchingEngine';
import { FreeFallbackAIProvider } from '../lib/ai/providers/FreeFallbackAIProvider';
import { ResumeParser } from '../lib/parser/ResumeParser';
import { RateLimiter, EntitlementService } from '../lib/security/EntitlementService';
import { initialCandidateProfile, initialJobs } from '../mock/mockData';

describe('Production Architecture Test Suite', () => {
  
  it('1. Deterministic Job Matching Engine calculates exact weighted formula', () => {
    const job = initialJobs[0];
    const match = JobMatchingEngine.calculateDeterministicMatch(initialCandidateProfile, job);

    expect(match.overallScore).toBeGreaterThanOrEqual(80);
    expect(match.skillsScore).toBeGreaterThan(0);
    expect(match.matchedSkills.length).toBeGreaterThan(0);
    expect(match.explanation.length).toBeGreaterThan(0);
  });

  it('2. Job Deduplication generates deterministic fingerprints', () => {
    const fp1 = JobDeduplicator.generateFingerprint('Google', 'Senior Engineer', 'Remote');
    const fp2 = JobDeduplicator.generateFingerprint('Google ', 'Senior Engineer', 'Remote');
    expect(fp1).toBe(fp2);

    const duplicateJobs = [initialJobs[0], { ...initialJobs[0], id: 'dup-1' }];
    const uniqueJobs = JobDeduplicator.deduplicateJobs(duplicateJobs);
    expect(uniqueJobs.length).toBe(1);
  });

  it('3. AI Provider Abstraction generates zero-cost fallback responses', async () => {
    const provider = new FreeFallbackAIProvider();
    expect(provider.getProviderName()).toContain('FreeFallback');

    const result = await provider.generateText('Write a cover letter');
    expect(result.text).toContain('Dear Hiring Committee');
    expect(result.usage.estimatedCostUSD).toBe(0.0);
  });

  it('4. Local Resume Parser extracts skills and years of experience safely', () => {
    const sampleText = `Alex Morgan\nalex@tech.io\nSenior Developer with 6 years of experience in React, TypeScript, Node.js, and AWS.`;
    const parsed = ResumeParser.parseResumeText(sampleText);

    expect(parsed.candidateProfile.email).toBe('alex@tech.io');
    expect(parsed.candidateProfile.yearsOfExperience).toBe(6);
    expect(parsed.candidateProfile.skills).toContain('React');
    expect(parsed.candidateProfile.skills).toContain('TypeScript');
  });

  it('5. RateLimiter & EntitlementService enforce zero-cost security quotas', () => {
    const rateLimitKey = 'user_test_1';
    const firstCheck = RateLimiter.checkLimit(rateLimitKey, 2, 60);
    expect(firstCheck.allowed).toBe(true);

    const freeAccess = EntitlementService.checkFeatureAccess('FREE', 'bulk_queue');
    expect(freeAccess.allowed).toBe(false);

    const proAccess = EntitlementService.checkFeatureAccess('PRO', 'bulk_queue');
    expect(proAccess.allowed).toBe(true);
  });

});
