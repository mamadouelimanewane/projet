import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Couts = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const totalP = data.reduce((s, c) => s + c.prevu, 0);
  const totalR = data.reduce((s, c) => s + c.reel, 0);
  const variance = totalP - totalR;

  const chartData = data.map(c => ({ name: c.phase, Prévu: c.prevu, Réel: c.reel, Variance: c.prevu - c.reel }));
  const save = () => {
    const f = { ...form, prevu: Number(form.prevu), reel: Number(form.reel) };
    const statut = f.reel > f.prevu ? "Dépassement" : "Sous budget";
    if (modal === "add") setData([...data, { ...f, statut, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? { ...f, statut } : d));
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des Coûts" subtitle="Contrôlez vos dépenses par phase de projet"
        action={<Btn onClick={() => { setForm({ phase: "", prevu: "", reel: "" }); setModal("add"); }} size="md">+ Ajouter Phase</Btn>} />
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Budget Prévu" value={`${totalP.toLocaleString()} FCFA`} color="#6366f1" icon="Σ" />
        <StatCard label="Réel Dépensé" value={`${totalR.toLocaleString()} FCFA`} color={totalR > totalP ? "#ef4444" : "#10b981"} icon="FCFA" />
        <StatCard label="Variance" value={`${variance >= 0 ? "+" : ""}${variance.toLocaleString()} FCFA`} color={variance >= 0 ? "#10b981" : "#ef4444"} icon="Δ" sub={variance >= 0 ? "Économie réalisée" : "Dépassement"} />
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Analyse Coûts par Phase</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} formatter={v => `${v.toLocaleString()} FCFA`} />
            <Legend />
            <Bar dataKey="Prévu" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Réel" fill="#a78bfa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700">
            {["Phase", "Prévu (FCFA)", "Réel (FCFA)", "Variance (FCFA)", "Statut", "Actions"].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {data.map(c => (
              <tr key={c.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-slate-200">{c.phase}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{c.prevu.toLocaleString()} FCFA</td>
                <td className="px-4 py-3 text-sm text-slate-300">{c.reel.toLocaleString()} FCFA</td>
                <td className="px-4 py-3 text-sm font-bold" style={{ color: c.prevu - c.reel >= 0 ? "#10b981" : "#ef4444" }}>
                  {c.prevu - c.reel >= 0 ? "+" : ""}{(c.prevu - c.reel).toLocaleString()} FCFA
                </td>
                <td className="px-4 py-3"><Badge value={c.statut} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Btn onClick={() => { setForm({ ...c }); setModal("edit"); }} variant="ghost">✎</Btn>
                    <Btn onClick={() => setData(data.filter(d => d.id !== c.id))} variant="danger">✕</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouvelle Phase" : "Modifier Phase"} onClose={() => setModal(null)}>
          <Input label="Phase" value={form.phase || ""} onChange={e => setForm({ ...form, phase: e.target.value })} />
          <Input label="Coût Prévu (FCFA)" type="number" value={form.prevu || ""} onChange={e => setForm({ ...form, prevu: e.target.value })} />
          <Input label="Coût Réel (FCFA)" type="number" value={form.reel || ""} onChange={e => setForm({ ...form, reel: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default Couts;
