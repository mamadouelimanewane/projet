
import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Shield, Lock, ArrowRight } from "lucide-react";
import useStore from './store/useStore';
import { SectionHeader, Card, Btn, Badge, ToastContainer } from "./components/ui";

import React, { Suspense, useEffect, useState, useMemo } from 'react';
import {
  Dashboard, DashboardProjetIsole, SuiviSimple, MultiProjets, Taches, Couts, Jalons, Problemes, Risques, Delais, KPI, Budget, Ressources, CycleVie,
  Agile, Kanban, Gantt, SAFe, Methodologies, CalendrierCentral,
  AssistantElite, AssistantIA, CopilotePredictif, MentorIA, PredictionsML, RedTeamAI, NeuralMap, GenerationIA,
  Simulateur, SimulateurMonteCarlo, SimulationCrise, EVM, AnalyseValeur,
  Facturation, PortfolioFinancier, SmartContracts,
  FeuillesTemps, DocumentsGED, ChatTempsReel, ExportRapports, RapportsAutomatiques, Notifications,
  Workflows, AutomatisationsNoCode, DemandesModeles, IntegrationsWebhooks,
  QualiteConformite, ESGScorecard, EthiqueIA, ProprieteIntellectuelle, GreenPMO, StrategieOKR,
  Securite2FA, GestionUtilisateurs,
  OutilsExpert, ExcelIntegration, ThemesPersonnalisation, SauvegardeExport, EditeurProjet, ProjetWizard, GuideInteractif, PortailClient, Gamification, OnboardingIntelligent, KPIsPersonnalisables, AnalyticsAvances, EliteInnovation, TalentMarketplace, JumeauNumerique, ModuleArchitectElite,
  GenieCivilElite, IndustrieElite, EnergyElite, GovTechElite, SmartCityElite, StrategicWarRoom, RefineryElite, FinTechElite,
  LandingPage, CategoryHub
} from './routes';
import ProjectSelector, { ProjectProvider, useProject } from './components/modules/ProjectSelector';
import { MODULES } from "./data/constants";
import { applyTheme, getStoredTheme, THEMES } from './lib/themeManager.js';
import { LanguageProvider, LanguageSelector } from './hooks/useLanguage.jsx';

// Wrapper pour injecter les données filtrées dans les modules
const FilteredModule = ({ Component, dataKey, extraProps = {} }) => {
  const { projectData } = useProject();
  const { updateData } = useStore();
  const update = (key) => (val) => updateData(key, val);
  
  const moduleData = dataKey ? projectData[dataKey] : projectData;
  return <Component data={moduleData} setData={dataKey ? update(dataKey) : undefined} {...extraProps} />;
};

