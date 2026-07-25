import React, { useState } from "react";
import { Badge, SectionHeader, Btn, TooltipInfo } from "../ui";
import { useNavigate } from "react-router-dom";

const WORKFLOW_ETAPES = [
  {
    id: 1, phase: "🎯 Initiation", niveau: "Débutant", color: "#6366f1",
    description: "Comprendre pourquoi le projet existe.",
    activites: ["Identifier le besoin ou l'opportunité", "Rédiger une Note de Cadrage", "Obtenir le mandat (sponsor)"],
    livrable: "Charte de Projet",
    outil: "/dashboard",
    outilLabel: "Tableau de Bord",
    conseil: "Un projet sans sponsor clairement désigné est voué à échouer. La première question à poser : 'Qui décide ?'",
    question: "Pourquoi lançons-nous ce projet ?",
    definitionCle: { term: "Charte de Projet", def: "Document court (1-2 pages) qui autorise officiellement le projet et nomme le chef de projet." }
  },
  {
    id: 2, phase: "📋 Planification", niveau: "Débutant", color: "#10b981",
    description: "Définir comment, quand et avec quels moyens on va réaliser le projet.",
    activites: ["Décomposer les tâches (WBS)", "Estimer les coûts et délais", "Identifier les risques", "Construire le Gantt"],
    livrable: "Plan de Management de Projet",
    outil: "/gantt",
    outilLabel: "Gantt Interactif",
    conseil: "La règle du 80/20 : 80% des problèmes viennent d'une mauvaise planification. Investissez du temps ici !",
    question: "Comment allons-nous livrer le projet ?",
    definitionCle: { term: "WBS (Work Breakdown Structure)", def: "Décomposition hiérarchique du travail en livrables et tâches. La base de tout planning solide." }
  },
  {
    id: 3, phase: "🚀 Exécution", niveau: "Intermédiaire", color: "#f59e0b",
    description: "Réaliser le travail planifié et coordonner l'équipe.",
    activites: ["Affecter les ressources aux tâches", "Conduire des réunions d'avancement", "Gérer les changements de périmètre", "Motiver l'équipe"],
    livrable: "Livrables Techniques + Comptes-Rendus",
    outil: "/taches",
    outilLabel: "Gestion des Tâches",
    conseil: "Le 'Change Request' est votre meilleur ami. Tout changement doit être documenté, évalué et approuvé avant exécution.",
    question: "Faisons-nous ce qui a été planifié ?",
    definitionCle: { term: "Change Request", def: "Demande formelle de modification du périmètre, du planning ou du budget. Protège l'équipe et le client." }
  },
  {
    id: 4, phase: "📊 Surveillance", niveau: "Avancé", color: "#ec4899",
    description: "Mesurer l'avancement réel vs. le plan et corriger les écarts.",
    activites: ["Calculer SPI et CPI (EVM)", "Mettre à jour le registre des risques", "Produire des rapports d'avancement", "Anticiper les dérives budgétaires"],
    livrable: "Rapport de Suivi Hebdomadaire",
    outil: "/evm",
    outilLabel: "Valeur Acquise (EVM)",
    conseil: "Un écart identifié tôt coûte 10× moins cher à corriger. Mesurez chaque semaine, pas chaque mois.",
    question: "Sommes-nous dans les clous ?",
    definitionCle: { term: "EVM (Earned Value Management)", def: "Méthode qui compare le budget prévu, le budget dépensé et la valeur réellement produite pour prédire les dérives." }
  },
  {
    id: 5, phase: "✅ Clôture", niveau: "Avancé", color: "#8b5cf6",
    description: "Clore officiellement le projet et archiver les apprentissages.",
    activites: ["Faire accepter les livrables par le client", "Conduire la réunion de Retour d'Expérience (REX)", "Archiver la documentation", "Célébrer les succès de l'équipe"],
    livrable: "Bilan de Projet + Archives",
    outil: "/rapport-universitaire",
    outilLabel: "Générateur de Rapport",
    conseil: "La réunion REX est souvent négligée. C'est pourtant là que se forment les équipes d'élite qui ne répètent pas les mêmes erreurs.",
    question: "Avons-nous tenu nos engagements ?",
    definitionCle: { term: "Retour d'Expérience (REX)", def: "Session structurée en fin de projet pour identifier ce qui a bien/mal fonctionné et capitaliser pour les projets futurs." }
  },
];

