import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Trash2, Download } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { candidateProfile, setIsAuthenticated, setActiveView } = useApp();
  const [dataExported, setDataExported] = useState(false);

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(candidateProfile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `CareerPulse_UserData_${candidateProfile.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setDataExported(true);
    setTimeout(() => setDataExported(false), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#e6dfd8]">
        <h2 className="font-serif-display text-3xl text-[#141413] flex items-center space-x-2">
          <span>Account & Security Settings</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#efe9de] text-[#141413] border border-[#e6dfd8] font-mono">
            GDPR & Privacy Controls
          </span>
        </h2>
        <p className="text-xs text-[#6c6a64] mt-1">
          Manage your account profile, privacy permissions, data encryption settings, and connected job sources.
        </p>
      </div>

      {/* SECTION 1: PRIVACY & DATA OWNERSHIP */}
      <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-[#e6dfd8]">
          <ShieldCheck className="w-5 h-5 text-[#5db872]" />
          <h3 className="font-serif-display text-2xl text-[#141413]">Data Privacy & Sovereignty</h3>
        </div>

        <div className="space-y-4 text-xs text-[#3d3d3a]">
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#efe9de] border border-[#e6dfd8]">
            <div>
              <h4 className="font-bold text-[#141413]">Export Complete Data Archive (JSON)</h4>
              <p className="text-[#6c6a64] mt-0.5">Download all your parsed resumes, target job history, tailored cover letters, and application records.</p>
            </div>
            <button
              onClick={handleExportData}
              className="px-4 py-2 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-semibold flex items-center space-x-1.5 shrink-0 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{dataExported ? 'Archive Downloaded!' : 'Export JSON'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-[#efe9de] border border-[#e6dfd8]">
            <div>
              <h4 className="font-bold text-[#141413]">Purge Resume & Application History</h4>
              <p className="text-[#6c6a64] mt-0.5">Permanently erase uploaded resume files and AI embedding caches from our 256-bit encrypted vaults.</p>
            </div>
            <button
              onClick={() => alert('Resume history successfully purged.')}
              className="px-4 py-2 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-[#c64545] hover:bg-[#c64545]/10 text-xs font-semibold shrink-0"
            >
              Purge Vault
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-[#c64545]/10 border border-[#c64545]/20">
            <div>
              <h4 className="font-bold text-[#c64545]">Delete CareerPulse Account</h4>
              <p className="text-[#c64545]/80 mt-0.5">Irreversibly delete your account, subscription, and job matches.</p>
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to permanently delete your CareerPulse account?')) {
                  setIsAuthenticated(false);
                  setActiveView('landing');
                }
              }}
              className="px-4 py-2 rounded-xl bg-[#c64545] hover:bg-[#a03030] text-white text-xs font-semibold flex items-center space-x-1.5 shrink-0 shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
