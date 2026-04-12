import React, { useState, useEffect } from "react";
import { Bell, Mail, AlertTriangle, CheckCircle, XCircle, Clock, Settings, Trash2 } from "lucide-react";
import { SectionHeader, Btn, Badge, Modal, Input, Select } from "../ui";

const Notifications = ({ data }) => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [configModal, setConfigModal] = useState(false);
  const [newNotif, setNewNotif] = useState({
    type: "info",
    titre: "",
    message: "",
    projet: "",
    priorite: "Moyenne",
    destinataire: ""
  });
  const [config, setConfig] = useState({
    emailAlerts: true,
    pushNotifications: true,
    slackIntegration: false,
    dailyReport: true,
    weeklyReport: true,
    monthlyReport: false,
    alertThreshold: 80,
    criticalOnly: false
  });

  // Charger notifications depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('projet-elite-notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      // Notifications par défaut basées sur les données
      generateDefaultNotifications();
    }
  }, [data]);

  // Sauvegarder dans localStorage
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('projet-elite-notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  // Générer notifications automatiques basées sur les données
  const generateDefaultNotifications = () => {
    const autoNotifs = [];

    // Alertes budget
    data.budget?.forEach(b => {
      const pct = (b.reel / b.planifie) * 100;
      if (pct > 100) {
        autoNotifs.push({
          id: Date.now() + Math.random(),
          type: "critical",
          titre: "Dépassement Budget",
          message: `${b.categorie}: ${pct.toFixed(1)}% du budget utilisé`,
          projet: "Global",
          priorite: "Critique",
          date: new Date().toISOString(),
          lu: false,
          archive: false
        });
      }
    });

    // Alertes retards
    data.delais?.forEach(d => {
      if (d.reel && new Date(d.reel) > new Date(d.planifie)) {
        autoNotifs.push({
          id: Date.now() + Math.random(),
          type: "warning",
          titre: "Retard Détecté",
          message: `Tâche "${d.tache}" en retard de ${Math.ceil((new Date(d.reel) - new Date(d.planifie)) / (1000*60*60*24))} jours`,
          projet: "Global",
          priorite: "Haute",
          date: new Date().toISOString(),
          lu: false,
          archive: false
        });
      }
    });

    // Alertes risques
    data.risques?.filter(r => r.statut === "Actif" && r.gravite * r.probabilite >= 12).forEach(r => {
      autoNotifs.push({
        id: Date.now() + Math.random(),
        type: "warning",
        titre: "Risque Élevé",
        message: `${r.risque} (Score: ${r.gravite * r.probabilite}/25)`,
        projet: "Global",
        priorite: "Haute",
        date: new Date().toISOString(),
        lu: false,
        archive: false
      });
    });

    // Alertes problèmes critiques
    data.problemes?.filter(p => p.statut !== "Résolu" && p.priorite === "Critique").forEach(p => {
      autoNotifs.push({
        id: Date.now() + Math.random(),
        type: "critical",
        titre: "Problème Critique",
        message: p.description,
        projet: "Global",
        priorite: "Critique",
        date: new Date().toISOString(),
        lu: false,
        archive: false
      });
    });

    // Jalons à venir
    data.jalons?.forEach(j => {
      const daysUntil = Math.ceil((new Date(j.date) - new Date()) / (1000*60*60*24));
      if (daysUntil > 0 && daysUntil <= 7 && j.statut !== "Atteint") {
        autoNotifs.push({
          id: Date.now() + Math.random(),
          type: "info",
          titre: "Jalon à Venir",
          message: `"${j.jalon}" dans ${daysUntil} jour(s)`,
          projet: "Global",
          priorite: "Moyenne",
          date: new Date().toISOString(),
          lu: false,
          archive: false
        });
      }
    });

    setNotifications(autoNotifs);
  };

  // Marquer comme lu
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, lu: true } : n
    ));
  };

  // Marquer tout comme lu
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, lu: true })));
  };

  // Archiver notification
  const archiveNotification = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, archive: true } : n
    ));
  };

  // Supprimer notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Créer notification manuelle
  const createNotification = () => {
    const notif = {
      id: Date.now(),
      type: newNotif.type,
      titre: newNotif.titre,
      message: newNotif.message,
      projet: newNotif.projet || "Global",
      priorite: newNotif.priorite,
      destinataire: newNotif.destinataire,
      date: new Date().toISOString(),
      lu: false,
      archive: false
    };
    setNotifications([notif, ...notifications]);
    setShowModal(false);
    setNewNotif({ type: "info", titre: "", message: "", projet: "", priorite: "Moyenne", destinataire: "" });
    
    // Simuler envoi email
    if (config.emailAlerts) {
      simulateEmailSend(notif);
    }
  };

  // Simuler envoi email
  const simulateEmailSend = (notif) => {
    console.log(`📧 Email envoyé à ${notif.destinataire || 'équipe'}:`, notif.titre);
    // En production: appel API backend SendGrid/Mailgun
  };

  // Envoyer rapport par email
  const sendReportEmail = (type) => {
    console.log(`📊 Rapport ${type} envoyé par email`);
    alert(`✅ Rapport ${type} envoyé avec succès !`);
  };

  // Filtrer notifications
  const activeNotifications = notifications.filter(n => !n.archive);
  const unreadCount = activeNotifications.filter(n => !n.lu).length;
  const criticalCount = activeNotifications.filter(n => n.type === "critical").length;

  // Icônes par type
  const typeIcons = {
    critical: <AlertTriangle className="w-5 h-5 text-red-500" />,
    warning: <Bell className="w-5 h-5 text-amber-500" />,
    info: <Mail className="w-5 h-5 text-blue-500" />,
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />
  };

  // Couleurs par type
  const typeColors = {
    critical: "border-red-500/30 bg-red-500/5",
    warning: "border-amber-500/30 bg-amber-500/5",
    info: "border-blue-500/30 bg-blue-500/5",
    success: "border-emerald-500/30 bg-emerald-500/5"
  };

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Centre de Notifications" 
        subtitle="Gérez vos alertes et communications projet"
        action={
          <div className="flex gap-2">
            <Btn onClick={() => setConfigModal(true)} variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Btn>
            <Btn onClick={() => setShowModal(true)} size="md">
              + Nouvelle Notification
            </Btn>
          </div>
        }
      />

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <div className="text-2xl font-bold text-white">{unreadCount}</div>
          <div className="text-xs text-slate-400">Non lues</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-2xl font-bold text-red-400">{criticalCount}</div>
          <div className="text-xs text-slate-400">Critiques</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-2xl font-bold text-white">{activeNotifications.length}</div>
          <div className="text-xs text-slate-400">Total Actives</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="text-2xl font-bold text-emerald-400">
            {notifications.filter(n => n.archive).length}
          </div>
          <div className="text-xs text-slate-400">Archivées</div>
        </div>
      </div>

      {/* Actions Rapides */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-wrap gap-3">
          <Btn onClick={markAllAsRead} variant="ghost" size="sm" disabled={unreadCount === 0}>
            ✓ Tout marquer comme lu
          </Btn>
          <Btn onClick={() => sendReportEmail("quotidien")} variant="ghost" size="sm">
            📧 Rapport Quotidien
          </Btn>
          <Btn onClick={() => sendReportEmail("hebdomadaire")} variant="ghost" size="sm">
            📊 Rapport Hebdomadaire
          </Btn>
          <Btn onClick={generateDefaultNotifications} variant="ghost" size="sm">
            🔄 Régénérer Alertes Auto
          </Btn>
        </div>
      </div>

      {/* Liste Notifications */}
      <div className="space-y-3">
        {activeNotifications.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-xl font-bold text-white mb-2">Aucune notification</h3>
            <p className="text-slate-400">Tout est sous contrôle !</p>
          </div>
        ) : (
          activeNotifications
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(notif => (
              <div 
                key={notif.id} 
                className={`glass-card rounded-xl p-4 border-l-4 transition-all hover:shadow-lg ${
                  typeColors[notif.type]
                } ${!notif.lu ? 'border-l-4' : 'opacity-75'}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {typeIcons[notif.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-bold ${!notif.lu ? 'text-white' : 'text-slate-400'}`}>
                        {notif.titre}
                      </h4>
                      {!notif.lu && (
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{notif.message}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>📁 {notif.projet}</span>
                      <span>🕒 {new Date(notif.date).toLocaleString('fr-FR')}</span>
                      {notif.destinataire && <span>👤 {notif.destinataire}</span>}
                      <Badge value={notif.priorite} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {!notif.lu && (
                      <Btn onClick={() => markAsRead(notif.id)} variant="ghost" size="sm">
                        <CheckCircle className="w-4 h-4" />
                      </Btn>
                    )}
                    <Btn onClick={() => archiveNotification(notif.id)} variant="ghost" size="sm">
                      <Clock className="w-4 h-4" />
                    </Btn>
                    <Btn onClick={() => deleteNotification(notif.id)} variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Btn>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Modal Nouvelle Notification */}
      {showModal && (
        <Modal title="Nouvelle Notification" onClose={() => setShowModal(false)}>
          <div className="space-y-4">
            <Select
              label="Type"
              value={newNotif.type}
              options={["critical", "warning", "info", "success"]}
              onChange={e => setNewNotif({...newNotif, type: e.target.value})}
            />
            <Input
              label="Titre"
              value={newNotif.titre}
              onChange={e => setNewNotif({...newNotif, titre: e.target.value})}
            />
            <textarea
              className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
              rows="3"
              placeholder="Message..."
              value={newNotif.message}
              onChange={e => setNewNotif({...newNotif, message: e.target.value})}
            />
            <Input
              label="Projet"
              value={newNotif.projet}
              onChange={e => setNewNotif({...newNotif, projet: e.target.value})}
            />
            <Select
              label="Priorité"
              value={newNotif.priorite}
              options={["Critique", "Haute", "Moyenne", "Basse"]}
              onChange={e => setNewNotif({...newNotif, priorite: e.target.value})}
            />
            <Input
              label="Destinataire Email"
              type="email"
              value={newNotif.destinataire}
              onChange={e => setNewNotif({...newNotif, destinataire: e.target.value})}
              placeholder="email@exemple.com"
            />
            <div className="flex gap-3">
              <Btn onClick={createNotification} className="flex-1">
                Envoyer
              </Btn>
              <Btn onClick={() => setShowModal(false)} variant="ghost">
                Annuler
              </Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Configuration */}
      {configModal && (
        <Modal title="Configuration Notifications" onClose={() => setConfigModal(false)}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Alertes Email</span>
              <input 
                type="checkbox" 
                checked={config.emailAlerts}
                onChange={e => setConfig({...config, emailAlerts: e.target.checked})}
                className="w-5 h-5 accent-indigo-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Notifications Push</span>
              <input 
                type="checkbox" 
                checked={config.pushNotifications}
                onChange={e => setConfig({...config, pushNotifications: e.target.checked})}
                className="w-5 h-5 accent-indigo-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Rapport Quotidien</span>
              <input 
                type="checkbox" 
                checked={config.dailyReport}
                onChange={e => setConfig({...config, dailyReport: e.target.checked})}
                className="w-5 h-5 accent-indigo-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Rapport Hebdomadaire</span>
              <input 
                type="checkbox" 
                checked={config.weeklyReport}
                onChange={e => setConfig({...config, weeklyReport: e.target.checked})}
                className="w-5 h-5 accent-indigo-500"
              />
            </div>
            <div className="pt-4 border-t border-slate-700">
              <label className="text-sm text-white block mb-2">Seuil Alerte Budget (%)</label>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={config.alertThreshold}
                onChange={e => setConfig({...config, alertThreshold: parseInt(e.target.value)})}
                className="w-full accent-indigo-500"
              />
              <div className="text-center text-sm text-slate-400">{config.alertThreshold}%</div>
            </div>
            <Btn onClick={() => {
              localStorage.setItem('projet-elite-notif-config', JSON.stringify(config));
              setConfigModal(false);
              alert('✅ Configuration sauvegardée !');
            }} className="w-full">
              Sauvegarder
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Notifications;
