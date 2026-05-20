export const INITIAL_DATA = {
  suivi: [],
  projets: [
    { 
      id: "star-academy", 
      nom: "Star Academy", 
      chef: "Mamadou Elimané Wane", 
      statut: "En cours", 
      avancement: 35, 
      budget: 150000000, 
      budgetReel: 45000000, 
      debut: "2026-01-01", 
      fin: "2026-12-31",
      description: "Plateforme de gestion des talents et de la formation Élite."
    }
  ],
  taches: [
    { id: 1, projet: "Star Academy", titre: "Initiation du projet (étude préalable)", responsable: "M. Diallo", statut: "Terminé", priorite: "Haute" },
    { id: 2, projet: "Star Academy", titre: "Étude technique et financière", responsable: "A. Ndiaye", statut: "Terminé", priorite: "Critique" },
    { id: 3, projet: "Star Academy", titre: "Construction du bâtiment (Génie Civil)", responsable: "BTP Elite", statut: "En cours", priorite: "Haute" },
    { id: 4, projet: "Star Academy", titre: "Développement de modules de formation", responsable: "E-Learning Team", statut: "Planifié", priorite: "Moyenne" },
    { id: 5, projet: "Star Academy", titre: "Recrutement des formateurs", responsable: "RH", statut: "Planifié", priorite: "Haute" },
    { id: 6, projet: "Star Academy", titre: "Recrutement des apprenants", responsable: "Com", statut: "À venir", priorite: "Moyenne" }
  ],
  couts: [
    { phase: "Études", prevu: 15000000, reel: 14500000 },
    { phase: "Construction", prevu: 90000000, reel: 30000000 },
    { phase: "Formation & RH", prevu: 45000000, reel: 500000 }
  ],
  jalons: [
    { id: 1, projet: "Star Academy", titre: "Livraison Gros Œuvre", date: "2026-08-15", statut: "Planifié" },
    { id: 2, projet: "Star Academy", titre: "Ouverture des inscriptions", date: "2026-10-01", statut: "Planifié" }
  ],
  problemes: [],
  risques: [
    { id: 1, projet: "Star Academy", risque: "Retard approvisionnement ciment", gravite: 4, probabilite: 3, statut: "Actif", attenuation: "Diversifier les fournisseurs" }
  ],
  delais: [],
  kpis: [
    { id: 1, label: "Avancement Bâtiment", valeur: "45%", tendance: "+10%", statut: "Normal" },
    { id: 2, label: "Études validées", valeur: "100%", tendance: "stable", statut: "Fait" }
  ],
  budget: [
    { categorie: "Génie Civil", planifie: 90000000, reel: 30000000 },
    { categorie: "Études", planifie: 15000000, reel: 14500000 },
    { categorie: "Marketing & RH", planifie: 45000000, reel: 500000 }
  ],
  sprints: [],
  kanban: {
    backlog: ["Recrutement apprenants", "Audit final"],
    enCours: ["Construction du bâtiment", "Recrutement formateurs"],
    enRevue: ["Étude tech et fin"],
    termine: ["Initiation du projet"]
  },
  ressources: [],
  gantt: [],
  cycle: [
    { id: "init", phase: "Initiation", statut: "Fait", progression: 100, livrable: "Étude préalable", description: "Étude de faisabilité terminée." },
    { id: "plan", phase: "Planification", statut: "Fait", progression: 100, livrable: "Plan Tech & Fin", description: "Plans et budgets validés." },
    { id: "exec", phase: "Exécution", statut: "En cours", progression: 35, livrable: "Construction & Formation", description: "Chantier en cours et recrutement lancé." },
    { id: "monit", phase: "Monitoring", statut: "A venir", progression: 0, livrable: "Rapports", description: "Contrôle qualité." },
    { id: "close", phase: "Clôture", statut: "A venir", progression: 0, livrable: "Bilan", description: "Archivage." }
  ],
  temps: [],
  documents: [
    { id: 1, nom: "Plan Architectural Star Academy", categorie: "Technique", projet: "Star Academy" },
    { id: 2, nom: "Devis Quantitatif BTP", categorie: "Financier", projet: "Star Academy" },
    { id: 3, nom: "Planning Gros Œuvre", categorie: "Planning", projet: "Star Academy" }
  ],
  factures: [],
  workflows: [],
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
    materiaux: [
      { nom: "Ciment", stock: 500, unite: "Sacs", alerte: 100 },
      { nom: "Acier", stock: 12, unite: "Tonnes", alerte: 2 }
    ],
    securite: { incidents: 0, joursSansAccident: 124, tauxFrequence: 0 },
    impact: { emploiLocal: 85, pmeLocales: 4, scoreESG: 78 },
    typologies: {
      batiment: {
        projet: "Star Academy",
        avancementTCE: [
          { corps: "Gros Œuvre", progress: 65, color: "#6366f1" },
          { corps: "Électricité", progress: 20, color: "#f59e0b" },
          { corps: "Plomberie", progress: 10, color: "#10b981" },
          { corps: "Finitions", progress: 0, color: "#94a3b8" }
        ],
        unites: 1,
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
  sentiment: [],
  qualite: { 
    conformite: 94.2, 
    nonConformites: 3, 
    audits: [
      { id: 1, titre: "Audit Sécurité Q1", date: "2026-03-01", statut: "Terminé", score: 95 },
      { id: 2, titre: "Revue Processus RH", date: "2026-04-15", statut: "En cours", score: null }
    ] 
  },
  esg: { 
    carbone: 112, 
    socialScore: 88, 
    gouvernance: 92,
    details: { emploiLocal: 85, mixite: 42, transparence: 98 }
  },
  talents: { 
    skills: ["React", "Agile", "BIM", "Risk Management", "Blockchain"],
    matching: [
      { id: 1, nom: "Mamadou W.", match: 98 },
      { id: 2, nom: "Awa N.", match: 92 }
    ]
  },
  crise: { scenarios: ["Black Swan", "Cyber", "Supply"], stressLevel: 14 },
  ip: { 
    brevets: [{ id: 1, titre: "Moteur de Prédiction ML", statut: "Validé" }], 
    secrets: [{ id: 1, titre: "Algorithme Monte Carlo", protection: "Chiffré" }],
    marques: [{ id: 1, titre: "Sceau de Diamant", statut: "Déposé" }]
  },
  valeur: { ratio: 1.45, optimisations: ["Réduction structure (-15%)", "Hausse design (+10%)"] },
  ethique: { biais: 0.01, transparence: 99, equite: 97 }
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

  { id: "safe", label: "Agilité SAFe (Trains)", icon: "🚂" },
  { id: "greenpmo", label: "Bilan Carbone (ESG)", icon: "🌱" },
  { id: "evm", label: "Valeur Acquise (EVM)", icon: "🧮" },
  { id: "guide", label: "Guide Débutant", icon: "🧭" },

  { id: "nouveau-projet", label: "✚ Nouveau Projet (Wizard)", icon: "🚀" },

  { id: "outils-expert", label: "Outils Expert (CPM/RACI)", icon: "🔬" },

  { id: "mentor-ia", label: "🤖 Mentor IA (Coaching)", icon: "🧠" },
  { id: "innovation-lab", label: "💎 Elite Innovation Lab", icon: "✨" },

  { id: "qualite", label: "🛡️ Qualité & Conformité (ISO)", icon: "⛨" },
  { id: "esg", label: "🌍 Dashboard ESG & RSE", icon: "🌱" },
  { id: "talent", label: "🧠 Talent Marketplace", icon: "👥" },
  { id: "blackswan", label: "🔮 Module Black Swan", icon: "🌪️" },
  { id: "digitaltwin", label: "🏗️ Jumeau Numérique (Twin)", icon: "🧊" },
  { id: "ipguard", label: "🏛️ Propriété Intellectuelle", icon: "⚖️" },
  { id: "valeur", label: "⚖️ Analyse de la Valeur", icon: "💎" },
  { id: "ethique", label: "🤖 Gouvernance & Éthique IA", icon: "🛡️" },
  { id: "users", label: "👤 Gestion Utilisateurs & RBAC", icon: "👥" },
  { id: "backup", label: "💾 Sauvegarde & Export Intégral", icon: "📂" },
  { id: "editeur", label: "✏️ Éditeur de Projet Complet", icon: "🛠️" },

  { id: "smartfactory", label: "🏭 Industrie 4.0 Elite", icon: "🤖" },
  { id: "energynexus", label: "⚡ Énergie Elite", icon: "🔋" },

  { id: "govtech", label: "🏛️ Gouvernance & État", icon: "⚖️" },

  { id: "smartcity", label: "🏙️ Smart City & Urbain", icon: "🏢" },
  { id: "warroom", label: "🛡️ Strategic War Room", icon: "🧠" },
  { id: "refinery", label: "🛢️ Raffinerie & Oil & Gas", icon: "🔥" },
  { id: "editeur-ia", label: "🪄 Elite Module Architect", icon: "✨" },

  { id: "fintech", label: "💰 FinTech Elite Command", icon: "🏦" },
];
