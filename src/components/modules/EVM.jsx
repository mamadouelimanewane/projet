import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { Badge, StatCard, SectionHeader } from "../ui";

const EVM = ({ data }) => {
  return (
    <div className="space-y-8 animate-entrance">
      <SectionHeader title="Earned Value Management (EVM)" subtitle="Suivi mathématique de la performance des délais et coûts" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="SPI Global (Délais)" value="0.92" sub="< 1 = En retard" color="#f59e0b" icon="⏱" />
        <StatCard label="CPI Global (Coûts)" value="1.05" sub="> 1 = Sous budget" color="#10b981" icon="💰" />
        <StatCard label="Valeur Acquise Totale" value="125M" sub="Millions FCFA certifiés" color="#6366f1" icon="📊" />
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xs font-black app-text3 mb-8 uppercase tracking-[0.2em]">Matrice de Performance (SPI x CPI)</h3>
        <div className="app-surface rounded-xl overflow-hidden border app-border">
          <div className="overflow-x-auto -mx-1">
          <table className="w-full text-left text-sm app-text">
            <thead className="app-surface2 text-[10px] uppercase font-bold app-text3 border-b app-border">
              <tr>
                <th className="px-5 py-4">Projet</th>
                <th className="px-5 py-4 text-right" title="Planned Value">PV (Prévu)</th>
                <th className="px-5 py-4 text-right" title="Earned Value">EV (Acquis)</th>
                <th className="px-5 py-4 text-right" title="Actual Cost">AC (Réel)</th>
                <th className="px-5 py-4 text-center" title="Schedule Performance Index">SPI</th>
                <th className="px-5 py-4 text-center" title="Cost Performance Index">CPI</th>
                <th className="px-5 py-4">Tendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {(data || []).map(p => (
                <tr key={p.id} className="hover:app-surface2 transition-colors">
                  <td className="px-5 py-4 font-bold app-text">{p.projet}</td>
                  <td className="px-5 py-4 text-right font-mono app-text2">{(p.pV / 1000000).toFixed(1)}M</td>
                  <td className="px-5 py-4 text-right font-mono text-indigo-300 font-bold">{(p.eV / 1000000).toFixed(1)}M</td>
                  <td className="px-5 py-4 text-right font-mono app-text2">{(p.aC / 1000000).toFixed(1)}M</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`px-2 py-1 rounded-md font-mono text-xs font-bold ${p.spi >= 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{p.spi}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`px-2 py-1 rounded-md font-mono text-xs font-bold ${p.cpi >= 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{p.cpi}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge value={p.tendance} map={{ "Favorable": "#10b981", "Critique": "#ef4444" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </div>
      </div>
    </div>
  );
};

export default EVM;
