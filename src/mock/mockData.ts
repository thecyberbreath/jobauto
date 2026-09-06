import type { CandidateProfile, Job, ApplicationRecord, ResumeVersion, InterviewPrepItem, NotificationItem, AdminStats } from '../types';

export const initialCandidateProfile: CandidateProfile = {
  name: "Alex Morgan",
  email: "alex.morgan@techpulse.io",
  currentRole: "Senior Frontend & Fullstack Developer",
  yearsOfExperience: 5.2,
  skills: ["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "GraphQL", "AWS", "PostgreSQL", "Docker", "REST APIs", "Jest", "CI/CD"],
  technicalSkills: ["React 19", "TypeScript 5.5", "Next.js 15", "Node.js", "PostgreSQL", "Docker", "AWS S3/Lambda", "Tailwind CSS"],
  softSkills: ["Product Architecture", "Cross-Functional Leadership", "Technical Writing", "Agile/Scrum", "Code Mentorship"],
  education: "B.Tech in Computer Science & Engineering (2020)",
  certifications: ["AWS Certified Developer Associate", "Meta Frontend Developer Professional"],
  previousRoles: [
    { title: "Senior Software Engineer", company: "AuraTech Solutions", duration: "2023 - Present" },
    { title: "Frontend Engineer", company: "CloudScale Inc.", duration: "2021 - 2023" },
    { title: "Junior Web Developer", company: "Nexus Labs", duration: "2020 - 2021" }
  ],
  industries: ["SaaS", "FinTech", "AI Tools", "Developer Platforms"],
  targetRoles: ["Senior Full Stack Engineer", "Senior Frontend Engineer", "Product Engineer", "Lead React Developer"],
  preferredLocation: "Bangalore / Remote",
  workModelPreference: "Remote",
  experienceLevelPref: "5-8 years",
  salaryExpectation: "₹24L – ₹35L / $90k – $130k",
  jobFreshness: "7d",
  atsScore: 71
};

export const initialJobs: Job[] = [
  {
    id: "job-101",
    source: "LinkedIn",
    sourceJobId: "li-8839201",
    title: "Senior Full Stack Engineer",
    company: "Linear (Remote)",
    companyLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=Linear",
    location: "Remote (India / Global)",
    workModel: "Remote",
    salaryRange: "₹28L – ₹42L / $110k – $140k",
    experienceLevel: "5+ years",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "GraphQL", "Tailwind CSS"],
    description: "We are looking for a Senior Full Stack Engineer to build high-performance, real-time collaboration workflows in Linear. You will craft fluid micro-interactions, optimize client-side sync engines, and build scalable backend GraphQL microservices.",
    postedAt: "4 hours ago",
    url: "https://linear.app/careers",
    submissionType: "Direct API Integration",
    matchDetails: {
      overallScore: 96,
      breakdown: {
        skills: 98,
        experience: 95,
        location: 100,
        seniority: 96,
        industry: 92,
        salary: 95
      },
      whyMatch: [
        "9/10 required technical skills match (React, TS, Node, Tailwind, GraphQL)",
        "5.2 years of relevant experience exceeds the 5+ year requirement",
        "100% remote preference alignment",
        "Strong background in SaaS & developer tool platforms"
      ],
      missingRequirements: [
        "Knowledge of WebSockets sync protocols preferred",
        "Experience with Rust/Wasm micro-modules is a bonus"
      ],
      strategyNote: "Highlight your experience with real-time UI state sync and state management in Next.js."
    }
  },
  {
    id: "job-102",
    source: "Naukri",
    sourceJobId: "nk-992012",
    title: "Lead Frontend Engineer (React/Next.js)",
    company: "Razorpay",
    companyLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=Razorpay",
    location: "Bangalore, KA (Hybrid)",
    workModel: "Hybrid",
    salaryRange: "₹30L – ₹45L",
    experienceLevel: "5-8 years",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "System Design", "Micro-frontends"],
    description: "Razorpay is seeking a Lead Frontend Engineer to drive architecture across our core checkout and merchant analytics dashboard serving millions of daily transactions.",
    postedAt: "1 day ago",
    url: "https://razorpay.com/jobs",
    submissionType: "Open & Apply Portal",
    matchDetails: {
      overallScore: 92,
      breakdown: {
        skills: 94,
        experience: 92,
        location: 90,
        seniority: 94,
        industry: 88,
        salary: 94
      },
      whyMatch: [
        "Strong match on React, TypeScript, Next.js, and CSS architecture",
        "Target role matches Senior/Lead Frontend expectation",
        "Salary range matches your upper bound expectations (₹30L+)"
      ],
      missingRequirements: [
        "Prior FinTech payment gateway experience preferred",
        "Micro-frontend module federation experience"
      ],
      strategyNote: "Emphasize security compliance, high-performance UI optimization, and cross-team mentorship."
    }
  },
  {
    id: "job-103",
    source: "Wellfound",
    sourceJobId: "wf-77281",
    title: "Senior Product Engineer (AI SaaS)",
    company: "Vercel",
    companyLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=Vercel",
    location: "Remote",
    workModel: "Remote",
    salaryRange: "$120k – $150k + Equity",
    experienceLevel: "4+ years",
    skills: ["Next.js", "TypeScript", "React", "Node.js", "AWS", "Serverless", "Tailwind CSS"],
    description: "Join the Vercel AI Platform team to craft next-generation AI developer experience tools, v0 AI canvas components, and serverless Edge deployments.",
    postedAt: "2 days ago",
    url: "https://vercel.com/careers",
    submissionType: "Direct API Integration",
    matchDetails: {
      overallScore: 95,
      breakdown: {
        skills: 96,
        experience: 96,
        location: 100,
        seniority: 95,
        industry: 94,
        salary: 90
      },
      whyMatch: [
        "Perfect stack alignment: Next.js, React 19, TypeScript, Serverless",
        "Fully remote match for India/Global timezone",
        "SaaS developer tools background"
      ],
      missingRequirements: [
        "Hands-on experience with OpenAI / Anthropic Streaming APIs",
        "Edge runtime middleware optimization"
      ],
      strategyNote: "Feature any side projects or open-source Next.js AI integrations in your tailored resume summary."
    }
  },
  {
    id: "job-104",
    source: "Indeed",
    sourceJobId: "ind-10923",
    title: "Senior Backend / Fullstack Engineer",
    company: "Postman",
    companyLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=Postman",
    location: "Bangalore (Hybrid)",
    workModel: "Hybrid",
    salaryRange: "₹26L – ₹36L",
    experienceLevel: "5+ years",
    skills: ["Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "GraphQL", "Kubernetes"],
    description: "Postman is looking for a Senior Engineer to scale API testing automation networks and distributed microservices infrastructure.",
    postedAt: "3 days ago",
    url: "https://postman.com/careers",
    submissionType: "Open & Apply Portal",
    matchDetails: {
      overallScore: 89,
      breakdown: {
        skills: 86,
        experience: 92,
        location: 88,
        seniority: 90,
        industry: 92,
        salary: 87
      },
      whyMatch: [
        "Solid Node.js, TypeScript, PostgreSQL, and Docker match",
        "5+ years backend systems experience",
        "Developer tools ecosystem experience"
      ],
      missingRequirements: [
        "Deep Kubernetes orchestration experience preferred",
        "Kafka or RabbitMQ queue management"
      ],
      strategyNote: "Focus on API design, contract testing, and Docker containerization experience."
    }
  },
  {
    id: "job-105",
    source: "Glassdoor",
    sourceJobId: "gd-55102",
    title: "Senior React / UI Architect",
    company: "Stripe",
    companyLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=Stripe",
    location: "Remote (APAC)",
    workModel: "Remote",
    salaryRange: "$110k – $145k",
    experienceLevel: "6+ years",
    skills: ["React", "TypeScript", "Design Systems", "Web Performance", "Accessibility"],
    description: "Work on Stripe Dashboard components, billing UI toolkits, and accessible frontend design systems used by millions of internet businesses globally.",
    postedAt: "5 hours ago",
    url: "https://stripe.com/jobs",
    submissionType: "Direct API Integration",
    matchDetails: {
      overallScore: 91,
      breakdown: {
        skills: 95,
        experience: 88,
        location: 100,
        seniority: 89,
        industry: 90,
        salary: 92
      },
      whyMatch: [
        "High design system and React/TypeScript expertise",
        "Fully remote role",
        "Strong UI engineering foundation"
      ],
      missingRequirements: [
        "6+ years experience (Candidate has 5.2 years)",
        "Accessibility (WCAG 2.1 AA) certification"
      ],
      strategyNote: "Highlight UI design system leadership and component library creation in current company."
    }
  },
  {
    id: "job-106",
    source: "Company Site",
    sourceJobId: "cs-notion-01",
    title: "Full Stack Engineer - AI Experiences",
    company: "Notion",
    companyLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=Notion",
    location: "Remote",
    workModel: "Remote",
    salaryRange: "$115k – $140k",
    experienceLevel: "4-7 years",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Vector DBs"],
    description: "Help build Notion AI Q&A, knowledge base synthesis, and workspace copilot tools directly inside Notion's document engine.",
    postedAt: "1 day ago",
    url: "https://notion.so/careers",
    submissionType: "Direct API Integration",
    matchDetails: {
      overallScore: 94,
      breakdown: {
        skills: 95,
        experience: 95,
        location: 100,
        seniority: 94,
        industry: 90,
        salary: 90
      },
      whyMatch: [
        "React + TS + Node.js full stack balance",
        "Remote fit",
        "Experience building productivity & SaaS web apps"
      ],
      missingRequirements: [
        "Experience with Pinecone or Pgvector search indexing"
      ],
      strategyNote: "Demonstrate strong problem solving in document state rendering and AI prompt management."
    }
  }
];

