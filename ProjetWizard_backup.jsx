import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";
import { Btn, SectionHeader } from "../ui";

const PROJECT_TYPES = [
  { id: "btp", label: "🏗️ BTP / Génie Civil", desc: "Construction, infrastructure, travaux publics" },
  { id: "it", label: "💻 Informatique / Digital", desc: "Application, site web, système d'information" },
  { id: "formation", label: "🎓 Formation / Académique", desc: "Académie, université, programme éducatif" },
  { id: "ong", label: "🌍 ONG / Humanitaire", desc: "Projet social, développement communautaire" },
  { id: "industriel", label: "🏭 Industriel", desc: "Production, maintenance, process industriel" },
  { id: "evenement", label: "🎬 Événementiel", desc: "Conférence, festival, cérémonie" },
];

const METHODOLOGIES = [
  { id: "hybride", label: "⚖️ Hybride", desc: "Recommandé pour la plupart des projets — planification solide + flexibilité." },
  { id: "agile", label: "↻ Agile / Scrum", desc: "Idéal pour les projets digitaux avec périmètre évolutif." },
  { id: "waterfall", label: "▬ Cascade", desc: "Adapté aux projets BTP où les phases sont séquentielles." },
  { id: "prince2", label: "⛨ PRINCE2", desc: "Gouvernance stricte pour grands programmes institutionnels." },
];

const TEMPLATES = {
  btp: { taches: ["Étude préalable", "Étude technique & financière", "Permis de construire", "Gros œuvre", "Second œuvre", "Réception & livraison"], risques: ["Retard approvisionnement", "Dépassement budgétaire", "Intempéries"], jalons: ["Fin fondations", "Mise hors d'eau", "Réception provisoire"] },
  it: { taches: ["Cahier des charges", "Architecture système", "Développement Backend", "Développement Frontend", "Tests & QA", "Déploiement production"], risques: ["Dettes techniques", "Changement de périmètre", "Perte de développeur clé"], jalons: ["Validation UX/UI", "Recette utilisateurs", "Go Live"] },
  formation: { taches: ["Étude préalable", "Ingénierie pédagogique", "Recrutement formateurs", "Développement modules", "Recrutement apprenants", "Certification"], risques: ["Manque d'apprenants", "Qualité pédagogique insuffisante"], jalons: ["Accréditation", "Première promotion", "Diplômation"] },
  ong: { taches: ["Identification des bénéficiaires", "Mobilisation des fonds", "Mise en œuvre terrain", "Suivi & évaluation", "Rapport bailleur"], risques: ["Insécurité terrain", "Retrait bailleur", "Problèmes logistiques"], jalons: ["Démarrage opérationnel", "Rapport mi-parcours", "Clôture"] },
  industriel: { taches: ["Analyse de process", "Conception technique", "Acquisition équipements", "Installation & tests", "Formation opérateurs", "Mise en production"], risques: ["Pannes équipements", "Délais fournisseurs"], jalons: ["FAT (Factory Acceptance Test)", "SAT (Site Acceptance Test)", "Production nominale"] },
  evenement: { taches: ["Concept & budget", "Recherche de sponsors", "Logistique & lieu", "Communication", "Jour J", "Bilan post-événement"], risques: ["Annulation intervenants", "Météo", "Affluence insuffisante"], jalons: ["Confirmation lieu", "Ouverture inscriptions", "Clôture"] },
};

const ETAPES = [
  { id: "type", title: "Type de Projet", icon: "🎯", desc: "Choisissez la nature de votre projet" },
  { id: "infos", title: "Informations de Base", icon: "📝", desc: "Nom, description et équipe" },
  { id: "methodo", title: "Méthodologie", icon: "⚙️", desc: "Comment allez-vous travailler ?" },
  { id: "budget", title: "Budget & Calendrier", icon: "💰", desc: "Contraintes financières et temporelles" },
  { id: "risques", title: "Risques Initiaux", icon: "⚠️", desc: "Anticipez les obstacles" },
  { id: "resume", title: "Récapitulatif", icon: "✅", desc: "Validez et lancez votre projet" },
];

