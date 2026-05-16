import React, { useState } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Activity, Heart, Users, ShieldAlert, FileText, Pill, Microbe, BarChart } from "lucide-react";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const HealthElite = ({ data = {}, setData }) => {
  const healthKpis = [
    { label: "Occupation Lits", value: "88%", icon: <Users className="text-blue-400" />, trend: "stable" },
    { label: "Taux de Guérison", value: "96.4%", icon: <Heart className="text-rose-400" />, trend: "up" },
    { label: "Temps Attente", value: "14 min", icon: <Activity className="text-amber-400" />, trend: "down" },
    { label: "Stock Médicaments", value: "Optimal", icon: <Pill className="text-emerald-400" />, trend: "stable" },
  ];

  const departmentLoad = [
    { name: 'Urgences', load: 92, color: '#ef4444' },
    { name: 'Cardio', load: 75, color: '#ec4899' },
    { name: 'Pédiatrie', load: 60, color: '#3b82f6' },
    { name: 'Chirurgie', load: 85, color: '#8b5cf6' },
    { name: 'Radiologie', load: 45, color: '#10b981' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <SectionHeader 
        title="Medical Core Elite™" 
        subtitle="Gestion Hospitalière & MedTech Hub"
        icon={<Activity className="w-8 h-8 text-rose-500" />}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {healthKpis.map((kpi, i) => (
          <Card key={i} className="p-4 border-l-4 border-l-rose-500 bg-slate-900/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-800 rounded-lg">{kpi.icon}</div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{kpi.label}</span>
            </div>
            <span className="text-2xl font-black text-white">{kpi.value}</span>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 glass-card border-slate-800">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={departmentLoad} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Bar dataKey="load" radius={[0, 4, 4, 0]} barSize={20}>
                  {departmentLoad.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Bar>
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6 glass-card border-slate-800">
          <h3 className="text-sm font-black uppercase text-rose-400 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Alertes
          </h3>
          <div className="space-y-4">
             <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                <p className="text-[10px] font-black text-rose-400 uppercase">Bloc #03</p>
                <p className="text-[11px] text-slate-300">Nettoyage stérile requis.</p>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HealthElite;
