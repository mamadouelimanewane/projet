import React, { useState, useMemo } from "react";
import { SectionHeader, Card, Btn, TooltipInfo, ProgressBar } from "../ui";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";

// ─── DIAGNOSTIC ENGINE ───
function diagnostiquerProjet(data) {
  const alertes = [];
  const conseils = [];
  const projets = data.projets || [];
  const taches = data.taches || [];
  const risques = data.risques || [];
  const jalons = data.jalons || [];
  const budget = data.budget || [];
  const couts = data.couts || [];

  const totalBudgetP = budget.reduce((s, b) => s + (b.planifie || 0), 0);
  const totalBudgetR = budget.reduce((s, b) => s + (b.reel || 0), 0);
  const budgetPct = totalBudgetP > 0 ? Math.round((totalBudgetR / totalBudgetP) * 100) : 0;

  const tachesFaites = taches.filter(t => t.statut === "Terminé" || t.statut === "Fait").length;
  const tachesEnCours = taches.filter(t => t.statut === "En cours").length;
  const tachesRetard = taches.filter(t => t.statut === "En retard").length;
  const risquesActifs = risques.filter(r => r.statut === "Actif");
  const avancement = projets.length > 0 ? Math.round(projets.reduce((s, p) => s + (p.avancement || 0), 0) / projets.length) : 0;

  // ── ALERTES CRITIQUES ──
  if (budgetPct > 90) alertes.push({ type: "critique", icon: "🔴", titre: "Dépassement budgétaire imminent", desc: `Le budget est consommé à ${budgetPct}%. Risque de dépassement majeur.`, action: "Geler les dépenses non essentielles et convoquer un comité de pilotage.", module: "/budget" });
  if (budgetPct > 70 && avancement < 50) alertes.push({ type: "warning", icon: "🟡", titre: "Désynchronisation Budget/Avancement", desc: `Budget à ${budgetPct}% mais avancement à ${avancement}%. Le CPI est défavorable.`, action: "Réévaluer le planning et identifier les postes de surcoût.", module: "/outils-expert" });
  if (risquesActifs.length > 2) alertes.push({ type: "warning", icon: "🟠", titre: `${risquesActifs.length} risques actifs non traités`, desc: "Trop de risques ouverts augmentent la probabilité de crise.", action: "Prioriser par score (Gravité × Probabilité) et traiter les 2 plus critiques.", module: "/risques" });
  if (tachesRetard > 0) alertes.push({ type: "critique", icon: "🔴", titre: `${tachesRetard} tâche(s) en retard`, desc: "Des tâches dépassent leur date limite. Impact potentiel sur le chemin critique.", action: "Appliquer le Fast Tracking ou le Crashing sur les tâches critiques.", module: "/taches" });
  if (projets.length === 0) alertes.push({ type: "info", icon: "🔵", titre: "Aucun projet créé", desc: "Commencez par créer votre premier projet.", action: "Utilisez le Wizard pour une création guidée pas à pas.", module: "/nouveau-projet" });

  // ── CONSEILS PROACTIFS ──
  if (taches.length > 0 && tachesFaites === 0) conseils.push({ icon: "🎯", titre: "Démarrez par une victoire rapide", desc: "Aucune tâche n'est marquée 'Terminée'. Identifiez une tâche simple à clôturer pour motiver l'équipe.", pmbok: "Principe : Focus sur la valeur" });
  if (jalons.length === 0) conseils.push({ icon: "📅", titre: "Définissez vos jalons", desc: "Les jalons structurent le projet en étapes claires. Sans eux, l'équipe navigue à vue.", pmbok: "Domaine : Planification" });
  if (risques.length === 0 && projets.length > 0) conseils.push({ icon: "⚠️", titre: "Identifiez vos risques", desc: "Tout projet a des risques. Ne pas les identifier = les accepter passivement.", pmbok: "Domaine : Incertitude" });
  if (avancement > 30 && avancement < 70) conseils.push({ icon: "📊", titre: "Passez au suivi EVM", desc: `Avec ${avancement}% d'avancement, c'est le moment de calculer SPI et CPI pour anticiper les dérives.`, pmbok: "Outil : Earned Value Management" });
  if (tachesEnCours > 5) conseils.push({ icon: "🔄", titre: "Limitez le travail en cours (WIP)", desc: `${tachesEnCours} tâches simultanées = dispersion. Limitez à 3-4 tâches en parallèle.`, pmbok: "Pratique Kanban : WIP Limits" });
  if (couts.length > 0) {
    const ecart = couts.reduce((s, c) => s + ((c.reel || 0) - (c.prevu || 0)), 0);
    if (ecart > 0) conseils.push({ icon: "💰", titre: "Écart budgétaire positif détecté", desc: `Surcoût de ${(ecart / 1000000).toFixed(1)}M FCFA. Analysez les causes : scope creep, mauvaises estimations ou prix marchés.`, pmbok: "Outil : Analyse des écarts" });
  }
  if (projets.length > 0 && budget.length === 0) conseils.push({ icon: "💼", titre: "Structurez votre budget", desc: "Un projet sans budget détaillé est ingouvernable. Décomposez par catégorie (RH, Matériel, Services).", pmbok: "Processus : Déterminer le budget" });

  // Conseils pédagogiques constants
  conseils.push({ icon: "📚", titre: "Formation continue", desc: "Consultez le module Certifications pour préparer votre CAPM ou PMP.", pmbok: "PMI Talent Triangle" });

  return { alertes, conseils, stats: { avancement, budgetPct, taches: taches.length, tachesFaites, risquesActifs: risquesActifs.length } };
}

