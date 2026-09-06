import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, CheckCircle2, AlertTriangle, ExternalLink, ArrowRight, FileCheck2, Wand2 } from 'lucide-react';

export const JobDetailsModal: React.FC = () => {
  const { selectedJob, setSelectedJob, addApplicationFromJob, setActiveView } = useApp();

  if (!selectedJob) return null;

  const { matchDetails } = selectedJob;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141413]/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedJob(null)}
          className="absolute top-4 right-4 p-2 text-[#6c6a64] hover:text-[#141413] rounded-lg hover:bg-[#efe9de] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start space-x-4 pb-6 border-b border-[#e6dfd8] pr-8">
          <img
            src={selectedJob.companyLogo}
            alt={selectedJob.company}
            className="w-14 h-14 rounded-xl bg-[#efe9de] p-2 border border-[#e6dfd8] object-contain"
          />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif-display text-2xl text-[#141413]">{selectedJob.title}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#efe9de] text-[#141413] font-mono border border-[#e6dfd8]">
                {selectedJob.source}
              </span>
            </div>
            <p className="text-xs font-semibold text-[#cc785c]">{selectedJob.company} • {selectedJob.location}</p>
            <p className="text-xs text-[#6c6a64] font-mono">{selectedJob.salaryRange} • {selectedJob.experienceLevel}</p>
          </div>
        </div>

        {/* AI Match Score Breakdown Grid */}
        <div className="py-6 border-b border-[#e6dfd8] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#cc785c]" />
              <h4 className="text-sm font-bold text-[#141413] uppercase tracking-wider font-mono">
                AI Match Score Breakdown
              </h4>
            </div>
            <div className="px-3.5 py-1 rounded-full bg-[#cc785c] text-white font-bold text-base font-mono shadow-sm">
              {matchDetails.overallScore}% Overall
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-1">
              <div className="text-[#6c6a64] text-[10px]">Skills Match</div>
              <div className="text-lg font-bold text-[#5db872]">{matchDetails.breakdown.skills}%</div>
            </div>
            <div className="p-3 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-1">
              <div className="text-[#6c6a64] text-[10px]">Experience Match</div>
              <div className="text-lg font-bold text-[#cc785c]">{matchDetails.breakdown.experience}%</div>
            </div>
            <div className="p-3 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-1">
              <div className="text-[#6c6a64] text-[10px]">Location Preference</div>
              <div className="text-lg font-bold text-[#5db8a6]">{matchDetails.breakdown.location}%</div>
            </div>
            <div className="p-3 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-1">
              <div className="text-[#6c6a64] text-[10px]">Seniority Fit</div>
              <div className="text-lg font-bold text-[#141413]">{matchDetails.breakdown.seniority}%</div>
            </div>
            <div className="p-3 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-1">
              <div className="text-[#6c6a64] text-[10px]">Industry Fit</div>
              <div className="text-lg font-bold text-[#3d3d3a]">{matchDetails.breakdown.industry}%</div>
            </div>
            <div className="p-3 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-1">
              <div className="text-[#6c6a64] text-[10px]">Salary Expectation</div>
              <div className="text-lg font-bold text-[#e8a55a]">{matchDetails.breakdown.salary}%</div>
            </div>
          </div>
        </div>

        {/* Why You're A Good Match vs Missing Requirements */}
        <div className="py-6 border-b border-[#e6dfd8] grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Why Match */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-[#5db872] uppercase tracking-wider font-mono flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Why You're A Good Match</span>
            </h5>
            <ul className="space-y-2 text-xs text-[#3d3d3a]">
              {matchDetails.whyMatch.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#5db872] font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Missing Requirements */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-[#e8a55a] uppercase tracking-wider font-mono flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Potential Skill Gaps</span>
            </h5>
            <ul className="space-y-2 text-xs text-[#3d3d3a]">
              {matchDetails.missingRequirements.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#e8a55a] font-bold">!</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Strategy Note */}
        <div className="py-4 border-b border-[#e6dfd8]">
          <div className="p-3.5 rounded-xl bg-[#efe9de] border border-[#e6dfd8] text-xs text-[#141413] leading-relaxed">
            <strong className="text-[#cc785c] font-mono">AI Application Strategy: </strong>
            {matchDetails.strategyNote}
          </div>
        </div>

        {/* Job Description Text */}
        <div className="py-6 space-y-2">
          <h5 className="text-xs font-bold text-[#6c6a64] uppercase font-mono tracking-wider">Job Description</h5>
          <p className="text-xs text-[#3d3d3a] leading-relaxed">{selectedJob.description}</p>
        </div>

        {/* AI Action Toolbar & Submission */}
        <div className="pt-4 border-t border-[#e6dfd8] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setSelectedJob(null);
                setActiveView('resume');
              }}
              className="px-3 py-2 rounded-xl bg-[#efe9de] hover:bg-[#e8e0d2] text-[#141413] text-xs font-medium flex items-center space-x-1.5 border border-[#e6dfd8]"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-[#cc785c]" />
              <span>Tailor Resume</span>
            </button>
            <button
              onClick={() => {
                setSelectedJob(null);
                setActiveView('tools');
              }}
              className="px-3 py-2 rounded-xl bg-[#efe9de] hover:bg-[#e8e0d2] text-[#141413] text-xs font-medium flex items-center space-x-1.5 border border-[#e6dfd8]"
            >
              <Wand2 className="w-3.5 h-3.5 text-[#5db8a6]" />
              <span>Generate Cover Letter</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {selectedJob.submissionType === 'Direct API Integration' ? (
              <button
                onClick={() => {
                  addApplicationFromJob(selectedJob);
                  setSelectedJob(null);
                  setActiveView('tracker');
                }}
                className="px-6 py-2.5 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium shadow-sm flex items-center space-x-1.5"
              >
                <span>Direct Apply via API</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <a
                href={selectedJob.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  addApplicationFromJob(selectedJob);
                  setSelectedJob(null);
                  setActiveView('tracker');
                }}
                className="px-6 py-2.5 rounded-xl bg-[#141413] hover:bg-[#252523] text-white text-xs font-medium shadow-sm flex items-center space-x-2"
              >
                <span>Open Portal & Apply</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
