import React, { useState, useEffect } from "react";
import { Palette, Moon, Sun, Monitor, Save, RotateCcw, Check } from "lucide-react";
import { SectionHeader, Card, Btn } from "../ui";

const ThemesPersonnalisation = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('projet-elite-theme') || 'dark';
  });
  const [couleurPrincipale, setCouleurPrincipale] = useState(() => {
    return localStorage.getItem('projet-elite-couleur') || '#6366f1';
  });
  const [taillePolice, setTaillePolice] = useState(() => {
    return localStorage.getItem('projet-elite-taille') || 'medium';
  });
  const [compactMode, setCompactMode] = useState(() => {
    return localStorage.getItem('projet-elite-compact') === 'true';
  });
  const [animations, setAnimations] = useState(() => {
    return localStorage.getItem('projet-elite-animations') !== 'false';
  });
  const [saved, setSaved] = useState(false);

  // Appliquer thème
  useEffect(() => {
    localStorage.setItem('projet-elite-theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Sauvegarder préférences
  const sauvegarder = () => {
    localStorage.setItem('projet-elite-couleur', couleurPrincipale);
    localStorage.setItem('projet-elite-taille', taillePolice);
    localStorage.setItem('projet-elite-compact', compactMode);
    localStorage.setItem('projet-elite-animations', animations);
    
    // Appliquer couleur principale
    document.documentElement.style.setProperty('--couleur-principale', couleurPrincipale);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Réinitialiser
  const reinitialiser = () => {
    setTheme('dark');
    setCouleurPrincipale('#6366f1');
    setTaillePolice('medium');
    setCompactMode(false);
    setAnimations(true);
    localStorage.clear();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const couleurs = [
    { nom: "Indigo", value: "#6366f1" },
    { nom: "Émeraude", value: "#10b981" },
    { nom: "Bleu", value: "#3b82f6" },
    { nom: "Violet", value: "#8b5cf6" },
    { nom: "Rose", value: "#ec4899" },
    { nom: "Orange", value: "#f59e0b" },
    { nom: "Rouge", value: "#ef4444" },
    { nom: "Cyan", value: "#06b6d4" },
  ];

  const tailles = [
    { nom: "Petite", value: "small", px: "14px" },
    { nom: "Moyenne", value: "medium", px: "16px" },
    { nom: "Grande", value: "large", px: "18px" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Personnalisation" 
        subtitle="Adaptez l'apparence à vos préférences"
      />

      {/* Mode d'affichage */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-400" />
          Mode d'Affichage
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setTheme('light')}
            className={`p-6 rounded-xl border-2 transition-all ${
              theme === 'light' 
                ? 'border-indigo-500 bg-indigo-600/20' 
                : 'border-slate-700 bg-slate-800 hover:border-slate-600'
            }`}
          >
            <Sun className={`w-8 h-8 mx-auto mb-3 ${theme === 'light' ? 'text-indigo-400' : 'text-slate-400'}`} />
            <p className="font-medium text-white">Clair</p>
            <p className="text-sm text-slate-400 mt-1">Interface lumineuse</p>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`p-6 rounded-xl border-2 transition-all ${
              theme === 'dark' 
                ? 'border-indigo-500 bg-indigo-600/20' 
                : 'border-slate-700 bg-slate-800 hover:border-slate-600'
            }`}
          >
            <Moon className={`w-8 h-8 mx-auto mb-3 ${theme === 'dark' ? 'text-indigo-400' : 'text-slate-400'}`} />
            <p className="font-medium text-white">Sombre</p>
            <p className="text-sm text-slate-400 mt-1">Interface foncée</p>
          </button>

          <button
            onClick={() => setTheme('auto')}
            className={`p-6 rounded-xl border-2 transition-all ${
              theme === 'auto' 
                ? 'border-indigo-500 bg-indigo-600/20' 
                : 'border-slate-700 bg-slate-800 hover:border-slate-600'
            }`}
          >
            <Monitor className={`w-8 h-8 mx-auto mb-3 ${theme === 'auto' ? 'text-indigo-400' : 'text-slate-400'}`} />
            <p className="font-medium text-white">Automatique</p>
            <p className="text-sm text-slate-400 mt-1">Selon le système</p>
          </button>
        </div>
      </Card>

      {/* Couleur principale */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-emerald-400" />
          Couleur Principale
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {couleurs.map(couleur => (
            <button
              key={couleur.value}
              onClick={() => setCouleurPrincipale(couleur.value)}
              className={`p-4 rounded-xl border-2 transition-all ${
                couleurPrincipale === couleur.value
                  ? 'border-white scale-105'
                  : 'border-transparent hover:border-slate-600'
              }`}
              style={{ backgroundColor: couleur.value }}
            >
              {couleurPrincipale === couleur.value && (
                <Check className="w-5 h-5 text-white mx-auto" />
              )}
              <p className="text-white text-sm font-medium mt-2">{couleur.nom}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Taille de police */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Taille de Police</h3>
        
        <div className="grid grid-cols-3 gap-4">
          {tailles.map(taille => (
            <button
              key={taille.value}
              onClick={() => setTaillePolice(taille.value)}
              className={`p-4 rounded-xl border-2 transition-all ${
                taillePolice === taille.value
                  ? 'border-indigo-500 bg-indigo-600/20'
                  : 'border-slate-700 bg-slate-800 hover:border-slate-600'
              }`}
            >
              <p style={{ fontSize: taille.px }} className="font-medium text-white">Aa</p>
              <p className="text-sm text-slate-400 mt-2">{taille.nom}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Options avancées */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Options Avancées</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl">
            <div>
              <p className="font-medium text-white">Mode Compact</p>
              <p className="text-sm text-slate-400">Réduit les espacements</p>
            </div>
            <button
              onClick={() => setCompactMode(!compactMode)}
              className={`w-14 h-7 rounded-full transition-colors relative ${
                compactMode ? 'bg-indigo-600' : 'bg-slate-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
                compactMode ? 'left-8' : 'left-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl">
            <div>
              <p className="font-medium text-white">Animations</p>
              <p className="text-sm text-slate-400">Effets visuels et transitions</p>
            </div>
            <button
              onClick={() => setAnimations(!animations)}
              className={`w-14 h-7 rounded-full transition-colors relative ${
                animations ? 'bg-indigo-600' : 'bg-slate-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
                animations ? 'left-8' : 'left-1'
              }`} />
            </button>
          </div>
        </div>
      </Card>

      {/* Prévisualisation */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Prévisualisation</h3>
        
        <div className="p-6 rounded-xl border-2" style={{ borderColor: couleurPrincipale }}>
          <h4 style={{ color: couleurPrincipale }} className="text-lg font-bold mb-2">
            Exemple de Titre
          </h4>
          <p className="text-slate-300" style={{ fontSize: tailles.find(t => t.value === taillePolice)?.px }}>
            Ceci est un exemple de texte avec la taille de police sélectionnée.
            La couleur principale est utilisée pour les accents et les éléments interactifs.
          </p>
          <button
            className="mt-4 px-6 py-2 rounded-lg text-white font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: couleurPrincipale }}
          >
            Bouton Exemple
          </button>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Btn onClick={sauvegarder} className="flex-1">
          {saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Sauvegardé !
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder les Préférences
            </>
          )}
        </Btn>
        <Btn variant="ghost" onClick={reinitialiser}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Réinitialiser
        </Btn>
      </div>
    </div>
  );
};

export default ThemesPersonnalisation;
