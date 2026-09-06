import React from 'react';
import { mockAdminStats } from '../../mock/mockData';
import { CheckCircle2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#e6dfd8]">
        <h2 className="font-serif-display text-3xl text-[#141413] flex items-center space-x-2">
          <span>System Admin & Business Overview</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#cc785c]/10 text-[#cc785c] border border-[#cc785c]/20 font-mono">
            Admin Privileges
          </span>
        </h2>
        <p className="text-xs text-[#6c6a64] mt-1">
          Monitor platform user growth, monthly recurring revenue, AI token consumption, and job source crawlers.
        </p>
      </div>

      {/* Admin Stat Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-2">
          <div className="text-xs text-[#6c6a64] uppercase">Total Users</div>
          <div className="font-serif-display text-3xl text-[#141413] font-normal">{mockAdminStats.totalUsers.toLocaleString()}</div>
          <p className="text-[11px] text-[#5db872]">+{mockAdminStats.activeUsers.toLocaleString()} Active (63.6%)</p>
        </div>

        <div className="p-5 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-2">
          <div className="text-xs text-[#141413] uppercase">Monthly Revenue (MRR)</div>
          <div className="font-serif-display text-3xl text-[#5db872] font-normal">₹{(mockAdminStats.monthlyRevenueINR / 100000).toFixed(1)} Lakhs</div>
          <p className="text-[11px] text-[#3d3d3a]">3,120 Paid Subscribers</p>
        </div>

        <div className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-2">
          <div className="text-xs text-[#6c6a64] uppercase">Jobs Processed Today</div>
          <div className="font-serif-display text-3xl text-[#cc785c] font-normal">{mockAdminStats.jobsProcessedToday.toLocaleString()}</div>
          <p className="text-[11px] text-[#cc785c]">1,420 Applications Sent</p>
        </div>

        <div className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-2">
          <div className="text-xs text-[#6c6a64] uppercase">AI Token Usage</div>
          <div className="font-serif-display text-3xl text-[#5db8a6] font-normal">{mockAdminStats.aiTokenConsumptionMillions}M</div>
          <p className="text-[11px] text-[#6c6a64]">LLM Inference Tokens</p>
        </div>
      </div>

      {/* Sources Distribution Bar */}
      <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 space-y-4 font-mono">
        <h3 className="text-sm font-bold text-[#141413] uppercase tracking-wider">Job Sources Network Distribution</h3>
        
        <div className="space-y-3">
          {mockAdminStats.sourcesBreakdown.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs text-[#3d3d3a]">
                <span>{item.source}</span>
                <span className="font-bold">{item.percentage}%</span>
              </div>
              <div className="w-full bg-[#efe9de] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#cc785c] h-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Error Logs in Dark Code Surface (#181715) */}
      <div className="bg-[#181715] text-[#faf9f5] border border-[#252320] rounded-2xl p-6 space-y-4 font-mono text-xs">
        <h3 className="text-sm font-bold text-[#a09d96] uppercase tracking-wider">Live System Terminal Logs</h3>

        <div className="p-4 rounded-xl bg-[#252320] border border-[#33302b] space-y-2 text-[#a09d96]">
          <div className="flex items-center space-x-2 text-[#5db872]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>[22:50:12] LinkedIn API Job Normalizer worker: 420 jobs fetched, 0 errors.</span>
          </div>
          <div className="flex items-center space-x-2 text-[#5db872]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>[22:51:04] Naukri RSS Feed Sync: Deduplicated 14 duplicate job postings.</span>
          </div>
          <div className="flex items-center space-x-2 text-[#5db872]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>[22:52:00] AI Resume Matching Queue: Average latency 140ms per ATS score computation.</span>
          </div>
        </div>
      </div>

    </div>
  );
};
