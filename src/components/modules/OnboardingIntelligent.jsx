import React, { useState, useEffect } from "react";
import { GraduationCap, CheckCircle, ArrowRight, ArrowLeft, X, Lightbulb, BookOpen, Target, Award } from "lucide-react";
import { SectionHeader, Card, Btn } from "../ui";

const OnboardingIntelligent = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('projet-elite-onboarding');
    return saved ? JSON.parse(saved) : [];
  });
  const [showTips, setShowTips] = useState(true);

  const steps = [
    {
      id: "welcome",
      title: "Bienvenue dans Projet Élite ! 🎉",
      description: "La plateforme de gestion de projet la plus avancée",
      icon: GraduationCap,
      content: `Vous allez découvrir comment :
      
📊 Gérer vos projets efficacement
👥 Collaborer avec votre équipe
📈 Suivre les performances en temps réel
🤖 Utiliser l'assistant IA
📤 Exporter des rapports professionnels`,
      action: "Découvrir les fonctionnalités"
    },
    {
      id: "dashboard",
      title: "Dashboard - Votre Centre de Contrôle",
      description: "Vue d'ensemble de tous vos projets",
      icon: Target,
      content: `Le dashboard vous montre :

✅ KPIs principaux (avancement, budget, risques)
✅ Graphiques de performance
✅ Liste de tous les projets
✅ Alertes et notifications
✅ Accès rapide à toutes les fonctionnalités

💡 Astuce : Cliquez sur un projet pour voir son dashboard détaillé !`,
      action: "Explorer le Dashboard"
    },
    {
      id: "multi-projets",
      title: "Multi-Projets - Gestion de Portefeuille",
      description: "Gérez plusieurs projets simultanément",
      icon: BookOpen,
      content: `Dans Multi-Projets, vous pouvez :

📋 Voir tous vos projets en un coup d'œil
📊 Comparer les avancements
💰 Analyser les budgets
⚠️ Identifier les projets à risque
📈 Filtrer et trier les projets

💡 Astuce : Utilisez les filtres pour trouver rapidement un projet !`,
      action: "Gérer mes Projets"
    },
    {
      id: "taches",
      title: "Gestion des Tâches",
      description: "Organisez et suivez toutes les tâches",
      icon: CheckCircle,
      content: `Module Tâches - Fonctionnalités :

✅ Créer et assigner des tâches
📅 Définir dates et priorités
🔄 Suivre l'avancement
👥 Collaborer avec l'équipe
📊 Vue Kanban disponible

💡 Astuce : Glissez-déposez les tâches dans le Kanban !`,
      action: "Créer ma Première Tâche"
    },
    {
      id: "budget",
      title: "Suivi Budgétaire",
      description: "Contrôlez vos finances de projet",
      icon: Lightbulb,
      content: `Gardez vos projets dans les limites budgétaires :

💰 Planifiez le budget par catégorie
📊 Suivez les dépenses en temps réel
⚠️ Alertes de dépassement automatiques
📈 Analyses EVM (SPI, CPI)
📤 Exports Excel/PDF

💡 Astuce : Consultez les notifications pour les alertes budget !`,
      action: "Configurer mon Budget"
    },
    {
      id: "ia",
      title: "Assistant IA - Votre Conseiller Intelligent",
      description: "Posez des questions, obtenez des réponses",
      icon: Award,
      content: `L'Assistant IA peut vous aider à :

🤖 Analyser vos projets automatiquement
⚠️ Identifier les risques cachés
💡 Recommander des optimisations
📈 Prédire les tendances
📝 Générer des rapports
💬 Répondre à vos questions

💡 Astuce : Essayez "Analyse mes projets" pour commencer !`,
      action: "Discuter avec l'IA"
    },
    {
      id: "exports",
      title: "Exports Professionnels",
      description: "Rapports PDF, Excel et CSV",
      icon: BookOpen,
      content: `Créez des rapports professionnels en un clic :

📄 PDF multi-pages avec graphiques
📊 Excel avec feuilles multiples
📁 CSV pour imports dans d'autres outils
📧 Envoi automatique par email
⏰ Planification de rapports

💡 Astuce : Planifiez des rapports hebdomadaires automatiques !`,
      action: "Exporter un Rapport"
    },
    {
      id: "complete",
      title: "Vous êtes Prêt ! 🚀",
      description: "Commencez à gérer vos projets comme un pro",
      icon: CheckCircle,
      content: `Félicitations ! Vous connaissez maintenant les bases.

🎯 Prochaines étapes :
1. Créez votre premier projet
2. Invitez votre équipe
3. Configurez les notifications
4. Planifiez des rapports
5. Explorez l'Assistant IA

💡 Besoin d'aide ? Consultez la documentation ou contactez le support.

Bonne gestion de projet ! 🎉`,
      action: "Commencer !"
    }
  ];

  // Tips contextuels
  const tips = [
    "💡 Utilisez Ctrl+K pour ouvrir la recherche rapide",
    "💡 Double-cliquez sur un projet pour voir ses détails",
    "💡 Glissez-déposez les tâches dans le Kanban",
    "💡 L'Assistant IA peut analyser vos projets",
    "💡 Planifiez des rapports automatiques",
    "💡 Personnalisez votre thème dans les paramètres",
    "💡 Exportez en PDF pour des présentations pro",
    "💡 Les notifications vous alertent des problèmes"
  ];

  const currentTip = tips[Math.floor(Math.random() * tips.length)];

  useEffect(() => {
    localStorage.setItem('projet-elite-onboarding', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const markComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      markComplete(steps[currentStep].id);
      setCurrentStep(currentStep + 1);
    } else {
      markComplete(steps[currentStep].id);
      setShowOnboarding(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const IconComponent = steps[currentStep].icon;

  if (!showOnboarding) {
    return (
      <div className="space-y-6">
        <SectionHeader 
          title="Onboarding & Tutoriels" 
          subtitle="Apprenez à utiliser Projet Élite efficacement"
          action={
            <Btn onClick={() => {
              setShowOnboarding(true);
              setCurrentStep(0);
            }}>
              <GraduationCap className="w-4 h-4 mr-2" />
              Recommencer le Tutoriel
            </Btn>
          }
        />

        {/* Tips du jour */}
        {showTips && (
          <Card className="p-6 glass-card rounded-2xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Astuce du Jour
                </h3>
                <p className="app-text">{currentTip}</p>
              </div>
              <button onClick={() => setShowTips(false)} className="app-text2 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </Card>
        )}

        {/* Progression */}
        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Votre Progression</h3>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="app-text2">Tutoriel complété</span>
              <span className="text-indigo-400 font-medium">{completedSteps.length}/{steps.length} étapes</span>
            </div>
            <div className="w-full app-surface3 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
                style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={`p-3 rounded-lg text-center ${
                  completedSteps.includes(step.id)
                    ? 'bg-emerald-600/20 border border-emerald-500/30'
                    : 'app-surface2 border app-border'
                }`}
              >
                {completedSteps.includes(step.id) ? (
                  <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                ) : (
                  <div className="w-6 h-6 rounded-full app-surface3 mx-auto mb-1 flex items-center justify-center text-xs app-text2">
                    {i + 1}
                  </div>
                )}
                <p className="text-xs app-text">{step.title.split(' - ')[0]}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Guides rapides */}
        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Guides Rapides</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { titre: "Créer un projet", desc: "Guide étape par étape", lien: "/multiprojets" },
              { titre: "Gérer le budget", desc: "Suivi et analyse", lien: "/budget" },
              { titre: "Utiliser l'IA", desc: "Commands et astuces", lien: "/assistant-ia" },
              { titre: "Exporter rapports", desc: "PDF, Excel, CSV", lien: "/export" },
            ].map((guide, i) => (
              <a
                key={i}
                href={`#${guide.lien}`}
                className="p-4 app-surface2 hover:app-surface3 rounded-xl transition-colors border app-border hover:border-indigo-500/50"
              >
                <h4 className="font-medium text-white mb-1">{guide.titre}</h4>
                <p className="text-sm app-text2">{guide.desc}</p>
              </a>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  // Mode tutoriel
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full glass-card rounded-3xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{steps[currentStep].title}</h3>
              <p className="text-sm app-text2">{steps[currentStep].description}</p>
            </div>
          </div>
          <button
            onClick={() => setShowOnboarding(false)}
            className="app-text2 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="app-text2">Étape {currentStep + 1} sur {steps.length}</span>
            <span className="text-indigo-400 font-medium">{Math.round((currentStep / steps.length) * 100)}%</span>
          </div>
          <div className="w-full app-surface3 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 app-surface2 rounded-xl mb-6">
          <p className="app-text whitespace-pre-line leading-relaxed">
            {steps[currentStep].content}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Btn variant="ghost" onClick={prevStep} className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Btn>
          )}
          <Btn onClick={nextStep} className="flex-1">
            {currentStep === steps.length - 1 ? (
              <>
                Terminer
                <CheckCircle className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Btn>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingIntelligent;
