import React, { useState } from "react";
import { Users, Shield, Lock, Eye, Edit, Trash2, UserPlus, Key, Activity } from "lucide-react";
import { SectionHeader, Card, Btn, Badge, Modal, Input, Select } from "../ui";

const GestionUtilisateurs = ({ data = {} }) => {
  const [users, setUsers] = useState([
    { id: 1, nom: "Mamadou Elimané Wane", email: "m.wane@elite.com", role: "Admin", statut: "Actif", derniereConnexion: "Il y a 5 min" },
    { id: 2, nom: "Fatou Diop", email: "f.diop@elite.com", role: "Manager", statut: "Actif", derniereConnexion: "Hier" },
    { id: 3, nom: "Jean Dupont", email: "j.dupont@partner.com", role: "Viewer", statut: "Inactif", derniereConnexion: "Il y a 10 jours" },
    { id: 4, nom: "Expert IA", email: "ia@elite.com", role: "Expert", statut: "Actif", derniereConnexion: "En ligne" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const roles = ["Admin", "Manager", "Expert", "Viewer", "Guest"];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Contrôle d'Accès & Privilèges (RBAC)" 
        subtitle="Gestion des identités, rôles et sécurité périmétrique"
        action={<Btn onClick={() => setShowModal(true)}><UserPlus className="w-4 h-4 mr-2" /> Ajouter un Utilisateur</Btn>}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 glass-card rounded-2xl flex flex-col items-center justify-center text-center">
           <Users className="w-8 h-8 text-indigo-400 mb-2" />
           <p className="text-2xl font-black text-white">{users.length}</p>
           <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Utilisateurs</p>
        </Card>
        <Card className="p-5 glass-card rounded-2xl flex flex-col items-center justify-center text-center">
           <Shield className="w-8 h-8 text-emerald-400 mb-2" />
           <p className="text-2xl font-black text-white">4</p>
           <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Rôles Définis</p>
        </Card>
        <Card className="p-5 glass-card rounded-2xl flex flex-col items-center justify-center text-center">
           <Lock className="w-8 h-8 text-purple-400 mb-2" />
           <p className="text-2xl font-black text-white">99.9%</p>
           <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Sûreté Identity</p>
        </Card>
        <Card className="p-5 glass-card rounded-2xl flex flex-col items-center justify-center text-center">
           <Activity className="w-8 h-8 text-orange-400 mb-2" />
           <p className="text-2xl font-black text-white">12</p>
           <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Sessions Actives</p>
        </Card>
      </div>

      {/* TABLEAU DES UTILISATEURS */}
      <Card className="glass-card rounded-2xl overflow-hidden" noPadding>
        <div className="overflow-x-auto -mx-1">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Utilisateur</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Rôle</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Statut</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase">Dernière Connexion</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold border border-slate-700">
                      {user.nom.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{user.nom}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs">
                  <Badge value={user.role} variant={user.role === 'Admin' ? 'danger' : 'indigo'} />
                </td>
                <td className="px-6 py-4">
                  <Badge value={user.statut} />
                </td>
                <td className="px-6 py-4 text-xs text-slate-500">{user.derniereConnexion}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Key className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-red-900/30 rounded-lg text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
</div>
      </Card>

      {/* SECTION PRIVILÈGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="p-6 glass-card rounded-2xl border-t-2 border-t-indigo-500">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
               <Shield className="w-5 h-5 text-indigo-400" />
               Configuration des Permissions par Rôle
            </h3>
            <div className="space-y-4">
               {roles.map(role => (
                 <div key={role} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                    <span className="text-sm font-bold text-white">{role}</span>
                    <div className="flex gap-2">
                       <div className="px-2 py-0.5 bg-emerald-500/10 text-[9px] text-emerald-400 rounded font-black border border-emerald-500/20">LECTURE</div>
                       {role !== 'Viewer' && <div className="px-2 py-0.5 bg-blue-500/10 text-[9px] text-blue-400 rounded font-black border border-blue-500/20">ÉDITION</div>}
                       {role === 'Admin' && <div className="px-2 py-0.5 bg-red-500/10 text-[9px] text-red-400 rounded font-black border border-red-500/20">SUPPRESSION</div>}
                    </div>
                 </div>
               ))}
            </div>
         </Card>

         <Card className="p-6 glass-card rounded-2xl border-t-2 border-t-orange-500">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
               <Activity className="w-5 h-5 text-orange-400" />
               Audit Log (Activités Récentes)
            </h3>
            <div className="space-y-3">
               {[
                 { action: "Connexion réussie", user: "Admin", time: "Il y a 2 min" },
                 { action: "Modification Budget", user: "Manager", time: "Il y a 14 min" },
                 { action: "Tentative d'accès bloquée", user: "IP 192.168.x.x", time: "Il y a 1h" },
                 { action: "Suppression Jalon #4", user: "Admin", time: "Il y a 2h" },
               ].map((log, i) => (
                 <div key={i} className="text-xs flex justify-between border-b border-slate-800/50 pb-2">
                    <span className="text-slate-400"><strong className="text-slate-300">{log.user}</strong> : {log.action}</span>
                    <span className="text-slate-600 font-mono">{log.time}</span>
                 </div>
               ))}
            </div>
         </Card>
      </div>

      {showModal && (
        <Modal title="Ajouter un nouvel accès" onClose={() => setShowModal(false)}>
           <div className="space-y-4">
              <Input label="Nom Complet" placeholder="Ex: Awa Ndiaye" />
              <Input label="Email Professionnel" placeholder="awa@elite.com" />
              <Select label="Rôle Attribué" options={roles} />
              <div className="pt-4 flex gap-3">
                 <Btn variant="ghost" onClick={() => setShowModal(false)} className="flex-1">Annuler</Btn>
                 <Btn variant="primary" className="flex-1">Créer l'Accès</Btn>
              </div>
           </div>
        </Modal>
      )}
    </div>
  );
};

export default GestionUtilisateurs;
