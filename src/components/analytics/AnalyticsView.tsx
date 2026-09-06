import React from 'react';
import { useApp } from '../../context/AppContext';

export const AnalyticsView: React.FC = () => {
  const { resumeVersions } = useApp();

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#e6dfd8]">
        <h2 className="font-serif-display text-3xl text-[#141413] flex items-center space-x-2">
          <span>Job Search & Application Analytics</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#efe9de] text-[#141413] border border-[#e6dfd8] font-mono">
            Performance Funnel
          </span>
        </h2>
        <p className="text-xs text-[#6c6a64] mt-1">
          Detailed metrics tracking your conversion rate from job discovery to offer letters.
        </p>
      </div>

      {/* Top Stat Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-2">
          <div className="text-xs font-mono text-[#6c6a64] uppercase tracking-wider">Jobs Discovered</div>
          <div className="font-serif-display text-3xl text-[#141413]">1,420</div>
          <p className="text-[11px] text-[#6c6a64] font-mono">Scanned last 7 days</p>
        </div>

        <div className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-2">
          <div className="text-xs font-mono text-[#6c6a64] uppercase tracking-wider">Applications Sent</div>
          <div className="font-serif-display text-3xl text-[#cc785c]">82</div>
          <p className="text-[11px] text-[#cc785c] font-mono">Targeted positions</p>
        </div>

        <div className="p-5 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-2">
          <div className="text-xs font-mono text-[#141413] uppercase tracking-wider">Interview Rate</div>
          <div className="font-serif-display text-3xl text-[#5db872]">13.4%</div>
          <p className="text-[11px] text-[#3d3d3a] font-mono">11 Active Interviews</p>
        </div>

        <div className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-2">
          <div className="text-xs font-mono text-[#6c6a64] uppercase tracking-wider">Offer Rate</div>
          <div className="font-serif-display text-3xl text-[#e8a55a]">2.4%</div>
          <p className="text-[11px] text-[#6c6a64] font-mono">2 Formal Job Offers</p>
        </div>
      </div>

      {/* Conversion Funnel Visualization */}
      <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#141413] font-mono uppercase tracking-wider">
          Application Conversion Funnel
        </h3>

        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-[#3d3d3a]">
              <span>1. Discovered Jobs Matching Profile (&gt;75% Match)</span>
              <span className="font-bold">1,420</span>
            </div>
            <div className="w-full bg-[#efe9de] h-3 rounded-full overflow-hidden">
              <div className="bg-[#cc785c]/40 h-full w-full" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-[#3d3d3a]">
              <span>2. High-Match Prepared Applications</span>
              <span className="font-bold text-[#cc785c]">82 (5.7%)</span>
            </div>
            <div className="w-full bg-[#efe9de] h-3 rounded-full overflow-hidden">
              <div className="bg-[#cc785c] h-full" style={{ width: '45%' }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-[#3d3d3a]">
              <span>3. Assessment / Technical Rounds</span>
              <span className="font-bold text-[#5db8a6]">18 (21.9%)</span>
            </div>
            <div className="w-full bg-[#efe9de] h-3 rounded-full overflow-hidden">
              <div className="bg-[#5db8a6] h-full" style={{ width: '25%' }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-[#3d3d3a]">
              <span>4. Final Interview Stage</span>
              <span className="font-bold text-[#5db872]">11 (13.4%)</span>
            </div>
            <div className="w-full bg-[#efe9de] h-3 rounded-full overflow-hidden">
              <div className="bg-[#5db872] h-full" style={{ width: '15%' }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-[#3d3d3a]">
              <span>5. Offer Received</span>
              <span className="font-bold text-[#e8a55a]">2 (2.4%)</span>
            </div>
            <div className="w-full bg-[#efe9de] h-3 rounded-full overflow-hidden">
              <div className="bg-[#e8a55a] h-full" style={{ width: '8%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Source Efficiency */}
        <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 space-y-4">
          <h4 className="text-sm font-bold text-[#141413] font-mono uppercase tracking-wider">
            Job Source Efficiency
          </h4>

          <div className="space-y-3 font-mono text-xs">
            {[
              { source: 'LinkedIn API', conversion: '16.2%', count: '38 apps' },
              { source: 'Wellfound (AngelList)', conversion: '18.4%', count: '14 apps' },
              { source: 'Naukri', conversion: '11.0%', count: '18 apps' },
              { source: 'Direct Company Pages', conversion: '22.5%', count: '12 apps' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#efe9de] border border-[#e6dfd8]">
                <span className="font-semibold text-[#141413]">{item.source}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-[#6c6a64]">{item.count}</span>
                  <span className="text-[#5db872] font-bold">{item.conversion} interview rate</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Performing Resume Version */}
        <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 space-y-4">
          <h4 className="text-sm font-bold text-[#141413] font-mono uppercase tracking-wider">
            Best Performing Resume Versions
          </h4>

          <div className="space-y-3 font-mono text-xs">
            {resumeVersions.map((v) => (
              <div key={v.id} className="p-3 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#cc785c]">{v.title}</span>
                  <span className="px-2 py-0.5 rounded bg-[#5db872]/20 text-[#5db872] font-bold">{v.atsScore}% ATS</span>
                </div>
                <p className="text-[#6c6a64] text-[11px]">{v.targetRole} • 16.8% Response Rate</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
