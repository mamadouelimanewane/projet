import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Ressources = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const save = () => {
    const f = { ...form, disponibilite: Number(form.disponibilite), charge: Number(form.charge) };
    if (modal === "add") setData([...data, { ...f, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? f : d));
    setModal(null);
  };

  const allocationData = data.map(r => ({ name: r.membre.split(" ")[0], Disponible: r.disponibilite, Chargé: r.charge }));
  const parSpecialite = Object.entries(data.reduce((acc, r) => { acc[r.specialite] = (acc[r.specialite] || 0) + 1; return acc; }, {})).map(([s, v]) => ({ name: s, value: v }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Allocation des Ressources" subtitle="Optimisez l'utilisation de vos équipes"
        action={<Btn onClick={() => { setForm({ membre: "", role: "", projet: "", disponibilite: 100, charge: 0, debut: "", fin: "", specialite: "" }); setModal("add"); }} size="md">+ Ressource</Btn>} />
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Membres Équipe" value={data.length} color="#6366f1" icon="⚙" />
        <StatCard label="Charge Moyenne" value={`${Math.round(data.reduce((s, r) => s + r.charge, 0) / data.length)}%`} color={data.reduce((s, r) => s + r.charge, 0) / data.length > 85 ? "#ef4444" : "#10b981"} icon="◉" />
        <StatCard label="Sur-chargés" value={data.filter(r => r.charge > r.disponibilite * 0.9).length} color="#f59e0b" icon="⚠" sub="charge > 90% dispo" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Taux de Charge par Membre</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={allocationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} width={60} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} formatter={v => `${v}%`} />
              <Legend />
              <Bar dataKey="Disponible" fill="#6366f133" stroke="#6366f1" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Chargé" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Par Spécialité</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={parSpecialite} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name} (${value})`}>
                {parSpecialite.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="space-y-3">
        {data.map(r => {
          const taux = Math.round((r.charge / r.disponibilite) * 100);
          const surcharge = r.charge > r.disponibilite;
          return (
            <div key={r.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex items-center gap-4 hover:border-indigo-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-black"
                style={{ backgroundColor: "#6366f122", color: "#a78bfa" }}>
                {r.membre.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <span className="text-sm font-bold text-white">{r.membre}</span>
                    <span className="text-xs text-slate-500 ml-2">{r.role} · {r.specialite}</span>
                  </div>
                  <div className="flex gap-2">
                    <Btn onClick={() => { setForm({ ...r }); setModal("edit"); }} variant="ghost">✎</Btn>
                    <Btn onClick={() => setData(data.filter(d => d.id !== r.id))} variant="danger">✕</Btn>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-1.5">{r.projet} · {r.debut} → {r.fin}</p>
                <div className="flex items-center gap-3">
                  <ProgressBar value={r.charge} max={r.disponibilite} color={surcharge ? "#ef4444" : taux > 80 ? "#f59e0b" : "#10b981"} />
                  <span className="text-xs font-bold w-20 flex-shrink-0" style={{ color: surcharge ? "#ef4444" : "#94a3b8" }}>{r.charge}% / {r.disponibilite}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouvelle Ressource" : "Modifier Ressource"} onClose={() => setModal(null)}>
          <Input label="Nom" value={form.membre || ""} onChange={e => setForm({ ...form, membre: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Rôle" value={form.role || ""} onChange={e => setForm({ ...form, role: e.target.value })} />
            <Input label="Spécialité" value={form.specialite || ""} onChange={e => setForm({ ...form, specialite: e.target.value })} />
          </div>
          <Input label="Projet" value={form.projet || ""} onChange={e => setForm({ ...form, projet: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">Disponibilité : {form.disponibilite}%</label>
              <input type="range" min="0" max="100" value={form.disponibilite || 100} onChange={e => setForm({ ...form, disponibilite: Number(e.target.value) })} className="w-full accent-indigo-500" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">Charge actuelle : {form.charge}%</label>
              <input type="range" min="0" max="120" value={form.charge || 0} onChange={e => setForm({ ...form, charge: Number(e.target.value) })} className="w-full accent-indigo-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Début" type="date" value={form.debut || ""} onChange={e => setForm({ ...form, debut: e.target.value })} />
            <Input label="Fin" type="date" value={form.fin || ""} onChange={e => setForm({ ...form, fin: e.target.value })} />
          </div>
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default Ressources;
