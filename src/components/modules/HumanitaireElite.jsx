import React, { useState, useEffect } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Heart, Globe, AlertTriangle, Truck, Package, ShieldCheck, Zap, Users, MapPin, Activity, Landmark, DollarSign, PieChart, FileText, CheckCircle2, Search, Download, Send, Eye, X, Loader2, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis, Legend, PieChart as RePieChart, Pie, Cell } from 'recharts';

const HumanitaireElite = ({ data = {}, setData }) => {
  const [selectedSector, setSelectedSector] = useState("Tous");
  const [activeDonor, setActiveDonor] = useState("Tous");
  const [showReportModal, setShowReportModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const sectors = [
    { id: "agri", label: "Agriculture", icon: "🌱", color: "#10b981" },
    { id: "sante", label: "Santé", icon: "🏥", color: "#f43f5e" },
    { id: "eau", label: "Assainissement", icon: "💧", color: "#3b82f6" },
    { id: "edu", label: "Éducation", icon: "📚", color: "#6366f1" },
  ];

  const donors = [
    { name: "USAID", funds: 12.5, projects: 4, logo: "🇺🇸" },
    { name: "Union Européenne", funds: 8.2, projects: 3, logo: "🇪🇺" },
    { name: "Banque Mondiale", funds: 15.0, projects: 6, logo: "🏛️" },
    { name: "AFD", funds: 5.4, projects: 2, logo: "🇫🇷" },
    { name: "Fondation Gates", funds: 7.8, projects: 3, logo: "🧬" },
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowReportModal(true);
    }, 2000);
  };

  const projectImpact = [
    { sector: 'Agriculture', beneficiaries: 450, cost: 120, impact: 85 },
    { sector: 'Santé', beneficiaries: 320, cost: 240, impact: 92 },
    { sector: 'Assainissement', beneficiaries: 800, cost: 180, impact: 78 },
    { sector: 'Éducation', beneficiaries: 150, cost: 90, impact: 95 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700 relative">
      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <Card className="w-full max-w-2xl app-surface app-border shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b app-border flex justify-between items-center bg-indigo-600/10">
                 <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-indigo-400" />
                    <div>
                       <h3 className="text-lg font-black text-white">Rapport d'Impact Mission #442</h3>
                       <p className="text-[10px] app-text2 uppercase font-bold tracking-widest text-indigo-400">Généré par Gravity NGO AI</p>
                    </div>
                 </div>
                 <button onClick={() => setShowReportModal(false)} className="p-2 hover:app-surface2 rounded-full transition-colors app-text3">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white/5 custom-scrollbar">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                       <p className="text-[9px] font-black app-text3 uppercase">Bailleur Principal</p>
                       <p className="text-sm font-bold text-white flex items-center gap-2">🇺🇸 USAID International</p>
                    </div>
                    <div className="space-y-1 text-right">
                       <p className="text-[9px] font-black app-text3 uppercase">Période</p>
                       <p className="text-sm font-bold text-white uppercase">Q2 - 2026</p>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <p className="text-[9px] font-black app-text3 uppercase border-b app-border pb-1">Résumé Exécutif</p>
                    <p className="text-xs app-text leading-relaxed">
                       La mission de développement agricole en Zone Nord a atteint 92% de ses objectifs initiaux. Le déploiement des nouvelles semences résistantes a bénéficié à 12,450 foyers ruraux. Les audits financiers confirment une transparence totale avec un taux de conformité documentaire de 100%.
                    </p>
                 </div>
                 <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 app-surface2 rounded-2xl text-center border app-border">
                       <p className="text-lg font-black text-emerald-400">+15%</p>
                       <p className="text-[8px] font-black app-text3 uppercase">Production</p>
                    </div>
                    <div className="p-4 app-surface2 rounded-2xl text-center border app-border">
                       <p className="text-lg font-black text-blue-400">12k+</p>
                       <p className="text-[8px] font-black app-text3 uppercase">Bénéficiaires</p>
                    </div>
                    <div className="p-4 app-surface2 rounded-2xl text-center border app-border">
                       <p className="text-lg font-black text-amber-400">98%</p>
                       <p className="text-[8px] font-black app-text3 uppercase">Satisfaction</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[9px] font-black app-text3 uppercase border-b app-border pb-1">Preuves d'Exécution</p>
                    <div className="grid grid-cols-4 gap-2">
                       {[1,2,3,4].map(i => (
                         <div key={i} className="aspect-square app-surface2 rounded-lg flex items-center justify-center text-slate-600 border app-border italic text-[8px]">Photo_{i}.jpg</div>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="p-6 border-t app-border flex gap-3 app-surface">
                 <Btn variant="ghost" className="flex-1 text-xs py-3"><Download className="w-4 h-4 mr-2" /> PDF</Btn>
                 <Btn variant="primary" className="flex-[2] text-xs py-3 shadow-[0_0_20px_rgba(99,102,241,0.3)]"><Send className="w-4 h-4 mr-2" /> Envoyer au Bailleur</Btn>
              </div>
           </Card>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <SectionHeader 
          title="NGO Multi-Donor Command™" 
          subtitle="Pilotage de Projets de Développement & Transparence Bailleurs"
          icon={<Heart className="w-8 h-8 text-rose-500" />}
        />
        <div className="flex items-center gap-2">
           <Btn 
             variant="primary" 
             size="xs" 
             onClick={handleGenerateReport}
             disabled={isGenerating}
           >
              {isGenerating ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <FileText className="w-3 h-3 mr-1" />}
              {isGenerating ? "Génération..." : "Générer Rapport Mission"}
           </Btn>
           <Btn variant="outline" size="xs"><ShieldCheck className="w-3 h-3 mr-1" /> Audit Ready</Btn>
        </div>
      </div>

      {/* Sector Quick Access */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sectors.map((s) => (
          <button 
            key={s.id}
            onClick={() => setSelectedSector(s.label)}
            className={`p-4 rounded-3xl border-2 transition-all flex items-center gap-4 ${selectedSector === s.label ? 'app-surface border-rose-500 shadow-xl' : 'app-surface app-border hover:app-border'}`}
          >
             <div className="text-2xl">{s.icon}</div>
             <div className="text-left">
                <p className="text-[10px] font-black app-text3 uppercase tracking-widest">Secteur</p>
                <p className="text-xs font-black text-white">{s.label}</p>
             </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Impact Chart */}
        <Card className="lg:col-span-2 p-6 glass-card app-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
              <PieChart className="w-4 h-4 text-rose-500" />
              Répartition & Impact des Financements
            </h3>
            <div className="flex gap-4 items-center">
               <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full app-surface2"></div>
                  <span className="text-[9px] app-text3 font-bold uppercase">Coût (M$)</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <span className="text-[9px] app-text3 font-bold uppercase">Bénéficiaires (k)</span>
               </div>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectImpact} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="sector" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                <Bar dataKey="cost" name="Budget Engagé" fill="#1e293b" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="beneficiaries" name="Bénéficiaires (k)" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Donor Portfolio */}
        <Card className="p-6 glass-card app-border flex flex-col">
          <h3 className="text-sm font-black uppercase tracking-tighter mb-6 flex items-center gap-2 text-blue-400">
            <Landmark className="w-4 h-4" />
            Portefeuille Bailleurs
          </h3>
          <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
             {donors.map((donor, i) => (
               <div key={i} className="p-3 app-surface border app-border rounded-2xl hover:border-blue-500/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-3">
                        <span className="text-lg">{donor.logo}</span>
                        <div>
                           <p className="text-[11px] font-black text-white">{donor.name}</p>
                           <p className="text-[9px] app-text3 uppercase">{donor.projects} Projets Actifs</p>
                        </div>
                     </div>
                     <span className="text-xs font-black text-blue-400">{donor.funds} M$</span>
                  </div>
               </div>
             ))}
          </div>
          <div className="mt-6 pt-6 border-t app-border text-center">
             <Btn variant="ghost" size="xs" className="w-full">Voir Historique Financements</Btn>
          </div>
        </Card>
      </div>

      {/* Financial Traceability & Audit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="p-6 glass-card app-border bg-gradient-to-br from-slate-900 to-rose-900/10">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
                 Traçabilité & Compliance (Audit-Ready)
               </h3>
               <Badge variant="success">ISO 9001</Badge>
            </div>
            <div className="space-y-4">
               {[
                 { title: "Justificatifs Mission Casamance", donor: "USAID", status: "Validé", date: "Hier" },
                 { title: "Rapport Trimestriel Santé", donor: "Banque Mondiale", status: "En Cours", date: "J-2" },
                 { title: "Preuve de Paiement Fournisseurs", donor: "AFD", status: "Signé", date: "12 Mai" },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 app-surface border app-border rounded-2xl hover:border-emerald-500/20 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                          <CheckCircle2 className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-white">{item.title}</p>
                          <p className="text-[9px] app-text3 uppercase">{item.donor} | {item.date}</p>
                       </div>
                    </div>
                    <Badge variant={item.status === 'Validé' ? 'success' : 'info'}>{item.status}</Badge>
                 </div>
               ))}
            </div>
         </Card>

         <Card className="p-6 glass-card app-border">
            <h3 className="text-sm font-black uppercase tracking-tighter mb-6 flex items-center gap-2 text-rose-500">
              <Zap className="w-4 h-4" />
              Indicateurs d'Impact Globaux
            </h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 app-surface border app-border rounded-2xl text-center">
                  <p className="text-[9px] font-black app-text3 uppercase mb-2 tracking-widest">Hectares Cultivés</p>
                  <p className="text-2xl font-black text-white">12,450</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                     <TrendingUp className="w-3 h-3 text-emerald-500" />
                     <span className="text-[9px] font-bold text-emerald-400">+15%</span>
                  </div>
               </div>
               <div className="p-4 app-surface border app-border rounded-2xl text-center">
                  <p className="text-[9px] font-black app-text3 uppercase mb-2 tracking-widest">Enfants Scolarisés</p>
                  <p className="text-2xl font-black text-white">45.2k</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                     <Users className="w-3 h-3 text-blue-400" />
                     <span className="text-[9px] font-bold text-blue-400">88% Target</span>
                  </div>
               </div>
               <div className="p-4 app-surface border app-border rounded-2xl text-center">
                  <p className="text-[9px] font-black app-text3 uppercase mb-2 tracking-widest">Points d'Eau Créés</p>
                  <p className="text-2xl font-black text-white">124</p>
                  <Badge variant="info" className="mt-1 text-[7px]">Secteur: Assainissement</Badge>
               </div>
               <div className="p-4 app-surface border app-border rounded-2xl text-center flex flex-col justify-center items-center">
                  <Globe className="w-6 h-6 text-indigo-400 mb-2" />
                  <p className="text-[9px] font-black text-white uppercase">14 Pays Actifs</p>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
};

export default HumanitaireElite;
