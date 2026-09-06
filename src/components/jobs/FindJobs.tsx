import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Job, WorkModel } from '../../types';
import {
  Search,
  MapPin,
  Bookmark,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const FindJobs: React.FC = () => {
  const { jobs, setSelectedJob, toggleSaveJob, savedJobIds, addApplicationFromJob, setActiveView } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [selectedWorkModel, setSelectedWorkModel] = useState<WorkModel>('All');
  const [minScore, setMinScore] = useState<number>(75);

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSource = selectedSource === 'All' || j.source === selectedSource;
    const matchesModel = selectedWorkModel === 'All' || j.workModel === selectedWorkModel;
    const matchesScore = j.matchDetails.overallScore >= minScore;

    return matchesSearch && matchesSource && matchesModel && matchesScore;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e6dfd8]">
        <div>
          <h2 className="font-serif-display text-3xl text-[#141413] flex items-center space-x-2">
            <span>AI Job Discovery Engine</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#5db872]/10 text-[#5db872] border border-[#5db872]/20 font-mono">
              Live Aggregated Feed
            </span>
          </h2>
          <p className="text-xs text-[#6c6a64] mt-1">
            Aggregated and normalized across LinkedIn, Naukri, Wellfound, Indeed & Glassdoor.
          </p>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-4 sm:p-5 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#6c6a64] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role, company, skill (e.g. Next.js, React, Linear, Stripe)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c] transition-all placeholder:text-[#6c6a64]"
          />
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          
          <div>
            <label className="block text-[11px] font-mono text-[#6c6a64] mb-1">Job Network Source</label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full px-3 py-2 bg-[#efe9de] border border-[#e6dfd8] rounded-lg text-[#141413] focus:outline-none focus:border-[#cc785c] font-mono"
            >
              <option value="All">All Networks (6 Sources)</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Naukri">Naukri</option>
              <option value="Wellfound">Wellfound</option>
              <option value="Indeed">Indeed</option>
              <option value="Glassdoor">Glassdoor</option>
              <option value="Company Site">Direct Company Site</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-[#6c6a64] mb-1">Work Model</label>
            <select
              value={selectedWorkModel}
              onChange={(e) => setSelectedWorkModel(e.target.value as WorkModel)}
              className="w-full px-3 py-2 bg-[#efe9de] border border-[#e6dfd8] rounded-lg text-[#141413] focus:outline-none focus:border-[#cc785c] font-mono"
            >
              <option value="All">All Work Models</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">On-site</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-[#6c6a64] mb-1">
              Minimum Match Score: <strong className="text-[#cc785c]">{minScore}%</strong>
            </label>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full accent-[#cc785c] cursor-pointer mt-2"
            />
          </div>

          <div className="flex items-end justify-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSource('All');
                setSelectedWorkModel('All');
                setMinScore(75);
              }}
              className="w-full py-2 text-center text-[#6c6a64] hover:text-[#141413] underline font-mono text-[11px]"
            >
              Reset Filters
            </button>
          </div>

        </div>
      </div>

      {/* Jobs Feed Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#6c6a64] font-mono">
          <span>Showing <strong>{filteredJobs.length}</strong> matching job postings</span>
          <span>Deduplicated & verified</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.map((job: Job) => {
            const isSaved = savedJobIds.includes(job.id);
            return (
              <div
                key={job.id}
                className="p-5 sm:p-6 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] hover:border-[#cc785c] space-y-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  
                  {/* Left Logo + Details */}
                  <div className="flex items-start space-x-4">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-12 h-12 rounded-xl bg-[#efe9de] p-1.5 border border-[#e6dfd8] shrink-0 object-contain"
                    />
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          onClick={() => setSelectedJob(job)}
                          className="text-base font-bold text-[#141413] hover:text-[#cc785c] cursor-pointer transition-colors"
                        >
                          {job.title}
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#efe9de] text-[#141413] border border-[#e6dfd8] font-mono">
                          {job.source}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-[#3d3d3a]">{job.company}</p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#6c6a64] pt-1 font-mono">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-[#6c6a64]" />
                          <span>{job.location}</span>
                        </span>
                        <span>•</span>
                        <span className="text-[#141413] font-semibold">{job.salaryRange}</span>
                        <span>•</span>
                        <span>{job.experienceLevel}</span>
                        <span>•</span>
                        <span className="text-[#6c6a64]">Posted {job.postedAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Match Breakdown Badge */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <div className="flex flex-col items-end">
                      <div className="px-3 py-1 rounded-full bg-[#cc785c] text-white font-bold text-xs font-mono shadow-sm">
                        {job.matchDetails.overallScore}% AI Match
                      </div>
                      <span className="text-[10px] text-[#5db872] font-mono mt-1">
                        Skills: {job.matchDetails.breakdown.skills}%
                      </span>
                    </div>

                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#efe9de] border border-[#e6dfd8] text-[#6c6a64] font-mono">
                      {job.submissionType}
                    </span>
                  </div>

                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-md bg-[#efe9de] border border-[#e6dfd8] text-[#141413] text-[11px] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-3 border-t border-[#e6dfd8] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2 rounded-lg border text-xs font-semibold flex items-center space-x-1 transition-colors ${
                        isSaved
                          ? 'bg-[#e8a55a]/20 border-[#e8a55a] text-[#141413]'
                          : 'bg-[#faf9f5] border-[#e6dfd8] text-[#6c6a64] hover:text-[#141413]'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>

                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-3.5 py-2 rounded-lg bg-[#efe9de] hover:bg-[#e8e0d2] text-[#141413] text-xs font-medium border border-[#e6dfd8] transition-colors"
                    >
                      View Details & Match Breakdown
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        addApplicationFromJob(job);
                        setActiveView('tracker');
                      }}
                      className="px-4 py-2 rounded-lg bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium shadow-sm transition-all flex items-center space-x-1.5"
                    >
                      <span>Prepare Application</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {job.submissionType === 'Direct API Integration' ? (
                      <span className="text-[11px] text-[#5db872] font-mono flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Direct API</span>
                      </span>
                    ) : (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-[#efe9de] border border-[#e6dfd8] text-[#6c6a64] hover:text-[#141413]"
                        title="Open external job portal"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
