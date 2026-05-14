import React, { useState } from "react";
import { Badge, StatCard, SectionHeader, Btn, ProgressBar } from "../ui";

const SCENARIOS_RED = [
  { id: 1, title: "Faillite Fournisseur Cloud", impact: "Coupure totale des services de déploiement", risk: 85, color: "#ef4444", icon: "☁" },
  { id: 2, title: "Départ d'une Ressource Clé (Sophie L.)", impact: "Perte de 60% de la connaissance métier", risk: 65, color: "#f59e0b", icon: "👤" },
  { id: 3, title: "Attaque par Ransomware", impact: "Indisponibilité de la GED pendant 15 jours", risk: 92, color: "#7c3aed", icon: "🔐" }
];

const RedTeamAI = () => {
  const [running, setRunning] = useState(false);
  const [report, setReport] = useState(null);

  const runStressTest = (scenario) => {
    setRunning(true);
    setReport(null);
    setTimeout(() => {
      setReport({
        ...scenario,
        resilience: Math.floor(Math.random() * 40) + 30, // 30-70%
        bottlenecks: ["Infrastructure", "Connaissance métier unique", "Absence de Backup"],
        strategy: "Mise en place de Redondance Géographique et Multi-cloud recommandée."
      });
      setRunning(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-entrance">
      <SectionHeader 
        title="Red Team AI (War Room Stress-Test)" 
        subtitle="Un agent hostile qui attaque votre plan de projet pour tester sa résilience" 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Indice de Résilience" value={report ? `${report.resilience}%` : "74%"} color="#10b981" icon="🛡" sub="Basé sur 12 vecteurs" />
        <StatCard label="Surface d'Attaque" value="Moyenne" color="#f59e0b" icon="🎯" sub="Dépendances externes : 8" />
        <StatCard label="Dernière Agression" value={report ? "Il y a 1 min" : "Jamais"} color="#6366f1" icon="💥" sub="Simulateur actif" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-8">
           <h3 className="text-[10px] font-black text-slate-500 mb-6 uppercase tracking-[0.2em]">Sélectionner un Vecteur d'Agression</h3>
           <div className="space-y-4">
             {SCENARIOS_RED.map(s => (
               <button key={s.id} onClick={() => runStressTest(s)} disabled={running}
                 className="w-full text-left bg-slate-800/40 hover:bg-red-500/10 border border-slate-700/50 hover:border-red-500/50 p-5 rounded-xl transition-all flex items-center justify-between group">
                 <div className="flex items-center gap-4">
                   <div className="text-2xl opacity-80 group-hover:scale-110 transition-transform">{s.icon}</div>
                   <div>
                     <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors uppercase tracking-tight">{s.title}</h4>
                     <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">Risque de survenance : {s.risk}%</p>
                   </div>
                 </div>
                 <div className="text-xs font-bold text-red-400 group-hover:translate-x-2 transition-all">Lancer →</div>
               </button>
             ))}
           </div>
        </div>

        <div className="glass-card rounded-2xl p-8 bg-slate-900 border-red-500/20 relative overflow-hidden flex items-center justify-center min-h-[400px]">
           {running ? (
             <div className="text-center">
                <div className="w-16 h-16 border-4 border-slate-800 border-t-red-500 rounded-full animate-spin mx-auto mb-6 shadow-[0_0_20px_#ef444433]" />
                <p className="text-red-400 font-bold animate-pulse text-lg uppercase tracking-widest">Injection de Chaos...</p>
                <p className="text-xs text-slate-500 mt-2 uppercase font-black tracking-tighter">Stress-testing de la cascade</p>
             </div>
           ) : report ? (
             <div className="w-full space-y-8 animate-entrance relative z-10">
                <div className="text-center">
                   <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Rapport d'Impact {report.icon}</h3>
                   <Badge value="Critique (Zone de Rupture)" map={{ "Critique (Zone de Rupture)": "#ef4444" }} />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-2">
                       <span>Survie Systémique</span>
                       <span>{report.resilience}%</span>
                    </div>
                    <ProgressBar value={report.resilience} color="#ef4444" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl">
                        <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase">Points de Faiblesse</p>
                        <ul className="text-sm text-slate-200 mt-2 space-y-1">
                          {report.bottlenecks.map((b, i) => <li key={i} className="flex items-center gap-2">❌ {b}</li>)}
                        </ul>
                     </div>
                     <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                        <p className="text-[10px] font-bold text-indigo-400 mb-2 uppercase">Contre-Mesures IA</p>
                        <p className="text-xs text-indigo-200 mt-2 italic leading-relaxed">{report.strategy}</p>
                     </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Btn onClick={() => setReport(null)} variant="ghost">Effacer l'agression ♻</Btn>
                </div>
             </div>
           ) : (
             <div className="text-center opacity-40">
               <div className="text-6xl mb-6">🧛</div>
               <h3 className="text-xl font-bold text-white mb-2">La Red Team est au repos</h3>
               <p className="text-sm text-slate-300 max-w-xs mx-auto">Prêt à hacker votre planning pour sauver votre avenir ? Sélectionnez un scénario à gauche.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default RedTeamAI;
