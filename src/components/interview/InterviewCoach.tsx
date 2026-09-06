import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Send,
  Brain
} from 'lucide-react';

export const InterviewCoach: React.FC = () => {
  const { interviewPreps, chatMessages, sendChatMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [activePrepId] = useState<string>(interviewPreps[0].id);

  const activePrep = interviewPreps.find((p) => p.id === activePrepId) || interviewPreps[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const cannedPrompts = [
    "Find me senior backend jobs.",
    "Which jobs should I apply to today?",
    "Why am I not getting interviews?",
    "Prepare me for my Linear system design interview."
  ];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="pb-4 border-b border-[#e6dfd8]">
        <h2 className="font-serif-display text-3xl text-[#141413] flex items-center space-x-2">
          <span>AI Career Assistant & Interview Readiness Coach</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#5db872]/10 text-[#5db872] border border-[#5db872]/20 font-mono">
            Interactive Copilot
          </span>
        </h2>
        <p className="text-xs text-[#6c6a64] mt-1">
          Prepare for upcoming technical and behavioral rounds with company-specific research, STAR answers, and real-time AI career guidance.
        </p>
      </div>

      {/* SECTION 1: INTERVIEW READINESS SCORE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-2">
          <div className="text-xs font-mono text-[#141413] uppercase tracking-wider">Overall Readiness</div>
          <div className="font-serif-display text-3xl text-[#5db872]">{activePrep.readinessScore}%</div>
          <p className="text-[11px] text-[#3d3d3a]">Strong candidate profile fit.</p>
        </div>

        <div className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-2">
          <div className="text-xs font-mono text-[#6c6a64] uppercase tracking-wider">Technical Mastery</div>
          <div className="font-serif-display text-3xl text-[#cc785c]">{activePrep.technicalScore}%</div>
          <p className="text-[11px] text-[#6c6a64]">System design & state sync.</p>
        </div>

        <div className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-2">
          <div className="text-xs font-mono text-[#6c6a64] uppercase tracking-wider">Behavioral STAR Fit</div>
          <div className="font-serif-display text-3xl text-[#5db8a6]">{activePrep.behavioralScore}%</div>
          <p className="text-[11px] text-[#6c6a64]">Cross-team collaboration.</p>
        </div>

        <div className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-2">
          <div className="text-xs font-mono text-[#6c6a64] uppercase tracking-wider">Company Knowledge</div>
          <div className="font-serif-display text-3xl text-[#e8a55a]">{activePrep.companyScore}%</div>
          <p className="text-[11px] text-[#6c6a64]">Product philosophy aligned.</p>
        </div>

      </div>

      {/* SECTION 2: INTERVIEW PREP PACK FOR LINEAR */}
      <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e6dfd8]">
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5db872]/10 text-[#5db872] border border-[#5db872]/20">
              Upcoming Round: {activePrep.interviewDate}
            </span>
            <h3 className="font-serif-display text-2xl text-[#141413] mt-1">
              Interview Prep Pack: {activePrep.role} @ {activePrep.company}
            </h3>
          </div>

          <div className="p-2.5 rounded-xl bg-[#efe9de] border border-[#e6dfd8] text-[#cc785c]">
            <Brain className="w-5 h-5" />
          </div>
        </div>

        {/* Company Research Note */}
        <div className="p-4 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-1 text-xs">
          <strong className="text-[#cc785c] font-mono uppercase tracking-wider">Company Intelligence Brief: </strong>
          <p className="text-[#3d3d3a] leading-relaxed font-mono mt-1">{activePrep.companyResearchNotes}</p>
        </div>

        {/* Question Sets */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[#6c6a64] uppercase font-mono tracking-wider">
            Curated High-Probability Interview Questions & STAR Guidance
          </h4>

          <div className="space-y-4">
            {activePrep.questions.map((q) => (
              <div key={q.id} className="p-5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#efe9de] text-[#141413] border border-[#e6dfd8]">
                    {q.category} Question
                  </span>
                </div>

                <h5 className="text-sm font-bold text-[#141413] leading-snug">{q.question}</h5>

                <div className="p-4 rounded-xl bg-[#181715] text-[#faf9f5] border border-[#252320] text-xs font-mono space-y-1">
                  <strong className="text-[#5db872] block">Recommended STAR Answer Framework:</strong>
                  <p className="whitespace-pre-line leading-relaxed">{q.starAnswer}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {q.keyTips.map((tip, idx) => (
                    <span key={idx} className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#efe9de] text-[#3d3d3a] border border-[#e6dfd8]">
                      💡 Tip: {tip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: INTERACTIVE AI CAREER ASSISTANT CHAT */}
      <div className="bg-[#faf9f5] border border-[#e6dfd8] rounded-2xl p-6 space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-[#e6dfd8]">
          <MessageSquare className="w-5 h-5 text-[#cc785c]" />
          <div>
            <h3 className="font-serif-display text-2xl text-[#141413]">Ask AI Career Assistant</h3>
            <p className="text-xs text-[#6c6a64]">Real-time answers powered by your verified candidate profile.</p>
          </div>
        </div>

        {/* Quick Canned Prompt Chips */}
        <div className="flex flex-wrap gap-2">
          {cannedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                sendChatMessage(prompt);
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#efe9de] border border-[#e6dfd8] text-[#141413] hover:border-[#cc785c] transition-all font-mono"
            >
              💬 {prompt}
            </button>
          ))}
        </div>

        {/* Chat History Box in Dark Card Style (#181715) */}
        <div className="h-64 overflow-y-auto p-4 rounded-xl bg-[#181715] border border-[#252320] space-y-3 font-mono text-xs">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-xl p-3.5 rounded-xl leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#cc785c] text-white rounded-br-none'
                    : 'bg-[#252320] border border-[#33302b] text-[#faf9f5] rounded-bl-none'
                }`}
              >
                <div className="text-[10px] font-bold opacity-75 mb-1">
                  {msg.sender === 'user' ? 'You' : 'CareerPulse AI Assistant'} • {msg.timestamp}
                </div>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything about job strategy, interview prep, salary negotiation, or skill gaps..."
            className="flex-1 px-4 py-2.5 text-xs bg-[#efe9de] border border-[#e6dfd8] rounded-xl text-[#141413] focus:outline-none focus:border-[#cc785c] font-mono"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-bold shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
