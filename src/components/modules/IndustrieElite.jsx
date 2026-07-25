import React, { useState } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Factory, Cpu, Zap, Settings, Play, Pause, BarChart3, Gauge } from "lucide-react";
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const IndustrieElite = ({ data = {}, setData }) => {
  const [machineStatus, setMachineStatus] = useState("running");
  const productionData = [
    { name: '08:00', actual: 400, target: 450 },
    { name: '10:00', actual: 440, target: 450 },
    { name: '12:00', actual: 420, target: 450 },
    { name: '14:00', actual: 460, target: 450 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <SectionHeader 
        title="Factory Twin Elite™" 
        subtitle="Industrie 4.0 & Jumeau Numérique"
        icon={<Factory className="w-8 h-8 text-indigo-500" />}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 glass-card app-border">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Area type="monotone" dataKey="actual" fill="#6366f1" fillOpacity={0.1} stroke="#6366f1" strokeWidth={3} />
                <Line type="monotone" dataKey="target" stroke="#475569" strokeDasharray="5 5" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6 glass-card app-border flex flex-col items-center justify-center">
          <div className={`w-32 h-32 rounded-full border-8 ${machineStatus === 'running' ? 'border-emerald-500/20' : 'border-rose-500/20'} flex items-center justify-center mb-6`}>
             <Cpu className={`w-10 h-10 ${machineStatus === 'running' ? 'text-emerald-500' : 'text-rose-500'}`} />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
             <Btn variant="primary" size="xs" onClick={() => setMachineStatus("running")}>Start</Btn>
             <Btn variant="error" size="xs" onClick={() => setMachineStatus("paused")}>Stop</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IndustrieElite;
