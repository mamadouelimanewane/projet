import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const StrategieOKR = ({ data }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Alignement Stratégique (OKRs)" subtitle="Connectez l'exécution de vos projets à la vision globale de l'entreprise" action={<Btn size="md">+ Nouvel Objectif</Btn>} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.okrs.map(okr => (
          <div key={okr.id} className="app-surface2 border app-border rounded-xl p-6 relative overflow-hidden group hover:border-indigo-500 transition-all">
            <div className={`absolute top-0 right-0 w-24 h-24 blur-2xl -mt-6 -mr-6 transition-all group-hover:opacity-100 opacity-30 ${okr.progression >= 50 ? 'bg-indigo-600' : 'bg-fuchsia-600'}`} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <Badge value={okr.type} map={{ "Stratégique": "#6366f1", "Opérationnel": "#f59e0b", "Innovation": "#ec4899" }} />
                <Badge value={okr.statut} map={{ "En bonne voie": "#10b981", "En cours": "#f59e0b", "En retard": "#ef4444" }} />
              </div>

              <h3 className="text-xl font-black app-text mb-2 leading-tight">{okr.objectif}</h3>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="app-text2 font-bold uppercase tracking-wider">Progression Clé</span>
                  <span className="text-indigo-400 font-black">{okr.progression}%</span>
                </div>
                <ProgressBar value={okr.progression} color={okr.progression >= 50 ? "#6366f1" : "#ec4899"} />
              </div>

              <div className="mt-5 pt-4 border-t app-border">
                <p className="text-[10px] app-text3 uppercase font-black mb-2 tracking-widest">Projets liés</p>
                <div className="flex flex-wrap gap-2">
                  {okr.projets.map(p => (
                    <span key={p} className="text-xs app-surface3 border app-border2 px-2 py-1 rounded-md app-text">🔗 {p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategieOKR;
