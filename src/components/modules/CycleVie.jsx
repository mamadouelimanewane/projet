import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const CycleVie = ({ data, setData }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Cycle de Vie du Projet" subtitle="Suivez les étapes cruciales de la méthodologie projet" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {data.map((step, i) => (
          <div key={step.id} className="relative">
            <div className={`p-4 rounded-xl border transition-all h-full flex flex-col ${step.statut === "Terminé" ? "bg-emerald-500/10 border-emerald-500/50" : step.statut === "En cours" ? "bg-indigo-500/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10 scale-105 z-10" : "app-surface2 app-border opacity-60"}`}>
              <div className="flex justify-between items-start mb-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step.statut === "Terminé" ? "bg-emerald-500 text-white" : "bg-indigo-600 text-white"}`}>{i + 1}</span>
                <Badge value={step.statut} map={{ "Terminé": "#10b981", "En cours": "#6366f1", "A venir": "#475569" }} />
              </div>
              <h3 className="text-sm font-bold app-text mb-2">{step.phase}</h3>
              <p className="text-xs app-text2 mb-3 flex-1">{step.description}</p>
              <div className="space-y-2 mt-auto">
                <p className="text-[10px] app-text3 uppercase font-black">Livrable clé</p>
                <div className="text-xs app-text app-surface3 p-2 rounded">{step.livrable}</div>
                <ProgressBar value={step.progression} color={step.statut === "Terminé" ? "#10b981" : "#6366f1"} />
              </div>
            </div>
            {i < data.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-2 app-text3 translate-x-1/2 z-0">▶</div>
            )}
          </div>
        ))}
      </div>
      <div className="app-surface2 border app-border rounded-xl p-6">
        <h3 className="text-base font-bold app-text mb-4">Guide d'Assistance Méthodologique</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Étape Actuelle : Planification</h4>
            <div className="app-surface3 rounded-lg p-4 border-l-2 border-indigo-500">
              <p className="text-sm app-text italic">"Vous êtes dans la phase critique où vous devez aligner les ressources avec les objectifs de temps."</p>
            </div>
            <ul className="space-y-2 ml-2">
              {["Valider le budget prévisionnel", "Assigner les chefs de lot", "Identifier les risques majeurs"].map(item => (
                <li key={item} className="text-xs app-text2 flex items-center gap-2">
                  <span className="text-indigo-500">○</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-indigo-600/10 rounded-xl p-5 border border-indigo-500/20 text-center flex flex-col justify-center">
            <p className="text-2xl mb-2">💡</p>
            <p className="text-sm font-bold app-text mb-1">Besoin d'aide ?</p>
            <p className="text-xs app-text2">Consultez l'Assistant Élite pour générer un template de plan de management projet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CycleVie;
