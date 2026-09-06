import React from 'react';
import { useApp } from '../../context/AppContext';
import type { ActiveView } from '../../context/AppContext';
import {
  LayoutDashboard,
  Search,
  Kanban,
  FileCheck2,
  Wand2,
  Settings,
  Sparkles,
  Zap
} from 'lucide-react';

interface NavItem {
  id: ActiveView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, applications, jobs } = useApp();

  const highMatchJobsCount = jobs.filter((j) => j.matchDetails.overallScore >= 90).length;
  const activeAppsCount = applications.filter((a) => a.status !== 'Rejected').length;


  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Find Jobs', icon: Search, badge: highMatchJobsCount > 0 ? `${highMatchJobsCount}` : undefined },
    { id: 'tracker', label: 'Applications', icon: Kanban, badge: activeAppsCount > 0 ? `${activeAppsCount}` : undefined },
    { id: 'resume', label: 'Resume', icon: FileCheck2 },
    { id: 'tools', label: 'AI Assistant', icon: Wand2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];


  return (
    <aside className="w-64 shrink-0 hidden lg:block border-r border-[#e6dfd8] bg-[#faf9f5] p-4 space-y-6 min-h-[calc(100vh-4rem)]">
      
      {/* Autopilot Status Box */}
      <div className="p-3.5 rounded-xl bg-[#efe9de] border border-[#e6dfd8]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5db872] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5db872]"></span>
            </span>
            <span className="text-xs font-semibold text-[#141413] uppercase tracking-wider font-mono">
              Autopilot Active
            </span>
          </div>
          <Zap className="w-3.5 h-3.5 text-[#cc785c]" />
        </div>
        <p className="text-[11px] text-[#6c6a64] mt-2 leading-tight">
          Scanning 6 job networks every 15 mins for Senior Frontend & Fullstack roles.
        </p>
      </div>

      {/* Navigation List */}
      <div className="space-y-1">
        <div className="text-[10px] font-mono font-semibold text-[#6c6a64] uppercase tracking-widest px-3 mb-2">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#efe9de] text-[#141413] font-semibold border border-[#e6dfd8] shadow-sm'
                  : 'text-[#3d3d3a] hover:text-[#141413] hover:bg-[#efe9de]/50'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#cc785c]' : 'text-[#6c6a64]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                    isActive ? 'bg-[#cc785c] text-white' : 'bg-[#e8e0d2] text-[#141413]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>


      {/* Upgrade Banner in Dark Navy Surface */}
      <div className="p-4 rounded-xl bg-[#181715] text-white text-center space-y-2 border border-[#252320]">
        <div className="inline-flex p-1.5 rounded-lg bg-[#252320] text-[#cc785c] mb-1">
          <Sparkles className="w-4 h-4" />
        </div>
        <h5 className="text-xs font-bold uppercase tracking-wider font-serif-display text-[#faf9f5]">AUTOPILOT PRO</h5>
        <p className="text-[11px] text-[#a09d96] leading-tight">
          Unlock unlimited resume tailored versions & direct API job submissions.
        </p>
        <button className="w-full mt-2 py-2 rounded-lg bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium shadow-sm transition-all">
          Upgrade (₹999/mo)
        </button>
      </div>
    </aside>
  );
};