// ─── CHECKLIST PHASES ───
const CHECKLISTS = {
  initiation: [
    "Business Case / Note d'opportunité rédigée",
    "Sponsor identifié et engagé",
    "Charte de Projet signée",
    "Parties prenantes principales listées",
    "Objectifs SMART définis",
  ],
  planification: [
    "WBS (décomposition des tâches) complète",
    "Gantt / Planning construit",
    "Budget estimé et validé",
    "Registre des risques initialisé",
    "Matrice RACI définie",
    "Plan de communication établi",
  ],
  execution: [
    "Équipe mobilisée et briefée",
    "Réunions d'avancement planifiées",
    "Outils de suivi en place (Kanban, Gantt)",
    "Processus de Change Request défini",
    "Premiers livrables produits",
  ],
  surveillance: [
    "SPI et CPI calculés (EVM)",
    "Rapport d'avancement produit",
    "Risques réévalués cette semaine",
    "Écarts identifiés et actions correctives lancées",
    "Comité de pilotage informé",
  ],
  cloture: [
    "Livrables acceptés par le client",
    "Réunion REX (Retour d'Expérience) tenue",
    "Documentation archivée",
    "Bons de commande clôturés",
    "Équipe remerciée et libérée",
  ],
};

export default function MentorIA() {
  const navigate = useNavigate();
  const { data, userMode } = useStore();
  const [tab, setTab] = useState("diagnostic");
  const [checkPhase, setCheckPhase] = useState("initiation");
  const [checks, setChecks] = useState({});

  const diag = useMemo(() => diagnostiquerProjet(data), [data]);

  const toggleCheck = (phase, idx) => {
    const key = `${phase}-${idx}`;
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const phaseProgress = (phase) => {
    const items = CHECKLISTS[phase];
    const done = items.filter((_, i) => checks[`${phase}-${i}`]).length;
    return Math.round((done / items.length) * 100);
  };

  const PHASE_META = {
    initiation: { label: "🎯 Initiation", color: "#6366f1" },
    planification: { label: "📋 Planification", color: "#10b981" },
    execution: { label: "🚀 Exécution", color: "#f59e0b" },
    surveillance: { label: "📊 Surveillance", color: "#ec4899" },
    cloture: { label: "✅ Clôture", color: "#8b5cf6" },
  };

  return (
    <div className="space-y-6 animate-entrance max-w-5xl mx-auto">
      <SectionHeader
        title={<>🤖 Mentor IA <TooltipInfo term="Mentor IA" definition="Système d'intelligence artificielle qui analyse votre projet en temps réel et propose des actions correctives basées sur les meilleures pratiques PMBOK, Scrum et PRINCE2." /></>}
        subtitle="Diagnostic automatique, checklists de phase et coaching proactif"
      />

      <div className="flex gap-2 flex-wrap border-b app-border pb-4">
        {[
          { id: "diagnostic", label: "🔍 Diagnostic Projet" },
          { id: "checklist", label: "✅ Checklists de Phase" },
          { id: "coaching", label: "💡 Coaching Proactif" },
        ].map(t => (
          <Btn key={t.id} variant={tab === t.id ? "primary" : "ghost"} size="sm" onClick={() => setTab(t.id)}>{t.label}</Btn>
        ))}
      </div>

      {/* ── DIAGNOSTIC ── */}
      {tab === "diagnostic" && (
        <div className="space-y-6 animate-entrance">
          {/* Health Score */}
          <Card className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900/30 border border-indigo-500/20">
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1e293b" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none"
                    stroke={diag.stats.avancement > 60 ? "#10b981" : diag.stats.avancement > 30 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="3" strokeDasharray={`${diag.stats.avancement}, 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-black app-text">{diag.stats.avancement}%</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-black app-text mb-1">Santé du Projet</h2>
                <p className="text-xs app-text2 mb-3">
                  {diag.alertes.filter(a => a.type === "critique").length > 0 ? "⚠️ Attention requise — alertes critiques détectées" :
                   diag.alertes.length > 0 ? "🟡 Surveillance active — quelques points d'attention" :
                   "✅ Projet en bonne santé"}
                </p>
                <div className="flex gap-4 text-xs">
                  <span className="app-text2">Budget : <span className="font-bold app-text">{diag.stats.budgetPct}%</span></span>
                  <span className="app-text2">Tâches : <span className="font-bold app-text">{diag.stats.tachesFaites}/{diag.stats.taches}</span></span>
                  <span className="app-text2">Risques : <span className="font-bold text-red-400">{diag.stats.risquesActifs}</span></span>
                </div>
              </div>
            </div>
          </Card>

          {/* Alertes */}
          {diag.alertes.length > 0 && (
            <div>
              <p className="text-[10px] font-black app-text3 uppercase tracking-widest mb-3">Alertes ({diag.alertes.length})</p>
              <div className="space-y-3">
                {diag.alertes.map((a, i) => (
                  <Card key={i} className={`p-4 ${a.type === "critique" ? "border-red-500/30 bg-red-500/5" : a.type === "warning" ? "border-amber-500/30 bg-amber-500/5" : "border-blue-500/30 bg-blue-500/5"}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">{a.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold app-text mb-1">{a.titre}</h4>
                        <p className="text-xs app-text2 mb-2">{a.desc}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-indigo-400">→ {a.action}</p>
                          <Btn variant="ghost" size="sm" onClick={() => navigate(a.module)}>Aller au module →</Btn>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {diag.alertes.length === 0 && (
            <Card className="p-6 text-center bg-emerald-500/5 border border-emerald-500/20">
              <span className="text-4xl block mb-2">✅</span>
              <p className="app-text font-bold">Aucune alerte critique</p>
              <p className="text-xs app-text2 mt-1">Le Mentor IA surveille votre projet en continu.</p>
            </Card>
          )}
        </div>
      )}

      {/* ── CHECKLISTS ── */}
      {tab === "checklist" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-entrance">
          <div className="space-y-2">
            <p className="text-[10px] font-black app-text3 uppercase tracking-widest mb-3">Phase du Projet</p>
            {Object.entries(PHASE_META).map(([key, meta]) => {
              const pct = phaseProgress(key);
              return (
                <button key={key} onClick={() => setCheckPhase(key)}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-all ${checkPhase === key ? "border-indigo-500 bg-indigo-500/10" : "app-border app-surface hover:app-border2"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold app-text">{meta.label}</span>
                    <span className="text-xs font-black" style={{ color: meta.color }}>{pct}%</span>
                  </div>
                  <ProgressBar value={pct} color={meta.color} />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-2">
            <Card className="p-6" style={{ borderLeft: `4px solid ${PHASE_META[checkPhase].color}` }}>
              <h3 className="text-lg font-black app-text mb-1">{PHASE_META[checkPhase].label}</h3>
              <p className="text-xs app-text2 mb-5">Cochez les éléments validés. Progression : <span className="font-bold text-indigo-400">{phaseProgress(checkPhase)}%</span></p>
              <div className="space-y-2">
                {CHECKLISTS[checkPhase].map((item, i) => {
                  const done = checks[`${checkPhase}-${i}`];
                  return (
                    <button key={i} onClick={() => toggleCheck(checkPhase, i)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${done ? "border-emerald-500/40 bg-emerald-500/10" : "app-border app-surface2 hover:app-border2"}`}>
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 ${done ? "bg-emerald-500 text-white" : "app-surface3 app-text3"}`}>
                        {done ? "✓" : ""}
                      </span>
                      <span className={`text-sm ${done ? "text-emerald-300 line-through opacity-70" : "text-white"}`}>{item}</span>
                    </button>
                  );
                })}
              </div>
            </Card>

            {userMode === "debutant" && (
              <div className="mt-4 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-sm text-indigo-300">
                💡 <strong>Conseil :</strong> Ne passez pas à la phase suivante tant que vous n'avez pas validé au moins 80% de la checklist. C'est la discipline qui fait la différence entre un projet amateur et un projet professionnel.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── COACHING ── */}
      {tab === "coaching" && (
        <div className="space-y-4 animate-entrance">
          <p className="text-sm app-text2 mb-2">Le Mentor IA analyse l'état actuel de votre projet et génère des recommandations personnalisées.</p>
          {diag.conseils.map((c, i) => (
            <Card key={i} className="p-5 hover:border-indigo-500/30 transition-all">
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{c.icon}</span>
                <div className="flex-1">
                  <h4 className="text-sm font-bold app-text mb-1">{c.titre}</h4>
                  <p className="text-xs app-text2 mb-2">{c.desc}</p>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{c.pmbok}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
