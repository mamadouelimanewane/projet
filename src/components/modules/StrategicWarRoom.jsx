import React, { useState } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { ShieldAlert, Zap, Globe, Cpu, Target, TrendingUp, AlertTriangle, ShieldCheck, Search, Activity, Layers } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

const StrategicWarRoom = ({ data = {}, setData }) => {
  const [simulationActive, setSimulationActive] = useState(false);

  const marketVolatility = [
    { name: '08:00', risk: 10, opportunity: 20 },
    { name: '10:00', risk: 25, opportunity: 40 },
    { name: '12:00', risk: 45, opportunity: 30 },
    { name: '14:00', risk: 30, opportunity: 60 },
    { name: '16:00', risk: 20, opportunity: 80 },
  ];

  const strategicScore = [
    { subject: 'Finance', A: 120, fullMark: 150 },
    { subject: 'Opérations', A: 98, fullMark: 150 },
    { subject: 'Risques', A: 86, fullMark: 150 },
    { subject: 'Gouvernance', A: 99, fullMark: 150 },
    { subject: 'Innovation', A: 130, fullMark: 150 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-700">
      <SectionHeader 
        title="Strategic War Room Elite™" 
        subtitle="Centre de Commandement Haute Performance & Intelligence Prédictive"
        icon={<ShieldAlert className="w-8 h-8 text-amber-500" />}
      />

      {/* Global Command Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Indice de Succès", value: "94.2%", icon: <Target className="text-emerald-400" /> },
          { label: "Alerte de Risques", value: "2", icon: <AlertTriangle className="text-rose-500" /> },
          { label: "Opportunités IA", value: "+12", icon: <Zap className="text-amber-400" /> },
          { label: "Périmètre Global", value: "14 Secteurs", icon: <Globe className="text-blue-400" /> },
        ].map((kpi, i) => (
          <Card key={i} className="p-4 border border-slate-700 bg-slate-900/80 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
             <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-slate-800 rounded-lg">{kpi.icon}</div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{kpi.label}</span>
             </div>
             <span className="text-2xl font-black text-white">{kpi.value}</span>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* IA Simulation Engine */}
        <Card className="lg:col-span-2 p-6 glass-card border-slate-800 bg-gradient-to-br from-slate-900 to-amber-900/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-500" />
              Moteur de Simulation Prédictive (Neuro-IA)
            </h3>
            <Btn 
              variant={simulationActive ? 'error' : 'primary'} 
              size="xs" 
              onClick={() => setSimulationActive(!simulationActive)}
              className="animate-pulse"
            >
               {simulationActive ? 'Arrêter Simulation' : 'Lancer Simulation'}
            </Btn>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketVolatility}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="opportunity" name="Opportunités" fill="#f59e0b" fillOpacity={0.1} stroke="#f59e0b" strokeWidth={3} />
                <Area type="monotone" dataKey="risk" name="Menaces" fill="#f43f5e" fillOpacity={0.05} stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Global Strategy Radar */}
        <Card className="p-6 glass-card border-slate-800">
           <h3 className="text-sm font-black uppercase tracking-tighter mb-6 flex items-center gap-2 text-indigo-400">
              <Layers className="w-4 h-4" />
              Équilibre Stratégique Global
           </h3>
           <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="80%" data={strategicScore}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={8} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
                    <Radar name="Performance" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                 </RadarChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-4 space-y-2">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                 <span className="text-[10px] font-black text-emerald-400 uppercase">Santé Globale</span>
                 <span className="text-xs font-black text-white">OPTIMAL</span>
              </div>
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between">
                 <span className="text-[10px] font-black text-amber-400 uppercase">Point de Vigilance</span>
                 <span className="text-xs font-black text-white">RECRUTEMENT</span>
              </div>
           </div>
        </Card>
      </div>

      {/* Strategic Tools & Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="p-6 glass-card border-slate-800 bg-slate-900/90 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all" />
            <h3 className="text-sm font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 text-indigo-500" />
               Sceau de Diamant™ Digital
            </h3>
            <div className="flex flex-col items-center justify-center py-6 text-center">
               <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] mb-4 animate-float">
                  <ShieldCheck className="w-12 h-12 text-white" />
               </div>
               <p className="text-xs font-black text-white uppercase mb-1">Certificat d'Excellence Opérationnelle</p>
               <p className="text-[10px] text-slate-500 font-mono mb-4 italic">Hash: 0x9f9...dE21 (Verified by Blockchain)</p>
               <Btn variant="primary" className="w-full text-xs py-3">Générer Preuve de Confiance</Btn>
            </div>
         </Card>

         <Card className="p-6 glass-card border-slate-800 flex flex-col">
            <h3 className="text-sm font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
               <Search className="w-4 h-4 text-blue-400" />
               Intelligence Économique & Veille
            </h3>
            <div className="space-y-3">
               {[
                 { label: "Tendance Marché Immob.", status: "Favorable", icon: <TrendingUp className="text-emerald-400" /> },
                 { label: "Risque Cyber Détecté", status: "Bas", icon: <ShieldCheck className="text-blue-400" /> },
                 { label: "Nouveau Concurrent Direct", status: "Veille", icon: <Activity className="text-amber-400" /> },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-slate-800 rounded-lg">{item.icon}</div>
                       <span className="text-xs font-black text-white">{item.label}</span>
                    </div>
                    <Badge variant="info" className="text-[8px] uppercase">{item.status}</Badge>
                 </div>
               ))}
               <Btn variant="ghost" className="w-full mt-2 text-[10px] uppercase">Rapport de Veille Complet</Btn>
            </div>
         </Card>
      </div>
    </div>
  );
};

export default StrategicWarRoom;
