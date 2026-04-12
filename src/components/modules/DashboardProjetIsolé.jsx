import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProject, ProjectSelector } from "./ProjectSelector";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { PIE_COLORS } from "../../data/constants";
import { Badge, StatCard, SectionHeader, Card, Btn } from "../ui";
import { 
  TrendingUp, DollarSign, Clock, AlertTriangle, CheckCircle, 
  XCircle, AlertCircle, Target, Activity, Zap, ArrowRight,
  Calendar, Users, FileText, Settings, BarChart3, PieChart as PieChartIcon
} from "lucide-react";

const DashboardProjetIsolé = () => {
  const navigate = useNavigate();
  const { currentProject, projectData, projectStats, selectedProjectId } = useProject();
  const [activeTab, setActiveTab] = useState("overview");

  if (!currentProject) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-white mb-2">Aucun projet sélectionné</h2>
        <p className="text-slate-400 mb-6">Utilisez le sélecteur en haut pour choisir un projet</p>
        <button 
          onClick={() => navigate('/multiprojets')}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-colors"
        >
          Voir tous les projets
        </button>
      </div>
    );
  }

  // Données filtrées
  const { taches, budget, risques, problemes, delais, jalons, ressources, kpis } = projectData;
  const { avancement, budgetConsomme, tachesTotal, tachesEnCours, tachesFaites, risquesActifs, problemesOuverts } = projectStats;

  // Calculs EVM
  const joursTotal = currentProject.debut && currentProject.fin 
    ? Math.ceil((new Date(currentProject.fin) - new Date(currentProject.debut)) / (1000 * 60 * 60 * 24))
    : 180;
  const joursPasses = currentProject.debut 
    ? Math.max(0, Math.ceil((new Date() - new Date(currentProject.debut)) / (1000 * 60 * 60 * 24)))
    : 0;
  const joursRestants = Math.max(0, joursTotal - joursPasses);
  
  const pv = Math.min((joursPasses / joursTotal) * (currentProject.budget || 0), currentProject.budget || 0);
  const ev = (avancement / 100) * (currentProject.budget || 0);
  const ac = budgetConsomme;
  const spi = pv > 0 ? (ev / pv).toFixed(2) : "N/A";
  const cpi = ac > 0 ? (ev / ac).toFixed(2) : "N/A";
  const sv = ev - pv;
  const cv = ev - ac;

  // Données graphiques
  const tachesData = [
    { name: "À faire", value: taches.filter(t => t.statut === "À faire").length, color: "#94a3b8" },
    { name: "En cours", value: tachesEnCours, color: "#6366f1" },
    { name: "Terminées", value: tachesFaites, color: "#10b981" }
  ];

  const budgetData = [
    { name: "Planifié", value: currentProject.budget || 0 },
    { name: "Consommé", value: budgetConsomme },
    { name: "Restant", value: (currentProject.budget || 0) - budgetConsomme }
  ];

  const avancementData = [
    { mois: "S-3", avancement: Math.max(0, avancement - 30) },
    { mois: "S-2", avancement: Math.max(0, avancement - 20) },
    { mois: "S-1", avancement: Math.max(0, avancement - 10) },
    { mois: "Actuel", avancement }
  ];

  const tabs = [
    { id: "overview", label: "Vue d'ensemble", icon: BarChart3 },
    { id: "taches", label: "Tâches", icon: CheckCircle },
    { id: "budget", label: "Budget", icon: DollarSign },
    { id: "risques", label: "Risques", icon: AlertTriangle },
    { id: "delais", label: "Délais", icon: Clock },
    { id: "equipe", label: "Équipe", icon: Users }
  ];

  return (
    <div className="space-y-6">
      {/* Header avec sélecteur */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Dashboard Projet
          </h1>
          <p className="text-slate-400">
            Travaillez exclusivement sur ce projet • Switch rapide disponible
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ProjectSelector />
          <Btn onClick={() => navigate(`/dashboard-projet/${selectedProjectId}`)} variant="ghost">
            Dashboard Complet
          </Btn>
        </div>
      </div>

      {/* Info projet actif */}
      <Card className="p-6 glass-card rounded-2xl bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/30">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
              {currentProject.nom.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{currentProject.nom}</h2>
              <p className="text-slate-300 mb-2">Chef de projet : {currentProject.chef}</p>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {currentProject.debut ? new Date(currentProject.debut).toLocaleDateString('fr-FR') : 'N/A'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {joursRestants} jours restants
                </span>
                <Badge variant={currentProject.statut === "Terminé" ? "success" : "warning"}>
                  {currentProject.statut}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400 mb-1">Avancement</p>
            <p className="text-4xl font-bold text-white">{avancement}%</p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Contenu selon tab */}
      {activeTab === "overview" && (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={CheckCircle}
              title="Tâches"
              value={`${tachesFaites}/${tachesTotal}`}
              subtitle={`${tachesEnCours} en cours`}
              trend={avancement}
              color="indigo"
            />
            <StatCard
              icon={DollarSign}
              title="Budget"
              value={`${((budgetConsomme / 1000000).toFixed(1))}M`}
              subtitle={`${Math.round((budgetConsomme / (currentProject.budget || 1)) * 100)}% consommé`}
              trend={100 - Math.round((budgetConsomme / (currentProject.budget || 1)) * 100)}
              color="emerald"
            />
            <StatCard
              icon={Clock}
              title="Délais"
              value={`${joursRestants}j`}
              subtitle={`${joursPasses}j passés`}
              trend={Math.round((joursPasses / joursTotal) * 100)}
              color="purple"
            />
            <StatCard
              icon={AlertTriangle}
              title="Risques"
              value={risquesActifs}
              subtitle={`${problemesOuverts} problèmes`}
              trend={100 - (risquesActifs * 10)}
              color="orange"
            />
          </div>

          {/* EVM */}
          <Card className="p-6 glass-card rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              Earned Value Management (EVM)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-800 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">SPI</p>
                <p className={`text-2xl font-bold ${parseFloat(spi) >= 1 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {spi}
                </p>
                <p className="text-xs text-slate-500 mt-1">Schedule Performance</p>
              </div>
              <div className="p-4 bg-slate-800 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">CPI</p>
                <p className={`text-2xl font-bold ${parseFloat(cpi) >= 1 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {cpi}
                </p>
                <p className="text-xs text-slate-500 mt-1">Cost Performance</p>
              </div>
              <div className="p-4 bg-slate-800 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">SV</p>
                <p className={`text-2xl font-bold ${sv >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {(sv / 1000000).toFixed(2)}M
                </p>
                <p className="text-xs text-slate-500 mt-1">Schedule Variance</p>
              </div>
              <div className="p-4 bg-slate-800 rounded-xl">
                <p className="text-sm text-slate-400 mb-1">CV</p>
                <p className={`text-2xl font-bold ${cv >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {(cv / 1000000).toFixed(2)}M
                </p>
                <p className="text-xs text-slate-500 mt-1">Cost Variance</p>
              </div>
            </div>
          </Card>

          {/* Graphiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 glass-card rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Répartition Tâches</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={tachesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tachesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 glass-card rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Évolution Avancement</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={avancementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="mois" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Area type="monotone" dataKey="avancement" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </>
      )}

      {activeTab === "taches" && (
        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Tâches du Projet ({taches.length})</h3>
          <div className="space-y-3">
            {taches.slice(0, 10).map((tache, i) => (
              <div key={i} className="p-4 bg-slate-800 rounded-xl flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">{tache.tache}</h4>
                  <p className="text-sm text-slate-400">{tache.responsable}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={
                    tache.statut === "Fait" ? "success" :
                    tache.statut === "En cours" ? "warning" : "default"
                  }>
                    {tache.statut}
                  </Badge>
                  <Badge variant={
                    tache.priorite === "Critique" ? "danger" :
                    tache.priorite === "Haute" ? "warning" : "default"
                  }>
                    {tache.priorite}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "budget" && (
        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Budget du Projet</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 bg-slate-800 rounded-xl">
              <p className="text-sm text-slate-400 mb-2">Budget Total</p>
              <p className="text-3xl font-bold text-indigo-400">{((currentProject.budget || 0) / 1000000).toFixed(1)}M FCFA</p>
            </div>
            <div className="p-6 bg-slate-800 rounded-xl">
              <p className="text-sm text-slate-400 mb-2">Consommé</p>
              <p className="text-3xl font-bold text-orange-400">{(budgetConsomme / 1000000).toFixed(1)}M FCFA</p>
            </div>
            <div className="p-6 bg-slate-800 rounded-xl">
              <p className="text-sm text-slate-400 mb-2">Restant</p>
              <p className="text-3xl font-bold text-emerald-400">
                {(((currentProject.budget || 0) - budgetConsomme) / 1000000).toFixed(1)}M FCFA
              </p>
            </div>

          </div>
        </Card>
      )}

      {activeTab === "risques" && (
        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Risques ({risques.length})</h3>
          <div className="space-y-3">
            {risques.filter(r => r.statut === "Actif").map((risque, i) => (
              <div key={i} className="p-4 bg-slate-800 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-white">{risque.risque}</h4>
                  <Badge variant={
                    risque.gravite * risque.probabilite >= 16 ? "danger" :
                    risque.gravite * risque.probabilite >= 12 ? "warning" : "default"
                  }>
                    Score: {risque.gravite * risque.probabilite}/25
                  </Badge>
                </div>
                <p className="text-sm text-slate-400">Atténuation: {risque.attenuation}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "delais" && (
        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Planning</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-slate-800 rounded-xl">
              <p className="text-sm text-slate-400 mb-1">Durée Totale</p>
              <p className="text-2xl font-bold text-white">{joursTotal} jours</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-xl">
              <p className="text-sm text-slate-400 mb-1">Jours Passés</p>
              <p className="text-2xl font-bold text-indigo-400">{joursPasses} jours</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-xl">
              <p className="text-sm text-slate-400 mb-1">Jours Restants</p>
              <p className="text-2xl font-bold text-emerald-400">{joursRestants} jours</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-xl">
              <p className="text-sm text-slate-400 mb-1">% Temps</p>
              <p className="text-2xl font-bold text-purple-400">{Math.round((joursPasses / joursTotal) * 100)}%</p>
            </div>
          </div>
        </Card>
      )}

      {activeTab === "equipe" && (
        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Équipe Projet</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {taches.map(t => t.responsable)
              .filter((v, i, a) => a.indexOf(v) === i)
              .slice(0, 8)
              .map((responsable, i) => {
                const tachesResp = taches.filter(t => t.responsable === responsable);
                const faites = tachesResp.filter(t => t.statut === "Fait").length;
                return (
                  <div key={i} className="p-4 bg-slate-800 rounded-xl flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {responsable.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{responsable}</h4>
                      <p className="text-sm text-slate-400">{faites}/{tachesResp.length} tâches terminées</p>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </Card>
      )}
    </div>
  );
};

export default DashboardProjetIsolé;
