import type { Job, CandidateProfile } from '../../types';

export interface JobSource {
  getSourceName(): 'LinkedIn' | 'Naukri' | 'Indeed' | 'Wellfound' | 'Glassdoor' | 'Company Site';
  searchJobs(query: string): Promise<Job[]>;
  getApplicationMethod(): 'Direct API Integration' | 'Open & Apply Portal';
}

export interface DeterministicMatchScore {
  overallScore: number;
  skillsScore: number;
  experienceScore: number;
  roleScore: number;
  locationScore: number;
  seniorityScore: number;
  salaryScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  explanation: string[];
}

export class JobDeduplicator {
  static generateFingerprint(company: string, title: string, location: string): string {
    const raw = `${company.toLowerCase().trim()}_${title.toLowerCase().trim()}_${location.toLowerCase().trim()}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    return `fp_${Math.abs(hash)}`;
  }

  static deduplicateJobs(jobs: Job[]): Job[] {
    const seen = new Set<string>();
    const unique: Job[] = [];

    for (const job of jobs) {
      const fp = this.generateFingerprint(job.company, job.title, job.location);
      if (!seen.has(fp)) {
        seen.add(fp);
        unique.push(job);
      }
    }

    return unique;
  }
}

export class JobMatchingEngine {
  static calculateDeterministicMatch(candidate: CandidateProfile, job: Job): DeterministicMatchScore {
    // 1. Skills Score (35%)
    const candidateSkillsLower = new Set(candidate.skills.map((s) => s.toLowerCase()));


    const matchedSkills = job.skills.filter((s) => candidateSkillsLower.has(s.toLowerCase()));
    const missingSkills = job.skills.filter((s) => !candidateSkillsLower.has(s.toLowerCase()));

    const skillsScore = job.skills.length > 0
      ? Math.min(100, Math.round((matchedSkills.length / job.skills.length) * 100))
      : 85;

    // 2. Experience Score (20%)
    const requiredYears = parseFloat(job.experienceLevel) || 4.0;
    const expDiff = candidate.yearsOfExperience - requiredYears;
    let experienceScore = 100;
    if (expDiff < 0) {
      experienceScore = Math.max(50, 100 + Math.round(expDiff * 20));
    }

    // 3. Role Similarity Score (20%)
    const candidateRolesLower = candidate.targetRoles.map((r) => r.toLowerCase());
    const jobTitleLower = job.title.toLowerCase();
    const roleScore = candidateRolesLower.some((r) => jobTitleLower.includes(r) || r.includes(jobTitleLower))
      ? 95
      : 80;

    // 4. Location Match (10%)
    let locationScore = 80;
    if (candidate.workModelPreference === 'Remote' && job.workModel === 'Remote') {
      locationScore = 100;
    } else if (job.location.toLowerCase().includes(candidate.preferredLocation.toLowerCase())) {
      locationScore = 95;
    }

    // 5. Seniority Score (10%)
    let seniorityScore = 90;
    if (candidate.yearsOfExperience >= 5 && (job.title.includes('Senior') || job.title.includes('Lead'))) {
      seniorityScore = 96;
    }

    // 6. Salary Expectation Score (5%)
    const salaryScore = 90;

    // Weighted Overall Formula:
    // Skills 35%, Experience 20%, Role 20%, Location 10%, Seniority 10%, Salary 5%
    const overallScore = Math.round(
      skillsScore * 0.35 +
      experienceScore * 0.20 +
      roleScore * 0.20 +
      locationScore * 0.10 +
      seniorityScore * 0.10 +
      salaryScore * 0.05
    );

    const explanation = [
      `${matchedSkills.length}/${job.skills.length} required core skills matched`,
      `${candidate.yearsOfExperience} years of experience vs ${job.experienceLevel} required`,
      `${locationScore}% location and work model preference alignment`
    ];

    return {
      overallScore,
      skillsScore,
      experienceScore,
      roleScore,
      locationScore,
      seniorityScore,
      salaryScore,
      matchedSkills,
      missingSkills,
      explanation
    };
  }
}
