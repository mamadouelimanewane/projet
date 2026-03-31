import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { ProgressBar, StatCard, SectionHeader, Badge } from "../ui";

const SentimentTeam = ({ data }) => {
  const radarTeamData = [
    { subject: 'Engagement', A: 85, fullMark: 100 },
    { subject: 'Surcharge', A: 70, fullMark: 100 },
    { subject: 'Autonomie', A: 90, fullMark: 100 },
    { subject: 'Alignement', A: 65, fullMark: 100 },
    { subject: 'Efficacité', A: 80, fullMark: 100 },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      <SectionHeader 
        title="Santé Humaine & Moral (People Ops)" 
        subtitle="Moteur d'analyse prédictive de burnout et de dynamique d'équipe" 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Indice de Bonheur" value="7.8/10" color="#10b981" icon="💖" sub="Moyenne globale équipe" />
        <StatCard label="Charge Mentale" value="Haute" color="#f59e0b" icon="🤯" sub="Risque de démotivation identifié" />
        <StatCard label="Clarté Stratégique" value="92%" color="#6366f1" icon="🎯" sub="Compréhension des objectifs" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-8">
           <h3 className="text-[10px] font-black text-slate-500 mb-8 uppercase tracking-[0.2em]">Tableau de Santé par Squad</h3>
           <div className="space-y-6">
             {(data || []).map((t, i) => (
               <div key={i} className="p-5 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                 <div className="flex justify-between items-center mb-4">
                   <div>
                     <h4 className="text-lg font-bold text-white">{t.name}</h4>
                     <p className="text-xs text-slate-400 mt-1">Status RH : {t.risk}</p>
                   </div>
                   <div className="text-2xl">{t.trend}</div>
                 </div>
                 
                 <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-2">
                       <span>Score Engagement</span>
                       <span>{t.score}%</span>
                    </div>
                    <ProgressBar value={t.score} color={t.score > 80 ? "#10b981" : t.score > 60 ? "#f59e0b" : "#ef4444"} />
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center">
            <h3 className="text-[10px] font-black text-slate-500 mb-8 uppercase tracking-[0.2em] self-start">Équilibre de Vie (Work-Life Balance)</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarTeamData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} />
                  <Radar
                    name="Equilibre"
                    dataKey="A"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="#10b981"
                    fillOpacity={0.2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-center">
               <p className="text-xs text-emerald-300 font-medium leading-relaxed italic">
                 ✨ Recommandation IA : Planifier une session "No-Meeting Friday" pour réduire la fragmentation cognitive de la Dev Team.
               </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentTeam;
