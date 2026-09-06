import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ResumeUpload } from '../resume/ResumeUpload';
import { User, Phone, MapPin, Globe, ArrowRight, Sparkles } from 'lucide-react';


interface OnboardingViewProps {
  onComplete: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const [fullName, setFullName] = useState('Alex Morgan');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Bangalore / Remote');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/alexmorgan-dev');
  const [parsedResumeText, setParsedResumeText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        await supabase.from('profiles').upsert({
          id: userData.user.id,
          full_name: fullName,
          email: userData.user.email || 'alex@example.com',
          phone,
          location,
          linkedin_url: linkedinUrl,
          resume_text: parsedResumeText || 'Senior Software Engineer with 5+ years experience',
          auto_apply: true
        });
      }
      onComplete();
    } catch (err) {
      console.error('[OnboardingView] Error saving onboarding:', err);
      onComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      
      {/* Onboarding Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-mono border border-indigo-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Candidate Onboarding</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome to JobHunt AI</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Complete your profile and upload your resume to activate automated job aggregation & AI auto-applying.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <h3 className="font-semibold text-slate-900 text-sm pb-2 border-b border-slate-100">Step 1: Contact Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-medium mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">Target Location</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Bangalore, Delhi, or Remote"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">LinkedIn Profile</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                required
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/alexmorgan"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

        </div>

        <h3 className="font-semibold text-slate-900 text-sm pt-3 pb-2 border-b border-slate-100">Step 2: Resume Upload</h3>
        
        <ResumeUpload
          onSuccess={(text) => setParsedResumeText(text)}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all"
        >
          <span>{isSubmitting ? 'Finalizing Profile...' : 'Complete Onboarding & Go to Dashboard'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
