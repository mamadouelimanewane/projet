import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Kanban = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [dragItem, setDragItem] = useState(null);

  const columns = [
    { key: "backlog", label: "Backlog", color: "#94a3b8" },
    { key: "enCours", label: "En Cours", color: "#f59e0b" },
    { key: "enRevue", label: "En Revue", color: "#6366f1" },
    { key: "termine", label: "Terminé", color: "#10b981" },
  ];

  const moveCard = (cardId, fromCol, toCol) => {
    if (fromCol === toCol) return;
    const card = data[fromCol].find(c => c.id === cardId);
    if (!card) return;
    setData({ ...data, [fromCol]: data[fromCol].filter(c => c.id !== cardId), [toCol]: [...data[toCol], card] });
  };

  const addCard = (col) => {
    setForm({ titre: "", priorite: "Moyenne", assignee: "", points: 5, col });
    setModal("add");
  };

  const save = () => {
    const { col, ...card } = { ...form, id: Date.now(), couleur: PRIORITE_COLORS[form.priorite] };
    setData({ ...data, [col]: [...data[col], card] });
    setModal(null);
  };

  const delCard = (id, col) => setData({ ...data, [col]: data[col].filter(c => c.id !== id) });

  return (
    <div className="space-y-6">
      <SectionHeader title="Kanban Board" subtitle="Visualisez et gérez le flux de travail de votre équipe" />
      <div className="grid grid-cols-4 gap-4">
        {columns.map(col => (
          <div key={col.key} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3"
            onDragOver={e => e.preventDefault()}
            onDrop={() => { if (dragItem) { moveCard(dragItem.id, dragItem.col, col.key); setDragItem(null); } }}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{col.label}</h3>
                <span className="text-xs bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded-full">{data[col.key].length}</span>
              </div>
              <Btn onClick={() => addCard(col.key)} variant="ghost" size="sm">+</Btn>
            </div>
            <div className="space-y-2 min-h-16">
              {data[col.key].map(card => (
                <div key={card.id} draggable
                  onDragStart={() => setDragItem({ id: card.id, col: col.key })}
                  className="bg-slate-700/80 border border-slate-600/50 rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-indigo-500/50 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: PRIORITE_COLORS[card.priorite] + "22", color: PRIORITE_COLORS[card.priorite] }}>{card.priorite}</span>
                    <button onClick={() => delCard(card.id, col.key)} className="text-slate-600 hover:text-red-400 text-lg leading-none">×</button>
                  </div>
                  <p className="text-sm text-slate-200 font-medium leading-tight mb-2">{card.titre}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">{card.assignee}</span>
                    <span className="text-xs bg-indigo-600/30 text-indigo-300 px-2 py-0.5 rounded-full font-bold">{card.points}pts</span>
                  </div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {columns.filter(c => c.key !== col.key).map(c => (
                      <button key={c.key} onClick={() => moveCard(card.id, col.key, c.key)}
                        className="text-xs px-1.5 py-0.5 rounded bg-slate-600/50 hover:bg-slate-500 text-slate-400 hover:text-slate-200 transition-colors"
                        title={`→ ${c.label}`}>→ {c.label.substring(0, 3)}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <Modal title="Nouvelle Carte" onClose={() => setModal(null)}>
          <Input label="Titre" value={form.titre || ""} onChange={e => setForm({ ...form, titre: e.target.value })} />
          <Input label="Assigné à" value={form.assignee || ""} onChange={e => setForm({ ...form, assignee: e.target.value })} />
          <Select label="Priorité" value={form.priorite || "Moyenne"} options={["Basse", "Moyenne", "Haute", "Critique"]} onChange={e => setForm({ ...form, priorite: e.target.value })} />
          <Input label="Story Points" type="number" value={form.points || 5} onChange={e => setForm({ ...form, points: Number(e.target.value) })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Ajouter</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default Kanban;
