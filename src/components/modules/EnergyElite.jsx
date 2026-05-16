import React, { useState } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Zap, Wind, Sun, Battery, BarChart3, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EnergyElite = ({ data = {}, setData }) => {
  const generationData = [
    { name: 'Lun', solar: 400, wind: 240 },
    { name: 'Mar', solar: 300, wind: 139 },
    { name: 'Mer', solar: 200, wind: 980 },
    { name: 'Jeu', solar: 278, wind: 390 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <SectionHeader 
        title="Energy Nexus Elite™" 
        subtitle="Smart Grid & Supervision Énergétique"
        icon={<Zap className="w-8 h-8 text-amber-500" />}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 glass-card border-slate-800">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={generationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                <Area type="monotone" dataKey="solar" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.1} />
                <Area type="monotone" dataKey="wind" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6 glass-card border-slate-800">
           <div className="text-center">
              <Battery className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <p className="text-3xl font-black text-white">82%</p>
              <p className="text-[10px] font-black text-emerald-400 uppercase">Stockage Batterie</p>
           </div>
        </Card>
      </div>
    </div>
  );
};

export default EnergyElite;
