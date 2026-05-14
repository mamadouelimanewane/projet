import React, { useState } from "react";
import { SectionHeader, Card, Btn, TooltipInfo } from "../ui";
import { useProject } from "./ProjectSelector";
import useStore from "../../store/useStore";
import { FileText, Download, BookOpen, GraduationCap, Award, ChevronRight, CheckCircle } from "lucide-react";

const SECTIONS_CONFIG = [
  { id: "resume", label: "Résumé Exécutif", icon: "📋", desc: "Synthèse du projet en une page", level: "Débutant" },
  { id: "contexte", label: "Contexte & Objectifs", icon: "🎯", desc: "Pourquoi ce projet ? Quels buts ?", level: "Débutant" },
  { id: "methodo", label: "Méthodologie", icon: "⚙️", desc: "Comment avons-nous travaillé ?", level: "Intermédiaire" },
  { id: "planning", label: "Planning & Jalons", icon: "📅", desc: "Chronologie et étapes clés", level: "Intermédiaire" },
  { id: "budget", label: "Analyse Budgétaire", icon: "💰", desc: "Finances et consommation", level: "Avancé" },
  { id: "risques", label: "Gestion des Risques", icon: "⚠️", desc: "Identification et atténuation", level: "Avancé" },
  { id: "kpis", label: "Indicateurs de Performance", icon: "📊", desc: "Mesure de la réussite", level: "Expert" },
  { id: "bilan", label: "Bilan & Capitalisation", icon: "🏆", desc: "Leçons apprises, archivage", level: "Expert" },
];

