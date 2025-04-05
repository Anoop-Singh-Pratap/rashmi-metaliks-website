import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your project's .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a function to upload a file to Supabase storage
export const uploadFile = async (file: File, bucket: string, folder: string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (error) throw error;
    
    // Return the file URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
      
    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}; 