import React, { useState } from "react";
import { AlertTriangle, Zap, Skull, TrendingDown, ShieldAlert, Play, RefreshCw, BarChart } from "lucide-react";
import { SectionHeader, Card, Btn, Badge, ProgressBar } from "../ui";

const SimulationCrise = ({ data = {} }) => {
  const [activeScenario, setActiveScenario] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const scenarios = [
    { id: "blackswan", titre: "Black Swan : Crise Financière Mondiale", gravite: "Extrême", impact: "-40% Budget", icon: <Skull /> },
    { id: "cyber", titre: "Cyber-Attaque : Fuite de Données", gravite: "Haute", impact: "Réputation & Légal", icon: <ShieldAlert /> },
    { id: "supply", titre: "Rupture Supply Chain Totale", gravite: "Moyenne", impact: "+6 mois de délai", icon: <TrendingDown /> },
  ];

  const handleSimulate = (id) => {
    setActiveScenario(id);
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Simulation de Crise (Black Swan)" 
        subtitle="Stress-tests extrêmes et protocoles de survie"
        action={
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-slate-300">Niveau de Stress : {data.stressLevel || 12}%</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map(s => (
          <Card key={s.id} className={`p-6 glass-card rounded-2xl border-2 transition-all ${activeScenario === s.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800'}`}>
             <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.id === 'blackswan' ? 'bg-red-600/20 text-red-400' : 'bg-orange-600/20 text-orange-400'}`}>
                   {s.icon}
                </div>
                <Badge value={s.gravite} />
             </div>
             <h4 className="font-black text-white mb-2 leading-tight">{s.titre}</h4>
             <p className="text-xs text-slate-400 mb-6">Impact Estimé : <strong className="text-white">{s.impact}</strong></p>
             <Btn variant="danger" className="w-full" onClick={() => handleSimulate(s.id)}>
               {isSimulating && activeScenario === s.id ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Play className="w-4 h-4 mr-2" />}
               Lancer Stress-Test
             </Btn>
          </Card>
        ))}
      </div>

      {activeScenario && !isSimulating && (
        <Card className="p-8 glass-card rounded-2xl border-2 border-red-500/30 animate-entrance">
           <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="text-center md:text-left space-y-2">
                 <h3 className="text-2xl font-black text-white">Résultats du Stress-Test</h3>
                 <p className="text-slate-400">Analyse de résilience du portefeuille Projet Élite.</p>
                 <div className="pt-4 flex gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                       <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Capacité de Survie</p>
                       <p className="text-2xl font-black text-red-500">22%</p>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                       <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Délai avant Faillite</p>
                       <p className="text-2xl font-black text-orange-400">45 jours</p>
                    </div>
                 </div>
              </div>
              <div className="flex-1 w-full space-y-6">
                 <div>
                    <div className="flex justify-between text-xs font-bold text-white mb-2">
                       <span>Portefeuille (Post-Choc)</span>
                       <span className="text-red-400">-58.2M FCFA</span>
                    </div>
                    <ProgressBar value={42} color="#ef4444" />
                 </div>
                 <div className="p-4 bg-red-600/10 rounded-xl border border-red-500/20">
                    <h5 className="text-xs font-bold text-red-400 mb-2 uppercase">Actions de Survie recommandées par l'IA :</h5>
                    <ul className="text-xs text-slate-300 space-y-2">
                       <li>• Geler immédiatement 100% des recrutements</li>
                       <li>• Activer la ligne de crédit d'urgence (Tier 2)</li>
                       <li>• Liquider les actifs non-stratégiques (lot #4)</li>
                    </ul>
                 </div>
              </div>
           </div>
        </Card>
      )}
    </div>
  );
};

export default SimulationCrise;
