import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Jalons = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const save = () => {
    if (modal === "add") setData([...data, { ...form, id: Date.now() }]);
    else setData(data.map(d => d.id === form.id ? form : d));
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des Jalons" subtitle="Suivez vos étapes clés et leur progression"
        action={<Btn onClick={() => { setForm({ jalon: "", date: "", responsable: "", statut: "Planifié", notes: "" }); setModal("add"); }} size="md">+ Jalon</Btn>} />
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 app-surface3" />
        <div className="space-y-4">
          {data.sort((a, b) => new Date(a.date) - new Date(b.date)).map((j, i) => {
            const isDone = j.statut === "Atteint";
            const color = isDone ? "#10b981" : j.statut === "En cours" ? "#f59e0b" : "#6366f1";
            return (
              <div key={j.id} className="relative flex items-start gap-6 pl-16">
                <div className="absolute left-6 w-4 h-4 rounded-full border-2 -translate-y-0.5 z-10"
                  style={{ backgroundColor: color + "33", borderColor: color }} />
                <div className="flex-1 app-surface2 border app-border rounded-xl p-4 hover:border-indigo-500/40 transition-all"
                  style={{ borderLeftColor: color, borderLeftWidth: 3 }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold app-text">{j.jalon}</h3>
                      <p className="text-xs app-text3 mt-0.5">{j.date} · {j.responsable}</p>
                      {j.notes && <p className="text-xs app-text2 mt-1 italic">{j.notes}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge value={j.statut} />
                      <Btn onClick={() => { setForm({ ...j }); setModal("edit"); }} variant="ghost">✎</Btn>
                      <Btn onClick={() => setData(data.filter(d => d.id !== j.id))} variant="danger">✕</Btn>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouveau Jalon" : "Modifier Jalon"} onClose={() => setModal(null)}>
          <Input label="Jalon" value={form.jalon || ""} onChange={e => setForm({ ...form, jalon: e.target.value })} />
          <Input label="Date" type="date" value={form.date || ""} onChange={e => setForm({ ...form, date: e.target.value })} />
          <Input label="Responsable" value={form.responsable || ""} onChange={e => setForm({ ...form, responsable: e.target.value })} />
          <Select label="Statut" value={form.statut || "Planifié"} options={["Planifié", "En cours", "Atteint", "En retard"]} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <Textarea label="Notes" value={form.notes || ""} onChange={e => setForm({ ...form, notes: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default Jalons;
