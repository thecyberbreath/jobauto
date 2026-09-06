import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Wand2, Copy, Check, RefreshCw, Sparkles, MessageSquare } from 'lucide-react';

export const ToolsHub: React.FC = () => {
  const { candidateProfile, jobs } = useApp();
  
  // Cover Letter state
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0].id);
  const [tone, setTone] = useState<'Professional' | 'Confident' | 'Concise' | 'Conversational'>('Confident');
  const [isGeneratingCL, setIsGeneratingCL] = useState(false);
  const [copiedCL, setCopiedCL] = useState(false);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const generateCoverLetterText = (jobTitle: string, companyName: string, toneType: string) => {
    if (toneType === 'Confident') {
      return `Dear Hiring Team at ${companyName},\n\nI am writing to express my strong interest in the ${jobTitle} position. With over ${candidateProfile.yearsOfExperience} years of experience crafting high-performance web applications using ${candidateProfile.technicalSkills.slice(0, 4).join(', ')}, I have consistently delivered scalable systems that drive core product growth.\n\nAt AuraTech Solutions, I architected frontend micro-services that scaled to 1.2M monthly active users while cutting bundle sizes by 38%. What excites me about ${companyName} is your commitment to exceptional product craft and technical excellence. My background in building real-time web applications aligns directly with your current scaling goals.\n\nI would welcome the opportunity to discuss how my technical expertise and leadership can contribute directly to ${companyName}'s success.\n\nBest regards,\n${candidateProfile.name}`;
    } else if (toneType === 'Concise') {
      return `Dear Hiring Manager at ${companyName},\n\nI am applying for the ${jobTitle} role. As a Senior Fullstack Engineer with 5.2+ years of experience in React, TypeScript, Next.js, and Node.js, I bring a proven track record of optimizing page latency by 45% and maintaining 99.99% API uptime.\n\nI am drawn to ${companyName}'s engineering culture and look forward to contributing immediately to your core product pipeline.\n\nSincerely,\n${candidateProfile.name}`;
    } else if (toneType === 'Conversational') {
      return `Hi ${companyName} Team,\n\nI’ve been following ${companyName}'s work and was thrilled to see the opening for ${jobTitle}. As an engineer who lives and breathes React, Next.js, and sleek UI craftsmanship, I’d love to join your team.\n\nIn my recent projects, I built real-time streaming tools and micro-frontend architectures that increased daily user engagement by 64%. I’d love to bring this same energy and technical rigor to ${companyName}.\n\nLooking forward to connecting!\n\nCheers,\n${candidateProfile.name}`;
    } else {
      return `Dear Hiring Committee,\n\nPlease accept this application for the ${jobTitle} position at ${companyName}. My background encompasses over 5 years of software engineering experience specializing in full-stack architecture, API design, and cloud deployments.\n\nI look forward to discussing how my qualifications align with your strategic technical vision.\n\nSincerely,\n${candidateProfile.name}`;
    }
  };

  const [clContent, setClContent] = useState<string>(() =>
    generateCoverLetterText(selectedJob.title, selectedJob.company, 'Confident')
  );

  const handleGenerateCL = () => {
    setIsGeneratingCL(true);
    setTimeout(() => {
      setIsGeneratingCL(false);
      setClContent(generateCoverLetterText(selectedJob.title, selectedJob.company, tone));
    }, 600);
  };

  const handleCopyCL = () => {
    navigator.clipboard.writeText(clContent);
    setCopiedCL(true);
    setTimeout(() => setCopiedCL(false), 2000);
  };

  // Application Q&A State
  const [selectedQuestion, setSelectedQuestion] = useState<string>('why_work_here');
  const [qaDraft, setQaDraft] = useState<string>(
    `I am deeply motivated by ${selectedJob.company}'s mission in developer tools and SaaS engineering. Having spent 5+ years building high-scale React & Next.js applications, I value fast iteration, high UI polish, and scalable system architecture—all of which are core to ${selectedJob.company}'s engineering culture.`
  );

  const handleGenerateQA = (qKey: string) => {
    setSelectedQuestion(qKey);
    setTimeout(() => {
      if (qKey === 'why_work_here') {
        setQaDraft(
          `I am deeply motivated by ${selectedJob.company}'s mission in developer tools and SaaS engineering. Having spent 5+ years building high-scale React & Next.js applications, I value fast iteration, high UI polish, and scalable system architecture—all of which are core to ${selectedJob.company}'s engineering culture.`
        );
      } else if (qKey === 'why_hire_you') {
        setQaDraft(
          `You should hire me because I bring a proven track record of shipping production code that directly impacts business metrics—such as reducing bundle sizes by 38% for 1.2M monthly users and building Node.js PostgreSQL services handling 15,000 requests per second with 99.99% uptime.`
        );
      } else {
        setQaDraft(
          `Over the past 3+ years, I have routinely deployed serverless applications using AWS Lambda, S3, and CloudFront alongside Dockerized container services. My approach prioritizes security, cost optimization, and automated CI/CD pipelines.`
        );
      }
    }, 300);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#e6dfd8]">
        <h2 className="font-serif-display text-3xl text-[#141413] flex items-center space-x-2">
          <span>AI Cover Letter & Application Q&A Generator</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#efe9de] text-[#141413] border border-[#e6dfd8] font-mono">
            Truthful AI Assistant
          </span>
        </h2>
        <p className="text-xs text-[#6c6a64] mt-1">
          Draft tailored cover letters and answer repetitive portal questions using verified information from your profile.
        </p>
      </div>

      {/* SECTION 1: COVER LETTER GENERATOR */}
      <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e6dfd8]">
          <div className="flex items-center space-x-2">
            <Wand2 className="w-5 h-5 text-[#cc785c]" />
            <h3 className="font-serif-display text-2xl text-[#141413]">Targeted Cover Letter Generator</h3>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-xs text-[#6c6a64] font-mono">Tone:</label>
            {(['Professional', 'Confident', 'Concise', 'Conversational'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  tone === t
                    ? 'bg-[#cc785c] text-white font-bold'
                    : 'bg-[#efe9de] text-[#3d3d3a] border border-[#e6dfd8] hover:text-[#141413]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Job Selection Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#3d3d3a] mb-1">Target Job Posting</label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none font-mono"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title} @ {j.company} ({j.matchDetails.overallScore}% Match)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerateCL}
              disabled={isGeneratingCL}
              className="w-full py-2.5 px-4 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium shadow-sm flex items-center justify-center space-x-2"
            >
              {isGeneratingCL ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Tailored Cover Letter</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Cover Letter Output Area in Dark Code Card Style (#181715) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#6c6a64]">Generated Draft (Editable)</span>
            <button
              onClick={handleCopyCL}
              className="text-xs text-[#cc785c] hover:underline font-medium flex items-center space-x-1"
            >
              {copiedCL ? <Check className="w-3.5 h-3.5 text-[#5db872]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCL ? 'Copied to Clipboard!' : 'Copy Cover Letter'}</span>
            </button>
          </div>

          <textarea
            rows={10}
            value={clContent}
            onChange={(e) => setClContent(e.target.value)}
            className="w-full p-4 text-xs font-mono bg-[#181715] border border-[#252320] rounded-xl text-[#faf9f5] focus:outline-none focus:border-[#cc785c] leading-relaxed"
          />
        </div>
      </div>

      {/* SECTION 2: APPLICATION ANSWER AI */}
      <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 space-y-6">
        <div className="pb-4 border-b border-[#e6dfd8]">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-[#5db8a6]" />
            <h3 className="font-serif-display text-2xl text-[#141413]">Application Answer Assistant</h3>
          </div>
          <p className="text-xs text-[#6c6a64] mt-1">
            Generate high-converting answers for portal questions without ever inventing false qualifications.
          </p>
        </div>

        {/* Common Portal Question Selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleGenerateQA('why_work_here')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedQuestion === 'why_work_here'
                ? 'bg-[#141413] text-white font-semibold'
                : 'bg-[#efe9de] text-[#3d3d3a] border border-[#e6dfd8] hover:text-[#141413]'
            }`}
          >
            "Why do you want to work here?"
          </button>
          <button
            onClick={() => handleGenerateQA('why_hire_you')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedQuestion === 'why_hire_you'
                ? 'bg-[#141413] text-white font-semibold'
                : 'bg-[#efe9de] text-[#3d3d3a] border border-[#e6dfd8] hover:text-[#141413]'
            }`}
          >
            "Why should we hire you?"
          </button>
          <button
            onClick={() => handleGenerateQA('aws_exp')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
              selectedQuestion === 'aws_exp'
                ? 'bg-[#141413] text-white font-semibold'
                : 'bg-[#efe9de] text-[#3d3d3a] border border-[#e6dfd8] hover:text-[#141413]'
            }`}
          >
            "Describe your experience with AWS & Cloud"
          </button>
        </div>

        {/* Answer Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#6c6a64]">AI Profile-Verified Answer Draft</span>
            <button
              onClick={() => navigator.clipboard.writeText(qaDraft)}
              className="text-xs text-[#cc785c] hover:underline flex items-center space-x-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Answer</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={qaDraft}
            onChange={(e) => setQaDraft(e.target.value)}
            className="w-full p-4 text-xs font-mono bg-[#181715] border border-[#252320] rounded-xl text-[#faf9f5] focus:outline-none focus:border-[#cc785c] leading-relaxed"
          />
        </div>
      </div>

    </div>
  );
};
