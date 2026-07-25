import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { PIE_COLORS } from "../../data/constants";
import { Badge, StatCard, SectionHeader } from "../ui";

const DashboardProjet = ({ data, projetId }) => {
  const navigate = useNavigate();
  
  // Trouver le projet sélectionné
  const projet = data.projets.find(p => p.id === parseInt(projetId));
  
  if (!projet) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-white mb-2">Projet non trouvé</h2>
        <p className="app-text2 mb-6">Sélectionnez un projet pour voir son tableau de bord</p>
        <button 
          onClick={() => navigate('/multiprojets')}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-colors"
        >
          Aller à Multi-Projets
        </button>
      </div>
    );
  }

  // Filtrer les données par projet
  const tachesProjet = data.taches.filter(t => t.projet === projet.nom);
  const tachesEnCours = tachesProjet.filter(t => t.statut === "En cours").length;
  const tachesFaites = tachesProjet.filter(t => t.statut === "Fait").length;
  const tachesAFaire = tachesProjet.filter(t => t.statut === "À faire").length;
  const totalTaches = tachesProjet.length;

  const problemesProjet = data.problemes.filter(p => 
    !tachesProjet.length || tachesProjet.some(t => p.description.includes(t.tache))
  );
  const problemesOuverts = problemesProjet.filter(p => p.statut !== "Résolu").length;

  const risquesActifs = data.risques.filter(r => r.statut === "Actif").length;
  
  // Budget du projet
  const budgetConsomme = projet.budgetReel || 0;
  const budgetTotal = projet.budget || 0;
  const budgetPct = budgetTotal > 0 ? Math.round((budgetConsomme / budgetTotal) * 100) : 0;
  const budgetRestant = budgetTotal - budgetConsomme;

  // Délais du projet
  const delaisProjet = data.delais.filter(d => 
    tachesProjet.some(t => d.tache.includes(t.tache) || t.tache.includes(d.tache))
  );
  const retardsActifs = delaisProjet.filter(d => d.reel && new Date(d.reel) > new Date(d.planifie)).length;

  // Jalons du projet
  const jalonsProjet = data.jalons;
  const jalonsAtteints = jalonsProjet.filter(j => j.statut === "Atteint").length;
  const jalonsTotal = jalonsProjet.length;

  // Statistiques tâches par statut
  const statutTachesData = [
    { name: "Terminé", value: tachesFaites, color: "#10b981" },
    { name: "En cours", value: tachesEnCours, color: "#f59e0b" },
    { name: "À faire", value: tachesAFaire, color: "#6366f1" },
  ].filter(d => d.value > 0);

  // Répartition budget
  const budgetData = data.budget.map(b => ({
    name: b.categorie.substring(0, 15),
    Planifié: b.planifie / 1000000,
    Réel: b.reel / 1000000,
  }));

  // Progression dans le temps (simulation)
  const progressionData = useMemo(() => {
    const debut = new Date(projet.debut);
    const fin = new Date(projet.fin);
    const maintenant = new Date();
    const totalJours = (fin - debut) / (1000 * 60 * 60 * 24);
    const joursEcoulés = Math.min((maintenant - debut) / (1000 * 60 * 60 * 24), totalJours);
    const progressionTheorique = Math.round((joursEcoulés / totalJours) * 100);
    
    return [
      { mois: "Début", prévu: 0, réel: 0 },
      { mois: "25%", prévu: 25, réel: Math.round(projet.avancement * 0.25) },
      { mois: "50%", prévu: 50, réel: Math.round(projet.avancement * 0.5) },
      { mois: "75%", prévu: 75, réel: Math.round(projet.avancement * 0.75) },
      { mois: "Actuel", prévu: progressionTheorique, réel: projet.avancement },
    ];
  }, [projet]);

  // Performance par priorité
  const prioriteData = [
    { 
      name: "Critique", 
      total: tachesProjet.filter(t => t.priorite === "Critique").length,
      terminees: tachesProjet.filter(t => t.priorite === "Critique" && t.statut === "Fait").length,
    },
    { 
      name: "Haute", 
      total: tachesProjet.filter(t => t.priorite === "Haute").length,
      terminees: tachesProjet.filter(t => t.priorite === "Haute" && t.statut === "Fait").length,
    },
    { 
      name: "Moyenne", 
      total: tachesProjet.filter(t => t.priorite === "Moyenne").length,
      terminees: tachesProjet.filter(t => t.priorite === "Moyenne" && t.statut === "Fait").length,
    },
    { 
      name: "Basse", 
      total: tachesProjet.filter(t => t.priorite === "Basse").length,
      terminees: tachesProjet.filter(t => t.priorite === "Basse" && t.statut === "Fait").length,
    },
  ].filter(d => d.total > 0);

  // Calcul SPI/CPI simplifié
  const joursTotal = (new Date(projet.fin) - new Date(projet.debut)) / (1000 * 60 * 60 * 24);
  const joursPasses = (new Date() - new Date(projet.debut)) / (1000 * 60 * 60 * 24);
  const pv = Math.min((joursPasses / joursTotal) * budgetTotal, budgetTotal);
  const ev = (projet.avancement / 100) * budgetTotal;
  const ac = budgetConsomme;
  const spi = pv > 0 ? (ev / pv).toFixed(2) : "N/A";
  const cpi = ac > 0 ? (ev / ac).toFixed(2) : "N/A";

  const spiValue = spi !== "N/A" ? parseFloat(spi) : 1;
  const cpiValue = cpi !== "N/A" ? parseFloat(cpi) : 1;

  return (
    <div className="space-y-8 animate-entrance">
      {/* Header avec info projet */}
      <div className="glass-card rounded-2xl p-6 border-l-4" style={{ borderLeftColor: projet.statut === "En cours" ? "#f59e0b" : projet.statut === "Terminé" ? "#10b981" : "#6366f1" }}>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-white tracking-tight">{projet.nom}</h1>
              <Badge value={projet.statut} />
            </div>
            <p className="text-sm app-text2">Chef de projet : <span className="text-slate-200 font-bold">{projet.chef}</span></p>
            <p className="text-xs app-text3 mt-1">{projet.debut} → {projet.fin}</p>
          </div>
          <button 
            onClick={() => navigate('/multiprojets')}
            className="px-4 py-2 app-surface3 hover:bg-slate-600 text-white rounded-lg text-sm font-bold transition-colors"
          >
            ← Retour
          </button>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard 
          label="Avancement" 
          value={`${projet.avancement}%`} 
          sub={`sur ${Math.round((joursPasses / joursTotal) * 100)}% prévu`}
          color={projet.avancement >= (joursPasses / joursTotal) * 100 ? "#10b981" : "#f59e0b"} 
          icon="◉" 
        />
        <StatCard 
          label="Budget" 
          value={`${budgetPct}%`} 
          sub={`${(budgetConsomme / 1000000).toFixed(1)}M / ${budgetTotal / 1000000}M FCFA`}
          color={budgetPct <= 80 ? "#10b981" : budgetPct <= 100 ? "#f59e0b" : "#ef4444"} 
          icon="Σ" 
        />
        <StatCard 
          label="Tâches" 
          value={`${tachesFaites}/${totalTaches}`} 
          sub={`${tachesEnCours} en cours`}
          color="#6366f1" 
          icon="⊞" 
        />
        <StatCard 
          label="Problèmes" 
          value={problemesOuverts} 
          sub={`${problemesProjet.length} total`}
          color={problemesOuverts > 0 ? "#ef4444" : "#10b981"} 
          icon="⚠" 
        />
        <StatCard 
          label="Risques" 
          value={risquesActifs} 
          sub="actifs"
          color={risquesActifs > 2 ? "#f59e0b" : "#06b6d4"} 
          icon="⛨" 
        />
      </div>

      {/* Indicateurs EVM */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-xs font-black app-text3 mb-2 uppercase tracking-widest">SPI</div>
          <div className="text-3xl font-black" style={{ color: spiValue >= 1 ? "#10b981" : "#f59e0b" }}>
            {spi}
          </div>
          <div className="text-[10px] app-text3 mt-1">
            {spiValue >= 1 ? "✅ Dans les délais" : "⚠️ En retard"}
          </div>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-xs font-black app-text3 mb-2 uppercase tracking-widest">CPI</div>
          <div className="text-3xl font-black" style={{ color: cpiValue >= 1 ? "#10b981" : "#ef4444" }}>
            {cpi}
          </div>
          <div className="text-[10px] app-text3 mt-1">
            {cpiValue >= 1 ? "✅ Sous budget" : "⚠️ Dépassement"}
          </div>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-xs font-black app-text3 mb-2 uppercase tracking-widest">Budget Restant</div>
          <div className="text-2xl font-black text-emerald-400">
            {(budgetRestant / 1000000).toFixed(1)}M
          </div>
          <div className="text-[10px] app-text3 mt-1">FCFA</div>
        </div>
        <div className="glass-card rounded-xl p-4 text-center">
          <div className="text-xs font-black app-text3 mb-2 uppercase tracking-widest">Retards Actifs</div>
          <div className="text-3xl font-black" style={{ color: retardsActifs > 0 ? "#ef4444" : "#10b981" }}>
            {retardsActifs}
          </div>
          <div className="text-[10px] app-text3 mt-1">
            {retardsActifs > 0 ? "⚠️ Actions requises" : "✅ Aucun retard"}
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progression prévue vs réelle */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-xs font-black app-text3 mb-6 uppercase tracking-[0.2em]">Progression Prévue vs Réelle</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={progressionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="mois" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} domain={[0, 100]} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(15, 23, 42, 0.95)", 
                  border: "1px solid rgba(148, 163, 184, 0.2)", 
                  borderRadius: 12 
                }} 
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: 11, fontWeight: 700}} />
              <Area type="monotone" dataKey="prévu" stroke="#6366f1" fill="url(#prevuGradient)" strokeWidth={2} name="Prévu" />
              <Area type="monotone" dataKey="réel" stroke="#10b981" fill="url(#reelGradient)" strokeWidth={2} name="Réel" />
              <defs>
                <linearGradient id="prevuGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="reelGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition des tâches par statut */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-xs font-black app-text3 mb-6 uppercase tracking-[0.2em]">Répartition des Tâches</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie 
                data={statutTachesData} 
                cx="50%" 
                cy="50%" 
                innerRadius={70} 
                outerRadius={100} 
                paddingAngle={8} 
                dataKey="value" 
                stroke="none"
              >
                {statutTachesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(15, 23, 42, 0.95)", 
                  border: "1px solid rgba(148, 163, 184, 0.2)", 
                  borderRadius: 12 
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {statutTachesData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-xs font-bold app-text2">{d.name}: {d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget et Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget par catégorie */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-xs font-black app-text3 mb-6 uppercase tracking-[0.2em]">Budget par Catégorie (M FCFA)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(15, 23, 42, 0.95)", 
                  border: "1px solid rgba(148, 163, 184, 0.2)", 
                  borderRadius: 12 
                }} 
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{fontSize: 11, fontWeight: 700}} />
              <Bar dataKey="Planifié" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="Réel" fill="#a78bfa" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance par priorité */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-xs font-black app-text3 mb-6 uppercase tracking-[0.2em]">Taux d'Achèvement par Priorité</h3>
          <div className="space-y-4">
            {prioriteData.map((p, i) => {
              const taux = p.total > 0 ? Math.round((p.terminees / p.total) * 100) : 0;
              return (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold app-text">{p.name}</span>
                    <span className="text-xs font-bold app-text2">{p.terminees}/{p.total} ({taux}%)</span>
                  </div>
                  <div className="w-full app-surface3 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${taux}%`,
                        backgroundColor: taux === 100 ? "#10b981" : taux >= 60 ? "#f59e0b" : "#ef4444"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Alertes et problèmes critiques */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xs font-black app-text3 mb-6 uppercase tracking-[0.2em]">Alertes & Actions Requises</h3>
        <div className="space-y-3">
          {problemesProjet.filter(p => p.statut !== "Résolu").length > 0 ? (
            problemesProjet.filter(p => p.statut !== "Résolu").map(p => (
              <div key={p.id} className="flex items-start gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-xl text-red-500 flex-shrink-0">
                  ⚠
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-100">{p.description}</p>
                  <p className="text-[10px] app-text3 font-bold uppercase tracking-widest mt-1">
                    {p.responsable} · Signalé le {p.dateSignalement}
                  </p>
                </div>
                <Badge value={p.priorite} />
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">✅</div>
              <p className="text-sm font-bold text-emerald-400">Aucun problème actif</p>
              <p className="text-xs app-text3 mt-1">Tout est sous contrôle</p>
            </div>
          )}

          {retardsActifs > 0 && (
            <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl text-amber-500 flex-shrink-0">
                ⏱
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-100">{retardsActifs} tâche(s) en retard détectée(s)</p>
                <p className="text-[10px] app-text3 font-bold uppercase tracking-widest mt-1">
                  Consultez le module Délais pour les détails
                </p>
              </div>
              <button 
                onClick={() => navigate('/delais')}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Voir →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Jalons du projet */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xs font-black app-text3 mb-6 uppercase tracking-[0.2em]">
          Jalons ({jalonsAtteints}/{jalonsTotal} atteints)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {jalonsProjet.map(j => (
            <div 
              key={j.id} 
              className={`p-4 rounded-xl border transition-all ${
                j.statut === "Atteint" 
                  ? "bg-emerald-500/10 border-emerald-500/30" 
                  : j.statut === "En cours"
                  ? "bg-amber-500/10 border-amber-500/30"
                  : "app-surface3 app-border2"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${
                  j.statut === "Atteint" ? "bg-emerald-400" : j.statut === "En cours" ? "bg-amber-400" : "bg-slate-500"
                }`} />
                <h4 className="text-sm font-bold text-slate-200 truncate">{j.jalon}</h4>
              </div>
              <p className="text-[10px] app-text3">{j.date}</p>
              <Badge value={j.statut} />
            </div>
          ))}
        </div>
      </div>

      {/* Liens rapides vers modules */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xs font-black app-text3 mb-6 uppercase tracking-[0.2em]">Accès Rapide aux Modules</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { nom: "Tâches", icon: "⊞", route: "/taches", color: "#6366f1" },
            { nom: "Gantt", icon: "📊", route: "/gantt", color: "#8b5cf6" },
            { nom: "Kanban", icon: "📋", route: "/kanban", color: "#a78bfa" },
            { nom: "Budget", icon: "💰", route: "/budget", color: "#10b981" },
            { nom: "Risques", icon: "⛨", route: "/risques", color: "#ef4444" },
            { nom: "Jalons", icon: "◆", route: "/jalons", color: "#06b6d4" },
            { nom: "Problèmes", icon: "⚠", route: "/problemes", color: "#f59e0b" },
            { nom: "Délais", icon: "⏱", route: "/delais", color: "#f97316" },
            { nom: "Ressources", icon: "👥", route: "/ressources", color: "#ec4899" },
            { nom: "EVM", icon: "📈", route: "/evm", color: "#14b8a6" },
            { nom: "Documents", icon: "📄", route: "/docs", color: "#64748b" },
            { nom: "Rapports", icon: "📑", route: "/rapports", color: "#7c3aed" },
          ].map(m => (
            <button
              key={m.route}
              onClick={() => navigate(m.route)}
              className="p-4 rounded-xl app-surface3 hover:app-surface3 border app-border2 hover:border-indigo-500/40 transition-all group text-center"
              style={{ '--hover-color': m.color }}
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{m.icon}</div>
              <div className="text-xs font-bold app-text2 group-hover:text-white transition-colors">{m.nom}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardProjet;
