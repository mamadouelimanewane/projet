import { supabase } from './supabaseClient';

export const fetchTimesheets = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('feuilles_temps')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching timesheets:', error);
    return [];
  }
  return data;
};

export const addTimesheet = async (entry) => {
  if (!supabase) return null;
  // Remove ID if it's a local timestamp, let DB generate UUID
  const { id, ...docToInsert } = entry;
  
  const { data, error } = await supabase
    .from('feuilles_temps')
    .insert([docToInsert])
    .select();
  
  if (error) {
    console.error('Error adding timesheet:', error);
    return null;
  }
  return data[0];
};
