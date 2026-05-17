import { supabase } from './supabaseClient';

export const fetchDocuments = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
  return data;
};

export const addDocument = async (doc) => {
  if (!supabase) return null;
  // Remove ID if it's a local timestamp, let DB generate UUID
  const { id, ...docToInsert } = doc;
  
  const { data, error } = await supabase
    .from('documents')
    .insert([docToInsert])
    .select();
  
  if (error) {
    console.error('Error adding document:', error);
    return null;
  }
  return data[0];
};
