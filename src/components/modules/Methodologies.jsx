import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Methodologies = ({ data, setData }) => {
  const currentMethode = data.methode || "Hybride";

  return (
    <div className="space-y-6">
      <SectionHeader title="Configuration Méthodologique" subtitle="Adaptez l'interface et les outils à votre mode de gestion" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {METHODOLOGIES.map(m => (
          <div key={m.id} onClick={() => setData({ ...data, methode: m.label })}
            className={`p-5 rounded-2xl border transition-all cursor-pointer group ${currentMethode === m.label ? "bg-indigo-600 border-indigo-400 shadow-xl scale-[1.02]" : "app-surface2 app-border hover:border-slate-500"}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                {m.icons.map((ic, i) => <span key={i} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">{ic}</span>)}
              </div>
              {currentMethode === m.label && <span className="text-[10px] font-black bg-white text-indigo-600 px-2 py-0.5 rounded-full uppercase">Actif</span>}
            </div>
            <h3 className="text-lg font-black text-white mb-2">{m.label}</h3>
            <p className="text-xs app-text group-hover:text-white transition-colors">{m.desc}</p>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-white/60 uppercase font-black">Modules clés</span>
              <p className="text-[10px] text-white/80">{m.label === "Agile / Scrum" ? "Sprint, Kanban, Vélocité" : m.label === "Waterfall (Cascade)" ? "Gantt, Jalons, Budget" : "Tous les outils"}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="app-surface2 border app-border rounded-xl p-6 text-center">
        <p className="text-sm app-text2 mb-2">Méthodologie sélectionnée : <strong className="text-white">{currentMethode}</strong></p>
        <p className="text-xs app-text3 italic max-w-md mx-auto">"La sélection d'une méthodologie personnalise automatiquement vos indicateurs de performance et les vues prioritaires du tableau de bord."</p>
      </div>
    </div>
  );
};


export default Methodologies;
