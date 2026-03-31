import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Simulateur = ({ data }) => {
  const [activeScenario, setActiveScenario] = useState(null);
  const [customImpact, setCustomImpact] = useState({ delai: 0, budget: 0, risque: 0 });

  const currentScenario = activeScenario ? SCENARIOS.find(s => s.id === activeScenario) : { impact: customImpact };
  const imp = currentScenario.impact;

  // Stats simulées
  const simStats = [
    { label: "Délai Final", base: "30 Juin", sim: imp.delai === 0 ? "30 Juin" : imp.delai > 0 ? `15 Juil (+${imp.delai}j)` : `10 Juin (${imp.delai}j)`, color: imp.delai > 0 ? "#ef4444" : "#10b981" },
    { label: "Budget Final", base: "345M", sim: imp.budget === 0 ? "345M" : `${(345 * (1 + imp.budget / 100)).toFixed(0)}M (${imp.budget > 0 ? '+' : ''}${imp.budget}%)`, color: imp.budget > 0 ? "#ef4444" : "#10b981" },
    { label: "Niveau Risque", base: "Modéré", sim: imp.risque === 0 ? "Modéré" : imp.risque > 15 ? "Critique" : "Élevé", color: imp.risque > 0 ? "#ef4444" : "#10b981" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader title="Simulateur de Scénarios" subtitle="Anticipez l'impact des imprévus sur votre trajectoire" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SCENARIOS.map(s => (
          <button key={s.id} onClick={() => setActiveScenario(activeScenario === s.id ? null : s.id)}
            className={`p-4 rounded-xl border transition-all text-left ${activeScenario === s.id ? "bg-indigo-600 border-indigo-400 shadow-lg" : "bg-slate-800/60 border-slate-700 hover:border-slate-500"}`}>
            <h3 className="text-sm font-bold text-white mb-1">{s.label}</h3>
            <p className="text-xs text-slate-400 leading-tight">{s.desc}</p>
          </button>
        ))}
      </div>

      <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-bold text-white">Résultat de la Simulation</h3>
          {activeScenario && <Btn variant="ghost" onClick={() => setActiveScenario(null)}>Réinitialiser</Btn>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {simStats.map((s, i) => (
            <div key={i} className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">{s.label}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600">Actuel</p>
                  <p className="text-sm font-bold text-slate-400">{s.base}</p>
                </div>
                <div className="text-xl">➔</div>
                <div className="text-right">
                  <p className="text-xs text-slate-600">Simulé</p>
                  <p className="text-lg font-black" style={{ color: s.color }}>{s.sim}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700">
          <h4 className="text-sm font-bold text-slate-300 mb-4">Analyse d'Impact (Modèle Prédictif)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={[
                { subject: 'Coûts', A: 60, B: 60 + imp.budget },
                { subject: 'Délais', A: 50, B: 50 + imp.delai },
                { subject: 'Risques', A: 40, B: 40 + imp.risque },
                { subject: 'Qualité', A: 80, B: 80 - (imp.delai > 0 ? 5 : 0) },
                { subject: 'Ressources', A: 70, B: 70 - (imp.budget < 0 ? 10 : 0) },
              ]}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <Radar name="Actuel" dataKey="A" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} />
                <Radar name="Simulé" dataKey="B" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center space-y-3">
              <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-4">
                <p className="text-xs font-bold text-indigo-400 mb-2 uppercase">💡 Recommandation Élite</p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {imp.budget > 0 ? "Envisager un arbitrage sur les fonctionnalités non critiques pour compenser le surcoût." :
                    imp.delai > 0 ? "Activer le mode 'Fast-track' ou réduire le périmètre du prochain jalon." :
                      "Maintenir la vigilance sur la vélocité de l'équipe."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Simulateur;
