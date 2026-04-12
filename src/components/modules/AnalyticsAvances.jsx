import React from "react";
import { TrendingUp, TrendingDown, Minus, BarChart3, LineChart, PieChart, Target, AlertTriangle } from "lucide-react";
import { SectionHeader, Card } from "../ui";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart as ReLineChart, Line, PieChart as RePieChart, Pie, Cell, Area, AreaChart } from "recharts";

const AnalyticsAvances = ({ data }) => {
  // Calculer métriques avancées
  const totalProjets = data.projets?.length || 0;
  const projetsActifs = data.projets?.filter(p => p.statut === "En cours").length || 0;
  const projetTermines = data.projets?.filter(p => p.statut === "Terminé").length || 0;
  const avancementMoyen = totalProjets > 0 ? (data.projets.reduce((sum, p) => sum + p.avancement, 0) / totalProjets).toFixed(1) : 0;
  const budgetTotal = data.projets?.reduce((sum, p) => sum + p.budget, 0) || 0;
  const budgetConsomme = data.projets?.reduce((sum, p) => sum + (p.budgetReel || 0), 0) || 0;
  const budgetPct = budgetTotal > 0 ? ((budgetConsomme / budgetTotal) * 100).toFixed(1) : 0;

  // Données pour graphiques
  const evolutionBudget = [
    { mois: "Jan", budget: 100, reel: 95 },
    { mois: "Fév", budget: 110, reel: 108 },
    { mois: "Mar", budget: 120, reel: 125 },
    { mois: "Avr", budget: 130, reel: 135 },
    { mois: "Mai", budget: 140, reel: 148 },
    { mois: "Jun", budget: 150, reel: 165 },
  ];

  const avancementParProjet = data.projets?.map(p => ({
    nom: p.nom.length > 15 ? p.nom.substring(0, 15) + '...' : p.nom,
    avancement: p.avancement,
    budget: p.budget / 1000000
  })).slice(0, 8) || [];

  const repartitionBudget = [
    { name: "RH", value: 45 },
    { name: "Matériel", value: 25 },
    { name: "Services", value: 20 },
    { name: "Autres", value: 10 },
  ];

  const couleurs = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"];

  // Taux de réussite
  const tauxReussite = totalProjets > 0 ? ((projetTermines / totalProjets) * 100).toFixed(1) : 0;
  
  // Risques par catégorie
  const risquesParScore = {
    critiques: data.risques?.filter(r => r.gravite * r.probabilite >= 16).length || 0,
    eleves: data.risques?.filter(r => r.gravite * r.probabilite >= 12 && r.gravite * r.probabilite < 16).length || 0,
    moyens: data.risques?.filter(r => r.gravite * r.probabilite >= 6 && r.gravite * r.probabilite < 12).length || 0,
    faibles: data.risques?.filter(r => r.gravite * r.probabilite < 6).length || 0,
  };

  // Indicateurs de tendance
  const getTrendIcon = (value) => {
    if (value > 70) return <TrendingUp className="w-5 h-5 text-emerald-400" />;
    if (value < 40) return <TrendingDown className="w-5 h-5 text-red-400" />;
    return <Minus className="w-5 h-5 text-yellow-400" />;
  };

  const getTrendColor = (value) => {
    if (value > 70) return "text-emerald-400";
    if (value < 40) return "text-red-400";
    return "text-yellow-400";
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Analytics Avancés" 
        subtitle="Analyses approfondies et tendances de vos projets"
      />

      {/* KPIs Principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 glass-card rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <Target className="w-8 h-8 text-indigo-400" />
            {getTrendIcon(avancementMoyen)}
          </div>
          <p className="text-3xl font-bold text-white mb-1">{avancementMoyen}%</p>
          <p className="text-sm text-slate-400">Avancement Moyen</p>
        </Card>

        <Card className="p-6 glass-card rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <BarChart3 className="w-8 h-8 text-emerald-400" />
            {getTrendIcon(100 - budgetPct)}
          </div>
          <p className="text-3xl font-bold text-white mb-1">{budgetPct}%</p>
          <p className="text-sm text-slate-400">Budget Consommé</p>
        </Card>

        <Card className="p-6 glass-card rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <PieChart className="w-8 h-8 text-purple-400" />
            {getTrendIcon(tauxReussite)}
          </div>
          <p className="text-3xl font-bold text-white mb-1">{tauxReussite}%</p>
          <p className="text-sm text-slate-400">Taux de Réussite</p>
        </Card>

        <Card className="p-6 glass-card rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-8 h-8 text-orange-400" />
            {getTrendIcon(100 - risquesParScore.critiques * 10)}
          </div>
          <p className="text-3xl font-bold text-white mb-1">{risquesParScore.critiques}</p>
          <p className="text-sm text-slate-400">Risques Critiques</p>
        </Card>
      </div>

      {/* Résumé projets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 glass-card rounded-2xl text-center">
          <p className="text-4xl font-bold text-indigo-400 mb-2">{totalProjets}</p>
          <p className="text-slate-300">Total Projets</p>
        </Card>
        <Card className="p-6 glass-card rounded-2xl text-center">
          <p className="text-4xl font-bold text-emerald-400 mb-2">{projetsActifs}</p>
          <p className="text-slate-300">Projets Actifs</p>
        </Card>
        <Card className="p-6 glass-card rounded-2xl text-center">
          <p className="text-4xl font-bold text-purple-400 mb-2">{projetTermines}</p>
          <p className="text-slate-300">Projets Terminés</p>
        </Card>
      </div>

      {/* Graphique Évolution Budget */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <LineChart className="w-5 h-5 text-indigo-400" />
          Évolution Budget vs Réel (6 derniers mois)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={evolutionBudget}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="mois" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Area type="monotone" dataKey="budget" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} name="Budget Planifié" />
            <Area type="monotone" dataKey="reel" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Budget Réel" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Graphique Avancement par Projet */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          Avancement par Projet (Top 8)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <ReBarChart data={avancementParProjet}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="nom" stroke="#94a3b8" tick={{fontSize: 12}} />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Bar dataKey="avancement" fill="#6366f1" name="Avancement (%)" />
          </ReBarChart>
        </ResponsiveContainer>
      </Card>

      {/* Graphique Répartition Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-400" />
            Répartition Budget par Catégorie
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={repartitionBudget}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {repartitionBudget.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={couleurs[index % couleurs.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
              />
            </RePieChart>
          </ResponsiveContainer>
        </Card>

        {/* Analyse Risques */}
        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Distribution des Risques
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-300">Critiques (≥16)</span>
                <span className="text-sm font-bold text-red-400">{risquesParScore.critiques}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-red-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(100, risquesParScore.critiques * 20)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-300">Élevés (12-15)</span>
                <span className="text-sm font-bold text-orange-400">{risquesParScore.eleves}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-orange-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(100, risquesParScore.eleves * 15)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-300">Moyens (6-11)</span>
                <span className="text-sm font-bold text-yellow-400">{risquesParScore.moyens}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-yellow-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(100, risquesParScore.moyens * 10)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-300">Faibles (&lt;6)</span>
                <span className="text-sm font-bold text-emerald-400">{risquesParScore.faibles}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-emerald-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(100, risquesParScore.faibles * 10)}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Budget total */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Budget Global</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-400 mb-1">Budget Total Planifié</p>
            <p className="text-2xl font-bold text-indigo-400">{(budgetTotal / 1000000).toFixed(1)}M FCFA</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Budget Consommé</p>
            <p className="text-2xl font-bold text-orange-400">{(budgetConsomme / 1000000).toFixed(1)}M FCFA</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Budget Restant</p>
            <p className="text-2xl font-bold text-emerald-400">{((budgetTotal - budgetConsomme) / 1000000).toFixed(1)}M FCFA</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsAvances;
