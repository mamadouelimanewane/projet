import React, { useState } from "react";
import { Badge, StatCard, SectionHeader, Btn } from "../ui";

const CASE_STUDIES = [
  {
    id: 1,
    title: "Le Dérapage Budgétaire (Scope Creep)",
    context: "Le client pour un site e-commerce demande 'juste une petite fonctionnalité en plus' (une messagerie live) alors que le budget est déjà consommé à 90%.",
    problem: "Dire oui gratuitement détruit la rentabilité. Dire non frustre le client.",
    solution: "Processus de Gestion des Changements (Change Request). Évaluer l'impact (10 jours + 2000€). Soumettre un avenant pour validation AVANT de commencer le code.",
    icon: "💰",
    color: "#ef4444"
  },
  {
    id: 2,
    title: "Le Goulot d'Étranglement (Bottleneck)",
    context: "L'application est finie, mais le seul testeur QA de l'équipe (Sophie) est malade pour 2 semaines. Le projet est bloqué.",
    problem: "Dépendance critique envers une seule personne (Key Person Risk).",
    solution: "Le 'Swarming' en Agile et la polyvalence (T-shaped skills). Les développeurs arrêtent de coder de nouvelles features et se mettent tous à tester pour débloquer la livraison.",
    icon: "🚦",
    color: "#f59e0b"
  },
  {
    id: 3,
    title: "La Faute de l'Effet Tunnel",
    context: "L'équipe s'enferme pendant 6 mois pour sortir l'application parfaite. Au lancement, les utilisateurs détestent l'interface.",
    problem: "Méthode Cascade poussée à l'extrême sans boucle de feedback métier.",
    solution: "L'approche itérative (MVP - Minimum Viable Product). Livrer une version basique au bout de 3 semaines, mesurer les retours, et itérer. L'échec devient un apprentissage rapide.",
    icon: "🚇",
    color: "#a78bfa"
  }
];

const GUIDE_STEPS = [
  {
    title: "👋 Bienvenue en Gestion de Projet",
    desc: "Un projet est simplement un effort temporaire pour créer un résultat unique. Il a un début, une fin, et un budget. Votre but : livrer la valeur attendue, à temps.",
    icon: "🧭",
    color: "#6366f1"
  },
  {
    title: "1️⃣ Le Périmètre (Scope)",
    desc: "C'est la liste stricte de ce qui est INCLUS et EXCLUS du projet. Si ce n'est pas dans le contrat initial, c'est hors périmètre.",
    icon: "📦",
    color: "#f59e0b",
    actionDesc: "Règle d'or : Tout changement de périmètre modifie obligatoirement le délai ou le budget."
  },
  {
    title: "2️⃣ Agile vs Cascade",
    desc: "Cascade (Waterfall) = Séquentiel. On planifie tout, puis on exécute.\nAgile (Scrum) = Itératif. On avance par cycles de 2 semaines (Sprints) en livrant des morceaux utilisables.",
    icon: "⚖",
    color: "#10b981",
    actionDesc: "👉 Les projets logiciels modernes utilisent 90% du temps l'Agilité pour s'adapter aux changements."
  },
  {
    title: "3️⃣ Le Triangle de Fer",
    desc: "Qualité = Délai + Coût + Périmètre. Si vous voulez livrer plus vite (Délai baisse), le Coût augmente (engager plus de monde) ou le Périmètre diminue (faire moins de choses).",
    icon: "🔺",
    color: "#ec4899"
  }
];

