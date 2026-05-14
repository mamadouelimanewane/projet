import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Delais = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const save = () => {
    if (modal === "add") setData([...data, { ...form, id: Date.now() }]);
    else setData(data.map(d => d.id === form.id ? form : d));
    setModal(null);
  };
  const getEcart = (p, r) => {
    if (!p || !r) return null;
    const days = Math.round((new Date(r) - new Date(p)) / 86400000);
    return days;
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des Délais" subtitle="Analysez les écarts et optimisez la planification"
        action={<Btn onClick={() => { setForm({ tache: "", planifie: "", reel: "", cause: "", responsable: "", impact: "Moyen" }); setModal("add"); }} size="md">+ Écart</Btn>} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Tâches en Retard" value={data.filter(d => d.reel && new Date(d.reel) > new Date(d.planifie)).length} color="#ef4444" icon="⏱" />
        <StatCard label="Retard Moyen" value={`${Math.round(data.filter(d => d.reel).reduce((s, d) => s + getEcart(d.planifie, d.reel), 0) / Math.max(data.filter(d => d.reel).length, 1))}j`} color="#f59e0b" icon="Δ" />
        <StatCard label="À planifier" value={data.filter(d => !d.reel).length} color="#6366f1" icon="◉" />
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto -mx-1">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700">
            {["Tâche", "Date Planifiée", "Date Réelle", "Écart", "Responsable", "Impact", "Cause", "Actions"].map(h => (
              <th key={h} className="px-3 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {data.map(d => {
              const ecart = getEcart(d.planifie, d.reel);
              return (
                <tr key={d.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-3 py-3 text-sm font-medium text-slate-200">{d.tache}</td>
                  <td className="px-3 py-3 text-sm text-slate-400">{d.planifie}</td>
                  <td className="px-3 py-3 text-sm text-slate-400">{d.reel || <span className="text-slate-600 italic">En attente</span>}</td>
                  <td className="px-3 py-3 text-sm font-bold" style={{ color: ecart === null ? "#94a3b8" : ecart <= 0 ? "#10b981" : ecart <= 7 ? "#f59e0b" : "#ef4444" }}>
                    {ecart === null ? "-" : ecart === 0 ? "On time" : ecart > 0 ? `+${ecart}j` : `${ecart}j`}
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-400">{d.responsable}</td>
                  <td className="px-3 py-3"><Badge value={d.impact} map={{ "Faible": "#10b981", "Moyen": "#f59e0b", "Fort": "#ef4444", "À déterminer": "#94a3b8" }} /></td>
                  <td className="px-3 py-3 text-xs text-slate-500 max-w-32 truncate">{d.cause || "-"}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <Btn onClick={() => { setForm({ ...d }); setModal("edit"); }} variant="ghost">✎</Btn>
                      <Btn onClick={() => setData(data.filter(x => x.id !== d.id))} variant="danger">✕</Btn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
</div>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouvel Écart" : "Modifier Écart"} onClose={() => setModal(null)}>
          <Input label="Tâche" value={form.tache || ""} onChange={e => setForm({ ...form, tache: e.target.value })} />
          <Input label="Responsable" value={form.responsable || ""} onChange={e => setForm({ ...form, responsable: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date Planifiée" type="date" value={form.planifie || ""} onChange={e => setForm({ ...form, planifie: e.target.value })} />
            <Input label="Date Réelle" type="date" value={form.reel || ""} onChange={e => setForm({ ...form, reel: e.target.value })} />
          </div>
          <Select label="Impact" value={form.impact || "Moyen"} options={["Faible", "Moyen", "Fort", "À déterminer"]} onChange={e => setForm({ ...form, impact: e.target.value })} />
          <Textarea label="Cause du retard" value={form.cause || ""} onChange={e => setForm({ ...form, cause: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default Delais;
