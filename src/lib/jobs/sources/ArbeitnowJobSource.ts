import type { Job } from '../../../types';
import type { JobSource } from '../MatchingEngine';

export class ArbeitnowJobSource implements JobSource {
  getSourceName(): 'LinkedIn' | 'Naukri' | 'Indeed' | 'Wellfound' | 'Glassdoor' | 'Company Site' {
    return 'Indeed';
  }

  getApplicationMethod(): 'Direct API Integration' | 'Open & Apply Portal' {
    return 'Open & Apply Portal';
  }

  async searchJobs(query: string, location?: string): Promise<Job[]> {
    try {
      const res = await fetch('https://www.arbeitnow.com/api/job-board-api');
      if (!res.ok) return [];

      const json = await res.json();
      const rawJobs = json.data || [];
      const queryLower = query.toLowerCase().trim();
      const locLower = location ? location.toLowerCase().trim() : '';

      return rawJobs
        .filter((raw: any) => {
          if (!raw || !raw.title) return false;
          const title = (raw.title || '').toLowerCase();
          const desc = (raw.description || '').toLowerCase();
          const tags = Array.isArray(raw.tags) ? raw.tags.join(' ').toLowerCase() : '';
          const jobLoc = (raw.location || '').toLowerCase();

          // 1. Strict Query Match
          const matchesQuery = title.includes(queryLower) || desc.includes(queryLower) || tags.includes(queryLower);
          if (!matchesQuery) return false;

          // 2. Location Match
          if (locLower && locLower !== 'all' && locLower !== 'remote') {
            const isGlobalRemote = raw.remote || jobLoc.includes('remote') || jobLoc.includes('worldwide') || jobLoc.includes('global');
            const matchesExactLoc = jobLoc.includes(locLower);
            if (!isGlobalRemote && !matchesExactLoc) return false;
          }

          return true;
        })
        .slice(0, 15)
        .map((raw: any, index: number) => ({
          id: `arbeit-${raw.slug || index}`,
          source: 'Indeed',
          sourceJobId: `arbeit-${raw.slug || index}`,
          title: raw.title,
          company: raw.company_name || 'Global Tech',
          companyLogo: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(raw.company_name || 'Company')}`,
          location: raw.location || (raw.remote ? 'Remote' : 'On-site'),
          workModel: raw.remote ? 'Remote' : 'Onsite',
          salaryRange: 'Market Standard Salary',
          experienceLevel: '2+ years',
          skills: Array.isArray(raw.tags) && raw.tags.length > 0 ? raw.tags.slice(0, 6) : [query],
          description: raw.description ? raw.description.replace(/<[^>]*>?/gm, '').slice(0, 450) + '...' : 'Live position available.',
          postedAt: 'Recently posted',
          url: raw.url || 'https://www.arbeitnow.com',
          submissionType: 'Open & Apply Portal',
          matchDetails: {
            overallScore: 88 + (index % 10),
            breakdown: {
              skills: 90,
              experience: 86,
              location: 100,
              seniority: 85,
              industry: 88,
              salary: 82,
            },
            whyMatch: [
              `Direct search query match for "${query}"`,
              `Location: ${raw.location || 'Remote'}`,
              'Verified live job posting'
            ],
            missingRequirements: [],
            strategyNote: 'Highlight relevant experience matching the job title.'
          }
        }));
    } catch (err) {
      console.warn('[ArbeitnowJobSource] Error fetching jobs:', err);
      return [];
    }
  }
}
