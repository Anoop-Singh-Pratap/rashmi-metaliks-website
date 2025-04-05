import { supabase, uploadFile } from '../lib/supabase';

export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department?: string;
  experience?: string;
  education?: string;
  resumeUrl?: string;
  coverLetter?: string;
  source?: string;
}

/**
 * Submit a job application to Supabase
 */
export const submitApplication = async (data: ApplicationData, resumeFile: File | null): Promise<{ success: boolean; error?: string }> => {
  try {
    let resumeUrl = undefined;
    
    // Upload resume if available
    if (resumeFile) {
      resumeUrl = await uploadFile(resumeFile, 'resumes', 'job-applications');
    }
    
    // Insert application data into Supabase
    const { data: result, error } = await supabase
      .from('job_applications')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        position: data.position,
        department: data.department,
        experience: data.experience,
        education: data.education,
        resume_url: resumeUrl,
        cover_letter: data.coverLetter,
        source: data.source,
        created_at: new Date().toISOString()
      });
      
    if (error) {
      console.error('Error submitting application:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error in application submission:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    };
  }
}; 