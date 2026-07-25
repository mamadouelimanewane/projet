import React, { useState, useMemo } from "react";
import { SectionHeader, Card, Btn, TooltipInfo, Badge } from "../ui";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { Sparkles, ShieldCheck, Zap, Layers, Globe, Cpu } from "lucide-react";
import useStore from "../../store/useStore";

// ─── MOCK BLOCKCHAIN DATA ───
const BLOCKCHAIN_LOGS = [
  { id: "0x8a2f", event: "Validation Charte Projet", actor: "M. Wane", timestamp: "2026-05-10 14:20", hash: "a7b8...c9d0" },
  { id: "0x3e1d", event: "Approbation Budget V1", actor: "Finance Dir.", timestamp: "2026-05-11 09:15", hash: "3f2e...1a4b" },
  { id: "0x9c4b", event: "Clôture Phase Étude Tech", actor: "Ing. BTP", timestamp: "2026-05-11 16:45", hash: "9d8c...7e6f" },
];

export default function EliteInnovation() {
  const { data } = useStore();
  const [tab, setTab] = useState("warroom");
  const [certifying, setCertifying] = useState(false);
  const [certified, setCertified] = useState(false);

  // ─── 3D TOPOLOGY DATA ───
  const topologyData = useMemo(() => {
    return [
      { subject: 'Budget', A: 85, B: 110, fullMark: 150 },
      { subject: 'Délais', A: 98, B: 130, fullMark: 150 },
      { subject: 'Qualité', A: 86, B: 130, fullMark: 150 },
      { subject: 'Ressources', A: 99, B: 100, fullMark: 150 },
      { subject: 'Risques', A: 20, B: 40, fullMark: 150 },
      { subject: 'Scope', A: 65, B: 85, fullMark: 150 },
    ];
  }, []);

  const handleCertify = () => {
    setCertifying(true);
    setTimeout(() => {
      setCertifying(false);
      setCertified(true);
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-entrance max-w-6xl mx-auto">
      <SectionHeader
        title={<div className="flex items-center gap-3">
          <Sparkles className="text-amber-400 w-8 h-8 animate-pulse" />
          <span>Elite Innovation Lab</span>
          <TooltipInfo term="Elite Innovation" definition="Le summum de l'intelligence projet : topologies 3D, confiance numérique certifiée et simulations prédictives." />
        </div>}
        subtitle="Technologies de pointe pour la gouvernance de projets complexes"
      />

      <div className="flex gap-2 flex-wrap border-b app-border pb-4">
        {[
          { id: "warroom", label: "🌐 War Room 3D", icon: <Globe className="w-4 h-4" /> },
          { id: "trust", label: "💎 Sceau de Diamant", icon: <ShieldCheck className="w-4 h-4" /> },
          { id: "predictive", label: "⚡ Simulations IA", icon: <Zap className="w-4 h-4" /> },
        ].map(t => (
          <Btn key={t.id} variant={tab === t.id ? "primary" : "ghost"} size="sm" onClick={() => setTab(t.id)}>
            <div className="flex items-center gap-2">{t.icon} {t.label}</div>
          </Btn>
        ))}
      </div>

      {/* ── WAR ROOM 3D ── */}
      {tab === "warroom" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-entrance">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 app-surface app-border relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all duration-700" />
              <p className="text-[10px] font-black app-text3 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Layers className="w-3 h-3" /> Topologie de Santé du Portfolio
              </p>
              
              <div className="flex justify-center py-4 relative">
                {/* 3D Visual Effect Container */}
                <div className="w-full max-w-[500px] aspect-square relative perspective-1000">
                  <div className="absolute inset-0 flex items-center justify-center transform rotateX-45 rotateZ-45">
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={topologyData}>
                          <PolarGrid stroke="#334155" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 800 }} />
                          <Radar name="Actuel" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                          <Radar name="Cible" dataKey="B" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeDasharray="4 4" />
                        </RadarChart>
                     </ResponsiveContainer>
                  </div>
                  {/* Floating labels for 3D effect */}
                  <div className="absolute top-0 right-0 p-4 glass-card rounded-xl border border-white/5 animate-float">
                    <p className="text-[10px] app-text3 uppercase font-black">Score de Résilience</p>
                    <p className="text-2xl font-black text-emerald-400">84.2</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-indigo-900/20 to-slate-900 border-indigo-500/20">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-400" /> Géolocalisation BIM
                </h4>
                <p className="text-xs app-text2 mb-4">Visualisation temps-réel de l'avancement physique du chantier (Star Academy).</p>
                <div className="h-32 app-surface2 rounded-xl border app-border flex items-center justify-center overflow-hidden relative">
                   <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                   <div className="w-20 h-20 border-4 border-indigo-500/30 rounded-lg animate-spin-slow"></div>
                   <span className="absolute text-[10px] font-black text-indigo-300">MODÈLE 3D CHARGÉ</span>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-purple-900/20 to-slate-900 border-purple-500/20">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" /> Analyse de Flux
                </h4>
                <p className="text-xs app-text2 mb-4">Optimisation automatique de l'allocation des ressources via moteur IA.</p>
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] app-text3 font-bold uppercase"><span>RH</span><span>92%</span></div>
                   <div className="h-1.5 app-surface2 rounded-full overflow-hidden"><div className="h-full bg-purple-500 w-[92%]"></div></div>
                   <div className="flex justify-between text-[10px] app-text3 font-bold uppercase mt-2"><span>Matériel</span><span>65%</span></div>
                   <div className="h-1.5 app-surface2 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[65%]"></div></div>
                </div>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 app-border">
              <h3 className="text-xs font-black app-text3 uppercase tracking-widest mb-6">Alertes Stratégiques</h3>
              <div className="space-y-4">
                {[
                  { label: "Saturation Ressources", color: "text-red-400", bg: "bg-red-400/10", icon: "🔴" },
                  { label: "Optimisation Budget", color: "text-emerald-400", bg: "bg-emerald-400/10", icon: "🟢" },
                  { label: "Risque de Glissement", color: "text-amber-400", bg: "bg-amber-400/10", icon: "🟡" },
                ].map((a, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border border-white/5 ${a.bg}`}>
                    <span className="text-lg">{a.icon}</span>
                    <span className={`text-xs font-bold ${a.color}`}>{a.label}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6 bg-amber-500/5 border-amber-500/20">
              <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3">Recommandation Lab</p>
              <p className="text-xs text-amber-200/80 leading-relaxed italic">
                "Le modèle prédictif suggère de réallouer 15% du budget 'Marketing' vers 'Infrastructure BTP' pour sécuriser le jalon de Septembre."
              </p>
            </Card>
          </div>
        </div>
      )}

      {/* ── SCEAU DE DIAMANT ── */}
      {tab === "trust" && (
        <div className="space-y-8 animate-entrance max-w-4xl mx-auto">
          <Card className="p-10 text-center bg-gradient-to-br from-slate-900 to-slate-950 border-2 app-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            
            {!certified ? (
              <>
                <div className="w-24 h-24 rounded-full app-surface2 flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/10">
                  <ShieldCheck className={`w-12 h-12 ${certifying ? 'text-indigo-400 animate-spin' : 'text-slate-600'}`} />
                </div>
                <h2 className="text-2xl font-black text-white mb-4">Sceau de Diamant</h2>
                <p className="text-sm app-text2 mb-8 max-w-md mx-auto">
                  Certifiez l'intégrité de votre projet. Ce processus ancre les données financières et stratégiques dans un registre décentralisé pour une transparence totale.
                </p>
                <Btn variant="primary" size="lg" disabled={certifying} onClick={handleCertify}>
                  {certifying ? "Certification en cours..." : "Lancer la Certification Élite"}
                </Btn>
              </>
            ) : (
              <div className="animate-entrance">
                <div className="w-24 h-24 rounded-full bg-indigo-600/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(79,70,229,0.3)] border border-indigo-500">
                  <Sparkles className="w-12 h-12 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">Projet Certifié Élite</h2>
                <p className="text-sm text-emerald-400 font-bold mb-6">ID de Bloc : #ELITE-2026-9912-AF</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-black">
                  <ShieldCheck className="w-4 h-4" /> AUTHENTICITÉ GARANTIE
                </div>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div className="p-4 app-surface2 rounded-xl border border-white/5">
                    <p className="text-[10px] app-text3 font-black uppercase mb-1">Preuve de Travail</p>
                    <p className="text-xs app-text">PMBOK Compliance: 98%</p>
                  </div>
                  <div className="p-4 app-surface2 rounded-xl border border-white/5">
                    <p className="text-[10px] app-text3 font-black uppercase mb-1">Preuve d'Enjeu</p>
                    <p className="text-xs app-text">Budget Audité: 1.2B FCFA</p>
                  </div>
                  <div className="p-4 app-surface2 rounded-xl border border-white/5">
                    <p className="text-[10px] app-text3 font-black uppercase mb-1">Digital Identity</p>
                    <p className="text-xs app-text">Signé par M. Wane</p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <div className="space-y-4">
             <p className="text-[10px] font-black app-text3 uppercase tracking-widest px-2">Registre des Événements Certifiés (Blockchain Log)</p>
             {BLOCKCHAIN_LOGS.map((log, i) => (
               <div key={i} className="flex items-center gap-4 p-4 glass-card rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all">
                 <div className="w-10 h-10 rounded-lg app-surface2 flex items-center justify-center text-[10px] font-mono text-indigo-400 border app-border">{log.id}</div>
                 <div className="flex-1">
                   <p className="text-sm font-bold text-white">{log.event}</p>
                   <p className="text-[10px] app-text3">{log.actor} · {log.timestamp}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] font-mono text-slate-600 mb-1">{log.hash}</p>
                   <Badge value="Vérifié" />
                 </div>
               </div>
             ))}
          </div>
        </div>
      )}

      {/* ── PREDICTIVE ── */}
      {tab === "predictive" && (
        <div className="space-y-6 animate-entrance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-lg font-black text-white mb-2">Simulations Monte-Carlo</h3>
              <p className="text-sm app-text2 mb-6">Calcul de la probabilité de réussite sur 10 000 itérations aléatoires.</p>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={[
                  {x: 0, y: 0}, {x: 10, y: 5}, {x: 20, y: 15}, {x: 30, y: 40}, {x: 40, y: 80}, {x: 50, y: 100}, {x: 60, y: 80}, {x: 70, y: 40}, {x: 80, y: 10}, {x: 100, y: 0}
                ]}>
                  <Area type="monotone" dataKey="y" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                  <Tooltip labelFormatter={() => "Confiance"} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 flex justify-between items-end">
                <div>
                  <p className="text-[10px] app-text3 font-black uppercase">Probabilité Succès</p>
                  <p className="text-3xl font-black text-indigo-400">82%</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] app-text3 font-black uppercase">Écart-Type</p>
                  <p className="text-lg font-black app-text">+/- 12 jours</p>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 border-indigo-500/20 bg-indigo-500/5">
                <h4 className="text-sm font-bold text-white mb-4">Stratégies d'Optimisation IA</h4>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 rounded-lg app-surface2 border app-border hover:border-indigo-500 transition-all">
                    <p className="text-xs font-bold text-white">1. Fast-Tracking (Parallélisation)</p>
                    <p className="text-[10px] app-text3">Gain estimé : 18 jours · Risque Qualité : +15%</p>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg app-surface2 border app-border hover:border-indigo-500 transition-all">
                    <p className="text-xs font-bold text-white">2. Crashing (Injection Ressources)</p>
                    <p className="text-[10px] app-text3">Gain estimé : 25 jours · Coût additionnel : 14M FCFA</p>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg app-surface2 border app-border hover:border-indigo-500 transition-all">
                    <p className="text-xs font-bold text-white">3. Scénario Pessimiste (Risque Max)</p>
                    <p className="text-[10px] app-text3">Retard estimé : 40 jours · Budget : +22%</p>
                  </button>
                </div>
              </Card>
              <Btn onClick={() => alert("Simulation du futur en cours... L'IA calcule les trajectoires optimales.")} variant="primary" className="w-full py-4 shadow-xl shadow-indigo-600/20" icon={<Zap className="w-5 h-5" />}>Exécuter Nouvelle Simulation</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
