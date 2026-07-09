import { createClient } from '@supabase/supabase-js';

// Using environment variables directly
const supabaseUrl = 'https://ydgfhnrdksygeunnardq.supabase.co/rest/v1/';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZ2ZobnJka3N5Z2V1bm5hcmRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MDU0OTAsImV4cCI6MjA5OTE4MTQ5MH0.zJJYyzt10Q6VaNzHtTBZvfEh6vjU_C5Doqerat0VQXQ';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper function to check if a student exists
export async function checkStudentExists(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('students')
    .select('email')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error checking student:', error);
    return false;
  }

  return !!data;
}

// Helper function to get student details
export async function getStudentDetails(email: string) {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
