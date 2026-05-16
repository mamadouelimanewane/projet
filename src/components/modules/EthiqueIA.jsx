import React, { useState } from "react";
import { Shield, Brain, Scale, Eye, Activity, CheckCircle, AlertCircle, Info, RefreshCw } from "lucide-react";
import { SectionHeader, Card, Btn, Badge, ProgressBar, toast } from "../ui";

const EthiqueIA = ({ data = {} }) => {
  const [robustesse, setRobustesse] = useState(94);

  const handleAudit = () => {
    setRobustesse(99);
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Gouvernance & Éthique de l'IA" 
        subtitle="Monitoring de la transparence, de l'équité et de la robustesse des algorithmes"
        action={
          <button 
            type="button"
            onClick={handleAudit} 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> 
            Auditer les Modèles
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score d'Équité */}
        <Card className="p-6 glass-card rounded-2xl border-b-4 border-b-emerald-500">
           <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center">
                 <Scale className="w-6 h-6 text-emerald-400" />
              </div>
              <Badge variant="success">Protégé</Badge>
           </div>
           <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Score d'Équité (Fairness)</h3>
           <p className="text-4xl font-black text-white">{data.equite || 96}%</p>
           <p className="text-xs text-slate-500 mt-2">Absence de biais discriminatoires détectée dans les prédictions RH et Budget.</p>
        </Card>

        {/* Transparence */}
        <Card className="p-6 glass-card rounded-2xl border-b-4 border-b-indigo-500">
           <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                 <Eye className="w-6 h-6 text-indigo-400" />
              </div>
              <Badge variant="info">XAI Active</Badge>
           </div>
           <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Indice de Transparence</h3>
           <p className="text-4xl font-black text-white">{data.transparence || 98}%</p>
           <p className="text-xs text-slate-500 mt-2">Capacité d'explication des décisions algorithmiques (Explainable AI).</p>
        </Card>

        {/* Robustesse */}
        <Card className="p-6 glass-card rounded-2xl border-b-4 border-b-purple-500">
           <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                 <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <Badge variant="indigo">Sécurisé</Badge>
           </div>
           <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Robustesse Adversaire</h3>
           <p className="text-4xl font-black text-white">{robustesse}%</p>
           <p className="text-xs text-slate-500 mt-2">Résistance aux tentatives de manipulation des données d'entraînement.</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Monitoring des Biais */}
         <Card className="p-6 glass-card rounded-2xl">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
               <Activity className="w-5 h-5 text-indigo-400" />
               Détection de Dérive (Bias Drift)
            </h3>
            <div className="space-y-6">
               <div>
                  <div className="flex justify-between text-xs mb-2 font-bold text-white">
                     <span>Biais de Genre</span>
                     <span className="text-emerald-400">0.01% (Négligeable)</span>
                  </div>
                  <ProgressBar value={1} color="#10b981" />
               </div>
               <div>
                  <div className="flex justify-between text-xs mb-2 font-bold text-white">
                     <span>Biais de Localisation</span>
                     <span className="text-yellow-400">2.4% (Surveillance)</span>
                  </div>
                  <ProgressBar value={24} color="#f59e0b" />
               </div>
               <div>
                  <div className="flex justify-between text-xs mb-2 font-bold text-white">
                     <span>Biais de Formation</span>
                     <span className="text-emerald-400">0.05% (Négligeable)</span>
                  </div>
                  <ProgressBar value={5} color="#10b981" />
               </div>
            </div>
         </Card>

         {/* Certificats d'Éthique */}
         <Card className="p-6 glass-card rounded-2xl">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
               <CheckCircle className="w-5 h-5 text-emerald-400" />
               Certifications de Confiance IA
            </h3>
            <div className="space-y-4">
               {[
                 { label: "Conformité EU AI Act", date: "2026-02-15", status: "Audit Passé" },
                 { label: "Standard Éthique IEEE", date: "2026-03-01", status: "Certifié" },
                 { label: "Audit Algorithmique Externe", date: "2026-04-20", status: "En cours" }
               ].map((c, i) => (
                 <div key={i} className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                    <div>
                       <p className="text-sm font-bold text-white">{c.label}</p>
                       <p className="text-[10px] text-slate-500">Dernière vérification : {c.date}</p>
                    </div>
                    <Badge value={c.status} />
                 </div>
               ))}
            </div>
         </Card>
      </div>

      {/* Alerte Gouvernance */}
      <Card className="p-6 glass-card rounded-2xl bg-indigo-600/5 border border-indigo-500/20 flex items-start gap-4">
         <Info className="w-8 h-8 text-indigo-400 flex-shrink-0" />
         <div>
            <h4 className="font-bold text-white">Principe d'Explicabilité (XAI)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
               Toutes les prédictions générées par le module <strong>Predictions ML</strong> sont auditables. Vous pouvez demander à tout moment "Pourquoi cette prédiction ?" pour obtenir le détail des variables d'influence.
            </p>
         </div>
      </Card>
    </div>
  );
};

export default EthiqueIA;
