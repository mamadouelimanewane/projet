import React, { useState } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Building2, Wifi, Zap, Droplets, Map, Activity, ShieldCheck, Car, Trash2, Wind, Thermometer } from "lucide-react";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

const SmartCityElite = ({ data = {}, setData }) => {
  const [focusArea, setFocusArea] = useState("Dakar Centre");

  const cityData = [
    { name: '08h', traffic: 85, energy: 45, waste: 20 },
    { name: '12h', traffic: 65, energy: 80, waste: 45 },
    { name: '16h', traffic: 92, energy: 65, waste: 75 },
    { name: '20h', traffic: 40, energy: 55, waste: 90 },
    { name: '00h', traffic: 15, energy: 30, waste: 10 },
  ];

  const cityKpis = [
    { label: "Connectivité", value: "98.5%", icon: <Wifi className="text-blue-400" />, sub: "4G/5G Active" },
    { label: "Efficience Éner.", value: "92/100", icon: <Zap className="text-amber-400" />, sub: "Optimisé" },
    { label: "Incidents Signalés", value: "4", icon: <Activity className="text-rose-400" />, sub: "2 résolus" },
    { label: "Qualité de l'Air", value: "Bonne", icon: <Wind className="text-emerald-400" />, sub: "AQI: 32" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <SectionHeader 
        title="Urban Intelligence Elite™" 
        subtitle="Pilotage de Smart Cities & Infrastructures Urbaines Connectées"
        icon={<Building2 className="w-8 h-8 text-blue-500" />}
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {cityKpis.map((kpi, i) => (
          <Card key={i} className="p-4 border-l-4 border-l-blue-500 app-surface backdrop-blur-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 app-surface2 rounded-lg">{kpi.icon}</div>
              <span className="text-[10px] font-black app-text3 uppercase tracking-widest">{kpi.label}</span>
            </div>
            <div>
              <span className="text-2xl font-black app-text">{kpi.value}</span>
              <p className="text-[9px] font-bold app-text3 uppercase mt-1">{kpi.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urban Performance Chart */}
        <Card className="lg:col-span-2 p-6 glass-card app-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              Monitoring Multi-Flux (24h)
            </h3>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-[10px] font-bold app-text2">Trafic</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span className="text-[10px] font-bold app-text2">Énergie</span>
               </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }} />
                <Area type="monotone" dataKey="traffic" name="Trafic" fill="#3b82f6" fillOpacity={0.1} stroke="#3b82f6" strokeWidth={3} />
                <Line type="monotone" dataKey="energy" name="Énergie" stroke="#f59e0b" strokeWidth={2} dot={false} />
                <Bar dataKey="waste" name="Déchets" fill="#1e293b" barSize={10} radius={[2, 2, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Real-time Map & IoT Points */}
        <Card className="p-6 glass-card app-border flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-500" />
              Zones d'Intervention
            </h3>
            <Badge variant="info">Live IoT</Badge>
          </div>
          <div className="flex-1 app-surface border app-border rounded-2xl relative p-4">
             <div className="space-y-3">
                {[
                  { label: "Capteur Eau #12", status: "Fuite détectée", color: "text-rose-500", icon: <Droplets className="w-3 h-3" /> },
                  { label: "Lampe Rue #442", status: "Dysfonctionnement", color: "text-amber-500", icon: <Zap className="w-3 h-3" /> },
                  { label: "Station Air #01", status: "Opérationnel", color: "text-emerald-500", icon: <Wind className="text-emerald-500 w-3 h-3" /> },
                  { label: "Caméra #99", status: "Opérationnel", color: "text-emerald-500", icon: <ShieldCheck className="w-3 h-3" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 app-surface2 rounded-xl border app-border">
                     <div className="flex items-center gap-3">
                        <div className="p-1.5 app-surface2 rounded-lg">{item.icon}</div>
                        <div>
                           <p className="text-[10px] font-black app-text">{item.label}</p>
                           <p className={`text-[9px] font-bold ${item.color}`}>{item.status}</p>
                        </div>
                     </div>
                     <Btn variant="ghost" size="xs" className="h-6 w-6 p-0 rounded-full">➔</Btn>
                  </div>
                ))}
             </div>
          </div>
          <Btn variant="primary" className="w-full mt-4 text-[10px] uppercase">Historique Maintenance</Btn>
        </Card>
      </div>

      {/* Mobility & Sustainability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="p-6 glass-card app-border">
           <h3 className="text-sm font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
             <Car className="w-4 h-4 text-blue-400" />
             Mobilité & Transports Connectés
           </h3>
           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 app-surface border app-border rounded-2xl">
                 <p className="text-[10px] font-black app-text3 uppercase mb-2">Bus en Circulation</p>
                 <div className="flex items-center justify-between">
                    <span className="text-2xl font-black app-text">124</span>
                    <Badge variant="success" className="text-[8px]">On-Time</Badge>
                 </div>
              </div>
              <div className="p-4 app-surface border app-border rounded-2xl">
                 <p className="text-[10px] font-black app-text3 uppercase mb-2">Places Parking Libres</p>
                 <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-blue-400">452</span>
                    <span className="text-[8px] app-text3">Total: 1200</span>
                 </div>
              </div>
              <div className="p-4 app-surface border app-border rounded-2xl col-span-2">
                 <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] font-black app-text3 uppercase">Utilisation Pistes Cyclables</p>
                    <span className="text-[10px] font-black text-emerald-400">+12% vs mois dernier</span>
                 </div>
                 <div className="w-full h-1.5 app-surface2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[65%] rounded-full" />
                 </div>
              </div>
           </div>
         </Card>

         <Card className="p-6 glass-card app-border bg-gradient-to-br from-slate-900 to-emerald-900/20">
            <h3 className="text-sm font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-emerald-400" />
              Écologie & Ville Verte
            </h3>
            <div className="space-y-4">
               <div className="p-4 app-surface2 rounded-2xl border app-border flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <Thermometer className="w-6 h-6 text-emerald-400" />
                     <div>
                        <p className="text-[10px] font-black app-text3 uppercase mb-0.5">Température Urbaine</p>
                        <p className="text-lg font-black app-text">28.4°C</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[9px] font-bold text-emerald-400 uppercase">Îlot de Fraîcheur</p>
                     <p className="text-[9px] app-text3">Zone : Grand Parc</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="flex-1 p-3 app-surface border app-border rounded-xl text-center">
                     <p className="text-[8px] font-black app-text3 uppercase mb-1">Recyclage</p>
                     <p className="text-[12px] font-bold app-text">62%</p>
                  </div>
                  <div className="flex-1 p-3 app-surface border app-border rounded-xl text-center">
                     <p className="text-[8px] font-black app-text3 uppercase mb-1">Solaire Urbain</p>
                     <p className="text-[12px] font-bold app-text">12.4 MWh</p>
                  </div>
               </div>
               <Btn variant="outline" className="w-full text-xs py-3 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/5">Rapport Durabilité Ville</Btn>
            </div>
         </Card>
      </div>
    </div>
  );
};

export default SmartCityElite;
