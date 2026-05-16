import React, { useState, useEffect } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Sprout, CloudSun, Droplets, TrendingUp, Map, Thermometer, Shovel, ShoppingCart, BarChart3, Globe, ShieldCheck, Sparkles, Satellite, Wind } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AgriTechElite = ({ data = {}, setData }) => {
  const [activeTab, setActiveTab] = useState("surveillance");
  const [isSimulating, setIsSimulating] = useState(true);
  const [metrics, setMetrics] = useState({
    humidity: 64,
    temperature: 28.5,
    yield: 8.2,
    soilHealth: 92
  });

  // Simulation de données en direct
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setMetrics(prev => ({
        humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() - 0.5))),
        temperature: prev.temperature + (Math.random() - 0.5) * 0.2,
        yield: prev.yield + (Math.random() - 0.5) * 0.05,
        soilHealth: Math.min(100, prev.soilHealth + (Math.random() - 0.5))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const yieldData = [
    { month: 'Jan', yield: 4.2 }, { month: 'Fév', yield: 4.8 }, { month: 'Mar', yield: 5.5 },
    { month: 'Avr', yield: 6.2 }, { month: 'Mai', yield: 7.8 }, { month: 'Juin', yield: 8.2 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-700">
      <SectionHeader 
        title="AgriTech Elite Command" 
        subtitle="Pilotage de Précision, Surveillance Satellite & Optimisation des Rendements"
        icon={<Sprout className="w-8 h-8 text-emerald-500" />}
      />

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: "Humidité du Sol", value: `${metrics.humidity.toFixed(1)}%`, icon: <Droplets className="text-blue-400" />, trend: "+2%" },
           { label: "Température Air", value: `${metrics.temperature.toFixed(1)}°C`, icon: <Thermometer className="text-orange-400" />, trend: "-0.5°C" },
           { label: "Rendement Prédit", value: `${metrics.yield.toFixed(1)} t/ha`, icon: <TrendingUp className="text-emerald-400" />, trend: "+12%" },
           { label: "Santé des Sols", value: `${metrics.soilHealth.toFixed(0)}%`, icon: <Shovel className="text-amber-600" />, trend: "Optimal" },
         ].map((stat, i) => (
           <Card key={i} className="p-4 glass-card border-emerald-500/10 bg-gradient-to-br from-slate-900 to-emerald-900/10">
              <div className="flex justify-between items-start mb-2">
                 <div className="p-2 bg-emerald-500/10 rounded-lg">{stat.icon}</div>
                 <Badge variant="success" className="text-[8px]">{stat.trend}</Badge>
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-white mt-1">{stat.value}</p>
           </Card>
         ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Satellite View & IA Analysis */}
         <Card className="lg:col-span-2 p-6 glass-card border-slate-800 flex flex-col h-[500px]">
            <div className="flex justify-between items-center mb-6">
               <div className="flex gap-4">
                  <button onClick={() => setActiveTab("surveillance")} className={`text-xs font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${activeTab === "surveillance" ? "border-emerald-500 text-white" : "border-transparent text-slate-500"}`}>Surveillance Satellite</button>
                  <button onClick={() => setActiveTab("ia")} className={`text-xs font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${activeTab === "ia" ? "border-emerald-500 text-white" : "border-transparent text-slate-500"}`}>Prévision IA</button>
               </div>
               <Badge variant="info" className="flex items-center gap-1"><Satellite className="w-3 h-3" /> Live Sentinel-2</Badge>
            </div>

            <div className="flex-1 relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800">
               {activeTab === "surveillance" ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000')] bg-cover opacity-30 grayscale" />
                    <div className="z-10 bg-emerald-600/20 backdrop-blur-md p-6 rounded-3xl border border-emerald-500/30">
                       <Map className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                       <h4 className="text-xl font-black text-white uppercase tracking-tighter">Cartographie NDVI Active</h4>
                       <p className="text-xs text-slate-300 max-w-xs mt-2">Analyse de la vigueur de la végétation par télédétection satellite.</p>
                       <Btn variant="primary" className="mt-6 text-xs px-8">Lancer Scan Drone</Btn>
                    </div>
                 </div>
               ) : (
                 <div className="p-6 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={yieldData}>
                          <defs>
                             <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                          <YAxis stroke="#64748b" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                          <Area type="monotone" dataKey="yield" stroke="#10B981" fillOpacity={1} fill="url(#colorYield)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
               )}
            </div>
         </Card>

         {/* Smart Insights & Alerts */}
         <div className="space-y-6">
            <Card className="p-6 glass-card border-slate-800 bg-emerald-950/10">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-500"><Sparkles className="w-5 h-5" /></div>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest">Conseils IA Agri</h4>
               </div>
               <div className="space-y-4">
                  <div className="p-4 bg-slate-900/50 border-l-4 border-emerald-500 rounded-r-2xl">
                     <p className="text-xs font-bold text-white mb-1">Optimisation d'Irrigation</p>
                     <p className="text-[10px] text-slate-400 leading-relaxed">Précipitations prévues dans 48h. Réduction conseillée de l'irrigation de 15% pour préserver les nappes.</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 border-l-4 border-amber-500 rounded-r-2xl">
                     <p className="text-xs font-bold text-white mb-1">Alerte NPK</p>
                     <p className="text-[10px] text-slate-400 leading-relaxed">Carence en Azote détectée sur le secteur Nord-Est. Apport recommandé : 12kg/ha.</p>
                  </div>
               </div>
            </Card>

            <Card className="p-6 glass-card border-slate-800 flex flex-col items-center text-center justify-center space-y-4">
               <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center border-4 border-emerald-500/20 relative">
                  <div className="absolute inset-0 border-t-4 border-emerald-500 rounded-full animate-spin" />
                  <Wind className="w-8 h-8 text-emerald-400" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase">Station Météo Locale</p>
                  <p className="text-lg font-black text-white mt-1">24 km/h - NE</p>
                  <p className="text-[10px] text-slate-400">Pression : 1012 hPa</p>
               </div>
            </Card>
         </div>
      </div>

      {/* Bottom Grid: Market & Supply */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="p-6 glass-card border-slate-800">
            <div className="flex justify-between items-center mb-6">
               <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2"><ShoppingCart className="w-4 h-4 text-emerald-500" /> Marketplace Producteurs</h4>
               <Btn variant="ghost" size="xs">Voir tout</Btn>
            </div>
            <div className="space-y-3">
               {[
                 { item: "Maïs Premium", qty: "45 tons", price: "280€/t", trend: "up" },
                 { item: "Engrais Bio NPK", qty: "12 tons", price: "450€/t", trend: "down" },
               ].map((m, i) => (
                 <div key={i} className="flex justify-between items-center p-3 bg-slate-950 border border-slate-900 rounded-xl">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-emerald-500" />
                       <span className="text-xs font-bold text-slate-300">{m.item}</span>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-black text-white">{m.price}</p>
                       <p className="text-[9px] text-slate-500">Disp: {m.qty}</p>
                    </div>
                 </div>
               ))}
            </div>
         </Card>
         <Card className="p-6 glass-card border-slate-800 flex flex-col justify-center bg-gradient-to-br from-slate-900 to-indigo-900/10">
            <div className="text-center space-y-4">
               <Globe className="w-12 h-12 text-indigo-400 mx-auto" />
               <h4 className="text-lg font-black text-white uppercase tracking-tighter">Export & Logistique Elite</h4>
               <p className="text-xs text-slate-400 max-w-xs mx-auto">Connectez vos récoltes aux marchés internationaux via notre tunnel logistique certifié Blockchain.</p>
               <Btn variant="primary" className="w-full bg-indigo-600 border-none">Gérer les Exportations</Btn>
            </div>
         </Card>
      </div>
    </div>
  );
};

export default AgriTechElite;
