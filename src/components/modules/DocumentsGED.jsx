import React, { useState } from "react";
import { Badge, Btn, SectionHeader, StatCard, Input } from "../ui";

const DocumentsGED = ({ data }) => {
  const [filter, setFilter] = useState("Tous");
  const [search, setSearch] = useState("");

  const categories = ["Tous", "Technique", "Officiel", "Administratif", "Sécurité"];

  const filteredDocs = data.filter(d => 
    (filter === "Tous" || d.type === filter) &&
    (d.nom.toLowerCase().includes(search.toLowerCase()) || d.projet.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-entrance">
      <SectionHeader 
        title="Centre Documentaire & DOE" 
        subtitle="Gestion électronique des documents techniques, administratifs et QHSE" 
        action={
          <div className="flex gap-3">
             <Btn size="md" variant="ghost">📤 Partager</Btn>
             <Btn size="md" variant="primary">📎 Nouveau Document</Btn>
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
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === c ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="w-full md:w-64">
            <Input 
              placeholder="Rechercher un plan, un PV..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-900 border-slate-700 h-10 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map(d => (
            <div key={d.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative group hover:border-indigo-500/40 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg ${
                  d.type === 'Technique' ? 'bg-indigo-500/10 text-indigo-400' : 
                  d.type === 'Sécurité' ? 'bg-amber-500/10 text-amber-500' : 
                  'bg-slate-700/20 text-slate-400'
                }`}>
                  {d.nom.endsWith('.pdf') ? '📄' : d.nom.endsWith('.xlsx') ? '📊' : '📁'}
                </div>
                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{d.taille}</div>
              </div>

              <div className="space-y-1 mb-6">
                <h4 className="text-sm font-bold text-white truncate" title={d.nom}>{d.nom}</h4>
                <p className="text-[10px] text-indigo-400 font-bold uppercase">{d.projet}</p>
                <div className="flex items-center gap-2 mt-2">
                   <span className="text-[9px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-slate-400">{d.categorie || d.type}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <div className="text-[9px] text-slate-500">Par {d.auteur || 'Auto-IA'} • {d.date}</div>
                <div className="flex gap-2">
                  <button className="text-slate-500 hover:text-white transition-colors">👁️</button>
                  <button className="text-slate-500 hover:text-indigo-400 transition-colors">📥</button>
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
    </div>
  );
};

export default DocumentsGED;
