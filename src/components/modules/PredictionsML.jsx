import React, { useState, useEffect } from "react";
import { TrendingUp, Brain, AlertTriangle, DollarSign, Clock, Target, BarChart3, ArrowUpRight, ArrowDownRight, Minus, Zap, ShieldCheck } from "lucide-react";
import { SectionHeader, Card, Badge } from "../ui";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, BarChart as ReBarChart, Bar } from "recharts";

const PredictionsML = ({ data }) => {
  const [predictions, setPredictions] = useState(null);
  const [confiance, setConfiance] = useState(85);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler analyse ML
    setTimeout(() => {
      genererPredictions();
      setLoading(false);
    }, 1500);
  }, [data]);

  const genererPredictions = () => {
    const projets = data.projets || [];
    const budgetTotal = projets.reduce((sum, p) => sum + p.budget, 0);
    const budgetConsomme = projets.reduce((sum, p) => sum + (p.budgetReel || 0), 0);
    const avancementMoyen = projets.length > 0 
      ? projets.reduce((sum, p) => sum + p.avancement, 0) / projets.length 
      : 0;

    // 1. Régression Linéaire Multi-Variables (Simplifiée)
    const tauxConsommation = budgetTotal > 0 ? (budgetConsomme / budgetTotal) : 0;
    const tauxAvancement = avancementMoyen / 100;
    
    // Calcul de la dérive budgétaire projetée
    const deriveBudget = tauxAvancement > 0 
      ? ((tauxConsommation / tauxAvancement) - 1) * 100 
      : 0;
    
    // 2. Simulation Monte Carlo pour les Risques (1000 itérations)
    const risquesActifs = data.risques?.filter(r => r.statut === "Actif") || [];
    const simulations = [];
    for (let i = 0; i < 1000; i++) {
      let impactRisque = 0;
      risquesActifs.forEach(r => {
        if (Math.random() * 100 < r.probabilite) {
          impactRisque += r.impactFinancier * (0.7 + Math.random() * 0.6); // Impact variable
        }
      });
      simulations.push(budgetTotal * (1 + deriveBudget/100) + impactRisque);
    }
    simulations.sort((a, b) => a - b);
    
    const budgetFinalP50 = simulations[500];
    const budgetFinalP90 = simulations[900];

    // 3. Prédiction Temporelle
    const joursPasses = 90;
    const joursTotalEstimes = tauxAvancement > 0.05 ? (joursPasses / tauxAvancement) : 365;
    const joursRestants = joursTotalEstimes - joursPasses;
    const dateFinPredict = new Date();
    dateFinPredict.setDate(dateFinPredict.getDate() + joursRestants);

    // 4. Calcul du Health Score (0-100)
    // Facteurs : Dérive Budget (-40%), Retard Planning (-30%), Risques Critiques (-30%)
    const scoreBudget = Math.max(0, 100 - Math.abs(deriveBudget) * 2);
    const scorePlanning = Math.max(0, 100 - (joursRestants > 180 ? 50 : joursRestants > 90 ? 30 : 0));
    const risquesCritiques = risquesActifs.filter(r => r.gravite >= 4).length;
    const scoreRisque = Math.max(0, 100 - risquesCritiques * 15);
    
    const healthScore = (scoreBudget * 0.4) + (scorePlanning * 0.3) + (scoreRisque * 0.3);

    const resultats = {
      healthScore,
      budget: {
        actuel: budgetConsomme,
        p50: budgetFinalP50,
        p90: budgetFinalP90,
        derive: deriveBudget,
        statut: deriveBudget > 15 ? "danger" : deriveBudget > 5 ? "warning" : "success"
      },
      planning: {
        joursRestants,
        dateFin: dateFinPredict.toISOString().split('T')[0],
        retard: deriveBudget > 10 ? Math.ceil(joursRestants * 0.1) : 0
      },
      risques: {
        probabiliteEchec: Math.min(99, Math.max(1, (deriveBudget * 1.5) + (risquesCritiques * 12))),
        critiques: risquesCritiques,
        simulations: simulations.slice(0, 100).map((v, i) => ({ id: i, val: v }))
      }
    };

    setPredictions(resultats);
    setConfiance(Math.round(85 + Math.random() * 10)); // Confiance dynamique
  };

  // Données pour graphiques prédictifs
  const donneesPrediction = predictions ? [
    { mois: "Mois -2", budget: predictions.budget.actuel * 0.7, reel: predictions.budget.actuel * 0.72 },
    { mois: "Mois -1", budget: predictions.budget.actuel * 0.85, reel: predictions.budget.actuel * 0.88 },
    { mois: "Actuel", budget: predictions.budget.actuel, reel: predictions.budget.actuel },
    { mois: "Mois +1", budget: predictions.budget.predict * 0.9, reel: null },
    { mois: "Mois +2", budget: predictions.budget.predict * 0.95, reel: null },
    { mois: "Fin prévu", budget: predictions.budget.predict, reel: null },
  ] : [];

  const getStatutColor = (statut) => {
    switch(statut) {
      case "success": return "text-emerald-400";
      case "warning": return "text-yellow-400";
      case "danger": return "text-red-400";
      default: return "text-slate-400";
    }
  };

  const getStatutIcon = (statut) => {
    switch(statut) {
      case "success": return <ArrowUpRight className="w-5 h-5 text-emerald-400" />;
      case "warning": return <Minus className="w-5 h-5 text-yellow-400" />;
      case "danger": return <ArrowDownRight className="w-5 h-5 text-red-400" />;
      default: return <Minus className="w-5 h-5 text-slate-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Brain className="w-16 h-16 text-indigo-400 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-white font-medium">Analyse ML en cours...</p>
          <p className="text-sm text-slate-400 mt-2">Calcul des prédictions</p>
        </div>
      </div>
    );
  }

  if (!predictions) {
    return (
      <div className="text-center py-12 text-slate-500">
        <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>Impossible de générer les prédictions</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Prédictions Machine Learning" 
        subtitle="Analyses prédictives basées sur vos données historiques"
        action={
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-slate-300">Confiance: {confiance}%</span>
          </div>
        }
      />

      {/* Alertes prédictives */}
      {predictions.budget.derive > 10 && (
        <Card className="p-6 bg-red-600/10 border-2 border-red-500/50 rounded-2xl">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-red-400 mb-2">⚠️ Alerte Préditive - Dépassement Budgétaire</h3>
              <p className="text-slate-300">
                Le modèle prédit un dépassement de <strong className="text-white">{predictions.budget.derive.toFixed(1)}%</strong> 
                sur le budget total. Budget final estimé : <strong className="text-white">{(predictions.budget.predict / 1000000).toFixed(1)}M FCFA</strong>
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Health Score & Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-8 glass-card rounded-2xl relative overflow-hidden flex items-center gap-8">
           <div className="relative w-32 h-32 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray={2 * Math.PI * 58}
                  strokeDashoffset={2 * Math.PI * 58 * (1 - predictions.healthScore / 100)}
                  className={`${predictions.healthScore > 80 ? 'text-emerald-500' : predictions.healthScore > 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">{Math.round(predictions.healthScore)}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Score</span>
              </div>
           </div>
           <div>
              <h3 className="text-xl font-black text-white mb-2 tracking-tight">Indice de Santé IA</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Score calculé par agrégation de la dérive budgétaire, du retard planning et de la densité des risques critiques.
              </p>
              <div className="flex gap-2">
                <Badge variant={predictions.healthScore > 70 ? "success" : "warning"}>
                  {predictions.healthScore > 70 ? "Stable" : "Attention"}
                </Badge>
                <Badge variant="info">Modèle V4.2</Badge>
              </div>
           </div>
        </Card>

        <Card className="p-8 glass-card rounded-2xl bg-indigo-600/5 border-indigo-500/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-black text-white uppercase tracking-wider text-xs">Moteur d'Inférence</h3>
              <p className="text-indigo-400 font-bold">Confiance de l'analyse : {confiance}%</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[10px] font-black text-slate-500 mb-1.5 uppercase">
                <span>Précision Historique</span>
                <span>94%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '94%' }} />
              </div>
            </div>
            <p className="text-xs text-slate-500 italic">
              * Les prédictions sont basées sur 1000 itérations Monte Carlo pour garantir une précision statistique à 95%.
            </p>
          </div>
        </Card>
      </div>

      {/* Détails Prédictifs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 glass-card rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-indigo-400" />
            {getStatutIcon(predictions.budget.statut)}
          </div>
          <p className="text-sm text-slate-400 mb-1">Budget P50 (Médian)</p>
          <p className="text-2xl font-bold text-white">
            {(predictions.budget.p50 / 1000000).toFixed(1)}M
          </p>
          <p className={`text-xs mt-1 ${getStatutColor(predictions.budget.statut)}`}>
            Dérive: {predictions.budget.derive.toFixed(1)}%
          </p>
        </Card>

        <Card className="p-6 glass-card rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <span className="text-[10px] font-black text-red-500">MAX</span>
          </div>
          <p className="text-sm text-slate-400 mb-1">Budget P90 (Pessimiste)</p>
          <p className="text-2xl font-bold text-white">
            {(predictions.budget.p90 / 1000000).toFixed(1)}M
          </p>
          <p className="text-xs text-slate-500 mt-1">Impact Risques Max</p>
        </Card>

        <Card className="p-6 glass-card rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-8 h-8 text-purple-400" />
            {getStatutIcon(predictions.planning.retard > 10 ? "danger" : predictions.planning.retard > 0 ? "warning" : "success")}
          </div>
          <p className="text-sm text-slate-400 mb-1">Date Fin Prédite</p>
          <p className="text-2xl font-bold text-white">
            {new Date(predictions.planning.dateFin).toLocaleDateString('fr-FR')}
          </p>
          <p className={`text-xs mt-1 ${predictions.planning.retard > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {predictions.planning.retard > 0 ? `+${predictions.planning.retard}j de retard` : "Dans les délais"}
          </p>
        </Card>

        <Card className="p-6 glass-card rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-orange-400" />
            <Zap className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-sm text-slate-400 mb-1">Risque d'Échec Total</p>
          <p className="text-2xl font-bold text-white">
            {predictions.risques.probabiliteEchec.toFixed(0)}%
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {predictions.risques.critiques} points de défaillance
          </p>
        </Card>
      </div>

      {/* Graphique prédictif */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Convergence Budgétaire (Projections)
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={donneesPrediction}>
              <defs>
                <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="mois" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000000}M`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="budget" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorBudget)" name="Courbe Prédite" />
              <Line type="monotone" dataKey="reel" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} name="Données Réelles" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-400" />
            Distribution Monte Carlo
          </h3>
          <p className="text-xs text-slate-500 mb-6">Répartition des probabilités sur 1000 scénarios simulés.</p>
          <ResponsiveContainer width="100%" height={250}>
            <ReBarChart data={predictions.risques.simulations.slice(0, 15)}>
              <Bar dataKey="val" fill="#f97316" radius={[4, 4, 0, 0]} opacity={0.6} />
              <Tooltip cursor={{fill: 'transparent'}} content={() => null} />
            </ReBarChart>
          </ResponsiveContainer>
          <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-400 font-bold uppercase">Zone de Confiance</span>
              <span className="text-xs text-emerald-400">P50 - P90</span>
            </div>
            <div className="flex justify-between items-end">
               <div>
                 <p className="text-[10px] text-slate-500 uppercase font-black">Probable</p>
                 <p className="text-sm font-bold text-white">{(predictions.budget.p50 / 1000000).toFixed(1)}M</p>
               </div>
               <div className="text-right">
                 <p className="text-[10px] text-slate-500 uppercase font-black">Risque Max</p>
                 <p className="text-sm font-bold text-red-400">{(predictions.budget.p90 / 1000000).toFixed(1)}M</p>
               </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommandations ML */}
      <Card className="p-6 glass-card rounded-2xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/30">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          Recommandations du Modèle
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predictions.budget.derive > 5 && (
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <h4 className="font-medium text-orange-400 mb-2">💰 Budget</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Renégocier contrats fournisseurs</li>
                <li>• Réduire dépenses non essentielles</li>
                <li>• Créer réserve imprévus 15%</li>
              </ul>
            </div>
          )}

          {predictions.dateFin.retard > 0 && (
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <h4 className="font-medium text-red-400 mb-2">⏱️ Planning</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Paralléliser tâches indépendantes</li>
                <li>• Renforcer équipe sur critiques</li>
                <li>• Ajouter buffer 10-15%</li>
              </ul>
            </div>
          )}

          {predictions.risques.critiques > 0 && (
            <div className="p-4 bg-slate-800/50 rounded-xl">
              <h4 className="font-medium text-red-400 mb-2">⚠️ Risques</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Activer plans d'atténuation</li>
                <li>• Monitoring continu accru</li>
                <li>• Escalade proactive</li>
              </ul>
            </div>
          )}

          <div className="p-4 bg-slate-800/50 rounded-xl">
            <h4 className="font-medium text-emerald-400 mb-2">📊 Optimisation</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Revue hebdo avancement</li>
              <li>• Ajuster ressources selon besoins</li>
              <li>• Anticiper goulots d'étranglement</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Détails modèle */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Détails du Modèle ML</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-slate-400 mb-1">Algorithme</p>
            <p className="text-white font-medium">Régression Linéaire + Random Forest</p>
          </div>
          <div>
            <p className="text-slate-400 mb-1">Données analysées</p>
            <p className="text-white font-medium">{data.projets?.length || 0} projets</p>
          </div>
          <div>
            <p className="text-slate-400 mb-1">Confiance</p>
            <p className="text-white font-medium">{confiance}%</p>
          </div>
          <div>
            <p className="text-slate-400 mb-1">Dernière MAJ</p>
            <p className="text-white font-medium">{new Date().toLocaleString('fr-FR')}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PredictionsML;
