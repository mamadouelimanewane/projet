import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Taches = ({ data, setData, projets }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [filterProjet, setFilterProjet] = useState("Tous");

  const projetNames = ["Tous", ...new Set(data.map(t => t.projet))];
  let filtered = data;
  if (filterStatut !== "Tous") filtered = filtered.filter(t => t.statut === filterStatut);
  if (filterProjet !== "Tous") filtered = filtered.filter(t => t.projet === filterProjet);

  const save = () => {
    const f = { ...form, progression: Number(form.progression) };
    if (modal === "add") setData([...data, { ...f, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? f : d));
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des Tâches" subtitle="Toutes les tâches de vos projets en un coup d'œil"
        action={<Btn onClick={() => { setForm({ projet: projets[0]?.nom || "", tache: "", responsable: "", debut: "", fin: "", statut: "À faire", priorite: "Moyenne", progression: 0 }); setModal("add"); }} size="md">+ Ajouter</Btn>} />
      <div className="flex gap-3 flex-wrap">
        <select className="app-surface3 border app-border2 rounded-lg px-3 py-2 text-sm app-text focus:outline-none focus:border-indigo-500"
          value={filterProjet} onChange={e => setFilterProjet(e.target.value)}>
          {projetNames.map(p => <option key={p}>{p}</option>)}
        </select>
        {["Tous", "À faire", "En cours", "Fait"].map(s => (
          <button key={s} onClick={() => setFilterStatut(s)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${filterStatut === s ? "bg-indigo-600 text-white" : "app-surface2 app-text2 hover:text-white border app-border"}`}>{s}</button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map(t => (
          <div key={t.id} className="app-surface2 border app-border rounded-xl p-4 hover:border-indigo-500/40 transition-all">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0 mr-3">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs app-surface3 app-text2 px-2 py-0.5 rounded-full">{t.projet}</span>
                  <Badge value={t.statut} />
                  <Badge value={t.priorite} map={PRIORITE_COLORS} />
                </div>
                <p className="text-sm font-semibold app-text">{t.tache}</p>
                <p className="text-xs app-text3">{t.responsable} · {t.debut} → {t.fin}</p>
              </div>
              <div className="flex gap-2">
                <Btn onClick={() => { setForm({ ...t }); setModal("edit"); }} variant="ghost">✎</Btn>
                <Btn onClick={() => setData(data.filter(d => d.id !== t.id))} variant="danger">✕</Btn>
              </div>
            </div>
            <ProgressBar value={t.progression} color={t.progression === 100 ? "#10b981" : t.progression > 50 ? "#6366f1" : "#f59e0b"} />
          </div>
        ))}
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouvelle Tâche" : "Modifier Tâche"} onClose={() => setModal(null)}>
          <Select label="Projet" value={form.projet || ""} options={projets.map(p => p.nom)} onChange={e => setForm({ ...form, projet: e.target.value })} />
          <Input label="Tâche" value={form.tache || ""} onChange={e => setForm({ ...form, tache: e.target.value })} />
          <Input label="Responsable" value={form.responsable || ""} onChange={e => setForm({ ...form, responsable: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Début" type="date" value={form.debut || ""} onChange={e => setForm({ ...form, debut: e.target.value })} />
            <Input label="Fin" type="date" value={form.fin || ""} onChange={e => setForm({ ...form, fin: e.target.value })} />
          </div>
          <Select label="Statut" value={form.statut || "À faire"} options={["À faire", "En cours", "Fait"]} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <Select label="Priorité" value={form.priorite || "Moyenne"} options={["Basse", "Moyenne", "Haute", "Critique"]} onChange={e => setForm({ ...form, priorite: e.target.value })} />
          <Input label="Progression (%)" type="number" min="0" max="100" value={form.progression || 0} onChange={e => setForm({ ...form, progression: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default Taches;
