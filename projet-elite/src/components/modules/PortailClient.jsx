import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const PortailClient = ({ data }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Portail Client (Lecture Seule)" subtitle="Vue simplifiée pour vos commanditaires ou clients" action={<Btn size="md">Partager le lien</Btn>} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Projets en cours" value={data.projets.filter(p => p.statut === "En cours").length} color="#6366f1" icon="◈" />
        <StatCard label="Jalons validés" value={data.jalons.filter(j => j.statut === "Atteint").length} color="#10b981" icon="◆" />
        <StatCard label="Prochaine livraison" value="15 Mars" color="#f59e0b" icon="⏱" />
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">État d'avancement des Projets</h3>
        <div className="space-y-4">
          {data.projets.filter(p => p.statut !== "Terminé").map(p => (
            <div key={p.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-white">{p.nom}</span>
                <span className="text-sm font-bold text-indigo-400">{p.avancement}%</span>
              </div>
              <ProgressBar value={p.avancement} color="#6366f1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default PortailClient;
