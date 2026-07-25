import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PIE_COLORS } from "../../data/constants";
import { Badge, StatCard, SectionHeader, TooltipInfo, ProgressBar } from "../ui";
import { useProject } from "./ProjectSelector";
import DashboardProjetIsole from "./DashboardProjetIsole";
import AssistantPremierProjet from "./AssistantPremierProjet";
import useStore from "../../store/useStore";

const Dashboard = ({ data }) => {
  const navigate = useNavigate();
  const { currentProject } = useProject();
  const { userMode, universityPoints } = useStore();

  // Si un projet spécifique est sélectionné, on rend le dashboard projet isolé
  if (currentProject) {
    return <DashboardProjetIsole />;
  }

  // Sinon, on rend le dashboard global (Multi-Projets / Portfolio)
  const totalProjets = data?.projets?.length || 0;

  if (totalProjets === 0) {
    return <AssistantPremierProjet />;
  }

  // --- RENDU SPÉCIFIQUE PAR MODE ---

  // MODE DÉBUTANT : Focus sur l'apprentissage
  if (userMode === 'debutant') {
    return (
      <div className="space-y-8 animate-entrance">
        <SectionHeader title="Bienvenue Débutant 🌱" subtitle="Commencez votre voyage dans la gestion de projet" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="app-surface rounded-2xl p-8 border app-border text-center shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-3xl mx-auto mb-4">🧭</div>
            <h3 className="text-xl font-bold app-text mb-2">Suivre le Guide</h3>
            <p className="text-sm app-text2 mb-6">Apprenez les bases théoriques et pratiques en 5 minutes.</p>
            <button onClick={() => navigate('/guide')} className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-sm">Ouvrir le Guide</button>
          </div>
          <div className="app-surface rounded-2xl p-8 border app-border text-center shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-3xl mx-auto mb-4">🚀</div>
            <h3 className="text-xl font-bold app-text mb-2">Créer un Projet</h3>
            <p className="text-sm app-text2 mb-6">Utilisez notre assistant guidé pour lancer votre idée.</p>
            <button onClick={() => navigate('/nouveau-projet')} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-sm">Lancer le Wizard</button>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-black app-text3 uppercase mb-4">Votre Progression</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1"><ProgressBar value={universityPoints > 0 ? Math.min(universityPoints, 100) : 10} color="#6366f1" /></div>
            <span className="text-xs font-bold text-indigo-400">{universityPoints} pts</span>
          </div>
          <p className="text-[10px] app-text3 mt-4 italic">Astuce : Validez des modules dans l'Espace Universitaire pour gagner des badges.</p>
        </div>
      </div>
    );
  }

  // MODE ACADÉMIQUE : Focus sur les certifications et le portfolio
  if (userMode === 'academique') {
    return (
      <div className="space-y-8 animate-entrance">
        <SectionHeader title="Portefeuille Académique 🎓" subtitle="Préparez vos certifications et validez vos compétences" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Score Total" value={`${universityPoints} pts`} sub="Sur 250 points possibles" color="#6366f1" icon="🏆" />
          <StatCard label="Badge Actuel" value={universityPoints >= 100 ? "Pro" : "Apprenti"} sub="Prochain : Expert" color="#8b5cf6" icon="🏅" />
          <StatCard label="Rapports Prêts" value="1" sub="Rapport Star Academy" color="#10b981" icon="📄" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6 border app-border hover:border-indigo-500/30 transition-colors">
            <h3 className="text-sm font-black app-text mb-4">Dernière Simulation Terrain</h3>
            <div className="p-4 app-surface2 rounded-xl mb-4 border app-border">
              <p className="text-xs app-text2">"Le Client Change d'Avis"</p>
              <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase mt-1">Score : 10/10 (Expert)</p>
            </div>
            <button onClick={() => navigate('/espace-universitaire')} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Accéder au simulateur →</button>
          </div>
          <div className="glass-card rounded-2xl p-6 border app-border hover:border-emerald-500/30 transition-colors">
            <h3 className="text-sm font-black app-text mb-4">Préparation Certification</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">CAPM</div>
              <div className="flex-1"><ProgressBar value={45} color="#10b981" /></div>
            </div>
            <button onClick={() => navigate('/certifications')} className="text-xs font-bold text-emerald-400 hover:underline">Continuer la préparation →</button>
          </div>
        </div>
      </div>
    );
  }

  // MODE EXPERT : Focus sur l'analytique et l'EVM
  if (userMode === 'expert') {
    const totalBudgetP = data?.budget?.reduce((s, b) => s + (b.planifie || 0), 0) || 1;
    const totalBudgetR = data?.budget?.reduce((s, b) => s + (b.reel || 0), 0) || 0;
    const cpi = totalBudgetP > 0 ? (totalBudgetR / totalBudgetP).toFixed(2) : "1.00";

    return (
      <div className="space-y-8 animate-entrance">
        <SectionHeader title="Console Expert PMO 🔥" subtitle="Surveillance avancée et indicateurs de performance (EVM)" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="CPI (Indice Coût)" value={cpi} sub={parseFloat(cpi) < 1 ? "⚠️ Surcoût" : "✅ Aligné"} color="#f59e0b" icon="📉" />
          <StatCard label="SPI (Indice Délais)" value="0.98" sub="🟡 Retard léger" color="#6366f1" icon="⏳" />
          <StatCard label="Risques Critiques" value={data?.risques?.filter(r => (r.gravite || 0) * (r.probabilite || 0) >= 12).length || 0} sub="Nécessitent mitigation" color="#ef4444" icon="⛨" />
          <StatCard label="EAC (Projection)" value={`${(totalBudgetP * 1.05 / 1000).toFixed(0)}k`} sub="FCFA (Estimation)" color="#ec4899" icon="Σ" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xs font-black app-text2 uppercase mb-4 tracking-widest">Analyse du Chemin Critique</h3>
            <p className="text-sm app-text mb-4">Le projet "Star Academy" a 3 tâches sur le chemin critique. Tout retard impactera la livraison finale.</p>
            <button onClick={() => navigate('/outils-expert')} className="px-4 py-2 app-surface2 border app-border text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-50 dark:hover:app-surface2 transition-all">Voir le diagramme CPM →</button>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xs font-black app-text2 uppercase mb-4 tracking-widest">Gouvernance RACI</h3>
            <p className="text-sm app-text mb-4">La matrice RACI est définie pour 85% des activités. 2 tâches n'ont pas d'Approbateur assigné.</p>
            <button onClick={() => navigate('/outils-expert')} className="px-4 py-2 app-surface2 border app-border text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold hover:bg-indigo-50 dark:hover:app-surface2 transition-all">Gérer les responsabilités →</button>
          </div>
        </div>
      </div>
    );
  }

  // --- LOGIQUE STANDARD (PRO / UNIVERSEL) ---
  const projetsActifs = data?.projets?.filter(p => p.statut === "En cours").length || 0;
  const tachesEnCours = data?.taches?.filter(t => t.statut === "En cours").length || 0;
  const risquesActifs = data?.risques?.filter(r => r.statut === "Actif").length || 0;
  const avgAvancement = data?.projets?.length > 0 ? Math.round(data.projets.reduce((s, p) => s + (p.avancement || 0), 0) / data.projets.length) : 0;
  const totalBudgetP = data?.budget?.reduce((s, b) => s + (b.planifie || 0), 0) || 1;
  const totalBudgetR = data?.budget?.reduce((s, b) => s + (b.reel || 0), 0) || 0;
  const budgetPct = Math.round((totalBudgetR / totalBudgetP) * 100);

  const avancementData = data?.projets?.map((p, index) => ({ name: (p.nom || '').substring(0, 15) + "…", value: p.avancement, index, id: p.id })) || [];
  const budgetData = data?.couts?.map(c => ({ name: c.phase, Prévu: c.prevu, Réel: c.reel })) || [];
  const statutData = [
    { name: "Terminé", value: data?.projets?.filter(p => p.statut === "Terminé").length || 0 },
    { name: "En cours", value: data?.projets?.filter(p => p.statut === "En cours").length || 0 },
    { name: "Planifié", value: data?.projets?.filter(p => p.statut === "Planifié").length || 0 },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-8 animate-entrance">
      <SectionHeader title="Tableau de bord Global" subtitle="Vue consolidée de votre portefeuille de projets" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard label="Projets Actifs" value={projetsActifs} sub={`sur ${totalProjets} total`} color="#6366f1" icon="◈" />
        <StatCard label="Avancement Global" value={`${avgAvancement}%`} sub="moyenne tous projets" color="#8b5cf6" icon="◉" />
        <StatCard label={<>Budget Consommé <TooltipInfo term="Burn Rate" definition="Vitesse à laquelle le budget est dépensé par rapport au temps écoulé." /></>} value={`${budgetPct}%`} sub={`${(totalBudgetR / 1000).toFixed(0)}k / ${(totalBudgetP / 1000).toFixed(0)}k FCFA`} color="#a78bfa" icon="Σ" />
        <StatCard label="Risques Actifs" value={risquesActifs} sub="nécessitant attention" color="#ef4444" icon="⛨" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Tâches En cours" value={tachesEnCours} sub={`${data?.taches?.filter(t => t.statut === 'Fait').length || 0} terminées`} color="#10b981" icon="⊞" />
        <StatCard label={<>Problèmes Ouverts <TooltipInfo term="Issue Management" definition="Suivi des obstacles imprévus qui impactent directement le projet, contrairement aux risques qui sont hypothétiques." /></>} value={data?.problemes?.filter(p => p.statut !== "Résolu").length || 0} sub={`${data?.problemes?.filter(p => p.priorite === "Critique").length || 0} critiques`} color="#f59e0b" icon="⚠" />
        <StatCard label={<>Jalons Atteints <TooltipInfo term="Milestone" definition="Événement majeur avec une durée de zéro jour marquant la fin d'une étape clé." /></>} value={data?.jalons?.filter(j => j.statut === "Atteint").length || 0} sub={`sur ${data?.jalons?.length || 0} total`} color="#06b6d4" icon="◆" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-6 animate-entrance [animation-delay:100ms]">
          <h3 className="text-xs font-black app-text3 mb-8 uppercase tracking-[0.2em]">Avancement par Projet (cliquez pour détails)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={avancementData} onClick={(e) => {
              if (e && e.activePayload && e.activePayload[0]) {
                const id = e.activePayload[0].payload.id;
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
          <h3 className="text-xs font-black app-text3 mb-8 uppercase tracking-[0.2em]">Flux Financier (K FCFA)</h3>
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
          <h3 className="text-xs font-black app-text3 mb-8 uppercase tracking-[0.2em]">Répartition Statuts</h3>
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
                <span className="text-[10px] font-bold app-text3 uppercase">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 glass-card rounded-2xl p-6 animate-entrance [animation-delay:400ms]">
          <h3 className="text-xs font-black app-text2 mb-8 uppercase tracking-[0.2em]">Intelligence & Alertes</h3>
          <div className="space-y-3">
            {data?.problemes?.filter(p => p.statut !== "Résolu" && (p.priorite === "Critique" || p.priorite === "Haute")).map(p => (
              <div key={p.id} className="group flex items-start gap-5 p-4 rounded-xl app-surface border app-border hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all duration-300 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-200 dark:border-transparent flex items-center justify-center text-xl text-red-600 dark:text-red-500">⚠</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold app-text truncate tracking-tight">{p.description}</p>
                  <p className="text-[10px] app-text2 font-bold uppercase tracking-widest mt-1.5">{p.responsable} · {p.dateSignalement}</p>
                </div>
                <Badge value={p.priorite} />
              </div>
            ))}
            {data?.risques?.filter(r => (r.gravite || 0) * (r.probabilite || 0) >= 8).map(r => (
              <div key={r.id} className="group flex items-start gap-5 p-4 rounded-xl app-surface2 border app-border hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all duration-300 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-200 dark:border-transparent flex items-center justify-center text-xl text-indigo-600 dark:text-indigo-400">⛨</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold app-text truncate tracking-tight">Risque : {r.risque}</p>
                  <p className="text-[10px] app-text2 font-bold uppercase tracking-widest mt-1.5">Impact Score : {(r.gravite || 0) * (r.probabilite || 0)}/25</p>
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
