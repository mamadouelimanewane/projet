import React, { useState } from "react";
import { SectionHeader, Card, Btn, Badge } from "../ui";
import { Home, Landmark, FileCheck, HardHat, Key, MapPin, Scale } from "lucide-react";

const ImmobilierElite = ({ data = {}, setData }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { label: "Foncier", icon: <Landmark className="w-5 h-5" /> },
    { label: "Admin", icon: <FileCheck className="w-5 h-5" /> },
    { label: "Travaux", icon: <HardHat className="w-5 h-5" /> },
    { label: "Vente", icon: <Key className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <SectionHeader 
        title="Promotion Immobilière Élite" 
        subtitle="Gestion de Projets Immobiliers (Sénégal)"
        icon={<Home className="w-8 h-8 text-indigo-500" />}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {steps.map((step, i) => (
          <button key={i} onClick={() => setActiveStep(i)}
            className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-2 ${activeStep === i ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-900/50 border-slate-800'}`}>
             <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800">{step.icon}</div>
             <p className="text-xs font-black text-white">{step.label}</p>
          </button>
        ))}
      </div>
      <Card className="p-6 glass-card border-slate-800">
         <h3 className="text-sm font-black uppercase tracking-tighter flex items-center gap-2 mb-4">
            <Scale className="w-4 h-4 text-indigo-400" /> Phase Juridique & Foncière
         </h3>
         <p className="text-xs text-slate-300">Suivi des Titres Fonciers (TF) et NICAD en cours...</p>
      </Card>
    </div>
  );
};

export default ImmobilierElite;
