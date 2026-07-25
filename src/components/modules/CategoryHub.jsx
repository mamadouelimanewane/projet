import React, { useState, useMemo } from 'react';
import { MODULES } from '../../data/constants';
import { 
  Search, ArrowRight, LayoutDashboard, Rocket, Calendar, 
  TrendingUp, Brain, Shield, FileText, Cpu, CheckCircle2, 
  Building2, Settings, ArrowLeft, Sparkles, Layers
} from 'lucide-react';

const CATEGORY_META = {
  "Dashboards": {
    icon: LayoutDashboard,
    badge: "Supervision",
    gradient: "from-blue-600 via-indigo-600 to-violet-600",
    shadow: "shadow-blue-500/20",
    border: "border-blue-500/30",
    desc: "Vues d'ensemble synthétiques, KPIs consolidés et tableaux de bord analytiques multi-projets."
  },
  "Création & Gestion Principale": {
    icon: Rocket,
    badge: "Projets & Setup",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    shadow: "shadow-indigo-500/20",
    border: "border-indigo-500/30",
    desc: "Initialisation guidée (Wizard), création de projets, édition globale et suivi simple."
  },
  "Planification & Exécution": {
    icon: Calendar,
    badge: "Planning & Agilité",
    gradient: "from-violet-600 via-fuchsia-600 to-purple-600",
    shadow: "shadow-violet-500/20",
    border: "border-violet-500/30",
    desc: "Moteurs Kanban, diagrammes de Gantt interactifs, gestion des Sprints et planning master."
  },
  "Suivi, Finance & Risques": {
    icon: TrendingUp,
    badge: "Performance & Contrôle",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    shadow: "shadow-emerald-500/20",
    border: "border-emerald-500/30",
    desc: "Maîtrise des coûts, suivi budgétaire, valeur acquise (EVM), risques et gestion des problèmes."
  },
  "Intelligence & IA": {
    icon: Brain,
    badge: "IA & Prédictions",
    gradient: "from-fuchsia-600 via-pink-600 to-rose-600",
    shadow: "shadow-fuchsia-500/20",
    border: "border-fuchsia-500/30",
    desc: "Inférence prédictive, assistant conversationnel, mentor IA, cartographie neurale et Red Team."
  },
  "Outils Avancés & Modèles": {
    icon: Cpu,
    badge: "Ingénierie & Simu",
    gradient: "from-amber-500 via-orange-600 to-red-600",
    shadow: "shadow-amber-500/20",
    border: "border-amber-500/30",
    desc: "Simulations Monte-Carlo, analyse de valeur, Black Swan, Jumeau Numérique (BIM) et outils CPM/RACI."
  },
  "Collaboration & Documents": {
    icon: FileText,
    badge: "Communication",
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
    shadow: "shadow-cyan-500/20",
    border: "border-cyan-500/30",
    desc: "Gestion documentaire GED, feuilles de temps, facturation, workflows collaboratifs et rapports."
  },
  "Automatisation & Webhooks": {
    icon: Sparkles,
    badge: "No-Code & API",
    gradient: "from-purple-600 via-indigo-600 to-blue-600",
    shadow: "shadow-purple-500/20",
    border: "border-purple-500/30",
    desc: "Automatisations sans code, intégrations Webhooks API, connecteur Excel et demandes d'intake."
  },
  "Gouvernance, ESG & Conformité": {
    icon: Shield,
    badge: "RSE & Normes",
    gradient: "from-emerald-500 via-green-600 to-teal-700",
    shadow: "shadow-emerald-500/20",
    border: "border-emerald-500/30",
    desc: "Bilan carbone ESG, gouvernance éthique IA, conformité ISO, OKRs et protection de propriété intellectuelle."
  },
  "Secteurs d'Activité": {
    icon: Building2,
    badge: "Métiers Spécialisés",
    gradient: "from-sky-600 via-blue-700 to-indigo-800",
    shadow: "shadow-sky-500/20",
    border: "border-sky-500/30",
    desc: "Modules métiers : Génie Civil, Industrie 4.0, Énergie, GovTech, Smart City, Raffinerie & FinTech."
  },
  "Système & Autre": {
    icon: Settings,
    badge: "Administration",
    gradient: "from-slate-600 via-slate-700 to-slate-900",
    shadow: "shadow-slate-500/20",
    border: "border-slate-500/30",
    desc: "Guide de démarrage, sauvegardes intégrales, architecte de modules et laboratoire d'innovation."
  }
};

