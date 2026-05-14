import React, { useState, useMemo } from "react";
import { SectionHeader, Card, Btn, TooltipInfo } from "../ui";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import useStore from "../../store/useStore";

// ─── RACI DATA ───
const ROLES = ["Chef Projet", "BTP Elite", "RH", "Finance", "Client"];
const RACI_COLORS = { R: "#ef4444", A: "#6366f1", C: "#f59e0b", I: "#94a3b8" };
const RACI_LABELS = { R: "Responsable", A: "Approbateur", C: "Consulté", I: "Informé" };

export default function OutilsExpert() {
  const { data, userMode } = useStore();
  const [tab, setTab] = useState("cpm");

  const taches = data.taches || [];
  const couts = data.couts || [];
  const budget = data.budget || [];

  // ─── CPM CALCULATION ───
  const cpmTasks = useMemo(() => {
    const base = taches.length > 0 ? taches : [
      { id: 1, titre: "Étude préalable", duree: 15, predecesseur: null },
      { id: 2, titre: "Étude technique", duree: 20, predecesseur: 1 },
      { id: 3, titre: "Construction bâtiment", duree: 90, predecesseur: 2 },
      { id: 4, titre: "Modules formation", duree: 45, predecesseur: 2 },
      { id: 5, titre: "Recrutement formateurs", duree: 30, predecesseur: 4 },
      { id: 6, titre: "Recrutement apprenants", duree: 25, predecesseur: 5 },
    ];
    // Forward pass
    let tasks = base.map((t, i) => ({
      id: t.id || i + 1,
      nom: t.titre || t.nom || `Tâche ${i + 1}`,
      duree: t.duree || Math.floor(Math.random() * 30) + 10,
      predecesseur: t.predecesseur || (i > 0 ? base[i - 1]?.id || i : null),
      ES: 0, EF: 0, LS: 0, LF: 0, marge: 0, critique: false,
      statut: t.statut || "À faire",
    }));
    // ES/EF
    tasks.forEach(t => {
      const pred = tasks.find(p => p.id === t.predecesseur);
      t.ES = pred ? pred.EF : 0;
      t.EF = t.ES + t.duree;
    });
    const projectEnd = Math.max(...tasks.map(t => t.EF));
    // Backward pass LS/LF
    for (let i = tasks.length - 1; i >= 0; i--) {
      const t = tasks[i];
      const successors = tasks.filter(s => s.predecesseur === t.id);
      t.LF = successors.length > 0 ? Math.min(...successors.map(s => s.LS)) : projectEnd;
      t.LS = t.LF - t.duree;
      t.marge = t.LS - t.ES;
      t.critique = t.marge === 0;
    }
    return tasks;
  }, [taches]);

  const cheminCritique = cpmTasks.filter(t => t.critique);
  const dureeProjet = Math.max(...cpmTasks.map(t => t.EF));

  // ─── RACI MATRIX ───
  const [raciData, setRaciData] = useState(() => {
    const activities = taches.length > 0
      ? taches.map(t => t.titre)
      : ["Étude préalable", "Étude technique", "Construction", "Modules formation", "Recrutement formateurs", "Recrutement apprenants"];
    return activities.map((a, i) => ({
      activite: a,
      roles: ROLES.reduce((acc, r, j) => {
        if (j === 0) acc[r] = i < 2 ? "R" : "A";
        else if (j === 1) acc[r] = i === 2 ? "R" : i < 2 ? "C" : "I";
        else if (j === 2) acc[r] = i >= 4 ? "R" : "I";
        else if (j === 3) acc[r] = "C";
        else acc[r] = "I";
        return acc;
      }, {})
    }));
  });

  const cycleRaci = (actIdx, role) => {
    const order = ["R", "A", "C", "I", ""];
    setRaciData(prev => {
      const copy = [...prev];
      const current = copy[actIdx].roles[role] || "";
      const next = order[(order.indexOf(current) + 1) % order.length];
      copy[actIdx] = { ...copy[actIdx], roles: { ...copy[actIdx].roles, [role]: next } };
      return copy;
    });
  };

  // ─── S-CURVE ───
  const sCurveData = useMemo(() => {
    const totalBudget = budget.reduce((s, b) => s + (b.planifie || 0), 0);
    const totalReel = budget.reduce((s, b) => s + (b.reel || 0), 0);
    const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
    return months.map((m, i) => {
      const factor = Math.min(1, (i + 1) / 12);
      const sCurve = factor * factor * (3 - 2 * factor); // smoothstep
      return {
        mois: m,
        prevu: Math.round(totalBudget * sCurve),
        reel: i < 5 ? Math.round(totalReel * (i + 1) / 5) : null,
        ecart: i < 5 ? Math.round(totalReel * (i + 1) / 5) - Math.round(totalBudget * sCurve) : null,
      };
    });
  }, [budget]);

  return (
    <div className="space-y-6 animate-entrance max-w-6xl mx-auto">
      <SectionHeader
        title={<>🔬 Outils Expert <TooltipInfo term="Outils Avancés" definition="Méthodes quantitatives utilisées par les professionnels certifiés PMP pour piloter les projets complexes." /></>}
        subtitle="CPM · Matrice RACI · S-Curve — Les armes des chefs de projet d'élite"
      />

      <div className="flex gap-2 flex-wrap border-b border-slate-800 pb-4">
        {[
          { id: "cpm", label: "🔗 Chemin Critique (CPM)" },
          { id: "raci", label: "👥 Matrice RACI" },
          { id: "scurve", label: "📈 S-Curve Financière" },
        ].map(t => (
          <Btn key={t.id} variant={tab === t.id ? "primary" : "ghost"} size="sm" onClick={() => setTab(t.id)}>{t.label}</Btn>
        ))}
      </div>

      {/* ── CPM ── */}
      {tab === "cpm" && (
        <div className="space-y-6 animate-entrance">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Durée Projet</p>
              <p className="text-2xl font-black text-indigo-400">{dureeProjet}j</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Tâches Critiques</p>
              <p className="text-2xl font-black text-red-400">{cheminCritique.length}</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Tâches Totales</p>
              <p className="text-2xl font-black text-white">{cpmTasks.length}</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Marge Max</p>
              <p className="text-2xl font-black text-emerald-400">{Math.max(...cpmTasks.map(t => t.marge))}j</p>
            </Card>
          </div>

          {userMode === "debutant" && (
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-sm text-indigo-300">
              💡 <strong>Le Chemin Critique</strong> est la séquence de tâches la plus longue du projet. Tout retard sur une tâche critique retarde le projet entier. Les tâches en <span className="text-red-400 font-bold">rouge</span> n'ont <strong>aucune marge</strong>.
            </div>
          )}

          {/* Gantt-like CPM */}
          <Card className="p-6 overflow-x-auto">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Diagramme du Chemin Critique</p>
            <div className="space-y-2 min-w-[600px]">
              {cpmTasks.map((t, i) => {
                const pct = dureeProjet > 0 ? (t.duree / dureeProjet) * 100 : 0;
                const offset = dureeProjet > 0 ? (t.ES / dureeProjet) * 100 : 0;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-bold w-48 flex-shrink-0 truncate">{t.nom}</span>
                    <div className="flex-1 h-8 bg-slate-800/50 rounded-lg relative overflow-hidden">
                      <div
                        className={`absolute top-0 h-full rounded-lg flex items-center px-2 transition-all ${t.critique ? "bg-red-500/80" : "bg-indigo-500/60"}`}
                        style={{ left: `${offset}%`, width: `${Math.max(pct, 3)}%` }}
                      >
                        <span className="text-[9px] font-black text-white whitespace-nowrap">{t.duree}j</span>
                      </div>
                      {t.marge > 0 && (
                        <div
                          className="absolute top-0 h-full bg-emerald-500/20 border-l-2 border-dashed border-emerald-500/40 rounded-r-lg"
                          style={{ left: `${offset + pct}%`, width: `${(t.marge / dureeProjet) * 100}%` }}
                        />
                      )}
                    </div>
                    <span className={`text-[10px] font-black w-16 text-right ${t.critique ? "text-red-400" : "text-emerald-400"}`}>
                      {t.critique ? "⛔ 0j" : `+${t.marge}j`}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 mt-4 text-[10px] text-slate-500">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500/80" /> Critique</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-indigo-500/60" /> Normal</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40" /> Marge libre</span>
            </div>
          </Card>

          {/* Critical Path detail */}
          <Card className="p-6 bg-red-500/5 border border-red-500/20">
            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-3">⛔ Chemin Critique ({cheminCritique.length} tâches · {dureeProjet} jours)</p>
            <div className="flex flex-wrap gap-2">
              {cheminCritique.map((t, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="px-3 py-1.5 bg-red-500/20 text-red-300 rounded-lg text-xs font-bold border border-red-500/30">{t.nom}</span>
                  {i < cheminCritique.length - 1 && <span className="text-red-500 font-bold">→</span>}
                </span>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ── RACI ── */}
      {tab === "raci" && (
        <div className="space-y-6 animate-entrance">
          {userMode === "debutant" && (
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-sm text-indigo-300">
              💡 <strong>RACI</strong> définit qui fait quoi : <span className="text-red-400 font-bold">R</span>=Responsable (fait le travail), <span className="text-indigo-400 font-bold">A</span>=Approbateur (valide), <span className="text-amber-400 font-bold">C</span>=Consulté (donne un avis), <span className="text-slate-400 font-bold">I</span>=Informé (reçoit l'info). <strong>Cliquez sur une cellule pour changer.</strong>
            </div>
          )}

          <Card className="p-6 overflow-x-auto">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Matrice RACI — Cliquez pour modifier</p>
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="text-left text-[10px] text-slate-500 uppercase font-bold pb-3 pr-4">Activité</th>
                  {ROLES.map(r => (
                    <th key={r} className="text-center text-[10px] text-slate-500 uppercase font-bold pb-3 px-2 w-24">{r}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {raciData.map((row, actIdx) => (
                  <tr key={actIdx} className="border-t border-slate-800/50">
                    <td className="py-2 pr-4 text-xs text-white font-medium">{row.activite}</td>
                    {ROLES.map(role => {
                      const val = row.roles[role] || "";
                      const color = RACI_COLORS[val] || "transparent";
                      return (
                        <td key={role} className="py-2 px-2 text-center">
                          <button
                            onClick={() => cycleRaci(actIdx, role)}
                            className="w-10 h-10 rounded-lg font-black text-sm transition-all hover:scale-110 border-2"
                            style={{
                              backgroundColor: val ? color + "20" : "transparent",
                              color: val ? color : "#475569",
                              borderColor: val ? color + "50" : "#334155",
                            }}
                          >
                            {val || "—"}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-4 mt-4 text-[10px]">
              {Object.entries(RACI_LABELS).map(([k, v]) => (
                <span key={k} className="flex items-center gap-1">
                  <span className="w-6 h-6 rounded flex items-center justify-center font-black text-xs" style={{ backgroundColor: RACI_COLORS[k] + "20", color: RACI_COLORS[k] }}>{k}</span>
                  <span className="text-slate-500">{v}</span>
                </span>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ── S-CURVE ── */}
      {tab === "scurve" && (
        <div className="space-y-6 animate-entrance">
          {userMode === "debutant" && (
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-sm text-indigo-300">
              💡 <strong>La Courbe en S</strong> compare les dépenses prévues (ligne bleue) aux dépenses réelles (ligne verte). Si la courbe réelle est au-dessus, vous dépensez plus vite que prévu. C'est un outil clé en <strong>Earned Value Management (EVM)</strong>.
            </div>
          )}

          <Card className="p-6">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Courbe en S — Budget Prévu vs Réel (FCFA)</p>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={sCurveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="mois" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: 12 }}
                  formatter={(v) => v ? `${(v / 1000000).toFixed(1)}M FCFA` : "—"}
                />
                <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 20, fontSize: 11, fontWeight: 700 }} />
                <Area type="monotone" dataKey="prevu" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} name="Budget Prévu (BCWS)" />
                <Area type="monotone" dataKey="reel" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} strokeDasharray="5 5" name="Budget Réel (ACWP)" connectNulls={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* EVM Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "BCWS (Prévu)", value: `${(budget.reduce((s, b) => s + b.planifie, 0) / 1000000).toFixed(1)}M`, color: "#6366f1", info: "Budgeted Cost of Work Scheduled" },
              { label: "ACWP (Réel)", value: `${(budget.reduce((s, b) => s + b.reel, 0) / 1000000).toFixed(1)}M`, color: "#10b981", info: "Actual Cost of Work Performed" },
              { label: "CPI", value: (budget.reduce((s, b) => s + b.planifie, 0) > 0 ? (budget.reduce((s, b) => s + b.reel, 0) / budget.reduce((s, b) => s + b.planifie, 0)).toFixed(2) : "N/A"), color: "#f59e0b", info: "Cost Performance Index — <1 = surcoût" },
              { label: "EAC", value: `${(budget.reduce((s, b) => s + b.planifie, 0) / Math.max(0.01, budget.reduce((s, b) => s + b.reel, 0) / Math.max(1, budget.reduce((s, b) => s + b.planifie, 0))) / 1000000).toFixed(1)}M`, color: "#ec4899", info: "Estimate At Completion — coût final prédit" },
            ].map((kpi, i) => (
              <Card key={i} className="p-4">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
                  {kpi.label}
                  <TooltipInfo term={kpi.label} definition={kpi.info} />
                </p>
                <p className="text-2xl font-black" style={{ color: kpi.color }}>{kpi.value}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