const QUIZ_QUESTIONS = [
  {
    q: "Votre client veut changer le design 2 jours avant la livraison. Que faites-vous ?",
    options: [
      { text: "L'équipe travaille la nuit gratuitement.", correct: false, feedback: "Burnout assuré. Les coûts explosent sans compensation." },
      { text: "Je refuse catégoriquement.", correct: false, feedback: "Trop brutal. La relation client sera dégradée." },
      { text: "J'évalue l'impact, crée un avenant, et laisse le client choisir.", correct: true, feedback: "✅ C'est le processus formel de Change Request — la bonne pratique professionnelle." },
    ]
  },
  {
    q: "Qu'est-ce qu'un Jalon (Milestone) ?",
    options: [
      { text: "Une réunion quotidienne de l'équipe Scrum.", correct: false, feedback: "Faux. Ça c'est le Daily Stand-up." },
      { text: "Un événement clé sans durée qui marque la fin d'une phase.", correct: true, feedback: "✅ Parfait. Un jalon dure zéro jour, c'est un marqueur de franchise." },
      { text: "Le document qui liste les dépenses.", correct: false, feedback: "Faux. C'est le rapport de suivi des coûts." },
    ]
  },
  {
    q: "Un risque avec gravité 4/5 et probabilité 3/5 a un score de :",
    options: [
      { text: "7 sur 10", correct: false, feedback: "Faux. On multiplie : 4 × 3 = 12." },
      { text: "12 sur 25", correct: true, feedback: "✅ Correct ! Score = Gravité × Probabilité. Ce risque est élevé (> 10)." },
      { text: "43%", correct: false, feedback: "Faux. Les scores de risques ne sont pas des pourcentages." },
    ]
  },
  {
    q: "Quelle méthode est la mieux adaptée à un projet logiciel dont le périmètre évolue souvent ?",
    options: [
      { text: "Waterfall (Cascade) — tout planifier avant de commencer.", correct: false, feedback: "Trop rigide pour des périmètres changeants. Le client peut regretter ses choix initiaux." },
      { text: "Agile (Scrum) — sprints de 2 semaines avec livraisons fréquentes.", correct: true, feedback: "✅ Agile est idéal pour l'incertitude. On s'adapte à chaque sprint." },
      { text: "PRINCE2 — gouvernance stricte par étapes.", correct: false, feedback: "PRINCE2 est adapté aux grands programmes institutionnels, moins aux startups." },
    ]
  },
];

const CASE_STUDIES = [
  {
    icon: "💰", title: "Le Dérapage Budgétaire (Scope Creep)", color: "#ef4444",
    context: "Le client demande 'juste une petite fonctionnalité' alors que le budget est à 90%.",
    problem: "Dire oui gratuitement détruit la rentabilité.",
    solution: "Process Change Request : évaluer l'impact, soumettre un avenant, attendre validation AVANT d'agir.",
    pmbok: "Contrôle du Périmètre (Scope Control)"
  },
  {
    icon: "🚦", title: "Le Goulot d'Étranglement", color: "#f59e0b",
    context: "L'unique testeur QA est malade 2 semaines. Le projet est bloqué.",
    problem: "Key Person Risk : dépendance critique sur une seule personne.",
    solution: "Polyvalence T-shaped + Swarming Agile : toute l'équipe teste pour débloquer.",
    pmbok: "Planification des Ressources"
  },
  {
    icon: "🏗️", title: "L'Effet Tunnel BTP", color: "#a78bfa",
    context: "La construction avance mais les approvisionnements en ciment sont en retard.",
    problem: "Pas de suivi des dépendances fournisseurs dans le planning.",
    solution: "Intégrer les délais fournisseurs dans le Gantt. Créer des stocks tampons stratégiques.",
    pmbok: "Gestion des Approvisionnements"
  },
];

