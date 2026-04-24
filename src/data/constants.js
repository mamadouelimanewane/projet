export const INITIAL_DATA = {
  suivi: [],
  projets: [],
  taches: [],
  couts: [],
  jalons: [],
  problemes: [],
  risques: [],
  delais: [],
  kpis: [],
  budget: [],
  sprints: [],
  kanban: {
    backlog: [],
    enCours: [],
    enRevue: [],
    termine: []
  },
  ressources: [],
  gantt: [],
  cycle: [
    { id: "init", phase: "Initiation", statut: "A venir", progression: 0, livrable: "Charte de projet", description: "Définition de la vision et des objectifs." },
    { id: "plan", phase: "Planification", statut: "A venir", progression: 0, livrable: "Plan de management", description: "Établissement du périmètre, budget et délais." },
    { id: "exec", phase: "Exécution", statut: "A venir", progression: 0, livrable: "Livrables techniques", description: "Mise en œuvre des tâches planifiées." },
    { id: "monit", phase: "Monitoring", statut: "A venir", progression: 0, livrable: "Rapports d'avancement", description: "Contrôle et ajustement du projet." },
    { id: "close", phase: "Clôture", statut: "A venir", progression: 0, livrable: "Bilan projet", description: "Réception finale et archivage." }
  ],
  temps: [],
  documents: [],
  factures: [],
  workflows: [
    { id: 1, nom: "Alerte Dépassement Budget", declencheur: "Budget Consommé > 90%", action: "Email à la Direction", statut: "Actif" },
    { id: 2, nom: "Validation Jalon", declencheur: "Statut Jalon = Atteint", action: "Générer Facture Proforma", statut: "Actif" },
    { id: 3, nom: "Rappel Tâche en Retard", declencheur: "Date Limite < Aujourd'hui", action: "Notif Slack au Responsable", statut: "Inactif" }
  ],
  smartcontracts: [],
  okrs: [],
  intake: [],
  automations: [],
  webhooks: [],
  automate: "Hybride",
  safe: [],
  greenPmo: [],
  evm: [],
  genieCivil: {
    materiaux: [],
    securite: { incidents: 0, joursSansAccident: 0, tauxFrequence: 0 },
    impact: { emploiLocal: 0, pmeLocales: 0, scoreESG: 0 },
    typologies: {
      batiment: {
        projet: "",
        avancementTCE: [],
        unites: 0,
        unitesLivrees: 0
      },
      infrastructure: {
        projet: "",
        lineaireTotal: 0,
        lineaireActuel: 0,
        terrassement: { deblais: 0, remblais: 0, cible: 0 },
        engins: { dispo: 0, maintenance: 0, total: 0 }
      }
    },
    finances: {
      totalBudget: 0,
      decaissat: 0,
      engagements: 0,
      sCurve: [],
      bailleurs: []
    },
    rh: {
      effectifTotal: 0,
      categories: [],
      localContent: 0
    }
  },
  dependencies: [],
  sentiment: []
};

export const METHODOLOGIES = [
  { id: "agile", label: "Agile / Scrum", desc: "Itératif, sprints courts, focus valeur client.", icons: ["↻", "▦", "◉"] },
  { id: "waterfall", label: "Waterfall (Cascade)", desc: "Séquentiel, phases rigides, planification amont.", icons: ["▬", "◈", "◆"] },
  { id: "hybrid", label: "Hybride", desc: "Mélange de planification Waterfall et exécution Agile.", icons: ["⎔", "↻", "Σ"] },
  { id: "prince2", label: "PRINCE2", desc: "Gestion par étapes, contrôle strict, gouvernance.", icons: ["⛨", "⚙", "✓"] },
];

export const SCENARIOS = [
  { id: 1, label: "Perte de ressource clé", impact: { delai: 15, budget: 10, risque: 20 }, desc: "Un lead technique quitte le projet subitement." },
  { id: 2, label: "Coupe budgétaire (-20%)", impact: { delai: 10, budget: -20, risque: 15 }, desc: "Réduction immédiate des fonds alloués." },
  { id: 3, label: "Accélération du marché", impact: { delai: -20, budget: 30, risque: 25 }, desc: "Nécessité de sortir le produit 1 mois plus tôt." },
];

