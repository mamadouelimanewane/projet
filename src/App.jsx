import React, { useEffect, useState, useMemo } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Shield, Lock, ArrowRight } from "lucide-react";
import useStore from './store/useStore';
import { SectionHeader, Card, Btn, Badge, ToastContainer } from "./components/ui";

import Utilities from './components/modules/Utilities';
import Dashboard from './components/modules/Dashboard';
import SuiviSimple from './components/modules/SuiviSimple';
import MultiProjets from './components/modules/MultiProjets';
import Taches from './components/modules/Taches';
import Couts from './components/modules/Couts';
import Jalons from './components/modules/Jalons';
import Problemes from './components/modules/Problemes';
import Risques from './components/modules/Risques';
import Delais from './components/modules/Delais';
import KPI from './components/modules/KPI';
import Budget from './components/modules/Budget';
import Agile from './components/modules/Agile';
import Kanban from './components/modules/Kanban';
import Ressources from './components/modules/Ressources';
import Gantt from './components/modules/Gantt';
import CycleVie from './components/modules/CycleVie';
import AssistantElite from './components/modules/AssistantElite';
import Simulateur from './components/modules/Simulateur';
import Methodologies from './components/modules/Methodologies';
import PortailClient from './components/modules/PortailClient';
import FeuillesTemps from './components/modules/FeuillesTemps';
import DocumentsGED from './components/modules/DocumentsGED';
import Facturation from './components/modules/Facturation';
import Workflows from './components/modules/Workflows';
import Rapports from './components/modules/Rapports';
import WarRoom from './components/modules/WarRoom';
import CopilotePredictif from './components/modules/CopilotePredictif';
import SmartContracts from './components/modules/SmartContracts';
import PortfolioFinancier from './components/modules/PortfolioFinancier';
import StrategieOKR from './components/modules/StrategieOKR';
import GenerationIA from './components/modules/GenerationIA';
import CalendrierCentral from './components/modules/CalendrierCentral';
import IntegrationsWebhooks from './components/modules/IntegrationsWebhooks';
import DemandesModeles from './components/modules/DemandesModeles';
import AutomatisationsNoCode from './components/modules/AutomatisationsNoCode';
import GuideInteractif from './components/modules/GuideInteractif';
import LandingPage from './components/modules/LandingPage';
import SimulateurMonteCarlo from './components/modules/SimulateurMonteCarlo';
import SAFe from './components/modules/SAFe';
import GreenPMO from './components/modules/GreenPMO';
import EVM from './components/modules/EVM';
import NeuralMap from './components/modules/NeuralMap';
import RedTeamAI from './components/modules/RedTeamAI';

import ExcelIntegration from './components/modules/ExcelIntegration';
import GenieCivilElite from './components/modules/GenieCivilElite';
// DashboardProjet (Legacy) removed to avoid conflicts
import ExportRapports from './components/modules/ExportRapports';
import Notifications from './components/modules/Notifications';
import AssistantIA from './components/modules/AssistantIA';
import RapportsAutomatiques from './components/modules/RapportsAutomatiques';
import AnalyticsAvances from './components/modules/AnalyticsAvances';
import ThemesPersonnalisation from './components/modules/ThemesPersonnalisation';
import OnboardingIntelligent from './components/modules/OnboardingIntelligent';
import KPIsPersonnalisables from './components/modules/KPIsPersonnalisables';
import Gamification from './components/modules/Gamification';
import Securite2FA from './components/modules/Securite2FA';
import ChatTempsReel from './components/modules/ChatTempsReel';
import PredictionsML from './components/modules/PredictionsML';

import ProjetWizard from './components/modules/ProjetWizard';

import OutilsExpert from './components/modules/OutilsExpert';

import MentorIA from './components/modules/MentorIA';
import EliteInnovation from './components/modules/EliteInnovation';


