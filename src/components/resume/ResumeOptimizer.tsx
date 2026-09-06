import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Download,
  Copy,
  RefreshCw,
  Eye,
  ShieldCheck
} from 'lucide-react';

export const ResumeOptimizer: React.FC = () => {
  const { candidateProfile, resumeVersions, updateResumeVersion } = useApp();
  const [activeVersionId, setActiveVersionId] = useState<string>(resumeVersions[0].id);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  const activeVersion = resumeVersions.find((v) => v.id === activeVersionId) || resumeVersions[0];

  const handleRunOptimizer = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      updateResumeVersion({
        ...activeVersion,
        atsScore: 96,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    }, 1000);
  };

  const handleSimulatedDownload = (format: 'pdf' | 'docx') => {
    const element = document.createElement("a");
    const file = new Blob([
      `# ${candidateProfile.name} - ${activeVersion.targetRole}\nEmail: ${candidateProfile.email}\n\n## SUMMARY\n${activeVersion.content.summary}\n\n## SKILLS\n${activeVersion.content.skillsEmphasized.join(', ')}\n\n## EXPERIENCE\n` +
      activeVersion.content.experienceBullets.map(b => `- ${b.role} @ ${b.company}: ${b.bullet}`).join('\n')
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${candidateProfile.name.replace(/\s+/g, '_')}_Resume_${activeVersion.targetRole.replace(/\s+/g, '_')}.${format === 'pdf' ? 'txt' : 'docx'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e6dfd8]">
        <div>
          <h2 className="font-serif-display text-3xl text-[#141413] flex items-center space-x-2">
            <span>AI Resume Optimizer & ATS Scanner</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#efe9de] text-[#141413] border border-[#e6dfd8] font-mono">
              Role-Specific Tailoring
            </span>
          </h2>
          <p className="text-xs text-[#6c6a64] mt-1">
            Compare your baseline resume against targeted job descriptions to boost ATS match scores from 71% to 94%+.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="px-3.5 py-2 rounded-xl bg-[#efe9de] border border-[#e6dfd8] hover:bg-[#e8e0d2] text-[#141413] text-xs font-medium flex items-center space-x-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#cc785c]" />
            <span>Preview Resume Document</span>
          </button>

          <button
            onClick={handleRunOptimizer}
            disabled={isOptimizing}
            className="px-4 py-2 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium shadow-sm flex items-center space-x-1.5"
          >
            {isOptimizing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Re-Analyze ATS Keywords</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Policy Trust Notice */}
      <div className="p-3.5 rounded-xl bg-[#efe9de] border border-[#e6dfd8] text-xs text-[#141413] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#5db872] shrink-0" />
          <span>
            <strong>Strict Ethical Guarantee:</strong> AI optimizes wording, keyword density, and bullet impact based strictly on your truthful profile data. We never invent fake experience or employers.
          </span>
        </div>
      </div>

      {/* Version Selector Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-[#e6dfd8]">
        <span className="text-xs text-[#6c6a64] font-mono uppercase pr-2">Resume Versions:</span>
        {resumeVersions.map((version) => (
          <button
            key={version.id}
            onClick={() => setActiveVersionId(version.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all ${
              activeVersionId === version.id
                ? 'bg-[#cc785c] text-white font-semibold shadow-sm'
                : 'bg-[#efe9de] text-[#3d3d3a] border border-[#e6dfd8] hover:text-[#141413]'
            }`}
          >
            {version.title} ({version.atsScore}% ATS)
          </button>
        ))}
      </div>

      {/* ATS Comparison Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Current Score */}
        <div className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-2">
          <span className="text-xs font-mono text-[#6c6a64] uppercase tracking-wider">Original Base ATS Score</span>
          <div className="font-serif-display text-3xl text-[#e8a55a]">71%</div>
          <p className="text-[11px] text-[#6c6a64]">Baseline resume before job-specific AI keyword alignment.</p>
        </div>

        {/* Optimized Score */}
        <div className="p-5 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-2">
          <span className="text-xs font-mono text-[#141413] uppercase tracking-wider">AI-Optimized ATS Score</span>
          <div className="font-serif-display text-3xl text-[#5db872] flex items-center space-x-2">
            <span>{activeVersion.atsScore}%</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#5db872]/20 text-[#5db872] border border-[#5db872]/30 font-sans font-normal">
              +23% Lift
            </span>
          </div>
          <p className="text-[11px] text-[#3d3d3a]">Keywords aligned for Senior Fullstack & React roles.</p>
        </div>

        {/* High Conversion Rate */}
        <div className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-2">
          <span className="text-xs font-mono text-[#6c6a64] uppercase tracking-wider">Estimated Callback Lift</span>
          <div className="font-serif-display text-3xl text-[#cc785c]">3.4x</div>
          <p className="text-[11px] text-[#6c6a64]">Candidates with &gt;90% ATS scores receive 3.4x more interview calls.</p>
        </div>

      </div>

      {/* Key Improvements & Code Editor Diff Style Dark Card (#181715) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Missing Keywords & Additions */}
        <div className="p-6 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#cc785c]" />
            <h4 className="text-sm font-bold text-[#141413] font-mono uppercase tracking-wider">
              ATS Keyword Gap Analysis
            </h4>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#141413]">Detected High-Density Keywords</label>
              <div className="flex flex-wrap gap-1.5">
                {activeVersion.content.skillsEmphasized.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 rounded-lg bg-[#5db872]/10 text-[#5db872] border border-[#5db872]/20 text-xs font-mono">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-[#141413]">Recommended Additions for Senior Roles</label>
              <div className="flex flex-wrap gap-1.5">
                {['CRDT Sync', 'Micro-frontends', 'Lighthouse 98+', 'Vector Search', 'Server Actions'].map((rec) => (
                  <span key={rec} className="px-2.5 py-1 rounded-lg bg-[#efe9de] text-[#cc785c] border border-[#e6dfd8] text-xs font-mono">
                    + Add {rec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Code Editor Style Mockup Card in Dark Navy (#181715) */}
        <div className="p-6 rounded-xl bg-[#181715] text-[#faf9f5] border border-[#252320] space-y-4">
          <div className="flex items-center justify-between border-b border-[#252320] pb-3">
            <h4 className="text-sm font-bold font-mono text-[#a09d96] uppercase tracking-wider">
              Tailored Executive Summary
            </h4>
            <button
              onClick={() => navigator.clipboard.writeText(activeVersion.content.summary)}
              className="text-xs text-[#cc785c] hover:underline flex items-center space-x-1 font-mono"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Text</span>
            </button>
          </div>

          <p className="text-xs text-[#faf9f5] leading-relaxed p-4 rounded-xl bg-[#252320] border border-[#33302b] font-mono">
            "{activeVersion.content.summary}"
          </p>

          <div className="space-y-2 pt-2">
            <h5 className="text-xs font-bold text-[#a09d96] uppercase font-mono">Quantified Bullet Recommendations</h5>
            {activeVersion.content.experienceBullets.map((bullet, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#252320] border border-[#33302b] text-xs space-y-1">
                <div className="text-[11px] font-bold text-[#cc785c] font-mono">{bullet.role} @ {bullet.company}</div>
                <p className="text-[#faf9f5] font-mono">{bullet.bullet}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Export Controls */}
      <div className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-[#141413] uppercase font-mono tracking-wider">Export Tailored Document</h4>
          <p className="text-xs text-[#6c6a64]">Download formatted resume ready for portal upload.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleSimulatedDownload('pdf')}
            className="px-4 py-2 rounded-xl bg-[#efe9de] border border-[#e6dfd8] hover:bg-[#e8e0d2] text-[#141413] text-xs font-medium flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#cc785c]" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => handleSimulatedDownload('docx')}
            className="px-4 py-2 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium flex items-center space-x-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download DOCX</span>
          </button>
        </div>
      </div>

      {/* Live Resume Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141413]/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-[#e6dfd8] pb-3">
              <h3 className="text-sm font-bold text-[#141413] font-mono uppercase">Resume Document View</h3>
              <button onClick={() => setShowPreviewModal(false)} className="text-[#6c6a64] hover:text-[#141413] text-xs">Close</button>
            </div>

            <div className="p-6 bg-white text-slate-900 rounded-xl space-y-4 text-xs font-sans shadow-md border border-[#e6dfd8]">
              <div className="text-center border-b pb-3">
                <h1 className="font-serif-display text-2xl font-bold text-slate-900">{candidateProfile.name}</h1>
                <p className="text-slate-600">{activeVersion.targetRole} • {candidateProfile.email} • {candidateProfile.preferredLocation}</p>
              </div>

              <div>
                <h2 className="font-bold text-[#cc785c] uppercase tracking-wider text-[11px] border-b pb-1 mb-1">Executive Summary</h2>
                <p className="text-slate-700 leading-relaxed">{activeVersion.content.summary}</p>
              </div>

              <div>
                <h2 className="font-bold text-[#cc785c] uppercase tracking-wider text-[11px] border-b pb-1 mb-1">Core Competencies</h2>
                <p className="text-slate-700">{activeVersion.content.skillsEmphasized.join(' • ')}</p>
              </div>

              <div>
                <h2 className="font-bold text-[#cc785c] uppercase tracking-wider text-[11px] border-b pb-1 mb-1">Professional Experience</h2>
                {activeVersion.content.experienceBullets.map((b, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>{b.role}</span>
                      <span>{b.company}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5">• {b.bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
