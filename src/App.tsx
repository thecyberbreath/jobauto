import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { MainDashboard } from './components/dashboard/MainDashboard';
import { FindJobs } from './components/jobs/FindJobs';
import { JobDetailsModal } from './components/jobs/JobDetailsModal';
import { ResumeOptimizer } from './components/resume/ResumeOptimizer';
import { ToolsHub } from './components/tools/ToolsHub';
import { BulkReviewQueue } from './components/bulk/BulkReviewQueue';
import { KanbanTracker } from './components/tracker/KanbanTracker';
import { InterviewCoach } from './components/interview/InterviewCoach';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SettingsView } from './components/settings/SettingsView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/auth/AuthModal';

const AppContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#141413] font-sans selection:bg-[#cc785c] selection:text-white">
      {/* Top Fixed Header */}
      <Header />

      {/* Global Modals */}
      <AuthModal />
      <JobDetailsModal />

      {/* Main Page Layout Switch */}
      {activeView === 'landing' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LandingPage />
        </main>
      ) : activeView === 'onboarding' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OnboardingWizard />
        </main>
      ) : (
        <div className="max-w-[1600px] mx-auto flex">
          {/* Left Persistent Sidebar */}
          <Sidebar />

          {/* Right Main SaaS App View Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl overflow-hidden">
            {activeView === 'dashboard' && <MainDashboard />}
            {activeView === 'jobs' && <FindJobs />}
            {activeView === 'tracker' && <KanbanTracker />}
            {activeView === 'resume' && <ResumeOptimizer />}
            {activeView === 'tools' && <ToolsHub />}
            {activeView === 'bulk' && <BulkReviewQueue />}
            {activeView === 'interview' && <InterviewCoach />}
            {activeView === 'analytics' && <AnalyticsView />}
            {activeView === 'settings' && <SettingsView />}
            {activeView === 'admin' && <AdminDashboard />}
          </main>
        </div>
      )}

      {/* Dark Navy Footer (#181715) as specified in DESIGN-claude.md */}
      <footer className="border-t border-[#252320] py-12 bg-[#181715] text-[#a09d96] text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded bg-[#cc785c] flex items-center justify-center text-white">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
            <span className="font-serif-display text-base text-[#faf9f5]">CareerPulse AI</span>
            <span className="text-[#a09d96] ml-2">© 2026 Anthropic Claude Design System.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-[#faf9f5]">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#faf9f5]">Terms of Service</a>
            <a href="#security" className="hover:text-[#faf9f5] font-semibold text-[#5db872]">Security & 256-bit Vault</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
