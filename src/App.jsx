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
  cycle: [
    { id: "init", phase: "Initiation", statut: "Terminé", progression: 100, livrable: "Charte de projet", description: "Définition de la vision et des objectifs." },
    { id: "plan", phase: "Planification", statut: "En cours", progression: 75, livrable: "Plan de management", description: "Établissement du périmètre, budget et délais." },
    { id: "exec", phase: "Exécution", statut: "A venir", progression: 20, livrable: "Dévrables techniques", description: "Mise en œuvre des tâches planifiées." },
    { id: "monit", phase: "Monitoring", statut: "A venir", progression: 0, livrable: "Rapports d'avancement", description: "Contrôle et ajustement du projet." },
    { id: "close", phase: "Clôture", statut: "A venir", progression: 0, livrable: "Bilan projet", description: "Réception finale et archivage." },
  ],
  temps: [
    { id: 1, tache: "Analyse des besoins", membre: "Jean D.", date: "2026-02-25", heures: 4, type: "Facturable" },
    { id: 2, tache: "Maquettes UX", membre: "Sophie L.", date: "2026-02-26", heures: 6, type: "Facturable" },
    { id: 3, tache: "Réunion client", membre: "Jean D.", date: "2026-02-26", heures: 2, type: "Non facturable" },
  ],
  documents: [
    { id: 1, nom: "Cahier_des_charges_v2.pdf", projet: "Refonte SI Comptable", type: "PDF", taille: "2.4 MB", date: "2026-01-10", auteur: "Marie C." },
    { id: 2, nom: "Maquettes_Mobile.fig", projet: "App Mobile RH", type: "Design", taille: "15.8 MB", date: "2026-02-05", auteur: "Emma P." },
    { id: 3, nom: "Contrat_Prestataire.docx", projet: "Migration Cloud", type: "Word", taille: "1.1 MB", date: "2026-03-02", auteur: "Jean D." },
  ],
  factures: [
    { id: "F-2026-001", client: "Client Alpha", projet: "Refonte SI Comptable", montant: 45000000, statut: "Payé", echeance: "2026-02-15" },
    { id: "F-2026-002", client: "Client Beta", projet: "App Mobile RH", montant: 25500000, statut: "En attente", echeance: "2026-03-10" },
    { id: "F-2026-003", client: "Client Gamma", projet: "Migration Cloud", montant: 10000000, statut: "Brouillon", echeance: "2026-04-01" },
  ],
  workflows: [
    { id: 1, nom: "Alerte Dépassement Budget", declencheur: "Budget Consommé > 90%", action: "Email à la Direction", statut: "Actif" },
    { id: 2, nom: "Validation Jalon", declencheur: "Statut Jalon = Atteint", action: "Générer Facture Proforma", statut: "Actif" },
    { id: 3, nom: "Rappel Tâche en Retard", declencheur: "Date Limite < Aujourd'hui", action: "Notif Slack au Responsable", statut: "Inactif" },
  ],
  smartcontracts: [
    { id: "0x8f3A...9Cb2", projet: "Migration Cloud", montant: 20000000, date: "2026-03-01", statut: "Exécuté", condition: "Audit Validé" },
    { id: "0x4b7E...1Fd9", projet: "Refonte SI Comptable", montant: 45000000, date: "2026-03-15", statut: "En attente", condition: "UAT Réussis" },
    { id: "0x1a9C...8Ec5", projet: "App Mobile RH", montant: 25500000, date: "2026-04-10", statut: "Bloqué", condition: "Validation Client" },
  ],
  okrs: [
    { id: 1, objectif: "Leader SaaS Comptable 2026", progression: 65, type: "Stratégique", projets: ["Refonte SI Comptable"], statut: "En bonne voie" },
    { id: 2, objectif: "Zéro Dette Technique", progression: 10, type: "Opérationnel", projets: ["Migration Cloud"], statut: "En retard" },
    { id: 3, objectif: "Modernisation RH Mobile", progression: 30, type: "Innovation", projets: ["App Mobile RH"], statut: "En cours" },
  ],
  intake: [
    { id: 1, titre: "Migration Serveurs EU", demandeur: "IT Dept", type: "Infrastructure", date: "2026-06-15", statut: "En revue", priorite: "Haute" },
    { id: 2, titre: "Campagne Marketing Q3", demandeur: "Sarah L.", type: "Marketing", date: "2026-07-01", statut: "Approuvé", priorite: "Moyenne" },
    { id: 3, titre: "Audit Sécurité Externe", demandeur: "CyberSec", type: "Sécurité", date: "2026-05-10", statut: "Nouveau", priorite: "Critique" },
  ],
  automations: [
    { id: 1, nom: "Auto-Assignation Bugs", trigger: "Tâche créée", condition: "Type = Bug", action: "Assigner à: Lead Dev & Tag: Urgent", active: true },
    { id: 2, nom: "Alerte Dépassement", trigger: "Statut = En retard", condition: "Priorité >= Haute", action: "Envoyer email & Notifier Slack PMO", active: true },
    { id: 3, nom: "Approbation Client Requise", trigger: "Jalon = Terminé", condition: "Budget > 5M", action: "Changer statut: En Validation & Notifier Client", active: false },
  ],
  webhooks: [
    { id: 1, nom: "Slack (IT Channel)", url: "https://hooks.slack.com/services/T0X...", event: "Jalon Atteint", statut: "Connecté" },
    { id: 2, nom: "Microsoft Teams (Direction)", url: "https://teams.microsoft.com/l/webhook/...", event: "Dépassement Budget", statut: "Connecté" },
    { id: 3, nom: "Jira Sync", url: "https://api.atlassian.com/ex/jira/...", event: "Tâche Créée", statut: "Erreur" },
    { id: 4, nom: "Zapier", url: "https://hooks.zapier.com/hooks/catch/...", event: "Nouveau Projet", statut: "En pause" },
  ],
  methode: "Hybride",
};

const METHODOLOGIES = [
  { id: "agile", label: "Agile / Scrum", desc: "Itératif, sprints courts, focus valeur client.", icons: ["↻", "▦", "◉"] },
  { id: "waterfall", label: "Waterfall (Cascade)", desc: "Séquentiel, phases rigides, planification amont.", icons: ["▬", "◈", "◆"] },
  { id: "hybrid", label: "Hybride", desc: "Mélange de planification Waterfall et exécution Agile.", icons: ["⎔", "↻", "Σ"] },
  { id: "prince2", label: "PRINCE2", desc: "Gestion par étapes, contrôle strict, gouvernance.", icons: ["⛨", "⚙", "✓"] },
];

