import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Agile = ({ data, setData }) => {
  const [selectedSprint, setSelectedSprint] = useState(data[data.length - 1]?.id);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const sprint = data.find(s => s.id === selectedSprint);

  const totalPoints = sprint?.stories.reduce((s, st) => s + st.points, 0) || 0;
  const donePoints = sprint?.stories.filter(st => st.statut === "Terminé").reduce((s, st) => s + st.points, 0) || 0;

  const velocityData = data.map(s => ({ name: s.nom, Planifié: s.stories.reduce((x, st) => x + st.points, 0), Réalisé: s.stories.filter(st => st.statut === "Terminé").reduce((x, st) => x + st.points, 0) }));

  const burndownData = sprint ? sprint.stories.map((st, i) => ({
    sprint: `Story ${i + 1}`, restant: sprint.stories.slice(i).reduce((s, x) => s + x.points, 0)
  })) : [];

  const updateStory = (storyId, statut) => {
    setData(data.map(s => s.id === selectedSprint ? { ...s, stories: s.stories.map(st => st.id === storyId ? { ...st, statut } : st) } : s));
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi Agile — Sprints" subtitle="Pilotez vos sprints avec précision" />
      <div className="flex gap-2 flex-wrap">
        {data.map(s => (
          <button key={s.id} onClick={() => setSelectedSprint(s.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${selectedSprint === s.id ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-500"}`}>
            {s.nom} <Badge value={s.statut} />
          </button>
        ))}
        <Btn onClick={() => { setForm({ nom: `Sprint ${data.length + 1}`, debut: "", fin: "", objectif: "", statut: "Planifié", vitesse: 0, stories: [] }); setModal("sprint"); }} variant="ghost">+ Sprint</Btn>
      </div>
      {sprint && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Points Total" value={totalPoints} color="#6366f1" icon="Σ" />
            <StatCard label="Complétés" value={donePoints} color="#10b981" icon="✓" />
            <StatCard label="Restants" value={totalPoints - donePoints} color="#f59e0b" icon="◉" />
            <StatCard label="Vélocité" value={`${totalPoints > 0 ? Math.round((donePoints / totalPoints) * 100) : 0}%`} color="#8b5cf6" icon="↻" />
          </div>
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-bold text-white">{sprint.nom} — {sprint.objectif}</h3>
              <span className="text-xs text-slate-400">{sprint.debut} → {sprint.fin}</span>
            </div>
            <ProgressBar value={Math.round((donePoints / Math.max(totalPoints, 1)) * 100)} color="#6366f1" />
            <div className="mt-4 space-y-2">
              {sprint.stories.map(st => (
                <div key={st.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/50 border border-slate-600/30 hover:border-slate-500 transition-all">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: "#6366f122", color: "#a78bfa" }}>{st.points}</div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-200 font-medium">{st.titre}</p>
                    <p className="text-xs text-slate-500">{st.assignee}</p>
                  </div>
                  <select value={st.statut} onChange={e => updateStory(st.id, e.target.value)}
                    className="bg-slate-800 border border-slate-600 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none">
                    {["À faire", "En cours", "Terminé"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Vélocité par Sprint</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={velocityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} />
            <Legend />
            <Bar dataKey="Planifié" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Réalisé" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default Agile;
