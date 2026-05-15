import React, { useState } from "react";
import { toast, dialog } from '../ui';
import { Edit3, Save, Trash2, Calendar, DollarSign, User, Info, Target, Layout, Settings } from "lucide-react";
import { SectionHeader, Card, Btn, Input, Select, Textarea, Badge } from "../ui";
import useStore from "../../store/useStore";

const EditeurProjet = () => {
  const { data, updateData } = useStore();
  const projects = data?.projets || [];
  
  const [selectedId, setSelectedId] = useState(projects[0]?.id || "");
  const project = projects.find(p => p.id === selectedId) || {};

  const handleSave = () => {
    toast.success("✅ Modifications enregistrées localement ! (N'oubliez pas de synchroniser avec le Cloud)");
  };

  const updateProjectField = (field, value) => {
    const updated = projects.map(p => p.id === selectedId ? { ...p, [field]: value } : p);
    updateData("projets", updated);
  };

  const handleArchiveToggle = () => {
    if (project.archived) {
      updateProjectField("archived", false);
      toast.success("Projet restauré avec succès.");
    } else {
      if (confirm("Voulez-vous vraiment archiver ce projet ?")) {
        updateProjectField("archived", true);
        toast.success("Projet archivé avec succès.");
      }
    }
  };

  const handleDelete = () => {
    if (confirm("Voulez-vous vraiment supprimer ce projet définitivement ? Cette action est irréversible.")) {
      const updated = projects.filter(p => p.id !== selectedId);
      updateData("projets", updated);
      setSelectedId(updated[0]?.id || "");
      toast.success("Projet supprimé définitivement.");
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Édition Complète du Projet" 
        subtitle="Modification des paramètres structurels, financiers et temporels"
        action={<Btn onClick={handleSave} variant="primary"><Save className="w-4 h-4 mr-2" /> Enregistrer Tout</Btn>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar : Liste des Projets */}
        <div className="space-y-3">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Sélectionner un Projet</p>
           {projects.map(p => (
             <button 
               key={p.id}
               onClick={() => setSelectedId(p.id)}
               className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between group ${selectedId === p.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}
             >
                <div className="overflow-hidden">
                   <p className="font-bold truncate text-sm">{p.archived ? "📦 " : ""}{p.nom}</p>
                   <p className={`text-[10px] ${selectedId === p.id ? 'text-indigo-200' : 'text-slate-600'}`}>{p.chef}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${p.statut === 'En cours' ? 'bg-emerald-400' : 'bg-slate-600'}`} />
             </button>
           ))}
           <Btn variant="ghost" className="w-full border-dashed border-2 py-4 mt-4">+ Nouveau Projet</Btn>
        </div>

        {/* Formulaire d'édition */}
        <div className="lg:col-span-3 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 glass-card rounded-2xl space-y-4">
                 <div className="flex items-center gap-2 text-indigo-400 mb-2">
                    <Info className="w-5 h-5" />
                    <h3 className="font-bold text-white">Informations Générales</h3>
                 </div>
                 <Input 
                   label="Nom du Projet" 
                   value={project.nom || ""} 
                   onChange={(e) => updateProjectField("nom", e.target.value)}
                 />
                 <Input 
                   label="Chef de Projet" 
                   value={project.chef || ""} 
                   onChange={(e) => updateProjectField("chef", e.target.value)}
                 />
                 <Select 
                   label="Statut Actuel" 
                   options={["Planifié", "En cours", "Terminé", "En pause"]} 
                   value={project.statut || "Planifié"}
                   onChange={(e) => updateProjectField("statut", e.target.value)}
                 />
                 <Textarea 
                   label="Description & Objectifs" 
                   value={project.description || ""} 
                   onChange={(e) => updateProjectField("description", e.target.value)}
                 />
              </Card>

              <Card className="p-6 glass-card rounded-2xl space-y-4">
                 <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <DollarSign className="w-5 h-5" />
                    <h3 className="font-bold text-white">Dimensions Financières</h3>
                 </div>
                 <Input 
                   label="Budget Alloué (FCFA)" 
                   type="number"
                   value={project.budget || 0} 
                   onChange={(e) => updateProjectField("budget", parseFloat(e.target.value))}
                 />
                 <Input 
                   label="Budget Consommé (Réel)" 
                   type="number"
                   value={project.budgetReel || 0} 
                   onChange={(e) => updateProjectField("budgetReel", parseFloat(e.target.value))}
                 />
                 <div className="pt-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Ratio de Consommation</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-2xl font-black text-white">{((project.budgetReel / project.budget) * 100).toFixed(1)}%</span>
                       <Badge variant={project.budgetReel > project.budget ? "danger" : "success"}>
                          {project.budgetReel > project.budget ? "Surcoût" : "Optimal"}
                       </Badge>
                    </div>
                 </div>
              </Card>

              <Card className="p-6 glass-card rounded-2xl space-y-4">
                 <div className="flex items-center gap-2 text-purple-400 mb-2">
                    <Calendar className="w-5 h-5" />
                    <h3 className="font-bold text-white">Échéancier & Délais</h3>
                 </div>
                 <Input 
                   label="Date de Début" 
                   type="date"
                   value={project.debut || ""} 
                   onChange={(e) => updateProjectField("debut", e.target.value)}
                 />
                 <Input 
                   label="Date de Fin Prévue" 
                   type="date"
                   value={project.fin || ""} 
                   onChange={(e) => updateProjectField("fin", e.target.value)}
                 />
                 <div className="pt-4">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Avancement Manuel (%)</p>
                    <input 
                      type="range" 
                      className="w-full accent-indigo-500" 
                      value={project.avancement || 0}
                      onChange={(e) => updateProjectField("avancement", parseInt(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-indigo-400 font-bold mt-1">
                       <span>0%</span>
                       <span>{project.avancement}%</span>
                       <span>100%</span>
                    </div>
                 </div>
              </Card>

              <Card className="p-6 glass-card rounded-2xl border-dashed border-2 border-slate-800 flex flex-col items-center justify-center text-center opacity-60">
                 <Settings className="w-12 h-12 text-slate-700 mb-4" />
                 <h4 className="font-bold text-slate-500">Paramètres Avancés</h4>
                 <p className="text-xs text-slate-600 px-8">Configuration des méthodologies, intégrations Slack/Teams et Webhooks spécifiques.</p>
                 <Btn variant="ghost" className="mt-4" size="sm">Déverrouiller</Btn>
              </Card>
           </div>
           
           <div className="flex justify-end gap-4">
              <Btn variant="danger" className="bg-red-600/10 text-red-500 border border-red-500/20" onClick={handleDelete}><Trash2 className="w-4 h-4 mr-2" /> Supprimer ce Projet</Btn>
              <Btn variant="ghost" className="border border-slate-700" onClick={handleArchiveToggle}>{project.archived ? "↩️ Restaurer ce Projet" : "📦 Archiver ce Projet"}</Btn>
              <Btn variant="primary" size="lg" className="px-12" onClick={handleSave}>Mettre à jour le Projet</Btn>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EditeurProjet;
