import { lazy } from 'react';

// ── Gestion de Projet (Core) ──────────────────────────────────────────────────
export const Dashboard = lazy(() => import('./components/modules/Dashboard'));
export const DashboardProjetIsole = lazy(() => import('./components/modules/DashboardProjetIsole'));
export const SuiviSimple = lazy(() => import('./components/modules/SuiviSimple'));
export const MultiProjets = lazy(() => import('./components/modules/MultiProjets'));
export const Taches = lazy(() => import('./components/modules/Taches'));
export const Couts = lazy(() => import('./components/modules/Couts'));
export const Jalons = lazy(() => import('./components/modules/Jalons'));
export const Problemes = lazy(() => import('./components/modules/Problemes'));
export const Risques = lazy(() => import('./components/modules/Risques'));
export const Delais = lazy(() => import('./components/modules/Delais'));
export const KPI = lazy(() => import('./components/modules/KPI'));
export const Budget = lazy(() => import('./components/modules/Budget'));
export const Ressources = lazy(() => import('./components/modules/Ressources'));
export const CycleVie = lazy(() => import('./components/modules/CycleVie'));

// ── Planification & Agilité ───────────────────────────────────────────────────
export const Agile = lazy(() => import('./components/modules/Agile'));
export const Kanban = lazy(() => import('./components/modules/Kanban'));
export const Gantt = lazy(() => import('./components/modules/Gantt'));
export const SAFe = lazy(() => import('./components/modules/SAFe'));
export const Methodologies = lazy(() => import('./components/modules/Methodologies'));
export const CalendrierCentral = lazy(() => import('./components/modules/CalendrierCentral'));

// ── Intelligence Artificielle & Prédiction ────────────────────────────────────
export const AssistantElite = lazy(() => import('./components/modules/AssistantElite'));
export const AssistantIA = lazy(() => import('./components/modules/AssistantIA'));
export const CopilotePredictif = lazy(() => import('./components/modules/CopilotePredictif'));
export const MentorIA = lazy(() => import('./components/modules/MentorIA'));
export const PredictionsML = lazy(() => import('./components/modules/PredictionsML'));
export const RedTeamAI = lazy(() => import('./components/modules/RedTeamAI'));
export const NeuralMap = lazy(() => import('./components/modules/NeuralMap'));
export const GenerationIA = lazy(() => import('./components/modules/GenerationIA'));

// ── Simulation & Analyse ─────────────────────────────────────────────────────
export const Simulateur = lazy(() => import('./components/modules/Simulateur'));
export const SimulateurMonteCarlo = lazy(() => import('./components/modules/SimulateurMonteCarlo'));
export const SimulationCrise = lazy(() => import('./components/modules/SimulationCrise'));
export const EVM = lazy(() => import('./components/modules/EVM'));
export const AnalyseValeur = lazy(() => import('./components/modules/AnalyseValeur'));

// ── Finance & Budget ──────────────────────────────────────────────────────────
export const Facturation = lazy(() => import('./components/modules/Facturation'));
export const PortfolioFinancier = lazy(() => import('./components/modules/PortfolioFinancier'));
export const SmartContracts = lazy(() => import('./components/modules/SmartContracts'));

// ── Documents & Collaboration ─────────────────────────────────────────────────
export const FeuillesTemps = lazy(() => import('./components/modules/FeuillesTemps'));
export const DocumentsGED = lazy(() => import('./components/modules/DocumentsGED'));
export const ChatTempsReel = lazy(() => import('./components/modules/ChatTempsReel'));
export const ExportRapports = lazy(() => import('./components/modules/ExportRapports'));
export const RapportsAutomatiques = lazy(() => import('./components/modules/RapportsAutomatiques'));
export const Notifications = lazy(() => import('./components/modules/Notifications'));

// ── Workflows & Automatisation ────────────────────────────────────────────────
export const Workflows = lazy(() => import('./components/modules/Workflows'));
export const AutomatisationsNoCode = lazy(() => import('./components/modules/AutomatisationsNoCode'));
export const DemandesModeles = lazy(() => import('./components/modules/DemandesModeles'));
export const IntegrationsWebhooks = lazy(() => import('./components/modules/IntegrationsWebhooks'));

// ── Gouvernance & Conformité ──────────────────────────────────────────────────
export const QualiteConformite = lazy(() => import('./components/modules/QualiteConformite'));
export const ESGScorecard = lazy(() => import('./components/modules/ESGScorecard'));
export const EthiqueIA = lazy(() => import('./components/modules/EthiqueIA'));
export const ProprieteIntellectuelle = lazy(() => import('./components/modules/ProprieteIntellectuelle'));
export const GreenPMO = lazy(() => import('./components/modules/GreenPMO'));
export const StrategieOKR = lazy(() => import('./components/modules/StrategieOKR'));

// ── Sécurité & Utilisateurs ──────────────────────────────────────────────────
export const Securite2FA = lazy(() => import('./components/modules/Securite2FA'));
export const GestionUtilisateurs = lazy(() => import('./components/modules/GestionUtilisateurs'));

// ── Outils & Paramètres ──────────────────────────────────────────────────────
export const OutilsExpert = lazy(() => import('./components/modules/OutilsExpert'));
export const ExcelIntegration = lazy(() => import('./components/modules/ExcelIntegration'));
export const ThemesPersonnalisation = lazy(() => import('./components/modules/ThemesPersonnalisation'));
export const SauvegardeExport = lazy(() => import('./components/modules/SauvegardeExport'));
export const EditeurProjet = lazy(() => import('./components/modules/EditeurProjet'));
export const ProjetWizard = lazy(() => import('./components/modules/ProjetWizard'));
export const GuideInteractif = lazy(() => import('./components/modules/GuideInteractif'));
export const PortailClient = lazy(() => import('./components/modules/PortailClient'));
export const Gamification = lazy(() => import('./components/modules/Gamification'));
export const OnboardingIntelligent = lazy(() => import('./components/modules/OnboardingIntelligent'));
export const KPIsPersonnalisables = lazy(() => import('./components/modules/KPIsPersonnalisables'));
export const AnalyticsAvances = lazy(() => import('./components/modules/AnalyticsAvances'));
export const EliteInnovation = lazy(() => import('./components/modules/EliteInnovation'));
export const TalentMarketplace = lazy(() => import('./components/modules/TalentMarketplace'));
export const JumeauNumerique = lazy(() => import('./components/modules/JumeauNumerique'));
export const ModuleArchitectElite = lazy(() => import('./components/modules/ModuleArchitectElite'));

// ── Modules Sectoriels ───────────────────────────────────────────────────────
export const GenieCivilElite = lazy(() => import('./components/modules/GenieCivilElite'));
export const IndustrieElite = lazy(() => import('./components/modules/IndustrieElite'));
export const EnergyElite = lazy(() => import('./components/modules/EnergyElite'));
export const GovTechElite = lazy(() => import('./components/modules/GovTechElite'));
export const SmartCityElite = lazy(() => import('./components/modules/SmartCityElite'));
export const StrategicWarRoom = lazy(() => import('./components/modules/StrategicWarRoom'));
export const RefineryElite = lazy(() => import('./components/modules/RefineryElite'));
export const FinTechElite = lazy(() => import('./components/modules/FinTechElite'));

// ── Pages Spéciales ──────────────────────────────────────────────────────────
export const LandingPage = lazy(() => import('./components/modules/LandingPage'));
export const CategoryHub = lazy(() => import('./components/modules/CategoryHub'));