const GuideInteractif = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("workflow");
  const [etapeActive, setEtapeActive] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFini, setQuizFini] = useState(false);

  const etape = WORKFLOW_ETAPES[etapeActive];

  const NIVEAU_COLORS = {
    "Débutant": "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    "Intermédiaire": "text-blue-400 bg-blue-500/10 border-blue-500/30",
    "Avancé": "text-orange-400 bg-orange-500/10 border-orange-500/30",
  };

  const handleQuizAnswer = (i) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(i);
    if (QUIZ_QUESTIONS[quizIdx].options[i].correct) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (quizIdx >= QUIZ_QUESTIONS.length - 1) {
      setQuizFini(true);
    } else {
      setQuizIdx(q => q + 1);
      setSelectedOpt(null);
    }
  };

  const resetQuiz = () => {
    setQuizIdx(0); setSelectedOpt(null); setScore(0); setQuizFini(false);
  };

  return (
    <div className="space-y-8 animate-entrance max-w-5xl mx-auto">
      <SectionHeader
        title="🧭 Académie Projet Élite"
        subtitle="Du débutant à l'expert — Maîtrisez la gestion de projet pas à pas"
      />

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap border-b app-border pb-4">
        {[
          { id: "workflow", label: "🔄 Workflow Projet" },
          { id: "cas", label: "📖 Études de Cas" },
          { id: "quiz", label: "🎮 Quiz de Certification" },
        ].map(t => (
          <Btn key={t.id} variant={activeTab === t.id ? "primary" : "ghost"} size="sm" onClick={() => setActiveTab(t.id)}>
            {t.label}
          </Btn>
        ))}
      </div>

      {/* ── TAB WORKFLOW ── */}
      {activeTab === "workflow" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-entrance">
          {/* Left — étapes list */}
          <div className="space-y-2">
            <p className="text-[10px] app-text3 uppercase font-black tracking-widest mb-4">Les 5 Phases PMBOK</p>
            {WORKFLOW_ETAPES.map((e, i) => (
              <button
                key={e.id}
                onClick={() => setEtapeActive(i)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${i === etapeActive
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "app-border app-surface hover:app-border2"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                    style={{ backgroundColor: e.color + "20", color: e.color }}>
                    {e.id}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{e.phase}</p>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${NIVEAU_COLORS[e.niveau]}`}>{e.niveau}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right — detail */}
          <div className="lg:col-span-2 space-y-5">
            {/* Header */}
            <div className="glass-card rounded-2xl p-6" style={{ borderLeft: `4px solid ${etape.color}` }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white mb-1">{etape.phase}</h2>
                  <p className="app-text2 text-sm">{etape.description}</p>
                </div>
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full border flex-shrink-0 ${NIVEAU_COLORS[etape.niveau]}`}>{etape.niveau}</span>
              </div>
              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: etape.color + "15" }}>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: etape.color }}>Question clé</p>
                <p className="text-white font-bold text-sm italic">"{etape.question}"</p>
              </div>
            </div>

            {/* Activités */}
            <div className="glass-card rounded-2xl p-6">
              <p className="text-[10px] font-black app-text3 uppercase tracking-widest mb-4">Activités principales</p>
              <div className="space-y-2">
                {etape.activites.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 app-surface2 rounded-xl">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                      style={{ backgroundColor: etape.color + "20", color: etape.color }}>
                      {i + 1}
                    </div>
                    <span className="text-sm app-text">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Livrable + Définition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-5">
                <p className="text-[10px] font-black app-text3 uppercase tracking-widest mb-2">Livrable attendu</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📄</span>
                  <span className="text-white font-bold text-sm">{etape.livrable}</span>
                </div>
              </div>
              <div className="glass-card rounded-2xl p-5 bg-indigo-500/5 border border-indigo-500/20">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                  Concept clé
                  <TooltipInfo term={etape.definitionCle.term} definition={etape.definitionCle.def} />
                </p>
                <span className="text-white font-bold text-sm">{etape.definitionCle.term}</span>
                <p className="text-xs app-text2 mt-1">{etape.definitionCle.def}</p>
              </div>
            </div>

            {/* Conseil expert */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">💡 Conseil Expert</p>
              <p className="text-sm text-amber-100/90 italic">"{etape.conseil}"</p>
            </div>

            {/* CTA vers module */}
            <button
              onClick={() => navigate(etape.outil)}
              className="w-full p-4 rounded-xl border-2 border-dashed border-indigo-500/40 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-500 transition-all flex items-center justify-between group"
            >
              <div className="text-left">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Pratiquer maintenant</p>
                <p className="text-white font-bold">Ouvrir : {etape.outilLabel}</p>
              </div>
              <span className="text-indigo-400 group-hover:translate-x-2 transition-transform text-xl">→</span>
            </button>

            {/* Navigation */}
            <div className="flex justify-between pt-2">
              <Btn variant="ghost" size="sm" onClick={() => setEtapeActive(Math.max(0, etapeActive - 1))} disabled={etapeActive === 0}>
                ◀ Phase précédente
              </Btn>
              <div className="flex gap-2">
                {WORKFLOW_ETAPES.map((_, i) => (
                  <div key={i} onClick={() => setEtapeActive(i)}
                    className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${i === etapeActive ? "scale-125" : "app-surface3 hover:bg-slate-500"}`}
                    style={i === etapeActive ? { backgroundColor: etape.color } : {}} />
                ))}
              </div>
              <Btn variant="primary" size="sm" onClick={() => setEtapeActive(Math.min(WORKFLOW_ETAPES.length - 1, etapeActive + 1))} disabled={etapeActive === WORKFLOW_ETAPES.length - 1}>
                Phase suivante ▶
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB ÉTUDES DE CAS ── */}
      {activeTab === "cas" && (
        <div className="space-y-6 animate-entrance">
          <p className="text-sm app-text2">Situations réelles rencontrées sur des projets — comment les experts les résolvent.</p>
          {CASE_STUDIES.map((c, i) => (
            <div key={i} className="glass-card rounded-2xl p-6" style={{ borderLeft: `4px solid ${c.color}` }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <h3 className="text-lg font-black text-white">{c.title}</h3>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full app-surface2 app-text2">{c.pmbok}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 app-surface2 rounded-xl">
                  <p className="text-[10px] font-black app-text3 uppercase tracking-widest mb-2">📌 Contexte</p>
                  <p className="text-sm app-text">{c.context}</p>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">⚠️ Problème</p>
                  <p className="text-sm text-red-200">{c.problem}</p>
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">✅ Solution Pro</p>
                  <p className="text-sm text-emerald-200">{c.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB QUIZ ── */}
      {activeTab === "quiz" && (
        <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto animate-entrance">
          {!quizFini ? (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black app-text3 uppercase tracking-widest">Question {quizIdx + 1} / {QUIZ_QUESTIONS.length}</p>
                <span className="text-[10px] font-bold text-indigo-400">{score} point{score > 1 ? "s" : ""}</span>
              </div>
              <div className="w-full app-surface2 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-indigo-500 transition-all" style={{ width: `${((quizIdx) / QUIZ_QUESTIONS.length) * 100}%` }} />
              </div>

              {/* Question */}
              <div className="p-5 app-surface2 border app-border rounded-2xl">
                <h4 className="text-lg font-bold text-white leading-relaxed">{QUIZ_QUESTIONS[quizIdx].q}</h4>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => {
                  const isSelected = selectedOpt === i;
                  const revealed = selectedOpt !== null;
                  let cls = "app-border app-surface2 hover:border-indigo-500/50 text-slate-200";
                  if (revealed) {
                    if (opt.correct) cls = "border-emerald-500 bg-emerald-500/10 text-emerald-200";
                    else if (isSelected) cls = "border-red-500 bg-red-500/10 text-red-300 opacity-60";
                    else cls = "app-border app-surface text-slate-600 opacity-30 pointer-events-none";
                  }
                  return (
                    <div key={i}>
                      <button
                        disabled={revealed}
                        onClick={() => handleQuizAnswer(i)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${cls}`}
                      >
                        <span className="font-black mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt.text}
                      </button>
                      {revealed && isSelected && (
                        <div className={`mt-2 p-3 rounded-xl text-xs font-medium animate-entrance ${opt.correct ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30" : "bg-red-500/20 text-red-200 border border-red-500/30"}`}>
                          {opt.feedback}
                        </div>
                      )}
                      {revealed && !isSelected && opt.correct && (
                        <div className="mt-2 p-3 rounded-xl text-xs bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 animate-entrance">
                          👉 Bonne réponse : {opt.feedback}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {selectedOpt !== null && (
                <div className="flex justify-end pt-4 border-t app-border">
                  <Btn onClick={nextQuestion}>
                    {quizIdx >= QUIZ_QUESTIONS.length - 1 ? "Voir mon résultat 🏆" : "Question suivante ▶"}
                  </Btn>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-7xl mb-6">{score >= 3 ? "🏆" : score >= 2 ? "🥈" : "📚"}</div>
              <h2 className="text-3xl font-black text-white mb-2">
                {score >= 3 ? "Excellent !" : score >= 2 ? "Bien joué !" : "Continuez à apprendre !"}
              </h2>
              <p className="app-text2 mb-2">Score : <span className="text-indigo-400 font-black text-2xl">{score} / {QUIZ_QUESTIONS.length}</span></p>
              <p className="text-sm app-text3 mb-8">
                {score === QUIZ_QUESTIONS.length ? "Score parfait ! Vous maîtrisez les fondamentaux." :
                 score >= 2 ? "Bonne base. Relisez les études de cas pour progresser." :
                 "Consultez le workflow pédagogique pour renforcer vos acquis."}
              </p>
              <div className="flex gap-3 justify-center">
                <Btn variant="ghost" onClick={resetQuiz}>🔄 Rejouer</Btn>
                <Btn onClick={() => navigate("/rapport-universitaire")}>📄 Générer mon Rapport</Btn>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GuideInteractif;
