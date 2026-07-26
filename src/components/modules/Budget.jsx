import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Budget = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const totalP = data.reduce((s, b) => s + b.planifie, 0);
  const totalR = data.reduce((s, b) => s + b.reel, 0);
  const save = () => {
    const f = { ...form, planifie: Number(form.planifie), reel: Number(form.reel) };
    const statut = f.reel > f.planifie * 1.05 ? "Dépassement" : f.reel > f.planifie ? "Alerte" : "Normal";
    if (modal === "add") setData([...data, { ...f, statut, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? { ...f, statut } : d));
    setModal(null);
  };

  const pieData = data.map(b => ({ name: b.categorie, value: b.planifie }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi Budgétaire" subtitle="Maîtrisez chaque centime de votre budget projet"
        action={<Btn onClick={() => { setForm({ categorie: "", planifie: "", reel: "" }); setModal("add"); }} size="md">+ Ligne</Btn>} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Budget Total" value={`${(totalP / 1000).toFixed(0)}k€`} color="#6366f1" icon="Σ" sub="Budget alloué" />
        <StatCard label="Dépensé" value={`${(totalR / 1000).toFixed(0)}k€`} color={totalR > totalP ? "#ef4444" : "#10b981"} icon="€" sub={`${Math.round(totalR / totalP * 100)}% du budget`} />
        <StatCard label="Restant" value={`${((totalP - totalR) / 1000).toFixed(0)}k€`} color={totalP - totalR > 0 ? "#10b981" : "#ef4444"} icon="Δ" sub="Solde disponible" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="app-surface2 border app-border rounded-xl p-5">
          <h3 className="text-sm font-bold app-text mb-4 uppercase tracking-wider">Répartition Budget</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} formatter={v => `${v.toLocaleString()}€`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="app-surface2 border app-border rounded-xl p-5">
          <h3 className="text-sm font-bold app-text mb-4 uppercase tracking-wider">Prévu vs Réel</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.map(b => ({ name: b.categorie.substring(0, 10), Prévu: b.planifie, Réel: b.reel }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 9 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={v => `${v / 1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} formatter={v => `${v.toLocaleString()}€`} />
              <Bar dataKey="Prévu" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Réel" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="app-surface2 border app-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto -mx-1">
        <table className="w-full">
          <thead><tr className="border-b app-border">
            {["Catégorie", "Planifié", "Réel", "Écart", "Consommé", "Statut", ""].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-bold app-text2 uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {data.map(b => (
              <tr key={b.id} className="border-b app-border hover:app-surface3 transition-colors">
                <td className="px-4 py-3 text-sm font-medium app-text">{b.categorie}</td>
                <td className="px-4 py-3 text-sm app-text">{b.planifie.toLocaleString()}€</td>
                <td className="px-4 py-3 text-sm app-text">{b.reel.toLocaleString()}€</td>
                <td className="px-4 py-3 text-sm font-bold" style={{ color: b.planifie - b.reel >= 0 ? "#10b981" : "#ef4444" }}>
                  {b.planifie - b.reel >= 0 ? "+" : ""}{(b.planifie - b.reel).toLocaleString()}€
                </td>
                <td className="px-4 py-3 w-40"><ProgressBar value={Math.round((b.reel / b.planifie) * 100)} color={b.reel > b.planifie ? "#ef4444" : "#10b981"} /></td>
                <td className="px-4 py-3"><Badge value={b.statut} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Btn onClick={() => { setForm({ ...b }); setModal("edit"); }} variant="ghost">✎</Btn>
                    <Btn onClick={() => setData(data.filter(d => d.id !== b.id))} variant="danger">✕</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
</div>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouvelle Ligne Budget" : "Modifier"} onClose={() => setModal(null)}>
          <Input label="Catégorie" value={form.categorie || ""} onChange={e => setForm({ ...form, categorie: e.target.value })} />
          <Input label="Budget Planifié (€)" type="number" value={form.planifie || ""} onChange={e => setForm({ ...form, planifie: e.target.value })} />
          <Input label="Réel Dépensé (€)" type="number" value={form.reel || ""} onChange={e => setForm({ ...form, reel: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default Budget;
