import React, { createContext, useContext, useState } from 'react';
import type {
  CandidateProfile,
  Job,
  ApplicationRecord,
  ResumeVersion,
  InterviewPrepItem,
  NotificationItem,
  BulkQueueItem,
  ApplicationStatus
} from '../types';
import {
  initialCandidateProfile,
  initialJobs,
  initialApplications,
  initialResumeVersions,
  initialInterviewPreps,
  initialNotifications
} from '../mock/mockData';

export type ActiveView =
  | 'landing'
  | 'onboarding'
  | 'dashboard'
  | 'jobs'
  | 'resume'
  | 'tools'
  | 'bulk'
  | 'tracker'
  | 'interview'
  | 'analytics'
  | 'settings'
  | 'admin';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  
  candidateProfile: CandidateProfile;
  setCandidateProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>;
  
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  
  jobs: Job[];
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;

  
  applications: ApplicationRecord[];
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  addApplicationFromJob: (job: Job, resumeVersionName?: string) => void;
  
  resumeVersions: ResumeVersion[];
  updateResumeVersion: (version: ResumeVersion) => void;
  
  bulkQueue: BulkQueueItem[];
  toggleBulkSelection: (id: string) => void;
  toggleSelectAllBulk: (select: boolean) => void;
  processBulkApplications: () => void;
  
  interviewPreps: InterviewPrepItem[];
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  
  chatMessages: ChatMessage[];
  sendChatMessage: (userText: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(initialCandidateProfile);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('React Developer');
  const [jobs] = useState<Job[]>(initialJobs);

  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-106']);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  const [applications, setApplications] = useState<ApplicationRecord[]>(initialApplications);
  const [resumeVersions, setResumeVersions] = useState<ResumeVersion[]>(initialResumeVersions);
  const [interviewPreps] = useState<InterviewPrepItem[]>(initialInterviewPreps);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  
  // Bulk queue derived from jobs that are saved or high match
  const [bulkQueue, setBulkQueue] = useState<BulkQueueItem[]>(() =>
    initialJobs.slice(0, 4).map((j) => ({
      id: `bulk-${j.id}`,
      job: j,
      selected: true,
      tailoredResumeVersion: 'Senior Full Stack Engineer (v2)',
      coverLetterPrepared: true,
      qnaPrepared: true,
      status: j.submissionType === 'Direct API Integration' ? 'Ready' : 'Requires Portal Action'
    }))
  );

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Hello Alex! I've parsed your resume and identified 23 high-match roles today. How can I accelerate your job search right now?",
      timestamp: '10:00 AM'
    }
  ]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status } : app))
    );
  };

  const addApplicationFromJob = (job: Job, resumeVersionName = 'Senior Full Stack Engineer (v2)') => {
    const existing = applications.find((a) => a.jobId === job.id);
    if (existing) {
      updateApplicationStatus(existing.id, 'Applied');
    } else {
      const newApp: ApplicationRecord = {
        id: `app-${Date.now()}`,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        companyLogo: job.companyLogo,
        location: job.location,
        matchScore: job.matchDetails.overallScore,
        status: job.submissionType === 'Direct API Integration' ? 'Applied' : 'Ready to Apply',
        appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        submissionType: job.submissionType,
        resumeVersionUsed: resumeVersionName
      };
      setApplications((prev) => [newApp, ...prev]);
    }
  };

  const updateResumeVersion = (version: ResumeVersion) => {
    setResumeVersions((prev) =>
      prev.map((v) => (v.id === version.id ? version : v))
    );
  };

  const toggleBulkSelection = (id: string) => {
    setBulkQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const toggleSelectAllBulk = (select: boolean) => {
    setBulkQueue((prev) => prev.map((item) => ({ ...item, selected: select })));
  };

  const processBulkApplications = () => {
    const selectedItems = bulkQueue.filter((item) => item.selected);
    selectedItems.forEach((item) => {
      addApplicationFromJob(item.job, item.tailoredResumeVersion);
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const sendChatMessage = (userText: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let aiReply = "Based on your candidate profile and target roles (Senior Full Stack / Frontend Engineer), I've analyzed your request. I recommend tailoring your resume bullet points for cloud infrastructure and high-scale state management to increase your interview conversion rate by up to 24%.";

    const lower = userText.toLowerCase();
    if (lower.includes('senior backend') || lower.includes('jobs')) {
      aiReply = "I found 4 high-match backend & fullstack roles today! 1. Linear (96% Match), 2. Razorpay (92% Match), 3. Vercel (95% Match), 4. Postman (89% Match). Would you like me to prepare tailored application packs for them?";
    } else if (lower.includes('interview') || lower.includes('prepare')) {
      aiReply = "You have an upcoming Technical Architecture interview with Linear on Sep 8! I have generated STAR-format responses for system design, state sync engine, and concurrency questions in the Interview Coach module.";
    } else if (lower.includes('resume') || lower.includes('improve')) {
      aiReply = "Your base ATS compatibility score is 71%. By incorporating missing keywords like 'Server Actions', 'CRDT sync', and 'Lighthouse 98+', your optimized resume score jumps to 94%!";
    }

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now() + 1}`,
      sender: 'ai',
      text: aiReply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        isAuthenticated,
        setIsAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        candidateProfile,
        setCandidateProfile,
        globalSearchQuery,
        setGlobalSearchQuery,
        jobs,

        savedJobIds,
        toggleSaveJob,
        selectedJob,
        setSelectedJob,
        applications,
        updateApplicationStatus,
        addApplicationFromJob,
        resumeVersions,
        updateResumeVersion,
        bulkQueue,
        toggleBulkSelection,
        toggleSelectAllBulk,
        processBulkApplications,
        interviewPreps,
        notifications,
        markNotificationRead,
        chatMessages,
        sendChatMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
