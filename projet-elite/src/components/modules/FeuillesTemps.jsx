import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const FeuillesTemps = ({ data, setData }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Feuilles de Temps" subtitle="Suivi des heures passées par l'équipe" action={<Btn size="md">+ Saisie Heures</Btn>} />
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700">
            {["Date", "Membre", "Tâche", "Heures", "Type"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">{h}</th>)}
          </tr></thead>
          <tbody>
            {data.map(t => (
              <tr key={t.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3 text-sm text-slate-400">{t.date}</td>
                <td className="px-4 py-3 text-sm font-bold text-white">{t.membre}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{t.tache}</td>
                <td className="px-4 py-3 text-sm font-bold text-indigo-400">{t.heures}h</td>
                <td className="px-4 py-3"><Badge value={t.type} map={{ "Facturable": "#10b981", "Non facturable": "#94a3b8" }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default FeuillesTemps;
