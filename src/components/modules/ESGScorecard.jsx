import React from "react";
import { Leaf, Users, Shield, Globe, Award, TrendingUp, Info, BarChart } from "lucide-react";
import { SectionHeader, Card, ProgressBar, Badge } from "../ui";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as ReTooltip } from "recharts";

const ESGScorecard = ({ data = {} }) => {
  const esgData = [
    { name: 'Environnement', value: 40, color: '#10b981' },
    { name: 'Social', value: 35, color: '#3b82f6' },
    { name: 'Gouvernance', value: 25, color: '#a855f7' },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Impact ESG & RSE" 
        subtitle="Suivi de la performance extra-financière et sociétale"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Résumé Circulaire */}
        <Card className="p-8 glass-card rounded-2xl flex flex-col items-center">
           <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6">Score ESG Global</h3>
           <div className="relative w-48 h-48 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={esgData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {esgData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ReTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">82</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">/ 100</span>
              </div>
           </div>
           <div className="space-y-2 w-full">
             {esgData.map(item => (
               <div key={item.name} className="flex items-center justify-between text-xs">
                 <div className="flex items-center gap-2 text-slate-400">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                 </div>
                 <span className="text-white font-bold">{item.value}%</span>
               </div>
             ))}
           </div>
        </Card>

        {/* Détails par Piliers */}
        <div className="lg:col-span-2 space-y-4">
           {/* Environnement */}
           <Card className="p-6 glass-card rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Environnement</h4>
                    <p className="text-xs text-slate-500">Bilan carbone et gestion des ressources</p>
                  </div>
                </div>
                <Badge variant="success">Classe A</Badge>
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Émissions CO2 (t eq CO2)</p>
                    <p className="text-2xl font-bold text-white">{data.carbone || 124} <span className="text-xs text-slate-500">t</span></p>
                    <ProgressBar value={75} color="#10b981" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Recyclage Déchets</p>
                    <p className="text-2xl font-bold text-white">68%</p>
                    <ProgressBar value={68} color="#10b981" />
                 </div>
              </div>
           </Card>

           {/* Social */}
           <Card className="p-6 glass-card rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Social</h4>
                    <p className="text-xs text-slate-500">Équité, formation et emploi local</p>
                  </div>
                </div>
                <Badge variant="info">Excelence</Badge>
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Emploi Local</p>
                    <p className="text-2xl font-bold text-white">85%</p>
                    <ProgressBar value={85} color="#3b82f6" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Mixité (F/H)</p>
                    <p className="text-2xl font-bold text-white">42%</p>
                    <ProgressBar value={42} color="#3b82f6" />
                 </div>
              </div>
           </Card>

           {/* Gouvernance */}
           <Card className="p-6 glass-card rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Gouvernance</h4>
                    <p className="text-xs text-slate-500">Éthique des affaires et transparence</p>
                  </div>
                </div>
                <Badge variant="indigo">Vérifié</Badge>
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Transparence</p>
                    <p className="text-2xl font-bold text-white">98%</p>
                    <ProgressBar value={98} color="#a855f7" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Indépendance Board</p>
                    <p className="text-2xl font-bold text-white">75%</p>
                    <ProgressBar value={75} color="#a855f7" />
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default ESGScorecard;
