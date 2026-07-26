import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const Rapports = () => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Générateur de Rapports" subtitle="Préparez vos supports pour le comité de pilotage" action={<Btn onClick={() => alert("Génération d'un nouveau rapport en cours...")} size="md">Nouveau Rapport</Btn>} />
      <div className="app-surface2 border app-border rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
        <div className="text-5xl mb-4">📊</div>
        <h3 className="text-lg font-bold app-text mb-2">Sélectionnez les données à exporter</h3>
        <p className="text-sm app-text2 mb-6 max-w-md">Combinez Gantt, Avancement, Budget et Risques en un document PDF ou Excel aux couleurs de votre entreprise.</p>
        <div className="flex gap-4">
          <Btn className="bg-red-600 hover:bg-red-500 text-white">Export PDF</Btn>
          <Btn className="bg-emerald-600 hover:bg-emerald-500 text-white">Export Excel</Btn>
        </div>
      </div>
    </div>
  );
};

export default Rapports;
