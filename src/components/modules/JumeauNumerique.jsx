import React from "react";
import { Box, Layers, Database, Activity, Eye, Play, Map, Cpu } from "lucide-react";
import { SectionHeader, Card, Btn, Badge, ProgressBar } from "../ui";

const JumeauNumerique = ({ data = {} }) => {
  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Jumeau Numérique (Digital Twin)" 
        subtitle="Visualisation 3D et synchronisation IoT des infrastructures physiques"
        action={<Btn variant="indigo"><Activity className="w-4 h-4 mr-2" /> Sync Temps Réel</Btn>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vue 3D / BIM Placeholder */}
        <Card className="lg:col-span-2 h-[500px] glass-card rounded-2xl flex items-center justify-center relative overflow-hidden app-surface">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop')] opacity-20 bg-cover bg-center" />
           <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <Box className="w-24 h-24 text-indigo-500 mb-6 animate-pulse" />
              <p className="text-xl font-black text-white">Moteur 3D Star Engine v2</p>
              <p className="text-sm app-text3 mt-2">Chargement de la structure Star Academy...</p>
           </div>
           
           {/* Overlays UI */}
           <div className="absolute top-4 left-4 z-20 space-y-2">
              <div className="p-2 app-bg backdrop-blur border app-border rounded-lg flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] text-white font-bold uppercase tracking-widest">Capteurs IoT Actifs (142)</span>
              </div>
           </div>

           <div className="absolute bottom-4 right-4 z-20 flex gap-2">
              <Btn size="sm" variant="ghost"><Layers className="w-4 h-4" /></Btn>
              <Btn size="sm" variant="ghost"><Eye className="w-4 h-4" /></Btn>
              <Btn size="sm" variant="ghost"><Map className="w-4 h-4" /></Btn>
           </div>
        </Card>

        {/* Données IoT / Capteurs */}
        <div className="space-y-4">
           <Card className="p-6 glass-card rounded-2xl">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                Métriques de Structure
              </h3>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-xs mb-2">
                       <span className="app-text2">Contrainte Structurelle</span>
                       <span className="text-white font-bold">12% / 100</span>
                    </div>
                    <ProgressBar value={12} color="#10b981" />
                 </div>
                 <div>
                    <div className="flex justify-between text-xs mb-2">
                       <span className="app-text2">Température Béton (Séchage)</span>
                       <span className="text-white font-bold">24°C</span>
                    </div>
                    <ProgressBar value={45} color="#3b82f6" />
                 </div>
                 <div>
                    <div className="flex justify-between text-xs mb-2">
                       <span className="app-text2">Consommation Énergie Chantier</span>
                       <span className="text-white font-bold">14.2 kWh</span>
                    </div>
                    <ProgressBar value={30} color="#f59e0b" />
                 </div>
              </div>
           </Card>

           <Card className="p-6 glass-card rounded-2xl app-surface">
              <h3 className="font-bold text-white mb-4">Journal d'Alertes Twin</h3>
              <div className="space-y-3">
                 {[
                   { msg: "Vibration anormale Grue #2", time: "14:02", status: "warning" },
                   { msg: "Humidité lot #4 validée", time: "12:45", status: "success" },
                   { msg: "Dérive dimensionnelle mur Est", time: "10:12", status: "danger" }
                 ].map((a, i) => (
                   <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:app-surface2 transition-colors">
                      <div className={`w-1.5 h-1.5 rounded-full ${a.status === 'success' ? 'bg-emerald-500' : a.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <span className="text-[11px] app-text flex-1">{a.msg}</span>
                      <span className="text-[10px] app-text3">{a.time}</span>
                   </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default JumeauNumerique;
