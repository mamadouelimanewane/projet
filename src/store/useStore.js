import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_DATA } from '../data/constants';
import { supabase } from '../lib/supabaseClient';

const useStore = create(
  persist(
    (set, get) => ({
      data: INITIAL_DATA,
      showApp: false,
      selectedProjectId: null, // null = Tous les projets
      isSyncing: false,
      lastSync: null,
      
      // Transitions
      setShowApp: (show) => set({ showApp: show }),
      setSelectedProjectId: (id) => set({ selectedProjectId: id }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      // Data Management
      updateData: (key, val) => set((state) => ({
        data: {
          ...state.data,
          [key]: val
        }
      })),
      
      setData: (newData) => set({ data: newData }),

      // Supabase Sync logic
      syncData: async () => {
        if (!supabase) return;
        set({ isSyncing: true });
        try {
          const { data, error } = await supabase
            .from('project_data')
            .upsert({ id: 'primary_state', content: get().data })
            .select();
          
          if (error) throw error;
          set({ lastSync: new Date().toISOString() });
        } catch (e) {
          console.error("Sync Error:", e);
        } finally {
          set({ isSyncing: false });
        }
      },

      fetchData: async () => {
        if (!supabase) return;
        set({ isSyncing: true });
        try {
          const { data, error } = await supabase
            .from('project_data')
            .select('content')
            .eq('id', 'primary_state')
            .single();
          
          if (error && error.code !== 'PGRST116') throw error;
          if (data?.content) set({ data: data.content });
        } catch (e) {
          console.error("Fetch Error:", e);
        } finally {
          set({ isSyncing: false });
        }
      },
      
      // Module specific shortcuts
      updateSuivi: (val) => get().updateData('suivi', val),
      updateProjets: (val) => get().updateData('projets', val),
      updateTaches: (val) => get().updateData('taches', val),
      updateCouts: (val) => get().updateData('couts', val),
      updateJalons: (val) => get().updateData('jalons', val),
      updateProblemes: (val) => get().updateData('problemes', val),
      updateRisques: (val) => get().updateData('risques', val),
      updateDelais: (val) => get().updateData('delais', val),
      updateKpis: (val) => get().updateData('kpis', val),
      updateBudget: (val) => get().updateData('budget', val),
      updateSprints: (val) => get().updateData('sprints', val),
      updateKanban: (val) => get().updateData('kanban', val),
      updateRessources: (val) => get().updateData('ressources', val),
      updateGantt: (val) => get().updateData('gantt', val),
      updateTemps: (val) => get().updateData('temps', val),
      updateDocuments: (val) => get().updateData('documents', val),
      updateFactures: (val) => get().updateData('factures', val),
      updateWorkflows: (val) => get().updateData('workflows', val),
      updateWebhooks: (val) => get().updateData('webhooks', val),
      updateIntake: (val) => get().updateData('intake', val),
      updateAutomations: (val) => get().updateData('automations', val),
    }),
    {
      name: 'projet-elite-storage',
    }
  )
);

export default useStore;
