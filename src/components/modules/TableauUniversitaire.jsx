import React, { useState, useMemo } from "react";
import { SectionHeader, Card, Btn, TooltipInfo, ProgressBar } from "../ui";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";
import useStore from "../../store/useStore";

const COMPETENCES_PMI = [
  { id: "tech", label: "Technique", desc: "Planification, budget, risques, CPM, EVM", poids: 35 },
  { id: "leader", label: "Leadership", desc: "Communication, motivation, négociation", poids: 35 },
  { id: "strat", label: "Stratégie", desc: "Alignement business, gouvernance, bénéfices", poids: 30 },
];

const PARCOURS_MODULES = [
  { id: "guide", label: "Guide Débutant", categorie: "Fondamentaux", competence: "tech", points: 10 },
  { id: "certifications", label: "Référentiels & Certifications", categorie: "Fondamentaux", competence: "strat", points: 15 },
  { id: "nouveau-projet", label: "Création de Projet (Wizard)", categorie: "Pratique", competence: "tech", points: 10 },
  { id: "taches", label: "Gestion des Tâches", categorie: "Pratique", competence: "tech", points: 10 },
  { id: "gantt", label: "Diagramme de Gantt", categorie: "Pratique", competence: "tech", points: 15 },
  { id: "risques", label: "Registre des Risques", categorie: "Pratique", competence: "tech", points: 10 },
  { id: "budget", label: "Suivi Budgétaire", categorie: "Pratique", competence: "tech", points: 10 },
  { id: "outils-expert", label: "CPM / RACI / S-Curve", categorie: "Expert", competence: "tech", points: 20 },
  { id: "evm", label: "Valeur Acquise (EVM)", categorie: "Expert", competence: "tech", points: 20 },
  { id: "rapport-universitaire", label: "Rapport de Projet", categorie: "Académique", competence: "strat", points: 15 },
  { id: "stakeholders", label: "Parties Prenantes", categorie: "Leadership", competence: "leader", points: 15 },
  { id: "kanban", label: "Kanban Board", categorie: "Pratique", competence: "leader", points: 10 },
  { id: "sentiment", label: "Santé & Moral Équipe", categorie: "Leadership", competence: "leader", points: 10 },
  { id: "geniecivil", label: "Génie Civil BTP", categorie: "Spécialisation", competence: "tech", points: 15 },
];

const BADGES = [
  { seuil: 0, label: "Novice", icon: "🌱", color: "#94a3b8" },
  { seuil: 30, label: "Apprenti PM", icon: "📗", color: "#10b981" },
  { seuil: 60, label: "Praticien", icon: "📘", color: "#6366f1" },
  { seuil: 100, label: "Professionnel", icon: "🔥", color: "#f59e0b" },
  { seuil: 150, label: "Expert Certifié", icon: "🏆", color: "#ec4899" },
  { seuil: 200, label: "Maître PM", icon: "💎", color: "#8b5cf6" },
];

const SCENARIOS = [
  {
    id: 1, titre: "Le Client Change d'Avis", difficulte: "Facile", points: 10, categorie: "Périmètre",
    contexte: "À 80% d'avancement, le client demande de refaire l'interface. Budget déjà consommé à 75%.",
    options: [
      { texte: "Accepter sans conditions", score: 0, feedback: "Erreur classique : burnout équipe + perte financière." },
      { texte: "Évaluer l'impact et proposer un avenant", score: 10, feedback: "✅ Parfait : Change Request formelle avec estimation d'impact." },
      { texte: "Refuser catégoriquement", score: 3, feedback: "Trop rigide. Proposez une alternative chiffrée." },
    ]
  },
  {
    id: 2, titre: "Retard Fournisseur Critique", difficulte: "Moyen", points: 15, categorie: "Risques",
    contexte: "Le fournisseur de ciment accuse 3 semaines de retard. Le gros œuvre est sur le chemin critique.",
    options: [
      { texte: "Attendre et espérer", score: 0, feedback: "Passivité mortelle. 3 semaines = 15% de retard projet." },
      { texte: "Activer un fournisseur alternatif + crash planning", score: 15, feedback: "✅ Excellente réponse : mitigation + compression du planning." },
      { texte: "Reporter le jalon sans prévenir le client", score: 2, feedback: "Manque de transparence. Le client découvrira trop tard." },
    ]
  },
  {
    id: 3, titre: "Conflit dans l'Équipe", difficulte: "Difficile", points: 20, categorie: "Leadership",
    contexte: "Deux membres seniors refusent de collaborer. La productivité chute de 40%.",
    options: [
      { texte: "Ignorer et laisser le temps arranger les choses", score: 0, feedback: "L'évitement aggrave le conflit. Agissez vite." },
      { texte: "Imposer une solution par autorité", score: 5, feedback: "Résout le symptôme, pas la cause. Risque de démission." },
      { texte: "Médiation structurée avec objectifs communs", score: 20, feedback: "✅ Leadership situationnel. Identifiez la cause, alignez sur la mission." },
    ]
  },
];

