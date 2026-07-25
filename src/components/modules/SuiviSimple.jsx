import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const SuiviSimple = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [filter, setFilter] = useState("Tous");

  const filtered = filter === "Tous" ? data : data.filter(t => t.statut === filter);
  const openAdd = () => { setForm({ tache: "", responsable: "", dateLimite: "", statut: "À faire", priorite: "Moyenne" }); setModal("add"); };
  const openEdit = (item) => { setForm({ ...item }); setModal("edit"); };
  const save = () => {
    if (modal === "add") setData([...data, { ...form, id: Date.now() }]);
    else setData(data.map(d => d.id === form.id ? form : d));
    setModal(null);
  };
  const del = (id) => setData(data.filter(d => d.id !== id));

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi Simple de Projet" subtitle="Gérez vos tâches avec clarté et efficacité"
        action={<Btn onClick={openAdd} size="md">+ Ajouter Tâche</Btn>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {["Tous", "À faire", "En cours", "Fait"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`p-3 rounded-xl text-sm font-semibold transition-all border ${filter === s ? "bg-indigo-600 border-indigo-500 text-white" : "app-surface2 app-border app-text2 hover:border-slate-500"}`}>
            {s} {s !== "Tous" && <span className="ml-1 text-xs opacity-70">({data.filter(d => d.statut === s).length})</span>}
          </button>
        ))}
      </div>
      <div className="app-surface2 border app-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto -mx-1">
        <table className="w-full">
          <thead><tr className="border-b app-border">
            {["#", "Tâche", "Responsable", "Date Limite", "Statut", "Priorité", "Actions"].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-bold app-text2 uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={item.id} className="border-b app-border hover:app-surface3 transition-colors">
                <td className="px-4 py-3 text-xs app-text3">{i + 1}</td>
                <td className="px-4 py-3 text-sm text-slate-200 font-medium">{item.tache}</td>
                <td className="px-4 py-3 text-sm app-text2">{item.responsable}</td>
                <td className="px-4 py-3 text-sm app-text2">{item.dateLimite}</td>
                <td className="px-4 py-3"><Badge value={item.statut} /></td>
                <td className="px-4 py-3"><Badge value={item.priorite} map={PRIORITE_COLORS} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Btn onClick={() => openEdit(item)} variant="ghost">✎</Btn>
                    <Btn onClick={() => del(item.id)} variant="danger">✕</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
</div>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouvelle Tâche" : "Modifier Tâche"} onClose={() => setModal(null)}>
          <Input label="Tâche" value={form.tache || ""} onChange={e => setForm({ ...form, tache: e.target.value })} placeholder="Description de la tâche" />
          <Input label="Responsable" value={form.responsable || ""} onChange={e => setForm({ ...form, responsable: e.target.value })} placeholder="Nom du responsable" />
          <Input label="Date Limite" type="date" value={form.dateLimite || ""} onChange={e => setForm({ ...form, dateLimite: e.target.value })} />
          <Select label="Statut" value={form.statut || "À faire"} options={["À faire", "En cours", "Fait"]} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <Select label="Priorité" value={form.priorite || "Moyenne"} options={["Basse", "Moyenne", "Haute", "Critique"]} onChange={e => setForm({ ...form, priorite: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default SuiviSimple;
