import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
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
import { MODULES } from "./data/constants";

export default function App() {
  const { 
    data, 
    setData, 
    updateData, 
    showApp, 
    setShowApp, 
    sidebarOpen, 
    toggleSidebar 
  } = useStore();
  
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
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden" style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}>
      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? "w-56" : "w-14"} flex-shrink-0 bg-slate-900/95 border-r border-slate-800 flex flex-col transition-all duration-300 ease-in-out z-20`}>
        <div className="p-3 border-b border-slate-800 flex items-center gap-3">
          <button onClick={toggleSidebar} className="w-8 h-8 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 flex items-center justify-center text-indigo-400 transition-all flex-shrink-0">
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
        <div className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur border-b border-slate-800 px-6 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-sm font-black text-white">{MODULES.find(m => m.id === activeId)?.label || "Module"}</h1>
            <p className="text-xs text-slate-500">Gestion de Projet Élite · {new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
              <span style={{ color: "#10b981" }}>●</span> En direct
            </div>
          </div>
        </div>
        
        {/* ROUTES CONTENT */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard data={data} />} />
            <Route path="/suivi" element={<SuiviSimple data={data.suivi} setData={update("suivi")} />} />
            <Route path="/multiprojets" element={<MultiProjets data={data.projets} setData={update("projets")} />} />
            <Route path="/taches" element={<Taches data={data.taches} setData={update("taches")} projets={data.projets} />} />
            <Route path="/couts" element={<Couts data={data.couts} setData={update("couts")} />} />
            <Route path="/jalons" element={<Jalons data={data.jalons} setData={update("jalons")} />} />
            <Route path="/problemes" element={<Problemes data={data.problemes} setData={update("problemes")} />} />
            <Route path="/risques" element={<Risques data={data.risques} setData={update("risques")} />} />
            <Route path="/delais" element={<Delais data={data.delais} setData={update("delais")} />} />
            <Route path="/kpi" element={<KPI data={data.kpis} setData={update("kpis")} />} />
            <Route path="/budget" element={<Budget data={data.budget} setData={update("budget")} />} />
            <Route path="/agile" element={<Agile data={data.sprints} setData={update("sprints")} />} />
            <Route path="/kanban" element={<Kanban data={data.kanban} setData={update("kanban")} />} />
            <Route path="/ressources" element={<Ressources data={data.ressources} setData={update("ressources")} />} />
            <Route path="/gantt" element={<Gantt data={data.gantt} setData={update("gantt")} />} />
            <Route path="/cycle" element={<CycleVie data={data.cycle} setData={update("cycle")} />} />
            <Route path="/assistant" element={<AssistantElite />} />
            <Route path="/simulation" element={<Simulateur data={data} />} />
            <Route path="/methodologies" element={<Methodologies data={data} setData={setData} />} />
            <Route path="/portail" element={<PortailClient data={data} />} />
            <Route path="/temps" element={<FeuillesTemps data={data.temps} setData={update("temps")} />} />
            <Route path="/docs" element={<DocumentsGED data={data.documents} setData={update("documents")} />} />
            <Route path="/factures" element={<Facturation data={data.factures} setData={update("factures")} />} />
            <Route path="/workflows" element={<Workflows data={data.workflows} setData={update("workflows")} />} />
            <Route path="/rapports" element={<GenerationIA />} />
            <Route path="/warroom" element={<WarRoom />} />
            <Route path="/copilote" element={<CopilotePredictif data={data} />} />
            <Route path="/smartcontracts" element={<SmartContracts data={data.smartcontracts} />} />
            <Route path="/portfolio" element={<PortfolioFinancier data={data} />} />
            <Route path="/okr" element={<StrategieOKR data={data} />} />
            <Route path="/calendrier" element={<CalendrierCentral data={data} />} />
            <Route path="/webhooks" element={<IntegrationsWebhooks data={data.webhooks} setData={update("webhooks")} />} />
            <Route path="/intake" element={<DemandesModeles data={data.intake} setData={update("intake")} />} />
            <Route path="/automations" element={<AutomatisationsNoCode data={data.automations} setData={update("automations")} />} />
            <Route path="/montecarlo" element={<SimulateurMonteCarlo data={data} />} />
            <Route path="/safe" element={<SAFe data={data.safe} />} />
            <Route path="/greenpmo" element={<GreenPMO data={data.greenPmo} />} />
            <Route path="/evm" element={<EVM data={data.evm} />} />
            <Route path="/guide" element={<GuideInteractif />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