export default function CategoryHub({ onSelectModule, onGoToDashboard, onBackToLanding }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Extraire les catégories et leurs modules depuis la constante MODULES
  const categories = useMemo(() => {
    const list = [];
    let currentCat = null;

    MODULES.forEach(item => {
      if (item.isHeader) {
        currentCat = {
          title: item.label,
          modules: []
        };
        list.push(currentCat);
      } else if (currentCat) {
        currentCat.modules.push(item);
      }
    });

    return list;
  }, []);

  // Filtrer les catégories et modules selon la recherche et le filtre sélectionné
  const filteredCategories = useMemo(() => {
    return categories.map(cat => {
      const matchCatTitle = cat.title.toLowerCase().includes(searchTerm.toLowerCase());
      const filteredMods = cat.modules.filter(m => 
        m.label.toLowerCase().includes(searchTerm.toLowerCase()) || matchCatTitle
      );

      return {
        ...cat,
        modules: filteredMods
      };
    }).filter(cat => cat.modules.length > 0);
  }, [categories, searchTerm]);

  const totalModulesCount = useMemo(() => {
    return categories.reduce((acc, cat) => acc + cat.modules.length, 0);
  }, [categories]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Background Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-fuchsia-600/15 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 left-1/3 w-[35rem] h-[35rem] bg-emerald-600/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      {/* Header Bar */}
      <header className="relative z-20 sticky top-0 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 md:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/30">
                É
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                  PROJET <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">ÉLITE</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    HUB v3.0
                  </span>
                </h1>
                <p className="text-xs text-slate-400">Sélecteur Central des Pôles d'Excellence</p>
              </div>
            </div>

            {onBackToLanding && (
              <button 
                onClick={onBackToLanding}
                className="md:hidden text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Accueil
              </button>
            )}
          </div>

          {/* Quick Nav Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-800 text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Page de Garde
              </button>
            )}

            <button
              onClick={() => onGoToDashboard && onGoToDashboard()}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Accéder au App & Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Hero Section Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4 backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Architecture Modulaire · {totalModulesCount} Modules Élite</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            Explorez les <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400">Pôles Stratégiques</span>
          </h2>

          <p className="text-sm md:text-base text-slate-400 font-normal leading-relaxed">
            Sélectionnez une catégorie ci-dessous pour ouvrir directement le module ou l'outil de votre choix au sein de l'espace de travail.
          </p>

          {/* Search Box */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un pôle ou un module (ex: Gantt, Monte-Carlo, Budget, ESG)..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 rounded-2xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xl transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 text-xs font-semibold text-slate-500 hover:text-white"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCategories.map((cat, idx) => {
            const meta = CATEGORY_META[cat.title] || {
              icon: Layers,
              badge: "Pôle",
              gradient: "from-indigo-600 to-purple-600",
              shadow: "shadow-indigo-500/20",
              border: "border-indigo-500/30",
              desc: "Suite d'outils et de modules intégrés."
            };

            const IconComponent = meta.icon;
            const firstModuleId = cat.modules[0]?.id || "dashboard";

            return (
              <div
                key={idx}
                className={`group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:${meta.border} rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${meta.shadow}`}
              >
                {/* Subtle Gradient Accent Bar at Top */}
                <div className={`absolute top-0 left-8 right-8 h-1 bg-gradient-to-r ${meta.gradient} rounded-b-full opacity-60 group-hover:opacity-100 transition-opacity`} />

                {/* Box Header */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-white shadow-md shadow-indigo-500/10 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                          {meta.badge}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors leading-snug">
                          {cat.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/50">
                      {cat.modules.length} {cat.modules.length > 1 ? 'modules' : 'module'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-5 font-normal">
                    {meta.desc}
                  </p>

                  {/* Modules Chips / Interactive List inside Box */}
                  <div className="space-y-1.5 mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Modules inclus dans ce pôle :</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                      {cat.modules.map((mod) => (
                        <button
                          key={mod.id}
                          onClick={() => onSelectModule(mod.id)}
                          className="group/chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-indigo-600/20 border border-slate-700/60 hover:border-indigo-500/50 text-slate-300 hover:text-white text-xs font-medium transition-all text-left"
                        >
                          <span className="text-sm">{mod.icon}</span>
                          <span>{mod.label}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/chip:opacity-100 group-hover/chip:translate-x-0 transition-all text-indigo-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Box Footer Action Button */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400">
                    Ouvrir ce pôle
                  </span>

                  <button
                    onClick={() => onSelectModule(firstModuleId)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-gradient-to-r hover:${meta.gradient} text-white text-xs font-bold transition-all shadow-md group-hover:scale-105`}
                  >
                    <span>Explorer le Pôle</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Aucun pôle ni module trouvé</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto mb-4">
              Aucun résultat pour "{searchTerm}". Essayez de modifier vos termes de recherche.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl"
            >
              Réinitialiser la recherche
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 py-6 text-center text-xs text-slate-400">
        <p>© 2026 Système d'Information Stratégique Projet Élite · Tous droits réservés</p>
      </footer>
    </div>
  );
}
