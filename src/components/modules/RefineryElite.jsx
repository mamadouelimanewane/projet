import React, { useState, useEffect } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Fuel, Thermometer, Droplets, Zap, ShieldCheck, AlertTriangle, Activity, Settings, Truck, Factory, BarChart3, Clock, Play, Pause } from "lucide-react";
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const RefineryElite = ({ data = {}, setData }) => {
  const [activePlant, setActivePlant] = useState("Distillation Unité 01");
  const [isSimulating, setIsSimulating] = useState(true);
  const [liveMetrics, setLiveMetrics] = useState({
    flow: 45.2,
    temp: 245,
    pressure: 12.4,
    vibration: 0.02
  });

  // Simulation temps réel pour la démo
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        flow: prev.flow + (Math.random() - 0.5) * 0.4,
        temp: prev.temp + (Math.random() - 0.5) * 1.5,
        pressure: prev.pressure + (Math.random() - 0.5) * 0.05,
        vibration: Math.max(0.01, prev.vibration + (Math.random() - 0.5) * 0.01)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const refiningFlow = [
    { name: '00:00', crude: 400, gas: 120, diesel: 180, jet: 100 },
    { name: '04:00', crude: 420, gas: 130, diesel: 190, jet: 110 },
    { name: '08:00', crude: 450, gas: 145, diesel: 210, jet: 120 },
    { name: '12:00', crude: 440, gas: 140, diesel: 200, jet: 115 },
    { name: '16:00', crude: 460, gas: 150, diesel: 220, jet: 130 },
    { name: '20:00', crude: 430, gas: 135, diesel: 195, jet: 110 },
  ];

  const refineryKpis = [
    { label: "Débit Brut", value: `${liveMetrics.flow.toFixed(1)}k bbl/j`, icon: <Droplets className="text-amber-500" />, sub: "Target: 48k" },
    { label: "OEE Raffinerie", value: "94.2%", icon: <Settings className="text-blue-400" />, sub: "Optimal" },
    { label: "Score Sécurité HSE", value: "0 Incidents", icon: <ShieldCheck className="text-emerald-400" />, sub: "340 jours sans arrêt" },
    { label: "Pression Système", value: `${liveMetrics.pressure.toFixed(1)} bar`, icon: <Zap className="text-indigo-400" />, sub: "Normal" },
  ];

  const storageLevels = [
    { label: "Brut (Crude)", progress: 85, color: "bg-amber-600" },
    { label: "Essence (Petrol)", progress: 42, color: "bg-emerald-500" },
    { label: "Gazole (Diesel)", progress: 68, color: "bg-blue-500" },
    { label: "Jet A1", progress: 92, color: "bg-cyan-400" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-start">
        <SectionHeader 
          title="Refinery Core Elite™" 
          subtitle="Pilotage de Raffinerie, Maintenance Industrielle & HSE Dashboard"
          icon={<Factory className="w-8 h-8 text-amber-600" />}
        />
        <div className="flex gap-2 mt-2">
           <Btn 
             variant={isSimulating ? "primary" : "ghost"} 
             size="xs" 
             onClick={() => setIsSimulating(!isSimulating)}
             className="flex items-center gap-2"
           >
             {isSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
             {isSimulating ? "Simulation Active" : "Reprendre Simulation"}
           </Btn>
           <Btn variant="outline" size="xs">Exporter Données</Btn>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {refineryKpis.map((kpi, i) => (
          <Card key={i} className="p-4 border-l-4 border-l-amber-600 app-surface backdrop-blur-md shadow-xl hover:shadow-amber-900/10 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 app-surface2 rounded-lg">{kpi.icon}</div>
              <span className="text-[10px] font-black app-text3 uppercase tracking-widest">{kpi.label}</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white tabular-nums">{kpi.value}</span>
              <p className="text-[9px] font-bold app-text3 uppercase mt-1">{kpi.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Refining Process Chart */}
        <Card className="lg:col-span-2 p-6 glass-card app-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-500" />
              Flux de Production & Distillation (24h)
            </h3>
            <div className="flex gap-2">
               <Badge variant="info" className="bg-amber-500/10 text-amber-400 border-amber-500/20">LIVE DATA STREAM</Badge>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={refiningFlow}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                <Area type="monotone" dataKey="crude" name="Entrée Brut" fill="#d97706" fillOpacity={0.1} stroke="#d97706" strokeWidth={2} />
                <Bar dataKey="gas" name="Essence" fill="#10b981" barSize={15} radius={[2, 2, 0, 0]} />
                <Bar dataKey="diesel" name="Gazole" fill="#3b82f6" barSize={15} radius={[2, 2, 0, 0]} />
                <Line type="monotone" dataKey="jet" name="Jet A1" stroke="#22d3ee" strokeWidth={3} dot={{ fill: '#22d3ee' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Tank Farm & Storage */}
        <Card className="p-6 glass-card app-border flex flex-col">
          <h3 className="text-sm font-black uppercase tracking-tighter mb-6 flex items-center gap-2 text-amber-500">
            <Droplets className="w-4 h-4" />
            Parc de Stockage (Tank Farm)
          </h3>
          <div className="flex-1 space-y-6">
             {storageLevels.map((item, i) => (
               <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black app-text2 uppercase">{item.label}</span>
                     <span className="text-[10px] font-black text-white">{item.progress}%</span>
                  </div>
                  <div className="w-full h-2 app-surface2 rounded-full overflow-hidden border app-border">
                     <div className={`${item.color} h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.5)]`} style={{ width: `${item.progress}%` }} />
                  </div>
               </div>
             ))}
             <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-center gap-3 mt-4 group cursor-pointer hover:bg-amber-500/10 transition-all">
                <Truck className="w-5 h-5 text-amber-500 group-hover:translate-x-1 transition-transform" />
                <div>
                   <p className="text-[10px] font-black text-white uppercase">Prochain Chargement</p>
                   <p className="text-[9px] app-text2">Terminal 04 | J-1 (12:00)</p>
                </div>
             </div>
          </div>
        </Card>
      </div>

      {/* Maintenance & HSE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="p-6 glass-card app-border bg-gradient-to-br from-slate-900 to-rose-900/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="w-24 h-24 text-rose-500" />
           </div>
           <div className="flex justify-between items-center mb-6 relative z-10">
             <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
               <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
               Alertes HSE & Sécurité Critique
             </h3>
             <Btn variant="error" size="xs">Lancer Alerte</Btn>
           </div>
           <div className="space-y-4 relative z-10">
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl shadow-lg">
                 <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Alerte Gaz H2S</p>
                    <Badge variant="error" className="animate-bounce">CRITIQUE</Badge>
                 </div>
                 <p className="text-xs text-white font-bold">Secteur Raffinage Nord - Vérification Requise</p>
                 <div className="flex gap-2 mt-4">
                    <Btn variant="primary" className="flex-1 text-[10px] h-9">Activer Protocoles</Btn>
                    <Btn variant="ghost" className="flex-1 text-[10px] h-9 app-surface">Check Capteurs</Btn>
                 </div>
              </div>
              <div className="flex items-center justify-between p-3 app-surface border app-border rounded-xl hover:border-amber-500/30 transition-all">
                 <div className="flex items-center gap-3">
                    <Thermometer className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-white">Température Colonne #3</span>
                 </div>
                 <span className="text-xs font-black text-amber-400 tabular-nums">{liveMetrics.temp.toFixed(1)}°C</span>
              </div>
           </div>
         </Card>

         <Card className="p-6 glass-card app-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-400" />
                Arrêts Programmés (Shutdown)
              </h3>
              <Btn variant="outline" size="xs">Calendrier GANTT</Btn>
            </div>
            <div className="space-y-4">
               <div className="flex items-center gap-4 p-4 app-surface rounded-2xl border app-border hover:border-blue-500/30 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                     <Clock className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                     <p className="text-xs font-black text-white">Maintenance Annuelle - Unité 02</p>
                     <p className="text-[9px] app-text3 uppercase font-bold">Début : 15 Septembre 2026</p>
                     <div className="w-full h-1 app-surface2 rounded-full mt-2">
                        <div className="bg-blue-500 h-full w-[25%] rounded-full shadow-[0_0_10px_#3b82f6]" />
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 app-surface border app-border rounded-xl text-center">
                     <p className="text-[8px] font-black app-text3 uppercase mb-1">Pièces en commande</p>
                     <p className="text-[12px] font-bold text-white">14 / 20</p>
                  </div>
                  <div className="p-3 app-surface border app-border rounded-xl text-center">
                     <p className="text-[8px] font-black app-text3 uppercase mb-1">Équipe Technique</p>
                     <p className="text-[12px] font-bold text-emerald-400">Prêt (42 pers)</p>
                  </div>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
};

export default RefineryElite;
