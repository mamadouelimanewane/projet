import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import useStore from './store/useStore';

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
import SentimentTeam from './components/modules/SentimentTeam';
import ExcelIntegration from './components/modules/ExcelIntegration';
import GenieCivilElite from './components/modules/GenieCivilElite';
import DashboardProjet from './components/modules/DashboardProjet';
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
import ProjectSelector, { ProjectProvider, useProject } from './components/modules/ProjectSelector';
import DashboardProjetIsolé from './components/modules/DashboardProjetIsolé';
import { MODULES } from "./data/constants";

// Wrapper pour injecter les données filtrées dans les modules
const FilteredModule = ({ Component, dataKey, extraProps = {} }) => {
  const { projectData } = useProject();
  const { updateData } = useStore();
  const update = (key) => (val) => updateData(key, val);
  
  const moduleData = dataKey ? projectData[dataKey] : projectData;
  return <Component data={moduleData} setData={dataKey ? update(dataKey) : undefined} {...extraProps} />;
};

export default function App() {
  const { 
    sidebarOpen, 
    toggleSidebar,
    isSyncing,
    lastSync,
    fetchData,
    syncData,
    data,
    setData,
    updateData,
    showApp,
    setShowApp
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  
  const location = useLocation();
  const navigate = useNavigate();
  const activeId = location.pathname.substring(1) || "dashboard";

  // Navigation handler
  const goTo = (id) => navigate(`/${id}`);

  // Enter app
  if (!showApp) {
    return <LandingPage onEnter={() => setShowApp(true)} />;
  }

  const update = (key) => (val) => updateData(key, val);

  return (
    <ProjectProvider>
      <div className="flex h-screen bg-slate-950 text-white overflow-hidden relative" style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}>
        {/* SIDEBAR */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 md:relative 
          ${sidebarOpen ? "w-64" : "w-14"} 
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex-shrink-0 bg-slate-900/98 backdrop-blur-xl border-r border-slate-800 
          flex flex-col transition-all duration-300 ease-in-out
        `}>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black">E</div>
               {sidebarOpen && (
                 <div className="overflow-hidden">
                   <p className="text-xs font-black text-white tracking-tight leading-none uppercase">Projet Élite</p>
                 </div>
               )}
            </div>
            <button onClick={toggleSidebar} className="hidden md:flex w-6 h-6 items-center justify-center text-slate-500 hover:text-white">
              {sidebarOpen ? "◀" : "▶"}
            </button>
            <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-500">✕</button>
          </div>
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {MODULES.map(m => (
              <button key={m.id} onClick={() => goTo(m.id)}
                className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left transition-all ${activeId === m.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}>
                <span className="text-base flex-shrink-0 w-5 text-center">{m.icon}</span>
                {sidebarOpen && <span className="text-xs font-semibold whitespace-nowrap overflow-hidden">{m.label}</span>}
              </button>
            ))}
          </nav>
          {sidebarOpen && (
            <div className="p-3 border-t border-slate-800">
              <div className="text-xs text-slate-600">● Système synchronisé</div>
            </div>
          )}
        </aside>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto">
          {/* TOP BAR */}
          <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-slate-400 bg-slate-900 rounded-lg border border-slate-800">☰</button>
              <div className="hidden sm:block">
                <h1 className="text-sm font-black text-white">{MODULES.find(m => m.id === activeId)?.label || "Module"}</h1>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Site: Chantiers Afrique de l'Ouest</p>
                  <span className="text-[9px] bg-indigo-600/20 text-indigo-400 px-1.5 py-0.5 rounded font-black border border-indigo-500/30">V1.2 NEW</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
               <ProjectSelector />
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
                 {isSyncing ? "⌛" : "☁"} <span className="hidden sm:inline">Sync</span>
               </button>
               <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="text-emerald-500 animate-pulse">●</span> <span className="hidden xs:inline">Direct</span>
              </div>
            </div>
          </div>
          
          {/* ROUTES CONTENT */}
          <div className="p-4 md:p-8 max-w-[100vw] overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<FilteredModule Component={Dashboard} />} />
              <Route path="/dashboard-projet" element={<DashboardProjetIsolé />} />
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
              <Route path="/sentiment" element={<FilteredModule Component={SentimentTeam} dataKey="sentiment" />} />
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
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </ProjectProvider>
  );
}
