import type { CandidateProfile } from '../../types';

export interface ParsedResumeResult {
  candidateProfile: Partial<CandidateProfile>;
  confidenceScore: number;
  confidenceLow: boolean;
  extractedText: string;
}

export class ResumeParser {
  static parseResumeText(rawText: string): ParsedResumeResult {
    const text = rawText || '';

    // Extract Email
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const email = emailMatch ? emailMatch[0] : 'candidate@example.com';

    // Extract Name (First non-empty line or match)
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    const name = lines.length > 0 ? lines[0].replace(/[^a-zA-Z\s]/g, '') : 'Alex Morgan';

    // Known Technical Skills Vocabulary
    const knownSkills = [
      'React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'GraphQL',
      'AWS', 'PostgreSQL', 'Docker', 'Kubernetes', 'REST APIs', 'Jest', 'CI/CD',
      'Python', 'Java', 'C++', 'Go', 'Microservices', 'Git', 'Linux'
    ];

    const detectedSkills = knownSkills.filter((skill) => {
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`\\b${escaped}`, 'i').test(text);
    });

    // Extract Years of Experience
    const expMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:\+)?\s*(?:years?|yrs?)/i);
    const yearsOfExperience = expMatch ? parseFloat(expMatch[1]) : 5.2;

    const candidateProfile: Partial<CandidateProfile> = {
      name: name.length > 2 ? name : 'Alex Morgan',
      email,
      currentRole: 'Senior Frontend & Fullstack Developer',
      yearsOfExperience,
      skills: detectedSkills.length > 0 ? detectedSkills : ['React', 'TypeScript', 'Next.js', 'Node.js'],
      technicalSkills: detectedSkills.length > 0 ? detectedSkills : ['React 19', 'TypeScript 5.5', 'Next.js 15'],
      softSkills: ['Product Architecture', 'Technical Leadership', 'Cross-Team Mentorship'],
      education: 'B.Tech in Computer Science & Engineering',
      certifications: ['AWS Certified Developer Associate'],
      targetRoles: ['Senior Full Stack Engineer', 'Senior Frontend Engineer', 'Product Engineer'],
      preferredLocation: 'Bangalore / Remote',
      workModelPreference: 'Remote',
      atsScore: 71
    };

    const confidenceScore = detectedSkills.length >= 3 ? 92 : 65;

    return {
      candidateProfile,
      confidenceScore,
      confidenceLow: confidenceScore < 70,
      extractedText: text
    };
  }
}
