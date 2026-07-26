import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Badge, StatCard, SectionHeader } from "../ui";

const GreenPMO = ({ data }) => {
  return (
    <div className="space-y-8 animate-entrance">
      <SectionHeader title="Bilan Carbone & ESG (Green PMO)" subtitle="Maitrise de l'empreinte environnementale globale du portefeuille" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Empreinte Totale" value="5 700" sub="kg CO2éq générés" color="#10b981" icon="☁" />
        <StatCard label="Économies Carbone" value="-12%" sub="vs budget initial alloué" color="#06b6d4" icon="📉" />
        <StatCard label="Certifications" value="2" sub="Iso 14001 en cours" color="#8b5cf6" icon="🏆" />
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xs font-black app-text3 mb-8 uppercase tracking-[0.2em]">Consommation par Projet vs Limite ESG</h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data || []} layout="vertical" margin={{ left: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
            <XAxis type="number" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="projet" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", border: "1px solid rgba(148, 163, 184, 0.1)", borderRadius: 12 }} />
            <Legend verticalAlign="top" align="right" wrapperStyle={{paddingBottom: 20, fontSize: 11, fontWeight: 700}}/>
            <Bar dataKey="empreinteReel" name="Empreinte (kgCO2)" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
            <Bar dataKey="limite" name="Plafond ESG" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} opacity={0.3} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="glass-card rounded-2xl p-6">
         <h3 className="text-xs font-black app-text3 mb-6 uppercase tracking-[0.2em]">Détail Conformité Environnementale</h3>
         <div className="app-surface rounded-xl overflow-hidden border app-border">
          <div className="overflow-x-auto -mx-1">
          <table className="w-full text-left text-sm app-text">
            <thead className="app-surface2 text-[10px] uppercase font-bold app-text3 border-b app-border">
              <tr>
                <th className="px-5 py-4">Projet</th>
                <th className="px-5 py-4">Catégorie Principale</th>
                <th className="px-5 py-4 text-right">Émissions</th>
                <th className="px-5 py-4">Statut ESG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {(data || []).map(p => (
                <tr key={p.id} className="hover:app-surface2 transition-colors">
                  <td className="px-5 py-4 font-bold app-text">{p.projet}</td>
                  <td className="px-5 py-4">{p.categorie}</td>
                  <td className="px-5 py-4 text-right font-mono text-indigo-300">{p.empreinteReel} {p.unite}</td>
                  <td className="px-5 py-4">
                    <Badge value={p.statut} map={{ "Conforme": "#10b981", "Alerte": "#f59e0b" }} />
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

export default GreenPMO;
