import React, { useState } from "react";
import { Badge, Btn, SectionHeader, Modal, Input } from "../ui";

const Workflows = ({ data = [], setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nom: "", declencheur: "", action: "", statut: "Actif" });

  const handleSave = () => {
    if (!form.nom || !form.declencheur || !form.action) return;
    const newRule = { ...form, id: Date.now() };
    if (setData) setData([...data, newRule]);
    setShowModal(false);
    setForm({ nom: "", declencheur: "", action: "", statut: "Actif" });
  };

  const toggleStatut = (id) => {
    if (!setData) return;
    setData(data.map(w => w.id === id ? { ...w, statut: w.statut === "Actif" ? "Inactif" : "Actif" } : w));
  };

  const deleteRule = (id) => {
    if (!setData) return;
    setData(data.filter(w => w.id !== id));
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Moteur de Règles & Notifications" subtitle="Automatisez vos processus de gestion" action={<Btn size="md" onClick={() => setShowModal(true)}>+ Créer Règle</Btn>} />
      
      {data.length === 0 ? (
        <div className="text-center p-8 app-text3 glass-card rounded-2xl">
          <p>Aucune règle d'automatisation définie.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map(w => (
            <div key={w.id} className="app-surface2 border app-border rounded-xl p-4 flex justify-between items-center hover:border-indigo-500/40">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold app-text">{w.nom}</h3>
                  <Badge value={w.statut} map={{ "Actif": "#10b981", "Inactif": "#64748b" }} />
                </div>
                <p className="text-xs app-text2">Si <strong className="text-indigo-400">{w.declencheur}</strong> alors <strong className="text-indigo-400">{w.action}</strong></p>
              </div>
              <div className="flex items-center gap-4">
                <Btn variant="ghost" size="sm" onClick={() => deleteRule(w.id)} className="text-red-400 hover:text-red-300">✕</Btn>
                <div className="w-10 h-6 app-surface3 rounded-full relative cursor-pointer" onClick={() => toggleStatut(w.id)}>
                  <div className={`w-4 h-4 rounded-full absolute top-1 transition-all ${w.statut === "Actif" ? "left-5 bg-indigo-500" : "left-1 bg-slate-500"}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title="Nouvelle Règle d'Automatisation" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <Input label="Nom de la règle" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Ex: Alerte dépassement budget" />
            <Input label="Déclencheur (SI)" value={form.declencheur} onChange={(e) => setForm({ ...form, declencheur: e.target.value })} placeholder="Ex: Dépenses > 90% du budget" />
            <Input label="Action (ALORS)" value={form.action} onChange={(e) => setForm({ ...form, action: e.target.value })} placeholder="Ex: Envoyer un email au chef de projet" />
            <div className="flex gap-3 pt-4">
              <Btn onClick={handleSave} className="flex-1">Enregistrer la règle</Btn>
              <Btn variant="ghost" onClick={() => setShowModal(false)}>Annuler</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Workflows;
