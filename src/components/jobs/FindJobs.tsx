import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import type { Job, WorkModel } from '../../types';
import { JobSourceManager } from '../../lib/jobs/JobSourceManager';
import {
  Search,
  MapPin,
  Bookmark,
  ExternalLink,
  Loader2,
  AlertCircle,
  Filter,
  Sparkles
} from 'lucide-react';


export const FindJobs: React.FC = () => {
  const { candidateProfile, setSelectedJob, toggleSaveJob, savedJobIds, addApplicationFromJob, setActiveView } = useApp();

  const [searchQuery, setSearchQuery] = useState('React Developer');
  const [locationQuery, setLocationQuery] = useState('Remote');
  const [selectedWorkModel, setSelectedWorkModel] = useState<WorkModel>('All');
  const [realJobs, setRealJobs] = useState<Job[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);
    setHasSearched(true);

    try {
      const results = await JobSourceManager.fetchRealJobs(searchQuery, candidateProfile, locationQuery);
      setRealJobs(results);
    } catch (err: any) {
      console.error('[FindJobs] Error fetching jobs:', err);
      setSearchError('Unable to fetch live jobs right now. Please verify your connection and try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Perform initial search on mount
  useEffect(() => {
    handleSearch();
  }, []);

  const filteredJobs = realJobs.filter((j) => {
    const matchesModel = selectedWorkModel === 'All' || j.workModel === selectedWorkModel;
    return matchesModel;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e6dfd8]">
        <div>
          <h2 className="font-serif-display text-3xl text-[#141413] flex items-center space-x-2">
            <span>Find Jobs</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#5db872]/10 text-[#5db872] border border-[#5db872]/20 font-mono">
              Live APIs
            </span>
          </h2>
          <p className="text-xs text-[#6c6a64] mt-1">
            Search normalized, deduplicated tech jobs directly from live job feeds.
          </p>
        </div>
      </div>

      {/* Primary Search Controls Box */}
      <form onSubmit={handleSearch} className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
        
        {/* Search Query Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="relative md:col-span-6">
            <Search className="w-4 h-4 text-[#6c6a64] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs — e.g. React Developer, Full Stack, Product Engineer..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c] transition-all placeholder:text-[#6c6a64]"
            />
          </div>

          <div className="relative md:col-span-4">
            <MapPin className="w-4 h-4 text-[#6c6a64] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Location — e.g. Delhi, Remote, San Francisco..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c] transition-all placeholder:text-[#6c6a64]"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSearching}
              className="w-full h-full min-h-[38px] flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Jobs</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-[#e6dfd8]/60 text-xs gap-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 text-[#6c6a64]">
              <Filter className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] uppercase">Work Model:</span>
            </div>
            <select
              value={selectedWorkModel}
              onChange={(e) => setSelectedWorkModel(e.target.value as WorkModel)}
              className="px-3 py-1.5 bg-[#efe9de] border border-[#e6dfd8] rounded-lg text-[#141413] focus:outline-none focus:border-[#cc785c] font-mono text-xs"
            >
              <option value="All">All Models</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">On-site</option>
            </select>
          </div>

          {hasSearched && !isSearching && (
            <div className="font-mono text-[11px] text-[#6c6a64]">
              Showing <span className="font-bold text-[#141413]">{filteredJobs.length}</span> live matching opportunities
            </div>
          )}
        </div>
      </form>

      {/* Error Alert */}
      {searchError && (
        <div className="p-4 rounded-xl bg-[#c64545]/10 border border-[#c64545]/20 text-[#c64545] flex items-center space-x-3 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{searchError}</span>
        </div>
      )}

      {/* Real Loading Spinner */}
      {isSearching && (
        <div className="py-16 text-center space-y-3 bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#cc785c]" />
          <h4 className="font-serif-display text-lg text-[#141413]">Fetching Real Jobs from Live Feeds...</h4>
          <p className="text-xs text-[#6c6a64]">Aggregating, normalizing, and calculating AI match scores...</p>
        </div>
      )}

      {/* Empty Search Results State */}
      {!isSearching && hasSearched && filteredJobs.length === 0 && !searchError && (
        <div className="py-16 text-center space-y-3 bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl">
          <Search className="w-8 h-8 mx-auto text-[#6c6a64]/50" />
          <h4 className="font-serif-display text-lg text-[#141413]">No matching jobs found</h4>
          <p className="text-xs text-[#6c6a64]">Try broadening your search term (e.g., "Developer", "Engineer", or "Frontend").</p>
        </div>
      )}

      {/* Real Jobs Grid */}
      {!isSearching && filteredJobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => {
            const isSaved = savedJobIds.includes(job.id);
            const score = job.matchDetails.overallScore;

            return (
              <div
                key={job.id}
                className="group relative bg-[#faf9f5] border border-[#e6dfd8] hover:border-[#cc785c] rounded-2xl p-5 space-y-4 transition-all hover:shadow-md"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-10 h-10 rounded-xl bg-[#efe9de] border border-[#e6dfd8] p-1 object-contain"
                    />
                    <div>
                      <h4 className="font-serif-display text-lg text-[#141413] group-hover:text-[#cc785c] transition-colors leading-snug">
                        {job.title}
                      </h4>
                      <p className="text-xs text-[#6c6a64] font-medium">{job.company}</p>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="shrink-0 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#cc785c]/10 text-[#cc785c] border border-[#cc785c]/20 font-mono text-xs font-bold">
                    <Sparkles className="w-3 h-3" />
                    <span>{score}% Match</span>
                  </div>
                </div>

                {/* Job Attributes Bar */}
                <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#6c6a64]">
                  <span className="px-2 py-0.5 rounded-md bg-[#efe9de] border border-[#e6dfd8] flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-[#cc785c]" />
                    <span>{job.location}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#efe9de] border border-[#e6dfd8]">
                    {job.workModel}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#efe9de] border border-[#e6dfd8]">
                    {job.salaryRange}
                  </span>
                </div>

                {/* Description Snippet */}
                <p className="text-xs text-[#3d3d3a] line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skills.slice(0, 5).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#e8e0d2] text-[#252523] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-3 border-t border-[#e6dfd8] flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2 rounded-lg border text-xs transition-all ${
                        isSaved
                          ? 'bg-[#cc785c] text-white border-[#cc785c]'
                          : 'bg-[#efe9de] text-[#6c6a64] border-[#e6dfd8] hover:text-[#141413]'
                      }`}
                      title={isSaved ? 'Saved to bookmarks' : 'Save job'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setActiveView('resume');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#efe9de] hover:bg-[#e8e0d2] border border-[#e6dfd8] text-[#141413] text-xs font-medium transition-all"
                    >
                      Tailor Resume
                    </button>
                  </div>

                  <a
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => addApplicationFromJob(job)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <span>Open & Apply</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
