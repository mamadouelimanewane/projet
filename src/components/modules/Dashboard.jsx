import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PIE_COLORS } from "../../data/constants";
import { Badge, StatCard, SectionHeader } from "../ui";
import { useProject } from "./ProjectSelector";
import DashboardProjetIsolé from "./DashboardProjetIsolé";
import AssistantPremierProjet from "./AssistantPremierProjet";

const Dashboard = ({ data }) => {
  const navigate = useNavigate();
  const { currentProject, projectData } = useProject();

  // Si un projet spécifique est sélectionné, on rend le dashboard projet isolé
  if (currentProject) {
    return <DashboardProjetIsolé />;
  }

  // Sinon, on rend le dashboard global (Multi-Projets / Portfolio)
  const totalProjets = data.projets.length;

  if (totalProjets === 0) {
    return <AssistantPremierProjet />;
  }

  const projetsActifs = data.projets.filter(p => p.statut === "En cours").length;
  const tachesEnCours = data.taches.filter(t => t.statut === "En cours").length;
  const risquesActifs = data.risques.filter(r => r.statut === "Actif").length;
  const avgAvancement = Math.round(data.projets.reduce((s, p) => s + p.avancement, 0) / data.projets.length);
  const totalBudgetP = data.budget.reduce((s, b) => s + b.planifie, 0);
  const totalBudgetR = data.budget.reduce((s, b) => s + b.reel, 0);
  const budgetPct = Math.round((totalBudgetR / totalBudgetP) * 100);

  const avancementData = data.projets.map((p, index) => ({ name: p.nom.substring(0, 15) + "…", value: p.avancement, index, id: p.id }));
  const budgetData = data.couts.map(c => ({ name: c.phase, Prévu: c.prevu, Réel: c.reel }));
  const statutData = [
    { name: "Terminé", value: data.projets.filter(p => p.statut === "Terminé").length },
    { name: "En cours", value: data.projets.filter(p => p.statut === "En cours").length },
    { name: "Planifié", value: data.projets.filter(p => p.statut === "Planifié").length },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-8 animate-entrance">
      <SectionHeader title="Tableau de bord Global" subtitle="Vue consolidée de votre portefeuille de projets" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard label="Projets Actifs" value={projetsActifs} sub={`sur ${totalProjets} total`} color="#6366f1" icon="◈" />
        <StatCard label="Avancement Global" value={`${avgAvancement}%`} sub="moyenne tous projets" color="#8b5cf6" icon="◉" />
        <StatCard label="Budget Consommé" value={`${budgetPct}%`} sub={`${(totalBudgetR / 1000).toFixed(0)}k / ${(totalBudgetP / 1000).toFixed(0)}k FCFA`} color="#a78bfa" icon="Σ" />
        <StatCard label="Risques Actifs" value={risquesActifs} sub="nécessitant attention" color="#ef4444" icon="⛨" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Tâches En cours" value={tachesEnCours} sub={`${data.taches.filter(t => t.statut === 'Fait').length} terminées`} color="#10b981" icon="⊞" />
        <StatCard label="Problèmes Ouverts" value={data.problemes.filter(p => p.statut !== "Résolu").length} sub={`${data.problemes.filter(p => p.priorite === "Critique").length} critiques`} color="#f59e0b" icon="⚠" />
        <StatCard label="Jalons Atteints" value={data.jalons.filter(j => j.statut === "Atteint").length} sub={`sur ${data.jalons.length} total`} color="#06b6d4" icon="◆" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-6 animate-entrance [animation-delay:100ms]">
          <h3 className="text-xs font-black text-slate-500 mb-8 uppercase tracking-[0.2em]">Avancement par Projet (cliquez pour détails)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={avancementData} onClick={(e) => {
              if (e && e.activePayload && e.activePayload[0]) {
                const id = e.activePayload[0].payload.id;
                // Au clic, on pourrait soit naviguer, soit changer le projet actif.
                // Ici on navigue vers le dashboard-projet qui utilisera l'ID
                navigate(`/dashboard-projet/${id}`);
              }
            }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} domain={[0, 100]} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", border: "1px solid rgba(148, 163, 184, 0.1)", borderRadius: 12, backdropFilter: 'blur(10px)' }} />
              <Bar dataKey="value" fill="url(#colorBar)" radius={[6, 6, 0, 0]} name="%" barSize={35} cursor="pointer" />
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="glass-card rounded-2xl p-6 animate-entrance [animation-delay:200ms]">
          <h3 className="text-xs font-black text-slate-500 mb-8 uppercase tracking-[0.2em]">Flux Financier (K FCFA)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", border: "1px solid rgba(148, 163, 184, 0.1)", borderRadius: 12, backdropFilter: 'blur(10px)' }} />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: 25, fontSize: 11, fontWeight: 700}} />
              <Bar dataKey="Prévu" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="Réel" fill="#a78bfa" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card rounded-2xl p-6 animate-entrance [animation-delay:300ms]">
          <h3 className="text-xs font-black text-slate-500 mb-8 uppercase tracking-[0.2em]">Répartition Statuts</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statutData} cx="50%" cy="50%" innerRadius={65} outerRadius={90} paddingAngle={10} dataKey="value" stroke="none">
                {statutData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", border: "1px solid rgba(148, 163, 184, 0.1)", borderRadius: 12, backdropFilter: 'blur(10px)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {statutData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span className="text-[10px] font-bold text-slate-500 uppercase">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 glass-card rounded-2xl p-6 animate-entrance [animation-delay:400ms]">
          <h3 className="text-xs font-black text-slate-500 mb-8 uppercase tracking-[0.2em]">Intelligence & Alertes</h3>
          <div className="space-y-3">
            {data.problemes.filter(p => p.statut !== "Résolu" && (p.priorite === "Critique" || p.priorite === "Haute")).map(p => (
              <div key={p.id} className="group flex items-start gap-5 p-4 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-indigo-500/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-xl text-red-500">⚠</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-100 truncate tracking-tight">{p.description}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1.5">{p.responsable} · {p.dateSignalement}</p>
                </div>
                <Badge value={p.priorite} />
              </div>
            ))}
            {data.risques.filter(r => r.gravite * r.probabilite >= 8).map(r => (
              <div key={r.id} className="group flex items-start gap-5 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-xl text-indigo-400">⛨</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-indigo-100/90 truncate tracking-tight">Risque : {r.risque}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1.5">Impact Score : {r.gravite * r.probabilite}/25</p>
                </div>
                <Badge value="Actif" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
