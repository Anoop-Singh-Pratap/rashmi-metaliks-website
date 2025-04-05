import { supabase } from '../lib/supabase';

export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  responsibilities: string[];
  is_active: boolean;
  posted_date: string;
  closing_date?: string;
  salary_range?: string;
  featured: boolean;
}

/**
 * Fetch all active job listings from Supabase
 */
export const fetchJobListings = async (): Promise<JobListing[]> => {
  try {
    const { data, error } = await supabase
      .from('job_listings')
      .select('*')
      .eq('is_active', true)
      .order('posted_date', { ascending: false });
      
    if (error) {
      console.error('Error fetching job listings:', error);
      throw error;
    }
    
    // Parse responsibilities from JSONB to array
    return data.map((job: any) => ({
      ...job,
      responsibilities: Array.isArray(job.responsibilities) 
        ? job.responsibilities 
        : JSON.parse(job.responsibilities)
    }));
  } catch (error) {
    console.error('Error in job listings fetch:', error);
    // Return empty array instead of throwing to avoid breaking the UI
    return [];
  }
};

/**
 * Fetch a single job listing by ID
 */
export const fetchJobById = async (id: string): Promise<JobListing | null> => {
  try {
    const { data, error } = await supabase
      .from('job_listings')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching job listing:', error);
      return null;
    }
    
    if (!data) return null;
    
    // Parse responsibilities from JSONB to array
    return {
      ...data,
      responsibilities: Array.isArray(data.responsibilities) 
        ? data.responsibilities 
        : JSON.parse(data.responsibilities)
    };
  } catch (error) {
    console.error('Error in job fetch:', error);
    return null;
  }
}; 