const SCENARIOS = [
  { id: 1, label: "Perte de ressource clé", impact: { delai: 15, budget: 10, risque: 20 }, desc: "Un lead technique quitte le projet subitement." },
  { id: 2, label: "Coupe budgétaire (-20%)", impact: { delai: 10, budget: -20, risque: 15 }, desc: "Réduction immédiate des fonds alloués." },
  { id: 3, label: "Accélération du marché", impact: { delai: -20, budget: 30, risque: 25 }, desc: "Nécessité de sortir le produit 1 mois plus tôt." },
];

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
  { id: "guide", label: "Guide Débutant", icon: "🧭" },
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
  const [zoom, setZoom] = useState("Jour"); // Jour, Semaine, Mois

  // Basic calculation
  const allDates = data.flatMap(t => [new Date(t.debut), new Date(t.fin)]);
  const minDate = new Date(Math.min(...allDates));
  const maxDate = new Date(Math.max(...allDates));

  // Apply zoom factor
  const dayWidth = zoom === "Jour" ? 35 : zoom === "Semaine" ? 15 : 5;

  // Extend timeline to have some padding
  minDate.setDate(minDate.getDate() - 3);
  maxDate.setDate(maxDate.getDate() + 7);
  const totalDays = Math.ceil((maxDate - minDate) / 86400000) + 1;

  const getPos = (date) => Math.max(0, Math.ceil((new Date(date) - minDate) / 86400000));
  const getWidth = (debut, fin) => Math.max(1, Math.ceil((new Date(fin) - new Date(debut)) / 86400000));

  const save = () => {
    const f = { ...form, progression: Number(form.progression) };
    if (modal === "add") setData([...data, { ...f, id: Date.now(), couleur: "#6366f1", dependance: form.dependance ? Number(form.dependance) : null }]);
    else setData(data.map(d => d.id === f.id ? { ...d, ...f, dependance: f.dependance ? Number(f.dependance) : null } : d));
    setModal(null);
  };

  // SVG Dependency lines
  const renderDependencies = () => {
    return data.filter(t => t.dependance).map(t => {
      const depT = data.find(d => d.id === t.dependance);
      if (!depT) return null;

      const idxFrom = data.indexOf(depT);
      const idxTo = data.indexOf(t);
      if (idxFrom === -1 || idxTo === -1) return null;

      const rowHeight = 49; // approx height of each row border included
      const headerHeight = 41;

      const x1 = (getPos(depT.fin)) * dayWidth;
      const y1 = headerHeight + (idxFrom * rowHeight) + (rowHeight / 2);

      const x2 = getPos(t.debut) * dayWidth;
      const y2 = headerHeight + (idxTo * rowHeight) + (rowHeight / 2);

      return (
        <path key={`${depT.id}-${t.id}`}
          d={`M ${x1} ${y1} C ${x1 + 15} ${y1}, ${x2 - 15} ${y2}, ${x2} ${y2}`}
          fill="transparent"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="4 4"
          markerEnd="url(#arrowhead)"
        />
      );
    });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Super Gantt (Avancé)" subtitle="Planification visuelle des tâches et gestion des dépendances"
        action={<Btn onClick={() => { setForm({ tache: "", debut: new Date().toISOString().substring(0, 10), fin: new Date().toISOString().substring(0, 10), responsable: "", progression: 0, dependance: "" }); setModal("add"); }} size="md" className="bg-indigo-600">+ Nouvelle Tâche</Btn>} />

      <div className="flex justify-between items-center bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-slate-300">Niveau de Zoom :</span>
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
            {["Jour", "Semaine", "Mois"].map(z => (
              <button key={z} onClick={() => setZoom(z)} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${zoom === z ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}>{z}</button>
            ))}
          </div>
        </div>
        <div className="text-xs text-indigo-300 italic flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> 💡 Astuce : Survolez une barre pour l'éditer. Lignes rouges = Dépendances.</div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-x-auto relative shadow-2xl">
        <div style={{ minWidth: 800 }}>
          <div className="flex border-b border-slate-700 bg-slate-900/80">
            <div className="w-64 flex-shrink-0 p-3 text-xs font-black text-indigo-400 uppercase border-r border-slate-700 z-20 sticky left-0 bg-slate-900/95 backdrop-blur items-center flex gap-2">
              <span className="text-lg text-emerald-400">☰</span> Structure du Projet
            </div>
            <div className="flex-1 relative h-10 overflow-hidden">
              <div className="flex h-full" style={{ width: `${totalDays * dayWidth}px` }}>
                {Array.from({ length: totalDays }, (_, i) => {
                  const date = new Date(minDate);
                  date.setDate(date.getDate() + i);
                  const isMonday = date.getDay() === 1;
                  const isToday = date.toDateString() === new Date().toDateString();
                  return (
                    <div key={i} className="flex-shrink-0 flex flex-col items-center justify-center text-[10px] border-r border-slate-700/30 relative"
                      style={{ width: dayWidth, color: isToday ? "#a78bfa" : "#64748b", backgroundColor: isToday ? "#6366f122" : "transparent" }}>
                      {zoom === "Jour" ? (
                        <>
                          <span className={isMonday ? "font-bold text-slate-300" : ""}>{date.toLocaleDateString('fr-FR', { weekday: 'narrow' })}</span>
                          <span className={isToday ? "font-black" : ""}>{date.getDate()}</span>
                        </>
                      ) : zoom === "Semaine" ? (
                        isMonday ? <span className="font-bold whitespace-nowrap -ml-4">S{Math.ceil(date.getDate() / 7)}</span> : ""
                      ) : (
                        date.getDate() === 1 ? <span className="font-bold whitespace-nowrap -ml-4">{date.toLocaleDateString('fr-FR', { month: 'short' })}</span> : ""
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative">
            {/* SVG overlay for dependency lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ minWidth: totalDays * dayWidth }}>
              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#ef4444" />
                </marker>
              </defs>
              <g transform={`translate(256, 0)`}> {/* 256px is w-64 width */}
                {renderDependencies()}
              </g>
            </svg>

            {data.map((task, i) => (
              <div key={task.id} className="flex border-b border-slate-700/30 hover:bg-slate-700/30 group relative transition-colors h-[49px]">
                <div className="w-64 flex-shrink-0 p-3 border-r border-slate-700/50 flex justify-between items-center z-20 sticky left-0 bg-slate-900/60 backdrop-blur group-hover:bg-slate-800 transition-all">
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0 shadow-[0_0_8px_currentColor]" style={{ backgroundColor: task.couleur, color: task.couleur }} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-200 truncate">{task.tache}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{task.responsable}</p>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1 bg-slate-800 p-1 rounded-md shadow-lg transition-opacity flex-shrink-0">
                    <Btn onClick={() => { setForm({ ...task }); setModal("edit"); }} variant="ghost" size="sm" className="px-1.5 py-0.5 text-xs">✎</Btn>
                    <Btn onClick={() => setData(data.filter(d => d.id !== task.id))} variant="danger" size="sm" className="px-1.5 py-0.5 text-xs">✕</Btn>
                  </div>
                </div>

                <div className="flex-1 relative" style={{ width: `${totalDays * dayWidth}px` }}>
                  {/* Grid Lines per task */}
                  <div className="absolute inset-0 flex pointer-events-none">
                    {Array.from({ length: totalDays }, (_, j) => {
                      const d = new Date(minDate); d.setDate(d.getDate() + j);
                      return (
                        <div key={j} className={`flex-shrink-0 border-r ${d.getDay() === 1 ? 'border-indigo-500/20' : 'border-slate-700/10'}`} style={{ width: dayWidth }} />
                      );
                    })}
                  </div>

                  <div className="absolute top-1/2 -translate-y-1/2 h-7 rounded flex items-center px-2 cursor-col-resize transition-all hover:brightness-125 hover:shadow-lg hover:shadow-indigo-500/20 z-10 overflow-hidden"
                    onClick={() => { setForm({ ...task }); setModal("edit"); }}
                    style={{
                      left: `${getPos(task.debut) * dayWidth}px`,
                      width: Math.max(`${getWidth(task.debut, task.fin) * dayWidth}`, zoom === "Jour" ? 35 : 20) + 'px',
                      backgroundColor: task.couleur + "44",
                      border: `1px solid ${task.couleur}`,
                    }}>
                    <div className="h-full absolute left-0 top-0 transition-all"
                      style={{ width: `${task.progression}%`, backgroundColor: task.couleur + "aa" }} />

                    {/* Shadow for text readability */}
                    <span className="text-[10px] font-bold relative z-10 truncate px-1" style={{ color: "white", textShadow: '0px 1px 3px rgba(0,0,0,0.8)' }}>
                      {zoom === "Jour" || getWidth(task.debut, task.fin) * dayWidth > 60 ? `${task.tache} ${task.progression}%` : ""}
                    </span>

                    {/* Fake Drag Handles */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 hover:bg-white/40 bg-white/10 cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute right-0 top-0 bottom-0 w-2 hover:bg-white/40 bg-white/10 cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modal && (
        <Modal title={modal === "add" ? "Nouvelle Tâche Gantt" : "Modifier Paramètres GANTT"} onClose={() => setModal(null)}>
          <Input label="Titre de la tâche" value={form.tache || ""} onChange={e => setForm({ ...form, tache: e.target.value })} />
          <Input label="Ressource Allouée" value={form.responsable || ""} onChange={e => setForm({ ...form, responsable: e.target.value })} />

          <div className="grid grid-cols-2 gap-3 mt-4">
            <Input label="Date Début" type="date" value={form.debut || ""} onChange={e => setForm({ ...form, debut: e.target.value })} />
            <Input label="Date Fin" type="date" value={form.fin || ""} onChange={e => setForm({ ...form, fin: e.target.value })} />
          </div>

          <div className="mt-4">
            <label className="block text-xs text-slate-400 mb-1 font-medium">Dépend de la tâche (Optionnel)</label>
            <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500" value={form.dependance || ""} onChange={e => setForm({ ...form, dependance: e.target.value })}>
              <option value="">-- Aucune Dépendance --</option>
              {data.filter(d => d.id !== form.id).map(d => <option key={d.id} value={d.id}>{d.tache}</option>)}
            </select>
          </div>

          <div className="mt-6 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs text-slate-300 font-bold uppercase tracking-wider">Avancement Actuel</label>
              <span className="font-black text-indigo-400 text-lg">{form.progression || 0}%</span>
            </div>
            <input type="range" min="0" max="100" value={form.progression || 0} onChange={e => setForm({ ...form, progression: e.target.value })} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'linear-gradient(to right, #6366f1, #a78bfa)' }} />
          </div>

          <div className="flex gap-3 pt-6 border-t border-slate-700 mt-6">
            <Btn onClick={save} size="md" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-12">Sauvegarder</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: CYCLE DE VIE
// ═══════════════════════════════════════════
const CycleVie = ({ data, setData }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Cycle de Vie du Projet" subtitle="Suivez les étapes cruciales de la méthodologie projet" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {data.map((step, i) => (
          <div key={step.id} className="relative">
            <div className={`p-4 rounded-xl border transition-all h-full flex flex-col ${step.statut === "Terminé" ? "bg-emerald-500/10 border-emerald-500/50" : step.statut === "En cours" ? "bg-indigo-500/10 border-indigo-500/50 shadow-lg shadow-indigo-500/10 scale-105 z-10" : "bg-slate-800/40 border-slate-700/50 opacity-60"}`}>
              <div className="flex justify-between items-start mb-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step.statut === "Terminé" ? "bg-emerald-500 text-white" : "bg-indigo-600 text-white"}`}>{i + 1}</span>
                <Badge value={step.statut} map={{ "Terminé": "#10b981", "En cours": "#6366f1", "A venir": "#475569" }} />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{step.phase}</h3>
              <p className="text-xs text-slate-400 mb-3 flex-1">{step.description}</p>
              <div className="space-y-2 mt-auto">
                <p className="text-[10px] text-slate-500 uppercase font-black">Livrable clé</p>
                <div className="text-xs text-slate-200 bg-slate-700/50 p-2 rounded">{step.livrable}</div>
                <ProgressBar value={step.progression} color={step.statut === "Terminé" ? "#10b981" : "#6366f1"} />
              </div>
            </div>
            {i < data.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-2 text-slate-700 translate-x-1/2 z-0">▶</div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-base font-bold text-white mb-4">Guide d'Assistance Méthodologique</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Étape Actuelle : Planification</h4>
            <div className="bg-slate-700/30 rounded-lg p-4 border-l-2 border-indigo-500">
              <p className="text-sm text-slate-300 italic">"Vous êtes dans la phase critique où vous devez aligner les ressources avec les objectifs de temps."</p>
            </div>
            <ul className="space-y-2 ml-2">
              {["Valider le budget prévisionnel", "Assigner les chefs de lot", "Identifier les risques majeurs"].map(item => (
                <li key={item} className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="text-indigo-500">○</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-indigo-600/10 rounded-xl p-5 border border-indigo-500/20 text-center flex flex-col justify-center">
            <p className="text-2xl mb-2">💡</p>
            <p className="text-sm font-bold text-white mb-1">Besoin d'aide ?</p>
            <p className="text-xs text-slate-400">Consultez l'Assistant Élite pour générer un template de plan de management projet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: ASSISTANT ÉLITE
// ═══════════════════════════════════════════
const AssistantElite = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Bonjour ! Je suis votre Assistant Élite. Comment puis-je vous aider dans la gestion de vos projets aujourd'hui ?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = [...messages, { role: "user", text: input }];
    setMessages(newMsg);
    setInput("");

    // Fake AI response
    setTimeout(() => {
      setMessages([...newMsg, { role: "ai", text: "J'analyse votre demande... Basé sur vos données actuelles (65% d'avancement sur le SI Comptable), je recommande de vérifier les risques de budget." }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      <SectionHeader title="Assistant Élite" subtitle="Votre conseiller stratégique en gestion de projet" />
      <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-4 overflow-y-auto mb-4 space-y-4 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === "user" ? "bg-indigo-600 text-white rounded-tr-none" : "bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          placeholder="Posez une question à l'assistant..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <Btn onClick={handleSend} size="lg" className="px-6">Envoyer</Btn>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: SIMULATEUR DE SCÉNARIOS
// ═══════════════════════════════════════════
const Simulateur = ({ data }) => {
  const [activeScenario, setActiveScenario] = useState(null);
  const [customImpact, setCustomImpact] = useState({ delai: 0, budget: 0, risque: 0 });

  const currentScenario = activeScenario ? SCENARIOS.find(s => s.id === activeScenario) : { impact: customImpact };
  const imp = currentScenario.impact;

  // Stats simulées
  const simStats = [
    { label: "Délai Final", base: "30 Juin", sim: imp.delai === 0 ? "30 Juin" : imp.delai > 0 ? `15 Juil (+${imp.delai}j)` : `10 Juin (${imp.delai}j)`, color: imp.delai > 0 ? "#ef4444" : "#10b981" },
    { label: "Budget Final", base: "345M", sim: imp.budget === 0 ? "345M" : `${(345 * (1 + imp.budget / 100)).toFixed(0)}M (${imp.budget > 0 ? '+' : ''}${imp.budget}%)`, color: imp.budget > 0 ? "#ef4444" : "#10b981" },
    { label: "Niveau Risque", base: "Modéré", sim: imp.risque === 0 ? "Modéré" : imp.risque > 15 ? "Critique" : "Élevé", color: imp.risque > 0 ? "#ef4444" : "#10b981" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader title="Simulateur de Scénarios" subtitle="Anticipez l'impact des imprévus sur votre trajectoire" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SCENARIOS.map(s => (
          <button key={s.id} onClick={() => setActiveScenario(activeScenario === s.id ? null : s.id)}
            className={`p-4 rounded-xl border transition-all text-left ${activeScenario === s.id ? "bg-indigo-600 border-indigo-400 shadow-lg" : "bg-slate-800/60 border-slate-700 hover:border-slate-500"}`}>
            <h3 className="text-sm font-bold text-white mb-1">{s.label}</h3>
            <p className="text-xs text-slate-400 leading-tight">{s.desc}</p>
          </button>
        ))}
      </div>

      <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-bold text-white">Résultat de la Simulation</h3>
          {activeScenario && <Btn variant="ghost" onClick={() => setActiveScenario(null)}>Réinitialiser</Btn>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {simStats.map((s, i) => (
            <div key={i} className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">{s.label}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600">Actuel</p>
                  <p className="text-sm font-bold text-slate-400">{s.base}</p>
                </div>
                <div className="text-xl">➔</div>
                <div className="text-right">
                  <p className="text-xs text-slate-600">Simulé</p>
                  <p className="text-lg font-black" style={{ color: s.color }}>{s.sim}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700">
          <h4 className="text-sm font-bold text-slate-300 mb-4">Analyse d'Impact (Modèle Prédictif)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={[
                { subject: 'Coûts', A: 60, B: 60 + imp.budget },
                { subject: 'Délais', A: 50, B: 50 + imp.delai },
                { subject: 'Risques', A: 40, B: 40 + imp.risque },
                { subject: 'Qualité', A: 80, B: 80 - (imp.delai > 0 ? 5 : 0) },
                { subject: 'Ressources', A: 70, B: 70 - (imp.budget < 0 ? 10 : 0) },
              ]}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <Radar name="Actuel" dataKey="A" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} />
                <Radar name="Simulé" dataKey="B" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center space-y-3">
              <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-4">
                <p className="text-xs font-bold text-indigo-400 mb-2 uppercase">💡 Recommandation Élite</p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {imp.budget > 0 ? "Envisager un arbitrage sur les fonctionnalités non critiques pour compenser le surcoût." :
                    imp.delai > 0 ? "Activer le mode 'Fast-track' ou réduire le périmètre du prochain jalon." :
                      "Maintenir la vigilance sur la vélocité de l'équipe."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: CHOIX MÉTHODOLOGIES
// ═══════════════════════════════════════════
const Methodologies = ({ data, setData }) => {
  const currentMethode = data.methode || "Hybride";

  return (
    <div className="space-y-6">
      <SectionHeader title="Configuration Méthodologique" subtitle="Adaptez l'interface et les outils à votre mode de gestion" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {METHODOLOGIES.map(m => (
          <div key={m.id} onClick={() => setData({ ...data, methode: m.label })}
            className={`p-5 rounded-2xl border transition-all cursor-pointer group ${currentMethode === m.label ? "bg-indigo-600 border-indigo-400 shadow-xl scale-[1.02]" : "bg-slate-800/60 border-slate-700 hover:border-slate-500"}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                {m.icons.map((ic, i) => <span key={i} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">{ic}</span>)}
              </div>
              {currentMethode === m.label && <span className="text-[10px] font-black bg-white text-indigo-600 px-2 py-0.5 rounded-full uppercase">Actif</span>}
            </div>
            <h3 className="text-lg font-black text-white mb-2">{m.label}</h3>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">{m.desc}</p>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-white/60 uppercase font-black">Modules clés</span>
              <p className="text-[10px] text-white/80">{m.label === "Agile / Scrum" ? "Sprint, Kanban, Vélocité" : m.label === "Waterfall (Cascade)" ? "Gantt, Jalons, Budget" : "Tous les outils"}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 text-center">
        <p className="text-sm text-slate-400 mb-2">Méthodologie sélectionnée : <strong className="text-white">{currentMethode}</strong></p>
        <p className="text-xs text-slate-500 italic max-w-md mx-auto">"La sélection d'une méthodologie personnalise automatiquement vos indicateurs de performance et les vues prioritaires du tableau de bord."</p>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: PORTAIL CLIENT
// ═══════════════════════════════════════════
const PortailClient = ({ data }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Portail Client (Lecture Seule)" subtitle="Vue simplifiée pour vos commanditaires ou clients" action={<Btn size="md">Partager le lien</Btn>} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Projets en cours" value={data.projets.filter(p => p.statut === "En cours").length} color="#6366f1" icon="◈" />
        <StatCard label="Jalons validés" value={data.jalons.filter(j => j.statut === "Atteint").length} color="#10b981" icon="◆" />
        <StatCard label="Prochaine livraison" value="15 Mars" color="#f59e0b" icon="⏱" />
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">État d'avancement des Projets</h3>
        <div className="space-y-4">
          {data.projets.filter(p => p.statut !== "Terminé").map(p => (
            <div key={p.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-white">{p.nom}</span>
                <span className="text-sm font-bold text-indigo-400">{p.avancement}%</span>
              </div>
              <ProgressBar value={p.avancement} color="#6366f1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: GESTION DES TEMPS
// ═══════════════════════════════════════════
const FeuillesTemps = ({ data, setData }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Feuilles de Temps" subtitle="Suivi des heures passées par l'équipe" action={<Btn size="md">+ Saisie Heures</Btn>} />
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700">
            {["Date", "Membre", "Tâche", "Heures", "Type"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">{h}</th>)}
          </tr></thead>
          <tbody>
            {data.map(t => (
              <tr key={t.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3 text-sm text-slate-400">{t.date}</td>
                <td className="px-4 py-3 text-sm font-bold text-white">{t.membre}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{t.tache}</td>
                <td className="px-4 py-3 text-sm font-bold text-indigo-400">{t.heures}h</td>
                <td className="px-4 py-3"><Badge value={t.type} map={{ "Facturable": "#10b981", "Non facturable": "#94a3b8" }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: DOCUMENTS (GED)
// ═══════════════════════════════════════════
const DocumentsGED = ({ data }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Gestion Documentaire Intelligente" subtitle="Centralisez et analysez vos documents projets" action={<Btn size="md">+ Uploader</Btn>} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(d => (
          <div key={d.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex gap-3 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl font-black">📄</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate" title={d.nom}>{d.nom}</p>
              <p className="text-xs text-slate-500">{d.projet}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300">{d.taille}</span>
                <span className="text-[10px] text-slate-500">{d.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: FACTURATION AUTOMATISÉE
// ═══════════════════════════════════════════
const Facturation = ({ data }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Facturation & Finance" subtitle="Transformez vos jalons et temps en factures" action={<Btn size="md">+ Nouvelle Facture</Btn>} />
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="CA Généré" value={`${(data.reduce((s, f) => s + f.montant, 0) / 1000000).toFixed(1)}M FCFA`} color="#10b981" icon="💰" />
        <StatCard label="En attente" value={`${(data.filter(f => f.statut === "En attente").reduce((s, f) => s + f.montant, 0) / 1000000).toFixed(1)}M FCFA`} color="#f59e0b" icon="⌛" />
        <StatCard label="Factures payées" value={data.filter(f => f.statut === "Payé").length} color="#6366f1" icon="💳" />
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-slate-700">
            {["N° Facture", "Client", "Projet", "Montant", "Échéance", "Statut", "Action"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">{h}</th>)}
          </tr></thead>
          <tbody>
            {data.map(f => (
              <tr key={f.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-4 py-3 text-sm font-medium text-white">{f.id}</td>
                <td className="px-4 py-3 text-sm text-slate-400">{f.client}</td>
                <td className="px-4 py-3 text-sm text-slate-400">{f.projet}</td>
                <td className="px-4 py-3 text-sm font-bold text-indigo-400">{f.montant.toLocaleString()} FCFA</td>
                <td className="px-4 py-3 text-sm text-slate-500">{f.echeance}</td>
                <td className="px-4 py-3"><Badge value={f.statut} map={{ "Payé": "#10b981", "En attente": "#f59e0b", "Brouillon": "#94a3b8" }} /></td>
                <td className="px-4 py-3"><Btn variant="ghost" size="sm">PDF</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: WORKFLOWS
// ═══════════════════════════════════════════
const Workflows = ({ data }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Moteur de Règles & Notifications" subtitle="Automatisez vos processus de gestion" action={<Btn size="md">+ Créer Règle</Btn>} />
      <div className="space-y-3">
        {data.map(w => (
          <div key={w.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex justify-between items-center hover:border-indigo-500/40">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-bold text-white">{w.nom}</h3>
                <Badge value={w.statut} map={{ "Actif": "#10b981", "Inactif": "#64748b" }} />
              </div>
              <p className="text-xs text-slate-400">Si <strong className="text-indigo-400">{w.declencheur}</strong> alors <strong className="text-indigo-400">{w.action}</strong></p>
            </div>
            <div className="w-10 h-6 bg-slate-700 rounded-full relative cursor-pointer">
              <div className={`w-4 h-4 rounded-full absolute top-1 transition-all ${w.statut === "Actif" ? "left-5 bg-indigo-500" : "left-1 bg-slate-500"}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MODULE: RAPPORTS
// ═══════════════════════════════════════════
const Rapports = () => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Générateur de Rapports" subtitle="Préparez vos supports pour le comité de pilotage" action={<Btn size="md">Nouveau Rapport</Btn>} />
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
        <div className="text-5xl mb-4">📊</div>
        <h3 className="text-lg font-bold text-white mb-2">Sélectionnez les données à exporter</h3>
        <p className="text-sm text-slate-400 mb-6 max-w-md">Combinez Gantt, Avancement, Budget et Risques en un document PDF ou Excel aux couleurs de votre entreprise.</p>
        <div className="flex gap-4">
          <Btn className="bg-red-600 hover:bg-red-500 text-white">Export PDF</Btn>
          <Btn className="bg-emerald-600 hover:bg-emerald-500 text-white">Export Excel</Btn>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// AVANT-GARDE: WAR ROOM VIRTUELLE
// ═══════════════════════════════════════════
const WarRoom = () => {
  return (
    <div className="space-y-6">
      <SectionHeader title="War Room: Metaverse Collaboration" subtitle="Espace virtuel de crise et coordination en temps réel" action={<Btn size="md" className="bg-red-600 hover:bg-red-500 text-white animate-pulse">Rejoindre le Huddle (Live)</Btn>} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden relative min-h-[400px]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 sepia" />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-4xl">🌐</p>
            <p className="text-sm font-bold mt-2 tracking-widest text-slate-300">ESPACE DE COLLABORATION 3D</p>
            <p className="text-xs text-slate-500 mt-1">4 membres actuellement en ligne</p>
          </div>
          {/* Fake cursors/avatars */}
          <div className="absolute top-[20%] left-[30%] bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg shadow-indigo-500/50">Jean D. (Lead)</div>
          <div className="absolute top-[50%] left-[60%] bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg shadow-emerald-500/50">Marie C.</div>
          <div className="absolute top-[70%] left-[20%] bg-fuchsia-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg shadow-fuchsia-500/50">Client Beta</div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex flex-col">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Activité Récente (Live)</h3>
          <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar">
            <div className="text-xs text-slate-400"><span className="text-emerald-400 font-bold">Marie C.</span> a modifié "Architecture système" - il y a 2m</div>
            <div className="text-xs text-slate-400"><span className="text-indigo-400 font-bold">Jean D.</span> a validé un jalon - il y a 5m</div>
            <div className="text-xs text-slate-400"><span className="text-fuchsia-400 font-bold">Système</span> : Dépassement budgétaire détecté - il y a 10m</div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <input className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white" placeholder="Message rapide à l'équipe..." />
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// AVANT-GARDE: COPILOTE IA PRÉDICTIF
// ═══════════════════════════════════════════
const CopilotePredictif = ({ data }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Copilote & Analyse Prédictive" subtitle="Anticipation neuronale des risques basée sur l'historique de l'équipe" action={<Btn size="md">Lancer Analyse Profonde</Btn>} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Health Score" value="A-" color="#10b981" icon="🧬" sub="Basé sur 45 métriques" />
        <StatCard label="Risque de Dérive" value="28%" color="#f59e0b" icon="📉" sub="Sur le projet Migration Cloud" />
        <StatCard label="Vitesse de Burn" value="1.2x" color="#ef4444" icon="🔥" sub="Ressources Backend en surcharge" />
        <StatCard label="Prédiction Succès" value="94%" color="#6366f1" icon="🎯" sub="Fiabilité modèle IA : Haute" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><span className="text-indigo-400">✧</span> Insight Stratégique</h3>
          <p className="text-sm text-slate-300 mb-4 leading-relaxed">
            D'après l'analyse des Sprints précédents, l'équipe accuse une <strong>baisse de vélocité de 15%</strong> en période de tests UAT. Le modèle prédictif recommande d'allouer <strong>1 ressource QA supplémentaire</strong> (Sophie L.) pendant le mois de Mai sur le projet "Refonte SI Comptable" pour éviter un glissement du délai initial.
          </p>
          <div className="flex gap-3">
            <Btn className="bg-indigo-600 hover:bg-indigo-500">Appliquer Auto-Allocation</Btn>
            <Btn variant="ghost">Voir les données sources</Btn>
          </div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Arbre de Décision Neuronal</h3>
          {/* Fake Graph Representation */}
          <div className="h-[120px] flex items-center justify-center border border-slate-700/50 rounded-lg bg-slate-900/50 relative">
            <div className="w-1/2 h-0.5 bg-indigo-500/50 absolute left-8" />
            <div className="w-1/4 h-0.5 bg-red-500/50 absolute left-1/2 rotate-45" />
            <div className="w-1/4 h-0.5 bg-emerald-500/50 absolute left-1/2 -rotate-45" />
            <div className="absolute left-4 bg-slate-800 p-2 text-[10px] text-white rounded border border-indigo-400">Budget IT</div>
            <div className="absolute right-4 top-2 bg-slate-800 p-2 text-[10px] text-white rounded border border-red-400">Risque Elevé</div>
            <div className="absolute right-4 bottom-2 bg-slate-800 p-2 text-[10px] text-white rounded border border-emerald-400">Optimal</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// AVANT-GARDE: SMART CONTRACTS
// ═══════════════════════════════════════════
const SmartContracts = ({ data }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Gouvernance & Smart Contracts" subtitle="Registre immuable des approbations et paiements on-chain" action={<Btn size="md" className="bg-emerald-600 hover:bg-emerald-500 text-white">Déployer Contrat</Btn>} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 flex flex-col justify-center text-center">
          <div className="text-5xl mb-3 text-emerald-400">⛓</div>
          <p className="text-sm font-bold text-white mb-1">Réseau Privé Élite</p>
          <p className="text-xs text-slate-400 mb-3">Nodes actifs : 4/4</p>
          <p className="text-[10px] text-emerald-500 font-mono bg-emerald-900/20 px-2 py-1 rounded">Statut : CONNECTÉ</p>
        </div>
        <div className="col-span-3 bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-slate-700">
              {["Hash Contrat", "Projet", "Montant Sécurisé", "Condition de Trigger", "Date", "Statut"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">{h}</th>)}
            </tr></thead>
            <tbody>
              {data.map((c, i) => (
                <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="px-4 py-3 text-xs font-mono text-indigo-400">{c.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-200">{c.projet}</td>
                  <td className="px-4 py-3 text-sm font-bold text-emerald-400">{c.montant.toLocaleString()} FCFA</td>
                  <td className="px-4 py-3 text-xs text-slate-400 flex items-center gap-1"><i>λ</i> {c.condition}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{c.date}</td>
                  <td className="px-4 py-3"><Badge value={c.statut} map={{ "Exécuté": "#10b981", "En attente": "#f59e0b", "Bloqué": "#ef4444" }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// NEW: PORTFOLIO FINANCIER (ANALYSE ROI)
// ═══════════════════════════════════════════
const PortfolioFinancier = ({ data }) => {
  const caTotal = data.factures.filter(f => f.statut === "Payé").reduce((s, f) => s + f.montant, 0);
  const coutsTotaux = data.couts.reduce((s, c) => s + c.reel, 0);
  const marge = caTotal - coutsTotaux;
  const margePct = caTotal > 0 ? Math.round((marge / caTotal) * 100) : 0;
  const burnRateActuel = Math.round(coutsTotaux / 180); // Faux burn rate sur 6 mois

  const cashflowData = [
    { mois: "Jan", Revenus: 10000000, Sorties: 12000000 },
    { mois: "Fév", Revenus: 45000000, Sorties: 28000000 },
    { mois: "Mar", Revenus: 25000000, Sorties: 18000000 },
    { mois: "Avr", Revenus: 15000000, Sorties: 15000000 },
    { mois: "Mai", Revenus: 30000000, Sorties: 10000000 },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader title="Portfolio & Intelligence Financière" subtitle="Analyse de rentabilité macroscopique et prévisions de trésorerie" action={<Btn size="md">Exporter Bilan</Btn>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Chiffre d'Affaires" value={`${(caTotal / 1000000).toFixed(1)}M`} sub="FCFA Encaissés" color="#10b981" icon="📥" />
        <StatCard label="Coûts Dépensés" value={`${(coutsTotaux / 1000000).toFixed(1)}M`} sub="FCFA Sortis" color="#ef4444" icon="📤" />
        <StatCard label="Marge Nette" value={`${margePct}%`} sub={`${(marge / 1000000).toFixed(1)}M FCFA bénéfice`} color="#6366f1" icon="💎" />
        <StatCard label="Burn Rate Moyen" value={`${(burnRateActuel / 1000).toFixed(0)}k/j`} sub="FCFA consommés par jour" color="#f59e0b" icon="🔥" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">🔄 Projection du Cashflow (FCFA)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={cashflowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="mois" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: 8 }} formatter={v => `${v.toLocaleString()}`} />
              <Legend />
              <Area type="monotone" dataKey="Revenus" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Area type="monotone" dataKey="Sorties" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 flex flex-col">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Analyse de Rentabilité par Projet</h3>
          <div className="space-y-4 flex-1">
            {data.projets.map(p => {
              const prev = p.budget;
              const dep = p.budgetReel;
              const isProfit = dep <= prev;
              return (
                <div key={p.id} className="border-b border-slate-700/50 pb-3 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-white truncate w-40">{p.nom}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${isProfit ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                      {isProfit ? "+" : "-"}{Math.abs(prev - dep).toLocaleString()} F
                    </span>
                  </div>
                  <ProgressBar value={(dep / prev) * 100} color={isProfit ? "#10b981" : "#ef4444"} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// NEW: STRATÉGIE ET OKR
// ═══════════════════════════════════════════
const StrategieOKR = ({ data }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Alignement Stratégique (OKRs)" subtitle="Connectez l'exécution de vos projets à la vision globale de l'entreprise" action={<Btn size="md">+ Nouvel Objectif</Btn>} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.okrs.map(okr => (
          <div key={okr.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 relative overflow-hidden group hover:border-indigo-500 transition-all">
            <div className={`absolute top-0 right-0 w-24 h-24 blur-2xl -mt-6 -mr-6 transition-all group-hover:opacity-100 opacity-30 ${okr.progression >= 50 ? 'bg-indigo-600' : 'bg-fuchsia-600'}`} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <Badge value={okr.type} map={{ "Stratégique": "#6366f1", "Opérationnel": "#f59e0b", "Innovation": "#ec4899" }} />
                <Badge value={okr.statut} map={{ "En bonne voie": "#10b981", "En cours": "#f59e0b", "En retard": "#ef4444" }} />
              </div>

              <h3 className="text-xl font-black text-white mb-2 leading-tight">{okr.objectif}</h3>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Progression Clé</span>
                  <span className="text-indigo-400 font-black">{okr.progression}%</span>
                </div>
                <ProgressBar value={okr.progression} color={okr.progression >= 50 ? "#6366f1" : "#ec4899"} />
              </div>

              <div className="mt-5 pt-4 border-t border-slate-700/50">
                <p className="text-[10px] text-slate-500 uppercase font-black mb-2 tracking-widest">Projets liés</p>
                <div className="flex flex-wrap gap-2">
                  {okr.projets.map(p => (
                    <span key={p} className="text-xs bg-slate-700/50 border border-slate-600 px-2 py-1 rounded-md text-slate-300">🔗 {p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// NEW: GÉNÉRATION DOCS IA (REMPLACE RAPPORTS)
// ═══════════════════════════════════════════
const GenerationIA = () => {
  const [loading, setLoading] = useState(false);
  const [doc, setDoc] = useState(null);

  const generateDoc = (type) => {
    setLoading(true);
    setTimeout(() => {
      setDoc({ type, date: new Date().toLocaleString() });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Studio de Génération IA" subtitle="Laissez le Copilote rédiger vos livrables officiels instantanément" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-base font-bold text-white mb-6">Sélectionnez le type de document à produire</h3>
          <div className="space-y-3">
            {[
              { id: "charte", label: "Charte de Projet Complète", icon: "📐", desc: "Objectifs, périmètre, ressources et planning initial." },
              { id: "copil", label: "Support Comité de Pilotage (PDF)", icon: "📊", desc: "Synthèse des KPI, Budget et Risques du mois." },
              { id: "cr", label: "Compte-Rendu de Réunion Auto", icon: "📝", desc: "Résumé des tâches terminées depuis 7 jours." },
              { id: "risque", label: "Matrice des Risques Détaillée", icon: "⛨", desc: "Analyse d'impact et plans de contingence." }
            ].map(d => (
              <button key={d.id} onClick={() => generateDoc(d.label)} disabled={loading}
                className="w-full text-left bg-slate-900/50 hover:bg-indigo-900/40 border border-slate-700 hover:border-indigo-500 p-4 rounded-xl transition-all flex items-start gap-4 group">
                <span className="text-2xl opacity-80 group-hover:scale-110 transition-transform">{d.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-400">{d.label}</h4>
                  <p className="text-xs text-slate-400 mt-1">{d.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
          {loading ? (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-indigo-400 font-bold animate-pulse">L'IA rédige votre document...</p>
              <p className="text-xs text-slate-500 mt-2">Analyse des jalons et du budget en cours.</p>
            </div>
          ) : doc ? (
            <div className="text-center w-full">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-lg font-bold text-white mb-2">{doc.type}</h3>
              <p className="text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded inline-block mb-6">✔ Généré avec succès le {doc.date}</p>
              <div className="flex justify-center gap-3">
                <Btn className="bg-indigo-600 hover:bg-indigo-500 max-w-xs">Télécharger PDF</Btn>
                <Btn variant="ghost">Enregistrer dans la GED</Btn>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800 text-left">
                <p className="text-[10px] text-slate-500 uppercase font-black mb-2">Aperçu du contenu (Snippet)</p>
                <div className="bg-slate-800 p-4 rounded text-xs text-slate-300 font-mono leading-relaxed h-32 overflow-hidden relative">
                  "Le projet Refonte SI Comptable affiche actuellement un taux d'avancement global de 65%.
                  Le budget consommé est maîtrisé à hauteur de 78M FCFA sur les 120M prévus... "
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-800 to-transparent" />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center opacity-40">
              <div className="text-5xl mb-4">✨</div>
              <p className="text-sm text-white">Sélectionnez un modèle à gauche pour tester la magie de l'IA.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════
// NEW: CALENDRIER CENTRAL (PLANNING MUTUALISÉ)
// ═══════════════════════════════════════════
const CalendrierCentral = ({ data }) => {
  // Calculer quelques dates bidons autour d'aujourd'hui pour l'affichage factice
  const today = new Date();
  const d1 = new Date(today); d1.setDate(today.getDate() - 2);
  const d2 = new Date(today); d2.setDate(today.getDate() + 3);
  const d3 = new Date(today); d3.setDate(today.getDate() + 7);

  return (
    <div className="space-y-6">
      <SectionHeader title="Planning Master" subtitle="Vue consolidée des sprints, jalons et disponibilités" action={<Btn size="md">Synchroniser Outlook/GCal</Btn>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Événements" value="12" sub="Cette semaine" color="#6366f1" icon="📅" />
        <StatCard label="Surcharges" value="2" sub="Conflits détectés" color="#ef4444" icon="⚠" />
        <StatCard label="Livrables Visés" value="5" sub="Dans les 15 jours" color="#10b981" icon="📦" />
        <StatCard label="Capacité Équipe" value="78%" sub="Taux d'occupation" color="#f59e0b" icon="⚡" />
      </div>

      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">Semaine Actuelle</h3>
          <div className="flex gap-2">
            <Btn variant="ghost">◀</Btn>
            <Btn variant="ghost">Aujourd'hui</Btn>
            <Btn variant="ghost">▶</Btn>
          </div>
        </div>

        {/* Fake Calendar Grid */}
        <div className="border border-slate-700 rounded-lg overflow-hidden flex flex-col">
          {/* Header */}
          <div className="grid grid-cols-5 bg-slate-900/80 border-b border-slate-700">
            {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((j, i) => (
              <div key={j} className="p-3 text-center border-r border-slate-700 last:border-r-0">
                <p className="text-xs text-slate-400 uppercase tracking-widest">{j}</p>
                <p className="text-lg font-bold text-slate-200 mt-1">{today.getDate() - today.getDay() + 1 + i}</p>
              </div>
            ))}
          </div>
          {/* Body */}
          <div className="grid grid-cols-5 min-h-[300px]">
            <div className="border-r border-slate-700 p-2 space-y-2">
              <div className="bg-indigo-600/20 border border-indigo-500/50 rounded p-2 text-xs">
                <p className="font-bold text-indigo-400">Démo MVP (Refonte SI)</p>
                <p className="text-slate-400 mt-1">10:00 - Jean D.</p>
              </div>
            </div>
            <div className="border-r border-slate-700 p-2 space-y-2 relative">
              <div className="absolute top-0 left-0 right-0 h-full bg-slate-800/40 pointer-events-none" />
              <div className="relative z-10 bg-emerald-600/20 border border-emerald-500/50 rounded p-2 text-xs">
                <p className="font-bold text-emerald-400">Jalon: Validation Specs</p>
                <p className="text-slate-400 mt-1">14:00 - Marie C.</p>
              </div>
            </div>
            <div className="border-r border-slate-700 p-2 space-y-2">
            </div>
            <div className="border-r border-slate-700 p-2 space-y-2 bg-red-900/10">
              <div className="bg-red-600/20 border border-red-500/50 rounded p-2 text-xs relative">
                <p className="font-bold text-red-400">⚠ Goulot d'étranglement</p>
                <p className="text-slate-400 mt-1 mb-2">Paul M. est surbooké</p>
                <div className="h-1 bg-red-500/50 rounded-full" />
                <div className="h-1 bg-fuchsia-500/50 rounded-full mt-1" />
                <div className="h-1 bg-amber-500/50 rounded-full mt-1" />
              </div>
            </div>
            <div className="p-2 space-y-2">
              <div className="bg-fuchsia-600/20 border border-fuchsia-500/50 rounded p-2 text-xs">
                <p className="font-bold text-fuchsia-400">Fin Sprint 3</p>
                <p className="text-slate-400 mt-1">17:00 - Équipe DevOps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// NEW: INTÉGRATIONS & WEBHOOKS (API)
// ═══════════════════════════════════════════
const IntegrationsWebhooks = ({ data, setData }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Intégrations & Webhooks" subtitle="Connectez ProjetÉlite au reste de votre écosystème logiciel via API" action={<Btn size="md" className="bg-indigo-600">+ Nouveau Webhook</Btn>} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { name: "Slack", icon: "💬", desc: "Notification sur channel dédié", active: true },
          { name: "Microsoft Teams", icon: "👥", desc: "Alertes financières directes", active: true },
          { name: "Jira", icon: "🎫", desc: "Synchronisation bi-directionnelle", active: true },
          { name: "GitLab / GitHub", icon: "🐙", desc: "Lien entre commits et tâches", active: false },
          { name: "Salesforce", icon: "☁", desc: "Création auto de portail client", active: false },
        ].map(i => (
          <div key={i.name} className={`border rounded-xl p-5 flex items-start gap-4 transition-all hover:bg-slate-800 ${i.active ? "bg-slate-800/80 border-indigo-500/50" : "bg-slate-900/50 border-slate-700"}`}>
            <div className={`text-3xl ${i.active ? "" : "grayscale opacity-40"}`}>{i.icon}</div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white">{i.name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{i.desc}</p>
              <div className="mt-4">
                {i.active ? (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">✔ CONNECTÉ</span>
                ) : (
                  <Btn variant="ghost" size="sm" className="text-[10px] py-1">Connecter</Btn>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
          <h3 className="text-sm font-bold text-white">Endpoints Webhooks Configurés</h3>
          <span className="text-xs text-slate-400">{data.length} actifs</span>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-slate-700">
            {["Service / Nom", "URL Endpoint", "Événement Déclencheur", "Statut"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">{h}</th>)}
          </tr></thead>
          <tbody>
            {data.map(w => {
              const color = w.statut === "Connecté" ? "#10b981" : w.statut === "Erreur" ? "#ef4444" : "#f59e0b";
              return (
                <tr key={w.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="px-4 py-3 text-sm font-bold text-white">{w.nom}</td>
                  <td className="px-4 py-3 text-xs text-indigo-300 font-mono truncate max-w-[200px]">{w.url}</td>
                  <td className="px-4 py-3 text-xs text-slate-300"><span className="bg-slate-700 px-2 py-1 rounded text-slate-300">{w.event}</span></td>
                  <td className="px-4 py-3"><Badge value={w.statut} map={{ "Connecté": "#10b981", "Erreur": "#ef4444", "En pause": "#f59e0b" }} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// NEW: PROJECT INTAKE & GESTION DES DEMANDES
// ═══════════════════════════════════════════
const DemandesModeles = ({ data, setData }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Intake & Modèles (PMO)" subtitle="Approuvez, qualifiez et transformez les demandes en projets via des Modèles" action={<Btn size="md" className="bg-indigo-600 shadow-indigo-600/30 shadow-lg">Créer Formulaire Public</Btn>} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Nouvelles Demandes" value="12" sub="En attente de tri" color="#f59e0b" icon="📥" />
        <StatCard label="Approuvées" value="45" sub="Ce trimestre" color="#10b981" icon="✅" />
        <StatCard label="Rejetées" value="8" sub="Hors budget/stratégie" color="#ef4444" icon="❌" />
        <StatCard label="Modèles Actifs" value="14" sub="Blueprints PMO" color="#6366f1" icon="📋" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden shadow-xl">
          <div className="px-5 py-4 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">Triage des Demandes (Intake Queue)</h3>
            <Btn variant="ghost" size="sm">Filtrer</Btn>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-left text-xs font-bold text-slate-400 uppercase">
                <th className="px-4 py-3">Titre de la demande</th>
                <th className="px-4 py-3">Demandeur</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 group transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-bold text-slate-200">{d.titre}</p>
                    <p className="text-[10px] text-slate-500 mt-1">Échéance: {d.date}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-300">{d.demandeur}</td>
                  <td className="px-4 py-3 text-xs text-indigo-300"><span className="bg-indigo-900/40 px-2 py-1 rounded">{d.type}</span></td>
                  <td className="px-4 py-3"><Badge value={d.statut} map={{ "Nouveau": "#6366f1", "En revue": "#f59e0b", "Approuvé": "#10b981" }} /></td>
                  <td className="px-4 py-3 text-right">
                    <Btn size="sm" className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-600 hover:text-white px-2 py-1 text-xs">Approuver</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 shadow-xl flex flex-col">
          <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2"><span className="text-indigo-400">📋</span> Centre de Modèles (Blueprints)</h3>
          <p className="text-xs text-slate-400 mb-4">Standardisez l'exécution : transformez une demande approuvée en projet grâce à un modèle PMO préconfiguré.</p>

          <div className="space-y-3 flex-1">
            {["🚀 Déploiement Logiciel IT", "📣 Lancement de Campagne", "🏢 Ouverture de Boutique", "🛡️ Audit de Conformité"].map((tpl, i) => (
              <div key={i} className="border border-slate-700 rounded-lg p-3 hover:border-indigo-500/50 cursor-pointer transition-colors bg-slate-900/40 flex items-center justify-between group">
                <div>
                  <p className="text-sm font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">{tpl}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Inclus: 12 tâches, 4 jalons</p>
                </div>
                <Btn variant="ghost" size="sm" className="opacity-50 group-hover:opacity-100 transition-opacity">→</Btn>
              </div>
            ))}
          </div>
          <Btn className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-600 border-dashed">+ Créer un Modèle</Btn>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// NEW: AUTOMATISATIONS NO-CODE
// ═══════════════════════════════════════════
const AutomatisationsNoCode = ({ data, setData }) => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Automatisations & Règles No-Code" subtitle="Éliminez le travail manuel en créant des règles logiques 'Si ceci, Alors cela'" action={<Btn size="md" className="bg-gradient-to-r from-fuchsia-600 to-indigo-600 shadow-lg shadow-fuchsia-600/30 text-white font-bold border-0">+ Nouvelle automatisation</Btn>} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 text-7xl opacity-5 group-hover:scale-110 transition-transform group-hover:text-indigo-400">🤖</div>
          <h3 className="text-3xl font-black text-white mb-1">24k</h3>
          <p className="text-sm text-slate-400 font-medium">Actions exécutées ce mois</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 text-7xl opacity-5 group-hover:scale-110 transition-transform group-hover:text-amber-400">⏱️</div>
          <h3 className="text-3xl font-black text-white mb-1">160h</h3>
          <p className="text-sm text-slate-400 font-medium">Temps humain économisé</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 text-7xl opacity-5 group-hover:scale-110 transition-transform group-hover:text-emerald-400">⚡</div>
          <h3 className="text-3xl font-black text-white mb-1">{data.filter(d => d.active).length}</h3>
          <p className="text-sm text-slate-400 font-medium">Règles actives (Globales)</p>
        </div>
      </div>

      <div className="space-y-4">
        {data.map(rule => (
          <div key={rule.id} className={`flex items-stretch border rounded-xl overflow-hidden transition-all shadow-md group ${rule.active ? "bg-slate-800/80 border-indigo-500/50 hover:border-indigo-400" : "bg-slate-900/40 border-slate-700 opacity-70 hover:opacity-100 disabled"}`}>
            {/* Toggle Column */}
            <div className="w-16 flex items-center justify-center border-r border-slate-700/50 bg-slate-900/40">
              <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${rule.active ? "bg-emerald-500" : "bg-slate-600"}`}
                onClick={() => setData(data.map(d => d.id === rule.id ? { ...d, active: !d.active } : d))}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${rule.active ? "translate-x-4 shadow-sm" : ""}`} />
              </div>
            </div>

            {/* Content Column */}
            <div className="flex-1 p-5 flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 min-w-0 w-full">
                <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  {rule.nom}
                  {!rule.active && <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300">DÉSACTIVÉ</span>}
                </h3>

                {/* Visual Rule Builder Block */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-medium">
                  <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded">QUAND</span>
                  <span className="text-indigo-400 font-bold border-b border-indigo-500/50 border-dashed pb-0.5 whitespace-nowrap">{rule.trigger}</span>

                  <span className="text-slate-500">+</span>
                  <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded">SI CONDITION</span>
                  <span className="text-fuchsia-400 font-bold border-b border-fuchsia-500/50 border-dashed pb-0.5 whitespace-nowrap">{rule.condition}</span>

                  <span className="text-slate-500 ml-2">👉</span>
                  <span className="bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded font-bold whitespace-nowrap">ALORS {rule.action}</span>
                </div>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Btn variant="ghost" size="sm" className="bg-slate-800 text-slate-300 hover:text-white">✏️ Éditer</Btn>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// NEW: GUIDE INTERACTIF (DÉBUTANTS)
// ═══════════════════════════════════════════
const GuideInteractif = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "👋 Bienvenue dans ProjetÉlite",
      desc: "Vous n'avez jamais géré de projet ? Pas de panique. Ce guide va vous expliquer les bases en quelques minutes pour que vous puissiez piloter votre équipe comme un pro.",
      icon: "🧭",
      color: "#6366f1"
    },
    {
      title: "📦 Qu'est-ce qu'un projet, concrètement ?",
      desc: "Un projet n'est qu'un gros objectif découpé en petits morceaux. Ces morceaux s'appellent des Tâches. Quand un groupe de tâches importantes est fini, on appelle ça un Jalon (Milestone).",
      icon: "🧩",
      color: "#f59e0b",
      actionDesc: "Exemple : L'objectif 'Créer un site' (Le Projet) se découpe en 'Faire le design' (Tâche 1) et 'Coder le site' (Tâche 2). Finir le design est un Jalon."
    },
    {
      title: "🔄 Choisir sa Méthode : Agile vs Cascade",
      desc: "Il y a 2 grandes façons de s'organiser :\n- Cascade (Waterfall) : On planifie TOUT à l'avance du début à la fin.\n- Agile : On avance par petites étapes (Sprints de 2 semaines) et on s'adapte en cours de route.",
      icon: "⚖",
      color: "#10b981",
      actionDesc: "👉 L'industrie moderne utilise majoritairement Agile pour éviter les mauvaises surprises."
    },
    {
      title: "⏱ Le Diagramme de Gantt",
      desc: "C'est l'outil ultime du chef de projet. C'est simplement un calendrier visuel où chaque tâche est une barre allant de sa date de début à sa date de fin. Si la tâche B a besoin que la tâche A soit finie pour démarrer, on parle de 'Dépendance'.",
      icon: "▬",
      color: "#a78bfa"
    },
    {
      title: "🚀 Par où commencer dans l'application ?",
      desc: "Inutile d'utiliser les 24 modules d'un coup ! Pour votre premier projet :\n1. Allez dans 'Multi-Projets' pour créer le nom de votre projet.\n2. Allez dans 'Tâches' pour lister ce qu'il y a à faire.\n3. Consultez le 'Tableau de bord' pour voir l'avancement automatique.",
      icon: "🎯",
      color: "#ec4899"
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto mt-4">
      <SectionHeader title="Académie ProjetÉlite" subtitle="Formation express à la gestion de projet" />

      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-8 text-center relative overflow-hidden">
        {/* Progress Bar Background */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-900">
          <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>

        <div className="flex justify-between items-center mb-8 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest relative z-10">
          <span>Étape {step + 1} sur {steps.length}</span>
          <span className="text-indigo-400">Notions de Base</span>
        </div>

        <div className="py-6 min-h-[250px] flex flex-col items-center justify-center relative z-10 transition-all duration-300">
          <div className="text-7xl mb-6 shadow-2xl rounded-full" style={{ color: steps[step].color, textShadow: `0 0 40px ${steps[step].color}55` }}>
            {steps[step].icon}
          </div>
          <h2 className="text-2xl font-black text-white mb-4">{steps[step].title}</h2>
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed whitespace-pre-line">
            {steps[step].desc}
          </p>
          {steps[step].actionDesc && (
            <div className="mt-6 bg-slate-900/80 border border-slate-700 p-4 rounded-lg text-sm text-slate-400 italic max-w-lg">
              {steps[step].actionDesc}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-12 relative z-10 border-t border-slate-700/50 pt-6">
          <Btn onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} variant="ghost" className={step === 0 ? "opacity-30 pointer-events-none" : ""}>
            ◀ Retour
          </Btn>

          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div key={i} onClick={() => setStep(i)} className={`w-3 h-3 rounded-full cursor-pointer transition-all ${i === step ? "bg-indigo-500 scale-125" : "bg-slate-700 hover:bg-slate-600"}`} />
            ))}
          </div>

          {step < steps.length - 1 ? (
            <Btn onClick={() => setStep(step + 1)} size="md" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 shadow-lg shadow-indigo-600/20">
              Suivant ▶
            </Btn>
          ) : (
            <Btn onClick={() => alert("🎉 Félicitations ! Vous avez acquis les concepts de base. Vous pouvez vous rendre dans 'Multi-Projets'.")} size="md" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 shadow-lg shadow-emerald-600/20 animate-pulse">
              Démarrer mon projet ✓
            </Btn>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// NEW: LANDING PAGE (PAGE DE GARDE)
// ═══════════════════════════════════════════
const LandingPage = ({ onEnter }) => {
  return (
    <div className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] bg-fuchsia-600/20 blur-[130px] rounded-full" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-emerald-600/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')] opacity-[0.03] mix-blend-overlay bg-cover bg-center" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">

        {/* Logo Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Version Enterprise 3.0</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
          PROJET<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400">ÉLITE</span>
        </h1>

        <p className="text-lg md:text-2xl text-slate-400 font-light max-w-3xl mb-12 leading-relaxed">
          La plateforme de gestion de projet ultime. Unifiez vos équipes, vos budgets et vos opérations grâce à l'intelligence artificielle et une suite de 26 modules intégrés.
        </p>

        {/* Call To Action */}
        <button
          onClick={onEnter}
          className="group relative px-8 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xl rounded-2xl shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] flex items-center gap-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out" />
          <span>Lancer l'Espace de Travail</span>
          <span className="group-hover:translate-x-2 transition-transform">→</span>
        </button>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 w-full">
          {[
            { title: "26 Modules", desc: "Suite complète", icon: "📦" },
            { title: "Gantt Avancé", desc: "Drag & Drop", icon: "▬" },
            { title: "IA Prédictive", desc: "Health Score", icon: "🧠" },
            { title: "No-Code", desc: "Automatisations", icon: "🤖" }
          ].map((f, i) => (
            <div key={i} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 text-left hover:border-indigo-500/50 transition-colors">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-white font-bold mb-1">{f.title}</h3>
              <p className="text-slate-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 text-xs font-mono text-slate-600">
        © 2026 Système d'Information Élite · Accès Sécurisé
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function App() {
  const [showApp, setShowApp] = useState(false);
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
      case "cycle": return <CycleVie data={data.cycle} setData={update("cycle")} />;
      case "assistant": return <AssistantElite />;
      case "simulation": return <Simulateur data={data} />;
      case "methodologies": return <Methodologies data={data} setData={setData} />;
      case "portail": return <PortailClient data={data} />;
      case "temps": return <FeuillesTemps data={data.temps} setData={update("temps")} />;
      case "docs": return <DocumentsGED data={data.documents} setData={update("documents")} />;
      case "factures": return <Facturation data={data.factures} setData={update("factures")} />;
      case "workflows": return <Workflows data={data.workflows} setData={update("workflows")} />;
      case "rapports": return <GenerationIA />;
      case "warroom": return <WarRoom />;
      case "copilote": return <CopilotePredictif data={data} />;
      case "smartcontracts": return <SmartContracts data={data.smartcontracts} />;
      case "portfolio": return <PortfolioFinancier data={data} />;
      case "okr": return <StrategieOKR data={data} />;
      case "calendrier": return <CalendrierCentral data={data} />;
      case "webhooks": return <IntegrationsWebhooks data={data.webhooks || []} setData={update("webhooks")} />;
      case "intake": return <DemandesModeles data={data.intake || []} setData={update("intake")} />;
      case "automations": return <AutomatisationsNoCode data={data.automations || []} setData={update("automations")} />;
      case "guide": return <GuideInteractif />;
      default: return null;
    }
  };

  // MOCK LOGIN OR ENTER
  if (!showApp) {
    return <LandingPage onEnter={() => setShowApp(true)} />;
  }

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
