const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Replace imports
const importStart = content.indexOf('import Utilities');
const importEnd = content.indexOf('import ProjectSelector') - 1;

const newImports = `import React, { Suspense, useEffect, useState, useMemo } from 'react';
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
  LandingPage
} from './routes';
`;

content = content.replace(
  'import React, { useEffect, useState, useMemo } from "react";',
  ''
);

content = content.substring(0, importStart) + newImports + content.substring(importEnd);

// Wrap Routes with Suspense
content = content.replace(
  '<Routes>',
  '<Suspense fallback={<div className="p-8 text-center text-slate-500 animate-pulse">Chargement du module...</div>}>\n              <Routes>'
);
content = content.replace(
  '</Routes>',
  '</Routes>\n            </Suspense>'
);

// Remove duplicate warroom route
content = content.replace(
  '              <Route path="/warroom" element={<WarRoom />} />\n',
  ''
);

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx updated');
