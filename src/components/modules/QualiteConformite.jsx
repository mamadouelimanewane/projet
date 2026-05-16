import React, { useState } from "react";
import { ShieldCheck, ClipboardCheck, AlertCircle, FileText, CheckCircle, Search, Filter, Plus } from "lucide-react";
import { SectionHeader, Card, Btn, Badge, ProgressBar } from "../ui";

const QualiteConformite = ({ data = {} }) => {
  const [activeTab, setActiveTab] = useState("audits");

  const [audits, setAudits] = useState([
    { id: 1, titre: "Audit Interne ISO 9001", date: "2026-03-15", auditeur: "Jean K.", statut: "Terminé", score: 92 },
    { id: 2, titre: "Revue de Conformité RGPD", date: "2026-04-10", auditeur: "Sophie L.", statut: "En cours", score: null },
    { id: 3, titre: "Audit Sécurité Infrastructure", date: "2026-05-20", auditeur: "Paul M.", statut: "Planifié", score: null },
  ]);

  const ajouterAudit = () => {
    const newAudit = {
      id: Date.now(),
      titre: "Nouvel Audit Qualité",
      date: new Date().toISOString().split("T")[0],
      auditeur: "Auditeur Interne",
      statut: "Planifié",
      score: null
    };
    setAudits([newAudit, ...audits]);
    setActiveTab("audits");
  };

  const nonConformites = [
    { id: 1, titre: "Absence de traçabilité lot #124", gravite: "Moyenne", statut: "En cours", date: "2026-03-16" },
    { id: 2, titre: "Documentation technique incomplète", gravite: "Basse", statut: "Résolu", date: "2026-03-20" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Qualité & Conformité" 
        subtitle="Suivi des standards ISO et audits de performance"
        action={<Btn onClick={ajouterAudit}><Plus className="w-4 h-4 mr-2" /> Nouvel Audit</Btn>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 glass-card rounded-2xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Taux de Conformité Global</p>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-black text-emerald-400">{data.conformite || 95}%</span>
            <span className="text-xs text-slate-500 mb-1">vs 90% cible</span>
          </div>
          <ProgressBar value={data.conformite || 95} color="#10b981" />
        </Card>
        
        <Card className="p-6 glass-card rounded-2xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Audits Réalisés (2026)</p>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center">
               <ClipboardCheck className="w-5 h-5 text-indigo-400" />
             </div>
             <div>
               <p className="text-2xl font-bold text-white">12</p>
               <p className="text-xs text-slate-500">85% de réussite au premier passage</p>
             </div>
          </div>
        </Card>

        <Card className="p-6 glass-card rounded-2xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Non-Conformités Actives</p>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center">
               <AlertCircle className="w-5 h-5 text-red-400" />
             </div>
             <div>
               <p className="text-2xl font-bold text-white">{data.nonConformites || 2}</p>
               <p className="text-xs text-slate-500">-50% par rapport au mois dernier</p>
             </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-4">
        <button onClick={() => setActiveTab("audits")} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "audits" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800"}`}>
          Audits & Revues
        </button>
        <button onClick={() => setActiveTab("nc")} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "nc" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800"}`}>
          Non-Conformités
        </button>
        <button onClick={() => setActiveTab("docs")} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "docs" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800"}`}>
          Référentiels ISO
        </button>
      </div>

      {activeTab === "audits" && (
        <Card className="glass-card rounded-2xl overflow-hidden" noPadding>
          <div className="overflow-x-auto -mx-1">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Titre de l'Audit</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Auditeur</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Statut</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {audits.map(audit => (
                <tr key={audit.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-bold text-white">{audit.titre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">{audit.date}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{audit.auditeur}</td>
                  <td className="px-6 py-4">
                    <Badge value={audit.statut} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    {audit.score ? (
                      <span className={`text-sm font-black ${audit.score >= 90 ? "text-emerald-400" : "text-yellow-400"}`}>
                        {audit.score}/100
                      </span>
                    ) : (
                      <span className="text-xs text-slate-600">--</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </Card>
      )}

      {activeTab === "nc" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {nonConformites.map(nc => (
             <Card key={nc.id} className="p-5 glass-card rounded-2xl border-l-4 border-l-red-500">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-white">{nc.titre}</h4>
                  <Badge value={nc.gravite} />
                </div>
                <p className="text-xs text-slate-500 mb-4">Détectée le {nc.date}</p>
                <div className="flex items-center justify-between">
                   <Badge value={nc.statut} />
                   <Btn size="sm" variant="ghost">Traiter</Btn>
                </div>
             </Card>
           ))}
        </div>
      )}
    </div>
  );
};

export default QualiteConformite;
