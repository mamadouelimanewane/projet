import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Badge, StatCard, SectionHeader, Btn } from "../ui";

const CopilotePredictif = ({ data }) => {
  const radarData = [
    { subject: 'Vélocité', A: 85, fullMark: 100 },
    { subject: 'Qualité', A: 70, fullMark: 100 },
    { subject: 'Budget', A: 90, fullMark: 100 },
    { subject: 'Risques', A: 65, fullMark: 100 },
    { subject: 'Moral', A: 80, fullMark: 100 },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      <SectionHeader 
        title="Copilote & Analyse Prédictive" 
        subtitle="Moteur neuronal d'anticipation des risques et d'optimisation" 
        action={<Btn variant="primary" size="md">Lancer Analyse Profonde</Btn>} 
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Health Score" value="A-" color="#10b981" icon="🧬" sub="Basé sur 45 métriques" />
        <StatCard label="Risque de Dérive" value="28%" color="#f59e0b" icon="📉" sub="Impact critique évité" />
        <StatCard label="Vitesse de Burn" value="1.15x" color="#ef4444" icon="🔥" sub="Ressources en tension" />
        <StatCard label="Prédiction Succès" value="94.2%" color="#6366f1" icon="🎯" sub="Fiabilité modèle : 98%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-indigo-600/20 transition-all duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-xl text-indigo-400">✧</div>
              <h3 className="text-xl font-bold app-text tracking-tight">Insight Stratégique IA</h3>
            </div>
            
            <div className="space-y-4 app-text leading-relaxed">
              <p className="text-sm">
                L'analyse des derniers 3 Sprints révèle une <strong>corrélation directe</strong> entre la baisse de vélocité de 12% et la phase de régression du module Comptabilité. 
              </p>
              <div className="p-4 rounded-xl app-surface border border-indigo-500/20 font-medium text-indigo-200 text-sm">
                💡 Recommandation : Allouer Sophie L. (QA Expert) à 100% sur le projet "Refonte SI" pendant 10 jours pour stabiliser le build.
              </div>
              <p className="text-sm">
                Gain potentiel : <strong>-15h de délai</strong> et une réduction du risque de dépassement budgétaire de 8%.
              </p>
            </div>
            
            <div className="flex gap-4 mt-8">
              <Btn variant="primary" size="md">Appliquer l'Optimisation</Btn>
              <Btn variant="ghost" size="md">Simuler l'Impact</Btn>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center">
          <h3 className="text-[10px] font-black app-text3 mb-8 uppercase tracking-[0.2em] self-start">Empreinte Neuronale de l'App</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} />
                <Radar
                  name="Performance"
                  dataKey="A"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="#6366f1"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs app-text3 font-bold uppercase tracking-widest">Équilibre Multidimensionnel</p>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-[10px] font-black app-text3 mb-8 uppercase tracking-[0.2em]">Arbre de Décision Prédictif (Logic)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="p-4 rounded-xl border app-border app-surface2 text-center relative z-10">
            <p className="text-xs font-bold app-text2 mb-1 uppercase">Entrée</p>
            <p className="text-sm font-bold app-text">Budget & Scope</p>
          </div>
          <div className="hidden md:flex items-center justify-center absolute inset-0 pointer-events-none">
             <div className="w-full h-[1px] app-surface3" />
          </div>
          <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 text-center relative z-10">
            <p className="text-xs font-bold text-indigo-400 mb-1 uppercase">Analyse IA</p>
            <p className="text-sm font-bold text-indigo-100">Optimisation Flux</p>
          </div>
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-center relative z-10">
            <p className="text-xs font-bold text-emerald-400 mb-1 uppercase">Sortie</p>
            <p className="text-sm font-bold text-emerald-100">Générer ROI +12%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopilotePredictif;
