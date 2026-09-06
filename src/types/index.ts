export type WorkModel = 'Remote' | 'Hybrid' | 'Onsite' | 'All';

export type ApplicationStatus = 
  | 'Saved'
  | 'Ready to Apply'
  | 'Applied'
  | 'Assessment'
  | 'Interview'
  | 'Offer'
  | 'Rejected';

export type SubmissionType = 'Direct API Integration' | 'Open & Apply Portal';

export interface ScoreBreakdown {
  skills: number;
  experience: number;
  location: number;
  seniority: number;
  industry: number;
  salary: number;
}

export interface MatchDetails {
  overallScore: number;
  breakdown: ScoreBreakdown;
  whyMatch: string[];
  missingRequirements: string[];
  strategyNote: string;
}

export interface Job {
  id: string;
  source: 'LinkedIn' | 'Naukri' | 'Indeed' | 'Wellfound' | 'Glassdoor' | 'Company Site';
  sourceJobId: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  workModel: 'Remote' | 'Hybrid' | 'Onsite';
  salaryRange: string;
  experienceLevel: string;
  skills: string[];
  description: string;
  postedAt: string;
  url: string;
  submissionType: SubmissionType;
  matchDetails: MatchDetails;
  isSaved?: boolean;
}

export interface CandidateProfile {
  name: string;
  email: string;
  currentRole: string;
  yearsOfExperience: number;
  skills: string[];
  technicalSkills: string[];
  softSkills: string[];
  education: string;
  certifications: string[];
  previousRoles: { title: string; company: string; duration: string }[];
  industries: string[];
  targetRoles: string[];
  preferredLocation: string;
  workModelPreference: WorkModel;
  experienceLevelPref: string;
  salaryExpectation: string;
  jobFreshness: '24h' | '3d' | '7d' | '30d';
  atsScore: number;
}

export interface ApplicationRecord {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  location: string;
  matchScore: number;
  status: ApplicationStatus;
  appliedDate: string;
  submissionType: SubmissionType;
  resumeVersionUsed: string;
  coverLetterSnippet?: string;
  notes?: string;
  nextStep?: string;
  nextStepDate?: string;
}

export interface ResumeVersion {
  id: string;
  title: string;
  targetRole: string;
  lastUpdated: string;
  atsScore: number;
  isDefault: boolean;
  content: {
    summary: string;
    skillsEmphasized: string[];
    experienceBullets: { company: string; role: string; bullet: string }[];
  };
}

export interface CoverLetter {
  id: string;
  jobId: string;
  company: string;
  role: string;
  tone: 'Professional' | 'Confident' | 'Concise' | 'Conversational';
  content: string;
  generatedAt: string;
}

export interface BulkQueueItem {
  id: string;
  job: Job;
  selected: boolean;
  tailoredResumeVersion: string;
  coverLetterPrepared: boolean;
  qnaPrepared: boolean;
  status: 'Ready' | 'Submitted' | 'Requires Portal Action';
}

export interface InterviewPrepItem {
  id: string;
  company: string;
  role: string;
  interviewDate: string;
  readinessScore: number; // e.g. 78%
  technicalScore: number;
  behavioralScore: number;
  companyScore: number;
  questions: {
    id: string;
    category: 'Technical' | 'Behavioral' | 'Company';
    question: string;
    starAnswer: string;
    keyTips: string[];
  }[];
  companyResearchNotes: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'match' | 'interview' | 'application' | 'system';
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  paidUsers: number;
  monthlyRevenueINR: number;
  jobsProcessedToday: number;
  applicationsSubmittedToday: number;
  aiTokenConsumptionMillions: number;
  sourcesBreakdown: { source: string; percentage: number }[];
}
