import { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

// ═══════════════════════════════════════════
// INITIAL DATA
// ═══════════════════════════════════════════
const INITIAL_DATA = {
  suivi: [
    { id: 1, tache: "Analyse des besoins", responsable: "Jean D.", dateLimite: "2026-03-01", statut: "Fait", priorite: "Haute" },
    { id: 2, tache: "Architecture système", responsable: "Marie C.", dateLimite: "2026-03-15", statut: "En cours", priorite: "Moyenne" },
    { id: 3, tache: "Développement Frontend", responsable: "Paul M.", dateLimite: "2026-04-01", statut: "En cours", priorite: "Haute" },
    { id: 4, tache: "Tests unitaires", responsable: "Sophie L.", dateLimite: "2026-04-20", statut: "À faire", priorite: "Moyenne" },
    { id: 5, tache: "Déploiement production", responsable: "Jean D.", dateLimite: "2026-05-01", statut: "À faire", priorite: "Haute" },
  ],
  projets: [
    { id: 1, nom: "Refonte SI Comptable", chef: "Jean D.", debut: "2026-01-01", fin: "2026-06-30", avancement: 65, statut: "En cours", budget: 120000000, budgetReel: 78000000 },
    { id: 2, nom: "App Mobile RH", chef: "Marie C.", debut: "2026-02-01", fin: "2026-07-31", avancement: 30, statut: "En cours", budget: 85000000, budgetReel: 25500000 },
    { id: 3, nom: "Migration Cloud", chef: "Paul M.", debut: "2026-03-01", fin: "2026-09-30", avancement: 10, statut: "Planifié", budget: 200000000, budgetReel: 20000000 },
    { id: 4, nom: "Portail Client", chef: "Sophie L.", debut: "2025-09-01", fin: "2026-02-28", avancement: 100, statut: "Terminé", budget: 60000000, budgetReel: 62000000 },
  ],
  taches: [
    { id: 1, projet: "Refonte SI Comptable", tache: "Audit existant", responsable: "Jean D.", debut: "2026-01-01", fin: "2026-01-31", statut: "Fait", priorite: "Haute", progression: 100 },
    { id: 2, projet: "Refonte SI Comptable", tache: "Specs techniques", responsable: "Marie C.", debut: "2026-02-01", fin: "2026-02-28", statut: "Fait", priorite: "Haute", progression: 100 },
    { id: 3, projet: "Refonte SI Comptable", tache: "Développement module A", responsable: "Paul M.", debut: "2026-03-01", fin: "2026-04-30", statut: "En cours", priorite: "Haute", progression: 60 },
    { id: 4, projet: "App Mobile RH", tache: "Maquettes UX", responsable: "Sophie L.", debut: "2026-02-01", fin: "2026-02-15", statut: "Fait", priorite: "Haute", progression: 100 },
    { id: 5, projet: "App Mobile RH", tache: "Backend API", responsable: "Jean D.", debut: "2026-02-16", fin: "2026-04-30", statut: "En cours", priorite: "Haute", progression: 35 },
    { id: 6, projet: "Migration Cloud", tache: "Audit infrastructure", responsable: "Paul M.", debut: "2026-03-01", fin: "2026-03-31", statut: "En cours", priorite: "Moyenne", progression: 20 },
  ],
  couts: [
    { id: 1, phase: "Conception", prevu: 15000000, reel: 14200000, statut: "Sous budget" },
    { id: 2, phase: "Développement", prevu: 60000000, reel: 63000000, statut: "Dépassement" },
    { id: 3, phase: "Tests & QA", prevu: 12000000, reel: 10800000, statut: "Sous budget" },
    { id: 4, phase: "Déploiement", prevu: 8000000, reel: 7500000, statut: "Sous budget" },
    { id: 5, phase: "Formation", prevu: 5000000, reel: 4800000, statut: "Sous budget" },
    { id: 6, phase: "Maintenance", prevu: 20000000, reel: 18500000, statut: "Sous budget" },
  ],
  jalons: [
    { id: 1, jalon: "Kick-off projet", date: "2026-01-15", responsable: "Jean D.", statut: "Atteint", notes: "Réunion de lancement réussie" },
    { id: 2, jalon: "Validation specs", date: "2026-02-28", responsable: "Marie C.", statut: "Atteint", notes: "Specs validées par le client" },
    { id: 3, jalon: "Livraison MVP", date: "2026-04-15", responsable: "Paul M.", statut: "En cours", notes: "En développement" },
    { id: 4, jalon: "Tests UAT", date: "2026-05-15", responsable: "Sophie L.", statut: "Planifié", notes: "À planifier avec client" },
    { id: 5, jalon: "Mise en production", date: "2026-06-30", responsable: "Jean D.", statut: "Planifié", notes: "Date cible finale" },
  ],
  problemes: [
    { id: 1, description: "Bug critique dans le module de facturation", priorite: "Critique", statut: "En cours", responsable: "Paul M.", dateSignalement: "2026-02-10", resolution: "" },
    { id: 2, description: "Performance dégradée sur les rapports", priorite: "Haute", statut: "Résolu", responsable: "Marie C.", dateSignalement: "2026-01-25", resolution: "Optimisation des requêtes SQL" },
    { id: 3, description: "Problème d'authentification SSO", priorite: "Haute", statut: "En cours", responsable: "Jean D.", dateSignalement: "2026-02-18", resolution: "" },
    { id: 4, description: "Interface non responsive sur mobile", priorite: "Moyenne", statut: "À faire", responsable: "Sophie L.", dateSignalement: "2026-02-20", resolution: "" },
    { id: 5, description: "Exports CSV incorrects", priorite: "Basse", statut: "Résolu", responsable: "Paul M.", dateSignalement: "2026-01-30", resolution: "Correction format encodage" },
  ],
  risques: [
    { id: 1, risque: "Départ d'un membre clé", gravite: 5, probabilite: 2, attenuation: "Plan de succession, documentation", statut: "Actif" },
    { id: 2, risque: "Dépassement budgétaire", gravite: 4, probabilite: 3, attenuation: "Suivi hebdomadaire des coûts", statut: "Actif" },
    { id: 3, risque: "Changement des exigences", gravite: 4, probabilite: 4, attenuation: "Processus de gestion des changements", statut: "Actif" },
    { id: 4, risque: "Retard fournisseur", gravite: 3, probabilite: 2, attenuation: "Contrats avec pénalités", statut: "Atténué" },
    { id: 5, risque: "Faille de sécurité", gravite: 5, probabilite: 1, attenuation: "Audits de sécurité réguliers", statut: "Actif" },
    { id: 6, risque: "Indisponibilité infrastructure", gravite: 4, probabilite: 2, attenuation: "Plan de reprise d'activité", statut: "Atténué" },
  ],
  delais: [
    { id: 1, tache: "Module comptabilité", planifie: "2026-03-15", reel: "2026-03-28", cause: "Complexité sous-estimée", responsable: "Paul M.", impact: "Moyen" },
    { id: 2, tache: "Intégration API bancaire", planifie: "2026-02-28", reel: "2026-03-10", cause: "Retard partenaire", responsable: "Jean D.", impact: "Faible" },
    { id: 3, tache: "Tests de charge", planifie: "2026-04-01", reel: "", cause: "", responsable: "Sophie L.", impact: "À déterminer" },
    { id: 4, tache: "Formation utilisateurs", planifie: "2026-05-15", reel: "", cause: "", responsable: "Marie C.", impact: "À déterminer" },
  ],
  kpis: [
    { id: 1, nom: "Taux d'avancement global", valeur: 58, cible: 65, unite: "%", tendance: "hausse", categorie: "Progression" },
    { id: 2, nom: "Budget consommé", valeur: 42, cible: 50, unite: "%", tendance: "stable", categorie: "Finance" },
    { id: 3, nom: "Tâches complétées", valeur: 24, cible: 30, unite: "tâches", tendance: "hausse", categorie: "Productivité" },
    { id: 4, nom: "Satisfaction client", valeur: 82, cible: 85, unite: "%", tendance: "hausse", categorie: "Qualité" },
    { id: 5, nom: "Vélocité équipe", valeur: 45, cible: 50, unite: "pts/sprint", tendance: "baisse", categorie: "Agile" },
    { id: 6, nom: "Taux de défauts", valeur: 3.2, cible: 2, unite: "%", tendance: "baisse", categorie: "Qualité" },
    { id: 7, nom: "Délai moyen livraison", valeur: 4.5, cible: 3, unite: "jours", tendance: "stable", categorie: "Délais" },
    { id: 8, nom: "ROI estimé", valeur: 145, cible: 150, unite: "%", tendance: "hausse", categorie: "Finance" },
  ],
  budget: [
    { id: 1, categorie: "Ressources humaines", planifie: 180000000, reel: 125000000, statut: "Normal" },
    { id: 2, categorie: "Infrastructure IT", planifie: 45000000, reel: 38000000, statut: "Normal" },
    { id: 3, categorie: "Licences logicielles", planifie: 25000000, reel: 27500000, statut: "Dépassement" },
    { id: 4, categorie: "Prestataires externes", planifie: 60000000, reel: 42000000, statut: "Normal" },
    { id: 5, categorie: "Formation", planifie: 15000000, reel: 8000000, statut: "Normal" },
    { id: 6, categorie: "Divers & imprévus", planifie: 20000000, reel: 12500000, statut: "Normal" },
  ],
  sprints: [
    {
      id: 1, nom: "Sprint 1", debut: "2026-01-06", fin: "2026-01-17", objectif: "Setup initial et authentification", statut: "Terminé", vitesse: 42, stories: [
        { id: 1, titre: "Setup projet", points: 5, statut: "Terminé", assignee: "Jean D." },
        { id: 2, titre: "Auth utilisateur", points: 8, statut: "Terminé", assignee: "Marie C." },
        { id: 3, titre: "Base de données", points: 13, statut: "Terminé", assignee: "Paul M." },
        { id: 4, titre: "CI/CD pipeline", points: 8, statut: "Terminé", assignee: "Sophie L." },
      ]
    },
    {
      id: 2, nom: "Sprint 2", debut: "2026-01-20", fin: "2026-01-31", objectif: "Module comptabilité de base", statut: "Terminé", vitesse: 38, stories: [
        { id: 5, titre: "Saisie factures", points: 13, statut: "Terminé", assignee: "Paul M." },
        { id: 6, titre: "Liste fournisseurs", points: 8, statut: "Terminé", assignee: "Jean D." },
        { id: 7, titre: "Rapports basiques", points: 8, statut: "Terminé", assignee: "Marie C." },
      ]
    },
    {
      id: 3, nom: "Sprint 3", debut: "2026-02-03", fin: "2026-02-14", objectif: "Intégrations bancaires", statut: "En cours", vitesse: 0, stories: [
        { id: 8, titre: "API Banque X", points: 13, statut: "En cours", assignee: "Jean D." },
        { id: 9, titre: "Rapprochement bancaire", points: 8, statut: "En cours", assignee: "Paul M." },
        { id: 10, titre: "Exports comptables", points: 5, statut: "À faire", assignee: "Marie C." },
        { id: 11, titre: "Tests intégration", points: 8, statut: "À faire", assignee: "Sophie L." },
      ]
    },
  ],
  kanban: {
    backlog: [
      { id: 1, titre: "Module reporting avancé", priorite: "Haute", assignee: "Jean D.", points: 13, couleur: "#ef4444" },
      { id: 2, titre: "Export PDF personnalisé", priorite: "Moyenne", assignee: "Marie C.", points: 8, couleur: "#f59e0b" },
      { id: 3, titre: "Dashboard analytics", priorite: "Haute", assignee: "Paul M.", points: 21, couleur: "#ef4444" },
      { id: 4, titre: "Notifications email", priorite: "Basse", assignee: "Sophie L.", points: 5, couleur: "#10b981" },
    ],
    enCours: [
      { id: 5, titre: "API intégration bancaire", priorite: "Critique", assignee: "Jean D.", points: 13, couleur: "#7c3aed" },
      { id: 6, titre: "Module authentification SSO", priorite: "Haute", assignee: "Marie C.", points: 8, couleur: "#ef4444" },
    ],
    enRevue: [
      { id: 7, titre: "Formulaire de saisie factures", priorite: "Haute", assignee: "Paul M.", points: 8, couleur: "#ef4444" },
    ],
    termine: [
      { id: 8, titre: "Setup base de données", priorite: "Critique", assignee: "Sophie L.", points: 13, couleur: "#7c3aed" },
      { id: 9, titre: "Architecture microservices", priorite: "Haute", assignee: "Jean D.", points: 21, couleur: "#ef4444" },
    ]
  },
  ressources: [
    { id: 1, membre: "Jean Dupont", role: "Tech Lead", projet: "Refonte SI Comptable", disponibilite: 100, charge: 80, debut: "2026-01-01", fin: "2026-06-30", specialite: "Backend" },
    { id: 2, membre: "Marie Curie", role: "Analyste", projet: "Refonte SI Comptable", disponibilite: 80, charge: 75, debut: "2026-01-01", fin: "2026-05-31", specialite: "Analyse" },
    { id: 3, membre: "Paul Martin", role: "Dev Senior", projet: "App Mobile RH", disponibilite: 100, charge: 90, debut: "2026-02-01", fin: "2026-07-31", specialite: "Mobile" },
    { id: 4, membre: "Sophie Leroux", role: "QA Engineer", projet: "Migration Cloud", disponibilite: 60, charge: 55, debut: "2026-03-01", fin: "2026-09-30", specialite: "Tests" },
    { id: 5, membre: "Thomas Bernard", role: "DevOps", projet: "Migration Cloud", disponibilite: 100, charge: 85, debut: "2026-03-01", fin: "2026-09-30", specialite: "DevOps" },
    { id: 6, membre: "Emma Petit", role: "UX Designer", projet: "App Mobile RH", disponibilite: 50, charge: 45, debut: "2026-02-01", fin: "2026-04-30", specialite: "Design" },
  ],
  gantt: [
    { id: 1, tache: "Phase 1 - Analyse", debut: "2026-01-01", fin: "2026-01-31", responsable: "Jean D.", progression: 100, dependance: null, couleur: "#6366f1" },
    { id: 2, tache: "Phase 2 - Conception", debut: "2026-02-01", fin: "2026-02-28", responsable: "Marie C.", progression: 100, dependance: 1, couleur: "#8b5cf6" },
    { id: 3, tache: "Phase 3 - Développement", debut: "2026-03-01", fin: "2026-04-30", responsable: "Paul M.", progression: 45, dependance: 2, couleur: "#a78bfa" },
    { id: 4, tache: "Phase 4 - Tests", debut: "2026-04-15", fin: "2026-05-31", responsable: "Sophie L.", progression: 0, dependance: 3, couleur: "#c4b5fd" },
    { id: 5, tache: "Phase 5 - Déploiement", debut: "2026-06-01", fin: "2026-06-30", responsable: "Jean D.", progression: 0, dependance: 4, couleur: "#7c3aed" },
    { id: 6, tache: "Formation utilisateurs", debut: "2026-06-15", fin: "2026-06-30", responsable: "Marie C.", progression: 0, dependance: 4, couleur: "#5b21b6" },
  ],
};

// ═══════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════
const STATUT_COLORS = {
  "Fait": "#10b981", "Terminé": "#10b981", "Atteint": "#10b981", "Résolu": "#10b981", "Atténué": "#10b981",
  "En cours": "#f59e0b", "Planifié": "#6366f1",
  "À faire": "#94a3b8", "Actif": "#ef4444",
  "Critique": "#7c3aed", "Haute": "#ef4444", "Moyenne": "#f59e0b", "Basse": "#10b981",
  "Dépassement": "#ef4444", "Sous budget": "#10b981", "Normal": "#10b981",
  "hausse": "#10b981", "baisse": "#ef4444", "stable": "#f59e0b",
};

const PRIORITE_COLORS = { "Critique": "#7c3aed", "Haute": "#ef4444", "Moyenne": "#f59e0b", "Basse": "#10b981" };
const PIE_COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#7c3aed", "#4f46e5"];

const MODULES = [
  { id: "dashboard", label: "Tableau de bord", icon: "⊡" },
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
];

// ═══════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════
const Badge = ({ value, map = STATUT_COLORS, size = "sm" }) => {
  const color = map[value] || "#94a3b8";
  const pad = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${pad}`}
      style={{ backgroundColor: color + "22", color, border: `1px solid ${color}55` }}>
      {value}
    </span>
  );
};

const ProgressBar = ({ value, max = 100, color = "#6366f1" }) => (
  <div className="flex items-center gap-2 w-full">
    <div className="flex-1 bg-slate-700 rounded-full h-1.5 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min((value / max) * 100, 100)}%`, backgroundColor: color }} />
    </div>
    <span className="text-xs text-slate-400 w-10 text-right">{value}{max !== 100 ? "" : "%"}</span>
  </div>
);