const LEVEL_COLORS = {
  "Débutant": { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  "Intermédiaire": { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  "Avancé": { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30" },
  "Expert": { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
};

const RapportUniversitaire = ({ data }) => {
  const { currentProject, projectData } = useProject();
  const proj = currentProject || (data?.projets?.[0]);
  const [selectedSections, setSelectedSections] = useState(["resume", "contexte", "planning", "budget"]);
  const [rapport, setRapport] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [niveau, setNiveau] = useState("intermediaire");
  const [activeTab, setActiveTab] = useState("config"); // config | preview

  const toggleSection = (id) => {
    setSelectedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const genererRapport = () => {
    setGenerating(true);
    setTimeout(() => {
      const taches = data?.taches || [];
      const jalons = data?.jalons || [];
      const budget = data?.budget || [];
      const risques = data?.risques || [];
      const couts = data?.couts || [];
      const totalBudgetP = budget.reduce((s, b) => s + (b.planifie || 0), 0);
      const totalBudgetR = budget.reduce((s, b) => s + (b.reel || 0), 0);
      const budgetPct = totalBudgetP > 0 ? Math.round(totalBudgetR / totalBudgetP * 100) : 0;
      const tachesFaites = taches.filter(t => t.statut === "Terminé" || t.statut === "Fait").length;
      const avancement = proj?.avancement || 0;

      setRapport({
        titre: `Rapport de Projet — ${proj?.nom || "Projet"}`,
        date: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
        auteur: proj?.chef || "Chef de Projet",
        sections: {
          resume: {
            titre: "1. Résumé Exécutif",
            contenu: `Le projet **${proj?.nom}** est actuellement en phase d'**${avancement < 30 ? "démarrage" : avancement < 70 ? "exécution" : "finalisation"}** avec un taux d'avancement global de **${avancement}%**.\n\nSur un budget total de **${(totalBudgetP/1000000).toFixed(1)} M FCFA**, la consommation actuelle atteint **${(totalBudgetR/1000000).toFixed(1)} M FCFA** (${budgetPct}%). Le projet compte **${taches.length} activités** dont **${tachesFaites} terminées**.\n\n${risques.filter(r => r.statut === "Actif").length > 0 ? `⚠️ ${risques.filter(r => r.statut === "Actif").length} risque(s) actif(s) nécessitent une attention immédiate.` : "✅ Aucun risque critique identifié à ce stade."}`,
          },
          contexte: {
            titre: "2. Contexte & Objectifs",
            contenu: `${proj?.description || "Projet stratégique"}\n\n**Chef de Projet :** ${proj?.chef}\n**Date de début :** ${proj?.debut ? new Date(proj.debut).toLocaleDateString('fr-FR') : 'N/D'}\n**Date de fin prévue :** ${proj?.fin ? new Date(proj.fin).toLocaleDateString('fr-FR') : 'N/D'}\n**Statut :** ${proj?.statut}\n\n**Objectifs stratégiques :**\n${taches.slice(0, 3).map(t => `- ${t.titre}`).join('\n')}`,
          },
          methodo: {
            titre: "3. Méthodologie",
            contenu: `La méthodologie appliquée est **Hybride** (combinaison de planification structurée Waterfall et d'agilité opérationnelle).\n\n**Principes directeurs :**\n- Découpage en phases séquentielles avec livrables clairs\n- Revues d'avancement hebdomadaires\n- Gestion des risques en continu\n- Documentation systématique des décisions\n\n**Outils utilisés :** Projet Élite (EVM, Gantt, Gestion des Risques, Suivi Budgétaire)`,
          },
          planning: {
            titre: "4. Planning & Jalons",
            contenu: jalons.length > 0
              ? jalons.map(j => `**${j.titre}** — ${j.date} → Statut : ${j.statut}`).join('\n\n')
              : "Aucun jalon défini pour ce projet.",
          },
          budget: {
            titre: "5. Analyse Budgétaire",
            contenu: `**Budget total alloué :** ${(totalBudgetP/1000000).toFixed(2)} M FCFA\n**Budget consommé :** ${(totalBudgetR/1000000).toFixed(2)} M FCFA (${budgetPct}%)\n**Solde disponible :** ${((totalBudgetP - totalBudgetR)/1000000).toFixed(2)} M FCFA\n\n**Répartition par catégorie :**\n${budget.map(b => `- **${b.categorie}** : Prévu ${(b.planifie/1000000).toFixed(1)}M — Réel ${(b.reel/1000000).toFixed(1)}M (${b.planifie > 0 ? Math.round(b.reel/b.planifie*100) : 0}%)`).join('\n')}`,
          },
          risques: {
            titre: "6. Gestion des Risques",
            contenu: risques.length > 0
              ? risques.map(r => `**Risque :** ${r.risque}\n- Score : ${r.gravite * r.probabilite}/25 | Gravité ${r.gravite}/5 × Probabilité ${r.probabilite}/5\n- Statut : ${r.statut}\n- Atténuation : ${r.attenuation}`).join('\n\n')
              : "Aucun risque identifié à ce stade du projet.",
          },
          kpis: {
            titre: "7. Indicateurs de Performance (KPIs)",
            contenu: `**SPI (Schedule Performance Index) :** ${(avancement / 50).toFixed(2)} — ${avancement > 50 ? "✅ En avance sur le planning" : "⚠️ Léger retard"}\n**CPI (Cost Performance Index) :** ${budgetPct < 90 ? "✅ Budget maîtrisé" : "⚠️ Dépassement budgétaire probable"}\n**Taux de complétion :** ${taches.length > 0 ? Math.round(tachesFaites/taches.length*100) : 0}%\n**Avancement physique :** ${avancement}%`,
          },
          bilan: {
            titre: "8. Bilan & Capitalisation des Connaissances",
            contenu: `**Leçons apprises :**\n- L'anticipation des risques dès la phase d'initiation réduit significativement les surcoûts.\n- La communication régulière avec les parties prenantes est essentielle.\n- La décomposition fine des activités (WBS) améliore la précision des estimations.\n\n**Actions d'archivage :**\n- [ ] Clôturer tous les bons de commande\n- [ ] Archiver la documentation technique\n- [ ] Conduire une réunion de retour d'expérience (Rex)\n- [ ] Transférer les connaissances à l'équipe suivante\n\n**Rapport généré le :** ${new Date().toLocaleDateString('fr-FR')} via Projet Élite`,
          },
        }
      });
      setGenerating(false);
      setActiveTab("preview");
    }, 1500);
  };

  const exportTxt = () => {
    if (!rapport) return;
    let text = `${rapport.titre}\n${"=".repeat(60)}\nDate : ${rapport.date}\nAuteur : ${rapport.auteur}\n\n`;
    selectedSections.forEach(sid => {
      const s = rapport.sections[sid];
      if (!s) return;
      text += `${s.titre}\n${"-".repeat(40)}\n${s.contenu.replace(/\*\*/g, '')}\n\n`;
    });
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rapport_${(proj?.nom || 'projet').replace(/ /g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  };

  const renderMarkdown = (text) => {
    return text.split('\n').map((line, i) => {
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (line.startsWith('- [ ]')) return <li key={i} className="flex items-center gap-2 ml-4 text-slate-400 text-sm"><span className="w-4 h-4 rounded border border-slate-600 inline-block flex-shrink-0" /><span dangerouslySetInnerHTML={{ __html: line.substring(5) }} /></li>;
      if (line.startsWith('- ')) return <li key={i} className="ml-4 text-slate-300 text-sm list-disc" dangerouslySetInnerHTML={{ __html: line.substring(2) }} />;
      if (line.startsWith('#')) return <h4 key={i} className="text-white font-bold mt-4 mb-1 text-sm">{line.replace(/^#+\s/, '')}</h4>;
      return <p key={i} className="text-sm text-slate-300 mb-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }} />;
    });
  };

  return (
    <div className="space-y-6 animate-entrance max-w-5xl mx-auto">
      <SectionHeader
        title={<span className="flex items-center gap-3">📄 Rapport Universitaire <TooltipInfo term="Rapport de Projet" definition="Document structuré synthétisant la vie d'un projet : objectifs, méthodes, résultats et leçons apprises. Requis dans tous les cursus de gestion de projet (PMP, Prince2, MBA)." /></span>}
        subtitle="Génération automatique d'un mémoire de projet pour universités et professionnels"
        action={
          rapport && (
            <Btn onClick={exportTxt} variant="success" size="sm">
              <Download className="w-4 h-4" /> Exporter .txt
            </Btn>
          )
        }
      />

      {/* Niveau badge */}
      <div className="flex gap-2 flex-wrap">
        {["debutant", "intermediaire", "avance", "expert"].map(n => (
          <button
            key={n}
            onClick={() => setNiveau(n)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${niveau === n ? "bg-indigo-600 text-white border-indigo-500" : "bg-slate-800/50 text-slate-400 border-slate-700 hover:border-indigo-500/40"}`}
          >
            {n === "debutant" ? "🌱 Débutant" : n === "intermediaire" ? "📘 Intermédiaire" : n === "avance" ? "🔥 Avancé" : "🎓 Expert"}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-slate-800 pb-4">
        <Btn variant={activeTab === "config" ? "primary" : "ghost"} size="sm" onClick={() => setActiveTab("config")}>
          <BookOpen className="w-4 h-4" /> Configuration
        </Btn>
        <Btn variant={activeTab === "preview" ? "primary" : "ghost"} size="sm" onClick={() => setActiveTab("preview")} disabled={!rapport}>
          <FileText className="w-4 h-4" /> Prévisualiser le Rapport
        </Btn>
      </div>

      {/* CONFIG TAB */}
      {activeTab === "config" && (
        <div className="space-y-6 animate-entrance">
          {/* Projet info */}
          <Card className="p-6 bg-indigo-600/5 border border-indigo-500/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                {proj?.nom?.charAt(0) || "P"}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{proj?.nom || "Aucun projet sélectionné"}</h3>
                <p className="text-sm text-slate-400">{proj?.chef} · Avancement : <span className="text-indigo-400 font-bold">{proj?.avancement || 0}%</span></p>
                <p className="text-xs text-slate-500 mt-1">{proj?.description}</p>
              </div>
            </div>
          </Card>

          {/* Section selector */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Sections à inclure dans le rapport</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SECTIONS_CONFIG.map(sec => {
                const lc = LEVEL_COLORS[sec.level];
                const selected = selectedSections.includes(sec.id);
                return (
                  <button
                    key={sec.id}
                    onClick={() => toggleSection(sec.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${selected ? "border-indigo-500 bg-indigo-500/10" : "border-slate-700/50 bg-slate-900/50 hover:border-slate-600"}`}
                  >
                    <span className="text-2xl flex-shrink-0">{sec.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-white">{sec.label}</span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${lc.bg} ${lc.text} ${lc.border}`}>{sec.level}</span>
                      </div>
                      <p className="text-xs text-slate-500">{sec.desc}</p>
                    </div>
                    {selected && <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pédagogie note */}
          <Card className="p-5 bg-emerald-500/5 border border-emerald-500/20">
            <div className="flex items-start gap-3">
              <GraduationCap className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-emerald-300 mb-1">💡 Note Pédagogique</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Un rapport de projet est un <strong className="text-white">livrable clé</strong> dans tous les référentiels (PMBOK, Prince2, ISO 21500). Il permet de <strong className="text-white">tracer la vie du projet</strong>, de justifier les décisions prises, et de transmettre les apprentissages aux équipes futures. C'est aussi un <strong className="text-white">outil d'évaluation académique</strong> reconnu dans les écoles d'ingénieurs et les MBA.
                </p>
              </div>
            </div>
          </Card>

          <div className="flex justify-center">
            <Btn size="lg" onClick={genererRapport} disabled={generating || selectedSections.length === 0}>
              {generating ? (
                <><span className="animate-spin">⚙️</span> Génération en cours...</>
              ) : (
                <><FileText className="w-5 h-5" /> Générer le Rapport ({selectedSections.length} sections)</>
              )}
            </Btn>
          </div>
        </div>
      )}

      {/* PREVIEW TAB */}
      {activeTab === "preview" && rapport && (
        <div className="space-y-6 animate-entrance">
          {/* Cover page */}
          <Card className="p-8 bg-gradient-to-br from-indigo-600/10 via-slate-900 to-purple-600/10 border border-indigo-500/30 text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-4">
              <Award className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">{rapport.titre}</h1>
            <p className="text-slate-400 text-sm mb-1">Rédigé par : <span className="text-indigo-400 font-bold">{rapport.auteur}</span></p>
            <p className="text-slate-500 text-xs">Généré le {rapport.date} · Projet Élite™</p>
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              {selectedSections.map(sid => {
                const s = SECTIONS_CONFIG.find(sc => sc.id === sid);
                return s ? (
                  <span key={sid} className="text-[10px] px-2 py-1 bg-slate-800 rounded-full text-slate-400 border border-slate-700">{s.icon} {s.label}</span>
                ) : null;
              })}
            </div>
          </Card>

          {/* Sections */}
          {selectedSections.map(sid => {
            const section = rapport.sections[sid];
            const secConfig = SECTIONS_CONFIG.find(s => s.id === sid);
            if (!section) return null;
            const lc = LEVEL_COLORS[secConfig?.level || "Débutant"];
            return (
              <Card key={sid} className="p-6">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-700/50">
                  <span className="text-2xl">{secConfig?.icon}</span>
                  <div>
                    <h2 className="text-xl font-black text-white">{section.titre}</h2>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${lc.bg} ${lc.text} ${lc.border}`}>{secConfig?.level}</span>
                  </div>
                </div>
                <div className="space-y-1 pl-2 border-l-2 border-indigo-500/20">
                  {renderMarkdown(section.contenu)}
                </div>
              </Card>
            );
          })}

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <p className="text-xs text-slate-600">Rapport généré automatiquement par Projet Élite™ — Outil de Gestion de Projet</p>
            <div className="flex gap-2">
              <Btn variant="ghost" size="sm" onClick={() => setActiveTab("config")}>◀ Modifier</Btn>
              <Btn variant="success" size="sm" onClick={exportTxt}>
                <Download className="w-4 h-4" /> Télécharger
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RapportUniversitaire;