const QUIZ_QUESTIONS = [
  {
    q: "Votre client vous appelle et veut complètement changer le design de l'application à 2 jours de la livraison finale. Que faites-vous ?",
    options: [
      { text: "L'équipe travaille la nuit pour le faire gratuitement.", correct: false, feedback: "Mauvaise idée. Burnout assuré et les coûts vont exploser sans compensation." },
      { text: "Je dis 'Non' fermement, c'est impossible.", correct: false, feedback: "Trop brutal. Le client va se braquer et la relation sera ruinée." },
      { text: "J'estime le temps nécessaire, je crée un avenant budgétaire, et je lui donne le choix de payer ou de garder l'ancien design.", correct: true, feedback: "Excellent ! C'est exactement le processus formel de Change Request." }
    ]
  },
  {
    q: "Qu'est-ce qu'un 'Jalon' (Milestone) dans un projet ?",
    options: [
      { text: "Un événement majeur qui marque l'achèvement d'une phase clé (ex: Signature du contrat, Fin du Design).", correct: true, feedback: "Parfait. Un jalon a toujours une durée de zéro jour, c'est juste un marqueur." },
      { text: "Une réunion quotidienne où chaque développeur explique ce qu'il a fait hier.", correct: false, feedback: "Faux. Ça, c'est le 'Daily Stand-up' de la méthode Scrum." },
      { text: "Le document qui liste tout l'argent dépensé.", correct: false, feedback: "Faux. C'est le rapport de suivi des coûts." }
    ]
  }
];

