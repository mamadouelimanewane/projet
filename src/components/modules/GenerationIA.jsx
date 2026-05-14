import React, { useState, useRef } from "react";
import { toast, dialog } from '../ui';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useStore from "../../store/useStore";
import { Badge, Btn, SectionHeader } from "../ui";

const GenerationIA = () => {
  const { data } = useStore();
  const [loading, setLoading] = useState(false);
  const [activeReport, setActiveReport] = useState("Status Hebdomadaire");
  const reportRef = useRef();

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  // Mock Analysis Data for AI
  const pieData = [
    { name: 'En cours', value: 45 },
    { name: 'Terminé', value: 30 },
    { name: 'Risque', value: 15 },
    { name: 'Bloqué', value: 10 }
  ];

  const handleDownloadPDF = async () => {
    setLoading(true);
    const element = reportRef.current;
    
    // High quality capture for PDF
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#0f172a" });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Rapport_Elite_${activeReport.replace(/\s+/g, '_')}.pdf`);
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-entrance max-w-7xl mx-auto pb-12">
      <SectionHeader 
        title="Studio de Reporting IA & Direction" 
        subtitle="Compilation intelligente de vos données en livrables exécutifs avec analyses graphiques" 
        action={
          <div className="flex gap-3">
            <Btn onClick={() => toast.success("🤖 IA : Rapport mis à jour avec les dernières données du marché.")} variant="ghost" size="md">✨ Rafraîchir l'analyse</Btn>
            <Btn onClick={handleDownloadPDF} variant="primary" size="md" disabled={loading}>
              {loading ? "Génération..." : "📥 Exporter en PDF"}
            </Btn>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Selection */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Modèles de Rapports</h3>
          {[
            "Status Hebdomadaire", 
            "Analyse Budgétaire HQ", 
            "Audit des Risques IA", 
            "Rapport de Sécurité QHSE", 
            "Bilan Matériaux & Logistique", 
            "Impact Social & Local Content",
            "Bilan Fin de Projet"
          ].map(r => (
            <button key={r} onClick={() => setActiveReport(r)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${activeReport === r ? "bg-indigo-600 border-indigo-500 text-white shadow-lg" : "bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800"}`}>
              <div className="text-xs font-bold">{r}</div>
              <p className="text-[9px] mt-1 opacity-60">Prêt pour génération</p>
            </button>
          ))}
        </div>

        {/* Live Preview (capture target) */}
        <div className="lg:col-span-3">
          <div ref={reportRef} className="bg-slate-900 border border-slate-800 p-12 rounded-2xl shadow-2xl space-y-10 min-h-[1000px]">
            {/* Report Header */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-8">
              <div>
                <h1 className="text-3xl font-black text-white italic tracking-tighter">PROJET ÉLITE <span className="text-indigo-500">| RAPPORT</span></h1>
                <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs mt-2">{activeReport}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-mono">Date : {new Date().toLocaleDateString()}</p>
                <p className="text-xs text-slate-500 font-mono">ID : REP-2026-X45</p>
              </div>
            </div>

            {/* IA Analysis Content */}
            <div className="space-y-6">
              <div className="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-indigo-500/20 text-4xl">🤖</div>
                <h4 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-3">Synthèse Exécutive de l'IA</h4>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "L'analyse multidimensionnelle du portefeuille indique une stabilité globale de 84%. Cependant, le projet <strong>Refonte SI Comptable</strong> nécessite une attention immédiate. Bien que l'avancement soit de 65%, la vélocité a chuté de 12% ce mois-ci. L'IA recommande d'accélérer la phase de tests pour éviter un effet domino sur les dépendances du projet Mobile RH."
                </p>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Répartition des Statuts</h5>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                          {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155'}} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Budget Consommé vs Prévu</h5>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.projets}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="nom" hide />
                        <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155'}} />
                        <Bar dataKey="budgetConso" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Project Table Section */}
              <div className="space-y-4">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Détail du Portefeuille Actif</h5>
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto -mx-1">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/50 text-slate-500 uppercase font-black tracking-tighter">
                      <tr>
                        <th className="px-5 py-4">Projet</th>
                        <th className="px-5 py-4">Avancement</th>
                        <th className="px-5 py-4">Budget</th>
                        <th className="px-5 py-4">Santé</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {data.projets.map(p => (
                        <tr key={p.id}>
                          <td className="px-5 py-4 text-white font-bold">{p.nom}</td>
                          <td className="px-5 py-4 text-indigo-400">{p.avancement}%</td>
                          <td className="px-5 py-4 text-slate-300">{(p.budgetTotal/1000000).toFixed(0)}M</td>
                          <td className="px-5 py-4">
                            <span className={`w-2 h-2 rounded-full inline-block ${p.avancement > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
</div>
                </div>
              </div>

              {/* CEO Signature Block */}
              <div className="pt-20 flex justify-between items-end italic text-slate-500">
                <div>
                   <p className="text-[10px] uppercase font-black tracking-widest text-slate-700">Approbation Directoire</p>
                   <div className="mt-4 w-40 h-[1px] bg-slate-800" />
                </div>
                <div className="text-right">
                   <p className="text-[10px] uppercase font-black tracking-widest text-slate-700">Cachet Projet Élite</p>
                   <div className="mt-4 w-40 h-[1px] bg-slate-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationIA;
