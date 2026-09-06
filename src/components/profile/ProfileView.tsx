import React, { useState, useEffect } from 'react';
import { supabase, type ProfileRecord } from '../../lib/supabase';
import { ResumeUpload } from '../resume/ResumeUpload';
import { User, Mail, Phone, MapPin, Globe, ToggleLeft, ToggleRight, Save, CheckCircle2 } from 'lucide-react';


export const ProfileView: React.FC = () => {
  const [profile, setProfile] = useState<ProfileRecord>({
    id: 'demo-user',
    full_name: 'Alex Morgan',
    email: 'alex.morgan@techpulse.io',
    phone: '+91 98765 43210',
    location: 'Bangalore / Remote',
    linkedin_url: 'https://linkedin.com/in/alexmorgan-dev',
    resume_text: `Alex Morgan\nalex.morgan@techpulse.io | Bangalore / Remote\n\nEXECUTIVE SUMMARY:\nSenior Software Engineer with 5.2+ years of full-stack engineering experience building high-scale web applications in React, TypeScript, Next.js, and Node.js.\n\nSKILLS:\nReact 19, TypeScript, Next.js 15, Node.js, PostgreSQL, Docker, AWS, Tailwind CSS`,
    auto_apply: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchProfile = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userData.user.id)
          .single();

        if (data && !error) {
          setProfile(data);
        }
      }
    } catch (err) {
      console.warn('[ProfileView] Error fetching profile:', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        await supabase
          .from('profiles')
          .upsert({
            id: userData.user.id,
            full_name: profile.full_name,
            email: profile.email,
            phone: profile.phone,
            location: profile.location,
            linkedin_url: profile.linkedin_url,
            resume_text: profile.resume_text,
            auto_apply: profile.auto_apply
          });
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('[ProfileView] Error saving profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Candidate Profile & Resume Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Manage your contact details, auto-apply preferences, and resume parsing vault.</p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
        <h3 className="font-semibold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center space-x-2">
          <User className="w-4 h-4 text-indigo-600" />
          <span>Personal & Professional Info</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div>
            <label className="block text-slate-700 font-medium mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={profile.full_name || ''}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
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
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">Location</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={profile.location || ''}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-700 font-medium mb-1">LinkedIn Profile URL</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={profile.linkedin_url || ''}
                onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

        </div>

        {/* Auto-apply toggle */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-900 text-xs">Auto-apply to matching jobs automatically</h4>
            <p className="text-[11px] text-slate-500">Enable daily background cron task to auto-queue matching roles.</p>
          </div>
          
          <button
            type="button"
            onClick={() => setProfile({ ...profile, auto_apply: !profile.auto_apply })}
            className="text-indigo-600 focus:outline-none"
          >
            {profile.auto_apply ? (
              <ToggleRight className="w-8 h-8 text-indigo-600" />
            ) : (
              <ToggleLeft className="w-8 h-8 text-slate-400" />
            )}
          </button>
        </div>

        {/* Save Button */}
        <div className="flex items-center space-x-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Profile Settings'}</span>
          </button>

          {saveSuccess && (
            <span className="text-xs text-emerald-600 font-medium flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Profile updated!</span>
            </span>
          )}
        </div>
      </form>

      {/* Resume Upload Component */}
      <ResumeUpload
        currentResumeText={profile.resume_text}
        onSuccess={(parsed) => setProfile({ ...profile, resume_text: parsed })}
      />
    </div>
  );
};
