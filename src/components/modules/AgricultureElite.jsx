import React, { useState } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Sprout, CloudRain, Droplets, Wind, Map, BarChart3, Radio, Thermometer, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AgricultureElite = ({ data = {}, setData }) => {
  const [activeTab, setActiveTab] = useState("monitor");

  const agriStats = [
    { label: "Humidité Sols", value: "42%", icon: <Droplets className="text-blue-400" />, status: "Optimal" },
    { label: "Santé Cultures", value: "94/100", icon: <Sprout className="text-emerald-400" />, status: "Excellente" },
    { label: "Réserve Eau", value: "12,4k L", icon: <CloudRain className="text-cyan-400" />, status: "Stable" },
    { label: "Prod. Prévue", value: "+12%", icon: <BarChart3 className="text-amber-400" />, status: "Hausse" },
  ];

  const sensorData = [
    { time: '08:00', temp: 22, hum: 45 },
    { time: '10:00', temp: 25, hum: 40 },
    { time: '12:00', temp: 28, hum: 38 },
    { time: '14:00', temp: 30, hum: 35 },
    { time: '16:00', temp: 29, hum: 37 },
    { time: '18:00', temp: 26, hum: 42 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <SectionHeader 
        title="Elite Harvest™ Intelligence" 
        subtitle="Agriculture de Précision & Monitoring Satellite 4.0"
        icon={<Sprout className="w-8 h-8 text-emerald-500" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {agriStats.map((stat, i) => (
          <Card key={i} className="p-4 border-l-4 border-l-emerald-500 bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-800 rounded-lg">{stat.icon}</div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-black text-white">{stat.value}</span>
              <Badge variant="success" className="text-[9px] uppercase">{stat.status}</Badge>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 glass-card border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
              Télémétrie Sols & Climat (Live)
            </h3>
            <div className="flex gap-2">
              <Btn variant={activeTab === 'monitor' ? 'primary' : 'ghost'} size="xs" onClick={() => setActiveTab('monitor')}>Monitoring</Btn>
              <Btn variant={activeTab === 'yield' ? 'primary' : 'ghost'} size="xs" onClick={() => setActiveTab('yield')}>Rendement</Btn>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sensorData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="temp" stroke="#fbbf24" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={3} />
                <Area type="monotone" dataKey="hum" stroke="#38bdf8" fillOpacity={1} fill="url(#colorHum)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 glass-card border-slate-800 flex flex-col">
          <h3 className="text-sm font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-500" />
            Vue Satellite & Parcelles
          </h3>
          <div className="flex-1 bg-slate-800 rounded-2xl relative overflow-hidden border border-slate-700">
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-slate-900/40" />
             <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 p-4 gap-2">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={`rounded-md border border-white/5 transition-all cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/10 ${i === 5 ? 'bg-red-500/20 border-red-500/40' : i === 10 ? 'bg-amber-500/20 border-amber-500/40' : 'bg-emerald-500/5'}`} />
                ))}
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AgricultureElite;
