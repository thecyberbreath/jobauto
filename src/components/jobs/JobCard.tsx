import React, { useState } from 'react';
import type { NormalizedJob } from '../../lib/jobFetcher';
import { Bookmark, ExternalLink, Sparkles, Check, Loader2, MapPin, Building2, Calendar } from 'lucide-react';

interface JobCardProps {
  job: NormalizedJob;
  onAutoApply: (job: NormalizedJob) => void;
  onSave?: (job: NormalizedJob) => void;
  isSaved?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onAutoApply, onSave, isSaved = false }) => {
  const [applyState, setApplyState] = useState<'idle' | 'applying' | 'applied'>('idle');
  const [saved, setSaved] = useState(isSaved);
  const [logoError, setLogoError] = useState(false);

  const domain = job.domain || `${job.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
  const logoUrl = `https://logo.clearbit.com/${domain}`;

  const handleApplyClick = async () => {
    setApplyState('applying');
    await onAutoApply(job);
    setApplyState('applied');
  };

  const handleSaveClick = () => {
    setSaved(!saved);
    if (onSave) onSave(job);
  };

  return (
    <div className="group bg-white border border-slate-200 hover:border-indigo-500/50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center space-x-3.5">
          {!logoError ? (
            <img
              src={logoUrl}
              alt={job.company}
              onError={() => setLogoError(true)}
              className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 object-contain p-1 shrink-0"
            />
          ) : (
            <div className="w-11 h-11 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
          )}

          <div>
            <h3 className="font-semibold text-slate-900 text-base group-hover:text-indigo-600 transition-colors leading-snug line-clamp-1">
              {job.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium flex items-center space-x-1.5 mt-0.5">
              <span>{job.company}</span>
              <span>•</span>
              <span className="flex items-center">
                <MapPin className="w-3 h-3 text-slate-400 mr-0.5 inline" />
                {job.location}
              </span>
            </p>
          </div>
        </div>

        {/* Platform Badge */}
        <span className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          {job.platform}
        </span>
      </div>

      {/* Description Snippet */}
      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
        {job.description || 'Exciting career opportunity at a fast-growing tech enterprise.'}
      </p>

      {/* Salary & Posted Date */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <span className="font-semibold text-slate-900">{job.salary}</span>
        <span className="flex items-center space-x-1 text-[11px]">
          <Calendar className="w-3 h-3 text-slate-400" />
          <span>{job.posted_at}</span>
        </span>
      </div>

      {/* Footer Action Buttons */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSaveClick}
            className={`p-2 rounded-lg border text-xs transition-all ${
              saved
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
            title={saved ? 'Saved' : 'Save job'}
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <a
            href={job.apply_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-all"
          >
            <span>Open</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <button
          onClick={handleApplyClick}
          disabled={applyState !== 'idle'}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all ${
            applyState === 'applied'
              ? 'bg-emerald-600 text-white cursor-default'
              : applyState === 'applying'
              ? 'bg-indigo-400 text-white cursor-wait'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {applyState === 'applying' ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Tailoring...</span>
            </>
          ) : applyState === 'applied' ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Applied!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto Apply</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
