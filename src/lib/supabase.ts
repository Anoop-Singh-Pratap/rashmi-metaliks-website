import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
// Using hardcoded values directly since the environment variables aren't loading correctly
export const supabase = createClient(
  'https://kpoiglmmrwohcudsgufg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtwb2lnbG1tcndvaGN1ZHNndWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2ODI1MjEsImV4cCI6MjA1OTI1ODUyMX0.PSQ3vIQB_qMG1OJLiHDO4Srx-q9h3V5LfLpYKnZz9bo'
);

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