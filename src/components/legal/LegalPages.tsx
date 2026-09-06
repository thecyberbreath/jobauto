import React from 'react';
import { ShieldCheck, Cpu, AlertTriangle } from 'lucide-react';

export const LegalPages: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-12 text-[#141413]">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#e6dfd8] text-center space-y-2">
        <h1 className="font-serif-display text-4xl font-normal">Legal, Privacy & AI Usage Policy</h1>
        <p className="text-xs text-[#6c6a64]">Transparency, Security, and Ethical AI Application Standards</p>
      </div>

      {/* SECTION 1: PRIVACY POLICY */}
      <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 pb-3 border-b border-[#e6dfd8]">
          <ShieldCheck className="w-5 h-5 text-[#5db872]" />
          <h2 className="font-serif-display text-2xl">1. Privacy Policy & Data Sovereignty</h2>
        </div>
        <p className="text-xs text-[#3d3d3a] leading-relaxed">
          CareerPulse AI is built on strict data privacy principles. Your resume files, profile details, and application history are stored in private, encrypted vaults protected by Supabase Row Level Security (RLS). We never sell your personal data or resume content to recruiters, advertisers, or third-party data brokers.
        </p>
      </div>

      {/* SECTION 2: AI USAGE & TRUTHFULNESS POLICY */}
      <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 pb-3 border-b border-[#e6dfd8]">
          <Cpu className="w-5 h-5 text-[#cc785c]" />
          <h2 className="font-serif-display text-2xl">2. AI & Application Automation Policy</h2>
        </div>
        <p className="text-xs text-[#3d3d3a] leading-relaxed">
          CareerPulse AI operates as an intelligent assistant to accelerate repetitive job search tasks. All AI-generated cover letters, tailored resumes, and portal screening answers are derived strictly from your verified candidate profile. The platform strictly prohibits fabricating work history, qualifications, or employer experience.
        </p>
      </div>

      {/* SECTION 3: JOB SOURCE DISCLAIMER */}
      <div className="bg-[#efe9de] border border-[#e6dfd8] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 pb-3 border-b border-[#e6dfd8]">
          <AlertTriangle className="w-5 h-5 text-[#e8a55a]" />
          <h2 className="font-serif-display text-2xl">3. Job Source & Application Disclaimer</h2>
        </div>
        <p className="text-xs text-[#3d3d3a] leading-relaxed">
          Job listings displayed on CareerPulse AI are aggregated via public feeds, permitted APIs, and direct integrations. Automated application submission is provided only for platforms with direct API integrations. For external job portals, the system provides an "Open & Apply" workflow where final submission remains under user control. CareerPulse AI does not guarantee employment or interview responses.
        </p>
      </div>

    </div>
  );
};
