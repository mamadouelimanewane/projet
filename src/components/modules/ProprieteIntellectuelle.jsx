import React, { useState } from "react";
import { ShieldCheck, FileKey, Bookmark, Globe, Scale, Lock, Plus, Search } from "lucide-react";
import { SectionHeader, Card, Btn, Badge } from "../ui";

const ProprieteIntellectuelle = ({ data = {} }) => {
  const [assets, setAssets] = useState([
    { id: 1, titre: "Algorithme de Prédiction Monte Carlo v4", type: "Brevet", numero: "FR-2026-001", statut: "Déposé", protection: "Mondiale" },
    { id: 2, titre: "Design Interface Elite (Glassmorphism)", type: "Modèle", numero: "EU-78921", statut: "Validé", protection: "Europe" },
    { id: 3, titre: "Méthodologie Star Academy Hub", type: "Secret Industriel", numero: "INTERN-01", statut: "Protégé", protection: "Interne" },
  ]);

  const addAsset = () => {
    const newAsset = {
      id: Date.now(),
      titre: "Nouveau Brevet d'Innovation",
      type: "Brevet",
      numero: `FR-2026-${Math.floor(Math.random() * 900) + 100}`,
      statut: "En rédaction",
      protection: "Mondiale"
    };
    setAssets([newAsset, ...assets]);
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Propriété Intellectuelle (IP Guard)" 
        subtitle="Sécurisation des innovations, brevets et secrets industriels"
        action={<Btn onClick={addAsset}><Plus className="w-4 h-4 mr-2" /> Déposer une IP</Btn>}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 glass-card rounded-2xl flex flex-col items-center justify-center text-center">
           <FileKey className="w-8 h-8 text-indigo-400 mb-2" />
           <p className="text-2xl font-black app-text">4</p>
           <p className="text-[10px] app-text3 uppercase font-bold tracking-widest">Brevets</p>
        </Card>
        <Card className="p-5 glass-card rounded-2xl flex flex-col items-center justify-center text-center">
           <Bookmark className="w-8 h-8 text-emerald-400 mb-2" />
           <p className="text-2xl font-black app-text">12</p>
           <p className="text-[10px] app-text3 uppercase font-bold tracking-widest">Marques</p>
        </Card>
        <Card className="p-5 glass-card rounded-2xl flex flex-col items-center justify-center text-center">
           <Lock className="w-8 h-8 text-red-400 mb-2" />
           <p className="text-2xl font-black app-text">8</p>
           <p className="text-[10px] app-text3 uppercase font-bold tracking-widest">Secrets</p>
        </Card>
        <Card className="p-5 glass-card rounded-2xl flex flex-col items-center justify-center text-center">
           <Scale className="w-8 h-8 text-purple-400 mb-2" />
           <p className="text-2xl font-black app-text">100%</p>
           <p className="text-[10px] app-text3 uppercase font-bold tracking-widest">Couverture IP</p>
        </Card>
      </div>

      <Card className="glass-card rounded-2xl overflow-hidden" noPadding>
          <div className="p-4 border-b app-border flex items-center justify-between">
             <h3 className="font-bold app-text">Registre des Actifs Immatériels</h3>
             <div className="flex gap-2">
                <Btn size="sm" variant="ghost">Filtrer</Btn>
                <Btn size="sm" variant="ghost">Exporter</Btn>
             </div>
          </div>
          <div className="overflow-x-auto -mx-1">
          <table className="w-full text-left">
            <thead className="app-surface border-b app-border">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black app-text3 uppercase">Actif / Innovation</th>
                <th className="px-6 py-4 text-[10px] font-black app-text3 uppercase">Type</th>
                <th className="px-6 py-4 text-[10px] font-black app-text3 uppercase">Numéro / ID</th>
                <th className="px-6 py-4 text-[10px] font-black app-text3 uppercase">Protection</th>
                <th className="px-6 py-4 text-[10px] font-black app-text3 uppercase text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {assets.map(asset => (
                <tr key={asset.id} className="hover:app-surface2 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold app-text">{asset.titre}</span>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <Badge value={asset.type} variant="indigo" />
                  </td>
                  <td className="px-6 py-4 text-xs font-mono app-text3">{asset.numero}</td>
                  <td className="px-6 py-4 text-xs app-text2">
                     <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        {asset.protection}
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Badge value={asset.statut} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </Card>

        {/* Monitoring IP Leak */}
        <Card className="p-6 glass-card rounded-2xl border border-red-500/20 bg-red-600/5">
           <div className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-red-400" />
              <div>
                 <h4 className="font-bold app-text">Monitoring Active IP Guard</h4>
                 <p className="text-xs app-text2">Scan continu du Web et du Darknet pour détecter des fuites de secrets industriels.</p>
              </div>
              <div className="ml-auto">
                 <Badge variant="success">Sécurisé</Badge>
              </div>
           </div>
        </Card>
    </div>
  );
};

export default ProprieteIntellectuelle;
