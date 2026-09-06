import { supabase } from './supabase';

export interface NormalizedJob {
  title: string;
  company: string;
  location: string;
  salary: string;
  salary_min?: number;
  salary_max?: number;
  description: string;
  platform: 'Adzuna' | 'JSearch' | 'LinkedIn' | 'Indeed' | 'Wellfound' | 'Naukri' | 'Company';
  apply_url: string;
  posted_at: string;
  domain?: string;
}

export class JobFetcher {
  static generateUrlHash(url: string): string {
    let hash = 0;
    const str = url.toLowerCase().trim();
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return `hash_${Math.abs(hash)}`;
  }

  static extractDomain(company: string, url: string): string {
    try {
      if (url && url.startsWith('http')) {
        const hostname = new URL(url).hostname.replace('www.', '');
        if (!hostname.includes('remotive') && !hostname.includes('arbeitnow') && !hostname.includes('remoteok')) {
          return hostname;
        }
      }
    } catch {
      // fallback
    }
    const cleanCompany = company.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${cleanCompany}.com`;
  }

  static async fetchAdzunaJobs(query: string, location?: string): Promise<NormalizedJob[]> {
    try {
      const appId = import.meta.env.ADZUNA_APP_ID || 'b25a3d76';
      const appKey = import.meta.env.ADZUNA_API_KEY || '24e622b7d277ddf40d34fa0a4fa6c5ec';
      const country = location && (location.toLowerCase().includes('india') || location.toLowerCase().includes('delhi')) ? 'in' : 'us';
      
      const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(query)}&where=${encodeURIComponent(location || '')}`;
      const res = await fetch(url);
      if (!res.ok) return [];
      
      const data = await res.json();
      const results = data.results || [];
      
      return results.map((item: any) => ({
        title: item.title ? item.title.replace(/<[^>]*>?/gm, '') : 'Software Role',
        company: item.company?.display_name || 'Enterprise Tech',
        location: item.location?.display_name || location || 'Remote',
        salary: item.salary_min && item.salary_max ? `$${Math.round(item.salary_min)} – $${Math.round(item.salary_max)}` : 'Market Standard',
        salary_min: item.salary_min,
        salary_max: item.salary_max,
        description: item.description ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 500) : '',
        platform: 'Adzuna',
        apply_url: item.redirect_url || 'https://adzuna.com',
        posted_at: item.created ? new Date(item.created).toLocaleDateString() : 'Recent',
        domain: this.extractDomain(item.company?.display_name || 'tech', item.redirect_url)
      }));
    } catch (err) {
      console.warn('[JobFetcher] Adzuna fetch failed:', err);
      return [];
    }
  }

  static async fetchArbeitnowJobs(query: string, location?: string): Promise<NormalizedJob[]> {
    try {
      const res = await fetch('https://www.arbeitnow.com/api/job-board-api');
      if (!res.ok) return [];

      const json = await res.json();
      const rawJobs = json.data || [];
      const queryLower = query.toLowerCase().trim();
      const locLower = (location || '').toLowerCase().trim();

      return rawJobs
        .filter((raw: any) => {
          const title = (raw.title || '').toLowerCase();
          const desc = (raw.description || '').toLowerCase();
          const rawLoc = (raw.location || '').toLowerCase();
          const matchesQuery = !queryLower || title.includes(queryLower) || desc.includes(queryLower);
          const matchesLoc = !locLower || rawLoc.includes(locLower);
          return matchesQuery && matchesLoc;
        })
        .slice(0, 10)
        .map((raw: any) => ({
          title: raw.title,
          company: raw.company_name || 'Tech Company',
          location: raw.location || 'Remote',
          salary: 'Market Standard',
          description: raw.description ? raw.description.replace(/<[^>]*>?/gm, '').slice(0, 500) : '',
          platform: 'Indeed',
          apply_url: raw.url || 'https://www.arbeitnow.com',
          posted_at: 'Recent',
          domain: this.extractDomain(raw.company_name || 'tech', raw.url)
        }));
    } catch (err) {
      console.warn('[JobFetcher] Arbeitnow fetch failed:', err);
      return [];
    }
  }

  static async fetchRemotiveJobs(query: string): Promise<NormalizedJob[]> {
    try {
      const res = await fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}&limit=15`);
      if (!res.ok) return [];

      const data = await res.json();
      const rawJobs = data.jobs || [];

      return rawJobs.map((raw: any) => ({
        title: raw.title,
        company: raw.company_name || 'Tech Innovators',
        location: raw.candidate_required_location || 'Remote',
        salary: raw.salary || 'Competitive',
        description: raw.description ? raw.description.replace(/<[^>]*>?/gm, '').slice(0, 500) : '',
        platform: 'Company',
        apply_url: raw.url || 'https://remotive.com',
        posted_at: raw.publication_date ? new Date(raw.publication_date).toLocaleDateString() : 'Recent',
        domain: this.extractDomain(raw.company_name || 'tech', raw.url)
      }));
    } catch (err) {
      console.warn('[JobFetcher] Remotive fetch failed:', err);
      return [];
    }
  }

  static async aggregateAndSaveJobs(query: string, location?: string): Promise<NormalizedJob[]> {
    const [adzuna, arbeitnow, remotive] = await Promise.all([
      this.fetchAdzunaJobs(query, location),
      this.fetchArbeitnowJobs(query, location),
      this.fetchRemotiveJobs(query),
    ]);

    const combined = [...adzuna, ...arbeitnow, ...remotive];
    
    // Deduplicate by apply_url_hash
    const seen = new Set<string>();
    const unique: NormalizedJob[] = [];

    for (const job of combined) {
      const hash = this.generateUrlHash(job.apply_url);
      if (!seen.has(hash)) {
        seen.add(hash);
        unique.push(job);
      }
    }

    // Optionally save to Supabase jobs table in background
    if (unique.length > 0) {
      try {
        const recordsToUpsert = unique.map((j) => ({
          title: j.title,
          company: j.company,
          location: j.location,
          description: j.description,
          salary_min: j.salary_min || null,
          salary_max: j.salary_max || null,
          platform: j.platform,
          apply_url: j.apply_url,
          apply_url_hash: this.generateUrlHash(j.apply_url),
          posted_at: new Date().toISOString()
        }));

        await supabase.from('jobs').upsert(recordsToUpsert, { onConflict: 'apply_url_hash' });
      } catch (err) {
        console.warn('[JobFetcher] Supabase jobs upsert warning:', err);
      }
    }

    return unique;
  }
}
