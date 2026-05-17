import React, { useState } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Anchor, Waves, Droplets, Ship, ShieldCheck, Compass, Map, Activity, Wind, Database, TrendingUp } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OceanTechElite = ({ data = {}, setData }) => {
  const [selectedZone, setSelectedZone] = useState("Zone Nord");

  const marineData = [
    { name: '08:00', maree: 2.1, vent: 15, activite: 45 },
    { name: '10:00', maree: 2.4, vent: 18, activite: 52 },
    { name: '12:00', maree: 2.8, vent: 22, activite: 68 },
    { name: '14:00', maree: 2.5, vent: 25, activite: 80 },
    { name: '16:00', maree: 2.2, vent: 20, activite: 75 },
    { name: '18:00', maree: 1.8, vent: 16, activite: 58 },
  ];

  const oceanKpis = [
    { label: "Navires en Zone", value: "24", icon: <Ship className="text-blue-400" />, sub: "6 Pétroliers" },
    { label: "Qualité de l'Eau", value: "98.2%", icon: <Droplets className="text-cyan-400" />, sub: "Optimal" },
    { label: "Production Offshore", value: "12k bbl", icon: <Database className="text-amber-400" />, sub: "En hausse" },
    { label: "Sécurité Maritime", value: "99.9%", icon: <ShieldCheck className="text-emerald-400" />, sub: "0 Incidents" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <SectionHeader 
        title="OceanTech Strategic Hub" 
        subtitle="Économie Bleue, Ressources Marines & Offshore Management"
        icon={<Anchor className="w-8 h-8 text-blue-500" />}
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {oceanKpis.map((kpi, i) => (
          <Card key={i} className="p-4 border-l-4 border-l-blue-500 bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-800 rounded-lg">{kpi.icon}</div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{kpi.label}</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white">{kpi.value}</span>
              <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">{kpi.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ocean Telemetry Chart */}
        <Card className="lg:col-span-2 p-6 glass-card border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              Télémétrie Marine en Temps Réel
            </h3>
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-[10px] font-bold text-slate-400">Marée (m)</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  <span className="text-[10px] font-bold text-slate-400">Activité (%)</span>
               </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marineData}>
                <defs>
                  <linearGradient id="colorMaree" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActivite" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="maree" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMaree)" strokeWidth={3} />
                <Area type="monotone" dataKey="activite" stroke="#22d3ee" fillOpacity={1} fill="url(#colorActivite)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Marine Map & Compass */}
        <Card className="p-6 glass-card border-slate-800 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-500" />
              Cartographie Radar
            </h3>
            <Compass className="w-4 h-4 text-slate-500 animate-spin-slow" />
          </div>
          <div className="flex-1 bg-slate-800/50 rounded-2xl relative overflow-hidden border border-slate-700">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 to-transparent" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-blue-500/20 rounded-full animate-ping-slow" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-blue-500/30 rounded-full" />
             <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_#60a5fa]" />
             <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-[0_0_10px_#fbbf24]" />
             <div className="absolute top-1/2 left-1/2 w-1 h-20 bg-blue-500/40 origin-bottom animate-spin-slow" />
          </div>
          <Btn variant="primary" className="w-full mt-4 text-[10px] uppercase">Ouvrir Centre de Commande</Btn>
        </Card>
      </div>

      {/* Fishery & Ecology */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="p-6 glass-card border-slate-800">
           <h3 className="text-sm font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
             <Waves className="w-4 h-4 text-cyan-400" />
             Gestion Durable de la Pêche
           </h3>
           <div className="space-y-4">
              {[
                { zone: "Zone A - Saint-Louis", quota: 85, status: "Normal" },
                { zone: "Zone B - Kayar", quota: 42, status: "Alerte" },
                { zone: "Zone C - Dakar", quota: 98, status: "Saturé" },
              ].map((zone, i) => (
                <div key={i} className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-black text-white">{zone.zone}</span>
                      <Badge variant={zone.status === 'Normal' ? 'success' : zone.status === 'Alerte' ? 'warning' : 'error'} className="text-[8px] uppercase">{zone.status}</Badge>
                   </div>
                   <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${zone.quota > 90 ? 'bg-rose-500' : zone.quota > 70 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${zone.quota}%` }} />
                   </div>
                </div>
              ))}
           </div>
         </Card>

         <Card className="p-6 glass-card border-slate-800 bg-gradient-to-br from-slate-900 to-cyan-900/20">
            <h3 className="text-sm font-black uppercase tracking-tighter mb-6 flex items-center gap-2 text-cyan-400">
              <Droplets className="w-4 h-4" />
              Surveillance Écologique Marine
            </h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700 text-center">
                  <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Température Eau</p>
                  <p className="text-xl font-black text-white">24.5°C</p>
               </div>
               <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700 text-center">
                  <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Salinité</p>
                  <p className="text-xl font-black text-cyan-400">35.2 g/L</p>
               </div>
               <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700 text-center col-span-2">
                  <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Impact Plastique (YTD)</p>
                  <div className="flex items-center justify-center gap-2">
                     <TrendingUp className="w-3 h-3 text-rose-500" />
                     <p className="text-xl font-black text-rose-400">-12%</p>
                  </div>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
};

export default OceanTechElite;
