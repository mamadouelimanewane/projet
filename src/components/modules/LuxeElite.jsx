import React, { useState } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Diamond, ShieldCheck, Package, Award, Fingerprint } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LuxeElite = ({ data = {}, setData }) => {
  const inventoryData = [
    { category: 'Joaillerie', value: 450 },
    { category: 'Horlogerie', value: 320 },
    { category: 'Maroquinerie', value: 280 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <SectionHeader 
        title="Luxe Trace & Authenticate™" 
        subtitle="Gestion Ultra-Luxe & Traçabilité"
        icon={<Diamond className="w-8 h-8 text-blue-500" />}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 glass-card border-slate-800">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="category" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6 glass-card border-slate-800 flex flex-col items-center">
           <Fingerprint className="w-12 h-12 text-blue-400 mb-4" />
           <p className="text-xs font-black text-white mb-2">Authentification Blockchain</p>
           <div className="w-full bg-slate-900 p-2 rounded-lg font-mono text-[8px] text-blue-300 break-all border border-slate-700">
              0x4f8e...77a2c1
           </div>
        </Card>
      </div>
    </div>
  );
};

export default LuxeElite;
