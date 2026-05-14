import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Problemes = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [filter, setFilter] = useState("Tous");

  const filtered = filter === "Tous" ? data : data.filter(p => p.statut === filter || p.priorite === filter);
  const save = () => {
    if (modal === "add") setData([...data, { ...form, id: Date.now() }]);
    else setData(data.map(d => d.id === form.id ? form : d));
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des Problèmes" subtitle="Identifiez et résolvez les obstacles rapidement"
        action={<Btn onClick={() => { setForm({ description: "", priorite: "Moyenne", statut: "À faire", responsable: "", dateSignalement: new Date().toISOString().slice(0, 10), resolution: "" }); setModal("add"); }} size="md">+ Signaler</Btn>} />
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Ouverts", count: data.filter(p => p.statut !== "Résolu").length, color: "#ef4444" },
          { label: "Critiques", count: data.filter(p => p.priorite === "Critique").length, color: "#7c3aed" },
          { label: "En cours", count: data.filter(p => p.statut === "En cours").length, color: "#f59e0b" },
          { label: "Résolus", count: data.filter(p => p.statut === "Résolu").length, color: "#10b981" },
        ].map((s, i) => (
          <div key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 text-center">
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.count}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {["Tous", "À faire", "En cours", "Résolu", "Critique", "Haute"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${filter === f ? "bg-indigo-600 border-indigo-500 text-white" : "border-slate-700 text-slate-400 hover:text-white"}`}>{f}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-all"
            style={{ borderLeftColor: PRIORITE_COLORS[p.priorite], borderLeftWidth: 3 }}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2 flex-wrap">
                <Badge value={p.priorite} map={PRIORITE_COLORS} />
                <Badge value={p.statut} />
              </div>
              <div className="flex gap-2">
                <Btn onClick={() => { setForm({ ...p }); setModal("edit"); }} variant="ghost">✎</Btn>
                <Btn onClick={() => setData(data.filter(d => d.id !== p.id))} variant="danger">✕</Btn>
              </div>
            </div>
            <p className="text-sm text-white font-medium mb-1">{p.description}</p>
            <p className="text-xs text-slate-500">{p.responsable} · Signalé le {p.dateSignalement}</p>
            {p.resolution && <p className="text-xs text-emerald-400 mt-2 bg-emerald-400/10 rounded px-2 py-1">✓ {p.resolution}</p>}
          </div>
        ))}
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouveau Problème" : "Modifier Problème"} onClose={() => setModal(null)}>
          <Textarea label="Description" value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} />
          <Select label="Priorité" value={form.priorite || "Moyenne"} options={["Basse", "Moyenne", "Haute", "Critique"]} onChange={e => setForm({ ...form, priorite: e.target.value })} />
          <Select label="Statut" value={form.statut || "À faire"} options={["À faire", "En cours", "Résolu"]} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <Input label="Responsable" value={form.responsable || ""} onChange={e => setForm({ ...form, responsable: e.target.value })} />
          <Input label="Date Signalement" type="date" value={form.dateSignalement || ""} onChange={e => setForm({ ...form, dateSignalement: e.target.value })} />
          <Textarea label="Résolution" value={form.resolution || ""} onChange={e => setForm({ ...form, resolution: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default Problemes;
