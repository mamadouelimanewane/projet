import React from "react";
import { TrendingUp, Target, Zap, DollarSign, Tooltip as TooltipIcon, Filter, Layers, Calculator } from "lucide-react";
import { SectionHeader, Card, Btn, Badge, ProgressBar } from "../ui";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, Legend } from "recharts";

const AnalyseValeur = ({ data = {} }) => {
  const chartData = [
    { name: 'Structure', cout: 400, valeur: 350 },
    { name: 'Énergie', cout: 200, valeur: 280 },
    { name: 'Design', cout: 150, valeur: 400 },
    { name: 'Sécurité', cout: 300, valeur: 320 },
    { name: 'Connectivité', cout: 100, valeur: 350 },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Analyse de la Valeur (Value Engineering)" 
        subtitle="Optimisation du ratio fonction/coût et élimination des coûts inutiles"
        action={<Btn><Calculator className="w-4 h-4 mr-2" /> Calculer Ratio</Btn>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique Coût vs Valeur */}
        <Card className="lg:col-span-2 p-6 glass-card rounded-2xl">
           <h3 className="font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Comparaison Coût / Valeur par Fonction
           </h3>
           <ResponsiveContainer width="100%" height={350}>
             <BarChart data={chartData}>
               <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
               <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
               <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
               <ReTooltip 
                 contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '12px' }}
                 itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
               />
               <Legend />
               <Bar dataKey="cout" name="Coût (FCFA)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
               <Bar dataKey="valeur" name="Valeur Perçue" fill="#10b981" radius={[4, 4, 0, 0]} />
             </BarChart>
           </ResponsiveContainer>
        </Card>

        {/* Recommandations d'Optimisation */}
        <div className="space-y-4">
           <Card className="p-6 glass-card rounded-2xl">
              <div className="text-center mb-6">
                 <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Ratio Valeur Global</p>
                 <p className="text-4xl font-black text-white">{data.ratio || 1.4}</p>
                 <Badge variant="success" className="mt-2">Excellent (+0.2)</Badge>
              </div>
              <div className="space-y-4 pt-4 border-t border-slate-800">
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Zones d'Inéficience</p>
                 <div className="p-3 bg-red-600/10 border border-red-500/20 rounded-xl">
                    <p className="text-[11px] text-red-400 font-bold mb-1">Sur-conception : Structure</p>
                    <p className="text-[10px] text-slate-300">Le coût dépasse la valeur fonctionnelle de 15%. Réduction suggérée.</p>
                 </div>
                 <div className="p-3 bg-emerald-600/10 border border-emerald-500/20 rounded-xl">
                    <p className="text-[11px] text-emerald-400 font-bold mb-1">Opportunité : Design</p>
                    <p className="text-[10px] text-slate-300">Valeur perçue très haute pour un coût faible. Renforcer l'investissement.</p>
                 </div>
              </div>
           </Card>

           <Card className="p-6 glass-card rounded-2xl bg-indigo-600/5 border-indigo-500/20">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                 <Zap className="w-4 h-4 text-yellow-400" />
                 Algorithme de Simplification
              </h4>
              <p className="text-xs text-slate-400 mb-4">L'IA suggère 3 modifications de conception pour économiser 8.5M FCFA sans perte de qualité.</p>
              <Btn size="sm" className="w-full">Appliquer l'Optimisation</Btn>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyseValeur;
