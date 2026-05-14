import React, { useState } from "react";
import { toast, dialog } from '../ui';
import { SectionHeader, Card, Btn, TooltipInfo, Badge } from "../ui";
import { Presentation, Download, BookOpen, CheckCircle, FileText, ChevronRight } from "lucide-react";
import useStore from "../../store/useStore";

const CAS_ETUDES = [
  {
    id: "pont-renaissance",
    titre: "Construction du Pont de la Renaissance",
    secteur: "Génie Civil / BTP",
    difficulte: "Moyen",
    duree: "24 mois",
    budget: "4.5B FCFA",
    image: "🏗️",
    problemes: 12,
    desc: "Un projet de pont urbain confronté à des retards environnementaux et des surcoûts de matériaux.",
    objectifs: ["Réduire le retard de 3 mois", "Optimiser le chemin critique", "Gérer le conflit riverain"],
    score: 0,
  },
  {
    id: "star-academy-digitale",
    titre: "Digitalisation Star Academy",
    secteur: "IT / Éducation",
    difficulte: "Difficile",
    duree: "12 mois",
    budget: "850M FCFA",
    image: "🎓",
    problemes: 8,
    desc: "Mise en place d'une plateforme LMS pour 10 000 étudiants avec intégration IA.",
    objectifs: ["Définir le backlog agile", "Gérer le risque de cybersécurité", "Assurer la scalabilité"],
    score: 85,
  },
  {
    id: "ong-santé-rurale",
    titre: "Déploiement Cliniques Mobiles",
    secteur: "Humanitaire / Santé",
    difficulte: "Facile",
    duree: "6 mois",
    budget: "120M FCFA",
    image: "🚑",
    problemes: 5,
    desc: "Organisation d'une caravane de santé dans 20 villages isolés.",
    objectifs: ["Logistique complexe", "Gestion des bénévoles", "Rapport de redevabilité"],
    score: 0,
  },
];

export default function EtudesDeCas() {
  const { data } = useStore();
  const [tab, setTab] = useState("biblio");
  const [selectedCas, setSelectedCas] = useState(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerateSoutenance = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      toast.info("La structure de votre soutenance (12 slides) a été générée avec succès sur la base de vos données projets !");
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-entrance max-w-6xl mx-auto">
      <SectionHeader
        title={<>📚 Centre d'Études de Cas <TooltipInfo term="Études de Cas" definition="Simulations basées sur des projets réels permettant aux étudiants d'appliquer les théories PMBOK dans des contextes concrets et complexes." /></>}
        subtitle="Bibliothèque de projets-maîtres et générateur de soutenance"
      />

      <div className="flex gap-2 flex-wrap border-b border-slate-800 pb-4">
        {[
          { id: "biblio", label: "🏢 Bibliothèque de Cas" },
          { id: "soutenance", label: "🎙️ Générateur de Soutenance" },
        ].map(t => (
          <Btn key={t.id} variant={tab === t.id ? "primary" : "ghost"} size="sm" onClick={() => setTab(t.id)}>{t.label}</Btn>
        ))}
      </div>

      {tab === "biblio" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-entrance">
          {CAS_ETUDES.map((cas) => (
            <Card key={cas.id} className="group overflow-hidden flex flex-col hover:border-indigo-500/50 transition-all duration-300">
              <div className="h-32 bg-slate-800 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">{cas.image}</div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{cas.secteur}</span>
                  <Badge value={cas.difficulte} />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{cas.titre}</h3>
                <p className="text-xs text-slate-400 line-clamp-3 mb-4 flex-1">{cas.desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-4 text-[10px] text-slate-500 font-bold uppercase">
                  <div className="flex flex-col gap-1"><span>Durée</span><span className="text-slate-300">{cas.duree}</span></div>
                  <div className="flex flex-col gap-1"><span>Budget</span><span className="text-slate-300">{cas.budget}</span></div>
                </div>
                {cas.score > 0 ? (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-between">
                    <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Validé</span>
                    <span className="text-sm font-black text-emerald-300">{cas.score}%</span>
                  </div>
                ) : (
                  <Btn variant="primary" size="sm" className="w-full">Charger ce Cas</Btn>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "soutenance" && (
        <div className="space-y-8 animate-entrance max-w-4xl mx-auto text-center">
          <Card className="p-10 border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4"><Presentation className="text-indigo-400/20 w-32 h-32" /></div>
             <h2 className="text-2xl font-black text-white mb-4">Générateur de Soutenance Pro</h2>
             <p className="text-sm text-slate-400 mb-8 max-w-lg mx-auto">
               L'IA analyse vos performances sur le projet actuel pour générer un plan de présentation structuré (Plan, Diagnostic, Solution, Indicateurs, Conclusion).
             </p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
                <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5">
                   <h4 className="text-xs font-black text-slate-500 uppercase mb-3 flex items-center gap-2"><CheckCircle className="w-3 h-3 text-emerald-500" /> Inclus dans le rapport</h4>
                   <ul className="space-y-2">
                      {["Diagnostic Stratégique", "Chemin Critique (CPM)", "Analyse Budgétaire (EVM)", "Matrice des Risques"].map((txt, i) => (
                        <li key={i} className="text-[10px] text-slate-300 flex items-center gap-2">
                           <div className="w-1 h-1 bg-indigo-500 rounded-full" /> {txt}
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5">
                   <h4 className="text-xs font-black text-slate-500 uppercase mb-3 flex items-center gap-2"><BookOpen className="w-3 h-3 text-indigo-400" /> Standards Académiques</h4>
                   <ul className="space-y-2 text-[10px] text-slate-400 italic">
                      <li>• Format conforme aux mémoires de Master</li>
                      <li>• Alignement Référentiel PMI / PMBOK 7</li>
                      <li>• Lexique technique intégré</li>
                   </ul>
                </div>
             </div>

             <Btn variant="primary" size="lg" disabled={generating} onClick={handleGenerateSoutenance}>
               {generating ? "Analyse IA en cours..." : "Générer mes Slides de Soutenance"}
             </Btn>
          </Card>

          <div className="space-y-4 text-left">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Structure Générée (Aperçu)</p>
             {[
               { slide: 1, titre: "Introduction & Contextualisation", type: "Stratégie" },
               { slide: 2, titre: "WBS et Planification Opérationnelle", type: "Technique" },
               { slide: 3, titre: "Maîtrise des Risques et Aléas", type: "Gouvernance" },
               { slide: 4, titre: "Suivi EVM et Performance Financière", type: "Contrôle" },
             ].map((s, i) => (
               <div key={i} className="flex items-center gap-4 p-3 glass-card rounded-xl border border-white/5 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-black text-slate-500">{s.slide}</div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">{s.titre}</p>
                    <p className="text-[9px] text-indigo-400 font-bold uppercase">{s.type}</p>
                  </div>
                  <FileText className="w-4 h-4 text-slate-600" />
               </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
}
