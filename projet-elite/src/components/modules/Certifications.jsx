import React, { useState } from "react";
import { SectionHeader, Btn, Card, TooltipInfo } from "../ui";

const REFERENTIELS = [
  {
    id: "pmbok", label: "PMBOK 7", org: "PMI (USA)", icon: "📘", color: "#6366f1",
    desc: "Le référentiel mondial le plus utilisé. Basé sur 12 principes de gestion de projet.",
    principes: [
      "Être un intendant diligent, respectueux et attentionné",
      "Créer un environnement collaboratif",
      "S'engager efficacement avec les parties prenantes",
      "Se concentrer sur la valeur",
      "Reconnaître et gérer les interactions systémiques",
      "Faire preuve de leadership",
      "Adapter en fonction du contexte",
      "Intégrer la qualité dans les processus",
      "Naviguer dans la complexité",
      "Optimiser les réponses aux risques",
      "Adopter l'adaptabilité et la résilience",
      "Permettre le changement pour atteindre la vision"
    ],
    domaines: ["Parties prenantes", "Équipe", "Approche de développement", "Planification", "Travail du projet", "Livraison", "Mesure", "Incertitude"],
    quiz: [
      { q: "Combien de domaines de performance compte le PMBOK 7 ?", opts: ["5", "8", "10"], correct: 1 },
      { q: "Le PMBOK 7 est basé sur des principes plutôt que des processus. Vrai ou faux ?", opts: ["Vrai", "Faux"], correct: 0 },
      { q: "Quel organisme publie le PMBOK ?", opts: ["ISO", "PMI", "PRINCE2 Foundation"], correct: 1 },
    ]
  },
  {
    id: "scrum", label: "Scrum Guide", org: "Scrum.org", icon: "↻", color: "#10b981",
    desc: "Framework Agile pour gérer des projets complexes par sprints de 2-4 semaines.",
    principes: [
      "Transparence : tout le monde voit l'avancement",
      "Inspection : vérifier régulièrement les progrès",
      "Adaptation : ajuster le plan en fonction des résultats",
    ],
    domaines: ["Product Owner", "Scrum Master", "Developers", "Sprint Planning", "Daily Scrum", "Sprint Review", "Sprint Retrospective", "Product Backlog", "Sprint Backlog", "Increment"],
    quiz: [
      { q: "Quelle est la durée maximale d'un Sprint ?", opts: ["2 semaines", "4 semaines", "6 semaines"], correct: 1 },
      { q: "Qui est responsable du Product Backlog ?", opts: ["Le Scrum Master", "Le Product Owner", "L'équipe de développement"], correct: 1 },
      { q: "Le Daily Scrum dure combien de temps maximum ?", opts: ["15 minutes", "30 minutes", "1 heure"], correct: 0 },
    ]
  },
  {
    id: "prince2", label: "PRINCE2", org: "Axelos (UK)", icon: "⛨", color: "#f59e0b",
    desc: "Méthode de gestion structurée par étapes avec gouvernance forte. Très utilisée en Europe et Afrique.",
    principes: [
      "Justification continue pour l'entreprise",
      "Leçons tirées de l'expérience",
      "Rôles et responsabilités définis",
      "Management par étapes",
      "Management par exception",
      "Focalisation sur les produits",
      "Adaptation au contexte du projet"
    ],
    domaines: ["Business Case", "Organisation", "Qualité", "Plans", "Risques", "Changements", "Progression"],
    quiz: [
      { q: "Combien de principes compte PRINCE2 ?", opts: ["5", "7", "12"], correct: 1 },
      { q: "Que signifie 'Management par exception' ?", opts: ["Le chef gère tout seul", "On ne rapporte que les écarts hors tolérance", "On ignore les problèmes mineurs"], correct: 1 },
      { q: "PRINCE2 est originaire de quel pays ?", opts: ["USA", "France", "Royaume-Uni"], correct: 2 },
    ]
  },
  {
    id: "iso21500", label: "ISO 21500", org: "ISO (International)", icon: "🌐", color: "#ec4899",
    desc: "Norme internationale fournissant des lignes directrices pour la gestion de projet, applicable à tout secteur.",
    principes: [
      "Alignement stratégique avec les objectifs organisationnels",
      "Gouvernance structurée et rôles définis",
      "Approche processus intégrée",
      "Gestion des parties prenantes",
      "Amélioration continue"
    ],
    domaines: ["Intégration", "Parties prenantes", "Périmètre", "Ressources", "Délais", "Coûts", "Risques", "Qualité", "Approvisionnements", "Communication"],
    quiz: [
      { q: "L'ISO 21500 est-elle certifiante pour les individus ?", opts: ["Oui", "Non, c'est un guide pour les organisations"], correct: 1 },
      { q: "Combien de groupes de processus identifie l'ISO 21500 ?", opts: ["3", "5", "7"], correct: 1 },
    ]
  },
];