export default function TableauUniversitaire() {
  const { data, universityModules, setUniversityData } = useStore();
  const [tab, setTab] = useState("progression");
  const [scenarioActif, setScenarioActif] = useState(null);
  const [scenarioReponse, setScenarioReponse] = useState(null);
  const [scenarioScore, setScenarioScore] = useState(0);
  const [etudiant] = useState({ nom: data.projets?.[0]?.chef || "Étudiant", promo: "Promotion 2026" });

  const totalPoints = useMemo(() =>
    PARCOURS_MODULES.filter(m => universityModules.includes(m.id)).reduce((s, m) => s + m.points, 0),
    [universityModules]
  );

  const setModulesValides = (newModules) => {
    const pts = PARCOURS_MODULES.filter(m => newModules.includes(m.id)).reduce((s, m) => s + m.points, 0);
    setUniversityData(newModules, pts);
  };

  const badge = useMemo(() =>
    [...BADGES].reverse().find(b => totalPoints >= b.seuil) || BADGES[0],
    [totalPoints]
  );

  const maxPoints = PARCOURS_MODULES.reduce((s, m) => s + m.points, 0);
  const progressPct = Math.round((totalPoints / maxPoints) * 100);

  const radarData = useMemo(() =>
    COMPETENCES_PMI.map(c => {
      const modules = PARCOURS_MODULES.filter(m => m.competence === c.id);
      const valides = modules.filter(m => universityModules.includes(m.id));
      const maxPts = modules.reduce((s, m) => s + m.points, 0);
      const pts = valides.reduce((s, m) => s + m.points, 0);
      return { subject: c.label, score: maxPts > 0 ? Math.round((pts / maxPts) * 100) : 0, fullMark: 100 };
    }),
    [universityModules]
  );

  const categories = [...new Set(PARCOURS_MODULES.map(m => m.categorie))];

  const handleScenarioAnswer = (optIdx) => {
    if (scenarioReponse !== null) return;
    setScenarioReponse(optIdx);
    setScenarioScore(s => s + SCENARIOS[scenarioActif].options[optIdx].score);
  };

  const handleModuleToggle = (id) => {
    const done = universityModules.includes(id);
    const newModules = done ? universityModules.filter(x => x !== id) : [...universityModules, id];
    setModulesValides(newModules);
  };

  return (
    <div className="space-y-6 animate-entrance max-w-5xl mx-auto">
      <SectionHeader
        title={<>🎓 Espace Universitaire <TooltipInfo term="PMI Talent Triangle" definition="Modèle du PMI structurant les compétences en 3 axes : Technique, Leadership, Stratégie. Base de toute certification PMP." /></>}
        subtitle="Suivi de progression, portfolio de compétences et simulations de terrain"
      />

      <div className="flex gap-2 flex-wrap border-b border-slate-800 pb-4">
        {[
          { id: "progression", label: "📊 Progression" },
          { id: "parcours", label: "📋 Parcours Modules" },
          { id: "simulation", label: "🎮 Simulation Terrain" },
        ].map(t => (
          <Btn key={t.id} variant={tab === t.id ? "primary" : "ghost"} size="sm" onClick={() => setTab(t.id)}>{t.label}</Btn>
        ))}
      </div>

      {/* ── PROGRESSION ── */}
      {tab === "progression" && (
        <div className="space-y-6 animate-entrance">
          {/* Student card */}
          <Card className="p-6 bg-gradient-to-br from-indigo-600/10 via-slate-900 to-purple-600/10 border border-indigo-500/30">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-3xl">{badge.icon}</div>
              <div className="flex-1">
                <h2 className="text-xl font-black text-white">{etudiant.nom}</h2>
                <p className="text-xs text-slate-400">{etudiant.promo} · Rang : <span style={{ color: badge.color }} className="font-bold">{badge.label}</span></p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1"><ProgressBar value={progressPct} color={badge.color} /></div>
                  <span className="text-sm font-black" style={{ color: badge.color }}>{totalPoints}/{maxPoints} pts</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Radar PMI */}
            <Card className="p-6">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">PMI Talent Triangle</p>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }} />
                  <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            {/* Badges earned */}
            <Card className="p-6">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Badges Obtenus</p>
              <div className="grid grid-cols-3 gap-3">
                {BADGES.map(b => {
                  const earned = totalPoints >= b.seuil;
                  return (
                    <div key={b.seuil} className={`p-3 rounded-xl text-center border-2 transition-all ${earned ? "border-indigo-500/50 bg-indigo-500/10" : "border-slate-800 bg-slate-900/50 opacity-40"}`}>
                      <span className="text-2xl block mb-1">{b.icon}</span>
                      <p className="text-[10px] font-bold" style={{ color: earned ? b.color : "#475569" }}>{b.label}</p>
                      <p className="text-[9px] text-slate-600">{b.seuil} pts</p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Modules Validés", value: `${modulesValides.length}/${PARCOURS_MODULES.length}`, color: "#10b981" },
              { label: "Score Total", value: `${totalPoints} pts`, color: "#6366f1" },
              { label: "Simulations", value: `${scenarioScore} pts`, color: "#f59e0b" },
              { label: "Prochain Badge", value: BADGES.find(b => b.seuil > totalPoints)?.label || "Max!", color: "#ec4899" },
            ].map((s, i) => (
              <Card key={i} className="p-4 text-center">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">{s.label}</p>
                <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── PARCOURS ── */}
      {tab === "parcours" && (
        <div className="space-y-6 animate-entrance">
          <p className="text-sm text-slate-400">Validez les modules en cliquant dessus. Chaque module rapporte des points dans une compétence du PMI Talent Triangle.</p>
          {categories.map(cat => (
            <div key={cat}>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">{cat}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PARCOURS_MODULES.filter(m => m.categorie === cat).map(m => {
                  const done = universityModules.includes(m.id);
                  const comp = COMPETENCES_PMI.find(c => c.id === m.competence);
                  return (
                    <button key={m.id} onClick={() => handleModuleToggle(m.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${done ? "border-emerald-500 bg-emerald-500/10" : "border-slate-700/50 bg-slate-900/50 hover:border-slate-600"}`}>
                      <span className="text-xl">{done ? "✅" : "○"}</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">{m.label}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{comp?.label}</span>
                          <span className="text-[9px] font-bold text-slate-500">+{m.points} pts</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── SIMULATION ── */}
      {tab === "simulation" && (
        <div className="space-y-6 animate-entrance">
          {scenarioActif === null ? (
            <>
              <p className="text-sm text-slate-400">Mettez-vous dans la peau d'un chef de projet face à des situations réelles. Score cumulé : <span className="text-indigo-400 font-bold">{scenarioScore} pts</span></p>
              <div className="space-y-4">
                {SCENARIOS.map((s, i) => (
                  <button key={s.id} onClick={() => { setScenarioActif(i); setScenarioReponse(null); }}
                    className="w-full glass-card rounded-2xl p-5 text-left hover:border-indigo-500/50 transition-all border border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-black text-white">{s.titre}</h3>
                      <div className="flex gap-2">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${s.difficulte === "Facile" ? "bg-emerald-500/10 text-emerald-400" : s.difficulte === "Moyen" ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`}>{s.difficulte}</span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400">+{s.points} pts</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">{s.contexte}</p>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-white">{SCENARIOS[scenarioActif].titre}</h3>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{SCENARIOS[scenarioActif].categorie}</span>
              </div>
              <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-xl mb-6">
                <p className="text-sm text-slate-300">{SCENARIOS[scenarioActif].contexte}</p>
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Votre décision :</p>
              <div className="space-y-3">
                {SCENARIOS[scenarioActif].options.map((opt, i) => {
                  const revealed = scenarioReponse !== null;
                  const isSelected = scenarioReponse === i;
                  const isBest = opt.score === Math.max(...SCENARIOS[scenarioActif].options.map(o => o.score));
                  let cls = "border-slate-700 bg-slate-800/50 hover:border-indigo-500/50 text-slate-200";
                  if (revealed) {
                    if (isBest) cls = "border-emerald-500 bg-emerald-500/10 text-emerald-200";
                    else if (isSelected) cls = "border-red-500 bg-red-500/10 text-red-300 opacity-70";
                    else cls = "border-slate-800 bg-slate-900 text-slate-600 opacity-30";
                  }
                  return (
                    <div key={i}>
                      <button disabled={revealed} onClick={() => handleScenarioAnswer(i)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${cls}`}>
                        <span className="font-black mr-2">{String.fromCharCode(65 + i)}.</span>{opt.texte}
                      </button>
                      {revealed && (isSelected || isBest) && (
                        <div className={`mt-1 p-3 rounded-xl text-xs animate-entrance ${isBest ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30" : "bg-red-500/20 text-red-200 border border-red-500/30"}`}>
                          {opt.feedback} <span className="font-bold ml-1">(+{opt.score} pts)</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {scenarioReponse !== null && (
                <div className="flex justify-between pt-4 mt-4 border-t border-slate-700/50">
                  <Btn variant="ghost" size="sm" onClick={() => { setScenarioActif(null); setScenarioReponse(null); }}>◀ Liste des scénarios</Btn>
                  {scenarioActif < SCENARIOS.length - 1 && (
                    <Btn size="sm" onClick={() => { setScenarioActif(a => a + 1); setScenarioReponse(null); }}>Scénario suivant ▶</Btn>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