export const STATUT_COLORS = {
  "Fait": "#10b981", "Terminé": "#10b981", "Atteint": "#10b981", "Résolu": "#10b981", "Atténué": "#10b981",
  "En cours": "#f59e0b", "Planifié": "#6366f1",
  "À faire": "#94a3b8", "Actif": "#ef4444",
  "Critique": "#7c3aed", "Haute": "#ef4444", "Moyenne": "#f59e0b", "Basse": "#10b981",
  "Dépassement": "#ef4444", "Sous budget": "#10b981", "Normal": "#10b981",
  "hausse": "#10b981", "baisse": "#ef4444", "stable": "#f59e0b",
};

export const PRIORITE_COLORS = { "Critique": "#7c3aed", "Haute": "#ef4444", "Moyenne": "#f59e0b", "Basse": "#10b981" };
export const PIE_COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#7c3aed", "#4f46e5"];

export const MODULES = [
  { id: "dashboard-projet", label: "Dashboard par Projet (Nouveau)", icon: "📈" },
  { id: "dashboard", label: "Tableau de bord Global", icon: "⊡" },
  { id: "suivi", label: "Suivi Simple", icon: "✓" },
  { id: "multiprojets", label: "Multi-Projets", icon: "◈" },
  { id: "taches", label: "Tâches", icon: "⊞" },
  { id: "couts", label: "Coûts", icon: "FCFA" },
  { id: "jalons", label: "Jalons", icon: "◆" },
  { id: "problemes", label: "Problèmes", icon: "⚠" },
  { id: "risques", label: "Risques", icon: "⛨" },
  { id: "delais", label: "Délais", icon: "⏱" },
  { id: "kpi", label: "KPI", icon: "◉" },
  { id: "budget", label: "Budget", icon: "Σ" },
  { id: "agile", label: "Agile Sprint", icon: "↻" },
  { id: "kanban", label: "Kanban", icon: "▦" },
  { id: "ressources", label: "Ressources", icon: "⚙" },
  { id: "gantt", label: "Gantt", icon: "▬" },
  { id: "cycle", label: "Cycle de Vie", icon: "⎔" },
  { id: "assistant", label: "Assistance IA", icon: "✧" },
  { id: "simulation", label: "Simulateur", icon: "⚖" },
  { id: "methodologies", label: "Méthodologies", icon: "⚙" },
  { id: "portail", label: "Portail Client", icon: "👤" },
  { id: "temps", label: "Feuilles de Temps", icon: "⌛" },
  { id: "docs", label: "Documents", icon: "📄" },
  { id: "factures", label: "Facturation", icon: "💳" },
  { id: "workflows", label: "Workflows", icon: "⚡" },
  { id: "rapports", label: "Rapports", icon: "📊" },
  { id: "warroom", label: "War Room Virtuelle", icon: "🌐" },
  { id: "copilote", label: "Copilote IA", icon: "🧠" },
  { id: "smartcontracts", label: "Smart Contracts", icon: "⛓" },
  { id: "portfolio", label: "Portfolio Financier", icon: "📈" },
  { id: "okr", label: "Stratégie OKR", icon: "🎯" },
  { id: "calendrier", label: "Planning Master", icon: "📅" },
  { id: "webhooks", label: "Intégrations (API)", icon: "🔗" },
  { id: "intake", label: "Demandes & Modèles", icon: "📥" },
  { id: "automations", label: "Automatisations No-Code", icon: "🤖" },
  { id: "montecarlo", label: "Simulateur Monte-Carlo", icon: "🎲" },
  { id: "neuralmap", label: "Carte Portefeuille (Neural)", icon: "🕸" },
  { id: "redteam", label: "Red Team AI (Stress-Test)", icon: "🧛" },
  { id: "excel", label: "Pont Excel (Import/Export)", icon: "📊" },
  { id: "geniecivil", label: "Génie Civil Élite (BIM)", icon: "🏗" },
  { id: "sentiment", label: "Santé Humaine & Moral", icon: "🧠" },
  { id: "safe", label: "Agilité SAFe (Trains)", icon: "🚂" },
  { id: "greenpmo", label: "Bilan Carbone (ESG)", icon: "🌱" },
  { id: "evm", label: "Valeur Acquise (EVM)", icon: "🧮" },
  { id: "guide", label: "Guide Débutant", icon: "🧭" },
];
