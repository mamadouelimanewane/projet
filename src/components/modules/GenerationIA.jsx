import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const GenerationIA = () => {
  const [loading, setLoading] = useState(false);
  const [doc, setDoc] = useState(null);

  const generateDoc = (type) => {
    setLoading(true);
    setTimeout(() => {
      setDoc({ type, date: new Date().toLocaleString() });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Studio de Génération IA" subtitle="Laissez le Copilote rédiger vos livrables officiels instantanément" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-base font-bold text-white mb-6">Sélectionnez le type de document à produire</h3>
          <div className="space-y-3">
            {[
              { id: "charte", label: "Charte de Projet Complète", icon: "📐", desc: "Objectifs, périmètre, ressources et planning initial." },
              { id: "copil", label: "Support Comité de Pilotage (PDF)", icon: "📊", desc: "Synthèse des KPI, Budget et Risques du mois." },
              { id: "cr", label: "Compte-Rendu de Réunion Auto", icon: "📝", desc: "Résumé des tâches terminées depuis 7 jours." },
              { id: "risque", label: "Matrice des Risques Détaillée", icon: "⛨", desc: "Analyse d'impact et plans de contingence." }
            ].map(d => (
              <button key={d.id} onClick={() => generateDoc(d.label)} disabled={loading}
                className="w-full text-left bg-slate-900/50 hover:bg-indigo-900/40 border border-slate-700 hover:border-indigo-500 p-4 rounded-xl transition-all flex items-start gap-4 group">
                <span className="text-2xl opacity-80 group-hover:scale-110 transition-transform">{d.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-400">{d.label}</h4>
                  <p className="text-xs text-slate-400 mt-1">{d.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
          {loading ? (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-indigo-400 font-bold animate-pulse">L'IA rédige votre document...</p>
              <p className="text-xs text-slate-500 mt-2">Analyse des jalons et du budget en cours.</p>
            </div>
          ) : doc ? (
            <div className="text-center w-full">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-lg font-bold text-white mb-2">{doc.type}</h3>
              <p className="text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded inline-block mb-6">✔ Généré avec succès le {doc.date}</p>
              <div className="flex justify-center gap-3">
                <Btn className="bg-indigo-600 hover:bg-indigo-500 max-w-xs">Télécharger PDF</Btn>
                <Btn variant="ghost">Enregistrer dans la GED</Btn>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800 text-left">
                <p className="text-[10px] text-slate-500 uppercase font-black mb-2">Aperçu du contenu (Snippet)</p>
                <div className="bg-slate-800 p-4 rounded text-xs text-slate-300 font-mono leading-relaxed h-32 overflow-hidden relative">
                  "Le projet Refonte SI Comptable affiche actuellement un taux d'avancement global de 65%.
                  Le budget consommé est maîtrisé à hauteur de 78M FCFA sur les 120M prévus... "
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-800 to-transparent" />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center opacity-40">
              <div className="text-5xl mb-4">✨</div>
              <p className="text-sm text-white">Sélectionnez un modèle à gauche pour tester la magie de l'IA.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerationIA;
