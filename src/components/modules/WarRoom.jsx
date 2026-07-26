import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const WarRoom = () => {
  return (
    <div className="space-y-6">
      <SectionHeader title="War Room: Metaverse Collaboration" subtitle="Espace virtuel de crise et coordination en temps réel" action={<Btn size="md" className="bg-red-600 hover:bg-red-500 text-white animate-pulse">Rejoindre le Huddle (Live)</Btn>} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 app-surface border app-border rounded-xl overflow-hidden relative min-h-[400px]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 sepia" />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-4xl">🌐</p>
            <p className="text-sm font-bold mt-2 tracking-widest app-text">ESPACE DE COLLABORATION 3D</p>
            <p className="text-xs app-text3 mt-1">4 membres actuellement en ligne</p>
          </div>
          {/* Fake cursors/avatars */}
          <div className="absolute top-[20%] left-[30%] bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg shadow-indigo-500/50">Jean D. (Lead)</div>
          <div className="absolute top-[50%] left-[60%] bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg shadow-emerald-500/50">Marie C.</div>
          <div className="absolute top-[70%] left-[20%] bg-fuchsia-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg shadow-fuchsia-500/50">Client Beta</div>
        </div>
        <div className="app-surface2 border app-border rounded-xl p-4 flex flex-col">
          <h3 className="text-sm font-bold app-text mb-4 uppercase tracking-wider">Activité Récente (Live)</h3>
          <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar">
            <div className="text-xs app-text2"><span className="text-emerald-400 font-bold">Marie C.</span> a modifié "Architecture système" - il y a 2m</div>
            <div className="text-xs app-text2"><span className="text-indigo-400 font-bold">Jean D.</span> a validé un jalon - il y a 5m</div>
            <div className="text-xs app-text2"><span className="text-fuchsia-400 font-bold">Système</span> : Dépassement budgétaire détecté - il y a 10m</div>
          </div>
          <div className="mt-4 pt-4 border-t app-border">
            <input className="w-full app-surface border app-border rounded-lg px-3 py-2 text-sm app-text" placeholder="Message rapide à l'équipe..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;
