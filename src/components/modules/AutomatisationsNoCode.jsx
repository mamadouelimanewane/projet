import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const AutomatisationsNoCode = ({ data, setData }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Automatisations & Règles No-Code" subtitle="Éliminez le travail manuel en créant des règles logiques 'Si ceci, Alors cela'" action={<Btn size="md" className="bg-gradient-to-r from-fuchsia-600 to-indigo-600 shadow-lg shadow-fuchsia-600/30 text-white font-bold border-0">+ Nouvelle automatisation</Btn>} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 text-7xl opacity-5 group-hover:scale-110 transition-transform group-hover:text-indigo-400">🤖</div>
          <h3 className="text-3xl font-black text-white mb-1">24k</h3>
          <p className="text-sm text-slate-400 font-medium">Actions exécutées ce mois</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 text-7xl opacity-5 group-hover:scale-110 transition-transform group-hover:text-amber-400">⏱️</div>
          <h3 className="text-3xl font-black text-white mb-1">160h</h3>
          <p className="text-sm text-slate-400 font-medium">Temps humain économisé</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 text-7xl opacity-5 group-hover:scale-110 transition-transform group-hover:text-emerald-400">⚡</div>
          <h3 className="text-3xl font-black text-white mb-1">{data.filter(d => d.active).length}</h3>
          <p className="text-sm text-slate-400 font-medium">Règles actives (Globales)</p>
        </div>
      </div>

      <div className="space-y-4">
        {data.map(rule => (
          <div key={rule.id} className={`flex items-stretch border rounded-xl overflow-hidden transition-all shadow-md group ${rule.active ? "bg-slate-800/80 border-indigo-500/50 hover:border-indigo-400" : "bg-slate-900/40 border-slate-700 opacity-70 hover:opacity-100 disabled"}`}>
            {/* Toggle Column */}
            <div className="w-16 flex items-center justify-center border-r border-slate-700/50 bg-slate-900/40">
              <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${rule.active ? "bg-emerald-500" : "bg-slate-600"}`}
                onClick={() => setData(data.map(d => d.id === rule.id ? { ...d, active: !d.active } : d))}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${rule.active ? "translate-x-4 shadow-sm" : ""}`} />
              </div>
            </div>

            {/* Content Column */}
            <div className="flex-1 p-5 flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 min-w-0 w-full">
                <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  {rule.nom}
                  {!rule.active && <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300">DÉSACTIVÉ</span>}
                </h3>

                {/* Visual Rule Builder Block */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-medium">
                  <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded">QUAND</span>
                  <span className="text-indigo-400 font-bold border-b border-indigo-500/50 border-dashed pb-0.5 whitespace-nowrap">{rule.trigger}</span>

                  <span className="text-slate-500">+</span>
                  <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded">SI CONDITION</span>
                  <span className="text-fuchsia-400 font-bold border-b border-fuchsia-500/50 border-dashed pb-0.5 whitespace-nowrap">{rule.condition}</span>

                  <span className="text-slate-500 ml-2">👉</span>
                  <span className="bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded font-bold whitespace-nowrap">ALORS {rule.action}</span>
                </div>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Btn variant="ghost" size="sm" className="bg-slate-800 text-slate-300 hover:text-white">✏️ Éditer</Btn>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomatisationsNoCode;
