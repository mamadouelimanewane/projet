import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const MultiProjets = ({ data, setData }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [showArchived, setShowArchived] = useState(false);

  const openAdd = () => setForm({ nom: "", chef: "", debut: "", fin: "", avancement: 0, statut: "Planifié", budget: 0, budgetReel: 0 });
  const openEdit = (item) => { setForm({ ...item }); setModal("edit"); };
  const save = () => {
    const f = { ...form, avancement: Number(form.avancement), budget: Number(form.budget), budgetReel: Number(form.budgetReel) };
    if (modal === "add") setData([...data, { ...f, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? f : d));
    setModal(null);
  };
  const del = (id) => {
    if (confirm("Voulez-vous vraiment supprimer ce projet définitivement ?")) {
      setData(data.filter(d => d.id !== id));
    }
  };
  const toggleArchive = (id) => {
    setData(data.map(d => d.id === id ? { ...d, archived: !d.archived } : d));
  };

  const statusColor = { "En cours": "#f59e0b", "Terminé": "#10b981", "Planifié": "#6366f1", "En pause": "#94a3b8" };
  const displayData = data.filter(p => !!p.archived === showArchived);

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi Multi-Projets" subtitle="Piloter l'ensemble de votre portefeuille projets"
        action={
          <div className="flex gap-2">
            <Btn onClick={() => setShowArchived(!showArchived)} variant="ghost" size="md">
              {showArchived ? "Voir Actifs" : "Voir Archivés"}
            </Btn>
            <Btn onClick={() => { openAdd(); setModal("add"); }} size="md">+ Nouveau Projet</Btn>
          </div>
        } />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Projets", value: displayData.length, color: "#6366f1" },
          { label: "En cours", value: displayData.filter(p => p.statut === "En cours").length, color: "#f59e0b" },
          { label: "Budget Total", value: `${(displayData.reduce((s, p) => s + p.budget, 0) / 1000).toFixed(0)}k FCFA`, color: "#8b5cf6" },
          { label: "Avancement Moy.", value: `${displayData.length > 0 ? Math.round(displayData.reduce((s, p) => s + p.avancement, 0) / displayData.length) : 0}%`, color: "#10b981" },
        ].map((s, i) => <StatCard key={i} {...s} />)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayData.map(p => {
          const pct = Math.round((p.budgetReel / p.budget) * 100);
          const over = p.budgetReel > p.budget;
          return (
            <div key={p.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/50 transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-base font-bold text-white">{p.nom}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Chef : {p.chef}</p>
                </div>
                <div className="flex gap-2">
                  <Badge value={p.statut} />
                  <Btn onClick={() => navigate(`/dashboard-projet/${p.id}`)} variant="ghost" title="Tableau de bord">📊</Btn>
                  <Btn onClick={() => openEdit(p)} variant="ghost">✎</Btn>
                  <Btn onClick={() => toggleArchive(p.id)} variant="ghost" title={p.archived ? "Restaurer" : "Archiver"}>{p.archived ? "↩️" : "📦"}</Btn>
                  <Btn onClick={() => del(p.id)} variant="danger">✕</Btn>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex justify-between"><span>Période</span><span className="text-slate-300">{p.debut} → {p.fin}</span></div>
                <div>
                  <div className="flex justify-between mb-1"><span>Avancement</span><span className="text-slate-300 font-bold">{p.avancement}%</span></div>
                  <ProgressBar value={p.avancement} color={p.avancement < 50 ? "#f59e0b" : "#10b981"} />
                </div>
                <div className="flex justify-between">
                  <span>Budget consommé</span>
                  <span className={over ? "text-red-400 font-bold" : "text-emerald-400"}>{pct}% ({p.budgetReel.toLocaleString()} FCFA / {p.budget.toLocaleString()} FCFA)</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouveau Projet" : "Modifier Projet"} onClose={() => setModal(null)}>
          <Input label="Nom du projet" value={form.nom || ""} onChange={e => setForm({ ...form, nom: e.target.value })} />
          <Input label="Chef de projet" value={form.chef || ""} onChange={e => setForm({ ...form, chef: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date début" type="date" value={form.debut || ""} onChange={e => setForm({ ...form, debut: e.target.value })} />
            <Input label="Date fin" type="date" value={form.fin || ""} onChange={e => setForm({ ...form, fin: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Budget prévu (FCFA)" type="number" value={form.budget || ""} onChange={e => setForm({ ...form, budget: e.target.value })} />
            <Input label="Budget réel (FCFA)" type="number" value={form.budgetReel || ""} onChange={e => setForm({ ...form, budgetReel: e.target.value })} />
          </div>
          <Input label="Avancement (%)" type="number" min="0" max="100" value={form.avancement || ""} onChange={e => setForm({ ...form, avancement: e.target.value })} />
          <Select label="Statut" value={form.statut || "Planifié"} options={["Planifié", "En cours", "En pause", "Terminé"]} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default MultiProjets;