export const initialApplications: ApplicationRecord[] = [
  {
    id: "app-01",
    jobId: "job-101",
    jobTitle: "Senior Full Stack Engineer",
    company: "Linear",
    companyLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=Linear",
    location: "Remote",
    matchScore: 96,
    status: "Interview",
    appliedDate: "Sep 2, 2026",
    submissionType: "Direct API Integration",
    resumeVersionUsed: "Senior Full Stack Engineer (v2)",
    nextStep: "Technical System Architecture Interview",
    nextStepDate: "Sep 8, 2026"
  },
  {
    id: "app-02",
    jobId: "job-103",
    jobTitle: "Senior Product Engineer (AI SaaS)",
    company: "Vercel",
    companyLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=Vercel",
    location: "Remote",
    matchScore: 95,
    status: "Assessment",
    appliedDate: "Sep 4, 2026",
    submissionType: "Direct API Integration",
    resumeVersionUsed: "AI SaaS & Frontend Specialist (v3)",
    nextStep: "Take-Home Coding Challenge Submission",
    nextStepDate: "Sep 7, 2026"
  },
  {
    id: "app-03",
    jobId: "job-102",
    jobTitle: "Lead Frontend Engineer",
    company: "Razorpay",
    companyLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=Razorpay",
    location: "Bangalore",
    matchScore: 92,
    status: "Applied",
    appliedDate: "Sep 5, 2026",
    submissionType: "Open & Apply Portal",
    resumeVersionUsed: "Senior Full Stack Engineer (v2)"
  },
  {
    id: "app-04",
    jobId: "job-105",
    jobTitle: "Senior React UI Architect",
    company: "Stripe",
    companyLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=Stripe",
    location: "Remote",
    matchScore: 91,
    status: "Ready to Apply",
    appliedDate: "-",
    submissionType: "Direct API Integration",
    resumeVersionUsed: "Frontend Architecture & Systems (v1)"
  },
  {
    id: "app-05",
    jobId: "job-106",
    jobTitle: "Full Stack Engineer - AI",
    company: "Notion",
    companyLogo: "https://api.dicebear.com/7.x/identicon/svg?seed=Notion",
    location: "Remote",
    matchScore: 94,
    status: "Saved",
    appliedDate: "-",
    submissionType: "Direct API Integration",
    resumeVersionUsed: "Senior Full Stack Engineer (v2)"
  }
];

