import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const CalendrierCentral = ({ data }) => {
  // Calculer quelques dates bidons autour d'aujourd'hui pour l'affichage factice
  const today = new Date();
  const d1 = new Date(today); d1.setDate(today.getDate() - 2);
  const d2 = new Date(today); d2.setDate(today.getDate() + 3);
  const d3 = new Date(today); d3.setDate(today.getDate() + 7);

  return (
    <div className="space-y-6">
      <SectionHeader title="Planning Master" subtitle="Vue consolidée des sprints, jalons et disponibilités" action={<Btn size="md">Synchroniser Outlook/GCal</Btn>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Événements" value="12" sub="Cette semaine" color="#6366f1" icon="📅" />
        <StatCard label="Surcharges" value="2" sub="Conflits détectés" color="#ef4444" icon="⚠" />
        <StatCard label="Livrables Visés" value="5" sub="Dans les 15 jours" color="#10b981" icon="📦" />
        <StatCard label="Capacité Équipe" value="78%" sub="Taux d'occupation" color="#f59e0b" icon="⚡" />
      </div>

      <div className="app-surface2 border app-border rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold app-text">Semaine Actuelle</h3>
          <div className="flex gap-2">
            <Btn variant="ghost">◀</Btn>
            <Btn variant="ghost">Aujourd'hui</Btn>
            <Btn variant="ghost">▶</Btn>
          </div>
        </div>

        {/* Fake Calendar Grid */}
        <div className="border app-border rounded-lg overflow-hidden flex flex-col">
          {/* Header */}
          <div className="grid grid-cols-5 app-surface border-b app-border">
            {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((j, i) => (
              <div key={j} className="p-3 text-center border-r app-border last:border-r-0">
                <p className="text-xs app-text2 uppercase tracking-widest">{j}</p>
                <p className="text-lg font-bold app-text mt-1">{today.getDate() - today.getDay() + 1 + i}</p>
              </div>
            ))}
          </div>
          {/* Body */}
          <div className="grid grid-cols-5 min-h-[300px]">
            <div className="border-r app-border p-2 space-y-2">
              <div className="bg-indigo-600/20 border border-indigo-500/50 rounded p-2 text-xs">
                <p className="font-bold text-indigo-400">Démo MVP (Refonte SI)</p>
                <p className="app-text2 mt-1">10:00 - Jean D.</p>
              </div>
            </div>
            <div className="border-r app-border p-2 space-y-2 relative">
              <div className="absolute top-0 left-0 right-0 h-full app-surface2 pointer-events-none" />
              <div className="relative z-10 bg-emerald-600/20 border border-emerald-500/50 rounded p-2 text-xs">
                <p className="font-bold text-emerald-400">Jalon: Validation Specs</p>
                <p className="app-text2 mt-1">14:00 - Marie C.</p>
              </div>
            </div>
            <div className="border-r app-border p-2 space-y-2">
            </div>
            <div className="border-r app-border p-2 space-y-2 bg-red-900/10">
              <div className="bg-red-600/20 border border-red-500/50 rounded p-2 text-xs relative">
                <p className="font-bold text-red-400">⚠ Goulot d'étranglement</p>
                <p className="app-text2 mt-1 mb-2">Paul M. est surbooké</p>
                <div className="h-1 bg-red-500/50 rounded-full" />
                <div className="h-1 bg-fuchsia-500/50 rounded-full mt-1" />
                <div className="h-1 bg-amber-500/50 rounded-full mt-1" />
              </div>
            </div>
            <div className="p-2 space-y-2">
              <div className="bg-fuchsia-600/20 border border-fuchsia-500/50 rounded p-2 text-xs">
                <p className="font-bold text-fuchsia-400">Fin Sprint 3</p>
                <p className="app-text2 mt-1">17:00 - Équipe DevOps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendrierCentral;
