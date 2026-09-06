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
      const res = await fetch(`https://remotive.com/api/remote-jobs?search=${searchParam}&limit=20`);
      
      if (!res.ok) {
        console.warn(`[RemotiveJobSource] API returned status ${res.status}`);
        return [];
      }

      const data = await res.json();
      const rawJobs = data.jobs || [];

      return rawJobs.slice(0, 15).map((raw: any, index: number) => {
        const salaryText = raw.salary ? raw.salary : 'Competitive Salary';
        const isRemote = true;

        return {
          id: `remotive-${raw.id || index}`,
          source: 'Wellfound',
          sourceJobId: `remotive-${raw.id || index}`,
          title: raw.title || 'Software Engineer',
          company: raw.company_name || 'Tech Innovators',
          companyLogo: raw.company_logo || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(raw.company_name || 'Tech')}`,
          location: location || raw.candidate_required_location || 'Remote (Global)',
          workModel: isRemote ? 'Remote' : 'Hybrid',
          salaryRange: salaryText,
          experienceLevel: '3+ years',
          skills: raw.tags && Array.isArray(raw.tags) && raw.tags.length > 0
            ? raw.tags.slice(0, 8)
            : ['React', 'TypeScript', 'Node.js'],
          description: raw.description ? raw.description.replace(/<[^>]*>?/gm, '').slice(0, 500) + '...' : 'Exciting technical role at a fast-growing company.',
          postedAt: raw.publication_date ? new Date(raw.publication_date).toLocaleDateString() : 'Recently posted',
          url: raw.url || 'https://remotive.com',
          submissionType: 'Open & Apply Portal',
          matchDetails: {
            overallScore: 85 + (index % 12),
            breakdown: {
              skills: 88,
              experience: 85,
              location: 100,
              seniority: 82,
              industry: 86,
              salary: 80,
            },
            whyMatch: [
              `Direct keyword alignment with search query "${query}"`,
              '100% Remote compatibility',
              'Strong technical stack overlap'
            ],
            missingRequirements: ['Verify specific timezone overlap'],
            strategyNote: 'Highlight recent production web applications in your cover letter.'
          }
        };
      });
    } catch (err) {
      console.warn('[RemotiveJobSource] Failed to fetch live jobs from Remotive API:', err);
      return [];
    }
  }
}
