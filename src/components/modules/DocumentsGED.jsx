import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const DocumentsGED = ({ data }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Gestion Documentaire Intelligente" subtitle="Centralisez et analysez vos documents projets" action={<Btn size="md">+ Uploader</Btn>} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(d => (
          <div key={d.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex gap-3 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl font-black">📄</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate" title={d.nom}>{d.nom}</p>
              <p className="text-xs text-slate-500">{d.projet}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300">{d.taille}</span>
                <span className="text-[10px] text-slate-500">{d.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default DocumentsGED;
