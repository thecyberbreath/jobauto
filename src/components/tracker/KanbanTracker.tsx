import React from 'react';
import { useApp } from '../../context/AppContext';
import type { ApplicationStatus } from '../../types';
import { Plus } from 'lucide-react';

const STAGES: ApplicationStatus[] = [
  'Saved',
  'Ready to Apply',
  'Applied',
  'Assessment',
  'Interview',
  'Offer',
  'Rejected'
];

export const KanbanTracker: React.FC = () => {
  const { applications, updateApplicationStatus, setActiveView } = useApp();

  const getStageCount = (stage: ApplicationStatus) =>
    applications.filter((a) => a.status === stage).length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e6dfd8]">
        <div>
          <h2 className="font-serif-display text-3xl text-[#141413] flex items-center space-x-2">
            <span>Application Kanban Pipeline</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#efe9de] text-[#141413] border border-[#e6dfd8] font-mono">
              Real-Time Tracking
            </span>
          </h2>
          <p className="text-xs text-[#6c6a64] mt-1">
            Track applications from saved opportunities to interview schedules and final job offers.
          </p>
        </div>

        <button
          onClick={() => setActiveView('jobs')}
          className="px-4 py-2 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium shadow-sm flex items-center space-x-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Opportunity</span>
        </button>
      </div>

      {/* Kanban Board Columns Grid */}
      <div className="flex space-x-4 overflow-x-auto pb-6 min-h-[600px] scrollbar-thin">
        {STAGES.map((stage) => {
          const stageApps = applications.filter((a) => a.status === stage);
          return (
            <div
              key={stage}
              className="w-72 shrink-0 bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-3.5 flex flex-col justify-between"
            >
              {/* Column Header */}
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e6dfd8]">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        stage === 'Interview'
                          ? 'bg-[#5db872]'
                          : stage === 'Offer'
                          ? 'bg-[#cc785c]'
                          : stage === 'Applied'
                          ? 'bg-[#5db8a6]'
                          : 'bg-[#6c6a64]'
                      }`}
                    />
                    <h3 className="text-xs font-bold text-[#141413] font-mono uppercase tracking-wider">
                      {stage}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#efe9de] text-[#141413]">
                    {getStageCount(stage)}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3">
                  {stageApps.length === 0 ? (
                    <div className="p-4 text-center border border-dashed border-[#e6dfd8] rounded-xl text-[#6c6a64] text-[11px] font-mono">
                      No applications in {stage}
                    </div>
                  ) : (
                    stageApps.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 rounded-xl bg-[#efe9de] border border-[#e6dfd8] hover:border-[#cc785c] space-y-3 transition-all"
                      >
                        {/* Company & Role */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2.5">
                            <img
                              src={app.companyLogo}
                              alt={app.company}
                              className="w-8 h-8 rounded-lg bg-[#faf9f5] p-1 border border-[#e6dfd8] object-contain"
                            />
                            <div>
                              <h4 className="text-xs font-bold text-[#141413] hover:text-[#cc785c] cursor-pointer">
                                {app.jobTitle}
                              </h4>
                              <p className="text-[11px] text-[#6c6a64] font-medium">{app.company}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#cc785c] text-white">
                            {app.matchScore}%
                          </span>
                        </div>

                        {/* Metadata */}
                        <div className="text-[10px] font-mono text-[#6c6a64] space-y-1 pt-1 border-t border-[#e6dfd8]">
                          <div className="flex items-center justify-between">
                            <span>Applied: {app.appliedDate}</span>
                            <span className="text-[#141413] font-semibold">{app.submissionType === 'Direct API Integration' ? 'Direct API' : 'Portal'}</span>
                          </div>
                          <div className="text-[#6c6a64] truncate">
                            Resume: {app.resumeVersionUsed}
                          </div>
                          {app.nextStep && (
                            <div className="p-2 rounded-lg bg-[#faf9f5] border border-[#5db872]/40 text-[#141413] text-[10px] space-y-0.5">
                              <strong className="block font-semibold text-[#5db872]">Next: {app.nextStep}</strong>
                              <span className="text-[#6c6a64] font-mono">{app.nextStepDate}</span>
                            </div>
                          )}
                        </div>

                        {/* Move Stage Selector */}
                        <div className="pt-2 flex items-center justify-between border-t border-[#e6dfd8] text-[10px] font-mono">
                          <span className="text-[#6c6a64]">Move to:</span>
                          <select
                            value={app.status}
                            onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                            className="bg-[#faf9f5] border border-[#e6dfd8] text-[#141413] rounded px-1.5 py-0.5 focus:outline-none text-[10px]"
                          >
                            {STAGES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-3 mt-3 border-t border-[#e6dfd8] text-center">
                <button
                  onClick={() => setActiveView('jobs')}
                  className="text-[10px] text-[#6c6a64] hover:text-[#cc785c] font-mono"
                >
                  + Add job from discovery
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