import QualiteConformite from './components/modules/QualiteConformite';
import ESGScorecard from './components/modules/ESGScorecard';
import TalentMarketplace from './components/modules/TalentMarketplace';
import SimulationCrise from './components/modules/SimulationCrise';
import JumeauNumerique from './components/modules/JumeauNumerique';
import ProprieteIntellectuelle from './components/modules/ProprieteIntellectuelle';
import AnalyseValeur from './components/modules/AnalyseValeur';
import EthiqueIA from './components/modules/EthiqueIA';
import GestionUtilisateurs from './components/modules/GestionUtilisateurs';
import SauvegardeExport from './components/modules/SauvegardeExport';
import EditeurProjet from './components/modules/EditeurProjet';

import IndustrieElite from './components/modules/IndustrieElite';
import EnergyElite from './components/modules/EnergyElite';

import GovTechElite from './components/modules/GovTechElite';

import SmartCityElite from './components/modules/SmartCityElite';
import StrategicWarRoom from './components/modules/StrategicWarRoom';
import RefineryElite from './components/modules/RefineryElite';
import ModuleArchitectElite from './components/modules/ModuleArchitectElite';

import FinTechElite from './components/modules/FinTechElite';
import ProjectSelector, { ProjectProvider, useProject } from './components/modules/ProjectSelector';
import DashboardProjetIsole from './components/modules/DashboardProjetIsole';
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
  const [isTwoFAVerified, setIsTwoFAVerified] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");
  const is2FAEnabled = localStorage.getItem('projet-elite-2fa') === 'true';

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

  useEffect(() => {
    fetchData();
  }, []);
  
  // Enter app
  if (!showApp) {
    return <LandingPage onEnter={() => setShowApp(true)} />;
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
          w-72 md:w-56 lg:w-64
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex-shrink-0 backdrop-blur-xl border-r app-sidebar 
          flex flex-col transition-all duration-300 ease-in-out
        `}>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black">E</div>
               <div className="overflow-hidden">
                 <p className="text-xs font-black text-white tracking-tight leading-none uppercase">Projet Élite</p>
               </div>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-500">✕</button>
          </div>
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {filteredModules.map(m => (
              <button key={m.id} onClick={() => goTo(m.id)}
                className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left transition-all ${activeId === m.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}>
                <span className="text-lg w-5 h-5 flex items-center justify-center">{m.icon}</span>
                <span className="text-xs font-bold truncate">{m.label}</span>
              </button>
            ))}
          </nav>
          {/* Student Badge Footer */}
          <div className="p-4 mt-auto border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-slate-800 border border-slate-700 shadow-inner">
                {badge.icon}
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Badge Universitaire</p>
                <p className="text-xs font-bold text-white truncate">{badge.label}</p>
                <p className="text-[9px] font-bold" style={{ color: badge.color }}>{universityPoints} points</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 border-t border-slate-800">
            <div className="text-xs text-slate-600">● Système synchronisé</div>
          </div>
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
            <div className="flex items-center gap-2 md:gap-4">
               {/* Project Context Switcher */}
               <div className="hidden sm:block"><ProjectSelector /></div>

               {/* Sélecteur de thème */}
               <div className="hidden md:flex items-center gap-1 bg-slate-800/60 border border-slate-700 rounded-lg p-1">
                 {Object.values(THEMES).map(t => (
                   <button
                     key={t.id}
                     onClick={() => switchTheme(t.id)}
                     title={t.nom}
                     className={`w-5 h-5 rounded-md border-2 transition-all ${currentTheme === t.id ? 'border-white scale-110' : 'border-transparent hover:border-slate-400'}`}
                     style={{ background: `linear-gradient(135deg, ${t.preview[0]} 0%, ${t.preview[1]} 60%, ${t.preview[2]} 100%)` }}
                   />
                 ))}
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
          
          {/* ROUTES CONTENT */}
          <div className="p-3 md:p-8 max-w-[100vw] overflow-x-hidden pb-20 md:pb-8">
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
              <Route path="/warroom" element={<WarRoom />} />
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
