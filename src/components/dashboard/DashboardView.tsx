import React, { useState, useEffect } from 'react';
import { JobFetcher, type NormalizedJob } from '../../lib/jobFetcher';
import { AutoApplyManager } from '../../lib/autoApply';
import { SearchBar } from '../jobs/SearchBar';
import { JobCard } from '../jobs/JobCard';
import { Loader2, Briefcase, AlertCircle } from 'lucide-react';


interface DashboardViewProps {
  userId?: string;
  userResumeText?: string;
  onApplicationCreated?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ userId = 'demo-user', userResumeText, onApplicationCreated }) => {
  const [jobs, setJobs] = useState<NormalizedJob[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [savedUrls, setSavedUrls] = useState<Set<string>>(new Set());

  const handleSearch = async (query: string, location: string, _remoteOnly: boolean) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setSearched(true);

    try {
      const results = await JobFetcher.aggregateAndSaveJobs(query, location);
      setJobs(results);
      if (results.length === 0) {
        setErrorMessage('No real jobs found for this search. Try broadening your location or search term.');
      }
    } catch (err: any) {
      console.error('[DashboardView] Search error:', err);
      setErrorMessage('Job search is temporarily unavailable. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial search on mount
  useEffect(() => {
    handleSearch('React Developer', 'Remote', true);
  }, []);

  const handleAutoApply = async (job: NormalizedJob) => {
    const tempJobRecord = {
      id: `job-${Date.now()}`,
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      platform: job.platform,
      apply_url: job.apply_url,
      apply_url_hash: JobFetcher.generateUrlHash(job.apply_url)
    };

    await AutoApplyManager.queueApplication(userId, tempJobRecord, userResumeText);
    if (onApplicationCreated) onApplicationCreated();
  };

  const handleSaveToggle = (job: NormalizedJob) => {
    const next = new Set(savedUrls);
    if (next.has(job.apply_url)) {
      next.delete(job.apply_url);
    } else {
      next.add(job.apply_url);
    }
    setSavedUrls(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Search Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <span>Job Feed & Search</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 font-mono">
              Live APIs
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Aggregated and normalized across Adzuna, JSearch, Indeed, LinkedIn & Company portals.
          </p>
        </div>
      </div>

      {/* Search Controls */}
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center space-x-3 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="py-16 text-center space-y-3 bg-white border border-slate-200 rounded-xl shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
          <h4 className="font-semibold text-slate-900 text-base">Fetching Real Jobs from Live API Feeds...</h4>
          <p className="text-xs text-slate-500">Aggregating Adzuna, JSearch, Remotive, and Arbeitnow listings...</p>
        </div>
      )}

      {/* Empty Search State */}
      {!isLoading && searched && jobs.length === 0 && !errorMessage && (
        <div className="py-16 text-center space-y-3 bg-white border border-slate-200 rounded-xl shadow-sm">
          <Briefcase className="w-8 h-8 mx-auto text-slate-300" />
          <h4 className="font-semibold text-slate-900 text-base">No real jobs found for this search</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for another keyword (e.g. "React Developer", "Python", "Data Scientist", "Sales").
          </p>
        </div>
      )}

      {/* Job Cards Grid */}
      {!isLoading && jobs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Showing <strong className="text-slate-900">{jobs.length}</strong> real jobs</span>
            <span>Sorted by relevance & date</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job, idx) => (
              <JobCard
                key={`${job.apply_url}_${idx}`}
                job={job}
                onAutoApply={handleAutoApply}
                onSave={handleSaveToggle}
                isSaved={savedUrls.has(job.apply_url)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
