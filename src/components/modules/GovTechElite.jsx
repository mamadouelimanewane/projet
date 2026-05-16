import React, { useState, useEffect } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Landmark, Users, TrendingUp, ShieldCheck, FileText, Globe, Scale, AlertCircle, BarChart3, PieChart, MapPin, Search, Filter, ArrowRight, Activity, Zap, ChevronDown } from "lucide-react";
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RePieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const GovTechElite = ({ data = {}, setData }) => {
  const [activeTab, setActiveTab] = useState("budget");
  const [selectedCountry, setSelectedCountry] = useState("Sénégal");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Configuration Dynamique par Pays
  const countryConfigs = {
    "Sénégal": {
      planName: "Plan National (Ex-PSE)",
      currency: "FCFA",
      flag: "🇸🇳",
      pillars: ["Transformation Structurelle", "Capital Humain", "Gouvernance & Paix"],
      regions: ["Dakar", "Thiès", "Saint-Louis", "Casamance", "Autres"],
      growth: "+7.2%"
    },
    "Côte d'Ivoire": {
      planName: "PND 2021-2025",
      currency: "FCFA",
      flag: "🇨🇮",
      pillars: ["Industrialisation", "Inclusion Sociale", "Modernisation de l'État"],
      regions: ["Abidjan", "Yamoussoukro", "Bouaké", "San-Pédro", "Autres"],
      growth: "+6.5%"
    },
    "Mali": {
      planName: "Refondation de l'État",
      currency: "FCFA",
      flag: "🇲🇱",
      pillars: ["Souveraineté", "Réforme État", "Développement Durable"],
      regions: ["Bamako", "Kayes", "Ségou", "Mopti", "Autres"],
      growth: "+4.8%"
    },
    "Guinée": {
      planName: "Plan de Relance Économique",
      currency: "GNF",
      flag: "🇬🇳",
      pillars: ["Souveraineté Alimentaire", "Mines & Énergie", "Infrastructures"],
      regions: ["Conakry", "Kindia", "Labé", "Kankan", "Autres"],
      growth: "+5.1%"
    }
  };

  const currentConfig = countryConfigs[selectedCountry];

  const ministries = [
    { name: "Santé & Action Sociale", budget: 240, spent: 185, progress: 77, projects: 12 },
    { name: "Éducation Nationale", budget: 320, spent: 290, progress: 90, projects: 45 },
    { name: "Infrastructures", budget: 580, spent: 410, progress: 70, projects: 8 },
    { name: "Agriculture", budget: 210, spent: 195, progress: 92, projects: 34 },
    { name: "Énergie & Mines", budget: 450, spent: 320, progress: 71, projects: 15 },
  ];

  const executionHistory = [
    { month: 'Jan', budget: 100, real: 85 },
    { month: 'Fév', budget: 200, real: 170 },
    { month: 'Mar', budget: 350, real: 310 },
    { month: 'Avr', budget: 500, real: 480 },
    { month: 'Mai', budget: 750, real: 690 },
  ];

  const regionalImpact = currentConfig.regions.map((region, i) => ({
    name: region,
    value: [40, 25, 15, 12, 8][i],
    color: ['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#94a3b8'][i]
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
           <SectionHeader 
             title="National Strategic Command" 
             subtitle={`Pilotage du ${currentConfig.planName}`}
             icon={<Landmark className="w-8 h-8 text-indigo-500" />}
           />
           {/* Country Selector Dropdown */}
           <div className="relative mt-2">
              <button 
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl hover:border-indigo-500 transition-all shadow-lg"
              >
                 <span className="text-xl leading-none">{currentConfig.flag}</span>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">{selectedCountry}</span>
                 <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCountryDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                   {Object.keys(countryConfigs).map(country => (
                     <button 
                       key={country}
                       onClick={() => { setSelectedCountry(country); setIsCountryDropdownOpen(false); }}
                       className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-600/20 text-left transition-all border-b border-slate-800 last:border-0"
                     >
                        <span className="text-lg">{countryConfigs[country].flag}</span>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{country}</span>
                     </button>
                   ))}
                </div>
              )}
           </div>
        </div>
        <div className="flex gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
           {["budget", "projets", "impact"].map(tab => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Dynamic Strategic Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentConfig.pillars.map((pillar, i) => (
          <div key={i} className="p-4 bg-slate-900/50 border-2 border-slate-800 rounded-2xl group hover:border-indigo-500/50 transition-all">
             <div className="flex justify-between items-start mb-2">
                <div className={`w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg`}>
                   <Zap className="w-4 h-4 text-white" />
                </div>
                <Badge variant="info" className="text-[8px] uppercase">Priorité {i+1}</Badge>
             </div>
             <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Pilier Stratégique</p>
             <p className="text-xs font-black text-white">{pillar}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 glass-card border-slate-800">
           {activeTab === 'budget' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                   <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2 text-indigo-400">
                     <BarChart3 className="w-4 h-4" />
                     Exécution Budgétaire - {selectedCountry}
                   </h3>
                </div>
                <div className="h-64 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={executionHistory}>
                         <defs>
                            <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                         <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                         <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                         <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }} />
                         <Area type="monotone" dataKey="real" stroke="#6366f1" fillOpacity={1} fill="url(#colorReal)" strokeWidth={3} />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
                <div className="space-y-3 pt-4">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Suivi Inter-Structurel ({currentConfig.currency})</p>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead>
                            <tr className="text-[9px] font-black text-slate-500 uppercase border-b border-slate-800">
                               <th className="pb-2">Institution</th>
                               <th className="pb-2">Enveloppe</th>
                               <th className="pb-2">Taux (%)</th>
                               <th className="pb-2 text-right">Statut</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-800">
                            {ministries.map((m, i) => (
                               <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                  <td className="py-3 text-[11px] font-bold text-white">{m.name}</td>
                                  <td className="py-3 text-[11px] text-slate-300">{m.budget}M</td>
                                  <td className="py-3">
                                     <div className="flex items-center gap-2">
                                        <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                                           <div className="h-full bg-indigo-500" style={{ width: `${m.progress}%` }} />
                                        </div>
                                        <span className="text-[10px] font-black text-white">{m.progress}%</span>
                                     </div>
                                  </td>
                                  <td className="py-3 text-right">
                                     <Badge variant="success" className="text-[7px]">CONFORME</Badge>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
           )}
           {/* (Other tabs can be kept similar to previous version, using currentConfig for labels) */}
           {activeTab !== 'budget' && (
              <div className="flex items-center justify-center h-full text-slate-500 text-xs italic">
                 Données du module "{activeTab}" pour le {selectedCountry} en cours de chargement...
              </div>
           )}
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
           <Card className="p-6 glass-card border-slate-800 bg-gradient-to-br from-indigo-900/20 to-slate-900">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl shadow-xl backdrop-blur-md border border-white/10 text-white">
                    {currentConfig.flag}
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tighter">{selectedCountry}</h4>
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Dashboard Exécutif</p>
                 </div>
              </div>
              <div className="space-y-4">
                 {[
                   { label: "Croissance PIB", value: currentConfig.growth, icon: <TrendingUp className="text-emerald-400" /> },
                   { label: "Plan National", value: "Validé", icon: <ShieldCheck className="text-blue-400" /> },
                   { label: "Notation", value: "B+", icon: <Scale className="text-amber-400" /> },
                 ].map((kpi, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800 rounded-xl">
                      <div className="flex items-center gap-3">
                         {kpi.icon}
                         <span className="text-[10px] font-bold text-slate-400 uppercase">{kpi.label}</span>
                      </div>
                      <span className="text-xs font-black text-white">{kpi.value}</span>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="p-6 glass-card border-slate-800">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Impact par Région ({selectedCountry})</h4>
              <div className="h-40 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                       <Pie data={regionalImpact} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                          {regionalImpact.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                       </Pie>
                       <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', fontSize: '10px' }} />
                    </RePieChart>
                 </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                 {regionalImpact.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                       <span className="text-[8px] font-bold text-slate-500 uppercase">{item.name}</span>
                    </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default GovTechElite;
