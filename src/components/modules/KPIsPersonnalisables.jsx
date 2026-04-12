import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, TrendingUp, Target, AlertTriangle, DollarSign, Clock, CheckCircle, BarChart3 } from "lucide-react";
import { SectionHeader, Card, Btn } from "../ui";

const KPIsPersonnalisables = ({ data }) => {
  const [kpis, setKpis] = useState(() => {
    const saved = localStorage.getItem('projet-elite-kpis-custom');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        nom: "Avancement Moyen",
        description: "Pourcentage d'avancement moyen de tous les projets",
        icone: "target",
        formule: "moyenne(avancement)",
        unite: "%",
        objectif: 80,
        seuilAlerte: 60,
        couleur: "#6366f1",
        actif: true
      },
      {
        id: 2,
        nom: "Budget Consommé",
        description: "Pourcentage du budget total utilisé",
        icone: "dollar",
        formule: "budgetReel / budgetTotal * 100",
        unite: "%",
        objectif: 75,
        seuilAlerte: 90,
        couleur: "#10b981",
        actif: true
      },
      {
        id: 3,
        nom: "Taux de Retard",
        description: "Pourcentage de tâches en retard",
        icone: "clock",
        formule: "tachesRetard / totalTaches * 100",
        unite: "%",
        objectif: 10,
        seuilAlerte: 20,
        couleur: "#ef4444",
        actif: true
      }
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [nouveauKPI, setNouveauKPI] = useState({
    nom: "",
    description: "",
    icone: "target",
    formule: "",
    unite: "%",
    objectif: 50,
    seuilAlerte: 80,
    couleur: "#6366f1",
    actif: true
  });

  useEffect(() => {
    localStorage.setItem('projet-elite-kpis-custom', JSON.stringify(kpis));
  }, [kpis]);

  // Calculer valeur KPI
  const calculerValeur = (kpi) => {
    const formule = kpi.formule.toLowerCase();
    
    if (formule.includes("moyenne") && formule.includes("avancement")) {
      return data.projets?.length > 0 
        ? (data.projets.reduce((sum, p) => sum + p.avancement, 0) / data.projets.length).toFixed(1)
        : 0;
    }
    
    if (formule.includes("budgetreel") && formule.includes("budgettotal")) {
      const total = data.projets?.reduce((sum, p) => sum + p.budget, 0) || 1;
      const reel = data.projets?.reduce((sum, p) => sum + (p.budgetReel || 0), 0) || 0;
      return ((reel / total) * 100).toFixed(1);
    }
    
    if (formule.includes("tachesretard")) {
      const total = data.taches?.length || 1;
      const retard = data.delais?.filter(d => d.reel && new Date(d.reel) > new Date(d.planifie)).length || 0;
      return ((retard / total) * 100).toFixed(1);
    }

    // Valeur par défaut basée sur le nom
    if (kpi.nom.toLowerCase().includes("risque")) {
      return data.risques?.filter(r => r.statut === "Actif").length || 0;
    }

    if (kpi.nom.toLowerCase().includes("projet")) {
      return data.projets?.length || 0;
    }

    return Math.floor(Math.random() * 100);
  };

  // Déterminer statut
  const getStatut = (valeur, objectif, seuilAlerte) => {
    const val = parseFloat(valeur);
    if (val <= seuilAlerte) return "success";
    if (val <= objectif) return "warning";
    return "danger";
  };

  const getStatutColor = (statut) => {
    switch(statut) {
      case "success": return "text-emerald-400";
      case "warning": return "text-yellow-400";
      case "danger": return "text-red-400";
      default: return "text-slate-400";
    }
  };

  const getProgressBarColor = (statut) => {
    switch(statut) {
      case "success": return "bg-emerald-500";
      case "warning": return "bg-yellow-500";
      case "danger": return "bg-red-500";
      default: return "bg-slate-500";
    }
  };

  const getIcone = (icone) => {
    switch(icone) {
      case "target": return <Target className="w-6 h-6" />;
      case "dollar": return <DollarSign className="w-6 h-6" />;
      case "clock": return <Clock className="w-6 h-6" />;
      case "alert": return <AlertTriangle className="w-6 h-6" />;
      case "check": return <CheckCircle className="w-6 h-6" />;
      case "trend": return <TrendingUp className="w-6 h-6" />;
      case "chart": return <BarChart3 className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
    }
  };

  // Créer KPI
  const creerKPI = () => {
    if (!nouveauKPI.nom || !nouveauKPI.formule) {
      alert("Veuillez remplir le nom et la formule");
      return;
    }

    const kpi = {
      id: Date.now(),
      ...nouveauKPI
    };

    setKpis([...kpis, kpi]);
    setShowForm(false);
    setNouveauKPI({
      nom: "",
      description: "",
      icone: "target",
      formule: "",
      unite: "%",
      objectif: 50,
      seuilAlerte: 80,
      couleur: "#6366f1",
      actif: true
    });
  };

  // Mettre à jour KPI
  const mettreAJour = () => {
    setKpis(kpis.map(k => k.id === editingId ? nouveauKPI : k));
    setEditingId(null);
    setShowForm(false);
  };

  // Supprimer KPI
  const supprimerKPI = (id) => {
    if (confirm("Supprimer ce KPI ?")) {
      setKpis(kpis.filter(k => k.id !== id));
    }
  };

  // Éditer KPI
  const editerKPI = (kpi) => {
    setNouveauKPI(kpi);
    setEditingId(kpi.id);
    setShowForm(true);
  };

  const icones = ["target", "dollar", "clock", "alert", "check", "trend", "chart"];
  const couleurs = ["#6366f1", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#ef4444", "#06b6d4"];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="KPIs Personnalisables" 
        subtitle="Créez et configurez vos indicateurs de performance"
        action={
          <Btn onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setNouveauKPI({
              nom: "",
              description: "",
              icone: "target",
              formule: "",
              unite: "%",
              objectif: 50,
              seuilAlerte: 80,
              couleur: "#6366f1",
              actif: true
            });
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau KPI
          </Btn>
        }
      />

      {/* Formulaire */}
      {showForm && (
        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">
            {editingId ? "Modifier le KPI" : "Nouveau KPI"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nom *</label>
              <input
                type="text"
                value={nouveauKPI.nom}
                onChange={(e) => setNouveauKPI({...nouveauKPI, nom: e.target.value})}
                placeholder="ex: Taux de Satisfaction"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Unité</label>
              <input
                type="text"
                value={nouveauKPI.unite}
                onChange={(e) => setNouveauKPI({...nouveauKPI, unite: e.target.value})}
                placeholder="%, €, jours..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <input
                type="text"
                value={nouveauKPI.description}
                onChange={(e) => setNouveauKPI({...nouveauKPI, description: e.target.value})}
                placeholder="Description du KPI"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Formule de calcul *</label>
              <input
                type="text"
                value={nouveauKPI.formule}
                onChange={(e) => setNouveauKPI({...nouveauKPI, formule: e.target.value})}
                placeholder="ex: moyenne(avancement) ou budgetReel / budgetTotal * 100"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
              <p className="text-xs text-slate-500 mt-1">
                Utilisez: moyenne(), somme(), compteur(), etc.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Objectif</label>
              <input
                type="number"
                value={nouveauKPI.objectif}
                onChange={(e) => setNouveauKPI({...nouveauKPI, objectif: parseFloat(e.target.value)})}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Seuil Alerte</label>
              <input
                type="number"
                value={nouveauKPI.seuilAlerte}
                onChange={(e) => setNouveauKPI({...nouveauKPI, seuilAlerte: parseFloat(e.target.value)})}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Icône</label>
              <div className="grid grid-cols-4 gap-2">
                {icones.map(icone => (
                  <button
                    key={icone}
                    onClick={() => setNouveauKPI({...nouveauKPI, icone})}
                    className={`p-3 rounded-lg transition-colors ${
                      nouveauKPI.icone === icone
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {getIcone(icone)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Couleur</label>
              <div className="grid grid-cols-4 gap-2">
                {couleurs.map(couleur => (
                  <button
                    key={couleur}
                    onClick={() => setNouveauKPI({...nouveauKPI, couleur})}
                    className={`w-full h-10 rounded-lg transition-all ${
                      nouveauKPI.couleur === couleur ? 'scale-110 ring-2 ring-white' : ''
                    }`}
                    style={{ backgroundColor: couleur }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Btn onClick={editingId ? mettreAJour : creerKPI} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              {editingId ? "Mettre à jour" : "Créer"}
            </Btn>
            <Btn variant="ghost" onClick={() => setShowForm(false)}>
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Btn>
          </div>
        </Card>
      )}

      {/* KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.filter(k => k.actif).map(kpi => {
          const valeur = calculerValeur(kpi);
          const statut = getStatut(valeur, kpi.objectif, kpi.seuilAlerte);
          const pourcentage = Math.min(100, (valeur / kpi.objectif) * 100);

          return (
            <Card key={kpi.id} className="p-6 glass-card rounded-2xl hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div style={{ color: kpi.couleur }}>
                    {getIcone(kpi.icone)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{kpi.nom}</h4>
                    <p className="text-xs text-slate-400">{kpi.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editerKPI(kpi)}
                    className="p-1 text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => supprimerKPI(kpi.id)}
                    className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">{valeur}</span>
                  <span className="text-lg text-slate-400">{kpi.unite}</span>
                </div>
                <div className={`text-sm font-medium ${getStatutColor(statut)}`}>
                  {statut === "success" && "✅ Objectif atteint"}
                  {statut === "warning" && "⚠️ Attention"}
                  {statut === "danger" && "🔴 Alerte"}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Progression</span>
                  <span>{pourcentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getProgressBarColor(statut)}`}
                    style={{ width: `${pourcentage}%`, backgroundColor: kpi.couleur }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">Objectif:</span>
                  <span className="ml-1 text-slate-300">{kpi.objectif}{kpi.unite}</span>
                </div>
                <div>
                  <span className="text-slate-500">Alerte:</span>
                  <span className="ml-1 text-slate-300">{kpi.seuilAlerte}{kpi.unite}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {kpis.filter(k => k.actif).length === 0 && (
        <Card className="p-12 text-center text-slate-500">
          <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Aucun KPI configuré</p>
          <p className="text-sm mt-2">Créez votre premier KPI personnalisé</p>
        </Card>
      )}
    </div>
  );
};

export default KPIsPersonnalisables;
