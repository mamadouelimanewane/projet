export const INITIAL_DATA = {
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
    { id: 1, nom: "Plan Fondation Villa 1A.pdf", projet: "Résidence Elite", type: "Technique", taille: "4.5MB", date: "2026-03-25", auteur: "Cabinet ARCHI", categorie: "BIM/Plans" },
    { id: 2, nom: "PV Réception Tablier Pont.pdf", projet: "Pont Renaissance", type: "Officiel", taille: "1.2MB", date: "2026-03-28", auteur: "Bureau Contrôle", categorie: "PV Réception" },
    { id: 3, nom: "Note de Calcul Sol (PK 12).xlsx", projet: "Route Littoral", type: "Technique", taille: "0.8MB", date: "2026-03-20", auteur: "Labo Géo", categorie: "Géotechnique" },
    { id: 4, nom: "Contrat Sous-Traitant-Sogea.pdf", projet: "Infrastructure Global", type: "Administratif", taille: "2.1MB", date: "2026-03-15", auteur: "Droit BTP", categorie: "Contrats" },
    { id: 5, nom: "Habilitations QHSE Equipe A.zip", projet: "Chantier Nord", type: "Sécurité", taille: "12MB", date: "2026-03-30", auteur: "Resp. QHSE", categorie: "RH/QHSE" }
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
  automate: "Hybride",
  safe: [
    { id: 1, train: "Release Train Alpha (RTA)", pi: "PI-2026-Q1", iteration: "Sprint 3", status: "En bonne voie", pB: 85, budget: 5000000 },
    { id: 2, train: "Data Platform Train (DPT)", pi: "PI-2026-Q1", iteration: "Sprint 3", status: "Risque de retard", pB: 62, budget: 3500000 }
  ],
  greenPmo: [
    { id: 1, projet: "Refonte SI Comptable", empreinteReel: 4500, limite: 5000, unite: "kgCO2", categorie: "Infrastructure Cloud", statut: "Conforme" },
    { id: 2, projet: "App Mobile RH", empreinteReel: 1200, limite: 1000, unite: "kgCO2", categorie: "Développement & Tests", statut: "Alerte" }
  ],
  evm: [
    { id: 1, projet: "Pont de la Renaissance", pV: 450000000, eV: 420000000, aC: 410000000, spi: 0.93, cpi: 1.02, tendance: "Stable" },
    { id: 2, projet: "Autoroute du Littoral", pV: 850000000, eV: 650000000, aC: 700000000, spi: 0.76, cpi: 0.92, tendance: "Risque" }
  ],
  genieCivil: {
    materiaux: [
      { nom: "Béton B35", stock: 450, unite: "m3", seuil: 100, statut: "Normal" },
      { nom: "Acier HA16", stock: 12, unite: "tonnes", seuil: 15, statut: "Critique" },
      { nom: "Bitume 40/50", stock: 85, unite: "tonnes", seuil: 20, statut: "Normal" }
    ],
    securite: { incidents: 0, joursSansAccident: 145, tauxFrequence: 1.2 },
    impact: { emploiLocal: 82, pmeLocales: 14, scoreESG: 8.5 },
    typologies: {
      batiment: {
        projet: "Résidence Elite (12 Villas)",
        avancementTCE: [
          { corps: "Gros Œuvre", progress: 95, color: "#6366f1" },
          { corps: "Plomberie/Elec", progress: 60, color: "#f59e0b" },
          { corps: "Second Œuvre", progress: 40, color: "#10b981" },
          { corps: "Finitions/Peinture", progress: 10, color: "#94a3b8" }
        ],
        unites: 12,
        unitesLivrees: 0
      },
      infrastructure: {
        projet: "Pont de la Renaissance & Voie Express",
        lineaireTotal: 50,
        lineaireActuel: 14.5,
        terrassement: { deblais: 45000, remblais: 38000, cible: 120000 },
        engins: { dispo: 12, maintenance: 2, total: 14 }
      }
    },
    finances: {
      totalBudget: 1500000000,
      decaissat: 750000000,
      engagements: 450000000,
      sCurve: [
        { mois: 'Jan', prevu: 100, reel: 95 },
        { mois: 'Fév', prevu: 250, reel: 230 },
        { mois: 'Mar', prevu: 450, reel: 410 },
        { mois: 'Avr', prevu: 700, reel: 750 },
        { mois: 'Mai', prevu: 1000, reel: null },
      ],
      bailleurs: [
        { nom: "Banque Mondiale", part: 60, statut: "Libéré (Tranche 2)" },
        { nom: "Gouvernement", part: 40, statut: "En attente" }
      ]
    },
    rh: {
      effectifTotal: 345,
      categories: [
        { label: "Ingénieurs", count: 25, color: "#6366f1" },
        { label: "Chefs de Chantier", count: 40, color: "#f59e0b" },
        { label: "Ouvriers Qualifiés", count: 180, color: "#10b981" },
        { label: "Apprentis/Manœuv.", count: 100, color: "#94a3b8" }
      ],
      localContent: 88
    }
  },
  dependencies: [
    { source: 1, target: 2, type: "Hard" }, // SI Comptable -> Mobile RH
    { source: 1, target: 3, type: "Data" }, // SI Comptable -> Jira Sync
    { source: 3, target: 4, type: "API" }   // Jira Sync -> Zapier
  ],
  sentiment: [
    { name: "Dev Team", score: 65, trend: "📉", risk: "Elevé (Burnout)" },
    { name: "QA / Ops", score: 88, trend: "📈", risk: "Stable" },
    { name: "Design", score: 92, trend: "➖", risk: "Optimal" }
  ]
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
  { id: "dashboard", label: "Tableau de bord", icon: "⊡" },
  { id: "dashboard-projet", label: "Dashboard Projet", icon: "📊" },
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
