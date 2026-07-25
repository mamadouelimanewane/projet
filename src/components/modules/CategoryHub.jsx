import React, { useState, useMemo } from 'react';
import useStore from '../../store/useStore';
import { 
  Search, ArrowRight, LayoutDashboard, Rocket, Calendar, 
  TrendingUp, Brain, Shield, FileText, Cpu, CheckCircle2, 
  Building2, Settings, ArrowLeft, Sparkles, Layers, Zap, Plus, FolderKanban, CheckCircle
} from 'lucide-react';
import { applyTheme, getStoredTheme, THEMES } from '../../lib/themeManager';

// Structure complète des catégories et modules avec descriptions et badges NDUGUMi style
const NDUGUMI_CATEGORIES = [
  {
    title: "Création & Gestion Principale",
    icon: "🎯",
    badge: "4 module(s)",
    modules: [
      {
        id: "nouveau-projet",
        icon: "⚡",
        title: "Pocket Wizard (5s)",
        desc: "Mode assistant ultra-rapide pour saisir et créer un projet en 5 secondes.",
        isNew: true
      },
      {
        id: "multiprojets",
        icon: "◈",
        title: "Multi-Projets",
        desc: "Vue d'ensemble et pilotage simultané de l'ensemble du portefeuille.",
        isNew: false
      },
      {
        id: "editeur",
        icon: "✏️",
        title: "Éditeur de Projet Complet",
        desc: "Configuration avancée des paramètres, équipes et livrables.",
        isNew: false
      },
      {
        id: "suivi",
        icon: "✓",
        title: "Suivi Simple",
        desc: "Tracking synthétique de l'avancement et des actions prioritaires.",
        isNew: false
      }
    ]
  },
  {
    title: "Planification & Exécution",
    icon: "📅",
    badge: "8 module(s)",
    modules: [
      {
        id: "taches",
        icon: "⊞",
        title: "Gestion des Tâches",
        desc: "Affectation fine des activités, responsables et niveaux de priorité.",
        isNew: false
      },
      {
        id: "kanban",
        icon: "▦",
        title: "Pipeline Kanban",
        desc: "Vue visuelle par étapes de conversion et colonnes d'avancement.",
        isNew: false
      },
      {
        id: "gantt",
        icon: "▬",
        title: "Gantt Interactif",
        desc: "Planning temporel dynamique avec jalons et chemin critique.",
        isNew: false
      },
      {
        id: "agile",
        icon: "↻",
        title: "Agile Sprint Master",
        desc: "Gestion des sprints itératifs, backlog produit et vélocité.",
        isNew: true
      },
      {
        id: "jalons",
        icon: "◆",
        title: "Jalons & Échéances",
        desc: "Suivi des dates clés, points d'étape et livrables majeurs.",
        isNew: false
      },
      {
        id: "delais",
        icon: "⏱",
        title: "Délais & Chantiers",
        desc: "Contrôle des retards, alertes critiques et planning prévisionnel.",
        isNew: false
      },
      {
        id: "calendrier",
        icon: "📅",
        title: "Planning Master Central",
        desc: "Calendrier global unifié des événements et livrables.",
        isNew: false
      },
      {
        id: "ressources",
        icon: "⚙",
        title: "Gestion des Ressources",
        desc: "Allocation optimale des équipes, charges de travail et matériel.",
        isNew: false
      }
    ]
  },
  {
    title: "Finances, Rentabilité & Crédit Project",
    icon: "💰",
    badge: "7 module(s)",
    modules: [
      {
        id: "evm",
        icon: "🧮",
        title: "Calculateur EVM (Valeur Acquise)",
        desc: "Mesure instantanée des indices de performance coût (CPI) et délai (SPI).",
        isNew: true
      },
      {
        id: "budget",
        icon: "Σ",
        title: "Budget Prevu vs Réel",
        desc: "Allocation des enveloppes financières et maîtrise du reste à dépenser.",
        isNew: false
      },
      {
        id: "couts",
        icon: "FCFA",
        title: "Coûts & Postes Dépenses",
        desc: "Détail analytique des coûts par phase, catégorie et prestataire.",
        isNew: false
      },
      {
        id: "portfolio",
        icon: "📈",
        title: "Portfolio Financier",
        desc: "Tableau de bord financier global et rentabilité des investissements.",
        isNew: true
      },
      {
        id: "factures",
        icon: "💳",
        title: "Facturation & Impayés",
        desc: "Suivi des devis, factures d'acompte, relances et factures PDF.",
        isNew: true
      },
      {
        id: "problemes",
        icon: "⚠",
        title: "Registre des Problèmes",
        desc: "Centralisation des anomalies, blocages terrain et résolutions.",
        isNew: false
      },
      {
        id: "risques",
        icon: "⛨",
        title: "Matrice des Risques",
        desc: "Évaluation gravité/probabilité et plans d'atténuation préventifs.",
        isNew: false
      }
    ]
  },
  {
    title: "IA, Automatisations & Alertes Prédictives",
    icon: "🤖",
    badge: "7 module(s)",
    modules: [
      {
        id: "assistant",
        icon: "✧",
        title: "Assistance IA Générative",
        desc: "Assistant conversationnel disponible 24/7 pour vos questions projets.",
        isNew: false
      },
      {
        id: "copilote",
        icon: "🧠",
        title: "Copilote Prédictif",
        desc: "Détection anticipée des anomalies et conseils d'optimisation.",
        isNew: false
      },
      {
        id: "mentor-ia",
        icon: "🤖",
        title: "Mentor IA Strategique",
        desc: "Coaching décisionnel sur-mesure pour chefs de projets et direction.",
        isNew: true
      },
      {
        id: "montecarlo",
        icon: "🎲",
        title: "Simulateur Monte-Carlo (1000 iter)",
        desc: "Prédiction des dérives budgétaires par simulation probabiliste.",
        isNew: true
      },
      {
        id: "redteam",
        icon: "🔮",
        title: "Red Team AI (Stress-Test)",
        desc: "Audit contradictoire et simulation d'attaques ou crises graves.",
        isNew: true
      },
      {
        id: "neuralmap",
        icon: "🕸",
        title: "Carte Neurale Portefeuille",
        desc: "Graphe 2D/3D interactif des dépendances inter-projets.",
        isNew: false
      },
      {
        id: "editeur-ia",
        icon: "🪄",
        title: "Elite Module Architect",
        desc: "Génération automatique et adaptation No-Code de nouveaux modules.",
        isNew: true
      }
    ]
  },
  {
    title: "Simulation, Ingénierie & Modèles Metiers",
    icon: "🔬",
    badge: "9 module(s)",
    modules: [
      {
        id: "digitaltwin",
        icon: "🧊",
        title: "Jumeau Numérique (Digital Twin)",
        desc: "Visualisation 3D BIM des infrastructures et capteurs IoT terrain.",
        isNew: true
      },
      {
        id: "geniecivil",
        icon: "🏗️",
        title: "Génie Civil & BTP Élite",
        desc: "Gestion des stocks ciment/acier, sécurité et contenu local.",
        isNew: true
      },
      {
        id: "blackswan",
        icon: "🔮",
        title: "Module Black Swan",
        desc: "Stress-tests de résilience face aux événements extrêmes imprévus.",
        isNew: true
      },
      {
        id: "valeur",
        icon: "⚖️",
        title: "Analyse de la Valeur",
        desc: "Démonstration du ROI et optimisation des ratios coût/performance.",
        isNew: true
      },
      {
        id: "outils-expert",
        icon: "🔬",
        title: "Outils Expert (CPM/RACI)",
        desc: "Calcul du chemin critique CPM, matrices RACI et méthodes d'analyse.",
        isNew: false
      },
      {
        id: "methodologies",
        icon: "⚙",
        title: "Méthodologies Hybrides",
        desc: "Référentiels Waterfall, Agile, PRINCE2 et gouvernance sur-mesure.",
        isNew: false
      },
      {
        id: "safe",
        icon: "🚂",
        title: "Agilité SAFe (Trains)",
        desc: "Cadre d'alignement agile à grande échelle pour grands comptes.",
        isNew: false
      },
      {
        id: "simulation",
        icon: "⚖",
        title: "Simulateur d'Impact",
        desc: "Bac à sable de modélisation du risque sur variations d'hypothèses.",
        isNew: false
      },
      {
        id: "innovation-lab",
        icon: "💎",
        title: "Elite Innovation Lab",
        desc: "Espace d'expérimentation et prototypes d'excellence.",
        isNew: true
      }
    ]
  },
  {
    title: "Collaboration, Documents & Reporting",
    icon: "💬",
    badge: "7 module(s)",
    modules: [
      {
        id: "temps",
        icon: "⌛",
        title: "Feuilles de Temps",
        desc: "Suivi rigoureux des heures passées par collaborateur et par projet.",
        isNew: false
      },
      {
        id: "docs",
        icon: "📄",
        title: "Documents & GED",
        desc: "Archivage sécurisé, fiches techniques, devis et plans modifiables.",
        isNew: false
      },
      {
        id: "workflows",
        icon: "⚡",
        title: "Workflows & Circuits",
        desc: "Automatisations d'approbations et circuits de validation internes.",
        isNew: false
      },
      {
        id: "rapports",
        icon: "📊",
        title: "Rapports Automatiques",
        desc: "Génération instantanée de comptes-rendus PDF et exports Excel.",
        isNew: false
      },
      {
        id: "warroom",
        icon: "🛡️",
        title: "Strategic War Room",
        desc: "Cockpit décisionnel haute sécurité pour le conseil d'administration.",
        isNew: true
      },
      {
        id: "smartcontracts",
        icon: "⛓",
        title: "Smart Contracts",
        desc: "Exécution automatique des clauses d'engagements contractuels.",
        isNew: true
      },
      {
        id: "portail",
        icon: "👤",
        title: "Portail Client Securisé",
        desc: "Espace de transparence partagé avec vos clients et investisseurs.",
        isNew: false
      }
    ]
  },
  {
    title: "Automatisation, Webhooks & APIs",
    icon: "⚡",
    badge: "4 module(s)",
    modules: [
      {
        id: "webhooks",
        icon: "🔗",
        title: "Intégrations Webhooks (API)",
        desc: "Configuration d'interconnexions REST et webhooks techniques.",
        isNew: false
      },
      {
        id: "intake",
        icon: "📥",
        title: "Demandes & Modèles",
        desc: "Formulaires de cadrage et qualification des opportunités.",
        isNew: false
      },
      {
        id: "automations",
        icon: "🤖",
        title: "Automatisations No-Code",
        desc: "Déclencheurs intelligents et règles métiers automatisées.",
        isNew: true
      },
      {
        id: "excel",
        icon: "📊",
        title: "Pont Excel Dual-Way",
        desc: "Importation et exportation à la volée vers fichiers Microsoft Excel.",
        isNew: true
      }
    ]
  },
  {
    title: "Gouvernance, ESG & Conformité Enterprise",
    icon: "🎓",
    badge: "8 module(s)",
    modules: [
      {
        id: "okr",
        icon: "🎯",
        title: "Stratégie OKR",
        desc: "Alignement des objectifs annuels et des Key Results d'équipe.",
        isNew: false
      },
      {
        id: "qualite",
        icon: "⛨",
        title: "Qualité & Conformité (ISO)",
        desc: "Suivi des audits qualité, normes ISO et non-conformités.",
        isNew: true
      },
      {
        id: "esg",
        icon: "🌱",
        title: "Dashboard ESG & RSE",
        desc: "Score sociétal, calcul de l'empreinte carbone et gouvernance.",
        isNew: true
      },
      {
        id: "greenpmo",
        icon: "🌱",
        title: "Bilan Carbone (Green PMO)",
        desc: "Indicateurs d'impact environnemental des opérations.",
        isNew: false
      },
      {
        id: "ethique",
        icon: "🛡️",
        title: "Gouvernance Éthique IA",
        desc: "Contrôle de la transparence, maîtrise des biais algorithmiques.",
        isNew: true
      },
      {
        id: "ipguard",
        icon: "⚖️",
        title: "Propriété Intellectuelle",
        desc: "Protection des brevets, marques et secrets de fabrication.",
        isNew: true
      },
      {
        id: "talent",
        icon: "👥",
        title: "Talent Marketplace",
        desc: "Matching des compétences internes et affectation d'experts.",
        isNew: false
      },
      {
        id: "users",
        icon: "👤",
        title: "Gestion Utilisateurs & RBAC",
        desc: "Attribution des rôles, permissions et droits d'accès granulaires.",
        isNew: false
      }
    ]
  },
  {
    title: "Secteurs d'Activité Spécialisés",
    icon: "🚛",
    badge: "7 module(s)",
    modules: [
      {
        id: "geniecivil",
        icon: "🏗",
        title: "Génie Civil Élite (BIM)",
        desc: "Modules dédiés à la construction lourde et aux travaux publics.",
        isNew: false
      },
      {
        id: "smartfactory",
        icon: "🏭",
        title: "Industrie 4.0 Elite",
        desc: "Pilotage des lignes d'assemblage et maintenance industrielle.",
        isNew: false
      },
      {
        id: "energynexus",
        icon: "⚡",
        title: "Énergie & Transition Elite",
        desc: "Gestion des projets solaires, éoliens et réseaux haute tension.",
        isNew: false
      },
      {
        id: "govtech",
        icon: "🏛️",
        title: "Gouvernance & Projets État",
        desc: "Projets de modernisation administrative et souveraineté nationale.",
        isNew: false
      },
      {
        id: "smartcity",
        icon: "🏙️",
        title: "Smart City & Aménagement",
        desc: "Développement urbain, mobilité durable et villes intelligentes.",
        isNew: false
      },
      {
        id: "refinery",
        icon: "🛢️",
        title: "Raffinerie & Oil & Gas",
        desc: "Projets pétroliers, gaziers et infrastructures industrielles.",
        isNew: false
      },
      {
        id: "fintech",
        icon: "🏦",
        title: "FinTech Elite Command",
        desc: "Systèmes de paiement bancaires et conformité réglementaire.",
        isNew: false
      }
    ]
  },
  {
    title: "Rapports, Audit & Système",
    icon: "🛠️",
    badge: "3 module(s)",
    modules: [
      {
        id: "guide",
        icon: "🧭",
        title: "Guide Débutant & Académie",
        desc: "Tutoriel guidé, fiches d'orientation et lexique du système.",
        isNew: false
      },
      {
        id: "backup",
        icon: "📂",
        title: "Sauvegarde & Journal d'Audit",
        desc: "Exportation intégrale, traçabilité des modifications et sauvegardes.",
        isNew: false
      },
      {
        id: "cycle",
        icon: "⎔",
        title: "Cycle de Vie des Projets",
        desc: "Suivi chronologique des 5 phases de maturité d'un projet.",
        isNew: false
      }
    ]
  }
];