const StatCard = ({ label, value, sub, color = "#6366f1", icon }) => (
  <div className="rounded-xl p-4 border border-slate-700/50 bg-slate-800/60 backdrop-blur flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</p>
      <span className="text-xl" style={{ color }}>{icon}</span>
    </div>
    <p className="text-3xl font-black" style={{ color }}>{value}</p>
    {sub && <p className="text-xs text-slate-500">{sub}</p>}
  </div>
);

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
    <div className="bg-slate-800 border border-slate-600 rounded-2xl w-full max-w-lg shadow-2xl">
      <div className="flex justify-between items-center p-5 border-b border-slate-700">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">×</button>
      </div>
      <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">{children}</div>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    {label && <label className="block text-xs text-slate-400 mb-1 font-medium">{label}</label>}
    <input className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500" {...props} />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    {label && <label className="block text-xs text-slate-400 mb-1 font-medium">{label}</label>}
    <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500" {...props}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    {label && <label className="block text-xs text-slate-400 mb-1 font-medium">{label}</label>}
    <textarea className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none" rows={3} {...props} />
  </div>
);

const Btn = ({ children, onClick, variant = "primary", size = "sm", className = "" }) => {
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white",
    danger: "bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-600/30",
    ghost: "bg-slate-700 hover:bg-slate-600 text-slate-300",
    success: "bg-emerald-600 hover:bg-emerald-500 text-white",
  };
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  return (
    <button onClick={onClick} className={`rounded-lg font-semibold transition-all ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle, action }) => (
  <div className="flex justify-between items-start mb-6">
    <div>
      <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
    </div>
    {action}
  </div>
);

// ═══════════════════════════════════════════
// MODULE: DASHBOARD
// ═══════════════════════════════════════════
const Dashboard = ({ data }) => {
  const totalProjets = data.projets.length;
  const projetsActifs = data.projets.filter(p => p.statut === "En cours").length;
  const tachesEnCours = data.taches.filter(t => t.statut === "En cours").length;
  const risquesActifs = data.risques.filter(r => r.statut === "Actif").length;
  const avgAvancement = Math.round(data.projets.reduce((s, p) => s + p.avancement, 0) / data.projets.length);
  const totalBudgetP = data.budget.reduce((s, b) => s + b.planifie, 0);
  const totalBudgetR = data.budget.reduce((s, b) => s + b.reel, 0);
  const budgetPct = Math.round((totalBudgetR / totalBudgetP) * 100);

  const avancementData = data.projets.map(p => ({ name: p.nom.substring(0, 15) + "…", value: p.avancement }));
  const budgetData = data.couts.map(c => ({ name: c.phase, Prévu: c.prevu, Réel: c.reel }));
  const statutData = [
    { name: "Terminé", value: data.projets.filter(p => p.statut === "Terminé").length },
    { name: "En cours", value: data.projets.filter(p => p.statut === "En cours").length },
    { name: "Planifié", value: data.projets.filter(p => p.statut === "Planifié").length },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      <SectionHeader title="Tableau de bord" subtitle="Vue globale de vos projets en temps réel" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Projets Actifs" value={projetsActifs} sub={`sur ${totalProjets} total`} color="#6366f1" icon="◈" />
        <StatCard label="Avancement Global" value={`${avgAvancement}%`} sub="moyenne tous projets" color="#8b5cf6" icon="◉" />
        <StatCard label="Budget Consommé" value={`${budgetPct}%`} sub={`${(totalBudgetR / 1000).toFixed(0)}k FCFA / ${(totalBudgetP / 1000).toFixed(0)}k FCFA`} color="#a78bfa" icon="Σ" />
        <StatCard label="Risques Actifs" value={risquesActifs} sub="nécessitant attention" color="#ef4444" icon="⛨" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Tâches En cours" value={tachesEnCours} sub={`${data.taches.filter(t => t.statut === 'Fait').length} terminées`} color="#10b981" icon="⊞" />
        <StatCard label="Problèmes Ouverts" value={data.problemes.filter(p => p.statut !== "Résolu").length} sub={`${data.problemes.filter(p => p.priorite === "Critique").length} critiques`} color="#f59e0b" icon="⚠" />
        <StatCard label="Jalons Atteints" value={data.jalons.filter(j => j.statut === "Atteint").length} sub={`sur ${data.jalons.length} total`} color="#06b6d4" icon="◆" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Avancement par Projet</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={avancementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} name="%" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Coûts Prévus vs Réels</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} formatter={v => `${v.toLocaleString()} FCFA`} />
              <Legend />
              <Bar dataKey="Prévu" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Réel" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Statut Projets</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statutData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {statutData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="md:col-span-2 bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Alertes & Actions Requises</h3>
          <div className="space-y-2">
            {data.problemes.filter(p => p.statut !== "Résolu" && (p.priorite === "Critique" || p.priorite === "Haute")).map(p => (
              <div key={p.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/50 border border-slate-600/30">
                <span className="text-sm mt-0.5" style={{ color: PRIORITE_COLORS[p.priorite] }}>⚠</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200 truncate">{p.description}</p>
                  <p className="text-xs text-slate-500">{p.responsable} · {p.dateSignalement}</p>
                </div>
                <Badge value={p.priorite} map={PRIORITE_COLORS} />
              </div>
            ))}
            {data.risques.filter(r => r.gravite * r.probabilite >= 8).map(r => (
              <div key={r.id} className="flex items-start gap-3 p-3 rounded-lg bg-red-900/20 border border-red-700/30">
                <span className="text-sm mt-0.5 text-red-400">⛨</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200 truncate">Risque élevé : {r.risque}</p>
                  <p className="text-xs text-slate-500">Score : {r.gravite * r.probabilite}/25</p>
                </div>
                <Badge value="Risque" map={{ Risque: "#ef4444" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: SUIVI SIMPLE
// ═══════════════════════════════════════════
const SuiviSimple = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [filter, setFilter] = useState("Tous");

  const filtered = filter === "Tous" ? data : data.filter(t => t.statut === filter);
  const openAdd = () => { setForm({ tache: "", responsable: "", dateLimite: "", statut: "À faire", priorite: "Moyenne" }); setModal("add"); };
  const openEdit = (item) => { setForm({ ...item }); setModal("edit"); };
  const save = () => {
    if (modal === "add") setData([...data, { ...form, id: Date.now() }]);
    else setData(data.map(d => d.id === form.id ? form : d));
    setModal(null);
  };
  const del = (id) => setData(data.filter(d => d.id !== id));

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi Simple de Projet" subtitle="Gérez vos tâches avec clarté et efficacité"
        action={<Btn onClick={openAdd} size="md">+ Ajouter Tâche</Btn>} />
      <div className="grid grid-cols-4 gap-3">
        {["Tous", "À faire", "En cours", "Fait"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`p-3 rounded-xl text-sm font-semibold transition-all border ${filter === s ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800/60 border-slate-700/50 text-slate-400 hover:border-slate-500"}`}>
            {s} {s !== "Tous" && <span className="ml-1 text-xs opacity-70">({data.filter(d => d.statut === s).length})</span>}
          </button>
        ))}
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700">
            {["#", "Tâche", "Responsable", "Date Limite", "Statut", "Priorité", "Actions"].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-3 text-xs text-slate-500">{i + 1}</td>
                <td className="px-4 py-3 text-sm text-slate-200 font-medium">{item.tache}</td>
                <td className="px-4 py-3 text-sm text-slate-400">{item.responsable}</td>
                <td className="px-4 py-3 text-sm text-slate-400">{item.dateLimite}</td>
                <td className="px-4 py-3"><Badge value={item.statut} /></td>
                <td className="px-4 py-3"><Badge value={item.priorite} map={PRIORITE_COLORS} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Btn onClick={() => openEdit(item)} variant="ghost">✎</Btn>
                    <Btn onClick={() => del(item.id)} variant="danger">✕</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouvelle Tâche" : "Modifier Tâche"} onClose={() => setModal(null)}>
          <Input label="Tâche" value={form.tache || ""} onChange={e => setForm({ ...form, tache: e.target.value })} placeholder="Description de la tâche" />
          <Input label="Responsable" value={form.responsable || ""} onChange={e => setForm({ ...form, responsable: e.target.value })} placeholder="Nom du responsable" />
          <Input label="Date Limite" type="date" value={form.dateLimite || ""} onChange={e => setForm({ ...form, dateLimite: e.target.value })} />
          <Select label="Statut" value={form.statut || "À faire"} options={["À faire", "En cours", "Fait"]} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <Select label="Priorité" value={form.priorite || "Moyenne"} options={["Basse", "Moyenne", "Haute", "Critique"]} onChange={e => setForm({ ...form, priorite: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: MULTI-PROJETS
// ═══════════════════════════════════════════
const MultiProjets = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const openAdd = () => setForm({ nom: "", chef: "", debut: "", fin: "", avancement: 0, statut: "Planifié", budget: 0, budgetReel: 0 });
  const openEdit = (item) => { setForm({ ...item }); setModal("edit"); };
  const save = () => {
    const f = { ...form, avancement: Number(form.avancement), budget: Number(form.budget), budgetReel: Number(form.budgetReel) };
    if (modal === "add") setData([...data, { ...f, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? f : d));
    setModal(null);
  };
  const del = (id) => setData(data.filter(d => d.id !== id));

  const statusColor = { "En cours": "#f59e0b", "Terminé": "#10b981", "Planifié": "#6366f1", "En pause": "#94a3b8" };

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi Multi-Projets" subtitle="Piloter l'ensemble de votre portefeuille projets"
        action={<Btn onClick={() => { openAdd(); setModal("add"); }} size="md">+ Nouveau Projet</Btn>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Projets", value: data.length, color: "#6366f1" },
          { label: "En cours", value: data.filter(p => p.statut === "En cours").length, color: "#f59e0b" },
          { label: "Budget Total", value: `${(data.reduce((s, p) => s + p.budget, 0) / 1000).toFixed(0)}k FCFA`, color: "#8b5cf6" },
          { label: "Avancement Moy.", value: `${Math.round(data.reduce((s, p) => s + p.avancement, 0) / data.length)}%`, color: "#10b981" },
        ].map((s, i) => <StatCard key={i} {...s} />)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map(p => {
          const pct = Math.round((p.budgetReel / p.budget) * 100);
          const over = p.budgetReel > p.budget;
          return (
            <div key={p.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/50 transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-base font-bold text-white">{p.nom}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Chef : {p.chef}</p>
                </div>
                <div className="flex gap-2">
                  <Badge value={p.statut} />
                  <Btn onClick={() => openEdit(p)} variant="ghost">✎</Btn>
                  <Btn onClick={() => del(p.id)} variant="danger">✕</Btn>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex justify-between"><span>Période</span><span className="text-slate-300">{p.debut} → {p.fin}</span></div>
                <div>
                  <div className="flex justify-between mb-1"><span>Avancement</span><span className="text-slate-300 font-bold">{p.avancement}%</span></div>
                  <ProgressBar value={p.avancement} color={p.avancement < 50 ? "#f59e0b" : "#10b981"} />
                </div>
                <div className="flex justify-between">
                  <span>Budget consommé</span>
                  <span className={over ? "text-red-400 font-bold" : "text-emerald-400"}>{pct}% ({p.budgetReel.toLocaleString()} FCFA / {p.budget.toLocaleString()} FCFA)</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouveau Projet" : "Modifier Projet"} onClose={() => setModal(null)}>
          <Input label="Nom du projet" value={form.nom || ""} onChange={e => setForm({ ...form, nom: e.target.value })} />
          <Input label="Chef de projet" value={form.chef || ""} onChange={e => setForm({ ...form, chef: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date début" type="date" value={form.debut || ""} onChange={e => setForm({ ...form, debut: e.target.value })} />
            <Input label="Date fin" type="date" value={form.fin || ""} onChange={e => setForm({ ...form, fin: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Budget prévu (FCFA)" type="number" value={form.budget || ""} onChange={e => setForm({ ...form, budget: e.target.value })} />
            <Input label="Budget réel (FCFA)" type="number" value={form.budgetReel || ""} onChange={e => setForm({ ...form, budgetReel: e.target.value })} />
          </div>
          <Input label="Avancement (%)" type="number" min="0" max="100" value={form.avancement || ""} onChange={e => setForm({ ...form, avancement: e.target.value })} />
          <Select label="Statut" value={form.statut || "Planifié"} options={["Planifié", "En cours", "En pause", "Terminé"]} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: TÂCHES
// ═══════════════════════════════════════════
const Taches = ({ data, setData, projets }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [filterProjet, setFilterProjet] = useState("Tous");

  const projetNames = ["Tous", ...new Set(data.map(t => t.projet))];
  let filtered = data;
  if (filterStatut !== "Tous") filtered = filtered.filter(t => t.statut === filterStatut);
  if (filterProjet !== "Tous") filtered = filtered.filter(t => t.projet === filterProjet);

  const save = () => {
    const f = { ...form, progression: Number(form.progression) };
    if (modal === "add") setData([...data, { ...f, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? f : d));
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des Tâches" subtitle="Toutes les tâches de vos projets en un coup d'œil"
        action={<Btn onClick={() => { setForm({ projet: projets[0]?.nom || "", tache: "", responsable: "", debut: "", fin: "", statut: "À faire", priorite: "Moyenne", progression: 0 }); setModal("add"); }} size="md">+ Ajouter</Btn>} />
      <div className="flex gap-3 flex-wrap">
        <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500"
          value={filterProjet} onChange={e => setFilterProjet(e.target.value)}>
          {projetNames.map(p => <option key={p}>{p}</option>)}
        </select>
        {["Tous", "À faire", "En cours", "Fait"].map(s => (
          <button key={s} onClick={() => setFilterStatut(s)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${filterStatut === s ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"}`}>{s}</button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map(t => (
          <div key={t.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 hover:border-indigo-500/40 transition-all">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0 mr-3">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">{t.projet}</span>
                  <Badge value={t.statut} />
                  <Badge value={t.priorite} map={PRIORITE_COLORS} />
                </div>
                <p className="text-sm font-semibold text-white">{t.tache}</p>
                <p className="text-xs text-slate-500">{t.responsable} · {t.debut} → {t.fin}</p>
              </div>
              <div className="flex gap-2">
                <Btn onClick={() => { setForm({ ...t }); setModal("edit"); }} variant="ghost">✎</Btn>
                <Btn onClick={() => setData(data.filter(d => d.id !== t.id))} variant="danger">✕</Btn>
              </div>
            </div>
            <ProgressBar value={t.progression} color={t.progression === 100 ? "#10b981" : t.progression > 50 ? "#6366f1" : "#f59e0b"} />
          </div>
        ))}
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouvelle Tâche" : "Modifier Tâche"} onClose={() => setModal(null)}>
          <Select label="Projet" value={form.projet || ""} options={projets.map(p => p.nom)} onChange={e => setForm({ ...form, projet: e.target.value })} />
          <Input label="Tâche" value={form.tache || ""} onChange={e => setForm({ ...form, tache: e.target.value })} />
          <Input label="Responsable" value={form.responsable || ""} onChange={e => setForm({ ...form, responsable: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Début" type="date" value={form.debut || ""} onChange={e => setForm({ ...form, debut: e.target.value })} />
            <Input label="Fin" type="date" value={form.fin || ""} onChange={e => setForm({ ...form, fin: e.target.value })} />
          </div>
          <Select label="Statut" value={form.statut || "À faire"} options={["À faire", "En cours", "Fait"]} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <Select label="Priorité" value={form.priorite || "Moyenne"} options={["Basse", "Moyenne", "Haute", "Critique"]} onChange={e => setForm({ ...form, priorite: e.target.value })} />
          <Input label="Progression (%)" type="number" min="0" max="100" value={form.progression || 0} onChange={e => setForm({ ...form, progression: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: COÛTS
// ═══════════════════════════════════════════
const Couts = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const totalP = data.reduce((s, c) => s + c.prevu, 0);
  const totalR = data.reduce((s, c) => s + c.reel, 0);
  const variance = totalP - totalR;

  const chartData = data.map(c => ({ name: c.phase, Prévu: c.prevu, Réel: c.reel, Variance: c.prevu - c.reel }));
  const save = () => {
    const f = { ...form, prevu: Number(form.prevu), reel: Number(form.reel) };
    const statut = f.reel > f.prevu ? "Dépassement" : "Sous budget";
    if (modal === "add") setData([...data, { ...f, statut, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? { ...f, statut } : d));
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des Coûts" subtitle="Contrôlez vos dépenses par phase de projet"
        action={<Btn onClick={() => { setForm({ phase: "", prevu: "", reel: "" }); setModal("add"); }} size="md">+ Ajouter Phase</Btn>} />
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Budget Prévu" value={`${totalP.toLocaleString()} FCFA`} color="#6366f1" icon="Σ" />
        <StatCard label="Réel Dépensé" value={`${totalR.toLocaleString()} FCFA`} color={totalR > totalP ? "#ef4444" : "#10b981"} icon="FCFA" />
        <StatCard label="Variance" value={`${variance >= 0 ? "+" : ""}${variance.toLocaleString()} FCFA`} color={variance >= 0 ? "#10b981" : "#ef4444"} icon="Δ" sub={variance >= 0 ? "Économie réalisée" : "Dépassement"} />
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Analyse Coûts par Phase</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} formatter={v => `${v.toLocaleString()} FCFA`} />
            <Legend />
            <Bar dataKey="Prévu" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Réel" fill="#a78bfa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700">
            {["Phase", "Prévu (FCFA)", "Réel (FCFA)", "Variance (FCFA)", "Statut", "Actions"].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {data.map(c => (
              <tr key={c.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-slate-200">{c.phase}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{c.prevu.toLocaleString()} FCFA</td>
                <td className="px-4 py-3 text-sm text-slate-300">{c.reel.toLocaleString()} FCFA</td>
                <td className="px-4 py-3 text-sm font-bold" style={{ color: c.prevu - c.reel >= 0 ? "#10b981" : "#ef4444" }}>
                  {c.prevu - c.reel >= 0 ? "+" : ""}{(c.prevu - c.reel).toLocaleString()} FCFA
                </td>
                <td className="px-4 py-3"><Badge value={c.statut} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Btn onClick={() => { setForm({ ...c }); setModal("edit"); }} variant="ghost">✎</Btn>
                    <Btn onClick={() => setData(data.filter(d => d.id !== c.id))} variant="danger">✕</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouvelle Phase" : "Modifier Phase"} onClose={() => setModal(null)}>
          <Input label="Phase" value={form.phase || ""} onChange={e => setForm({ ...form, phase: e.target.value })} />
          <Input label="Coût Prévu (FCFA)" type="number" value={form.prevu || ""} onChange={e => setForm({ ...form, prevu: e.target.value })} />
          <Input label="Coût Réel (FCFA)" type="number" value={form.reel || ""} onChange={e => setForm({ ...form, reel: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: JALONS
// ═══════════════════════════════════════════
const Jalons = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const save = () => {
    if (modal === "add") setData([...data, { ...form, id: Date.now() }]);
    else setData(data.map(d => d.id === form.id ? form : d));
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des Jalons" subtitle="Suivez vos étapes clés et leur progression"
        action={<Btn onClick={() => { setForm({ jalon: "", date: "", responsable: "", statut: "Planifié", notes: "" }); setModal("add"); }} size="md">+ Jalon</Btn>} />
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-700" />
        <div className="space-y-4">
          {data.sort((a, b) => new Date(a.date) - new Date(b.date)).map((j, i) => {
            const isDone = j.statut === "Atteint";
            const color = isDone ? "#10b981" : j.statut === "En cours" ? "#f59e0b" : "#6366f1";
            return (
              <div key={j.id} className="relative flex items-start gap-6 pl-16">
                <div className="absolute left-6 w-4 h-4 rounded-full border-2 -translate-y-0.5 z-10"
                  style={{ backgroundColor: color + "33", borderColor: color }} />
                <div className="flex-1 bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 hover:border-indigo-500/40 transition-all"
                  style={{ borderLeftColor: color, borderLeftWidth: 3 }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-white">{j.jalon}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{j.date} · {j.responsable}</p>
                      {j.notes && <p className="text-xs text-slate-400 mt-1 italic">{j.notes}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge value={j.statut} />
                      <Btn onClick={() => { setForm({ ...j }); setModal("edit"); }} variant="ghost">✎</Btn>
                      <Btn onClick={() => setData(data.filter(d => d.id !== j.id))} variant="danger">✕</Btn>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouveau Jalon" : "Modifier Jalon"} onClose={() => setModal(null)}>
          <Input label="Jalon" value={form.jalon || ""} onChange={e => setForm({ ...form, jalon: e.target.value })} />
          <Input label="Date" type="date" value={form.date || ""} onChange={e => setForm({ ...form, date: e.target.value })} />
          <Input label="Responsable" value={form.responsable || ""} onChange={e => setForm({ ...form, responsable: e.target.value })} />
          <Select label="Statut" value={form.statut || "Planifié"} options={["Planifié", "En cours", "Atteint", "En retard"]} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <Textarea label="Notes" value={form.notes || ""} onChange={e => setForm({ ...form, notes: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: PROBLÈMES
// ═══════════════════════════════════════════
const Problemes = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [filter, setFilter] = useState("Tous");

  const filtered = filter === "Tous" ? data : data.filter(p => p.statut === filter || p.priorite === filter);
  const save = () => {
    if (modal === "add") setData([...data, { ...form, id: Date.now() }]);
    else setData(data.map(d => d.id === form.id ? form : d));
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des Problèmes" subtitle="Identifiez et résolvez les obstacles rapidement"
        action={<Btn onClick={() => { setForm({ description: "", priorite: "Moyenne", statut: "À faire", responsable: "", dateSignalement: new Date().toISOString().slice(0, 10), resolution: "" }); setModal("add"); }} size="md">+ Signaler</Btn>} />
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Ouverts", count: data.filter(p => p.statut !== "Résolu").length, color: "#ef4444" },
          { label: "Critiques", count: data.filter(p => p.priorite === "Critique").length, color: "#7c3aed" },
          { label: "En cours", count: data.filter(p => p.statut === "En cours").length, color: "#f59e0b" },
          { label: "Résolus", count: data.filter(p => p.statut === "Résolu").length, color: "#10b981" },
        ].map((s, i) => (
          <div key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 text-center">
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.count}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {["Tous", "À faire", "En cours", "Résolu", "Critique", "Haute"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${filter === f ? "bg-indigo-600 border-indigo-500 text-white" : "border-slate-700 text-slate-400 hover:text-white"}`}>{f}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-all"
            style={{ borderLeftColor: PRIORITE_COLORS[p.priorite], borderLeftWidth: 3 }}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2 flex-wrap">
                <Badge value={p.priorite} map={PRIORITE_COLORS} />
                <Badge value={p.statut} />
              </div>
              <div className="flex gap-2">
                <Btn onClick={() => { setForm({ ...p }); setModal("edit"); }} variant="ghost">✎</Btn>
                <Btn onClick={() => setData(data.filter(d => d.id !== p.id))} variant="danger">✕</Btn>
              </div>
            </div>
            <p className="text-sm text-white font-medium mb-1">{p.description}</p>
            <p className="text-xs text-slate-500">{p.responsable} · Signalé le {p.dateSignalement}</p>
            {p.resolution && <p className="text-xs text-emerald-400 mt-2 bg-emerald-400/10 rounded px-2 py-1">✓ {p.resolution}</p>}
          </div>
        ))}
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouveau Problème" : "Modifier Problème"} onClose={() => setModal(null)}>
          <Textarea label="Description" value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} />
          <Select label="Priorité" value={form.priorite || "Moyenne"} options={["Basse", "Moyenne", "Haute", "Critique"]} onChange={e => setForm({ ...form, priorite: e.target.value })} />
          <Select label="Statut" value={form.statut || "À faire"} options={["À faire", "En cours", "Résolu"]} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <Input label="Responsable" value={form.responsable || ""} onChange={e => setForm({ ...form, responsable: e.target.value })} />
          <Input label="Date Signalement" type="date" value={form.dateSignalement || ""} onChange={e => setForm({ ...form, dateSignalement: e.target.value })} />
          <Textarea label="Résolution" value={form.resolution || ""} onChange={e => setForm({ ...form, resolution: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: RISQUES
// ═══════════════════════════════════════════
const Risques = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const save = () => {
    const f = { ...form, gravite: Number(form.gravite), probabilite: Number(form.probabilite) };
    if (modal === "add") setData([...data, { ...f, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? f : d));
    setModal(null);
  };

  const getScoreColor = (s) => s >= 15 ? "#ef4444" : s >= 8 ? "#f59e0b" : "#10b981";
  const getScoreLabel = (s) => s >= 15 ? "Critique" : s >= 8 ? "Élevé" : "Faible";

  const matrixData = [];
  for (let g = 1; g <= 5; g++) {
    for (let p = 1; p <= 5; p++) {
      const score = g * p;
      matrixData.push({ g, p, score, color: getScoreColor(score) });
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des Risques" subtitle="Évaluez et atténuez les risques de votre projet"
        action={<Btn onClick={() => { setForm({ risque: "", gravite: 3, probabilite: 3, attenuation: "", statut: "Actif" }); setModal("add"); }} size="md">+ Risque</Btn>} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Matrice des Risques</h3>
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
            <div className="grid gap-0.5" style={{ gridTemplateColumns: "auto repeat(5, 1fr)" }}>
              <div className="flex items-end justify-center pb-1 pr-2 text-xs text-slate-500">Grav.</div>
              {[1, 2, 3, 4, 5].map(p => <div key={p} className="text-center text-xs text-slate-500 pb-1">P{p}</div>)}
              {[5, 4, 3, 2, 1].map(g => (
                <>
                  <div className="flex items-center justify-end pr-2 text-xs text-slate-500">G{g}</div>
                  {[1, 2, 3, 4, 5].map(p => {
                    const score = g * p;
                    const risky = data.filter(r => r.gravite === g && r.probabilite === p);
                    return (
                      <div key={p} className="aspect-square rounded flex items-center justify-center text-xs font-bold cursor-default transition-all hover:scale-110"
                        title={risky.map(r => r.risque).join(", ")}
                        style={{ backgroundColor: getScoreColor(score) + "33", color: getScoreColor(score), border: risky.length ? `2px solid ${getScoreColor(score)}` : "1px solid transparent" }}>
                        {risky.length > 0 ? risky.length : score}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
            <div className="flex gap-4 mt-3 justify-center text-xs">
              {[["#10b981", "Faible <8"], ["#f59e0b", "Élevé 8-15"], ["#ef4444", "Critique >15"]].map(([c, l]) => (
                <div key={l} className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} /><span className="text-slate-400">{l}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Risques par Score</h3>
          {[...data].sort((a, b) => b.gravite * b.probabilite - a.gravite * a.probabilite).map(r => {
            const score = r.gravite * r.probabilite;
            return (
              <div key={r.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black flex-shrink-0"
                  style={{ backgroundColor: getScoreColor(score) + "22", color: getScoreColor(score) }}>{score}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{r.risque}</p>
                  <p className="text-xs text-slate-500">G:{r.gravite} × P:{r.probabilite} = <span style={{ color: getScoreColor(score) }}>{getScoreLabel(score)}</span></p>
                </div>
                <div className="flex gap-1">
                  <Btn onClick={() => { setForm({ ...r }); setModal("edit"); }} variant="ghost">✎</Btn>
                  <Btn onClick={() => setData(data.filter(d => d.id !== r.id))} variant="danger">✕</Btn>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouveau Risque" : "Modifier Risque"} onClose={() => setModal(null)}>
          <Input label="Risque" value={form.risque || ""} onChange={e => setForm({ ...form, risque: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">Gravité (1-5) : <strong className="text-white">{form.gravite}</strong></label>
              <input type="range" min="1" max="5" value={form.gravite || 3} onChange={e => setForm({ ...form, gravite: Number(e.target.value) })} className="w-full accent-indigo-500" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">Probabilité (1-5) : <strong className="text-white">{form.probabilite}</strong></label>
              <input type="range" min="1" max="5" value={form.probabilite || 3} onChange={e => setForm({ ...form, probabilite: Number(e.target.value) })} className="w-full accent-indigo-500" />
            </div>
          </div>
          <div className="p-3 rounded-lg text-center font-bold" style={{ backgroundColor: getScoreColor(form.gravite * form.probabilite) + "22", color: getScoreColor(form.gravite * form.probabilite) }}>
            Score : {form.gravite * form.probabilite}/25 — {getScoreLabel(form.gravite * form.probabilite)}
          </div>
          <Textarea label="Mesures d'atténuation" value={form.attenuation || ""} onChange={e => setForm({ ...form, attenuation: e.target.value })} />
          <Select label="Statut" value={form.statut || "Actif"} options={["Actif", "Atténué", "Clôturé"]} onChange={e => setForm({ ...form, statut: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: DÉLAIS
// ═══════════════════════════════════════════
const Delais = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const save = () => {
    if (modal === "add") setData([...data, { ...form, id: Date.now() }]);
    else setData(data.map(d => d.id === form.id ? form : d));
    setModal(null);
  };
  const getEcart = (p, r) => {
    if (!p || !r) return null;
    const days = Math.round((new Date(r) - new Date(p)) / 86400000);
    return days;
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des Délais" subtitle="Analysez les écarts et optimisez la planification"
        action={<Btn onClick={() => { setForm({ tache: "", planifie: "", reel: "", cause: "", responsable: "", impact: "Moyen" }); setModal("add"); }} size="md">+ Écart</Btn>} />
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Tâches en Retard" value={data.filter(d => d.reel && new Date(d.reel) > new Date(d.planifie)).length} color="#ef4444" icon="⏱" />
        <StatCard label="Retard Moyen" value={`${Math.round(data.filter(d => d.reel).reduce((s, d) => s + getEcart(d.planifie, d.reel), 0) / Math.max(data.filter(d => d.reel).length, 1))}j`} color="#f59e0b" icon="Δ" />
        <StatCard label="À planifier" value={data.filter(d => !d.reel).length} color="#6366f1" icon="◉" />
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700">
            {["Tâche", "Date Planifiée", "Date Réelle", "Écart", "Responsable", "Impact", "Cause", "Actions"].map(h => (
              <th key={h} className="px-3 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {data.map(d => {
              const ecart = getEcart(d.planifie, d.reel);
              return (
                <tr key={d.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-3 py-3 text-sm font-medium text-slate-200">{d.tache}</td>
                  <td className="px-3 py-3 text-sm text-slate-400">{d.planifie}</td>
                  <td className="px-3 py-3 text-sm text-slate-400">{d.reel || <span className="text-slate-600 italic">En attente</span>}</td>
                  <td className="px-3 py-3 text-sm font-bold" style={{ color: ecart === null ? "#94a3b8" : ecart <= 0 ? "#10b981" : ecart <= 7 ? "#f59e0b" : "#ef4444" }}>
                    {ecart === null ? "-" : ecart === 0 ? "On time" : ecart > 0 ? `+${ecart}j` : `${ecart}j`}
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-400">{d.responsable}</td>
                  <td className="px-3 py-3"><Badge value={d.impact} map={{ "Faible": "#10b981", "Moyen": "#f59e0b", "Fort": "#ef4444", "À déterminer": "#94a3b8" }} /></td>
                  <td className="px-3 py-3 text-xs text-slate-500 max-w-32 truncate">{d.cause || "-"}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <Btn onClick={() => { setForm({ ...d }); setModal("edit"); }} variant="ghost">✎</Btn>
                      <Btn onClick={() => setData(data.filter(x => x.id !== d.id))} variant="danger">✕</Btn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouvel Écart" : "Modifier Écart"} onClose={() => setModal(null)}>
          <Input label="Tâche" value={form.tache || ""} onChange={e => setForm({ ...form, tache: e.target.value })} />
          <Input label="Responsable" value={form.responsable || ""} onChange={e => setForm({ ...form, responsable: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date Planifiée" type="date" value={form.planifie || ""} onChange={e => setForm({ ...form, planifie: e.target.value })} />
            <Input label="Date Réelle" type="date" value={form.reel || ""} onChange={e => setForm({ ...form, reel: e.target.value })} />
          </div>
          <Select label="Impact" value={form.impact || "Moyen"} options={["Faible", "Moyen", "Fort", "À déterminer"]} onChange={e => setForm({ ...form, impact: e.target.value })} />
          <Textarea label="Cause du retard" value={form.cause || ""} onChange={e => setForm({ ...form, cause: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: KPI
// ═══════════════════════════════════════════
const KPI = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const save = () => {
    const f = { ...form, valeur: Number(form.valeur), cible: Number(form.cible) };
    if (modal === "add") setData([...data, { ...f, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? f : d));
    setModal(null);
  };
  const getKpiPct = (k) => Math.min(Math.round((k.valeur / k.cible) * 100), 130);
  const getKpiColor = (k) => {
    const pct = getKpiPct(k);
    if (k.nom.includes("défaut") || k.nom.includes("retard") || k.nom.includes("délai")) return pct <= 100 ? "#10b981" : "#ef4444";
    return pct >= 100 ? "#10b981" : pct >= 80 ? "#f59e0b" : "#ef4444";
  };

  const radarData = data.slice(0, 6).map(k => ({ subject: k.nom.substring(0, 12), value: Math.min((k.valeur / k.cible) * 100, 120) }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi des KPI" subtitle="Indicateurs clés de performance de vos projets"
        action={<Btn onClick={() => { setForm({ nom: "", valeur: "", cible: "", unite: "%", tendance: "stable", categorie: "Progression" }); setModal("add"); }} size="md">+ KPI</Btn>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map(k => {
          const pct = getKpiPct(k);
          const color = getKpiColor(k);
          return (
            <div key={k.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 relative overflow-hidden cursor-pointer hover:border-indigo-500/40 transition-all"
              onClick={() => { setForm({ ...k }); setModal("edit"); }}>
              <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at 80% 80%, ${color}, transparent)` }} />
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">{k.categorie}</span>
                <span className="text-sm" style={{ color: STATUT_COLORS[k.tendance] }}>
                  {k.tendance === "hausse" ? "↑" : k.tendance === "baisse" ? "↓" : "→"}
                </span>
              </div>
              <div className="text-2xl font-black mb-0.5" style={{ color }}>{k.valeur}{k.unite}</div>
              <div className="text-xs text-slate-400 mb-3">Cible : {k.cible}{k.unite}</div>
              <p className="text-xs text-slate-300 font-medium mb-2 leading-tight">{k.nom}</p>
              <ProgressBar value={Math.min(pct, 100)} color={color} />
            </div>
          );
        })}
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Radar Performance</h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Radar name="%" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} formatter={v => `${v.toFixed(0)}%`} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouveau KPI" : "Modifier KPI"} onClose={() => setModal(null)}>
          <Input label="Nom du KPI" value={form.nom || ""} onChange={e => setForm({ ...form, nom: e.target.value })} />
          <div className="grid grid-cols-3 gap-3">
            <Input label="Valeur" type="number" value={form.valeur || ""} onChange={e => setForm({ ...form, valeur: e.target.value })} />
            <Input label="Cible" type="number" value={form.cible || ""} onChange={e => setForm({ ...form, cible: e.target.value })} />
            <Input label="Unité" value={form.unite || ""} onChange={e => setForm({ ...form, unite: e.target.value })} placeholder="%, pts..." />
          </div>
          <Select label="Tendance" value={form.tendance || "stable"} options={["hausse", "baisse", "stable"]} onChange={e => setForm({ ...form, tendance: e.target.value })} />
          <Select label="Catégorie" value={form.categorie || "Progression"} options={["Progression", "Finance", "Qualité", "Délais", "Agile", "Productivité"]} onChange={e => setForm({ ...form, categorie: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: BUDGET
// ═══════════════════════════════════════════
const Budget = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const totalP = data.reduce((s, b) => s + b.planifie, 0);
  const totalR = data.reduce((s, b) => s + b.reel, 0);
  const save = () => {
    const f = { ...form, planifie: Number(form.planifie), reel: Number(form.reel) };
    const statut = f.reel > f.planifie * 1.05 ? "Dépassement" : f.reel > f.planifie ? "Alerte" : "Normal";
    if (modal === "add") setData([...data, { ...f, statut, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? { ...f, statut } : d));
    setModal(null);
  };

  const pieData = data.map(b => ({ name: b.categorie, value: b.planifie }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi Budgétaire" subtitle="Maîtrisez chaque centime de votre budget projet"
        action={<Btn onClick={() => { setForm({ categorie: "", planifie: "", reel: "" }); setModal("add"); }} size="md">+ Ligne</Btn>} />
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Budget Total" value={`${(totalP / 1000).toFixed(0)}k€`} color="#6366f1" icon="Σ" sub="Budget alloué" />
        <StatCard label="Dépensé" value={`${(totalR / 1000).toFixed(0)}k€`} color={totalR > totalP ? "#ef4444" : "#10b981"} icon="€" sub={`${Math.round(totalR / totalP * 100)}% du budget`} />
        <StatCard label="Restant" value={`${((totalP - totalR) / 1000).toFixed(0)}k€`} color={totalP - totalR > 0 ? "#10b981" : "#ef4444"} icon="Δ" sub="Solde disponible" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Répartition Budget</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} formatter={v => `${v.toLocaleString()}€`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Prévu vs Réel</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.map(b => ({ name: b.categorie.substring(0, 10), Prévu: b.planifie, Réel: b.reel }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 9 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={v => `${v / 1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} formatter={v => `${v.toLocaleString()}€`} />
              <Bar dataKey="Prévu" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Réel" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700">
            {["Catégorie", "Planifié", "Réel", "Écart", "Consommé", "Statut", ""].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {data.map(b => (
              <tr key={b.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-slate-200">{b.categorie}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{b.planifie.toLocaleString()}€</td>
                <td className="px-4 py-3 text-sm text-slate-300">{b.reel.toLocaleString()}€</td>
                <td className="px-4 py-3 text-sm font-bold" style={{ color: b.planifie - b.reel >= 0 ? "#10b981" : "#ef4444" }}>
                  {b.planifie - b.reel >= 0 ? "+" : ""}{(b.planifie - b.reel).toLocaleString()}€
                </td>
                <td className="px-4 py-3 w-40"><ProgressBar value={Math.round((b.reel / b.planifie) * 100)} color={b.reel > b.planifie ? "#ef4444" : "#10b981"} /></td>
                <td className="px-4 py-3"><Badge value={b.statut} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Btn onClick={() => { setForm({ ...b }); setModal("edit"); }} variant="ghost">✎</Btn>
                    <Btn onClick={() => setData(data.filter(d => d.id !== b.id))} variant="danger">✕</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouvelle Ligne Budget" : "Modifier"} onClose={() => setModal(null)}>
          <Input label="Catégorie" value={form.categorie || ""} onChange={e => setForm({ ...form, categorie: e.target.value })} />
          <Input label="Budget Planifié (€)" type="number" value={form.planifie || ""} onChange={e => setForm({ ...form, planifie: e.target.value })} />
          <Input label="Réel Dépensé (€)" type="number" value={form.reel || ""} onChange={e => setForm({ ...form, reel: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: AGILE
// ═══════════════════════════════════════════
const Agile = ({ data, setData }) => {
  const [selectedSprint, setSelectedSprint] = useState(data[data.length - 1]?.id);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const sprint = data.find(s => s.id === selectedSprint);

  const totalPoints = sprint?.stories.reduce((s, st) => s + st.points, 0) || 0;
  const donePoints = sprint?.stories.filter(st => st.statut === "Terminé").reduce((s, st) => s + st.points, 0) || 0;

  const velocityData = data.map(s => ({ name: s.nom, Planifié: s.stories.reduce((x, st) => x + st.points, 0), Réalisé: s.stories.filter(st => st.statut === "Terminé").reduce((x, st) => x + st.points, 0) }));

  const burndownData = sprint ? sprint.stories.map((st, i) => ({
    sprint: `Story ${i + 1}`, restant: sprint.stories.slice(i).reduce((s, x) => s + x.points, 0)
  })) : [];

  const updateStory = (storyId, statut) => {
    setData(data.map(s => s.id === selectedSprint ? { ...s, stories: s.stories.map(st => st.id === storyId ? { ...st, statut } : st) } : s));
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Suivi Agile — Sprints" subtitle="Pilotez vos sprints avec précision" />
      <div className="flex gap-2 flex-wrap">
        {data.map(s => (
          <button key={s.id} onClick={() => setSelectedSprint(s.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${selectedSprint === s.id ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-500"}`}>
            {s.nom} <Badge value={s.statut} />
          </button>
        ))}
        <Btn onClick={() => { setForm({ nom: `Sprint ${data.length + 1}`, debut: "", fin: "", objectif: "", statut: "Planifié", vitesse: 0, stories: [] }); setModal("sprint"); }} variant="ghost">+ Sprint</Btn>
      </div>
      {sprint && (
        <>
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Points Total" value={totalPoints} color="#6366f1" icon="Σ" />
            <StatCard label="Complétés" value={donePoints} color="#10b981" icon="✓" />
            <StatCard label="Restants" value={totalPoints - donePoints} color="#f59e0b" icon="◉" />
            <StatCard label="Vélocité" value={`${totalPoints > 0 ? Math.round((donePoints / totalPoints) * 100) : 0}%`} color="#8b5cf6" icon="↻" />
          </div>
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-bold text-white">{sprint.nom} — {sprint.objectif}</h3>
              <span className="text-xs text-slate-400">{sprint.debut} → {sprint.fin}</span>
            </div>
            <ProgressBar value={Math.round((donePoints / Math.max(totalPoints, 1)) * 100)} color="#6366f1" />
            <div className="mt-4 space-y-2">
              {sprint.stories.map(st => (
                <div key={st.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/50 border border-slate-600/30 hover:border-slate-500 transition-all">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: "#6366f122", color: "#a78bfa" }}>{st.points}</div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-200 font-medium">{st.titre}</p>
                    <p className="text-xs text-slate-500">{st.assignee}</p>
                  </div>
                  <select value={st.statut} onChange={e => updateStory(st.id, e.target.value)}
                    className="bg-slate-800 border border-slate-600 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none">
                    {["À faire", "En cours", "Terminé"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Vélocité par Sprint</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={velocityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} />
            <Legend />
            <Bar dataKey="Planifié" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Réalisé" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: KANBAN
// ═══════════════════════════════════════════
const Kanban = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [dragItem, setDragItem] = useState(null);

  const columns = [
    { key: "backlog", label: "Backlog", color: "#94a3b8" },
    { key: "enCours", label: "En Cours", color: "#f59e0b" },
    { key: "enRevue", label: "En Revue", color: "#6366f1" },
    { key: "termine", label: "Terminé", color: "#10b981" },
  ];

  const moveCard = (cardId, fromCol, toCol) => {
    if (fromCol === toCol) return;
    const card = data[fromCol].find(c => c.id === cardId);
    if (!card) return;
    setData({ ...data, [fromCol]: data[fromCol].filter(c => c.id !== cardId), [toCol]: [...data[toCol], card] });
  };

  const addCard = (col) => {
    setForm({ titre: "", priorite: "Moyenne", assignee: "", points: 5, col });
    setModal("add");
  };

  const save = () => {
    const { col, ...card } = { ...form, id: Date.now(), couleur: PRIORITE_COLORS[form.priorite] };
    setData({ ...data, [col]: [...data[col], card] });
    setModal(null);
  };

  const delCard = (id, col) => setData({ ...data, [col]: data[col].filter(c => c.id !== id) });

  return (
    <div className="space-y-6">
      <SectionHeader title="Kanban Board" subtitle="Visualisez et gérez le flux de travail de votre équipe" />
      <div className="grid grid-cols-4 gap-4">
        {columns.map(col => (
          <div key={col.key} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3"
            onDragOver={e => e.preventDefault()}
            onDrop={() => { if (dragItem) { moveCard(dragItem.id, dragItem.col, col.key); setDragItem(null); } }}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{col.label}</h3>
                <span className="text-xs bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded-full">{data[col.key].length}</span>
              </div>
              <Btn onClick={() => addCard(col.key)} variant="ghost" size="sm">+</Btn>
            </div>
            <div className="space-y-2 min-h-16">
              {data[col.key].map(card => (
                <div key={card.id} draggable
                  onDragStart={() => setDragItem({ id: card.id, col: col.key })}
                  className="bg-slate-700/80 border border-slate-600/50 rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-indigo-500/50 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: PRIORITE_COLORS[card.priorite] + "22", color: PRIORITE_COLORS[card.priorite] }}>{card.priorite}</span>
                    <button onClick={() => delCard(card.id, col.key)} className="text-slate-600 hover:text-red-400 text-lg leading-none">×</button>
                  </div>
                  <p className="text-sm text-slate-200 font-medium leading-tight mb-2">{card.titre}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">{card.assignee}</span>
                    <span className="text-xs bg-indigo-600/30 text-indigo-300 px-2 py-0.5 rounded-full font-bold">{card.points}pts</span>
                  </div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {columns.filter(c => c.key !== col.key).map(c => (
                      <button key={c.key} onClick={() => moveCard(card.id, col.key, c.key)}
                        className="text-xs px-1.5 py-0.5 rounded bg-slate-600/50 hover:bg-slate-500 text-slate-400 hover:text-slate-200 transition-colors"
                        title={`→ ${c.label}`}>→ {c.label.substring(0, 3)}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <Modal title="Nouvelle Carte" onClose={() => setModal(null)}>
          <Input label="Titre" value={form.titre || ""} onChange={e => setForm({ ...form, titre: e.target.value })} />
          <Input label="Assigné à" value={form.assignee || ""} onChange={e => setForm({ ...form, assignee: e.target.value })} />
          <Select label="Priorité" value={form.priorite || "Moyenne"} options={["Basse", "Moyenne", "Haute", "Critique"]} onChange={e => setForm({ ...form, priorite: e.target.value })} />
          <Input label="Story Points" type="number" value={form.points || 5} onChange={e => setForm({ ...form, points: Number(e.target.value) })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Ajouter</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: RESSOURCES
// ═══════════════════════════════════════════
const Ressources = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const save = () => {
    const f = { ...form, disponibilite: Number(form.disponibilite), charge: Number(form.charge) };
    if (modal === "add") setData([...data, { ...f, id: Date.now() }]);
    else setData(data.map(d => d.id === f.id ? f : d));
    setModal(null);
  };

  const allocationData = data.map(r => ({ name: r.membre.split(" ")[0], Disponible: r.disponibilite, Chargé: r.charge }));
  const parSpecialite = Object.entries(data.reduce((acc, r) => { acc[r.specialite] = (acc[r.specialite] || 0) + 1; return acc; }, {})).map(([s, v]) => ({ name: s, value: v }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Allocation des Ressources" subtitle="Optimisez l'utilisation de vos équipes"
        action={<Btn onClick={() => { setForm({ membre: "", role: "", projet: "", disponibilite: 100, charge: 0, debut: "", fin: "", specialite: "" }); setModal("add"); }} size="md">+ Ressource</Btn>} />
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Membres Équipe" value={data.length} color="#6366f1" icon="⚙" />
        <StatCard label="Charge Moyenne" value={`${Math.round(data.reduce((s, r) => s + r.charge, 0) / data.length)}%`} color={data.reduce((s, r) => s + r.charge, 0) / data.length > 85 ? "#ef4444" : "#10b981"} icon="◉" />
        <StatCard label="Sur-chargés" value={data.filter(r => r.charge > r.disponibilite * 0.9).length} color="#f59e0b" icon="⚠" sub="charge > 90% dispo" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Taux de Charge par Membre</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={allocationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} width={60} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} formatter={v => `${v}%`} />
              <Legend />
              <Bar dataKey="Disponible" fill="#6366f133" stroke="#6366f1" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Chargé" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Par Spécialité</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={parSpecialite} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name} (${value})`}>
                {parSpecialite.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="space-y-3">
        {data.map(r => {
          const taux = Math.round((r.charge / r.disponibilite) * 100);
          const surcharge = r.charge > r.disponibilite;
          return (
            <div key={r.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex items-center gap-4 hover:border-indigo-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-black"
                style={{ backgroundColor: "#6366f122", color: "#a78bfa" }}>
                {r.membre.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <span className="text-sm font-bold text-white">{r.membre}</span>
                    <span className="text-xs text-slate-500 ml-2">{r.role} · {r.specialite}</span>
                  </div>
                  <div className="flex gap-2">
                    <Btn onClick={() => { setForm({ ...r }); setModal("edit"); }} variant="ghost">✎</Btn>
                    <Btn onClick={() => setData(data.filter(d => d.id !== r.id))} variant="danger">✕</Btn>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-1.5">{r.projet} · {r.debut} → {r.fin}</p>
                <div className="flex items-center gap-3">
                  <ProgressBar value={r.charge} max={r.disponibilite} color={surcharge ? "#ef4444" : taux > 80 ? "#f59e0b" : "#10b981"} />
                  <span className="text-xs font-bold w-20 flex-shrink-0" style={{ color: surcharge ? "#ef4444" : "#94a3b8" }}>{r.charge}% / {r.disponibilite}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouvelle Ressource" : "Modifier Ressource"} onClose={() => setModal(null)}>
          <Input label="Nom" value={form.membre || ""} onChange={e => setForm({ ...form, membre: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Rôle" value={form.role || ""} onChange={e => setForm({ ...form, role: e.target.value })} />
            <Input label="Spécialité" value={form.specialite || ""} onChange={e => setForm({ ...form, specialite: e.target.value })} />
          </div>
          <Input label="Projet" value={form.projet || ""} onChange={e => setForm({ ...form, projet: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">Disponibilité : {form.disponibilite}%</label>
              <input type="range" min="0" max="100" value={form.disponibilite || 100} onChange={e => setForm({ ...form, disponibilite: Number(e.target.value) })} className="w-full accent-indigo-500" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">Charge actuelle : {form.charge}%</label>
              <input type="range" min="0" max="120" value={form.charge || 0} onChange={e => setForm({ ...form, charge: Number(e.target.value) })} className="w-full accent-indigo-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Début" type="date" value={form.debut || ""} onChange={e => setForm({ ...form, debut: e.target.value })} />
            <Input label="Fin" type="date" value={form.fin || ""} onChange={e => setForm({ ...form, fin: e.target.value })} />
          </div>
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: GANTT
// ═══════════════════════════════════════════
const Gantt = ({ data, setData }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const allDates = data.flatMap(t => [new Date(t.debut), new Date(t.fin)]);
  const minDate = new Date(Math.min(...allDates));
  const maxDate = new Date(Math.max(...allDates));
  const totalDays = Math.ceil((maxDate - minDate) / 86400000) + 1;

  const getPos = (date) => Math.max(0, Math.ceil((new Date(date) - minDate) / 86400000));
  const getWidth = (debut, fin) => Math.max(1, Math.ceil((new Date(fin) - new Date(debut)) / 86400000) + 1);

  const months = [];
  const d = new Date(minDate);
  while (d <= maxDate) {
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!months.find(m => m.key === key)) months.push({ key, label: d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" }) });
    d.setMonth(d.getMonth() + 1);
  }

  const save = () => {
    const f = { ...form, progression: Number(form.progression) };
    if (modal === "add") setData([...data, { ...f, id: Date.now(), couleur: "#6366f1" }]);
    else setData(data.map(d => d.id === f.id ? f : d));
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Diagramme de Gantt" subtitle="Planification visuelle de vos tâches dans le temps"
        action={<Btn onClick={() => { setForm({ tache: "", debut: "", fin: "", responsable: "", progression: 0, dependance: "" }); setModal("add"); }} size="md">+ Tâche</Btn>} />
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-x-auto">
        <div style={{ minWidth: 700 }}>
          <div className="flex border-b border-slate-700">
            <div className="w-48 flex-shrink-0 p-3 text-xs font-bold text-slate-400 uppercase border-r border-slate-700">Tâche</div>
            <div className="flex-1 relative h-10 overflow-hidden">
              <div className="flex h-full" style={{ width: `${totalDays * 14}px` }}>
                {Array.from({ length: totalDays }, (_, i) => {
                  const date = new Date(minDate);
                  date.setDate(date.getDate() + i);
                  const isMonday = date.getDay() === 1;
                  const isToday = date.toDateString() === new Date().toDateString();
                  return (
                    <div key={i} className="flex-shrink-0 flex items-center justify-center text-xs border-r border-slate-700/30 relative"
                      style={{ width: 14, fontSize: 9, color: isToday ? "#a78bfa" : "#475569", backgroundColor: isToday ? "#6366f111" : "transparent", fontWeight: isMonday ? "bold" : "normal" }}>
                      {isMonday || isToday ? date.getDate() : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {data.map((task, i) => (
            <div key={task.id} className="flex border-b border-slate-700/30 hover:bg-slate-700/20 group">
              <div className="w-48 flex-shrink-0 p-3 border-r border-slate-700/50 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: task.couleur }} />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-200 truncate">{task.tache}</p>
                  <p className="text-xs text-slate-600 truncate">{task.responsable}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 flex gap-1 ml-auto">
                  <Btn onClick={() => { setForm({ ...task }); setModal("edit"); }} variant="ghost" size="sm">✎</Btn>
                  <Btn onClick={() => setData(data.filter(d => d.id !== task.id))} variant="danger" size="sm">✕</Btn>
                </div>
              </div>
              <div className="flex-1 relative" style={{ height: 40, width: `${totalDays * 14}px` }}>
                <div className="absolute top-1/2 -translate-y-1/2 h-6 rounded-lg flex items-center px-2 cursor-pointer transition-all hover:brightness-110"
                  style={{
                    left: `${getPos(task.debut) * 14}px`,
                    width: `${getWidth(task.debut, task.fin) * 14}px`,
                    backgroundColor: task.couleur + "44",
                    border: `1px solid ${task.couleur}`,
                  }}>
                  <div className="h-full rounded absolute left-0 top-0 transition-all"
                    style={{ width: `${task.progression}%`, backgroundColor: task.couleur + "88" }} />
                  <span className="text-xs font-bold relative z-10 truncate" style={{ color: task.couleur }}>{task.tache.substring(0, 12)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {data.map(t => (
          <div key={t.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-3 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: t.couleur }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">{t.tache}</p>
              <p className="text-xs text-slate-500">{t.debut} → {t.fin} · {t.responsable}</p>
              <ProgressBar value={t.progression} color={t.couleur} />
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <Modal title={modal === "add" ? "Nouvelle Tâche Gantt" : "Modifier Tâche"} onClose={() => setModal(null)}>
          <Input label="Tâche" value={form.tache || ""} onChange={e => setForm({ ...form, tache: e.target.value })} />
          <Input label="Responsable" value={form.responsable || ""} onChange={e => setForm({ ...form, responsable: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Début" type="date" value={form.debut || ""} onChange={e => setForm({ ...form, debut: e.target.value })} />
            <Input label="Fin" type="date" value={form.fin || ""} onChange={e => setForm({ ...form, fin: e.target.value })} />
          </div>
          <Input label="Progression (%)" type="number" min="0" max="100" value={form.progression || 0} onChange={e => setForm({ ...form, progression: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Btn onClick={save} size="md" className="flex-1">Enregistrer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function App() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [data, setData] = useState(INITIAL_DATA);
  const [saving, setSaving] = useState(false);

  // Persist to storage
  useEffect(() => {
    const load = async () => {
      try {
        const saved = await window.storage?.get("projetEliteData");
        if (saved?.value) setData(JSON.parse(saved.value));
      } catch { }
    };
    load();
  }, []);

  const saveData = useCallback(async (newData) => {
    try {
      setSaving(true);
      await window.storage?.set("projetEliteData", JSON.stringify(newData));
      setTimeout(() => setSaving(false), 800);
    } catch { setSaving(false); }
  }, []);

  const update = useCallback((key) => (val) => {
    const newData = { ...data, [key]: val };
    setData(newData);
    saveData(newData);
  }, [data, saveData]);

  const renderModule = () => {
    switch (active) {
      case "dashboard": return <Dashboard data={data} />;
      case "suivi": return <SuiviSimple data={data.suivi} setData={update("suivi")} />;
      case "multiprojets": return <MultiProjets data={data.projets} setData={update("projets")} />;
      case "taches": return <Taches data={data.taches} setData={update("taches")} projets={data.projets} />;
      case "couts": return <Couts data={data.couts} setData={update("couts")} />;
      case "jalons": return <Jalons data={data.jalons} setData={update("jalons")} />;
      case "problemes": return <Problemes data={data.problemes} setData={update("problemes")} />;
      case "risques": return <Risques data={data.risques} setData={update("risques")} />;
      case "delais": return <Delais data={data.delais} setData={update("delais")} />;
      case "kpi": return <KPI data={data.kpis} setData={update("kpis")} />;
      case "budget": return <Budget data={data.budget} setData={update("budget")} />;
      case "agile": return <Agile data={data.sprints} setData={update("sprints")} />;
      case "kanban": return <Kanban data={data.kanban} setData={update("kanban")} />;
      case "ressources": return <Ressources data={data.ressources} setData={update("ressources")} />;
      case "gantt": return <Gantt data={data.gantt} setData={update("gantt")} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden" style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}>
      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? "w-56" : "w-14"} flex-shrink-0 bg-slate-900/95 border-r border-slate-800 flex flex-col transition-all duration-300 ease-in-out z-20`}>
        <div className="p-3 border-b border-slate-800 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-8 h-8 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 flex items-center justify-center text-indigo-400 transition-all flex-shrink-0">
            {sidebarOpen ? "◀" : "▶"}
          </button>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-xs font-black text-white tracking-tight leading-none">PROJET</p>
              <p className="text-xs font-black tracking-tight leading-none" style={{ color: "#a78bfa" }}>ÉLITE</p>
            </div>
          )}
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {MODULES.map(m => (
            <button key={m.id} onClick={() => setActive(m.id)}
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left transition-all ${active === m.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}>
              <span className="text-base flex-shrink-0 w-5 text-center">{m.icon}</span>
              {sidebarOpen && <span className="text-xs font-semibold whitespace-nowrap overflow-hidden">{m.label}</span>}
            </button>
          ))}
        </nav>
        {sidebarOpen && (
          <div className="p-3 border-t border-slate-800">
            {saving ? (
              <div className="text-xs text-indigo-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />Sauvegarde...</div>
            ) : (
              <div className="text-xs text-slate-600">● Auto-sauvegarde active</div>
            )}
          </div>
        )}
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">
        {/* TOP BAR */}
        <div className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur border-b border-slate-800 px-6 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-sm font-black text-white">{MODULES.find(m => m.id === active)?.label}</h1>
            <p className="text-xs text-slate-500">Gestion de Projet Élite · {new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
              <span style={{ color: "#10b981" }}>●</span> En direct
            </div>
          </div>
        </div>
        {/* CONTENT */}
        <div className="p-6">{renderModule()}</div>
      </main>
    </div>
  );
}