export const initialResumeVersions: ResumeVersion[] = [
  {
    id: "res-01",
    title: "Senior Full Stack Engineer (Default)",
    targetRole: "Senior Full Stack Engineer",
    lastUpdated: "2026-09-05",
    atsScore: 94,
    isDefault: true,
    content: {
      summary: "Fullstack Engineer with 5.2+ years of experience architecting high-scale web applications using React, TypeScript, Next.js, Node.js, and Cloud Infrastructure. Proven track record of reducing page load latency by 45% and leading cross-functional engineering initiatives.",
      skillsEmphasized: ["React 19", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "AWS Lambda/S3", "GraphQL"],
      experienceBullets: [
        {
          company: "AuraTech Solutions",
          role: "Senior Software Engineer",
          bullet: "Architected micro-frontend architecture powering 1.2M monthly active users, reducing bundle sizes by 38% and boosting Lighthouse performance score to 98."
        },
        {
          company: "AuraTech Solutions",
          role: "Senior Software Engineer",
          bullet: "Designed Node.js PostgreSQL backend services for real-time order tracking, maintaining 99.99% API uptime under 15,000 peak requests per second."
        }
      ]
    }
  },
  {
    id: "res-02",
    title: "AI SaaS & Product Engineer",
    targetRole: "Product Engineer / AI Developer",
    lastUpdated: "2026-09-04",
    atsScore: 91,
    isDefault: false,
    content: {
      summary: "Product-minded Frontend & Fullstack Engineer specializing in AI tool integration, vector embeddings UI, and modern React 19 / Server Actions workflows.",
      skillsEmphasized: ["Next.js App Router", "React 19", "AI SDK", "Tailwind CSS", "TypeScript", "Prisma"],
      experienceBullets: [
        {
          company: "AuraTech Solutions",
          role: "Senior Software Engineer",
          bullet: "Engineered generative AI chat interface with streaming responses and optimistic updates, increasing daily workspace user engagement by 64%."
        }
      ]
    }
  }
];