const CERTIFICATIONS = [
  { label: "CAPM", org: "PMI", niveau: "Débutant", prerequis: "23h de formation PM", desc: "Certified Associate in Project Management — idéal pour les étudiants.", color: "#10b981" },
  { label: "PMP", org: "PMI", niveau: "Avancé", prerequis: "36 mois d'exp + 35h formation", desc: "Project Management Professional — la certification la plus reconnue au monde.", color: "#6366f1" },
  { label: "PSM I", org: "Scrum.org", niveau: "Intermédiaire", prerequis: "Aucun prérequis formel", desc: "Professional Scrum Master I — maîtrise du framework Scrum.", color: "#f59e0b" },
  { label: "PRINCE2 Foundation", org: "Axelos", niveau: "Débutant", prerequis: "Aucun", desc: "Fondamentaux PRINCE2 — gestion structurée par étapes.", color: "#ec4899" },
  { label: "PRINCE2 Practitioner", org: "Axelos", niveau: "Avancé", prerequis: "Foundation réussie", desc: "Application avancée de PRINCE2 sur des projets réels.", color: "#8b5cf6" },
  { label: "PMI-ACP", org: "PMI", niveau: "Avancé", prerequis: "21h formation Agile + 2000h exp Agile", desc: "Agile Certified Practitioner — certification Agile du PMI.", color: "#0ea5e9" },
];

