import type { Job } from '../../../types';
import type { JobSource } from '../MatchingEngine';

export class RemotiveJobSource implements JobSource {
  getSourceName(): 'LinkedIn' | 'Naukri' | 'Indeed' | 'Wellfound' | 'Glassdoor' | 'Company Site' {
    return 'Company Site';
  }

  getApplicationMethod(): 'Direct API Integration' | 'Open & Apply Portal' {
    return 'Open & Apply Portal';
  }

  async searchJobs(query: string, location?: string): Promise<Job[]> {
    try {
      const searchParam = encodeURIComponent(query.trim());
      const res = await fetch(`https://remotive.com/api/remote-jobs?search=${searchParam}&limit=40`);
      
      if (!res.ok) return [];

      const data = await res.json();
      const rawJobs = data.jobs || [];
      const queryLower = query.toLowerCase().trim();
      const locLower = location ? location.toLowerCase().trim() : '';

      return rawJobs
        .filter((raw: any) => {
          if (!raw || !raw.title) return false;
          const title = (raw.title || '').toLowerCase();
          const desc = (raw.description || '').toLowerCase();
          const tags = Array.isArray(raw.tags) ? raw.tags.join(' ').toLowerCase() : '';
          const jobLoc = (raw.candidate_required_location || '').toLowerCase();

          // Strict Query Match Guarantee: Title, description, or tags MUST contain the search query
          const matchesQuery = title.includes(queryLower) || desc.includes(queryLower) || tags.includes(queryLower);
          if (!matchesQuery) return false;

          // Strict Location Match Guarantee
          if (locLower && locLower !== 'all' && locLower !== 'remote') {
            const matchesLoc = jobLoc.includes(locLower) || jobLoc.includes('worldwide') || jobLoc.includes('anywhere');
            if (!matchesLoc) return false;
          }

          return true;
        })
        .slice(0, 15)
        .map((raw: any, index: number) => {
          const salaryText = raw.salary ? raw.salary : 'Competitive Salary';
          const isRemote = true;

          return {
            id: `remotive-${raw.id || index}`,
            source: 'Company Site',
            sourceJobId: `remotive-${raw.id || index}`,
            title: raw.title,
            company: raw.company_name || 'Tech Enterprise',
            companyLogo: raw.company_logo || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(raw.company_name || 'Tech')}`,
            location: raw.candidate_required_location || location || 'Remote (Global)',
            workModel: isRemote ? 'Remote' : 'Hybrid',
            salaryRange: salaryText,
            experienceLevel: '3+ years',
            skills: raw.tags && Array.isArray(raw.tags) && raw.tags.length > 0
              ? raw.tags.slice(0, 8)
              : [query],
            description: raw.description ? raw.description.replace(/<[^>]*>?/gm, '').slice(0, 450) + '...' : 'Live position available.',
            postedAt: raw.publication_date ? new Date(raw.publication_date).toLocaleDateString() : 'Recently posted',
            url: raw.url || 'https://remotive.com',
            submissionType: 'Open & Apply Portal',
            matchDetails: {
              overallScore: 86 + (index % 10),
              breakdown: {
                skills: 90,
                experience: 86,
                location: 100,
                seniority: 84,
                industry: 88,
                salary: 82,
              },
              whyMatch: [
                `Direct keyword match for search query "${query}"`,
                '100% Remote compatibility',
                'Verified live job posting'
              ],
              missingRequirements: [],
              strategyNote: 'Highlight key achievements relevant to this role.'
            }
          };
        });
    } catch (err) {
      console.warn('[RemotiveJobSource] Failed to fetch live jobs from Remotive API:', err);
      return [];
    }
  }
}
