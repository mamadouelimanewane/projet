import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Gantt = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [zoom, setZoom] = useState("Jour"); // Jour, Semaine, Mois

  // Basic calculation
  const allDates = data.flatMap(t => [new Date(t.debut), new Date(t.fin)]);
  const minDate = new Date(Math.min(...allDates));
  const maxDate = new Date(Math.max(...allDates));

  // Apply zoom factor
  const dayWidth = zoom === "Jour" ? 35 : zoom === "Semaine" ? 15 : 5;

  // Extend timeline to have some padding
  minDate.setDate(minDate.getDate() - 3);
  maxDate.setDate(maxDate.getDate() + 7);
  const totalDays = Math.ceil((maxDate - minDate) / 86400000) + 1;

  const getPos = (date) => Math.max(0, Math.ceil((new Date(date) - minDate) / 86400000));
  const getWidth = (debut, fin) => Math.max(1, Math.ceil((new Date(fin) - new Date(debut)) / 86400000));

  const save = () => {
    const f = { ...form, progression: Number(form.progression) };
    if (modal === "add") setData([...data, { ...f, id: Date.now(), couleur: "#6366f1", dependance: form.dependance ? Number(form.dependance) : null }]);
    else setData(data.map(d => d.id === f.id ? { ...d, ...f, dependance: f.dependance ? Number(f.dependance) : null } : d));
    setModal(null);
  };

  // SVG Dependency lines
  const renderDependencies = () => {
    return data.filter(t => t.dependance).map(t => {
      const depT = data.find(d => d.id === t.dependance);
      if (!depT) return null;

      const idxFrom = data.indexOf(depT);
      const idxTo = data.indexOf(t);
      if (idxFrom === -1 || idxTo === -1) return null;

      const rowHeight = 49; // approx height of each row border included
      const headerHeight = 41;

      const x1 = (getPos(depT.fin)) * dayWidth;
      const y1 = headerHeight + (idxFrom * rowHeight) + (rowHeight / 2);

      const x2 = getPos(t.debut) * dayWidth;
      const y2 = headerHeight + (idxTo * rowHeight) + (rowHeight / 2);

      return (
        <path key={`${depT.id}-${t.id}`}
          d={`M ${x1} ${y1} C ${x1 + 15} ${y1}, ${x2 - 15} ${y2}, ${x2} ${y2}`}
          fill="transparent"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="4 4"
          markerEnd="url(#arrowhead)"
        />
      );
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Super Gantt (Avancé)" subtitle="Planification visuelle des tâches et gestion des dépendances"
        action={<Btn onClick={() => { setForm({ tache: "", debut: new Date().toISOString().substring(0, 10), fin: new Date().toISOString().substring(0, 10), responsable: "", progression: 0, dependance: "" }); setModal("add"); }} size="md" className="bg-indigo-600">+ Nouvelle Tâche</Btn>} />

      <div className="flex justify-between items-center bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-slate-300">Niveau de Zoom :</span>
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
            {["Jour", "Semaine", "Mois"].map(z => (
              <button key={z} onClick={() => setZoom(z)} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${zoom === z ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}>{z}</button>
            ))}
          </div>
        </div>
        <div className="text-xs text-indigo-300 italic flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> 💡 Astuce : Survolez une barre pour l'éditer. Lignes rouges = Dépendances.</div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-x-auto relative shadow-2xl">
        <div style={{ minWidth: 800 }}>
          <div className="flex border-b border-slate-700 bg-slate-900/80">
            <div className="w-64 flex-shrink-0 p-3 text-xs font-black text-indigo-400 uppercase border-r border-slate-700 z-20 sticky left-0 bg-slate-900/95 backdrop-blur items-center flex gap-2">
              <span className="text-lg text-emerald-400">☰</span> Structure du Projet
            </div>
            <div className="flex-1 relative h-10 overflow-hidden">
              <div className="flex h-full" style={{ width: `${totalDays * dayWidth}px` }}>
                {Array.from({ length: totalDays }, (_, i) => {
                  const date = new Date(minDate);
                  date.setDate(date.getDate() + i);
                  const isMonday = date.getDay() === 1;
                  const isToday = date.toDateString() === new Date().toDateString();
                  return (
                    <div key={i} className="flex-shrink-0 flex flex-col items-center justify-center text-[10px] border-r border-slate-700/30 relative"
                      style={{ width: dayWidth, color: isToday ? "#a78bfa" : "#64748b", backgroundColor: isToday ? "#6366f122" : "transparent" }}>
                      {zoom === "Jour" ? (
                        <>
                          <span className={isMonday ? "font-bold text-slate-300" : ""}>{date.toLocaleDateString('fr-FR', { weekday: 'narrow' })}</span>
                          <span className={isToday ? "font-black" : ""}>{date.getDate()}</span>
                        </>
                      ) : zoom === "Semaine" ? (
                        isMonday ? <span className="font-bold whitespace-nowrap -ml-4">S{Math.ceil(date.getDate() / 7)}</span> : ""
                      ) : (
                        date.getDate() === 1 ? <span className="font-bold whitespace-nowrap -ml-4">{date.toLocaleDateString('fr-FR', { month: 'short' })}</span> : ""
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative">
            {/* SVG overlay for dependency lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ minWidth: totalDays * dayWidth }}>
              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#ef4444" />
                </marker>
              </defs>
              <g transform={`translate(256, 0)`}> {/* 256px is w-64 width */}
                {renderDependencies()}
              </g>
            </svg>

            {data.map((task, i) => (
              <div key={task.id} className="flex border-b border-slate-700/30 hover:bg-slate-700/30 group relative transition-colors h-[49px]">
                <div className="w-64 flex-shrink-0 p-3 border-r border-slate-700/50 flex justify-between items-center z-20 sticky left-0 bg-slate-900/60 backdrop-blur group-hover:bg-slate-800 transition-all">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0 shadow-[0_0_8px_currentColor]" style={{ backgroundColor: task.couleur, color: task.couleur }} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-200 truncate">{task.tache}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{task.responsable}</p>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1 bg-slate-800 p-1 rounded-md shadow-lg transition-opacity flex-shrink-0">
                    <Btn onClick={() => { setForm({ ...task }); setModal("edit"); }} variant="ghost" size="sm" className="px-1.5 py-0.5 text-xs">✎</Btn>
                    <Btn onClick={() => setData(data.filter(d => d.id !== task.id))} variant="danger" size="sm" className="px-1.5 py-0.5 text-xs">✕</Btn>
                  </div>
                </div>

                <div className="flex-1 relative" style={{ width: `${totalDays * dayWidth}px` }}>
                  {/* Grid Lines per task */}
                  <div className="absolute inset-0 flex pointer-events-none">
                    {Array.from({ length: totalDays }, (_, j) => {
                      const d = new Date(minDate); d.setDate(d.getDate() + j);
                      return (
                        <div key={j} className={`flex-shrink-0 border-r ${d.getDay() === 1 ? 'border-indigo-500/20' : 'border-slate-700/10'}`} style={{ width: dayWidth }} />
                      );
                    })}
                  </div>

                  <div className="absolute top-1/2 -translate-y-1/2 h-7 rounded flex items-center px-2 cursor-col-resize transition-all hover:brightness-125 hover:shadow-lg hover:shadow-indigo-500/20 z-10 overflow-hidden"
                    onClick={() => { setForm({ ...task }); setModal("edit"); }}
                    style={{
                      left: `${getPos(task.debut) * dayWidth}px`,
                      width: Math.max(`${getWidth(task.debut, task.fin) * dayWidth}`, zoom === "Jour" ? 35 : 20) + 'px',
                      backgroundColor: task.couleur + "44",
                      border: `1px solid ${task.couleur}`,
                    }}>
                    <div className="h-full absolute left-0 top-0 transition-all"
                      style={{ width: `${task.progression}%`, backgroundColor: task.couleur + "aa" }} />

                    {/* Shadow for text readability */}
                    <span className="text-[10px] font-bold relative z-10 truncate px-1" style={{ color: "white", textShadow: '0px 1px 3px rgba(0,0,0,0.8)' }}>
                      {zoom === "Jour" || getWidth(task.debut, task.fin) * dayWidth > 60 ? `${task.tache} ${task.progression}%` : ""}
                    </span>

                    {/* Fake Drag Handles */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 hover:bg-white/40 bg-white/10 cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute right-0 top-0 bottom-0 w-2 hover:bg-white/40 bg-white/10 cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modal && (
        <Modal title={modal === "add" ? "Nouvelle Tâche Gantt" : "Modifier Paramètres GANTT"} onClose={() => setModal(null)}>
          <Input label="Titre de la tâche" value={form.tache || ""} onChange={e => setForm({ ...form, tache: e.target.value })} />
          <Input label="Ressource Allouée" value={form.responsable || ""} onChange={e => setForm({ ...form, responsable: e.target.value })} />

          <div className="grid grid-cols-2 gap-3 mt-4">
            <Input label="Date Début" type="date" value={form.debut || ""} onChange={e => setForm({ ...form, debut: e.target.value })} />
            <Input label="Date Fin" type="date" value={form.fin || ""} onChange={e => setForm({ ...form, fin: e.target.value })} />
          </div>

          <div className="mt-4">
            <label className="block text-xs text-slate-400 mb-1 font-medium">Dépend de la tâche (Optionnel)</label>
            <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500" value={form.dependance || ""} onChange={e => setForm({ ...form, dependance: e.target.value })}>
              <option value="">-- Aucune Dépendance --</option>
              {data.filter(d => d.id !== form.id).map(d => <option key={d.id} value={d.id}>{d.tache}</option>)}
            </select>
          </div>

          <div className="mt-6 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs text-slate-300 font-bold uppercase tracking-wider">Avancement Actuel</label>
              <span className="font-black text-indigo-400 text-lg">{form.progression || 0}%</span>
            </div>
            <input type="range" min="0" max="100" value={form.progression || 0} onChange={e => setForm({ ...form, progression: e.target.value })} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'linear-gradient(to right, #6366f1, #a78bfa)' }} />
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-700 mt-6">
            <Btn onClick={save} size="md" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-12">Sauvegarder</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default Gantt;
