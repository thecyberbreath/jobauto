import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Briefcase,
  CheckCircle,
  Clock
} from 'lucide-react';

export const MainDashboard: React.FC = () => {
  const {
    candidateProfile,
    jobs,
    applications,
    setActiveView,
    addApplicationFromJob
  } = useApp();



  const [quickSearch, setQuickSearch] = useState('');

  // Calculate real database application counts
  const totalAppliedCount = applications.filter((a) => a.status === 'Applied' || a.status === 'Ready to Apply').length;
  const totalInterviewCount = applications.filter((a) => a.status === 'Interview').length;
  const totalOfferCount = applications.filter((a) => a.status === 'Offer').length;

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView('jobs');
  };

  const topJobs = jobs.slice(0, 4);

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#efe9de] border border-[#e6dfd8] space-y-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#faf9f5] border border-[#e6dfd8] text-[#141413] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#cc785c]" />
            <span>AI-Powered Career Platform</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl text-[#141413]">
            Find your next job faster.
          </h1>
          <p className="text-xs sm:text-sm text-[#3d3d3a] max-w-xl leading-relaxed">
            Welcome, {candidateProfile.name}. Search live software engineering listings, optimize your resume, and track your applications in one simple workspace.
          </p>
        </div>

        {/* Quick Search Bar */}
        <form onSubmit={handleQuickSearchSubmit} className="flex items-center gap-2 max-w-xl pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#6c6a64] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              placeholder="Search jobs — e.g. React Developer, Node.js, Full Stack..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#faf9f5] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c] placeholder:text-[#6c6a64]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-semibold shadow-sm transition-all whitespace-nowrap"
          >
            Search Jobs
          </button>
        </form>
      </div>

      {/* Main Grid: Application Stats & Resume Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Applications Count Widget */}
        <div
          onClick={() => setActiveView('tracker')}
          className="p-5 rounded-2xl bg-[#faf9f5] border border-[#e6dfd8] hover:border-[#cc785c] cursor-pointer space-y-3 transition-all"
        >
          <div className="flex items-center justify-between text-[#6c6a64]">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Applied</span>
            <Briefcase className="w-4 h-4 text-[#cc785c]" />
          </div>
          <div className="font-serif-display text-4xl text-[#141413]">{totalAppliedCount}</div>
          <p className="text-xs text-[#6c6a64]">
            {totalAppliedCount === 0 ? 'No applications tracked yet' : `${totalAppliedCount} applications submitted`}
          </p>
        </div>

        {/* Interviews Widget */}
        <div
          onClick={() => setActiveView('tracker')}
          className="p-5 rounded-2xl bg-[#faf9f5] border border-[#e6dfd8] hover:border-[#cc785c] cursor-pointer space-y-3 transition-all"
        >
          <div className="flex items-center justify-between text-[#6c6a64]">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Interviews</span>
            <Clock className="w-4 h-4 text-[#5db872]" />
          </div>
          <div className="font-serif-display text-4xl text-[#141413]">{totalInterviewCount}</div>
          <p className="text-xs text-[#6c6a64]">
            {totalInterviewCount === 0 ? 'No active interviews scheduled' : `${totalInterviewCount} interviews in progress`}
          </p>
        </div>

        {/* Offers Widget */}
        <div
          onClick={() => setActiveView('tracker')}
          className="p-5 rounded-2xl bg-[#faf9f5] border border-[#e6dfd8] hover:border-[#cc785c] cursor-pointer space-y-3 transition-all"
        >
          <div className="flex items-center justify-between text-[#6c6a64]">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider">Offers</span>
            <CheckCircle className="w-4 h-4 text-[#5db8a6]" />
          </div>
          <div className="font-serif-display text-4xl text-[#141413]">{totalOfferCount}</div>
          <p className="text-xs text-[#6c6a64]">
            {totalOfferCount === 0 ? 'No offers received yet' : `${totalOfferCount} offers received`}
          </p>
        </div>
      </div>

      {/* Resume Status Card */}
      <div className="p-5 rounded-2xl bg-[#faf9f5] border border-[#e6dfd8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-[#efe9de] text-[#cc785c] border border-[#e6dfd8]">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif-display text-base text-[#141413]">Current Resume: Senior Software Engineer</h4>
            <p className="text-xs text-[#6c6a64] mt-0.5 font-mono">
              ATS Score: <span className="font-bold text-[#5db872]">71%</span> • {candidateProfile.skills.length} extracted technical skills
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveView('resume')}
          className="px-4 py-2 rounded-xl bg-[#efe9de] hover:bg-[#e8e0d2] border border-[#e6dfd8] text-[#141413] text-xs font-medium transition-all shrink-0"
        >
          Optimize Resume
        </button>
      </div>

      {/* Recommended Jobs Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-display text-xl text-[#141413]">Recommended Opportunities</h3>
          <button
            onClick={() => setActiveView('jobs')}
            className="text-xs font-mono font-semibold text-[#cc785c] hover:underline flex items-center space-x-1"
          >
            <span>View All Jobs</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {topJobs.length === 0 ? (
          <div className="py-12 text-center bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl space-y-3">
            <Search className="w-6 h-6 text-[#6c6a64] mx-auto" />
            <p className="text-xs text-[#6c6a64]">No job recommendations saved yet. Start searching to discover roles.</p>
            <button
              onClick={() => setActiveView('jobs')}
              className="px-4 py-2 rounded-xl bg-[#cc785c] text-white text-xs font-medium"
            >
              Search Live Jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topJobs.map((job) => {
              return (
                <div
                  key={job.id}
                  className="bg-[#faf9f5] border border-[#e6dfd8] hover:border-[#cc785c] rounded-2xl p-5 space-y-3 transition-all"
                >

                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif-display text-base text-[#141413]">{job.title}</h4>
                      <p className="text-xs text-[#6c6a64]">{job.company} • {job.location}</p>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#cc785c]/10 text-[#cc785c]">
                      {job.matchDetails.overallScore}% Match
                    </span>
                  </div>

                  <p className="text-xs text-[#3d3d3a] line-clamp-2 leading-relaxed">{job.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#e6dfd8]">
                    <span className="text-xs font-mono text-[#6c6a64]">{job.salaryRange}</span>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => addApplicationFromJob(job)}
                      className="text-xs font-semibold text-[#cc785c] hover:underline flex items-center space-x-1"
                    >
                      <span>Open & Apply</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
