import React, { useState, useEffect } from "react";
import { Badge, Btn, SectionHeader, StatCard, Input, toast } from "../ui";
import useStore from "../../store/useStore";
import { useProject } from "./ProjectSelector";
import { fetchDocuments, addDocument } from "../../lib/documents";

const DocumentsGED = ({ data = [] }) => {
  const { updateData, data: globalData } = useStore();
  const { currentProject } = useProject();
  const [filter, setFilter] = useState("Tous");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [localData, setLocalData] = useState(data);
  
  const [newDoc, setNewDoc] = useState({
    nom: "",
    type: "Technique",
    projet: ""
  });

  const categories = ["Tous", "Technique", "Officiel", "Administratif", "Sécurité"];

  useEffect(() => {
    const loadDocuments = async () => {
      const dbData = await fetchDocuments();
      if (dbData && dbData.length > 0) {
        const filteredDbData = currentProject 
          ? dbData.filter(d => d.projet === currentProject.nom)
          : dbData;
        setLocalData(filteredDbData);
      }
    };
    loadDocuments();
  }, [currentProject]);

  const filteredDocs = localData.filter(d => 
    (filter === "Tous" || d.type === filter) &&
    (d.nom.toLowerCase().includes(search.toLowerCase()) || d.projet.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const projectToAssign = currentProject ? currentProject.nom : newDoc.projet;
    
    if (!newDoc.nom || (!currentProject && !newDoc.projet)) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const doc = { 
      id: Date.now(), 
      nom: newDoc.nom.endsWith('.pdf') ? newDoc.nom : `${newDoc.nom}.pdf`, 
      projet: projectToAssign, 
      type: newDoc.type, 
      taille: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`, 
      auteur: "Admin", 
      date: new Date().toISOString().split("T")[0] 
    };

    // Save to Supabase
    const savedDoc = await addDocument(doc);
    
    const docToUse = savedDoc || doc;

    const currentDocs = globalData.documents || [];
    updateData("documents", [docToUse, ...currentDocs]);
    setLocalData([docToUse, ...localData]);
    
    setIsOpen(false);
    setNewDoc({ nom: "", type: "Technique", projet: "" });
    toast.success("Document ajouté avec succès");
  };

  return (
    <div className="space-y-8 animate-entrance">
      <SectionHeader 
        title="Centre Documentaire & DOE" 
        subtitle="Gestion électronique des documents techniques, administratifs et QHSE" 
        action={
          <div className="flex gap-3">
             <Btn size="md" variant="ghost">📤 Partager</Btn>
             <button type="button" onClick={() => setIsOpen(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-colors">📎 Nouveau Document</button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Documents Actifs" value={data.length} color="#6366f1" icon="📄" sub="Stockage : 45.2 MB" />
        <StatCard label="Plans BIM" value="12" color="#10b981" icon="📐" sub="Dernière MAJ: 2h" />
        <StatCard label="Attestations QHSE" value="08" color="#f59e0b" icon="🦺" sub="Tous valides" />
      </div>

      <div className="glass-card rounded-2xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex app-surface p-1 rounded-xl border app-border">
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === c ? "bg-indigo-600 text-white shadow-lg" : "app-text3 hover:app-text"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="w-full md:w-64">
            <Input 
              placeholder="Rechercher un plan, un PV..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="app-surface app-border h-10 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map(d => (
            <div key={d.id} className="app-surface border app-border rounded-xl p-6 relative group hover:border-indigo-500/40 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg ${
                  d.type === 'Technique' ? 'bg-indigo-500/10 text-indigo-400' : 
                  d.type === 'Sécurité' ? 'bg-amber-500/10 text-amber-500' : 
                  'app-surface3 app-text2'
                }`}>
                  {d.nom.endsWith('.pdf') ? '📄' : d.nom.endsWith('.xlsx') ? '📊' : '📁'}
                </div>
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{d.taille}</div>
              </div>

              <div className="space-y-1 mb-6">
                <h4 className="text-sm font-bold text-white truncate" title={d.nom}>{d.nom}</h4>
                <p className="text-[10px] text-indigo-400 font-bold uppercase">{d.projet}</p>
                <div className="flex items-center gap-2 mt-2">
                   <span className="text-[9px] app-surface2 px-2 py-0.5 rounded border app-border app-text2">{d.type}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t app-border">
                <div className="text-[9px] app-text3">Par {d.auteur || 'Auto-IA'} • {d.date}</div>
                <div className="flex gap-2">
                  <button className="app-text3 hover:text-white transition-colors">👁️</button>
                  <button className="app-text3 hover:text-indigo-400 transition-colors">📥</button>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/[0.02] pointer-events-none transition-colors rounded-xl" />
            </div>
          ))}
          
          {filteredDocs.length === 0 && (
            <div className="col-span-full py-20 text-center opacity-40">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-sm text-white">Aucun document ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Saisie Document */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="app-surface border app-border rounded-2xl w-full max-w-md p-6 shadow-2xl animate-entrance">
            <h3 className="text-xl font-bold text-white mb-4">Ajouter un Document</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {!currentProject && (
                <div>
                  <label className="text-xs font-bold app-text2 uppercase block mb-1">Projet</label>
                  <select 
                    value={newDoc.projet}
                    onChange={(e) => setNewDoc({...newDoc, projet: e.target.value})}
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
                <label className="text-xs font-bold app-text2 uppercase block mb-1">Nom du Document</label>
                <input 
                  type="text" 
                  value={newDoc.nom}
                  onChange={(e) => setNewDoc({...newDoc, nom: e.target.value})}
                  placeholder="Ex: Plan de masse"
                  className="w-full app-surface2 border app-border rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold app-text2 uppercase block mb-1">Type</label>
                <select 
                  value={newDoc.type}
                  onChange={(e) => setNewDoc({...newDoc, type: e.target.value})}
                  className="w-full app-surface2 border app-border rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="Technique">Technique</option>
                  <option value="Officiel">Officiel</option>
                  <option value="Administratif">Administratif</option>
                  <option value="Sécurité">Sécurité</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t app-border">
                <Btn variant="ghost" onClick={() => setIsOpen(false)}>Annuler</Btn>
                <button type="submit" className="px-5 py-2.5 text-sm rounded-xl font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsGED;