export default function CategoryHub({ onSelectModule, onGoToDashboard, onBackToLanding }) {
  const { data } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [currentTheme, setCurrentTheme] = useState(getStoredTheme);
  const switchTheme = (themeId) => {
    applyTheme(themeId);
    setCurrentTheme(themeId);
  };

  // Statistiques calculées dynamiquement
  const stats = useMemo(() => {
    const totalProjects = data.projets?.length || 235;
    const inProgressProjects = data.taches?.filter(t => t.statut === 'En cours').length || 45;
    const completedProjects = data.taches?.filter(t => t.statut === 'Terminé').length || 180;
    const totalModules = NDUGUMI_CATEGORIES.reduce((acc, c) => acc + c.modules.length, 0);

    return {
      totalProjects,
      inProgressProjects,
      completedProjects,
      totalModules
    };
  }, [data]);

  // Filtrer les catégories selon la recherche
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return NDUGUMI_CATEGORIES;

    const term = searchTerm.toLowerCase();
    return NDUGUMI_CATEGORIES.map(cat => {
      const matchCatTitle = cat.title.toLowerCase().includes(term);
      const matchingModules = cat.modules.filter(m => 
        m.title.toLowerCase().includes(term) || 
        m.desc.toLowerCase().includes(term) ||
        matchCatTitle
      );

      return {
        ...cat,
        modules: matchingModules
      };
    }).filter(cat => cat.modules.length > 0);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* HEADER PRINCIPAL TYPE NDUGUMi RESTAU */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                PLATEFORME INTÉGRALE B2B — PROJET ÉLITE 3.0
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                CRM & Operating System Stratégique Enterprise
              </h1>
              <p className="text-slate-400 text-xs md:text-sm max-w-3xl mt-2 leading-relaxed font-normal">
                De la planification initiale aux prédictions IA, suivez vos projets, gérez vos budgets, automatisez vos approvisionnements et optimisez la rentabilité de vos opérations.
              </p>
            </div>

            {/* CTA BOUTONS NDUGUMi */}
            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-end">
              {/* Sélecteur de thème */}
              <div className="hidden md:flex items-center gap-1 bg-slate-800/60 border border-slate-700 rounded-lg p-1 mr-2">
                {Object.values(THEMES).map(t => (
                  <button
                    key={t.id}
                    onClick={() => switchTheme(t.id)}
                    title={t.nom}
                    className={`w-6 h-6 rounded-md border-2 transition-all ${currentTheme === t.id ? 'border-white scale-110' : 'border-transparent hover:border-slate-400'}`}
                    style={{ background: `linear-gradient(135deg, ${t.preview[0]} 0%, ${t.preview[1]} 60%, ${t.preview[2]} 100%)` }}
                  />
                ))}
              </div>
              <button
                onClick={() => onSelectModule('nouveau-projet')}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
              >
                <span>⚡</span>
                <span>Pocket Wizard (5s)</span>
              </button>

              <button
                onClick={() => onGoToDashboard && onGoToDashboard()}
                className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
              >
                <span>📊</span>
                <span>Voir le Dashboard Global</span>
              </button>

              {onBackToLanding && (
                <button
                  onClick={onBackToLanding}
                  className="flex items-center gap-1.5 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 text-xs font-semibold transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Accueil</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* BANNIÈRE DE STATISTIQUES / METRIQUES (4 CARTES) */}
      <section className="bg-slate-900/60 border-b border-slate-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-center md:text-left hover:border-indigo-500/30 transition-colors">
              <div className="text-3xl font-black text-white tracking-tight mb-1">
                {stats.totalProjects}
              </div>
              <div className="text-xs text-slate-400 font-medium">Projets répertoriés</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-center md:text-left hover:border-amber-500/30 transition-colors">
              <div className="text-3xl font-black text-amber-400 tracking-tight mb-1">
                {stats.inProgressProjects}
              </div>
              <div className="text-xs text-slate-400 font-medium">En cours d'exécution</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-center md:text-left hover:border-emerald-500/30 transition-colors">
              <div className="text-3xl font-black text-emerald-400 tracking-tight mb-1">
                {stats.completedProjects}
              </div>
              <div className="text-xs text-slate-400 font-medium">Projets signés & livrés</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-center md:text-left hover:border-indigo-500/30 transition-colors">
              <div className="text-3xl font-black text-indigo-400 tracking-tight mb-1">
                {stats.totalModules}
              </div>
              <div className="text-xs text-slate-400 font-medium">Modules Élite actifs</div>
            </div>
          </div>
        </div>
      </section>

      {/* RECHERCHE ACCÉLÉRÉE */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un module, une fonction ou un pôle d'activité..."
            className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none transition-all shadow-inner"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="absolute right-4 top-3 text-xs font-semibold text-slate-500 hover:text-white"
            >
              Effacer
            </button>
          )}
        </div>
      </section>

      {/* GRILLE DES GRANDS PÔLES (EXACTEMENT STYLE NDUGUMi RESTAU) */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
            >
              <div>
                {/* EN-TÊTE DU PÔLE */}
                <div className="flex items-start justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <h2 className="text-base font-bold text-white leading-tight">
                      {cat.title}
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {cat.badge}
                  </span>
                </div>

                {/* LISTE DES MODULES AVEC SUBTITLES ET BADGE NOUVEAU */}
                <div className="space-y-4">
                  {cat.modules.map((mod) => (
                    <div
                      key={mod.id}
                      onClick={() => onSelectModule(mod.id)}
                      className="group p-3 rounded-xl bg-slate-950/60 hover:bg-indigo-950/40 border border-slate-800/60 hover:border-indigo-500/40 cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          {mod.icon}
                        </span>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            {mod.isNew && (
                              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-500/30 px-1.5 py-0.5 rounded">
                                NOUVEAU
                              </span>
                            )}
                            <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                              {mod.title}
                            </h3>
                          </div>

                          <p className="text-[11px] text-slate-400 font-normal leading-normal">
                            {mod.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTION ACCÉDER */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-end">
                <button
                  onClick={() => onSelectModule(cat.modules[0]?.id || 'dashboard')}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group/btn"
                >
                  <span>Ouvrir la section</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm mb-3">Aucun pôle ou module ne correspond à "{searchTerm}".</p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}
      </main>

      {/* FOOTER NDUGUMi STYLE */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500 bg-slate-950">
        <p>© 2026 PROJET ÉLITE 3.0 · Platforme Intégrale Enterprise Operating System</p>
      </footer>
    </div>
  );
}
