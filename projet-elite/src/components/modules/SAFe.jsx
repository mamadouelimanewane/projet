import React from "react";
import { Badge, StatCard, SectionHeader, ProgressBar } from "../ui";

const SAFe = ({ data }) => {
  return (
    <div className="space-y-8 animate-entrance">
      <SectionHeader title="Agilité à l'Échelle (SAFe)" subtitle="Agile Release Trains & Program Increments (PI)" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Release Trains Actifs" value={data ? data.length : 2} sub="Gérant 15 équipes Scrum" color="#8b5cf6" icon="🚂" />
        <StatCard label="Prévisibilité (PI)" value="82%" sub="Objectif: 85 - 100%" color="#10b981" icon="🎯" />
        <StatCard label="Features Terminées" value="45/60" sub="Sur le PI courant" color="#6366f1" icon="✨" />
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xs font-black text-slate-500 mb-6 uppercase tracking-[0.2em]">Release Trains Sync</h3>
        <div className="space-y-6">
          {(data || []).map((train) => (
            <div key={train.id} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-lg font-bold text-white">{train.train}</h4>
                  <p className="text-xs text-slate-400 mt-1">Séquence : {train.pi} · {train.iteration}</p>
                </div>
                <Badge value={train.status} map={{ "En bonne voie": "#10b981", "Risque de retard": "#f59e0b" }} />
              </div>
              <div className="space-y-4 mt-6">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-2">
                    <span>Performance Business (Business Value)</span>
                    <span>{train.pB}%</span>
                  </div>
                  <ProgressBar value={train.pB} color={train.pB > 70 ? "#10b981" : "#f59e0b"} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SAFe;
