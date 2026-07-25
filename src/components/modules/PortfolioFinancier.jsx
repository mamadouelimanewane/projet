import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const PortfolioFinancier = ({ data }) => {
  const caTotal = data.factures.filter(f => f.statut === "Payé").reduce((s, f) => s + f.montant, 0);
  const coutsTotaux = data.couts.reduce((s, c) => s + c.reel, 0);
  const marge = caTotal - coutsTotaux;
  const margePct = caTotal > 0 ? Math.round((marge / caTotal) * 100) : 0;
  const burnRateActuel = Math.round(coutsTotaux / 180); // Faux burn rate sur 6 mois

  const cashflowData = [
    { mois: "Jan", Revenus: 10000000, Sorties: 12000000 },
    { mois: "Fév", Revenus: 45000000, Sorties: 28000000 },
    { mois: "Mar", Revenus: 25000000, Sorties: 18000000 },
    { mois: "Avr", Revenus: 15000000, Sorties: 15000000 },
    { mois: "Mai", Revenus: 30000000, Sorties: 10000000 },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader title="Portfolio & Intelligence Financière" subtitle="Analyse de rentabilité macroscopique et prévisions de trésorerie" action={<Btn size="md">Exporter Bilan</Btn>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Chiffre d'Affaires" value={`${(caTotal / 1000000).toFixed(1)}M`} sub="FCFA Encaissés" color="#10b981" icon="📥" />
        <StatCard label="Coûts Dépensés" value={`${(coutsTotaux / 1000000).toFixed(1)}M`} sub="FCFA Sortis" color="#ef4444" icon="📤" />
        <StatCard label="Marge Nette" value={`${margePct}%`} sub={`${(marge / 1000000).toFixed(1)}M FCFA bénéfice`} color="#6366f1" icon="💎" />
        <StatCard label="Burn Rate Moyen" value={`${(burnRateActuel / 1000).toFixed(0)}k/j`} sub="FCFA consommés par jour" color="#f59e0b" icon="🔥" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 app-surface2 border app-border rounded-xl p-6">
          <h3 className="text-sm font-bold app-text mb-4 uppercase tracking-wider flex items-center gap-2">🔄 Projection du Cashflow (FCFA)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={cashflowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="mois" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} formatter={v => `${v.toLocaleString()}`} />
              <Legend />
              <Area type="monotone" dataKey="Revenus" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Area type="monotone" dataKey="Sorties" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="app-surface2 border app-border rounded-xl p-6 flex flex-col">
          <h3 className="text-sm font-bold app-text mb-4 uppercase tracking-wider">Analyse de Rentabilité par Projet</h3>
          <div className="space-y-4 flex-1">
            {data.projets.map(p => {
              const prev = p.budget;
              const dep = p.budgetReel;
              const isProfit = dep <= prev;
              return (
                <div key={p.id} className="border-b app-border pb-3 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-white truncate w-40">{p.nom}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${isProfit ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                      {isProfit ? "+" : "-"}{Math.abs(prev - dep).toLocaleString()} F
                    </span>
                  </div>
                  <ProgressBar value={(dep / prev) * 100} color={isProfit ? "#10b981" : "#ef4444"} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioFinancier;
