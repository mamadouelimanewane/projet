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
  { id: "agriculture", label: "🌾 Agriculture / Agroalimentaire", desc: "Élevage, culture, transformation alimentaire" },
  { id: "sante", label: "🏥 Santé / Médical", desc: "Hôpital, clinique, programme de santé" },
  { id: "environnement", label: "🌿 Environnement / Énergie", desc: "Énergie renouvelable, écologie, eau" },
  { id: "commerce", label: "🛒 Commerce / Distribution", desc: "Retail, e-commerce, supply chain" },
  { id: "immobilier", label: "🏘️ Immobilier / Logement", desc: "Promotion immobilière, gestion locative" },
  { id: "transport", label: "🚛 Transport / Logistique", desc: "Mobilité, fret, infrastructure routière" },
  { id: "general", label: "📋 Général / Autre", desc: "Tout autre type de projet non listé" },
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
  agriculture: { taches: ["Étude du sol & faisabilité", "Acquisition des intrants", "Préparation du terrain", "Semis / plantation / élevage", "Suivi & entretien", "Récolte & commercialisation"], risques: ["Aléas climatiques", "Maladies des cultures", "Problèmes d'irrigation", "Fluctuation des prix"], jalons: ["Début campagne", "Mi-saison", "Récolte principale"] },
  sante: { taches: ["Étude des besoins", "Recrutement du personnel médical", "Équipement & logistique", "Formation des équipes", "Ouverture & opérations", "Évaluation des résultats"], risques: ["Pénurie de médicaments", "Manque de personnel qualifié", "Épidémie"], jalons: ["Accréditation sanitaire", "Première consultation", "Rapport d'impact"] },
  environnement: { taches: ["Étude d'impact environnemental", "Conception technique", "Acquisition équipements", "Installation", "Tests & mise en service", "Suivi opérationnel"], risques: ["Contraintes réglementaires", "Résistance des populations", "Conditions météo extrêmes"], jalons: ["Autorisation environnementale", "Installation complète", "Production nominale"] },
  commerce: { taches: ["Étude de marché", "Sourcing fournisseurs", "Aménagement point de vente", "Recrutement & formation", "Lancement commercial", "Analyse des ventes"], risques: ["Concurrence accrue", "Rupture de stock", "Évolution réglementaire"], jalons: ["Ouverture officielle", "Premier mois de CA", "Seuil de rentabilité"] },
  immobilier: { taches: ["Étude de faisabilité", "Acquisition du foncier", "Permis de construire", "Travaux de construction", "Commercialisation", "Livraison"], risques: ["Retard administratif", "Surcoût travaux", "Difficultés de commercialisation"], jalons: ["Dépôt permis", "Mise en vente", "Livraison"] },
  transport: { taches: ["Analyse des flux", "Conception de la solution", "Acquisition véhicules / infrastructure", "Recrutement chauffeurs", "Mise en service", "Optimisation"], risques: ["Hausse du carburant", "Pannes mécaniques", "Réglementation douanière"], jalons: ["Premier trajet", "Optimisation des routes", "Bilan opérationnel"] },
  general: { taches: ["Cadrage du projet", "Planification détaillée", "Mise en œuvre phase 1", "Mise en œuvre phase 2", "Suivi & ajustements", "Clôture & bilan"], risques: ["Dépassement budgétaire", "Retard planning", "Perte de ressource clé"], jalons: ["Lancement officiel", "Mi-parcours", "Livraison finale"] },
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
    risquesPersonnalises: [],
    nouveauRisque: "",
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
        <div className="flex justify-between text-[10px] app-text3 font-bold uppercase tracking-widest">
          <span>Étape {step + 1} / {ETAPES.length}</span>
          <span>{ETAPES[step].icon} {ETAPES[step].title}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full app-surface2 rounded-full h-2">
          <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Étape navigation mini */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {ETAPES.map((e, i) => (
          <div key={i} className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${i === step ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30 border border-indigo-500" : i < step ? "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-transparent" : "app-surface app-text3 border border-slate-200 dark:app-border"}`}>
            <span>{e.icon}</span>
            <span className="hidden md:inline">{e.title}</span>
          </div>
        ))}
      </div>

      {/* STEP CONTENT */}
      <div className="glass-card rounded-2xl p-8 min-h-[380px] flex flex-col">
        <h2 className="text-xl font-black text-white mb-1">{ETAPES[step].title}</h2>
        <p className="text-sm app-text2 mb-6">{ETAPES[step].desc}</p>

        {/* STEP 0 — Type */}
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROJECT_TYPES.map(t => (
              <button key={t.id} onClick={() => set("type", t.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all shadow-sm ${form.type === t.id ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" : "border-slate-200 bg-white hover:border-indigo-300 dark:app-border dark:app-surface dark:hover:app-border2"}`}>
                <p className={`font-bold text-sm ${form.type === t.id ? 'text-indigo-900 dark:text-white' : 'app-text'}`}>{t.label}</p>
                <p className={`text-xs mt-1 ${form.type === t.id ? 'text-indigo-700 dark:app-text2' : 'app-text2'}`}>{t.desc}</p>
              </button>
            ))}
          </div>
        )}

        {/* STEP 1 — Infos */}
        {step === 1 && (
          <div className="space-y-4 flex-1">
            <div className="space-y-1.5">
              <label className="block text-[10px] app-text3 font-bold uppercase tracking-wider">Nom du projet *</label>
              <input value={form.nom} onChange={e => set("nom", e.target.value)}
                placeholder="Ex: Construction École Rurale Thiès"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all dark:app-surface dark:app-border dark:text-white dark:focus:border-indigo-500" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] app-text3 font-bold uppercase tracking-wider">Chef de projet *</label>
              <input value={form.chef} onChange={e => set("chef", e.target.value)}
                placeholder="Ex: Mamadou Wane"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all dark:app-surface dark:app-border dark:text-white dark:focus:border-indigo-500" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] app-text3 font-bold uppercase tracking-wider">Description</label>
              <textarea value={form.description} onChange={e => set("description", e.target.value)}
                rows={3} placeholder="Décrivez brièvement les objectifs du projet..."
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none dark:app-surface dark:app-border dark:text-white dark:focus:border-indigo-500" />
            </div>
          </div>
        )}

        {/* STEP 2 — Méthodologie */}
        {step === 2 && (
          <div className="space-y-3">
            {METHODOLOGIES.map(m => (
              <button key={m.id} onClick={() => set("methodo", m.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all shadow-sm ${form.methodo === m.id ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" : "border-slate-200 bg-white hover:border-indigo-300 dark:app-border dark:app-surface dark:hover:app-border2"}`}>
                <p className={`font-bold text-sm ${form.methodo === m.id ? 'text-indigo-900 dark:text-white' : 'app-text'}`}>{m.label}</p>
                <p className={`text-xs mt-1 ${form.methodo === m.id ? 'text-indigo-700 dark:app-text2' : 'app-text2'}`}>{m.desc}</p>
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
                <label className="block text-[10px] app-text3 font-bold uppercase tracking-wider">Budget (en Millions) *</label>
                <input type="number" value={form.budget} onChange={e => set("budget", e.target.value)}
                  placeholder="Ex: 150"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all dark:app-surface dark:app-border dark:text-white dark:focus:border-indigo-500" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] app-text3 font-bold uppercase tracking-wider">Devise</label>
                <select value={form.budgetDevise} onChange={e => set("budgetDevise", e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white appearance-none dark:app-surface dark:app-border dark:text-white dark:focus:border-indigo-500">
                  <option>FCFA</option><option>EUR</option><option>USD</option><option>MAD</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] app-text3 font-bold uppercase tracking-wider">Date de début *</label>
                <input type="date" value={form.debut} onChange={e => set("debut", e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all dark:app-surface dark:app-border dark:text-white dark:focus:border-indigo-500" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] app-text3 font-bold uppercase tracking-wider">Date de fin prévue *</label>
                <input type="date" value={form.fin} onChange={e => set("fin", e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all dark:app-surface dark:app-border dark:text-white dark:focus:border-indigo-500" />
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
            <p className="text-xs app-text2 mb-4">Sélectionnez les risques probables pour votre projet <strong className="app-text font-bold">{form.nom}</strong> :</p>
            {(template.risques || ["Dépassement budgétaire", "Retard planning", "Perte de ressource clé"]).map((r, i) => {
              const selected = form.risquesSelectionnes.includes(r);
              return (
                <button key={i} onClick={() => set("risquesSelectionnes", selected ? form.risquesSelectionnes.filter(x => x !== r) : [...form.risquesSelectionnes, r])}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 shadow-sm ${selected ? "border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-500/10 dark:text-white" : "border-slate-200 bg-white hover:border-orange-300 text-slate-700 dark:app-border dark:app-surface dark:hover:app-border2 dark:text-white"}`}>
                  <span className="text-lg">{selected ? "⚠️" : "○"}</span>
                  <span className="text-sm font-medium">{r}</span>
                </button>
              );
            })}
            
            {/* Custom risks list */}
            {(form.risquesPersonnalises || []).map((r, i) => {
              const selected = form.risquesSelectionnes.includes(r);
              return (
                <button key={`custom-${i}`} onClick={() => set("risquesSelectionnes", selected ? form.risquesSelectionnes.filter(x => x !== r) : [...form.risquesSelectionnes, r])}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 shadow-sm ${selected ? "border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-500/10 dark:text-white" : "border-slate-200 bg-white hover:border-orange-300 text-slate-700 dark:app-border dark:app-surface dark:hover:app-border2 dark:text-white"}`}>
                  <span className="text-lg">{selected ? "⚠️" : "○"}</span>
                  <span className="text-sm font-medium">{r} <span className="text-[10px] bg-slate-100 app-text3 dark:app-surface2 px-2 py-0.5 rounded dark:app-text2 ml-2">Personnalisé</span></span>
                </button>
              );
            })}

            {/* Input to add a new risk */}
            <div className="flex gap-2 pt-2">
               <input 
                 value={form.nouveauRisque} 
                 onChange={e => set("nouveauRisque", e.target.value)}
                 onKeyDown={e => {
                   if (e.key === 'Enter' && form.nouveauRisque.trim()) {
                     const newRisk = form.nouveauRisque.trim();
                     set("risquesPersonnalises", [...(form.risquesPersonnalises || []), newRisk]);
                     set("risquesSelectionnes", [...form.risquesSelectionnes, newRisk]);
                     set("nouveauRisque", "");
                   }
                 }}
                 placeholder="Ajouter un risque spécifique au projet..."
                 className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-indigo-500 transition-all dark:app-surface dark:app-border dark:text-white dark:focus:border-indigo-500"
               />
               <button 
                 onClick={() => {
                   if(form.nouveauRisque.trim()) {
                     const newRisk = form.nouveauRisque.trim();
                     set("risquesPersonnalises", [...(form.risquesPersonnalises || []), newRisk]);
                     set("risquesSelectionnes", [...form.risquesSelectionnes, newRisk]);
                     set("nouveauRisque", "");
                   }
                 }}
                 disabled={!form.nouveauRisque.trim()}
                 className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:app-surface2 disabled:app-text3"
               >
                 + Ajouter
               </button>
            </div>
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
            <div className="p-5 bg-indigo-50 border border-indigo-200 dark:bg-indigo-600/10 dark:border-indigo-500/30 rounded-2xl space-y-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-2xl font-black text-white">{form.nom?.charAt(0)?.toUpperCase()}</div>
                <div>
                  <h3 className="text-xl font-black app-text">{form.nom}</h3>
                  <p className="text-sm app-text2">Chef : {form.chef}</p>
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
                  <div key={i} className="p-3 bg-white border border-slate-200 dark:app-surface2 dark:border-transparent rounded-xl shadow-sm">
                    <p className="text-[10px] app-text3 uppercase font-bold tracking-wider mb-1">{item.label}</p>
                    <p className="app-text font-bold text-xs">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 shadow-sm">
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