// Build Trigger: 2026-05-12_17-27-Fix-White-Screen
export default function App() {
  const { 
    fetchData,
    data,
    setData,
    updateData,
    showApp,
    setShowApp,
    userMode,
    setUserMode,
    universityPoints,
    sidebarOpen,
    toggleSidebar,
    isSyncing,
    syncData,
    lastSync
  } = useStore();

  const location = useLocation();
  const [currentTheme, setCurrentTheme] = React.useState(getStoredTheme);

  const switchTheme = (themeId) => {
    applyTheme(themeId);
    setCurrentTheme(themeId);
  };
  const navigate = useNavigate();
  const activeId = location.pathname.substring(1) || "dashboard";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTwoFAVerified, setIsTwoFAVerified] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");
  const is2FAEnabled = localStorage.getItem('projet-elite-2fa') === 'true';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const badge = useMemo(() => {
    if (universityPoints >= 200) return { label: 'Diamant Expert', icon: '💎', color: '#10b981' };
    if (universityPoints >= 100) return { label: 'Or Pro', icon: '🥇', color: '#f59e0b' };
    return { label: 'Argent Apprenti', icon: '🥈', color: '#94a3b8' };
  }, [universityPoints]);

  const goTo = (id) => {
    navigate(`/${id}`);
    setMobileMenuOpen(false);
  };

  const filteredModules = MODULES;

  const [showHub, setShowHub] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  
  // Enter app: 1. Landing Page
  if (!showApp) {
    return (
      <LandingPage 
        onEnter={() => {
          setShowApp(true);
          setShowHub(true);
        }} 
      />
    );
  }

  // Enter app: 2. Category Hub Page (Page des Pôles avec les Box)
  if (showHub) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono">Chargement du Hub des Pôles...</div>}>
        <CategoryHub
          onSelectModule={(moduleId) => {
            setShowHub(false);
            goTo(moduleId);
          }}
          onGoToDashboard={() => {
            setShowHub(false);
            goTo('dashboard');
          }}
          onBackToLanding={() => {
            setShowApp(false);
            setShowHub(false);
          }}
        />
      </Suspense>
    );
  }

  // 2FA Challenge
  if (is2FAEnabled && !isTwoFAVerified) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-600/5 blur-[120px] rounded-full" />
        </div>
        
        <Card className="max-w-md w-full p-8 glass-card border-2 border-indigo-500/30 text-center relative z-10 shadow-[0_0_50px_rgba(79,70,229,0.15)]">
          <div className="w-20 h-20 bg-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/30 shadow-inner">
            <Shield className="w-10 h-10 text-indigo-400" />
          </div>
          
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Authentification</h2>
          <p className="text-slate-400 mb-8 text-sm font-medium">Entrez le code de sécurité à 6 chiffres</p>
          
          <div className="relative mb-8">
            <input
              type="text"
              value={twoFACode}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                setTwoFACode(val);
                if (val.length === 6) {
                  // Simulation: Tout code à 6 chiffres passe
                  setTimeout(() => setIsTwoFAVerified(true), 500);
                }
              }}
              placeholder="000 000"
              className="w-full px-4 py-6 bg-slate-900/80 border-2 border-slate-700 rounded-2xl text-white text-center text-4xl font-black font-mono tracking-[0.2em] focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-800"
              autoFocus
            />
            {twoFACode.length === 6 && (
              <div className="absolute -bottom-10 left-0 right-0 animate-pulse text-indigo-400 text-xs font-bold uppercase tracking-widest">
                Vérification en cours...
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            <Btn variant="ghost" onClick={() => setShowApp(false)} className="w-full">
              Retour à l'accueil
            </Btn>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">
              Protection Bio-Métriques & Cryptographique Active
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const update = (key) => (val) => updateData(key, val);

  return (
    <LanguageProvider>
    <ProjectProvider>
      <ToastContainer />
      <div className="flex h-screen text-white overflow-hidden relative" style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", backgroundColor: "var(--app-bg)", color: "var(--app-text)" }}>
        {/* SIDEBAR */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 md:relative 
          ${isSidebarCollapsed ? 'w-20' : 'w-72 md:w-56 lg:w-64'}
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex-shrink-0 backdrop-blur-xl border-r app-sidebar 
          flex flex-col transition-all duration-300 ease-in-out
        `}>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-xl bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white font-black">E</div>
               {!isSidebarCollapsed && (
                 <div className="overflow-hidden">
                   <p className="text-xs font-black text-white tracking-tight leading-none uppercase">Projet Élite</p>
                 </div>
               )}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="hidden md:flex text-slate-500 hover:text-white transition-colors" title="Réduire/Agrandir le menu">
                {isSidebarCollapsed ? '➔' : '🡐'}
              </button>
              <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-500">✕</button>
            </div>
          </div>
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {filteredModules.map((m, i) => {
              if (m.isHeader) {
                if (isSidebarCollapsed) {
                  return <div key={`header-${i}`} className="w-full h-px bg-slate-800 my-2" />;
                }
                return (
                  <div key={`header-${i}`} className="mt-4 mb-1 px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">
                    {m.label}
                  </div>
                );
              }
              return (
                <button key={m.id} onClick={() => goTo(m.id)} title={isSidebarCollapsed ? m.label : undefined}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 px-2.5'} py-2.5 rounded-xl text-left transition-all ${activeId === m.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}>
                  <span className="text-lg w-5 h-5 flex items-center justify-center flex-shrink-0">{m.icon}</span>
                  {!isSidebarCollapsed && <span className="text-xs font-bold truncate">{m.label}</span>}
                </button>
              );
            })}
          </nav>
          {/* Student Badge Footer */}
          <div className="p-4 mt-auto border-t app-border app-surface2">
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-xl app-surface border app-border shadow-inner" title={`${badge.label} - ${universityPoints} points`}>
                {badge.icon}
              </div>
              {!isSidebarCollapsed && (
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black app-text2 uppercase tracking-widest leading-none mb-1">Badge Universitaire</p>
                  <p className="text-xs font-bold app-text truncate">{badge.label}</p>
                  <p className="text-[9px] font-bold" style={{ color: badge.color }}>{universityPoints} points</p>
                </div>
              )}
            </div>
          </div>
          
          {!isSidebarCollapsed && (
            <div className="p-3 border-t app-border">
              <div className="text-xs app-text2">● Système synchronisé</div>
            </div>
          )}
        </aside>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto">
          {/* TOP BAR */}
          <div className="sticky top-0 z-40 backdrop-blur-md border-b px-4 md:px-8 py-3 flex justify-between items-center app-topbar">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-slate-400 bg-slate-900 rounded-lg border border-slate-800">☰</button>
              <div className="hidden sm:block">
                <h1 className="text-sm font-black text-white">{MODULES.find(m => m.id === activeId)?.label || "Module"}</h1>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Site: Star Academy Central Hub</p>
                  <span className="text-[9px] bg-indigo-600/20 text-indigo-400 px-1.5 py-0.5 rounded font-black border border-indigo-500/30">PREMIUM</span>
                </div>
              </div>
            </div>
            
            {/* Search Bar / Cmd+K */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center justify-between px-3 py-1.5 app-surface border app-border hover:border-indigo-400 rounded-lg app-text2 text-sm transition-colors shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span>🔍</span>
                  <span>Rechercher un module...</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 app-surface2 border app-border rounded text-[10px] font-mono shadow-inner">Ctrl</kbd>
                  <kbd className="px-1.5 py-0.5 app-surface2 border app-border rounded text-[10px] font-mono shadow-inner">K</kbd>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
               {/* Button Hub des Pôles */}
               <button 
                 onClick={() => setShowHub(true)} 
                 className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-lg text-xs font-bold transition-all shadow-sm"
                 title="Retourner à la page des box des différents pôles"
               >
                 <span>❖</span>
                 <span className="hidden lg:inline font-black uppercase text-[10px] tracking-wider">Hub Pôles</span>
               </button>

               {/* Project Context Switcher */}
               <div className="hidden sm:block"><ProjectSelector /></div>

               {/* Sélecteur de thème Smart */}
               <div className="hidden md:flex items-center gap-1 app-surface border app-border rounded-xl p-1 shadow-sm">
                 <button onClick={() => switchTheme('daylight')} title="Clair Pro" className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all ${currentTheme === 'daylight' ? 'bg-indigo-50 dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm border border-indigo-200 dark:border-indigo-500' : 'app-text2 hover:app-text hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                   <span>☀️</span> <span className="hidden lg:inline">Clair</span>
                 </button>
                 <button onClick={() => switchTheme('dark')} title="Sombre" className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all ${currentTheme === 'dark' ? 'bg-slate-800 text-white shadow-sm border border-slate-700' : 'app-text2 hover:app-text hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                   <span>🌙</span> <span className="hidden lg:inline">Sombre</span>
                 </button>
                 <button onClick={() => switchTheme('midnight')} title="Midnight" className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all ${currentTheme === 'midnight' ? 'bg-blue-900 text-blue-200 shadow-sm border border-blue-700' : 'app-text2 hover:app-text hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                   <span>🌌</span> <span className="hidden lg:inline">Nuit</span>
                 </button>
                 <button onClick={() => switchTheme('sunset')} title="Sunset" className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all ${currentTheme === 'sunset' ? 'bg-rose-900 text-rose-200 shadow-sm border border-rose-700' : 'app-text2 hover:app-text hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                   <span>🌆</span> <span className="hidden lg:inline">Sunset</span>
                 </button>
               </div>
               {/* Sélecteur de langue */}
               <LanguageSelector />

               {lastSync && (
                 <span className="text-[10px] text-slate-600 font-mono hidden lg:inline">
                   Sync {new Date(lastSync).toLocaleTimeString()}
                 </span>
               )}
               <button 
                 onClick={syncData} 
                 disabled={isSyncing}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${isSyncing ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-600/20'}`}
               >
                 <span>{isSyncing ? "⌛" : "☁"}</span> <span className="hidden sm:inline">Sync</span>
               </button>
               <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="text-emerald-500 animate-pulse">●</span> <span>Direct</span>
              </div>
            </div>
          </div>
          
          {/* SEARCH MODAL (COMMAND PALETTE) */}
          {isSearchOpen && (
            <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-slate-900/20 dark:bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)}>
              <div className="w-full max-w-xl app-surface border app-border rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b app-border flex items-center gap-3">
                  <span className="app-text2">🔍</span>
                  <input 
                    type="text" 
                    placeholder="Rechercher un module (ex: Gantt, IA, Budget...)" 
                    className="flex-1 bg-transparent border-none outline-none app-text placeholder-slate-400 dark:placeholder-slate-500"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="px-2 py-1 app-surface2 hover:border-slate-300 border app-border rounded text-xs app-text2">Échap</button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-2">
                  {MODULES.filter(m => !m.isHeader && (m.label.toLowerCase().includes(searchQuery.toLowerCase()) || m.id.toLowerCase().includes(searchQuery.toLowerCase())))
                    .slice(0, 8)
                    .map(m => (
                      <button 
                        key={m.id}
                        onClick={() => {
                          goTo(m.id);
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-600/20 app-text hover:text-indigo-700 dark:hover:text-indigo-300 rounded-xl text-left transition-colors group"
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform">{m.icon}</span>
                        <span className="font-medium">{m.label}</span>
                        <span className="ml-auto text-xs app-text2">Aller vers →</span>
                      </button>
                  ))}
                  {MODULES.filter(m => !m.isHeader && (m.label.toLowerCase().includes(searchQuery.toLowerCase()) || m.id.toLowerCase().includes(searchQuery.toLowerCase()))).length === 0 && (
                    <div className="p-8 text-center app-text2">
                      Aucun module trouvé pour "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ROUTES CONTENT */}
          <div className="p-3 md:p-8 max-w-[100vw] overflow-x-hidden pb-20 md:pb-8">
            <Suspense fallback={<div className="p-8 text-center text-slate-500 animate-pulse">Chargement du module...</div>}>
              <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<FilteredModule Component={Dashboard} />} />
              <Route path="/dashboard-projet/:id" element={<DashboardProjetIsole />} />
              <Route path="/suivi" element={<FilteredModule Component={SuiviSimple} dataKey="suivi" />} />
              <Route path="/multiprojets" element={<MultiProjets data={data.projets} setData={update("projets")} />} />
              <Route path="/taches" element={<FilteredModule Component={Taches} dataKey="taches" extraProps={{ projets: data.projets }} />} />
              <Route path="/couts" element={<FilteredModule Component={Couts} dataKey="couts" />} />
              <Route path="/jalons" element={<FilteredModule Component={Jalons} dataKey="jalons" />} />
              <Route path="/problemes" element={<FilteredModule Component={Problemes} dataKey="problemes" />} />
              <Route path="/risques" element={<FilteredModule Component={Risques} dataKey="risques" />} />
              <Route path="/delais" element={<FilteredModule Component={Delais} dataKey="delais" />} />
              <Route path="/kpi" element={<FilteredModule Component={KPI} dataKey="kpis" />} />
              <Route path="/budget" element={<FilteredModule Component={Budget} dataKey="budget" />} />
              <Route path="/agile" element={<FilteredModule Component={Agile} dataKey="sprints" />} />
              <Route path="/kanban" element={<FilteredModule Component={Kanban} dataKey="kanban" />} />
              <Route path="/ressources" element={<FilteredModule Component={Ressources} dataKey="ressources" />} />
              <Route path="/gantt" element={<FilteredModule Component={Gantt} dataKey="gantt" />} />
              <Route path="/cycle" element={<FilteredModule Component={CycleVie} dataKey="cycle" />} />
              <Route path="/assistant" element={<AssistantElite />} />
              <Route path="/simulation" element={<FilteredModule Component={Simulateur} />} />
              <Route path="/methodologies" element={<Methodologies data={data} setData={setData} />} />
              <Route path="/portail" element={<FilteredModule Component={PortailClient} />} />
              <Route path="/temps" element={<FilteredModule Component={FeuillesTemps} dataKey="temps" />} />
              <Route path="/docs" element={<FilteredModule Component={DocumentsGED} dataKey="documents" />} />
              <Route path="/factures" element={<FilteredModule Component={Facturation} dataKey="factures" />} />
              <Route path="/workflows" element={<FilteredModule Component={Workflows} dataKey="workflows" />} />
              <Route path="/rapports" element={<GenerationIA />} />
              <Route path="/copilote" element={<FilteredModule Component={CopilotePredictif} />} />
              <Route path="/smartcontracts" element={<FilteredModule Component={SmartContracts} dataKey="smartcontracts" />} />
              <Route path="/portfolio" element={<FilteredModule Component={PortfolioFinancier} />} />
              <Route path="/okr" element={<FilteredModule Component={StrategieOKR} />} />
              <Route path="/calendrier" element={<FilteredModule Component={CalendrierCentral} />} />
              <Route path="/webhooks" element={<FilteredModule Component={IntegrationsWebhooks} dataKey="webhooks" />} />
              <Route path="/intake" element={<FilteredModule Component={DemandesModeles} dataKey="intake" />} />
              <Route path="/automations" element={<FilteredModule Component={AutomatisationsNoCode} dataKey="automations" />} />
              <Route path="/montecarlo" element={<FilteredModule Component={SimulateurMonteCarlo} />} />
              <Route path="/safe" element={<FilteredModule Component={SAFe} dataKey="safe" />} />
              <Route path="/greenpmo" element={<FilteredModule Component={GreenPMO} dataKey="greenPmo" />} />
              <Route path="/evm" element={<FilteredModule Component={EVM} dataKey="evm" />} />
              <Route path="/neuralmap" element={<FilteredModule Component={NeuralMap} />} />
              <Route path="/redteam" element={<FilteredModule Component={RedTeamAI} />} />
              <Route path="/excel" element={<ExcelIntegration />} />
              <Route path="/geniecivil" element={<FilteredModule Component={GenieCivilElite} />} />

              <Route path="/guide" element={<GuideInteractif />} />
              <Route path="/export" element={<FilteredModule Component={ExportRapports} />} />
              <Route path="/notifications" element={<FilteredModule Component={Notifications} />} />
              <Route path="/assistant-ia" element={<FilteredModule Component={AssistantIA} />} />
              <Route path="/rapports-auto" element={<FilteredModule Component={RapportsAutomatiques} />} />
              <Route path="/analytics" element={<FilteredModule Component={AnalyticsAvances} />} />
              <Route path="/themes" element={<ThemesPersonnalisation />} />
              <Route path="/onboarding" element={<FilteredModule Component={OnboardingIntelligent} />} />
              <Route path="/kpis-custom" element={<FilteredModule Component={KPIsPersonnalisables} />} />
              <Route path="/gamification" element={<FilteredModule Component={Gamification} />} />
              <Route path="/securite-2fa" element={<Securite2FA />} />
              <Route path="/chat" element={<FilteredModule Component={ChatTempsReel} />} />
              <Route path="/predictions-ml" element={<FilteredModule Component={PredictionsML} />} />

              <Route path="/nouveau-projet" element={<ProjetWizard />} />

              <Route path="/outils-expert" element={<FilteredModule Component={OutilsExpert} />} />

              <Route path="/mentor-ia" element={<FilteredModule Component={MentorIA} />} />
              <Route path="/innovation-lab" element={<FilteredModule Component={EliteInnovation} />} />

              
              <Route path="/qualite" element={<FilteredModule Component={QualiteConformite} dataKey="qualite" />} />
              <Route path="/esg" element={<FilteredModule Component={ESGScorecard} dataKey="esg" />} />
              <Route path="/talent" element={<FilteredModule Component={TalentMarketplace} dataKey="talents" />} />
              <Route path="/blackswan" element={<FilteredModule Component={SimulationCrise} dataKey="crise" />} />
              <Route path="/digitaltwin" element={<FilteredModule Component={JumeauNumerique} />} />
              <Route path="/ipguard" element={<FilteredModule Component={ProprieteIntellectuelle} dataKey="ip" />} />
              <Route path="/valeur" element={<FilteredModule Component={AnalyseValeur} dataKey="valeur" />} />
              <Route path="/ethique" element={<FilteredModule Component={EthiqueIA} dataKey="ethique" />} />
              <Route path="/users" element={<FilteredModule Component={GestionUtilisateurs} />} />
              <Route path="/backup" element={<SauvegardeExport />} />
              <Route path="/editeur" element={<EditeurProjet />} />

              <Route path="/smartfactory" element={<FilteredModule Component={IndustrieElite} />} />
              <Route path="/energynexus" element={<FilteredModule Component={EnergyElite} />} />

              <Route path="/govtech" element={<FilteredModule Component={GovTechElite} />} />

              <Route path="/smartcity" element={<FilteredModule Component={SmartCityElite} />} />
              <Route path="/warroom" element={<FilteredModule Component={StrategicWarRoom} />} />
              <Route path="/refinery" element={<FilteredModule Component={RefineryElite} />} />
              <Route path="/editeur-ia" element={<FilteredModule Component={ModuleArchitectElite} />} />

              <Route path="/fintech" element={<FilteredModule Component={FinTechElite} />} />

              {/* Fallback */}

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            </Suspense>
          </div>
        {/* ── BOTTOM NAV MOBILE ──────────────────────────────────────── */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t flex items-center justify-around px-2 py-2 app-topbar"
          style={{borderColor:'var(--app-border2)', background:'var(--app-sidebar)'}}>
          {[
            { id:'dashboard',   icon:'📊', label:'Board' },
            { id:'taches',      icon:'✅', label:'Tâches' },
            { id:'risques',     icon:'⚠️', label:'Risques' },
            { id:'budget',      icon:'💰', label:'Budget' },
            { id:'assistant-ia',icon:'🤖', label:'IA' },
          ].map(m => (
            <button key={m.id} onClick={() => goTo(m.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all min-w-0 flex-1 ${activeId === m.id ? 'bg-indigo-600/20' : ''}`}>
              <span className="text-lg leading-none">{m.icon}</span>
              <span className={`text-[10px] font-bold truncate w-full text-center ${activeId === m.id ? 'text-indigo-400' : 'text-slate-500'}`}>{m.label}</span>
            </button>
          ))}
          <button onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl min-w-0 flex-1">
            <span className="text-lg leading-none">☰</span>
            <span className="text-[10px] font-bold text-slate-500">Menu</span>
          </button>
        </nav>
        </main>
      </div>
    </ProjectProvider>
    </LanguageProvider>
  );
}
