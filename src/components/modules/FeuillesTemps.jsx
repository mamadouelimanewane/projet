import React, { useState, useEffect } from "react";
import { Badge, Btn, SectionHeader, toast } from "../ui";
import useStore from "../../store/useStore";
import { useProject } from "./ProjectSelector";
import { fetchTimesheets, addTimesheet } from "../../lib/timesheets";

const FeuillesTemps = ({ data = [] }) => {
  const { currentProject } = useProject();
  const { data: globalData, updateData } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [localData, setLocalData] = useState(data);
  
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    membre: "",
    tache: "",
    heures: "",
    type: "Facturable",
    projet: ""
  });

  useEffect(() => {
    const loadTimesheets = async () => {
      const dbData = await fetchTimesheets();
      if (dbData && dbData.length > 0) {
        const filteredDbData = currentProject 
          ? dbData.filter(d => d.projet === currentProject.nom)
          : dbData;
        setLocalData(filteredDbData);
      }
    };
    loadTimesheets();
  }, [currentProject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const projectToAssign = currentProject ? currentProject.nom : newEntry.projet;
    
    if (!newEntry.membre || !newEntry.tache || !newEntry.heures || (!currentProject && !newEntry.projet)) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    
    const entry = {
      id: Date.now(),
      date: newEntry.date,
      membre: newEntry.membre,
      tache: newEntry.tache,
      heures: parseFloat(newEntry.heures),
      type: newEntry.type,
      projet: projectToAssign
    };
    
    // Save to Supabase
    const savedEntry = await addTimesheet(entry);
    
    // Update local state and store
    const entryToUse = savedEntry || entry;
    
    const currentTemps = globalData.temps || [];
    updateData('temps', [...currentTemps, entryToUse]);
    setLocalData([...localData, entryToUse]);
    
    setIsOpen(false);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      membre: "",
      tache: "",
      heures: "",
      type: "Facturable",
      projet: ""
    });
    toast.success("Heures enregistrées avec succès");
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Feuilles de Temps" 
        subtitle={currentProject ? `Suivi des heures - ${currentProject.nom}` : "Suivi des heures passées par l'équipe"} 
        action={<button type="button" onClick={() => setIsOpen(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-colors">+ Saisie Heures</button>} 
      />
      
      <div className="app-surface2 border app-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto -mx-1">
          <table className="w-full">
            <thead>
              <tr className="border-b app-border">
                {["Date", "Membre", "Tâche", "Heures", "Type", "Projet"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold app-text2 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {localData.map(t => (
                <tr key={t.id} className="border-b app-border hover:app-surface3">
                  <td className="px-4 py-3 text-sm app-text2">{t.date}</td>
                  <td className="px-4 py-3 text-sm font-bold text-white">{t.membre}</td>
                  <td className="px-4 py-3 text-sm app-text">{t.tache}</td>
                  <td className="px-4 py-3 text-sm font-bold text-indigo-400">{t.heures}h</td>
                  <td className="px-4 py-3">
                    <Badge value={t.type} map={{ "Facturable": "#10b981", "Non facturable": "#94a3b8" }} />
                  </td>
                  <td className="px-4 py-3 text-sm app-text3">{t.projet || "N/A"}</td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center app-text3 text-sm">
                    Aucune saisie de temps pour ce projet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Saisie Heures */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="app-surface border app-border rounded-2xl w-full max-w-md p-6 shadow-2xl animate-entrance">
            <h3 className="text-xl font-bold text-white mb-4">Saisir des Heures</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {!currentProject && (
                <div>
                  <label className="text-xs font-bold app-text2 uppercase block mb-1">Projet</label>
                  <select 
                    value={newEntry.projet}
                    onChange={(e) => setNewEntry({...newEntry, projet: e.target.value})}
                    className="w-full app-surface2 border app-border rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">Sélectionner un projet</option>
                    {globalData.projets?.filter(p => !p.archived).map(p => (
                      <option key={p.id} value={p.nom}>{p.nom}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs font-bold app-text2 uppercase block mb-1">Date</label>
                <input 
                  type="date" 
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                  className="w-full app-surface2 border app-border rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold app-text2 uppercase block mb-1">Membre</label>
                <input 
                  type="text" 
                  value={newEntry.membre}
                  onChange={(e) => setNewEntry({...newEntry, membre: e.target.value})}
                  placeholder="Nom du collaborateur"
                  className="w-full app-surface2 border app-border rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold app-text2 uppercase block mb-1">Tâche</label>
                <input 
                  type="text" 
                  value={newEntry.tache}
                  onChange={(e) => setNewEntry({...newEntry, tache: e.target.value})}
                  placeholder="Description de la tâche"
                  className="w-full app-surface2 border app-border rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold app-text2 uppercase block mb-1">Heures</label>
                  <input 
                    type="number" 
                    step="0.5"
                    value={newEntry.heures}
                    onChange={(e) => setNewEntry({...newEntry, heures: e.target.value})}
                    placeholder="Ex: 4.5"
                    className="w-full app-surface2 border app-border rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold app-text2 uppercase block mb-1">Type</label>
                  <select 
                    value={newEntry.type}
                    onChange={(e) => setNewEntry({...newEntry, type: e.target.value})}
                    className="w-full app-surface2 border app-border rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Facturable">Facturable</option>
                    <option value="Non facturable">Non facturable</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t app-border">
                <Btn variant="ghost" onClick={() => setIsOpen(false)}>Annuler</Btn>
                <button type="submit" className="px-5 py-2.5 text-sm rounded-xl font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeuillesTemps;