export default function ProjetWizard() {
  const navigate = useNavigate();
  const { updateData, data, userMode } = useStore();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    type: "", nom: "", description: "", chef: "", statut: "En cours",
    methodo: "hybride", budget: "", budgetDevise: "FCFA",
    debut: "", fin: "", avancement: 0,
    risquesSelectionnes: [],
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const template = TEMPLATES[form.type] || {};
  const progress = Math.round(((step + 1) / ETAPES.length) * 100);

  const lancerProjet = () => {
    const id = `proj-${Date.now()}`;
    const budgetNum = parseFloat(form.budget) || 0;
    const newProjet = {
      id, nom: form.nom, chef: form.chef, statut: form.statut,
      avancement: 0, budget: budgetNum * 1000000, budgetReel: 0,
      debut: form.debut, fin: form.fin, description: form.description,
      methodologie: form.methodo, type: form.type,
    };
    const nouvellesToches = (template.taches || []).map((t, i) => ({
      id: Date.now() + i, projet: form.nom, titre: t,
      responsable: form.chef, statut: "À faire", priorite: "Moyenne",
    }));
    const nouveauxJalons = (template.jalons || []).map((j, i) => ({
      id: Date.now() + 100 + i, projet: form.nom, titre: j,
      date: form.fin || "", statut: "Planifié",
    }));
    const nouveauxRisques = form.risquesSelectionnes.map((r, i) => ({
      id: Date.now() + 200 + i, projet: form.nom, risque: r,
      gravite: 3, probabilite: 2, statut: "Actif", attenuation: "À définir",
    }));
    updateData("projets", [...(data.projets || []), newProjet]);
    updateData("taches", [...(data.taches || []), ...nouvellesToches]);
    updateData("jalons", [...(data.jalons || []), ...nouveauxJalons]);
    updateData("risques", [...(data.risques || []), ...nouveauxRisques]);
    navigate("/dashboard");
  };

  const canNext = () => {
    if (step === 0) return !!form.type;
    if (step === 1) return form.nom.trim().length > 2 && form.chef.trim().length > 1;
    if (step === 3) return form.budget && form.debut && form.fin;
    return true;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-entrance">
      <SectionHeader
        title="🚀 Créer un Nouveau Projet"
        subtitle={userMode === "debutant" ? "Suivez les étapes — nous vous guidons à chaque point" : "Wizard de création rapide"}
      />

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          <span>Étape {step + 1} / {ETAPES.length}</span>
          <span>{ETAPES[step].icon} {ETAPES[step].title}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Étape navigation mini */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {ETAPES.map((e, i) => (
          <div key={i} className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${i === step ? "bg-indigo-600 text-white" : i < step ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"}`}>
            <span>{e.icon}</span>
            <span className="hidden md:inline">{e.title}</span>
          </div>
        ))}
      </div>

      {/* STEP CONTENT */}
      <div className="glass-card rounded-2xl p-8 min-h-[380px] flex flex-col">
        <h2 className="text-xl font-black text-white mb-1">{ETAPES[step].title}</h2>
        <p className="text-sm text-slate-400 mb-6">{ETAPES[step].desc}</p>

        {/* STEP 0 — Type */}
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROJECT_TYPES.map(t => (
              <button key={t.id} onClick={() => set("type", t.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${form.type === t.id ? "border-indigo-500 bg-indigo-500/10" : "border-slate-700/50 hover:border-slate-600 bg-slate-900/50"}`}>
                <p className="font-bold text-white text-sm">{t.label}</p>
                <p className="text-xs text-slate-500 mt-1">{t.desc}</p>
              </button>
            ))}
          </div>
        )}

        {/* STEP 1 — Infos */}
        {step === 1 && (
          <div className="space-y-4 flex-1">
            <div className="space-y-1.5">
              <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Nom du Projet *</label>
              <input value={form.nom} onChange={e => set("nom", e.target.value)}
                placeholder="Ex: Star Academy Dakar" maxLength={60}
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Chef de Projet *</label>
              <input value={form.chef} onChange={e => set("chef", e.target.value)}
                placeholder="Ex: Mamadou Diallo"
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Description</label>
              <textarea value={form.description} onChange={e => set("description", e.target.value)}
                placeholder="Décrivez l'objectif principal de ce projet..." rows={3}
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all resize-none" />
            </div>
            {userMode === "debutant" && (
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-300">
                💡 <strong>Conseil débutant :</strong> Un bon nom de projet est court, précis et compris par tout le monde — même votre sponsor ou vos bénéficiaires.
              </div>
            )}
          </div>
        )}

        {/* STEP 2 — Méthodologie */}
        {step === 2 && (
          <div className="space-y-3">
            {METHODOLOGIES.map(m => (
              <button key={m.id} onClick={() => set("methodo", m.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${form.methodo === m.id ? "border-indigo-500 bg-indigo-500/10" : "border-slate-700/50 hover:border-slate-600 bg-slate-900/50"}`}>
                <p className="font-bold text-white text-sm">{m.label}</p>
                <p className="text-xs text-slate-500 mt-1">{m.desc}</p>
              </button>
            ))}
            {userMode === "debutant" && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300">
                💡 <strong>Si vous hésitez :</strong> choisissez <strong>Hybride</strong>. C'est la méthode la plus utilisée par les professionnels de terrain.
              </div>
            )}
          </div>
        )}

        {/* STEP 3 — Budget */}
        {step === 3 && (
          <div className="space-y-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Budget (en Millions) *</label>
                <input type="number" value={form.budget} onChange={e => set("budget", e.target.value)}
                  placeholder="Ex: 150"
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Devise</label>
                <select value={form.budgetDevise} onChange={e => set("budgetDevise", e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 appearance-none">
                  <option>FCFA</option><option>EUR</option><option>USD</option><option>MAD</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Date de début *</label>
                <input type="date" value={form.debut} onChange={e => set("debut", e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Date de fin prévue *</label>
                <input type="date" value={form.fin} onChange={e => set("fin", e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all" />
              </div>
            </div>
            {form.budget && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="text-xs font-bold text-emerald-400">Budget saisi : <span className="text-white text-sm">{parseFloat(form.budget).toLocaleString('fr-FR')} Millions {form.budgetDevise}</span></p>
              </div>
            )}
          </div>
        )}

        {/* STEP 4 — Risques */}
        {step === 4 && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 mb-4">Sélectionnez les risques probables pour votre projet <strong className="text-white">{form.nom}</strong> :</p>
            {(template.risques || ["Dépassement budgétaire", "Retard planning", "Perte de ressource clé"]).map((r, i) => {
              const selected = form.risquesSelectionnes.includes(r);
              return (
                <button key={i} onClick={() => set("risquesSelectionnes", selected ? form.risquesSelectionnes.filter(x => x !== r) : [...form.risquesSelectionnes, r])}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${selected ? "border-orange-500 bg-orange-500/10" : "border-slate-700/50 hover:border-slate-600 bg-slate-900/50"}`}>
                  <span className="text-lg">{selected ? "⚠️" : "○"}</span>
                  <span className="text-sm text-white font-medium">{r}</span>
                </button>
              );
            })}
            {userMode === "debutant" && (
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-300">
                💡 Identifier les risques dès le début coûte 10× moins cher que de gérer une crise. Sélectionnez-en au moins 2.
              </div>
            )}
          </div>
        )}

        {/* STEP 5 — Résumé */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="p-5 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-2xl font-black text-white">{form.nom?.charAt(0)?.toUpperCase()}</div>
                <div>
                  <h3 className="text-xl font-black text-white">{form.nom}</h3>
                  <p className="text-sm text-slate-400">Chef : {form.chef}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Type", value: PROJECT_TYPES.find(t => t.id === form.type)?.label },
                  { label: "Méthode", value: METHODOLOGIES.find(m => m.id === form.methodo)?.label },
                  { label: "Budget", value: `${parseFloat(form.budget || 0).toLocaleString('fr-FR')} M ${form.budgetDevise}` },
                  { label: "Durée", value: form.debut && form.fin ? `${form.debut} → ${form.fin}` : "Non définie" },
                  { label: "Tâches générées", value: `${template.taches?.length || 0} activités` },
                  { label: "Risques identifiés", value: `${form.risquesSelectionnes.length} risques` },
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-slate-800/50 rounded-xl">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">{item.label}</p>
                    <p className="text-white font-bold text-xs">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
              ✅ Votre projet sera créé avec {template.taches?.length || 0} tâches, {template.jalons?.length || 0} jalons et {form.risquesSelectionnes.length} risques pré-configurés.
            </div>
          </div>
        )}
      </div>

      {/* Nav buttons */}
      <div className="flex justify-between items-center">
        <Btn variant="ghost" onClick={() => step > 0 ? setStep(s => s - 1) : navigate("/dashboard")} size="sm">
          {step === 0 ? "✕ Annuler" : "◀ Retour"}
        </Btn>
        {step < ETAPES.length - 1 ? (
          <Btn onClick={() => setStep(s => s + 1)} disabled={!canNext()} size="md">
            Continuer ▶
          </Btn>
        ) : (
          <Btn onClick={lancerProjet} size="md">
            🚀 Lancer le Projet
          </Btn>
        )}
      </div>
    </div>
  );
}
