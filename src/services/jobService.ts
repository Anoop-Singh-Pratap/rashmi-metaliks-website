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
 * 
 * Note: The app will use fallback data if the job_listings table doesn't exist.
 * To create the table, run the SQL in supabase/migrations/20240727_job_listings.sql
 * or see SUPABASE_SETUP.md for more detailed instructions.
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
      // Return fallback data instead of throwing
      return getFallbackJobListings();
    }
    
    if (!data || data.length === 0) {
      console.log('No job listings found, using fallback data');
      return getFallbackJobListings();
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
    // Return fallback data
    return getFallbackJobListings();
  }
};

/**
 * Get fallback job listings data for development/testing
 */
const getFallbackJobListings = (): JobListing[] => {
  return [
    {
      id: "1",
      title: "Production Engineer",
      department: "Manufacturing",
      location: "Durgapur, West Bengal",
      type: "Full-time",
      description: "We are seeking a skilled Production Engineer to join our manufacturing team in Durgapur.",
      requirements: "Bachelor's degree in Mechanical or Metallurgical Engineering with 3+ years of experience in steel manufacturing.",
      responsibilities: [
        "Monitor production processes and optimize workflow",
        "Implement quality control procedures",
        "Troubleshoot equipment issues",
        "Collaborate with maintenance team for preventive maintenance",
        "Prepare production reports and documentation"
      ],
      is_active: true,
      posted_date: "2023-08-15",
      closing_date: "2023-09-15",
      salary_range: "Competitive",
      featured: true
    },
    {
      id: "2",
      title: "Quality Control Specialist",
      department: "Quality Assurance",
      location: "Kharagpur, West Bengal",
      type: "Full-time",
      description: "Join our Quality Assurance team to ensure our products meet the highest industry standards.",
      requirements: "Bachelor's degree in Metallurgy or Materials Science with experience in steel quality testing.",
      responsibilities: [
        "Conduct quality tests on finished products",
        "Prepare test reports and certification documentation",
        "Implement quality management systems",
        "Train production staff on quality standards",
        "Monitor compliance with international standards"
      ],
      is_active: true,
      posted_date: "2023-08-10",
      closing_date: "2023-09-10",
      salary_range: "As per industry standards",
      featured: false
    }
  ];
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