import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const DemandesModeles = ({ data, setData }) => {
  const addDemande = () => {
    const newDemande = {
      id: Date.now(),
      titre: "Nouvelle Demande Projet " + Math.floor(Math.random()*100),
      demandeur: "Mamadou W.",
      type: "IT / Digital",
      date: new Date().toISOString().split("T")[0],
      statut: "Nouveau"
    };
    setData([newDemande, ...(data || [])]);
  };
  return (
    <div className="space-y-6">
      <SectionHeader title="Intake & Modèles (PMO)" subtitle="Approuvez, qualifiez et transformez les demandes en projets via des Modèles" action={<Btn onClick={addDemande} size="md" className="bg-indigo-600 shadow-indigo-600/30 shadow-lg">Créer Formulaire Public</Btn>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Nouvelles Demandes" value="12" sub="En attente de tri" color="#f59e0b" icon="📥" />
        <StatCard label="Approuvées" value="45" sub="Ce trimestre" color="#10b981" icon="✅" />
        <StatCard label="Rejetées" value="8" sub="Hors budget/stratégie" color="#ef4444" icon="❌" />
        <StatCard label="Modèles Actifs" value="14" sub="Blueprints PMO" color="#6366f1" icon="📋" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden shadow-xl">
          <div className="px-5 py-4 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">Triage des Demandes (Intake Queue)</h3>
            <Btn variant="ghost" size="sm">Filtrer</Btn>
          </div>
          <div className="overflow-x-auto -mx-1">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left text-xs font-bold text-slate-400 uppercase">
                <th className="px-4 py-3">Titre de la demande</th>
                <th className="px-4 py-3">Demandeur</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 group transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-bold text-slate-200">{d.titre}</p>
                    <p className="text-[10px] text-slate-500 mt-1">Échéance: {d.date}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">{d.demandeur}</td>
                  <td className="px-4 py-3 text-xs text-indigo-300"><span className="bg-indigo-900/40 px-2 py-1 rounded">{d.type}</span></td>
                  <td className="px-4 py-3"><Badge value={d.statut} map={{ "Nouveau": "#6366f1", "En revue": "#f59e0b", "Approuvé": "#10b981" }} /></td>
                  <td className="px-4 py-3 text-right">
                    <Btn size="sm" className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-600 hover:text-white px-2 py-1 text-xs">Approuver</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 shadow-xl flex flex-col">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2"><span className="text-indigo-400">📋</span> Centre de Modèles (Blueprints)</h3>
          <p className="text-xs text-slate-400 mb-4">Standardisez l'exécution : transformez une demande approuvée en projet grâce à un modèle PMO préconfiguré.</p>

          <div className="space-y-3 flex-1">
            {["🚀 Déploiement Logiciel IT", "📣 Lancement de Campagne", "🏢 Ouverture de Boutique", "🛡️ Audit de Conformité"].map((tpl, i) => (
              <div key={i} className="border border-slate-700 rounded-lg p-3 hover:border-indigo-500/50 cursor-pointer transition-colors bg-slate-900/40 flex items-center justify-between group">
                <div>
                  <p className="text-sm font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">{tpl}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Inclus: 12 tâches, 4 jalons</p>
                </div>
                <Btn variant="ghost" size="sm" className="opacity-50 group-hover:opacity-100 transition-opacity">→</Btn>
              </div>
            ))}
          </div>
          <Btn onClick={() => alert("Ouverture de l'éditeur de modèles PMO...")} className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-600 border-dashed">+ Créer un Modèle</Btn>
        </div>
      </div>
    </div>
  );
};

export default DemandesModeles;
