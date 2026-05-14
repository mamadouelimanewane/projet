import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Facturation = ({ data }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Facturation & Finance" subtitle="Transformez vos jalons et temps en factures" action={<Btn size="md">+ Nouvelle Facture</Btn>} />
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="CA Généré" value={`${(data.reduce((s, f) => s + f.montant, 0) / 1000000).toFixed(1)}M FCFA`} color="#10b981" icon="💰" />
        <StatCard label="En attente" value={`${(data.filter(f => f.statut === "En attente").reduce((s, f) => s + f.montant, 0) / 1000000).toFixed(1)}M FCFA`} color="#f59e0b" icon="⌛" />
        <StatCard label="Factures payées" value={data.filter(f => f.statut === "Payé").length} color="#6366f1" icon="💳" />
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700">
            {["N° Facture", "Client", "Projet", "Montant", "Échéance", "Statut", "Action"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">{h}</th>)}
          </tr></thead>
          <tbody>
            {data.map(f => (
              <tr key={f.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3 text-sm font-medium text-white">{f.id}</td>
                <td className="px-4 py-3 text-sm text-slate-400">{f.client}</td>
                <td className="px-4 py-3 text-sm text-slate-400">{f.projet}</td>
                <td className="px-4 py-3 text-sm font-bold text-indigo-400">{f.montant.toLocaleString()} FCFA</td>
                <td className="px-4 py-3 text-sm text-slate-500">{f.echeance}</td>
                <td className="px-4 py-3"><Badge value={f.statut} map={{ "Payé": "#10b981", "En attente": "#f59e0b", "Brouillon": "#94a3b8" }} /></td>
                <td className="px-4 py-3"><Btn variant="ghost" size="sm">PDF</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Facturation;
