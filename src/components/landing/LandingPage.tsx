import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Check
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView, setIsAuthenticated } = useApp();

  const handleStartSearch = () => {
    setIsAuthenticated(true);
    setActiveView('onboarding');
  };

  return (
    <div className="space-y-24 py-8 pb-20">
      
      {/* 1. HERO SECTION (Clean, Uncluttered, Editorial) */}
      <section className="relative pt-8 sm:pt-16 text-center space-y-8 max-w-4xl mx-auto px-4">
        
        {/* Editorial Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#efe9de] border border-[#e6dfd8] text-[#141413] text-xs font-mono">
          <svg className="w-3.5 h-3.5 fill-[#cc785c]" viewBox="0 0 24 24">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
          <span>AI Job Discovery & Application Automation</span>
        </div>

        {/* Hero Title - Clean Copernicus Serif */}
        <h1 className="font-serif-display text-4xl sm:text-6xl text-[#141413] leading-[1.08] tracking-tight">
          Your job search, <br className="hidden sm:inline" />
          <span className="italic text-[#cc785c]">on autopilot.</span>
        </h1>

        {/* Clean Subtitle */}
        <p className="text-base text-[#3d3d3a] max-w-xl mx-auto leading-relaxed">
          Upload your resume once. Let AI match top opportunities, tailor your applications, and track your interviews in one place.
        </p>

        {/* Primary CTA Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={handleStartSearch}
            className="px-8 py-3.5 rounded-lg bg-[#cc785c] hover:bg-[#a9583e] text-white font-medium text-sm shadow-sm transition-all flex items-center space-x-2"
          >
            <span>Start Free Job Search</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center space-x-6 text-xs text-[#6c6a64] font-mono pt-2">
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-[#5db872]" />
            <span>100% Resume Privacy</span>
          </span>
          <span>•</span>
          <span>No Unsanctioned Scraping</span>
          <span>•</span>
          <span>Zero Fake Submissions</span>
        </div>

        {/* HERO VISUAL MOCKUP — UNCLUTTERED SINGLE ELEGANT PRODUCT CARD */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#181715] text-[#faf9f5] shadow-xl text-left border border-[#252320] max-w-3xl mx-auto">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#252320] mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#c64545]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#d4a017]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#5db872]" />
              <span className="text-xs font-mono text-[#a09d96] pl-2">Live AI Match Preview</span>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#252320] text-[#5db872] border border-[#33302b] font-mono">
              Autopilot Active
            </span>
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#252320] border border-[#33302b] flex items-center justify-center font-bold text-white text-base">
                  G
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#faf9f5]">Senior Software Engineer</h4>
                  <p className="text-xs text-[#cc785c] font-medium">Google • Mountain View / Remote</p>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-[#cc785c]/20 border border-[#cc785c]/40 text-[#cc785c] font-bold text-sm font-mono">
                96% AI Match
              </div>
            </div>

            {/* Clean Match Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-lg bg-[#252320] border border-[#33302b]">
                <div className="text-[10px] text-[#a09d96]">Skills Match</div>
                <div className="text-base font-bold text-[#5db872] mt-0.5">98%</div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#252320] border border-[#33302b]">
                <div className="text-[10px] text-[#a09d96]">Experience</div>
                <div className="text-base font-bold text-[#cc785c] mt-0.5">94%</div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#252320] border border-[#33302b]">
                <div className="text-[10px] text-[#a09d96]">Remote Fit</div>
                <div className="text-base font-bold text-[#5db8a6] mt-0.5">100%</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-[#a09d96]">Tailored Resume ATS Score: <strong className="text-[#5db872]">94%</strong></span>
              <button
                onClick={handleStartSearch}
                className="px-5 py-2.5 rounded-lg bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium transition-all shadow-sm"
              >
                Review & Apply
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#141413]">How CareerPulse Works</h2>
          <p className="text-sm text-[#6c6a64] max-w-lg mx-auto">
            From uploading your resume to interview preparation in 4 automated, controlled steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Upload Your Resume',
              desc: 'Upload PDF or DOCX. AI parses your technical skills, experience, and certifications.'
            },
            {
              step: '02',
              title: 'Set Target Preferences',
              desc: 'Define target role, remote/hybrid preference, salary range, and experience level.'
            },
            {
              step: '03',
              title: 'AI Finds & Ranks Jobs',
              desc: 'AI scans 6 job networks and ranks listings with a detailed 6-vector Match Score.'
            },
            {
              step: '04',
              title: 'Apply with Tailored Packs',
              desc: 'Generate tailored resumes, cover letters, and Q&A answers before submitting.'
            }
          ].map((item) => (
            <div key={item.step} className="p-6 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-3 relative">
              <div className="text-3xl font-serif-display text-[#cc785c]">{item.step}</div>
              <h3 className="text-base font-bold text-[#141413]">{item.title}</h3>
              <p className="text-xs text-[#3d3d3a] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AI JOB MATCHING & RESUME INTELLIGENCE */}
      <section id="ai-matching" className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#efe9de] border border-[#e6dfd8] text-[#141413] text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-[#cc785c]" />
            <span>AI Resume Intelligence</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#141413]">
            Deep Resume Analysis & Multi-Dimensional Match Scoring
          </h2>
          <p className="text-sm text-[#3d3d3a] leading-relaxed">
            Our algorithm doesn't just keyword match. It understands your exact years of experience, technical depth, soft skills, and industry background against every job posting.
          </p>
          <ul className="space-y-2 text-xs text-[#3d3d3a] font-mono">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#5db872]" />
              <span>Skills similarity matching across React, TypeScript, Node & AWS</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#5db872]" />
              <span>Seniority fit calculation (5.2 years exp vs 5+ required)</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#5db872]" />
              <span>"Why you're a match" checklist vs "Missing requirements" warning badges</span>
            </li>
          </ul>
        </div>

        {/* Code Window Style Dark Card (#181715) */}
        <div className="p-6 rounded-xl bg-[#181715] text-[#faf9f5] border border-[#252320] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#252320] text-xs font-mono">
            <span className="text-[#a09d96]">Your resume has been analyzed</span>
            <span className="text-[#5db872] font-bold">✓ 100% Parsed</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#faf9f5]">Skills Detected:</label>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'Next.js', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'PostgreSQL'].map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-md bg-[#252320] text-[#cc785c] border border-[#33302b] text-xs font-mono">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 text-xs space-y-1 font-mono text-[#a09d96]">
            <div>Total Experience: <strong className="text-white">5.2 years</strong></div>
            <div>Target Roles: <strong className="text-[#cc785c]">Senior Full Stack Engineer, Backend Engineer</strong></div>
          </div>
        </div>
      </section>

      {/* 4. PRICING TIERS */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#141413]">Transparent, Affordable Pricing</h2>
          <p className="text-sm text-[#6c6a64]">Start free. Upgrade as you land interviews.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* FREE */}
          <div className="p-6 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#141413]">FREE</h3>
              <div className="font-serif-display text-4xl text-[#141413]">₹0 <span className="text-xs text-[#6c6a64] font-sans font-normal">/month</span></div>
              <p className="text-xs text-[#6c6a64]">Essential resume parsing and daily job matching.</p>
              <ul className="space-y-2 text-xs text-[#3d3d3a]">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>Basic resume analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>10 job matches / day</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>5 AI generations / month</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>Application Kanban tracker</span>
                </li>
              </ul>
            </div>
            <button onClick={handleStartSearch} className="w-full py-2.5 rounded-lg bg-[#efe9de] hover:bg-[#e8e0d2] text-[#141413] text-xs font-medium border border-[#e6dfd8]">
              Start Free
            </button>
          </div>

          {/* FEATURED TIER: PRO IN DARK NAVY (#181715) */}
          <div className="p-6 rounded-xl bg-[#181715] text-[#faf9f5] border border-[#252320] space-y-6 flex flex-col justify-between relative shadow-xl">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#cc785c] text-white text-[10px] font-bold font-mono uppercase">
              Most Popular
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">PRO</h3>
              <div className="font-serif-display text-4xl text-white">₹499 <span className="text-xs text-[#a09d96] font-sans font-normal">/month</span></div>
              <p className="text-xs text-[#a09d96]">For serious job seekers applying to high-growth roles.</p>
              <ul className="space-y-2 text-xs text-[#faf9f5]">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>Unlimited AI job matching</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>AI Resume ATS Optimizer</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>Cover letters & Portal Q&A answers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>STAR Interview prep coach</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>Advanced application analytics</span>
                </li>
              </ul>
            </div>
            <button onClick={handleStartSearch} className="w-full py-2.5 rounded-lg bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium shadow-sm">
              Upgrade to Pro
            </button>
          </div>

          {/* AUTOPILOT */}
          <div className="p-6 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#141413]">AUTOPILOT</h3>
              <div className="font-serif-display text-4xl text-[#141413]">₹999 <span className="text-xs text-[#6c6a64] font-sans font-normal">/month</span></div>
              <p className="text-xs text-[#6c6a64]">Full job search automation & priority matching.</p>
              <ul className="space-y-2 text-xs text-[#3d3d3a]">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>Controlled bulk review queue</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>Direct API job submissions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>Priority job discovery (every 15 mins)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#5db872]" />
                  <span>Personalized career strategy assistant</span>
                </li>
              </ul>
            </div>
            <button onClick={handleStartSearch} className="w-full py-2.5 rounded-lg bg-[#141413] hover:bg-[#252523] text-white text-xs font-medium">
              Get Autopilot
            </button>
          </div>

        </div>
      </section>

      {/* 5. FULL-BLEED CORAL CALLOUT BAND (#cc785c) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-10 sm:p-14 rounded-2xl bg-[#cc785c] text-white text-center space-y-6 shadow-xl">
          <h2 className="font-serif-display text-3xl sm:text-5xl font-normal leading-tight">
            Stop spending hours applying.<br />
            <span className="italic">Start spending time preparing for interviews.</span>
          </h2>
          <div>
            <button
              onClick={handleStartSearch}
              className="px-8 py-3.5 rounded-lg bg-[#faf9f5] hover:bg-[#efe9de] text-[#141413] font-medium text-sm shadow-md transition-all inline-flex items-center space-x-2"
            >
              <span>Start My Job Search Now</span>
              <ArrowRight className="w-4 h-4 text-[#cc785c]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
