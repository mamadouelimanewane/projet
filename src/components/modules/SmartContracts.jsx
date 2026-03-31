import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const SmartContracts = ({ data }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Gouvernance & Smart Contracts" subtitle="Registre immuable des approbations et paiements on-chain" action={<Btn size="md" className="bg-emerald-600 hover:bg-emerald-500 text-white">Déployer Contrat</Btn>} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 flex flex-col justify-center text-center">
          <div className="text-5xl mb-3 text-emerald-400">⛓</div>
          <p className="text-sm font-bold text-white mb-1">Réseau Privé Élite</p>
          <p className="text-xs text-slate-400 mb-3">Nodes actifs : 4/4</p>
          <p className="text-[10px] text-emerald-500 font-mono bg-emerald-900/20 px-2 py-1 rounded">Statut : CONNECTÉ</p>
        </div>
        <div className="col-span-3 bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-slate-700">
              {["Hash Contrat", "Projet", "Montant Sécurisé", "Condition de Trigger", "Date", "Statut"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">{h}</th>)}
            </tr></thead>
            <tbody>
              {data.map((c, i) => (
                <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="px-4 py-3 text-xs font-mono text-indigo-400">{c.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-200">{c.projet}</td>
                  <td className="px-4 py-3 text-sm font-bold text-emerald-400">{c.montant.toLocaleString()} FCFA</td>
                  <td className="px-4 py-3 text-xs text-slate-400 flex items-center gap-1"><i>λ</i> {c.condition}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{c.date}</td>
                  <td className="px-4 py-3"><Badge value={c.statut} map={{ "Exécuté": "#10b981", "En attente": "#f59e0b", "Bloqué": "#ef4444" }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SmartContracts;