export default function Certifications() {
  const [activeRef, setActiveRef] = useState("pmbok");
  const [tab, setTab] = useState("referentiels"); // referentiels | certifications | quiz
  const [quizIdx, setQuizIdx] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const ref = REFERENTIELS.find(r => r.id === activeRef);
  const quizQuestions = ref?.quiz || [];

  const handleAnswer = (i) => {
    if (answer !== null) return;
    setAnswer(i);
    if (i === quizQuestions[quizIdx].correct) setScore(s => s + 1);
  };

  const nextQ = () => {
    if (quizIdx >= quizQuestions.length - 1) { setQuizDone(true); return; }
    setQuizIdx(q => q + 1);
    setAnswer(null);
  };

  const resetQuiz = () => { setQuizIdx(0); setAnswer(null); setScore(0); setQuizDone(false); };

  return (
    <div className="space-y-6 animate-entrance max-w-5xl mx-auto">
      <SectionHeader
        title={<>📚 Certifications & Référentiels <TooltipInfo term="Certification PM" definition="Validation officielle de compétences en gestion de projet par un organisme reconnu (PMI, Axelos, Scrum.org)." /></>}
        subtitle="Maîtrisez les standards mondiaux — PMBOK, Scrum, PRINCE2, ISO 21500"
      />

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap border-b border-slate-800 pb-4">
        {[
          { id: "referentiels", label: "📖 Référentiels" },
          { id: "certifications", label: "🏅 Parcours Certifications" },
          { id: "quiz", label: "🎮 Quiz Préparation" },
        ].map(t => (
          <Btn key={t.id} variant={tab === t.id ? "primary" : "ghost"} size="sm" onClick={() => { setTab(t.id); resetQuiz(); }}>
            {t.label}
          </Btn>
        ))}
      </div>

      {/* ── RÉFÉRENTIELS ── */}
      {tab === "referentiels" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-entrance">
          {/* Selector */}
          <div className="space-y-2">
            {REFERENTIELS.map(r => (
              <button key={r.id} onClick={() => setActiveRef(r.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${activeRef === r.id ? "border-indigo-500 bg-indigo-500/10" : "border-slate-700/50 bg-slate-900/50 hover:border-slate-600"}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{r.icon}</span>
                  <div>
                    <p className="font-bold text-white text-sm">{r.label}</p>
                    <p className="text-[10px] text-slate-500">{r.org}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass-card rounded-2xl p-6" style={{ borderLeft: `4px solid ${ref.color}` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{ref.icon}</span>
                <div>
                  <h2 className="text-2xl font-black text-white">{ref.label}</h2>
                  <p className="text-xs text-slate-500">{ref.org}</p>
                </div>
              </div>
              <p className="text-sm text-slate-300">{ref.desc}</p>
            </div>

            {/* Principes */}
            <div className="glass-card rounded-2xl p-6">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Principes fondamentaux ({ref.principes.length})</p>
              <div className="space-y-2">
                {ref.principes.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-800/40 rounded-xl">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: ref.color + "20", color: ref.color }}>{i + 1}</div>
                    <span className="text-sm text-slate-300">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Domaines */}
            <div className="glass-card rounded-2xl p-6">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Domaines / Composants ({ref.domaines.length})</p>
              <div className="flex flex-wrap gap-2">
                {ref.domaines.map((d, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-bold border"
                    style={{ backgroundColor: ref.color + "10", color: ref.color, borderColor: ref.color + "30" }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CERTIFICATIONS ── */}
      {tab === "certifications" && (
        <div className="space-y-4 animate-entrance">
          <p className="text-sm text-slate-400 mb-4">Parcours recommandé pour chaque niveau de maturité professionnelle.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <Card key={i} className="p-5" style={{ borderTop: `3px solid ${c.color}` }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-black text-white">{c.label}</h3>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    c.niveau === "Débutant" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" :
                    c.niveau === "Intermédiaire" ? "text-blue-400 bg-blue-500/10 border-blue-500/30" :
                    "text-orange-400 bg-orange-500/10 border-orange-500/30"
                  }`}>{c.niveau}</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">{c.desc}</p>
                <div className="space-y-2">
                  <div className="p-2 bg-slate-800/50 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Organisme</p>
                    <p className="text-xs text-white font-bold">{c.org}</p>
                  </div>
                  <div className="p-2 bg-slate-800/50 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Prérequis</p>
                    <p className="text-xs text-white font-bold">{c.prerequis}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── QUIZ PRÉPARATION ── */}
      {tab === "quiz" && (
        <div className="animate-entrance">
          {/* Ref selector for quiz */}
          <div className="flex gap-2 flex-wrap mb-6">
            {REFERENTIELS.map(r => (
              <button key={r.id} onClick={() => { setActiveRef(r.id); resetQuiz(); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${activeRef === r.id ? "bg-indigo-600 text-white border-indigo-500" : "bg-slate-800/50 text-slate-400 border-slate-700"}`}>
                {r.icon} {r.label}
              </button>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            {!quizDone ? (
              <div className="space-y-6">
                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  <span>Quiz {ref.label}</span>
                  <span>Question {quizIdx + 1} / {quizQuestions.length}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${(quizIdx / quizQuestions.length) * 100}%`, backgroundColor: ref.color }} />
                </div>
                <div className="p-5 bg-slate-800/60 border border-slate-700 rounded-2xl">
                  <h4 className="text-lg font-bold text-white">{quizQuestions[quizIdx]?.q}</h4>
                </div>
                <div className="space-y-3">
                  {quizQuestions[quizIdx]?.opts.map((opt, i) => {
                    const revealed = answer !== null;
                    const isCorrect = i === quizQuestions[quizIdx].correct;
                    let cls = "border-slate-700 bg-slate-800/50 hover:border-indigo-500/50 text-slate-200";
                    if (revealed) {
                      if (isCorrect) cls = "border-emerald-500 bg-emerald-500/10 text-emerald-200";
                      else if (answer === i) cls = "border-red-500 bg-red-500/10 text-red-300 opacity-60";
                      else cls = "border-slate-800 bg-slate-900 text-slate-600 opacity-30";
                    }
                    return (
                      <button key={i} disabled={revealed} onClick={() => handleAnswer(i)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${cls}`}>
                        <span className="font-black mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                      </button>
                    );
                  })}
                </div>
                {answer !== null && (
                  <div className="flex justify-end pt-4 border-t border-slate-700/50">
                    <Btn onClick={nextQ}>{quizIdx >= quizQuestions.length - 1 ? "Voir résultat 🏆" : "Suivante ▶"}</Btn>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">{score === quizQuestions.length ? "🏆" : score >= quizQuestions.length / 2 ? "🥈" : "📚"}</div>
                <h2 className="text-2xl font-black text-white mb-2">
                  {score === quizQuestions.length ? "Score Parfait !" : score >= quizQuestions.length / 2 ? "Bon travail !" : "Révisez les fondamentaux"}
                </h2>
                <p className="text-slate-400 mb-6">Score : <span className="text-indigo-400 font-black text-xl">{score}/{quizQuestions.length}</span> — {ref.label}</p>
                <div className="flex gap-3 justify-center">
                  <Btn variant="ghost" onClick={resetQuiz}>🔄 Rejouer</Btn>
                  <Btn onClick={() => { const next = REFERENTIELS[(REFERENTIELS.findIndex(r => r.id === activeRef) + 1) % REFERENTIELS.length]; setActiveRef(next.id); resetQuiz(); }}>
                    Essayer {REFERENTIELS[(REFERENTIELS.findIndex(r => r.id === activeRef) + 1) % REFERENTIELS.length].label} →
                  </Btn>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
