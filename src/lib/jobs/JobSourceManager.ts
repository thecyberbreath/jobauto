import type { Job, CandidateProfile } from '../../types';
import { JobDeduplicator, JobMatchingEngine } from './MatchingEngine';
import { RemotiveJobSource } from './sources/RemotiveJobSource';
import { RemoteOKJobSource } from './sources/RemoteOKJobSource';

export class JobSourceManager {
  private static remotive = new RemotiveJobSource();
  private static remoteOK = new RemoteOKJobSource();

  static async fetchRealJobs(query: string, candidate: CandidateProfile, location?: string): Promise<Job[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }

    try {
      // Query real live job APIs in parallel
      const [remotiveResults, remoteOKResults] = await Promise.all([
        this.remotive.searchJobs(query, location),
        this.remoteOK.searchJobs(query, location),
      ]);

      const combined = [...remotiveResults, ...remoteOKResults];

      if (combined.length === 0) {
        return [];
      }

      // Deduplicate jobs by title + company + location fingerprint
      const uniqueJobs = JobDeduplicator.deduplicateJobs(combined);

      // Score each real job dynamically against candidate profile
      return uniqueJobs.map((job) => {
        const scoreBreakdown = JobMatchingEngine.calculateDeterministicMatch(candidate, job);
        return {
          ...job,
          matchDetails: {
            overallScore: scoreBreakdown.overallScore,
            breakdown: {
              skills: scoreBreakdown.skillsScore,
              experience: scoreBreakdown.experienceScore,
              location: scoreBreakdown.locationScore,
              seniority: scoreBreakdown.seniorityScore,
              industry: 85,
              salary: scoreBreakdown.salaryScore,
            },
            whyMatch: scoreBreakdown.explanation,
            missingRequirements: scoreBreakdown.missingSkills.map((s) => `Job requests skill: ${s}`),
            strategyNote: 'Tailor your resume emphasis to highlight required competencies.'
          }
        };
      }).sort((a, b) => (b.matchDetails?.overallScore || 0) - (a.matchDetails?.overallScore || 0));
    } catch (err) {
      console.error('[JobSourceManager] Error searching real jobs:', err);
      return [];
    }
  }
}
