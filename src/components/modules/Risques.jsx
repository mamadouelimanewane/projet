import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Risques = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const save = () => {
    const f = { ...form, gravite: Number(form.gravite), probabilite: Number(form.probabilite) };
    if (modal === "add") setData([...data, { ...f, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? f : d));
    setModal(null);
  };

  const getScoreColor = (s) => s >= 15 ? "#ef4444" : s >= 8 ? "#f59e0b" : "#10b981";
  const getScoreLabel = (s) => s >= 15 ? "Critique" : s >= 8 ? "Élevé" : "Faible";

  const matrixData = [];
  for (let g = 1; g <= 5; g++) {
    for (let p = 1; p <= 5; p++) {
      const score = g * p;
      matrixData.push({ g, p, score, color: getScoreColor(score) });
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des Risques" subtitle="Évaluez et atténuez les risques de votre projet"
        action={<Btn onClick={() => { setForm({ risque: "", gravite: 3, probabilite: 3, attenuation: "", statut: "Actif" }); setModal("add"); }} size="md">+ Risque</Btn>} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-bold app-text mb-4 uppercase tracking-wider">Matrice des Risques</h3>
          <div className="app-surface2 border app-border rounded-xl p-4">
            <div className="grid gap-0.5" style={{ gridTemplateColumns: "auto repeat(5, 1fr)" }}>
              <div className="flex items-end justify-center pb-1 pr-2 text-xs app-text3">Grav.</div>
              {[1, 2, 3, 4, 5].map(p => <div key={p} className="text-center text-xs app-text3 pb-1">P{p}</div>)}
              {[5, 4, 3, 2, 1].map(g => (
                <>
                  <div className="flex items-center justify-end pr-2 text-xs app-text3">G{g}</div>
                  {[1, 2, 3, 4, 5].map(p => {
                    const score = g * p;
                    const risky = data.filter(r => r.gravite === g && r.probabilite === p);
                    return (
                      <div key={p} className="aspect-square rounded flex items-center justify-center text-xs font-bold cursor-default transition-all hover:scale-110"
                        title={risky.map(r => r.risque).join(", ")}
                        style={{ backgroundColor: getScoreColor(score) + "33", color: getScoreColor(score), border: risky.length ? `2px solid ${getScoreColor(score)}` : "1px solid transparent" }}>
                        {risky.length > 0 ? risky.length : score}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
            <div className="flex gap-4 mt-3 justify-center text-xs">
              {[["#10b981", "Faible <8"], ["#f59e0b", "Élevé 8-15"], ["#ef4444", "Critique >15"]].map(([c, l]) => (
                <div key={l} className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} /><span className="app-text2">{l}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-bold app-text uppercase tracking-wider">Risques par Score</h3>
          {[...data].sort((a, b) => b.gravite * b.probabilite - a.gravite * a.probabilite).map(r => {
            const score = r.gravite * r.probabilite;
            return (
              <div key={r.id} className="app-surface2 border app-border rounded-xl p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black flex-shrink-0"
                  style={{ backgroundColor: getScoreColor(score) + "22", color: getScoreColor(score) }}>{score}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm app-text font-medium truncate">{r.risque}</p>
                  <p className="text-xs app-text3">G:{r.gravite} × P:{r.probabilite} = <span style={{ color: getScoreColor(score) }}>{getScoreLabel(score)}</span></p>
                </div>
                <div className="flex gap-1">
                  <Btn onClick={() => { setForm({ ...r }); setModal("edit"); }} variant="ghost">✎</Btn>
                  <Btn onClick={() => setData(data.filter(d => d.id !== r.id))} variant="danger">✕</Btn>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouveau Risque" : "Modifier Risque"} onClose={() => setModal(null)}>
          <Input label="Risque" value={form.risque || ""} onChange={e => setForm({ ...form, risque: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs app-text2 mb-1 font-medium">Gravité (1-5) : <strong className="app-text">{form.gravite}</strong></label>
              <input type="range" min="1" max="5" value={form.gravite || 3} onChange={e => setForm({ ...form, gravite: Number(e.target.value) })} className="w-full accent-indigo-500" />
            </div>
            <div>
              <label className="block text-xs app-text2 mb-1 font-medium">Probabilité (1-5) : <strong className="app-text">{form.probabilite}</strong></label>
              <input type="range" min="1" max="5" value={form.probabilite || 3} onChange={e => setForm({ ...form, probabilite: Number(e.target.value) })} className="w-full accent-indigo-500" />
            </div>
          </div>
          <div className="p-3 rounded-lg text-center font-bold" style={{ backgroundColor: getScoreColor(form.gravite * form.probabilite) + "22", color: getScoreColor(form.gravite * form.probabilite) }}>
            Score : {form.gravite * form.probabilite}/25 — {getScoreLabel(form.gravite * form.probabilite)}
          </div>
          <Textarea label="Mesures d'atténuation" value={form.attenuation || ""} onChange={e => setForm({ ...form, attenuation: e.target.value })} />
          <Select label="Statut" value={form.statut || "Actif"} options={["Actif", "Atténué", "Clôturé"]} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default Risques;
