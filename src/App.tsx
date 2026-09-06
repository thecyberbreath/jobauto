import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { DashboardView } from './components/dashboard/DashboardView';
import { ApplicationsTrackerView } from './components/applications/ApplicationsTrackerView';
import { ProfileView } from './components/profile/ProfileView';
import { OnboardingView } from './components/onboarding/OnboardingView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'applications' | 'profile' | 'onboarding'>('dashboard');
  const [userEmail] = useState('alex.morgan@techpulse.io');
  const [userResumeText] = useState(
    'Senior Software Engineer with 5.2+ years experience in React, TypeScript, Next.js, Node.js, and PostgreSQL.'
  );


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userEmail={userEmail}
          onLogout={() => setActiveTab('onboarding')}
        />

        {/* View Switcher */}
        <main className="pb-16">
          {activeTab === 'dashboard' && (
            <DashboardView
              userResumeText={userResumeText}
              onApplicationCreated={() => {
                // background notification trigger
              }}
            />
          )}

          {activeTab === 'applications' && <ApplicationsTrackerView />}

          {activeTab === 'profile' && <ProfileView />}

          {activeTab === 'onboarding' && (
            <OnboardingView
              onComplete={() => setActiveTab('dashboard')}
            />
          )}
        </main>
      </div>

      {/* Clean Slate-900 Footer */}
      <footer className="border-t border-slate-800 py-8 bg-[#0F172A] text-slate-400 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              J
            </div>
            <span className="font-bold text-white text-sm">JobHunt AI</span>
            <span className="text-slate-500 ml-2">© 2026 AI Job Aggregator & Auto-Apply Platform.</span>
          </div>

          <div className="flex space-x-6 text-[11px]">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-indigo-400 font-semibold">256-bit Encrypted Vault</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
