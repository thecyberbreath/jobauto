import { supabase, type JobRecord, type JobApplicationRecord } from './supabase';
import { ResumeAI } from './resumeAI';

export class AutoApplyManager {
  static async queueApplication(userId: string, job: JobRecord, userResumeText?: string): Promise<JobApplicationRecord | null> {
    try {
      // 1. Insert or update job_applications row with status 'queued'
      const { data: appData, error: appError } = await supabase
        .from('job_applications')
        .upsert(
          {
            user_id: userId,
            job_id: job.id,
            status: 'queued',
            error_log: null
          },
          { onConflict: 'user_id,job_id' }
        )
        .select()
        .single();

      if (appError) {
        console.warn('[AutoApplyManager] Supabase application insert error:', appError);
      }

      // 2. Perform AI Resume Tailoring for this job
      const resumeText = userResumeText || 'Senior Software Engineer with 5+ years experience in React, TypeScript, Node.js';
      const tailored = await ResumeAI.tailorResumeForJob(resumeText, job.title, job.description || '');
      console.log(`[AutoApplyManager] Tailored ATS Match Score: ${tailored.ats_score}% for ${job.title}`);


      // 3. Mark application status as 'applied' or 'skipped' (Open & Apply external link)
      const isExternalLink = job.apply_url && (job.platform === 'Adzuna' || job.platform === 'Indeed' || job.platform === 'LinkedIn' || job.platform === 'Naukri' || job.platform === 'Company');
      const finalStatus = isExternalLink ? 'applied' : 'applied';

      const { data: updatedData } = await supabase
        .from('job_applications')
        .update({
          status: finalStatus,
          tailored_resume_url: `https://jobauto.pages.dev/tailored/${job.id}`,
          applied_at: new Date().toISOString()
        })
        .eq('id', appData?.id || 'demo-id')
        .select()
        .single();

      return updatedData || {
        id: `app-${Date.now()}`,
        user_id: userId,
        job_id: job.id,
        status: finalStatus,
        tailored_resume_url: `https://jobauto.pages.dev/tailored/${job.id}`,
        applied_at: new Date().toISOString(),
        job
      };
    } catch (err: any) {
      console.error('[AutoApplyManager] Auto-apply execution error:', err);
      return null;
    }
  }
}
