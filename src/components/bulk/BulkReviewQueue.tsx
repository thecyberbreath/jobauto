import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  CheckSquare,
  Square,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export const BulkReviewQueue: React.FC = () => {
  const { bulkQueue, toggleBulkSelection, toggleSelectAllBulk, processBulkApplications, setActiveView } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const selectedCount = bulkQueue.filter((item) => item.selected).length;
  const allSelected = selectedCount === bulkQueue.length && bulkQueue.length > 0;

  const handleExecuteBatch = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      processBulkApplications();
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) {
        // ignore
      }
      setTimeout(() => {
        setSubmittedSuccess(false);
        setActiveView('tracker');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e6dfd8]">
        <div>
          <h2 className="font-serif-display text-3xl text-[#141413] flex items-center space-x-2">
            <span>Controlled Bulk Application Queue</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#efe9de] text-[#141413] border border-[#e6dfd8] font-mono font-normal">
              Explicit Consent Workflow
            </span>
          </h2>
          <p className="text-xs text-[#6c6a64] mt-1">
            Review AI-tailored resumes, cover letters, and answer packs before dispatching applications.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => toggleSelectAllBulk(!allSelected)}
            className="px-3.5 py-2 rounded-xl bg-[#efe9de] border border-[#e6dfd8] text-[#141413] text-xs font-medium hover:bg-[#e8e0d2]"
          >
            {allSelected ? 'Deselect All' : 'Select All Jobs'}
          </button>

          <button
            onClick={handleExecuteBatch}
            disabled={selectedCount === 0 || isSubmitting}
            className="px-5 py-2.5 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium shadow-sm flex items-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Submit {selectedCount} Approved Applications</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Safety Principle Banner */}
      <div className="p-4 rounded-xl bg-[#efe9de] border border-[#e6dfd8] text-xs text-[#141413] flex items-center space-x-3">
        <ShieldCheck className="w-5 h-5 text-[#5db872] shrink-0" />
        <div className="space-y-0.5">
          <strong className="text-[#141413]">User Consent & Platform Integrity First: </strong>
          <span>
            We never spam job portals. Each application includes custom-tailored documents optimized for maximum interview conversion. Direct API submissions are confirmed in real-time.
          </span>
        </div>
      </div>

      {/* Success Notification */}
      {submittedSuccess && (
        <div className="p-4 rounded-xl bg-[#5db872]/10 border border-[#5db872]/30 text-[#5db872] text-xs font-mono flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#5db872]" />
          <span>Batch applications executed successfully! Redirecting to Kanban Tracker...</span>
        </div>
      )}

      {/* Queue Table */}
      <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 bg-[#efe9de] border-b border-[#e6dfd8] flex items-center justify-between text-xs font-mono text-[#6c6a64]">
          <span>{bulkQueue.length} High-Match Applications Prepared for Review</span>
          <span>{selectedCount} Selected</span>
        </div>

        <div className="divide-y divide-[#e6dfd8]">
          {bulkQueue.map((item) => {
            const { job } = item;
            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  item.selected ? 'bg-[#efe9de]/60' : 'bg-transparent hover:bg-[#efe9de]/30'
                }`}
              >
                {/* Left Selection & Job Details */}
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => toggleBulkSelection(item.id)}
                    className="mt-1 text-[#6c6a64] hover:text-[#cc785c] transition-colors"
                  >
                    {item.selected ? (
                      <CheckSquare className="w-5 h-5 text-[#cc785c]" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>

                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-10 h-10 rounded-xl bg-[#efe9de] p-1 border border-[#e6dfd8] object-contain shrink-0"
                  />

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-[#141413]">{job.title}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#cc785c] text-white font-mono font-bold">
                        {job.matchDetails.overallScore}% Match
                      </span>
                    </div>

                    <p className="text-xs text-[#6c6a64] font-medium">
                      {job.company} • {job.location} • {job.salaryRange}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-[#3d3d3a]">
                      <span className="text-[#5db872] font-semibold">✓ Tailored Resume: {item.tailoredResumeVersion}</span>
                      <span>•</span>
                      <span className="text-[#cc785c]">✓ Cover Letter Prepared</span>
                      <span>•</span>
                      <span className="text-[#5db8a6]">✓ Portal Q&A Answers</span>
                    </div>
                  </div>
                </div>

                {/* Right Submission Type Badge */}
                <div className="flex items-center space-x-3 sm:justify-end shrink-0 pl-9 sm:pl-0">
                  {job.submissionType === 'Direct API Integration' ? (
                    <span className="px-3 py-1.5 rounded-xl bg-[#5db872]/10 border border-[#5db872]/20 text-[#5db872] text-xs font-mono font-semibold flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Direct API Ready</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl bg-[#e8a55a]/20 border border-[#e8a55a]/40 text-[#141413] text-xs font-mono font-semibold flex items-center space-x-1.5">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Portal Action</span>
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
