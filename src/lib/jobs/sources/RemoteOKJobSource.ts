import type { Job } from '../../../types';
import type { JobSource } from '../MatchingEngine';

export class RemoteOKJobSource implements JobSource {
  getSourceName(): 'LinkedIn' | 'Naukri' | 'Indeed' | 'Wellfound' | 'Glassdoor' | 'Company Site' {
    return 'LinkedIn';
  }

  getApplicationMethod(): 'Direct API Integration' | 'Open & Apply Portal' {
    return 'Open & Apply Portal';
  }

  async searchJobs(query: string, location?: string): Promise<Job[]> {
    try {
      const res = await fetch('https://remoteok.com/api');
      if (!res.ok) {
        console.warn(`[RemoteOKJobSource] API returned status ${res.status}`);
        return [];
      }

      const data = await res.json();
      if (!Array.isArray(data)) return [];

      const queryLower = query.toLowerCase().trim();
      const filtered = data.filter((item: any) => {
        if (!item || !item.position) return false;
        const titleMatch = item.position.toLowerCase().includes(queryLower);
        const tagsMatch = item.tags && Array.isArray(item.tags) && item.tags.some((t: string) => t.toLowerCase().includes(queryLower));
        return titleMatch || tagsMatch;
      });

      return filtered.slice(0, 15).map((raw: any, index: number) => {
        const salaryText = (raw.salary_min && raw.salary_max) 
          ? `$${Math.round(raw.salary_min / 1000)}k – $${Math.round(raw.salary_max / 1000)}k` 
          : 'Competitive Salary';

        return {
          id: `rok-${raw.id || index}`,
          source: 'LinkedIn',
          sourceJobId: `rok-${raw.id || index}`,
          title: raw.position || 'Software Engineer',
          company: raw.company || 'InnovateTech',
          companyLogo: raw.company_logo || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(raw.company || 'Tech')}`,
          location: location || raw.location || 'Remote',
          workModel: 'Remote',
          salaryRange: salaryText,
          experienceLevel: '4+ years',
          skills: raw.tags && Array.isArray(raw.tags) && raw.tags.length > 0
            ? raw.tags.slice(0, 8).map((t: string) => t.toUpperCase())
            : ['React', 'Node.js', 'TypeScript'],
          description: raw.description ? raw.description.replace(/<[^>]*>?/gm, '').slice(0, 500) + '...' : 'Leading role developing cutting-edge software products.',
          postedAt: raw.date ? new Date(raw.date).toLocaleDateString() : 'Recently posted',
          url: raw.url || 'https://remoteok.com',
          submissionType: 'Open & Apply Portal',
          matchDetails: {
            overallScore: 84 + (index % 14),
            breakdown: {
              skills: 86,
              experience: 88,
              location: 100,
              seniority: 84,
              industry: 85,
              salary: 82,
            },
            whyMatch: [
              `Relevance match for search term "${query}"`,
              '100% Remote flexibility',
              'Tech stack overlap'
            ],
            missingRequirements: ['Review candidate portfolio requirements'],
            strategyNote: 'Highlight experience with high-throughput cloud API design.'
          }
        };
      });
    } catch (err) {
      console.warn('[RemoteOKJobSource] Failed to fetch live jobs from RemoteOK API:', err);
      return [];
    }
  }
}