export const initialInterviewPreps: InterviewPrepItem[] = [
  {
    id: "int-101",
    company: "Linear",
    role: "Senior Full Stack Engineer",
    interviewDate: "Sep 8, 2026 at 4:30 PM IST",
    readinessScore: 78,
    technicalScore: 82,
    behavioralScore: 74,
    companyScore: 77,
    questions: [
      {
        id: "q-1",
        category: "Technical",
        question: "How would you design a real-time collaborative state sync engine in React & WebSockets for zero latency editing?",
        starAnswer: "S: In my previous role, users experienced state conflicts during concurrent document editing.\nT: My goal was to eliminate lag and resolve sync race conditions.\nA: I implemented Optimistic UI state updates on the client paired with Conflict-free Replicated Data Types (CRDT) over WebSockets with PostgreSQL event logs.\nR: Reduced sync latency from 450ms to 18ms and achieved 0 data loss during reconnection spikes.",
        keyTips: ["Discuss client-side local caching", "Mention optimistic rollback strategy", "Explain WebSocket heartbeats"]
      },
      {
        id: "q-2",
        category: "Behavioral",
        question: "Tell me about a time you had an architectural disagreement with a Tech Lead.",
        starAnswer: "S: Our Tech Lead wanted to rewrite our REST backend to GraphQL during a critical product launch sprint.\nT: I needed to protect our shipping timeline while respecting architectural improvements.\nA: I proposed a benchmark experiment showing REST payload optimization could satisfy frontend needs in 2 days vs 3 weeks for full GraphQL migration.\nR: Delivered the release 4 days early and migrated to GraphQL systematically in Q3.",
        keyTips: ["Focus on data-driven persuasion", "Demonstrate business empathy", "Show zero ego"]
      },
      {
        id: "q-3",
        category: "Company",
        question: "Why do you want to join Linear's engineering team?",
        starAnswer: "Linear sets the gold standard for modern developer software craft—from keyboard shortcuts to silky 60fps micro-animations. Having built high-scale SaaS UI myself, I want to contribute to engineering tools that software teams love using every single day.",
        keyTips: ["Show passion for product craft", "Reference Linear's design philosophy", "Connect personal craft to their mission"]
      }
    ],
    companyResearchNotes: "Linear is known for hyper-focused UX, opinionated workflows, fast execution, custom sync engine, keyboard-first navigation, and minimalist design principles."
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif-01",
    title: "3 High Match Jobs Found",
    message: "New positions at Linear (96%), Vercel (95%), and Notion (94%) match your profile.",
    timestamp: "10 mins ago",
    read: false,
    type: "match"
  },
  {
    id: "notif-02",
    title: "Interview Scheduled with Linear",
    message: "Technical System Architecture round scheduled for Sep 8, 4:30 PM IST.",
    timestamp: "2 hours ago",
    read: false,
    type: "interview"
  },
  {
    id: "notif-03",
    title: "Tailored Resume Generated",
    message: "Optimized resume for 'Lead Frontend Engineer @ Razorpay' has reached 94% ATS score.",
    timestamp: "Yesterday",
    read: true,
    type: "application"
  }
];

export const mockAdminStats: AdminStats = {
  totalUsers: 14820,
  activeUsers: 9430,
  paidUsers: 3120,
  monthlyRevenueINR: 2840000, // ₹28.4 Lakhs
  jobsProcessedToday: 18450,
  applicationsSubmittedToday: 1420,
  aiTokenConsumptionMillions: 42.8,
  sourcesBreakdown: [
    { source: "LinkedIn", percentage: 38 },
    { source: "Naukri", percentage: 26 },
    { source: "Indeed", percentage: 16 },
    { source: "Wellfound", percentage: 12 },
    { source: "Glassdoor", percentage: 5 },
    { source: "Company Direct", percentage: 3 }
  ]
};
