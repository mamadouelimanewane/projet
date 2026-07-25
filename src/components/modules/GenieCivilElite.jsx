import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, BarChart, Bar, Cell, LineChart, Line } from "recharts";
import { Badge, StatCard, SectionHeader, ProgressBar, Btn } from "../ui";

const GenieCivilElite = ({ data }) => {
  const [typology, setTypology] = useState("infra"); // 'infra' or 'building'
  
  const gc = data.genieCivil || {};
  const fin = gc.finances || {};
  const rh = gc.rh || {};
  const types = gc.typologies || {};
  const docs = (data.documents || []).slice(0, 3); // Latest relevant docs

  const esgData = [
    { subject: 'Local Content', A: gc.impact?.emploiLocal || 80, fullMark: 100 },
    { subject: 'Securité', A: 95, fullMark: 100 },
    { subject: 'Environnement', A: 70, fullMark: 100 },
    { subject: 'Logistique', A: 85, fullMark: 100 },
    { subject: 'Qualité BTP', A: 90, fullMark: 100 },
  ];

  return (
    <div className="space-y-8 animate-entrance max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <SectionHeader 
          title="Génie Civil & Infrastructure High-Level" 
          subtitle="Pilotage 360° du Chantier : Trésorerie, RH et Documentation Technique" 
        />
        <div className="app-surface p-1.5 rounded-xl border app-border flex gap-1 self-end md:self-auto">
           <button 
             onClick={() => setTypology("infra")}
             className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${typology === "infra" ? "bg-indigo-600 text-white shadow-lg" : "app-text3 hover:app-text"}`}
           >
             🛣️ INFRA (Routes/Ponts)
           </button>
           <button 
             onClick={() => setTypology("building")}
             className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${typology === "building" ? "bg-indigo-600 text-white shadow-lg" : "app-text3 hover:app-text"}`}
           >
             🏠 BÂTIMENT (Villas/TCE)
           </button>
        </div>
      </div>

      {/* DYNAMIC TOP KPIS BASED ON TYPOLOGY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {typology === "infra" ? (
          <>
            <StatCard label="Avancement Linéaire" value={`${types.infrastructure?.lineaireActuel} km`} color="#10b981" icon="🛤" sub={`sur ${types.infrastructure?.lineaireTotal} km total`} />
            <StatCard label="Disponibilité Engins" value={`${types.infrastructure?.engins.dispo}/${types.infrastructure?.engins.total}`} color="#6366f1" icon="🚜" sub={`${types.infrastructure?.engins.maintenance} en maintenance`} />
            <StatCard label="Terrassement" value={`${Math.floor((types.infrastructure?.terrassement.deblais/types.infrastructure?.terrassement.cible)*100)}%`} color="#f59e0b" icon="🏔" sub="Volume de déblais" />
            <StatCard label="Ouvrages d'Art" value="4/6" color="#ef4444" icon="🏗" sub="Tabliers posés" />
          </>
        ) : (
          <>
            <StatCard label="Villas Livrées" value={`${types.batiment?.unitesLivrees}/${types.batiment?.unites}`} color="#10b981" icon="🏡" sub="Résidence Elite Phase 1" />
            <StatCard label="Avancement Gros Œuvre" value="95%" color="#6366f1" icon="🏗" sub="Achèvement des fondations" />
            <StatCard label="Couts Finitions" value="85M" color="#f59e0b" icon="🎨" sub="Plomberie & Carrelage" />
            <StatCard label="Réserves Clients" value="14" color="#ef4444" icon="📋" sub="Suivi des modifications" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* TYPOLOGY SPECIFIC TRACKER */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
           <h3 className="text-[10px] font-black app-text3 mb-8 uppercase tracking-[0.2em] relative z-10 font-black">
              {typology === "infra" ? "Suivi Géométrique & Linéaire PK Tracker" : "Suivi par Corps d'État (TCE)"}
           </h3>

           {typology === "infra" ? (
             <div className="space-y-10 animate-entrance">
                {/* Roads/Bridges Tracker */}
                <div className="relative h-20 app-surface2 border app-border rounded-2xl overflow-hidden shadow-inner">
                   <div className="absolute inset-y-0 left-0 bg-emerald-500/30" style={{ width: `${(types.infrastructure?.lineaireActuel/types.infrastructure?.lineaireTotal)*100}%` }} />
                   <div className="absolute inset-0 flex items-center justify-between px-6 z-10">
                      <span className="text-[10px] font-mono text-white app-surface px-2 py-1 rounded">PK 0</span>
                      <div className="flex-1 border-t border-dashed app-border2 mx-4 relative">
                         <div className="absolute top-1/2 -translate-y-1/2 left-1/4 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" />
                         <div className="absolute top-1/2 -translate-y-1/2 right-4 text-[9px] text-indigo-400 font-bold uppercase italic">Front de travail actif PK 14.5</div>
                      </div>
                      <span className="text-[10px] font-mono app-text3 app-surface px-2 py-1 rounded">PK 50</span>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-5 app-surface border app-border rounded-xl">
                      <h4 className="text-[10px] uppercase font-black text-slate-600 mb-4 tracking-widest">Terrassement Global</h4>
                      <div className="flex flex-col gap-4">
                         <div>
                            <div className="flex justify-between text-[10px] app-text2 font-bold mb-1"><span>DÉBLAIS</span><span>45%</span></div>
                            <ProgressBar value={45} color="#f59e0b" />
                         </div>
                         <div>
                            <div className="flex justify-between text-[10px] app-text2 font-bold mb-1"><span>REMBLAIS</span><span>32%</span></div>
                            <ProgressBar value={32} color="#10b981" />
                         </div>
                      </div>
                   </div>
                   <div className="p-5 app-surface border app-border rounded-xl flex items-center gap-6">
                      <div className="flex-1">
                         <h4 className="text-[10px] uppercase font-black text-slate-600 mb-2 tracking-widest">Parc Roulant</h4>
                         <p className="text-sm font-bold text-white mb-2">91% de Disponibilité</p>
                         <p className="text-[10px] app-text3">12/14 machines opérationnelles sur site.</p>
                      </div>
                      <div className="text-3xl grayscale opacity-40">🚜</div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="space-y-6 animate-entrance">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {types.batiment?.avancementTCE.map((t, i) => (
                      <div key={i} className="p-4 app-surface2 border app-border rounded-xl relative group hover:border-indigo-500/40 transition-all">
                         <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-white uppercase tracking-tighter">{t.corps}</span>
                            <span className="text-xs font-black text-indigo-400">{t.progress}%</span>
                         </div>
                         <ProgressBar value={t.progress} color={t.color} />
                      </div>
                   ))}
                </div>
                <div className="p-6 app-bg border border-indigo-500/20 rounded-xl relative overflow-hidden group">
                   <div className="flex items-center gap-6 relative z-10">
                      <div className="text-4xl">🏡</div>
                      <div>
                        <h4 className="text-sm font-bold text-white">État des Levées de Réserves</h4>
                        <p className="text-xs app-text3 mt-1 max-w-[400px]">Sur les 12 villas de luxe, 8 sont en phase "Peinture/Finitions". Aucune réserve bloquante à la livraison J+30.</p>
                      </div>
                      <Btn variant="primary" size="xs" className="ml-auto">Inspecter Villas →</Btn>
                   </div>
                   <div className="absolute inset-0 bg-indigo-600/5 group-hover:bg-indigo-600/10 transition-colors" />
                </div>
             </div>
           )}
        </div>

        {/* FINANCIAL DASH */}
        <div className="glass-card rounded-2xl p-8 flex flex-col justify-between">
           <div>
             <h3 className="text-[10px] font-black app-text3 mb-6 uppercase tracking-[0.2em] font-black">Financial S-Curve</h3>
             <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={fin.sCurve}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="mois" hide />
                      <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155'}} />
                      <Area type="monotone" dataKey="prevu" stroke="#334155" fill="transparent" strokeDasharray="5 5" />
                      <Area type="monotone" dataKey="reel" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
             <div className="mt-4 p-4 app-surface border app-border rounded-xl text-center">
                <p className="text-[9px] uppercase font-black text-slate-600 mb-1 tracking-widest">Budget Libéré</p>
                <p className="text-lg font-black text-emerald-400">{(fin.decaissat/1000000).toFixed(0)}M FCFA</p>
             </div>
           </div>
           
           <div className="mt-6 pt-6 border-t app-border">
              <p className="text-[10px] uppercase font-black text-slate-600 mb-4 tracking-widest">Human Capital Engine</p>
              <div className="flex items-center gap-4">
                 <div className="flex-1">
                    <ProgressBar value={rh.localContent} color="#6366f1" />
                 </div>
                 <span className="text-sm font-black text-indigo-400">{rh.localContent}% RH LOCALES</span>
              </div>
           </div>
        </div>

        {/* DOCUMENT CENTER SHORTCUT */}
        <div className="lg:col-span-1 glass-card rounded-2xl p-8">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-black app-text3 uppercase tracking-[0.2em] font-black">Dossier Technique DOE</h3>
              <Btn variant="ghost" size="xs">Voir tout</Btn>
           </div>
           <div className="space-y-4">
              {docs.map(d => (
                <div key={d.id} className="flex items-center gap-4 p-3 app-surface border app-border rounded-xl hover:border-indigo-500/30 transition-all cursor-pointer group">
                   <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-lg grayscale group-hover:grayscale-0 transition-all">📄</div>
                   <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-white truncate">{d.nom}</p>
                      <p className="text-[9px] app-text3 uppercase font-black">{d.categorie}</p>
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-8 p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl text-center">
              <p className="text-[10px] text-indigo-200">
                 ✨ <b>Assistance IA :</b> Le plan de ferraillage du PK 14 a été validé numériquement hier.
              </p>
           </div>
        </div>

        {/* LOGISTIQUE & MATERIAUX */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-8 flex flex-col md:flex-row gap-8">
           <div className="flex-1">
              <h3 className="text-[10px] font-black app-text3 mb-8 uppercase tracking-[0.2em] font-black">Analyse de Conformité & Matériaux</h3>
              <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                   <RadarChart cx="50%" cy="50%" outerRadius="80%" data={esgData}>
                     <PolarGrid stroke="#1e293b" />
                     <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 10, fontWeight: 700 }} />
                     <Radar name="Conformité" dataKey="A" stroke="#6366f1" strokeWidth={3} fill="#6366f1" fillOpacity={0.2} />
                   </RadarChart>
                 </ResponsiveContainer>
              </div>
           </div>
           
           <div className="w-full md:w-64 flex flex-col justify-center">
              <div className="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-xl relative overflow-hidden">
                 <h4 className="text-xs font-black text-indigo-400 uppercase mb-3">Journal de Chantier IA</h4>
                 <p className="text-[11px] app-text leading-relaxed italic">
                    "Coulage du tablier central terminé à 18h. Aucun incident QHSE. Alerte : Livraison bitume à relancer pour demain."
                 </p>
                 <Btn variant="ghost" size="xs" className="mt-4 w-full text-[9px] border-indigo-500/30">Signer le Log Journalier →</Btn>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default GenieCivilElite;
