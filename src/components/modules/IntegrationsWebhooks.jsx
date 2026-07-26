import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";
import useStore from "../../store/useStore";

const IntegrationsWebhooks = ({ data, setData }) => {
  const { updateData } = useStore();

  const addWebhook = () => {
    const newWebhook = { 
      id: Date.now(), 
      nom: "Nouveau Webhook API", 
      url: `https://api.votre-service.com/hooks/${Math.floor(Math.random()*10000)}`, 
      event: "tache.completed", 
      statut: "Connecté" 
    };
    updateData("webhooks", [newWebhook, ...(data || [])]);
  };
  return (
    <div className="space-y-6">
      <SectionHeader title="Intégrations & Webhooks" subtitle="Connectez ProjetÉlite au reste de votre écosystème logiciel via API" action={<Btn onClick={addWebhook} size="md" className="bg-indigo-600">+ Nouveau Webhook</Btn>} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { name: "Slack", icon: "💬", desc: "Notification sur channel dédié", active: true },
          { name: "Microsoft Teams", icon: "👥", desc: "Alertes financières directes", active: true },
          { name: "Jira", icon: "🎫", desc: "Synchronisation bi-directionnelle", active: true },
          { name: "GitLab / GitHub", icon: "🐙", desc: "Lien entre commits et tâches", active: false },
          { name: "Salesforce", icon: "☁", desc: "Création auto de portail client", active: false },
        ].map(i => (
          <div key={i.name} className={`border rounded-xl p-5 flex items-start gap-4 transition-all hover:app-surface2 ${i.active ? "app-surface2 border-indigo-500/50" : "app-surface app-border"}`}>
            <div className={`text-3xl ${i.active ? "" : "grayscale opacity-40"}`}>{i.icon}</div>
            <div className="flex-1">
              <h3 className="text-sm font-bold app-text">{i.name}</h3>
              <p className="text-xs app-text2 mt-1 line-clamp-2">{i.desc}</p>
              <div className="mt-4">
                {i.active ? (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">✔ CONNECTÉ</span>
                ) : (
                  <Btn variant="ghost" size="sm" className="text-[10px] py-1">Connecter</Btn>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="app-surface2 border app-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b app-border flex justify-between items-center app-surface">
          <h3 className="text-sm font-bold app-text">Endpoints Webhooks Configurés</h3>
          <span className="text-xs app-text2">{data.length} actifs</span>
        </div>
        <div className="overflow-x-auto -mx-1">
        <table className="w-full">
          <thead><tr className="border-b app-border">
            {["Service / Nom", "URL Endpoint", "Événement Déclencheur", "Statut"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold app-text2 uppercase">{h}</th>)}
          </tr></thead>
          <tbody>
            {data.map(w => {
              const color = w.statut === "Connecté" ? "#10b981" : w.statut === "Erreur" ? "#ef4444" : "#f59e0b";
              return (
                <tr key={w.id} className="border-b app-border hover:app-surface3">
                  <td className="px-4 py-3 text-sm font-bold app-text">{w.nom}</td>
                  <td className="px-4 py-3 text-xs text-indigo-300 font-mono truncate max-w-[200px]">{w.url}</td>
                  <td className="px-4 py-3 text-xs app-text"><span className="app-surface3 px-2 py-1 rounded app-text">{w.event}</span></td>
                  <td className="px-4 py-3"><Badge value={w.statut} map={{ "Connecté": "#10b981", "Erreur": "#ef4444", "En pause": "#f59e0b" }} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
</div>
      </div>
    </div>
  );
};

export default IntegrationsWebhooks;
