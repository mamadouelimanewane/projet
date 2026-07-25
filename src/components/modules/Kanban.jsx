import React, { useState, useRef, useCallback } from "react";
import { PRIORITE_COLORS } from "../../data/constants";
import { Modal, Input, Select, Btn, SectionHeader } from "../ui";

// ─── Touch + Mouse unified drag & drop ───────────────────────────────────────
// Works on iOS Safari, Android Chrome, and desktop browsers.

const Kanban = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  // dragItem: { id, col } — shared between mouse and touch
  const dragItem = useRef(null);
  // For touch: track which column the finger is over
  const [dragOverCol, setDragOverCol] = useState(null);

  const columns = [
    { key: "backlog", label: "Backlog", color: "#94a3b8" },
    { key: "enCours", label: "En Cours", color: "#f59e0b" },
    { key: "enRevue", label: "En Revue", color: "#6366f1" },
    { key: "termine", label: "Terminé", color: "#10b981" },
  ];

  const moveCard = useCallback((cardId, fromCol, toCol) => {
    if (!fromCol || !toCol || fromCol === toCol) return;
    setData(prev => {
      const card = (prev[fromCol] || []).find(c => c.id === cardId);
      if (!card) return prev;
      return {
        ...prev,
        [fromCol]: prev[fromCol].filter(c => c.id !== cardId),
        [toCol]: [...(prev[toCol] || []), card],
      };
    });
  }, [setData]);

  // ── Mouse drag handlers ──
  const onMouseDragStart = (id, col) => { dragItem.current = { id, col }; };
  const onMouseDrop = (toCol) => {
    if (dragItem.current) { moveCard(dragItem.current.id, dragItem.current.col, toCol); dragItem.current = null; setDragOverCol(null); }
  };

  // ── Touch drag handlers ──
  const onTouchStart = (id, col) => { dragItem.current = { id, col }; };
  const onTouchMove = (e) => {
    e.preventDefault(); // prevent scroll while dragging
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const colEl = el?.closest('[data-col]');
    setDragOverCol(colEl ? colEl.dataset.col : null);
  };
  const onTouchEnd = () => {
    if (dragItem.current && dragOverCol) {
      moveCard(dragItem.current.id, dragItem.current.col, dragOverCol);
    }
    dragItem.current = null;
    setDragOverCol(null);
  };

  const addCard = (col) => { setForm({ titre: "", priorite: "Moyenne", assignee: "", points: 5, col }); setModal("add"); };
  const save = () => {
    const { col, ...card } = { ...form, id: Date.now(), couleur: PRIORITE_COLORS[form.priorite] };
    setData(prev => ({ ...prev, [col]: [...(prev[col] || []), card] }));
    setModal(null);
  };
  const delCard = (id, col) => setData(prev => ({ ...prev, [col]: prev[col].filter(c => c.id !== id) }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Kanban Board" subtitle="Visualisez et gérez le flux de travail de votre équipe" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {columns.map(col => (
          <div
            key={col.key}
            data-col={col.key}
            className={`app-surface2 border rounded-xl p-3 transition-colors ${dragOverCol === col.key ? "border-indigo-500 bg-indigo-600/10" : "app-border"}`}
            onDragOver={e => { e.preventDefault(); setDragOverCol(col.key); }}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={() => onMouseDrop(col.key)}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                <h3 className="text-xs font-bold app-text uppercase tracking-wider">{col.label}</h3>
                <span className="text-xs app-surface3 app-text2 px-1.5 py-0.5 rounded-full">{(data[col.key] || []).length}</span>
              </div>
              <Btn onClick={() => addCard(col.key)} variant="ghost" size="sm">+</Btn>
            </div>
            <div className="space-y-2 min-h-16">
              {(data[col.key] || []).map(card => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => onMouseDragStart(card.id, col.key)}
                  onTouchStart={() => onTouchStart(card.id, col.key)}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  className="app-surface3 border app-border2 rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-indigo-500/50 transition-all touch-none select-none"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: (PRIORITE_COLORS[card.priorite] || "#888") + "22", color: PRIORITE_COLORS[card.priorite] || "#888" }}>
                      {card.priorite}
                    </span>
                    <button onClick={() => delCard(card.id, col.key)} className="text-slate-600 hover:text-red-400 text-lg leading-none">×</button>
                  </div>
                  <p className="text-sm text-slate-200 font-medium leading-tight mb-2">{card.titre}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs app-text3">{card.assignee}</span>
                    <span className="text-xs bg-indigo-600/30 text-indigo-300 px-2 py-0.5 rounded-full font-bold">{card.points}pts</span>
                  </div>
                  {/* Boutons de déplacement rapide (accessibilité + mobile) */}
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {columns.filter(c => c.key !== col.key).map(c => (
                      <button key={c.key} onClick={() => moveCard(card.id, col.key, c.key)}
                        className="text-xs px-1.5 py-0.5 rounded bg-slate-600/50 hover:bg-slate-500 app-text2 hover:text-slate-200 transition-colors"
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
