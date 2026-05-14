import React, { useState } from "react";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Btn, SectionHeader } from "../ui";

// Données de démonstration simulées (aucun backend blockchain requis)
const DEMO_CONTRACTS = [
  { id: "0x4f2a...c831", projet: "Refonte SI Comptable", montant: 45000000, condition: "Livraison Jalon 3 validée", date: "2025-03-15", statut: "Exécuté", hash: "0x4f2ac831b9e3a5d17f8e2b4c6a9d0e3f1c7a8b2d5e9f0a1c" },
  { id: "0x7d1e...a44b", projet: "Pont Renaissance", montant: 120000000, condition: "Approbation chef projet + client", date: "2025-04-02", statut: "En attente", hash: "0x7d1ea44b2c5f8a9b0d3e6f1c4b7a2d5e8f9c0a3b6d1e4f7a" },
  { id: "0x3b9c...f210", projet: "Immeuble R+12", montant: 80000000, condition: "Dépassement budget > 15%", date: "2025-04-20", statut: "Bloqué", hash: "0x3b9cf2101d4e7a8b0c5f2e9d3a6b1c7f4e8a2b5d9c0f3a6e" },
  { id: "0x9a2f...d563", projet: "Green Data Center", montant: 35000000, condition: "Audit qualité ISO 9001 passé", date: "2025-05-01", statut: "En attente", hash: "0x9a2fd5636b8e1f4c7a0d3e5b9a2f4c8d1e6b0a3f7c2d5e8a" },
];

const statusColors = { "Exécuté": "#10b981", "En attente": "#f59e0b", "Bloqué": "#ef4444" };

const SmartContracts = ({ data: propData }) => {
  const [contracts, setContracts] = useState(DEMO_CONTRACTS);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [selected, setSelected] = useState(null);
  const [simulating, setSimulating] = useState(false);

  const totalSecurise = contracts.reduce((s, c) => s + c.montant, 0);
  const executes = contracts.filter(c => c.statut === "Exécuté").length;
  const enAttente = contracts.filter(c => c.statut === "En attente").length;

  const deployContract = () => {
    const newContract = {
      id: `0x${Math.random().toString(16).slice(2,6)}...${Math.random().toString(16).slice(2,6)}`,
      projet: form.projet || "Nouveau Projet",
      montant: Number(form.montant) || 10000000,
      condition: form.condition || "Validation chef de projet",
      date: new Date().toISOString().split("T")[0],
      statut: "En attente",
      hash: `0x${Array.from({length: 48}, () => Math.floor(Math.random()*16).toString(16)).join('')}`,
    };
    setContracts(prev => [newContract, ...prev]);
    setModal(null);
    setForm({});
  };

  const executeContract = async (id) => {
    setSimulating(true);
    await new Promise(r => setTimeout(r, 1200));
    setContracts(prev => prev.map(c => c.id === id ? {...c, statut: "Exécuté"} : c));
    setSimulating(false);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gouvernance & Smart Contracts"
        subtitle="Registre immuable des approbations et paiements automatiques"
        action={
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-600/10 border border-amber-500/30 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="text-xs text-amber-400 font-bold">Mode Simulation</span>
            </div>
            <Btn size="md" onClick={() => setModal("deploy")} className="bg-emerald-600 hover:bg-emerald-500 text-white">
              + Déployer Contrat
            </Btn>
          </div>
        }
      />

      {/* Info banner */}
      <div className="p-4 bg-indigo-600/10 border border-indigo-500/30 rounded-xl text-sm text-indigo-300">
        <strong>ℹ️ Mode simulation :</strong> Les contrats affichés sont des démonstrations locales.
        Pour connecter un vrai réseau blockchain (Ethereum, Polygon, Hyperledger), configurez le provider Web3 dans <code className="text-indigo-200 bg-indigo-900/30 px-1 rounded">src/lib/web3Provider.js</code>.
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 text-center">
          <div className="text-3xl font-black text-white">{contracts.length}</div>
          <div className="text-xs text-slate-400 mt-1">Contrats total</div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 text-center">
          <div className="text-3xl font-black text-emerald-400">{executes}</div>
          <div className="text-xs text-slate-400 mt-1">Exécutés</div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 text-center">
          <div className="text-3xl font-black text-amber-400">{enAttente}</div>
          <div className="text-xs text-slate-400 mt-1">En attente</div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-black text-indigo-400">{(totalSecurise / 1000000).toFixed(0)}M</div>
          <div className="text-xs text-slate-400 mt-1">FCFA sécurisés</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-700">
              {["Hash Contrat", "Projet", "Montant", "Condition de Trigger", "Date", "Statut", "Action"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => (
              <tr key={c.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer"
                onClick={() => setSelected(selected?.id === c.id ? null : c)}>
                <td className="px-4 py-3 text-xs font-mono text-indigo-400">{c.id}</td>
                <td className="px-4 py-3 text-sm text-slate-200">{c.projet}</td>
                <td className="px-4 py-3 text-sm font-bold text-emerald-400">{c.montant.toLocaleString()} FCFA</td>
                <td className="px-4 py-3 text-xs text-slate-400">λ {c.condition}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{c.date}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-bold"
                    style={{ background: statusColors[c.statut] + "22", color: statusColors[c.statut] }}>
                    {c.statut}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {c.statut === "En attente" && (
                    <Btn size="sm" onClick={(e) => { e.stopPropagation(); executeContract(c.id); }} disabled={simulating}
                      className="text-xs bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/40">
                      {simulating ? "⌛" : "▶ Exécuter"}
                    </Btn>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="bg-slate-800/60 border border-indigo-500/30 rounded-xl p-5 space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-white">{selected.projet} — Détails du contrat</h3>
            <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white">✕</button>
          </div>
          <div className="font-mono text-xs text-indigo-300 break-all">{selected.hash}</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-slate-400">Montant sécurisé :</span> <span className="text-emerald-400 font-bold">{selected.montant.toLocaleString()} FCFA</span></div>
            <div><span className="text-slate-400">Date déploiement :</span> <span className="text-white">{selected.date}</span></div>
            <div className="col-span-2"><span className="text-slate-400">Condition trigger :</span> <span className="text-amber-300"> {selected.condition}</span></div>
          </div>
        </div>
      )}

      {/* Modal deploy */}
      {modal === "deploy" && (
        <Modal title="Déployer un Smart Contract" onClose={() => setModal(null)}>
          <Input label="Projet concerné" value={form.projet || ""} onChange={e => setForm({...form, projet: e.target.value})} placeholder="Refonte SI..." />
          <Input label="Montant à sécuriser (FCFA)" type="number" value={form.montant || ""} onChange={e => setForm({...form, montant: e.target.value})} placeholder="10000000" />
          <Input label="Condition de déclenchement" value={form.condition || ""} onChange={e => setForm({...form, condition: e.target.value})} placeholder="Validation jalon 2 par le client" />
          <div className="flex gap-3 pt-2">
            <Btn onClick={deployContract} size="md" className="flex-1 bg-emerald-600 text-white">Déployer</Btn>
            <Btn onClick={() => setModal(null)} variant="ghost" size="md">Annuler</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SmartContracts;