const GuideInteractif = () => {
  const [activeTab, setActiveTab] = useState("concepts"); // concepts, cases, quiz
  
  // Concept State
  const [step, setStep] = useState(0);
  
  // Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);

  return (
    <div className="space-y-8 animate-entrance max-w-5xl mx-auto">
      <SectionHeader 
        title="Académie & Apprentissage" 
        subtitle="Ressources didactiques pour maîtriser la science de la gestion de projet" 
      />

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-800/80 pb-4">
        <Btn variant={activeTab === "concepts" ? "primary" : "ghost"} onClick={() => setActiveTab("concepts")}>
          📚 Concepts Clés
        </Btn>
        <Btn variant={activeTab === "cases" ? "primary" : "ghost"} onClick={() => setActiveTab("cases")}>
          🔍 Études de Cas (Réel)
        </Btn>
        <Btn variant={activeTab === "quiz" ? "primary" : "ghost"} onClick={() => { setActiveTab("quiz"); setSelectedOpt(null); setQuizIdx(0); }}>
          🎮 Simulateur (Quiz)
        </Btn>
      </div>

      {/* TABS CONTENT */}
      
      {/* TAB 1: CONCEPTS */}
      {activeTab === "concepts" && (
        <div className="glass-card rounded-2xl p-8 relative overflow-hidden animate-entrance">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
            <div className="h-full premium-gradient transition-all duration-500" style={{ width: `${((step + 1) / GUIDE_STEPS.length) * 100}%` }} />
          </div>

          <div className="flex justify-between items-center mb-8 px-4 text-xs font-bold text-slate-500 uppercase tracking-widest relative z-10">
            <span>Module Fondamental</span>
            <span className="text-indigo-400">{step + 1} / {GUIDE_STEPS.length}</span>
          </div>

          <div className="py-8 min-h-[300px] flex flex-col items-center justify-center relative z-10 text-center">
            <div className="text-7xl mb-8 shadow-2xl rounded-full transition-transform hover:scale-110" style={{ color: GUIDE_STEPS[step].color, textShadow: `0 0 40px ${GUIDE_STEPS[step].color}88` }}>
              {GUIDE_STEPS[step].icon}
            </div>
            <h2 className="text-3xl font-black text-white mb-6">{GUIDE_STEPS[step].title}</h2>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed whitespace-pre-line">
              {GUIDE_STEPS[step].desc}
            </p>
            {GUIDE_STEPS[step].actionDesc && (
              <div className="mt-8 bg-indigo-500/10 border border-indigo-500/20 p-5 rounded-xl text-sm font-medium text-indigo-300 max-w-lg shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                {GUIDE_STEPS[step].actionDesc}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-8 relative z-10 border-t border-slate-700/50 pt-6">
             <Btn onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} variant="ghost">◀ Retour</Btn>
             <div className="flex gap-3">
               {GUIDE_STEPS.map((_, i) => (
                 <div key={i} onClick={() => setStep(i)} className={`w-3 h-3 rounded-full cursor-pointer transition-all ${i === step ? "bg-indigo-500 scale-125" : "bg-slate-700 hover:bg-slate-600"}`} />
               ))}
             </div>
             <Btn onClick={() => setStep(Math.min(GUIDE_STEPS.length - 1, step + 1))} disabled={step === GUIDE_STEPS.length - 1} variant="primary">Suivant ▶</Btn>
          </div>
        </div>
      )}

      {/* TAB 2: CASE STUDIES */}
      {activeTab === "cases" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-entrance">
           {CASE_STUDIES.map((c) => (
             <div key={c.id} className="glass-card rounded-2xl p-6 flex flex-col hover:-translate-y-2 transition-transform duration-300">
               <div className="flex items-center gap-4 mb-6">
                 <div className="text-4xl" style={{ filter: `drop-shadow(0 0 10px ${c.color}66)` }}>{c.icon}</div>
                 <h3 className="text-lg font-black text-white leading-tight">{c.title}</h3>
               </div>
               
               <div className="space-y-4 flex-1">
                 <div>
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Le Contexte</p>
                   <p className="text-sm text-slate-300">{c.context}</p>
                 </div>
                 <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                   <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Le Risque / Problème</p>
                   <p className="text-sm text-red-200/90">{c.problem}</p>
                 </div>
                 <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex-1">
                   <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">La Solution Pro</p>
                   <p className="text-sm text-emerald-200/90">{c.solution}</p>
                 </div>
               </div>
             </div>
           ))}
        </div>
      )}

      {/* TAB 3: QUIZ SIMULATOR */}
      {activeTab === "quiz" && (
        <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto animate-entrance">
            <h3 className="text-xs font-black text-slate-500 mb-8 uppercase tracking-[0.2em] text-center">Simulateur de Choix Exécutifs</h3>
            
            {quizIdx < QUIZ_QUESTIONS.length ? (
              <div className="space-y-8">
                <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl">
                  <h4 className="text-xl font-bold text-white leading-relaxed">{QUIZ_QUESTIONS[quizIdx].q}</h4>
                </div>
                
                <div className="space-y-3">
                  {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => {
                    const isSelected = selectedOpt === i;
                    const isRevealed = selectedOpt !== null;
                    let btnClass = "border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:border-indigo-500/50 text-slate-200";
                    
                    if (isRevealed) {
                      if (opt.correct) btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-300";
                      else if (isSelected) btnClass = "border-red-500 bg-red-500/10 text-red-300 opacity-50";
                      else btnClass = "border-slate-800 bg-slate-900 text-slate-600 opacity-30 pointer-events-none";
                    }

                    return (
                      <div key={i}>
                        <button 
                          disabled={isRevealed}
                          onClick={() => setSelectedOpt(i)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${btnClass}`}
                        >
                          <span className="font-bold mr-3">{String.fromCharCode(65 + i)}.</span>
                          {opt.text}
                        </button>
                        
                        {isRevealed && isSelected && (
                          <div className={`mt-2 p-4 rounded-xl text-sm font-medium ${opt.correct ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40' : 'bg-red-500/20 text-red-200 border border-red-500/40'} animate-entrance`}>
                            {opt.correct ? '✅' : '❌'} {opt.feedback}
                          </div>
                        )}
                        {/* Show feedback for correct answer if user got it wrong */}
                        {isRevealed && !isSelected && opt.correct && (
                          <div className={`mt-2 p-4 rounded-xl text-sm font-medium bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 animate-entrance`}>
                            👉 La bonne réponse était : {opt.feedback}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {selectedOpt !== null && (
                  <div className="flex justify-end pt-6 border-t border-slate-700/50">
                    <Btn size="lg" onClick={() => { setQuizIdx(quizIdx + 1); setSelectedOpt(null); }}>
                      {quizIdx === QUIZ_QUESTIONS.length - 1 ? "Terminer le test" : "Question Suivante ▶"}
                    </Btn>
                  </div>
                )}
              </div>
            ) : (
               <div className="text-center py-12">
                 <div className="text-6xl mb-6">🏆</div>
                 <h2 className="text-3xl font-black text-white mb-4">Certification Obtenue !</h2>
                 <p className="text-slate-400 max-w-md mx-auto mb-8">Vous avez terminé l'entraînement exécutif. Vous avez maintenant le bagage tactique pour piloter le projet.</p>
                 <Btn size="lg" onClick={() => { setActiveTab("concepts"); setQuizIdx(0); }}>Retour aux bases</Btn>
               </div>
            )}
        </div>
      )}
    </div>
  );
};

export default GuideInteractif;
