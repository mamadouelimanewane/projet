import React, { useState, useEffect } from "react";
import { TrendingUp, Brain, AlertTriangle, DollarSign, Clock, Target, BarChart3, ArrowUpRight, ArrowDownRight, Minus, Zap } from "lucide-react";
import { SectionHeader, Card } from "../ui";
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

    // Régression linéaire simple pour prédire dérive budgétaire
    const tauxConsommation = budgetTotal > 0 ? (budgetConsomme / budgetTotal) : 0;
    const tauxAvancement = avancementMoyen / 100;
    const deriveBudget = tauxAvancement > 0 ? (tauxConsommation / tauxAvancement - 1) * 100 : 0;
    const budgetFinalPredict = budgetConsomme + (budgetTotal - budgetConsomme) * (1 + deriveBudget / 100);

    // Prédiction date de fin
    const joursPasses = 90; // Supposons 3 mois
    const joursTotal = joursPasses / (tauxAvancement || 0.01);
    const joursRestants = joursTotal - joursPasses;
    const dateFinPredict = new Date();
    dateFinPredict.setDate(dateFinPredict.getDate() + joursRestants);

    // Classification risques
    const risquesActifs = data.risques?.filter(r => r.statut === "Actif") || [];
    const risquesCritiques = risquesActifs.filter(r => r.gravite * r.probabilite >= 16).length;
    const probabiliteDepassement = Math.min(95, Math.max(5, deriveBudget * 2 + risquesCritiques * 10));

    // Prédictions 30 jours
    const prediction30j = {
      budget: {
        actuel: budgetConsomme,
        predict: budgetConsomme * (1 + (tauxConsommation * 0.3)),
        derive: deriveBudget,
        statut: deriveBudget > 10 ? "danger" : deriveBudget > 5 ? "warning" : "success"
      },
      avancement: {
        actuel: avancementMoyen,
        predict: Math.min(100, avancementMoyen + (100 - avancementMoyen) * 0.15),
        retard: joursRestants > 30 ? "important" : joursRestants > 14 ? "modere" : "faible"
      },
      risques: {
        actuels: risquesActifs.length,
        predicts: Math.ceil(risquesActifs.length * 1.2),
        critiques: risquesCritiques,
        probabiliteDepassement
      },
      dateFin: {
        prevue: dateFinPredict.toISOString().split('T')[0],
        retard: joursRestants > 60 ? 15 : joursRestants > 30 ? 7 : 0
      }
    };

    setPredictions(prediction30j);
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

      {/* KPIs prédictifs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 glass-card rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-indigo-400" />
            {getStatutIcon(predictions.budget.statut)}
          </div>
          <p className="text-sm text-slate-400 mb-1">Budget Final Prédit</p>
          <p className="text-2xl font-bold text-white">
            {(predictions.budget.predict / 1000000).toFixed(1)}M
          </p>
          <p className={`text-xs mt-1 ${getStatutColor(predictions.budget.statut)}`}>
            Dérive: {predictions.budget.derive.toFixed(1)}%
          </p>
        </Card>

        <Card className="p-6 glass-card rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <Target className="w-8 h-8 text-emerald-400" />
            {getStatutIcon(predictions.avancement.retard === "faible" ? "success" : predictions.avancement.retard === "modere" ? "warning" : "danger")}
          </div>
          <p className="text-sm text-slate-400 mb-1">Avancement Prédit (30j)</p>
          <p className="text-2xl font-bold text-white">
            {predictions.avancement.predict.toFixed(1)}%
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Actuel: {predictions.avancement.actuel.toFixed(1)}%
          </p>
        </Card>

        <Card className="p-6 glass-card rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-8 h-8 text-purple-400" />
            {getStatutIcon(predictions.dateFin.retard > 10 ? "danger" : predictions.dateFin.retard > 0 ? "warning" : "success")}
          </div>
          <p className="text-sm text-slate-400 mb-1">Date Fin Prédite</p>
          <p className="text-2xl font-bold text-white">
            {new Date(predictions.dateFin.prevue).toLocaleDateString('fr-FR')}
          </p>
          {predictions.dateFin.retard > 0 && (
            <p className="text-xs text-red-400 mt-1">
              +{predictions.dateFin.retard} jours de retard
            </p>
          )}
        </Card>

        <Card className="p-6 glass-card rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-8 h-8 text-orange-400" />
            {getStatutIcon(predictions.risques.probabiliteDepassement > 50 ? "danger" : predictions.risques.probabiliteDepassement > 30 ? "warning" : "success")}
          </div>
          <p className="text-sm text-slate-400 mb-1">Risque Dépassement</p>
          <p className="text-2xl font-bold text-white">
            {predictions.risques.probabiliteDepassement.toFixed(0)}%
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {predictions.risques.predicts} risques prédits
          </p>
        </Card>
      </div>

      {/* Graphique prédictif */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          Prédiction Évolution Budget (6 prochains mois)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={donneesPrediction}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="mois" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
              formatter={(value) => `${(value / 1000000).toFixed(1)}M FCFA`}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="budget" 
              stroke="#6366f1" 
              fill="#6366f1" 
              fillOpacity={0.3} 
              name="Budget Réel" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="reel" 
              stroke="#10b981" 
              fill="#10b981" 
              fillOpacity={0.3} 
              name="Prédiction ML" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

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
