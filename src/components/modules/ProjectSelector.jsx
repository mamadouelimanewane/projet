import React, { useState, useEffect, createContext, useContext, useMemo } from "react";
import { ChevronDown, Plus, Check, Search, Star, TrendingUp, AlertTriangle, DollarSign, Clock } from "lucide-react";
import useStore from "../../store/useStore";

// Context pour le projet actif
const ProjectContext = createContext();

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within ProjectProvider");
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const { data, selectedProjectId, setSelectedProjectId } = useStore();
  const [showProjectSelector, setShowProjectSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Projet actif (null = Tous les projets)
  const currentProject = useMemo(() => 
    selectedProjectId ? data.projets?.find(p => p.id === selectedProjectId) : null
  , [selectedProjectId, data.projets]);

  // Filtrer les données par projet actif
  const projectData = useMemo(() => {
    if (!currentProject) {
      return { 
        isAll: true, 
        ...data 
      };
    }

    const projectName = currentProject.nom;
    
    // Filtres intelligents basés sur la structure des données
    return {
      isAll: false,
      projet: currentProject,
      projets: [currentProject],
      suivi: data.suivi || [], 
      taches: data.taches?.filter(t => t.projet === projectName) || [],
      couts: data.couts || [], 
      jalons: data.jalons?.filter(j => j.projet === projectName) || [], 
      problemes: data.problemes?.filter(p => p.projet === projectName) || [],
      risques: data.risques?.filter(r => r.projet === projectName) || [],
      delais: data.delais || [], 
      kpis: data.kpis || [],
      budget: data.budget || [],
      sprints: data.sprints || [], 
      kanban: data.kanban || {}, 
      ressources: data.ressources?.filter(r => r.projet === projectName) || [],
      gantt: data.gantt || [],
      cycle: data.cycle || [],
      temps: data.temps?.filter(t => t.projet === projectName) || [],
      documents: data.documents?.filter(d => d.projet === projectName) || [],
      factures: data.factures?.filter(f => f.projet === projectName) || [],
      workflows: data.workflows || [],
      smartcontracts: data.smartcontracts?.filter(s => s.projet === projectName) || [],
      webhooks: data.webhooks || [],
      okrs: data.okrs?.filter(o => o.projets?.includes(projectName)) || [],
      intake: data.intake || [],
      automations: data.automations || [],
      safe: data.safe || [],
      greenPmo: data.greenPmo?.filter(g => g.projet === projectName) || [],
      evm: data.evm?.filter(e => e.projet === projectName) || [],
      genieCivil: data.genieCivil || {}
    };
  }, [currentProject, data]);

  // Calculer stats du projet / portfolio
  const projectStats = useMemo(() => {
    const targetProjets = currentProject ? [currentProject] : (data.projets || []);
    const targetTaches = projectData.taches;
    
    return {
      avancement: currentProject 
        ? currentProject.avancement 
        : Math.round(targetProjets.reduce((s, p) => s + (p.avancement || 0), 0) / (targetProjets.length || 1)),
      budget: targetProjets.reduce((s, p) => s + (p.budget || 0), 0),
      budgetConsomme: targetProjets.reduce((s, p) => s + (p.budgetReel || 0), 0),
      tachesTotal: targetTaches.length,
      tachesEnCours: targetTaches.filter(t => t.statut === "En cours").length,
      tachesFaites: targetTaches.filter(t => t.statut === "Fait" || t.statut === "Terminé").length,
      risquesActifs: projectData.risques.filter(r => r.statut === "Actif").length,
      problemesOuverts: projectData.problemes.filter(p => p.statut !== "Résolu").length
    };
  }, [currentProject, data.projets, projectData]);

  const switchProject = (projectId) => {
    setSelectedProjectId(projectId);
    setShowProjectSelector(false);
    setSearchTerm("");
  };

  const filteredProjectsList = useMemo(() => 
    data.projets?.filter(p =>
      p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.chef?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []
  , [data.projets, searchTerm]);

  return (
    <ProjectContext.Provider value={{
      currentProject,
      selectedProjectId,
      projectData,
      projectStats,
      switchProject,
      showProjectSelector,
      setShowProjectSelector,
      searchTerm,
      setSearchTerm,
      filteredProjects: filteredProjectsList
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Composant Sélecteur de Projet
export const ProjectSelector = () => {
  const {
    currentProject,
    selectedProjectId,
    switchProject,
    showProjectSelector,
    setShowProjectSelector,
    searchTerm,
    setSearchTerm,
    filteredProjects
  } = useProject();

  return (
    <div className="relative">
      {/* Bouton sélecteur */}
      <button
        onClick={() => setShowProjectSelector(!showProjectSelector)}
        className="flex items-center gap-3 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm border border-slate-700 rounded-xl transition-all group"
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${!currentProject ? 'bg-indigo-600' : 'bg-gradient-to-br from-indigo-500 to-purple-600'}`}>
          {!currentProject ? "Σ" : currentProject.nom.charAt(0).toUpperCase()}
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-white truncate max-w-[200px]">
            {!currentProject ? "Tous les projets" : currentProject.nom}
          </p>
          <p className="text-xs text-slate-400">{!currentProject ? "Vue Globale" : currentProject.chef}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showProjectSelector ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown sélecteur */}
      {showProjectSelector && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowProjectSelector(false)}
          />

          {/* Menu */}
          <div className="absolute top-full right-0 mt-2 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white mb-3">Changer de Projet</h3>
              
              {/* Recherche */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un projet..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
              </div>
            </div>

            {/* Liste projets */}
            <div className="max-h-96 overflow-y-auto">
              <button
                onClick={() => switchProject(null)}
                className={`w-full text-left p-4 hover:bg-slate-800/50 transition-colors border-b border-slate-800 ${
                  !selectedProjectId ? 'bg-indigo-600/10' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0 ${!selectedProjectId ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                    Σ
                    {!selectedProjectId && <Check className="w-4 h-4 absolute text-white" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Tous les projets</h4>
                    <p className="text-xs text-slate-400">Synthèse consolidée du portefeuille</p>
                  </div>
                </div>
              </button>

              {filteredProjects.length === 0 ? (
                <div className="p-6 text-center text-slate-500">
                  <p>Aucun projet trouvé</p>
                </div>
              ) : (
                filteredProjects.map(projet => {
                  const isSelected = projet.id === selectedProjectId;
                  const avancement = projet.avancement || 0;
                  const budgetPct = projet.budget > 0 ? Math.round((projet.budgetReel || 0) / projet.budget * 100) : 0;

                  return (
                    <button
                      key={projet.id}
                      onClick={() => switchProject(projet.id)}
                      className={`w-full text-left p-4 hover:bg-slate-800/50 transition-colors border-b border-slate-800 last:border-b-0 ${
                        isSelected ? 'bg-indigo-600/10' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3 relative">
                        {/* Avatar projet */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0 ${
                          isSelected 
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
                            : 'bg-slate-700'
                        }`}>
                          {projet.nom.charAt(0).toUpperCase()}
                          {isSelected && <Check className="w-4 h-4 absolute text-white" />}
                        </div>

                        {/* Info projet */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-white truncate">{projet.nom}</h4>
                            {isSelected && (
                              <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] rounded-full uppercase font-bold">
                                Actif
                              </span>
                            )}
                          </div>
                          
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">
                            {projet.chef} • {projet.statut}
                          </p>

                          {/* Stats rapides */}
                          <div className="flex items-center gap-3 text-xs">
                            <span className="flex items-center gap-1 text-slate-400">
                              <TrendingUp className="w-3 h-3 text-indigo-400" />
                              {avancement}%
                            </span>
                            <span className="flex items-center gap-1 text-slate-400">
                              <DollarSign className="w-3 h-3 text-emerald-400" />
                              {budgetPct}%
                            </span>
                            <span className="flex items-center gap-1 text-slate-400">
                              <Clock className="w-3 h-3 text-purple-400" />
                              {projet.debut ? new Date(projet.debut).toLocaleDateString('fr-FR', { month: 'short' }) : 'N/A'}
                            </span>
                          </div>

                          {/* Barre avancement */}
                          <div className="mt-2 w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                avancement >= 70 ? 'bg-emerald-500' :
                                avancement >= 40 ? 'bg-indigo-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${avancement}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-700 bg-slate-800/20">
              <button
                onClick={() => {
                  setShowProjectSelector(false);
                  window.location.hash = '#/multiprojets';
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 rounded-xl transition-colors text-xs font-bold"
              >
                <Plus className="w-3 h-3" />
                Nouveau Projet
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Hook pour filtrer les données par projet actif
export const useProjectData = () => {
  const { projectData, projectStats } = useProject();
  return { projectData, projectStats };
};

export default ProjectSelector;
