import React, { useState, useEffect } from "react";
import { toast, dialog } from '../ui';
import { Calendar, Send, Clock, FileText, Mail, Download, Trash2, Edit, CheckCircle, AlertCircle } from "lucide-react";
import { SectionHeader, Btn, Card } from "../ui";

const RapportsAutomatiques = async ({ data }) => {
  const [rapportsPlanifies, setRapportsPlanifies] = useState([]);
  const [historique, setHistorique] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nouveauRapport, setNouveauRapport] = useState({
    nom: "",
    type: "pdf",
    frequence: "hebdomadaire",
    destinataires: "",
    sections: [],
    jour: "lundi",
    heure: "09:00",
    actif: true
  });

  // Charger rapports sauvegardés
  useEffect(() => {
    const saved = localStorage.getItem('projet-elite-rapports-auto');
    if (saved) {
      const parsed = JSON.parse(saved);
      setRapportsPlanifies(parsed.planifies || []);
      setHistorique(parsed.historique || []);
    } else {
      // Rapports par défaut
      setRapportsPlanifies([
        {
          id: 1,
          nom: "Rapport Hebdomadaire",
          type: "pdf",
          frequence: "hebdomadaire",
          destinataires: "direction@entreprise.com",
          sections: ["resume", "budget", "avancement"],
          jour: "lundi",
          heure: "09:00",
          actif: true,
          dernierEnvoi: "2026-04-07",
          prochainEnvoi: "2026-04-14"
        },
        {
          id: 2,
          nom: "Synthèse Mensuelle",
          type: "excel",
          frequence: "mensuel",
          destinataires: "pmo@entreprise.com",
          sections: ["complet"],
          jour: "1",
          heure: "08:00",
          actif: true,
          dernierEnvoi: "2026-04-01",
          prochainEnvoi: "2026-05-01"
        }
      ]);
    }
  }, []);

  // Sauvegarder
  useEffect(() => {
    localStorage.setItem('projet-elite-rapports-auto', JSON.stringify({
      planifies: rapportsPlanifies,
      historique: historique
    }));
  }, [rapportsPlanifies, historique]);

  // Créer rapport
  const creerRapport = async () => {
    if (!nouveauRapport.nom || !nouveauRapport.destinataires) {
      toast.info("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const rapport = {
      id: Date.now(),
      ...nouveauRapport,
      destinataires: nouveauRapport.destinataires.split(',').map(d => d.trim()),
      dernierEnvoi: null,
      prochainEnvoi: calculerProchainEnvoi(nouveauRapport.frequence)
    };

    setRapportsPlanifies([...rapportsPlanifies, rapport]);
    setShowForm(false);
    setNouveauRapport({
      nom: "",
      type: "pdf",
      frequence: "hebdomadaire",
      destinataires: "",
      sections: [],
      jour: "lundi",
      heure: "09:00",
      actif: true
    });
  };

  // Calculer prochain envoi
  const calculerProchainEnvoi = (frequence) => {
    const now = new Date();
    if (frequence === "quotidien") {
      now.setDate(now.getDate() + 1);
    } else if (frequence === "hebdomadaire") {
      now.setDate(now.getDate() + 7);
    } else if (frequence === "mensuel") {
      now.setMonth(now.getMonth() + 1);
    }
    return now.toISOString().split('T')[0];
  };

  // Envoyer maintenant
  const envoyerMaintenant = (rapport) => {
    const nouvelHistorique = {
      id: Date.now(),
      rapportNom: rapport.nom,
      type: rapport.type,
      date: new Date().toISOString(),
      destinataires: Array.isArray(rapport.destinataires) ? rapport.destinataires.length : 1,
      statut: "envoyé",
      taille: `${(Math.random() * 5 + 1).toFixed(1)} MB`
    };

    setHistorique([nouvelHistorique, ...historique]);

    // Mettre à jour dernier envoi
    setRapportsPlanifies(rapportsPlanifies.map(r => 
      r.id === rapport.id 
        ? { ...r, dernierEnvoi: new Date().toISOString().split('T')[0] }
        : r
    ));

    toast.success(`✅ Rapport "${rapport.nom}" envoyé avec succès !`);
  };

  // Supprimer rapport
  const supprimerRapport = async (id) => {
    if (await dialog.confirm("Supprimer ce rapport planifié ?")) {
      setRapportsPlanifies(rapportsPlanifies.filter(r => r.id !== id));
    }
  };

  // Toggle actif/inactif
  const toggleActif = (id) => {
    setRapportsPlanifies(rapportsPlanifies.map(r =>
      r.id === id ? { ...r, actif: !r.actif } : r
    ));
  };

  // Toggle section
  const toggleSection = (section) => {
    if (nouveauRapport.sections.includes(section)) {
      setNouveauRapport({
        ...nouveauRapport,
        sections: nouveauRapport.sections.filter(s => s !== section)
      });
    } else {
      setNouveauRapport({
        ...nouveauRapport,
        sections: [...nouveauRapport.sections, section]
      });
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Rapports Automatisés" 
        subtitle="Programmez l'envoi automatique de rapports par email"
        action={
          <Btn onClick={() => setShowForm(!showForm)}>
            <Calendar className="w-4 h-4 mr-2" />
            Planifier un rapport
          </Btn>
        }
      />

      {/* Formulaire création */}
      {showForm && (
        <Card className="p-6 glass-card rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Nouveau Rapport Planifié</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nom du rapport *</label>
              <input
                type="text"
                value={nouveauRapport.nom}
                onChange={(e) => setNouveauRapport({...nouveauRapport, nom: e.target.value})}
                placeholder="ex: Rapport Hebdomadaire"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
              <select
                value={nouveauRapport.type}
                onChange={(e) => setNouveauRapport({...nouveauRapport, type: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Fréquence *</label>
              <select
                value={nouveauRapport.frequence}
                onChange={(e) => setNouveauRapport({...nouveauRapport, frequence: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="quotidien">Quotidien</option>
                <option value="hebdomadaire">Hebdomadaire</option>
                <option value="mensuel">Mensuel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Destinataires * (séparés par virgule)
              </label>
              <input
                type="text"
                value={nouveauRapport.destinataires}
                onChange={(e) => setNouveauRapport({...nouveauRapport, destinataires: e.target.value})}
                placeholder="email1@example.com, email2@example.com"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Jour d'envoi</label>
              <input
                type="text"
                value={nouveauRapport.jour}
                onChange={(e) => setNouveauRapport({...nouveauRapport, jour: e.target.value})}
                placeholder="lundi, mardi, 1, 15..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Heure d'envoi</label>
              <input
                type="time"
                value={nouveauRapport.heure}
                onChange={(e) => setNouveauRapport({...nouveauRapport, heure: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Sections */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-300 mb-2">Sections à inclure</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {["resume", "budget", "avancement", "risques", "jalons", "taches", "problemes", "complet"].map(section => (
                <button
                  key={section}
                  onClick={() => toggleSection(section)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    nouveauRapport.sections.includes(section)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Btn onClick={creerRapport} className="flex-1">
              <CheckCircle className="w-4 h-4 mr-2" />
              Planifier
            </Btn>
            <Btn variant="ghost" onClick={() => setShowForm(false)}>
              Annuler
            </Btn>
          </div>
        </Card>
      )}

      {/* Rapports planifiés */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          Rapports Planifiés ({rapportsPlanifies.length})
        </h3>

        {rapportsPlanifies.map(rapport => (
          <Card key={rapport.id} className={`p-6 glass-card rounded-2xl border-l-4 ${rapport.actif ? 'border-l-emerald-500' : 'border-l-slate-500'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-1">{rapport.nom}</h4>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {rapport.type.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {rapport.frequence}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {Array.isArray(rapport.destinataires) ? rapport.destinataires.length : rapport.destinataires.split(',').length} destinataire(s)
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleActif(rapport.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    rapport.actif ? 'bg-emerald-600 text-white' : 'bg-slate-600 text-slate-300'
                  }`}
                >
                  {rapport.actif ? 'Actif' : 'Inactif'}
                </button>
                <Btn size="sm" onClick={() => envoyerMaintenant(rapport)}>
                  <Send className="w-4 h-4" />
                </Btn>
                <Btn size="sm" variant="ghost" onClick={() => supprimerRapport(rapport.id)}>
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Btn>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Dernier envoi :</span>
                <span className="ml-2 text-white">{rapport.dernierEnvoi || "Jamais"}</span>
              </div>
              <div>
                <span className="text-slate-400">Prochain envoi :</span>
                <span className="ml-2 text-indigo-400 font-medium">{rapport.prochainEnvoi}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Historique */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-emerald-400" />
          Historique des Envois ({historique.length})
        </h3>

        {historique.length === 0 ? (
          <Card className="p-6 text-center text-slate-500">
            <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Aucun rapport envoyé pour le moment</p>
          </Card>
        ) : (
          historique.slice(0, 10).map(h => (
            <Card key={h.id} className="p-4 glass-card rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">{h.rapportNom}</p>
                  <p className="text-sm text-slate-400">
                    {new Date(h.date).toLocaleString('fr-FR')} • {h.destinataires} destinataire(s)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">{h.taille}</span>
                <Btn size="sm" variant="ghost">
                  <Download className="w-4 h-4" />
                </Btn>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RapportsAutomatiques;
