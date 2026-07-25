import React, { useState, useEffect } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Wand2, Cpu, Sparkles, Layout, Database, BarChart3, ShieldCheck, Globe, CheckCircle2, Loader2, MessageSquare, Zap, Rocket, Plus, Play, X, Mail, QrCode, Share2, Copy, History, Save, RotateCcw, Scale, Trophy, AlertCircle, DollarSign, PieChart, TrendingUp, Wallet, Download, FileText, Printer, PenTool, Lock, PartyPopper } from "lucide-react";

const ModuleArchitectElite = ({ data = {}, setData }) => {
  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState(null);
  const [deploymentStatus, setDeploymentStatus] = useState("idle");
  const [showMatrixEffect, setShowMatrixEffect] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [signatureText, setSignatureText] = useState("");
  const [versions, setVersions] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleRunDemo = () => {
    setPrompt("");
    const text = "Configuration d'un système de gestion de Port Autonome avec suivi des containers via IoT, gestion des taxes douanières automatisée et IA de prédiction de congestion portuaire.";
    let i = 0;
    const timer = setInterval(() => {
      setPrompt(prev => prev + text[i]);
      i++;
      if (i >= text.length - 1) {
        clearInterval(timer);
        setTimeout(handleAIAnalysis, 500);
      }
    }, 30);
  };

  const handleAIAnalysis = () => {
    if (!prompt) return;
    setIsAnalyzing(true);
    setShowMatrixEffect(true);
    setTimeout(() => {
      const vNum = versions.length + 1;
      const complexity = 40 + Math.random() * 30;
      const costBase = 15000 + (complexity * 500) + (vNum * 2000);
      
      const newConfig = {
        id: Date.now(),
        version: `v${vNum}.0`,
        name: prompt.includes("Port") ? "Port Autonome Strategic Hub" : "Nouveau Centre d'Excellence",
        icon: prompt.includes("Port") ? "🚢" : "💎",
        category: "Logistique & Infrastructures",
        stats: { roi: 75 + Math.random() * 20, complexity: complexity, scalability: 80 + Math.random() * 15 },
        budget: { total: costBase, infra: costBase * 0.4, ai: costBase * 0.35, storage: costBase * 0.15, support: costBase * 0.1 },
        kpis: [
          { label: "Tonnage Hebdomadaire", unit: "tons", value: `${400 + vNum * 10}k` },
          { label: "Temps d'Accostage", unit: "h", value: (14 - vNum * 0.5).toFixed(1) },
          { label: "Revenus Douaniers", unit: "M$", value: (20 + vNum * 2).toFixed(1) }
        ],
        features: ["Suivi IoT Satellite", "Blockchain Customs Trace", "Predictive Docking AI"],
        timestamp: new Date().toLocaleTimeString()
      };
      setGeneratedConfig(newConfig);
      setVersions([newConfig, ...versions]);
      setIsAnalyzing(false);
      setShowMatrixEffect(false);
      setStep(2);
    }, 4000);
  };

  const handleDeploy = () => {
    setDeploymentStatus("deploying");
    setTimeout(() => {
      setDeploymentStatus("success");
      setShowCelebration(true);
      // Reset celebration after some time
      setTimeout(() => setShowCelebration(false), 5000);
    }, 2500);
  };

  const formatCurrency = (val) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-700 relative overflow-hidden">
      {/* Celebration Confetti Effect */}
      {showCelebration && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden animate-in fade-in duration-500">
           <div className="absolute inset-0 bg-purple-600/10 backdrop-blur-[2px]" />
           <div className="relative">
              <div className="absolute -inset-20 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
              <div className="text-center space-y-4 animate-in zoom-in duration-700">
                 <div className="w-32 h-32 bg-white rounded-[40px] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(168,85,247,0.5)] border-4 border-purple-500 relative">
                    <Rocket className="w-16 h-16 text-purple-600 animate-bounce" />
                    <div className="absolute -top-4 -right-4 bg-emerald-500 p-2 rounded-full"><CheckCircle2 className="w-6 h-6 text-white" /></div>
                 </div>
                 <h2 className="text-5xl font-black text-white uppercase tracking-tighter shadow-xl">MISSION ACCOMPLIE</h2>
                 <p className="text-purple-300 font-bold uppercase tracking-widest">Votre Module est désormais en ligne</p>
              </div>
           </div>
           {/* Simulated Particles */}
           {[...Array(20)].map((_, i) => (
             <div 
               key={i} 
               className="absolute w-2 h-2 bg-purple-400 rounded-sm animate-ping"
               style={{ 
                 top: `${Math.random() * 100}%`, 
                 left: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 2}s`,
                 backgroundColor: ['#A855F7', '#3B82F6', '#10B981', '#F59E0B'][i % 4]
               }}
             />
           ))}
        </div>
      )}

      {/* Existing Modals (Share, Quote, etc.) */}
      {showQuoteModal && generatedConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
           <Card className="w-full max-w-3xl bg-white text-slate-900 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-500 relative">
              {isSigned && (
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                   <div className="rotate-12 border-8 border-emerald-500/50 p-4 rounded-3xl animate-in zoom-in duration-500">
                      <div className="border-4 border-emerald-500 p-8 rounded-2xl bg-white/80 backdrop-blur-sm">
                         <p className="text-6xl font-black text-emerald-500 uppercase tracking-tighter">APPROUVÉ</p>
                         <p className="text-center text-xs font-black text-emerald-500 uppercase tracking-widest mt-2">Gravity Diamond Seal</p>
                      </div>
                   </div>
                </div>
              )}
              <div className={`p-10 space-y-8 flex-1 overflow-y-auto custom-scrollbar transition-opacity ${isSigned ? 'opacity-40' : 'opacity-100'}`}>
                 <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8">
                    <div>
                       <h2 className="text-3xl font-black tracking-tighter text-slate-900">GRAVITY ELITE</h2>
                       <p className="text-[10px] font-bold app-text3 uppercase tracking-widest">Solutions de Gouvernance</p>
                    </div>
                    <div className="text-right">
                       <h3 className="text-xl font-black uppercase tracking-widest text-slate-900">Devis Officiel</h3>
                       <p className="text-xs app-text3 mt-1">N° ARC-{generatedConfig.id.toString().slice(-6)}</p>
                    </div>
                 </div>
                 <div className="pt-12 grid grid-cols-2 gap-12">
                    <div className="space-y-4">
                       <p className="text-[10px] font-black app-text2 uppercase tracking-widest">Signature Client</p>
                       {!isSigned ? (
                         <div className="space-y-3">
                            <input type="text" placeholder="Tapez votre nom..." value={signatureText} onChange={(e) => setSignatureText(e.target.value)} className="w-full border-b-2 border-slate-200 py-2 focus:outline-none focus:border-indigo-600 font-mono text-lg" />
                            <Btn variant="primary" className="w-full" onClick={() => setIsSigned(true)} disabled={!signatureText}><PenTool className="w-4 h-4 mr-2" /> Signer & Valider</Btn>
                         </div>
                       ) : (
                         <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 italic font-mono text-xl text-slate-700">{signatureText}</div>
                       )}
                    </div>
                 </div>
              </div>
              <div className="p-8 app-surface border-t app-border flex gap-4">
                 <Btn variant="ghost" className="flex-1 text-xs py-4 text-white" onClick={() => { setShowQuoteModal(false); setIsSigned(false); }}>Fermer</Btn>
              </div>
           </Card>
        </div>
      )}

      {/* Matrix Effect Overlay */}
      {showMatrixEffect && (
        <div className="absolute inset-0 z-40 bg-purple-900/10 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center">
           <Loader2 className="w-16 h-16 text-purple-400 animate-spin mb-4" />
           <p className="text-sm font-black text-purple-400 uppercase tracking-widest animate-pulse">Neural Matrix Synthesis...</p>
        </div>
      )}

      <SectionHeader 
        title="Elite Module Architect™" 
        subtitle="Assistant IA de Création de Centres d'Activité & Dashboards Spécialisés"
        icon={<Wand2 className="w-8 h-8 text-purple-500" />}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Sidebar */}
           {versions.length > 0 && (
              <div className="lg:col-span-1 space-y-6">
                 <p className="text-[10px] font-black app-text3 uppercase tracking-widest flex items-center gap-2"><History className="w-4 h-4" /> Historique</p>
                 <div className="space-y-3">
                    {versions.map((v) => (
                       <button key={v.id} onClick={() => setGeneratedConfig(v)} className={`w-full p-4 rounded-2xl border text-left transition-all ${generatedConfig.id === v.id ? 'app-surface app-border shadow-xl' : 'app-bg app-border hover:app-border'}`}>
                          <div className="flex justify-between items-center mb-1">
                             <span className="text-[10px] font-black text-white">{v.version}</span>
                             <span className="text-[10px] font-black text-emerald-500">{formatCurrency(v.budget.total)}</span>
                          </div>
                          <p className="text-[11px] font-bold app-text2 truncate">{v.name}</p>
                       </button>
                    ))}
                 </div>
              </div>
           )}

           <div className={`${versions.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-6`}>
              {step === 1 ? (
                <Card className="p-12 glass-card app-border bg-gradient-to-br from-slate-900 via-slate-900 to-purple-900/10">
                   <div className="flex justify-between items-start mb-8">
                      <div className="flex gap-6">
                         <div className="w-16 h-16 bg-purple-600/20 rounded-3xl flex items-center justify-center border border-purple-500/30"><Sparkles className="w-8 h-8 text-purple-400" /></div>
                         <div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Décrivez votre Vision</h3>
                         </div>
                      </div>
                      <Btn variant="outline" size="xs" onClick={handleRunDemo}><Play className="w-3 h-3 mr-1" /> Démo Portuaire</Btn>
                   </div>
                   <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Décrivez votre centre d'activité..." className="w-full h-48 app-bg border-2 app-border rounded-[32px] p-8 text-slate-200 text-lg focus:outline-none focus:border-purple-600 transition-all shadow-inner placeholder:text-slate-700" />
                   <Btn variant="primary" className="w-full mt-8 py-8 text-xl font-black rounded-3xl shadow-purple-900/20" onClick={handleAIAnalysis} disabled={isAnalyzing || !prompt}>
                      {isAnalyzing ? <Loader2 className="w-8 h-8 animate-spin" /> : <Zap className="w-8 h-8 mr-3" />}
                      {isAnalyzing ? "Synthèse Neuronale..." : "Générer l'Architecture"}
                   </Btn>
                </Card>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                   <Card className="p-8 glass-card app-border relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-2 h-full bg-purple-600" />
                      <div className="flex justify-between items-start mb-12">
                         <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-[28px] flex items-center justify-center text-4xl shadow-2xl border border-white/10">{generatedConfig.icon}</div>
                            <div>
                               <div className="flex items-center gap-3">
                                  <h3 className="text-3xl font-black text-white tracking-tighter">{generatedConfig.name}</h3>
                                  <Badge variant="primary" className="px-3 py-1 text-xs">{generatedConfig.version}</Badge>
                               </div>
                               <div className="flex gap-4 mt-2">
                                  <span className="text-[10px] font-black app-text3 uppercase flex items-center gap-1"><Database className="w-3 h-3" /> {generatedConfig.category}</span>
                                  <span className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> IA Validée</span>
                               </div>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] font-black app-text3 uppercase mb-1">Investissement</p>
                            <p className="text-3xl font-black text-white tracking-tighter">{formatCurrency(generatedConfig.budget.total)}</p>
                            <Btn variant="outline" size="xs" className="mt-4" onClick={() => setShowQuoteModal(true)}><PenTool className="w-3 h-3 mr-1" /> {isSigned ? "Voir Devis Signé" : "Devis & Signature"}</Btn>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 border-b app-border pb-12">
                         <Card className="p-6 app-surface app-border text-center">
                            <p className="text-[9px] font-black app-text3 uppercase mb-1">ROI Prédit</p>
                            <p className="text-xl font-black text-emerald-500">{generatedConfig.stats.roi.toFixed(0)}%</p>
                         </Card>
                         <Card className="p-6 app-surface app-border text-center">
                            <p className="text-[9px] font-black app-text3 uppercase mb-1">Status Juridique</p>
                            <Badge variant={isSigned ? "success" : "info"} className="mt-2 text-[10px]">{isSigned ? "CONTRAT SIGNÉ" : "EN ATTENTE"}</Badge>
                         </Card>
                         <Card className="p-6 app-surface app-border text-center">
                            <p className="text-[9px] font-black app-text3 uppercase mb-1">IA Verdict</p>
                            <p className="text-xs font-black text-blue-400 mt-2 uppercase tracking-tighter">OPTIMISÉ POUR DÉPLOIEMENT</p>
                         </Card>
                      </div>

                      <div className="mt-12 flex gap-4">
                         {deploymentStatus === 'success' ? (
                           <Btn variant="primary" className="flex-1 py-8 text-2xl font-black bg-emerald-600 shadow-[0_0_50px_rgba(16,185,129,0.4)]" disabled>
                              <PartyPopper className="w-8 h-8 mr-4" /> MODULE OPÉRATIONNEL
                           </Btn>
                         ) : (
                           <Btn variant="primary" className="flex-1 py-8 text-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_50px_rgba(147,51,234,0.4)]" onClick={handleDeploy} disabled={!isSigned || deploymentStatus === 'deploying'}>
                              {deploymentStatus === 'deploying' ? <Loader2 className="w-8 h-8 animate-spin" /> : <Rocket className="w-8 h-8 mr-4" />}
                              {deploymentStatus === 'deploying' ? "INJECTION..." : "LANCER LE DÉPLOIEMENT ÉLITE"}
                           </Btn>
                         )}
                         <Btn variant="outline" className="px-10" onClick={() => setShowShareModal(true)}><Share2 className="w-6 h-6" /></Btn>
                      </div>
                   </Card>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleArchitectElite;
