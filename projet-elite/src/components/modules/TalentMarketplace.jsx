import React, { useState } from "react";
import { Users, Brain, Zap, Search, Target, UserPlus, Award, TrendingUp } from "lucide-react";
import { SectionHeader, Card, Btn, Badge, Input } from "../ui";

const TalentMarketplace = ({ data = {} }) => {
  const talents = [
    { id: 1, nom: "Mamadou W.", role: "Chef de Projet Senior", skills: ["Agile", "Supabase", "React"], match: 98, dispo: "100%", avatar: "👤" },
    { id: 2, nom: "Fatou D.", role: "Expert Risk Manager", skills: ["Risk", "ISO 27001", "Compliance"], match: 85, dispo: "50%", avatar: "👩" },
    { id: 3, nom: "Ibrahima S.", role: "Architecte Cloud", skills: ["Azure", "Terraform", "Security"], match: 92, dispo: "Disponible", avatar: "👨" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Talent Marketplace" 
        subtitle="Matching intelligent des compétences et gestion du capital humain"
        action={<Btn><UserPlus className="w-4 h-4 mr-2" /> Recruter</Btn>}
      />

      {/* Barre de Recherche IA */}
      <Card className="p-4 glass-card rounded-2xl flex items-center gap-4">
        <div className="flex-1 relative">
           <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
           <input 
             type="text" 
             placeholder="Rechercher une compétence rare ou un profil spécifique (ex: Expert React avec expérience BIM)..." 
             className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500"
           />
        </div>
        <Btn variant="indigo">Analyse IA</Btn>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des Talents */}
        <div className="lg:col-span-2 space-y-4">
           {talents.map(talent => (
             <Card key={talent.id} className="p-6 glass-card rounded-2xl hover:border-indigo-500/50 transition-all group">
                <div className="flex items-start justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl border border-slate-700">
                        {talent.avatar}
                      </div>
                      <div>
                         <h4 className="font-black text-white text-lg">{talent.nom}</h4>
                         <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{talent.role}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-xs text-slate-500 font-bold mb-1 uppercase">Match IA</div>
                      <div className="text-2xl font-black text-emerald-400">{talent.match}%</div>
                   </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                   {talent.skills.map(skill => (
                     <Badge key={skill} value={skill} variant="indigo" />
                   ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800/50 flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div>
                         <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Disponibilité</p>
                         <p className="text-xs text-white font-bold">{talent.dispo}</p>
                      </div>
                      <div>
                         <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Dernière Mission</p>
                         <p className="text-xs text-white font-bold italic">Projet Renaissance</p>
                      </div>
                   </div>
                   <Btn size="sm">Affecter</Btn>
                </div>
             </Card>
           ))}
        </div>

        {/* Statistiques / Skills Matrix */}
        <div className="space-y-4">
           <Card className="p-6 glass-card rounded-2xl">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-400" />
                Matrice des Compétences
              </h3>
              <div className="space-y-4">
                 {[
                   { label: "Project Management", val: 92, color: "#6366f1" },
                   { label: "Technical Skills", val: 78, color: "#10b981" },
                   { label: "Soft Skills", val: 85, color: "#f59e0b" },
                   { label: "Compliance", val: 64, color: "#ef4444" }
                 ].map(s => (
                   <div key={s.label}>
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
                        <span>{s.label}</span>
                        <span>{s.val}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${s.val}%`, backgroundColor: s.color }} />
                      </div>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="p-6 glass-card rounded-2xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/30">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Besoin Critique
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Le module IA détecte une pénurie imminente d'experts en <strong>Cybersécurité</strong> pour le trimestre prochain.
              </p>
              <Btn variant="indigo" className="w-full mt-4">Lancer Formation</Btn>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default TalentMarketplace;
