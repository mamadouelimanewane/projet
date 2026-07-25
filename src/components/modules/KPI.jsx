import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const KPI = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const save = () => {
    const f = { ...form, valeur: Number(form.valeur), cible: Number(form.cible) };
    if (modal === "add") setData([...data, { ...f, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? f : d));
    setModal(null);
  };
  const getKpiPct = (k) => Math.min(Math.round((k.valeur / k.cible) * 100), 130);
  const getKpiColor = (k) => {
    const pct = getKpiPct(k);
    if (k.nom.includes("défaut") || k.nom.includes("retard") || k.nom.includes("délai")) return pct <= 100 ? "#10b981" : "#ef4444";
    return pct >= 100 ? "#10b981" : pct >= 80 ? "#f59e0b" : "#ef4444";
  };

  const radarData = data.slice(0, 6).map(k => ({ subject: k.nom.substring(0, 12), value: Math.min((k.valeur / k.cible) * 100, 120) }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des KPI" subtitle="Indicateurs clés de performance de vos projets"
        action={<Btn onClick={() => { setForm({ nom: "", valeur: "", cible: "", unite: "%", tendance: "stable", categorie: "Progression" }); setModal("add"); }} size="md">+ KPI</Btn>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map(k => {
          const pct = getKpiPct(k);
          const color = getKpiColor(k);
          return (
            <div key={k.id} className="app-surface2 border app-border rounded-xl p-4 relative overflow-hidden cursor-pointer hover:border-indigo-500/40 transition-all"
              onClick={() => { setForm({ ...k }); setModal("edit"); }}>
              <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at 80% 80%, ${color}, transparent)` }} />
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs app-text3 uppercase tracking-wider font-medium">{k.categorie}</span>
                <span className="text-sm" style={{ color: STATUT_COLORS[k.tendance] }}>
                  {k.tendance === "hausse" ? "↑" : k.tendance === "baisse" ? "↓" : "→"}
                </span>
              </div>
              <div className="text-2xl font-black mb-0.5" style={{ color }}>{k.valeur}{k.unite}</div>
              <div className="text-xs app-text2 mb-3">Cible : {k.cible}{k.unite}</div>
              <p className="text-xs app-text font-medium mb-2 leading-tight">{k.nom}</p>
              <ProgressBar value={Math.min(pct, 100)} color={color} />
            </div>
          );
        })}
      </div>
      <div className="app-surface2 border app-border rounded-xl p-5">
        <h3 className="text-sm font-bold app-text mb-4 uppercase tracking-wider">Radar Performance</h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Radar name="%" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} formatter={v => `${v.toFixed(0)}%`} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouveau KPI" : "Modifier KPI"} onClose={() => setModal(null)}>
          <Input label="Nom du KPI" value={form.nom || ""} onChange={e => setForm({ ...form, nom: e.target.value })} />
          <div className="grid grid-cols-3 gap-3">
            <Input label="Valeur" type="number" value={form.valeur || ""} onChange={e => setForm({ ...form, valeur: e.target.value })} />
            <Input label="Cible" type="number" value={form.cible || ""} onChange={e => setForm({ ...form, cible: e.target.value })} />
            <Input label="Unité" value={form.unite || ""} onChange={e => setForm({ ...form, unite: e.target.value })} placeholder="%, pts..." />
          </div>
          <Select label="Tendance" value={form.tendance || "stable"} options={["hausse", "baisse", "stable"]} onChange={e => setForm({ ...form, tendance: e.target.value })} />
          <Select label="Catégorie" value={form.categorie || "Progression"} options={["Progression", "Finance", "Qualité", "Délais", "Agile", "Productivité"]} onChange={e => setForm({ ...form, categorie: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default KPI;
