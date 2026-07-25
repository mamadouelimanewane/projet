import React, { useState, useEffect } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Wallet, CreditCard, ArrowUpRight, ArrowDownLeft, ShieldCheck, Zap, Smartphone, QrCode, TrendingUp, Landmark, Repeat, DollarSign, PieChart, Sparkles, Lock, Bell } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const FinTechElite = ({ data = {}, setData }) => {
  const [balance, setBalance] = useState(12450.75);
  const [activeTab, setActiveTab] = useState("wallet");
  const [creditScore, setCreditScore] = useState(780);

  const transactions = [
    { id: 1, type: 'in', label: 'Vente Maïs - Récolte Mai', amount: 4500, date: 'Aujourd\'hui', category: 'Agri' },
    { id: 2, type: 'out', label: 'Paiement Engrais', amount: 850, date: 'Hier', category: 'Intrants' },
    { id: 3, type: 'in', label: 'Micro-Crédit Approuvé', amount: 2000, date: '12 Mai', category: 'Banque' },
    { id: 4, type: 'out', label: 'Salaire Ouvriers', amount: 1200, date: '10 Mai', category: 'RH' },
  ];

  const cashflowData = [
    { name: 'Lun', val: 400 }, { name: 'Mar', val: 700 }, { name: 'Mer', val: 500 },
    { name: 'Jeu', val: 1200 }, { name: 'Ven', val: 1100 }, { name: 'Sam', val: 1500 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-700">
      <SectionHeader 
        title="Elite Fintech Command" 
        subtitle="Banking Mobile, Micro-Crédit IA & Gestion des Flux Financiers"
        icon={<Landmark className="w-8 h-8 text-amber-500" />}
      />

      {/* Main Wallet View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Premium Card & Balance */}
         <Card className="lg:col-span-1 p-8 bg-gradient-to-br from-indigo-900 via-slate-900 to-amber-900/20 border-white/10 relative overflow-hidden flex flex-col justify-between h-[450px]">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Sparkles className="w-32 h-32 text-amber-400" />
            </div>
            
            <div className="z-10 flex justify-between items-start">
               <div>
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Compte Business Elite</p>
                  <h3 className="text-3xl font-black text-white mt-1">{balance.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}</h3>
               </div>
               <div className="w-12 h-8 bg-amber-500/20 rounded-lg border border-amber-500/30 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-amber-500" />
               </div>
            </div>

            <div className="z-10 space-y-4">
               <div className="flex gap-2">
                  <Btn variant="primary" className="flex-1 bg-amber-500 hover:bg-amber-600 border-none text-xs"><ArrowUpRight className="w-4 h-4 mr-2" /> Envoyer</Btn>
                  <Btn variant="outline" className="flex-1 border-white/10 text-white text-xs"><ArrowDownLeft className="w-4 h-4 mr-2" /> Recevoir</Btn>
               </div>
               <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-[10px] font-bold app-text2">Capacité d'Emprunt IA</span>
                     <Badge variant="success" className="bg-amber-500/10 text-amber-500 border-amber-500/20">SCORE: {creditScore}</Badge>
                  </div>
                  <div className="h-2 app-surface2 rounded-full overflow-hidden">
                     <div className="h-full bg-amber-500 w-[78%]" />
                  </div>
                  <p className="text-[9px] app-text3 mt-2 italic">Basé sur vos récoltes et historiques de ventes.</p>
               </div>
            </div>

            <div className="z-10 pt-4 flex justify-between items-end border-t border-white/5">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 app-surface2" />)}
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-amber-500 flex items-center justify-center text-[10px] font-black">+5</div>
               </div>
               <p className="text-[8px] font-black app-text3 uppercase">Partenaires Bancaires Actifs</p>
            </div>
         </Card>

         {/* Transactions & Cashflow */}
         <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="p-6 glass-card app-border h-[220px]">
                  <div className="flex justify-between items-center mb-6">
                     <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2"><Repeat className="w-4 h-4 text-indigo-400" /> Flux de Trésorerie</h4>
                     <Badge variant="info">Hebdo</Badge>
                  </div>
                  <div className="h-32">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={cashflowData}>
                           <defs>
                              <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <Area type="monotone" dataKey="val" stroke="#6366f1" fill="url(#colorCash)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </Card>

               <Card className="p-6 glass-card app-border h-[220px] flex flex-col justify-center items-center text-center bg-gradient-to-br from-slate-900 to-amber-900/10">
                  <div className="w-16 h-16 bg-amber-500/10 rounded-3xl flex items-center justify-center border border-amber-500/30 mb-4">
                     <QrCode className="w-8 h-8 text-amber-500" />
                  </div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tighter">Payer par QR Code</h4>
                  <p className="text-[10px] app-text3 mt-1">Acceptez ou envoyez des paiements instantanés sur le terrain.</p>
                  <Btn variant="ghost" size="xs" className="mt-4 text-amber-500 border-amber-500/20">Générer mon Code</Btn>
               </Card>
            </div>

            <Card className="p-6 glass-card app-border overflow-hidden">
               <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">Transactions Récentes</h4>
                  <Btn variant="ghost" size="xs">Extraire Relevé</Btn>
               </div>
               <div className="space-y-4">
                  {transactions.map(t => (
                    <div key={t.id} className="flex justify-between items-center p-3 app-bg border border-slate-900 rounded-xl hover:border-indigo-500/30 transition-all group">
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'in' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                             {t.type === 'in' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                          </div>
                          <div>
                             <p className="text-xs font-black text-white group-hover:text-indigo-400 transition-colors">{t.label}</p>
                             <p className="text-[10px] app-text3 uppercase font-bold">{t.category} • {t.date}</p>
                          </div>
                       </div>
                       <p className={`text-sm font-black ${t.type === 'in' ? 'text-emerald-500' : 'text-white'}`}>
                          {t.type === 'in' ? '+' : '-'}{t.amount.toLocaleString()} FCFA
                       </p>
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>

      {/* Strategic Banking Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
         <Card className="p-6 app-border app-surface flex flex-col items-center text-center">
            <Smartphone className="w-10 h-10 text-indigo-400 mb-4" />
            <h5 className="text-xs font-black text-white uppercase mb-2">Micro-Crédit Agri</h5>
            <p className="text-[10px] app-text3">Demandez un financement en 30s basé sur vos prévisions de récolte.</p>
            <Btn variant="outline" size="xs" className="mt-4 border-indigo-500/20 text-indigo-400">Demander</Btn>
         </Card>
         <Card className="p-6 app-border app-surface flex flex-col items-center text-center">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mb-4" />
            <h5 className="text-xs font-black text-white uppercase mb-2">Assurance Paramétrique</h5>
            <p className="text-[10px] app-text3">Indemnisation automatique par satellite en cas de sécheresse.</p>
            <Btn variant="outline" size="xs" className="mt-4 border-emerald-500/20 text-emerald-400">Vérifier</Btn>
         </Card>
         <Card className="p-6 app-border app-surface flex flex-col items-center text-center">
            <PieChart className="w-10 h-10 text-amber-400 mb-4" />
            <h5 className="text-xs font-black text-white uppercase mb-2">Épargne de Précision</h5>
            <p className="text-[10px] app-text3">Épargnez automatiquement une partie de chaque vente.</p>
            <Btn variant="outline" size="xs" className="mt-4 border-amber-500/20 text-amber-400">Configurer</Btn>
         </Card>
      </div>
    </div>
  );
};

export default FinTechElite;
