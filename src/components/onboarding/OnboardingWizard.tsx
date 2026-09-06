import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Upload, Sparkles, Check, ArrowRight, ArrowLeft, ShieldCheck, Briefcase, MapPin, DollarSign, Clock, FileText, Cpu } from 'lucide-react';

export const OnboardingWizard: React.FC = () => {
  const { setActiveView, candidateProfile, setCandidateProfile } = useApp();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Profile editable form state
  const [name, setName] = useState(candidateProfile.name);
  const [currentRole, setCurrentRole] = useState(candidateProfile.currentRole);
  const [yearsExp, setYearsExp] = useState(candidateProfile.yearsOfExperience);
  const [skillsText, setSkillsText] = useState(candidateProfile.skills.join(', '));
  const [targetRolesText, setTargetRolesText] = useState(candidateProfile.targetRoles.join(', '));
  const [preferredLocation, setPreferredLocation] = useState(candidateProfile.preferredLocation);
  const [workModelPref, setWorkModelPref] = useState(candidateProfile.workModelPreference);
  const [salaryExp, setSalaryExp] = useState(candidateProfile.salaryExpectation);
  const [freshness, setFreshness] = useState(candidateProfile.jobFreshness);

  const handleSimulatedFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setStep(2);
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const handleSaveAndComplete = () => {
    setCandidateProfile((prev) => ({
      ...prev,
      name,
      currentRole,
      yearsOfExperience: Number(yearsExp),
      skills: skillsText.split(',').map((s) => s.trim()).filter(Boolean),
      targetRoles: targetRolesText.split(',').map((r) => r.trim()).filter(Boolean),
      preferredLocation,
      workModelPreference: workModelPref,
      salaryExpectation: salaryExp,
      jobFreshness: freshness
    }));
    setActiveView('dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      
      {/* Wizard Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-serif-display text-3xl text-[#141413]">Set Up Your AI Job Autopilot</h2>
            <p className="text-xs text-[#6c6a64] mt-1">Step {step} of 3 — Let AI extract your profile and configure job preferences.</p>
          </div>
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${
                  step === s
                    ? 'bg-[#cc785c] text-white shadow-sm'
                    : step > s
                    ? 'bg-[#5db872]/20 text-[#5db872] border border-[#5db872]/30'
                    : 'bg-[#efe9de] text-[#6c6a64]'
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full bg-[#e6dfd8] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#cc785c] h-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Upload Resume */}
      {step === 1 && (
        <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="text-center space-y-2 max-w-md mx-auto">
            <div className="inline-flex p-3 rounded-2xl bg-[#efe9de] border border-[#e6dfd8] text-[#cc785c] mb-1">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-2xl text-[#141413]">Upload Your Resume</h3>
            <p className="text-xs text-[#6c6a64] leading-relaxed">
              Upload your PDF or DOCX resume. Our AI parser extracts your skills, experience, target roles, and highlights ATS optimization opportunities automatically.
            </p>
          </div>

          {!isUploading ? (
            <div
              onClick={handleSimulatedFileUpload}
              className="border-2 border-dashed border-[#e6dfd8] hover:border-[#cc785c] rounded-2xl p-8 text-center cursor-pointer transition-all bg-[#efe9de]/50 hover:bg-[#efe9de] group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#faf9f5] group-hover:bg-[#efe9de] border border-[#e6dfd8] flex items-center justify-center mx-auto mb-4 text-[#6c6a64] group-hover:text-[#cc785c] transition-all">
                <FileText className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-[#141413]">Drop your resume here, or <span className="text-[#cc785c] underline">browse files</span></p>
              <p className="text-xs text-[#6c6a64] mt-1">Supports PDF, DOCX (Max 10MB). Privacy guaranteed.</p>
              
              <div className="mt-6 inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#faf9f5] border border-[#e6dfd8] text-xs text-[#3d3d3a]">
                <Sparkles className="w-3.5 h-3.5 text-[#cc785c]" />
                <span>Or use pre-populated demo resume (Alex Morgan - Senior Full Stack)</span>
              </div>
            </div>
          ) : (
            <div className="border border-[#e6dfd8] rounded-2xl p-8 text-center bg-[#efe9de] space-y-4">
              <div className="inline-flex p-4 rounded-2xl bg-[#faf9f5] text-[#cc785c] animate-pulse">
                <Cpu className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#141413]">Analyzing Your Resume with AI...</h4>
                <p className="text-xs text-[#6c6a64] mt-1">Extracting technical skills, achievements, target roles, and ATS compatibility metrics.</p>
              </div>

              <div className="max-w-xs mx-auto space-y-2">
                <div className="w-full bg-[#e6dfd8] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#cc785c] h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span className="text-xs text-[#cc785c] font-mono font-semibold">{uploadProgress}%</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-[#e6dfd8] text-xs text-[#6c6a64]">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#5db872]" />
              <span>Resume data stays 100% private and encrypted.</span>
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-[#cc785c] font-semibold hover:underline flex items-center space-x-1"
            >
              <span>Skip upload, use default profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: AI Candidate Profile Verification */}
      {step === 2 && (
        <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6dfd8]">
            <div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#5db872]/10 text-[#5db872] border border-[#5db872]/20 font-mono font-medium">
                ✓ AI Analysis Complete
              </span>
              <h3 className="font-serif-display text-2xl text-[#141413] mt-2">Verify Your AI Candidate Profile</h3>
              <p className="text-xs text-[#6c6a64]">Review and edit the candidate information extracted from your resume.</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#efe9de] border border-[#e6dfd8] text-[#cc785c]">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#3d3d3a] mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3d3d3a] mb-1">Current Position / Title</label>
              <input
                type="text"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3d3d3a] mb-1">Years of Experience</label>
              <input
                type="number"
                step="0.1"
                value={yearsExp}
                onChange={(e) => setYearsExp(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3d3d3a] mb-1">Education</label>
              <input
                type="text"
                value={candidateProfile.education}
                readOnly
                className="w-full px-3.5 py-2 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#6c6a64] cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#3d3d3a] mb-1">Detected Technical & Soft Skills (Comma separated)</label>
            <textarea
              rows={2}
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#3d3d3a] mb-1">Target Roles for Job Search</label>
            <input
              type="text"
              value={targetRolesText}
              onChange={(e) => setTargetRolesText(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c]"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#e6dfd8]">
            <button
              onClick={() => setStep(1)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#efe9de] text-[#141413] text-xs font-semibold hover:bg-[#e8e0d2]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-semibold shadow-sm"
            >
              <span>Continue to Job Preferences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Job Preferences Setup */}
      {step === 3 && (
        <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-[#e6dfd8]">
            <h3 className="font-serif-display text-2xl text-[#141413]">Configure Job Preferences</h3>
            <p className="text-xs text-[#6c6a64] mt-1">Tell AI what your dream role looks like so it can rank opportunities across all supported job networks.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#3d3d3a] mb-1 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#cc785c]" />
                <span>Preferred Location</span>
              </label>
              <input
                type="text"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                placeholder="Bangalore, India / Remote"
                className="w-full px-3.5 py-2 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3d3d3a] mb-1 flex items-center space-x-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#cc785c]" />
                <span>Work Model Preference</span>
              </label>
              <select
                value={workModelPref}
                onChange={(e) => setWorkModelPref(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c]"
              >
                <option value="Remote">Remote Only</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">On-site</option>
                <option value="All">All Types</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3d3d3a] mb-1 flex items-center space-x-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#cc785c]" />
                <span>Salary Expectations</span>
              </label>
              <input
                type="text"
                value={salaryExp}
                onChange={(e) => setSalaryExp(e.target.value)}
                placeholder="₹25L – ₹40L / $100k – $140k"
                className="w-full px-3.5 py-2 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3d3d3a] mb-1 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#cc785c]" />
                <span>Job Freshness Filter</span>
              </label>
              <select
                value={freshness}
                onChange={(e) => setFreshness(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c]"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="3d">Last 3 Days</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#e6dfd8]">
            <button
              onClick={() => setStep(2)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#efe9de] text-[#141413] text-xs font-semibold hover:bg-[#e8e0d2]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleSaveAndComplete}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-bold shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Job Dashboard</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
