import React from 'react';
import { useApp } from '../../context/AppContext';
import type { Job } from '../../types';
import {
  Sparkles,
  Search,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Layers,
  ArrowRight,
  Zap,
  Bookmark,
  Flame
} from 'lucide-react';

export const MainDashboard: React.FC = () => {
  const {
    candidateProfile,
    jobs,
    applications,
    setActiveView,
    setSelectedJob,
    toggleSaveJob,
    savedJobIds,
    addApplicationFromJob
  } = useApp();

  const matchingJobsCount = 127;
  const highMatchJobsCount = jobs.filter((j) => j.matchDetails.overallScore >= 90).length;
  const applicationsSentCount = applications.length;
  const activeInterviewsCount = applications.filter((a) => a.status === 'Interview').length;

  const topMatches = jobs.slice(0, 4);

  return (
    <div className="space-y-6">
      
      {/* Morning Digest Banner in Warm Cream Surface (#efe9de) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#efe9de] border border-[#e6dfd8] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#faf9f5] border border-[#e6dfd8] text-[#141413] text-xs font-mono">
              <Zap className="w-3.5 h-3.5 text-[#cc785c]" />
              <span>AI Job Search Working For You</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl text-[#141413]">
              Good morning, {candidateProfile.name.split(' ')[0]} 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#3d3d3a] max-w-xl">
              We parsed 1,420 new software engineering listings across LinkedIn, Naukri, Vercel & Glassdoor. 23 high-match roles fit your profile perfectly.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setActiveView('jobs')}
              className="px-4 py-2.5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] hover:bg-[#e8e0d2] text-[#141413] text-xs font-medium transition-all"
            >
              Explore All Jobs
            </button>
            <button
              onClick={() => setActiveView('bulk')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium shadow-sm transition-all"
            >
              <Layers className="w-4 h-4" />
              <span>Review Bulk Queue</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveView('jobs')}
          className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] hover:border-[#cc785c] cursor-pointer space-y-2 transition-all"
        >
          <div className="flex items-center justify-between text-[#6c6a64]">
            <span className="text-xs font-medium uppercase font-mono tracking-wider">Matching Jobs</span>
            <Search className="w-4 h-4 text-[#cc785c]" />
          </div>
          <div className="font-serif-display text-3xl text-[#141413]">{matchingJobsCount}</div>
          <p className="text-[11px] text-[#5db872] flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18 new today</span>
          </p>
        </div>

        <div
          onClick={() => setActiveView('jobs')}
          className="p-5 rounded-xl bg-[#efe9de] border border-[#e6dfd8] hover:border-[#cc785c] cursor-pointer space-y-2 transition-all"
        >
          <div className="flex items-center justify-between text-[#6c6a64]">
            <span className="text-xs font-medium uppercase font-mono tracking-wider text-[#cc785c]">High Match (&gt;90%)</span>
            <Flame className="w-4 h-4 text-[#cc785c]" />
          </div>
          <div className="font-serif-display text-3xl text-[#141413]">{highMatchJobsCount}</div>
          <p className="text-[11px] text-[#cc785c] font-mono">Ready for application</p>
        </div>

        <div
          onClick={() => setActiveView('tracker')}
          className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] hover:border-[#cc785c] cursor-pointer space-y-2 transition-all"
        >
          <div className="flex items-center justify-between text-[#6c6a64]">
            <span className="text-xs font-medium uppercase font-mono tracking-wider">Applications Sent</span>
            <CheckCircle2 className="w-4 h-4 text-[#5db8a6]" />
          </div>
          <div className="font-serif-display text-3xl text-[#141413]">{applicationsSentCount}</div>
          <p className="text-[11px] text-[#6c6a64] font-mono">82% response conversion</p>
        </div>

        <div
          onClick={() => setActiveView('interview')}
          className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] hover:border-[#cc785c] cursor-pointer space-y-2 transition-all"
        >
          <div className="flex items-center justify-between text-[#6c6a64]">
            <span className="text-xs font-medium uppercase font-mono tracking-wider text-[#5db872]">Interviews</span>
            <Sparkles className="w-4 h-4 text-[#5db872]" />
          </div>
          <div className="font-serif-display text-3xl text-[#141413]">{activeInterviewsCount}</div>
          <p className="text-[11px] text-[#5db872] font-mono">Next: Sep 8 (Linear)</p>
        </div>
      </div>

      {/* Recommended Jobs Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-display text-2xl text-[#141413] flex items-center space-x-2">
              <span>Top AI Recommended Jobs</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#efe9de] text-[#141413] border border-[#e6dfd8] font-mono font-normal">
                Sorted by AI Match Score
              </span>
            </h3>
            <p className="text-xs text-[#6c6a64] mt-0.5">
              Personalized based on your skills, experience, and remote location preferences.
            </p>
          </div>
          <button
            onClick={() => setActiveView('jobs')}
            className="text-xs text-[#cc785c] hover:underline font-semibold flex items-center space-x-1"
          >
            <span>View All 127 Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topMatches.map((job: Job) => {
            const isSaved = savedJobIds.includes(job.id);
            return (
              <div
                key={job.id}
                className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] hover:border-[#cc785c] space-y-4 flex flex-col justify-between transition-all"
              >
                <div className="space-y-3">
                  {/* Company & Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-10 h-10 rounded-xl bg-[#efe9de] p-1 border border-[#e6dfd8] object-contain"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-[#141413] hover:text-[#cc785c] cursor-pointer" onClick={() => setSelectedJob(job)}>
                            {job.title}
                          </h4>
                        </div>
                        <p className="text-xs text-[#6c6a64] font-medium">{job.company}</p>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="flex flex-col items-end">
                      <div className="px-2.5 py-1 rounded-full bg-[#cc785c] text-white font-bold text-xs font-mono shadow-sm">
                        {job.matchDetails.overallScore}% Match
                      </div>
                      <span className="text-[10px] text-[#6c6a64] font-mono mt-1">{job.source}</span>
                    </div>
                  </div>

                  {/* Metadata Tags */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#3d3d3a] font-mono">
                    <span className="flex items-center space-x-1 bg-[#efe9de] px-2.5 py-1 rounded-md border border-[#e6dfd8]">
                      <MapPin className="w-3 h-3 text-[#6c6a64]" />
                      <span>{job.location}</span>
                    </span>
                    <span className="bg-[#efe9de] px-2.5 py-1 rounded-md border border-[#e6dfd8] text-[#141413]">
                      {job.salaryRange}
                    </span>
                    <span className="bg-[#efe9de] px-2.5 py-1 rounded-md border border-[#e6dfd8] text-[#6c6a64]">
                      {job.experienceLevel}
                    </span>
                  </div>

                  {/* Skill breakdown bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-mono text-[#6c6a64]">
                      <span>Skills Match: <strong className="text-[#5db872]">{job.matchDetails.breakdown.skills}%</strong></span>
                      <span>Exp Match: <strong className="text-[#cc785c]">{job.matchDetails.breakdown.experience}%</strong></span>
                    </div>
                    <div className="w-full bg-[#e6dfd8] h-1.5 rounded-full overflow-hidden flex">
                      <div
                        className="bg-[#5db872] h-full"
                        style={{ width: `${job.matchDetails.breakdown.skills}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-3 border-t border-[#e6dfd8] flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-[#e8a55a]/20 border-[#e8a55a] text-[#141413]'
                          : 'bg-[#faf9f5] border-[#e6dfd8] text-[#6c6a64] hover:text-[#141413]'
                      }`}
                      title={isSaved ? 'Saved' : 'Save Job'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-3 py-1.5 rounded-lg bg-[#efe9de] hover:bg-[#e8e0d2] text-[#141413] text-xs font-medium transition-colors border border-[#e6dfd8]"
                    >
                      View Job
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addApplicationFromJob(job);
                      setActiveView('tracker');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium transition-all shadow-sm"
                  >
                    Prepare Application
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
