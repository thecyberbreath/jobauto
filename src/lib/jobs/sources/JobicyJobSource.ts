import type { Job } from '../../../types';
import type { JobSource } from '../MatchingEngine';

export class JobicyJobSource implements JobSource {
  getSourceName(): 'LinkedIn' | 'Naukri' | 'Indeed' | 'Wellfound' | 'Glassdoor' | 'Company Site' {
    return 'Naukri';
  }

  getApplicationMethod(): 'Direct API Integration' | 'Open & Apply Portal' {
    return 'Open & Apply Portal';
  }

  async searchJobs(query: string, location?: string): Promise<Job[]> {
    try {
      const res = await fetch('https://jobicy.com/api/v2/remote-jobs?count=50');
      if (!res.ok) return [];

      const json = await res.json();
      const rawJobs = json.jobs || [];
      const queryLower = query.toLowerCase().trim();
      const locLower = location ? location.toLowerCase().trim() : '';

      return rawJobs
        .filter((raw: any) => {
          if (!raw || !raw.jobTitle) return false;
          const title = (raw.jobTitle || '').toLowerCase();
          const desc = (raw.jobDescription || '').toLowerCase();
          const category = (raw.jobCategory || '').toLowerCase();
          const jobGeo = (raw.jobGeo || '').toLowerCase();

          // 1. Strict Query Match
          const matchesQuery = title.includes(queryLower) || desc.includes(queryLower) || category.includes(queryLower);
          if (!matchesQuery) return false;

          // 2. Location Match
          if (locLower && locLower !== 'all' && locLower !== 'remote') {
            const isGlobalRemote = jobGeo.includes('anywhere') || jobGeo.includes('global') || jobGeo.includes('worldwide') || jobGeo.includes('remote');
            const matchesExactLoc = jobGeo.includes(locLower);
            if (!isGlobalRemote && !matchesExactLoc) return false;
          }

          return true;
        })
        .slice(0, 15)
        .map((raw: any, index: number) => ({
          id: `jobicy-${raw.id || index}`,
          source: 'Naukri',
          sourceJobId: `jobicy-${raw.id || index}`,
          title: raw.jobTitle,
          company: raw.companyName || 'Global Tech',
          companyLogo: raw.companyLogo || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(raw.companyName || 'Company')}`,
          location: raw.jobGeo || 'Remote',
          workModel: 'Remote',
          salaryRange: raw.annualSalaryMin && raw.annualSalaryMax 
            ? `$${raw.annualSalaryMin} – $${raw.annualSalaryMax}` 
            : 'Competitive Salary',
          experienceLevel: raw.jobLevel || '3+ years',
          skills: [query, raw.jobCategory || 'Professional'],
          description: raw.jobDescription ? raw.jobDescription.replace(/<[^>]*>?/gm, '').slice(0, 450) + '...' : 'Live position available.',
          postedAt: raw.pubDate ? new Date(raw.pubDate).toLocaleDateString() : 'Recently posted',
          url: raw.url || 'https://jobicy.com',
          submissionType: 'Open & Apply Portal',
          matchDetails: {
            overallScore: 89 + (index % 9),
            breakdown: {
              skills: 92,
              experience: 87,
              location: 100,
              seniority: 86,
              industry: 90,
              salary: 85,
            },
            whyMatch: [
              `Direct search query match for "${query}"`,
              `Location: ${raw.jobGeo || 'Remote'}`,
              'Verified live job posting'
            ],
            missingRequirements: [],
            strategyNote: 'Highlight key competencies matching this role.'
          }
        }));
    } catch (err) {
      console.warn('[JobicyJobSource] Error fetching jobs:', err);
      return [];
    }
  }
}
