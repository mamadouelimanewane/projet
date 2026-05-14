import React, { useState } from "react";
import { Palette, Check, Save, RotateCcw, Sun, Moon, Sparkles } from "lucide-react";
import { SectionHeader, Card, Btn } from "../ui";
import { toast } from "../ui";
import { applyTheme, getStoredTheme, THEMES } from "../../lib/themeManager.js";

const ThemesPersonnalisation = () => {
  const [theme, setTheme] = useState(getStoredTheme);
  const [couleurPrincipale, setCouleurPrincipale] = useState(
    () => localStorage.getItem("projet-elite-couleur") || "#6366f1"
  );
  const [taillePolice, setTaillePolice] = useState(
    () => localStorage.getItem("projet-elite-taille") || "medium"
  );
  const [compactMode, setCompactMode] = useState(
    () => localStorage.getItem("projet-elite-compact") === "true"
  );
  const [animations, setAnimations] = useState(
    () => localStorage.getItem("projet-elite-animations") !== "false"
  );

  const handleThemeChange = (themeId) => {
    setTheme(themeId);
    applyTheme(themeId);
  };

  const sauvegarder = () => {
    localStorage.setItem("projet-elite-couleur", couleurPrincipale);
    localStorage.setItem("projet-elite-taille", taillePolice);
    localStorage.setItem("projet-elite-compact", compactMode);
    localStorage.setItem("projet-elite-animations", animations);
    document.documentElement.style.setProperty("--couleur-principale", couleurPrincipale);
    toast.success("Préférences sauvegardées !");
  };

  const reinitialiser = () => {
    handleThemeChange("dark");
    setCouleurPrincipale("#6366f1");
    setTaillePolice("medium");
    setCompactMode(false);
    setAnimations(true);
    localStorage.removeItem("projet-elite-couleur");
    localStorage.removeItem("projet-elite-taille");
    localStorage.removeItem("projet-elite-compact");
    localStorage.removeItem("projet-elite-animations");
    toast.info("Préférences réinitialisées");
  };

  const couleurs = [
    { nom: "Indigo",   value: "#6366f1" },
    { nom: "Émeraude", value: "#10b981" },
    { nom: "Bleu",     value: "#3b82f6" },
    { nom: "Violet",   value: "#8b5cf6" },
    { nom: "Rose",     value: "#ec4899" },
    { nom: "Orange",   value: "#f59e0b" },
    { nom: "Rouge",    value: "#ef4444" },
    { nom: "Cyan",     value: "#06b6d4" },
  ];

  const tailles = [
    { nom: "Petite",  value: "small",  px: "14px" },
    { nom: "Moyenne", value: "medium", px: "16px" },
    { nom: "Grande",  value: "large",  px: "18px" },
  ];

  const themeIcons = { dark: Moon, sunset: Sun, midnight: Sparkles };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Personnalisation"
        subtitle="Thème, couleurs et préférences d'affichage"
      />

      {/* ── Sélecteur de thème ─────────────────────────────────────────── */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-400" />
          Thème d'affichage
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Object.values(THEMES).map((t) => {
            const Icon = themeIcons[t.id] || Moon;
            const active = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] ${
                  active ? "border-indigo-500 shadow-lg shadow-indigo-500/20" : "border-slate-700 hover:border-slate-500"
                }`}
              >
                {/* Preview miniature */}
                <div className="h-28 relative" style={{ background: t.preview[0] }}>
                  {/* Sidebar simulée */}
                  <div className="absolute left-0 top-0 bottom-0 w-10"
                    style={{ background: t.preview[1], borderRight: `1px solid ${t.preview[2]}` }}>
                    {[0,1,2,3,4].map(i => (
                      <div key={i} className="mx-1 mt-2 rounded" style={{ height: 6, background: t.preview[2], opacity: 0.7 }} />
                    ))}
                  </div>
                  {/* Contenu simulé */}
                  <div className="absolute left-12 right-2 top-3 space-y-2">
                    <div className="rounded h-3" style={{ background: t.preview[2], width: "60%", opacity: 0.8 }} />
                    <div className="grid grid-cols-3 gap-1 mt-2">
                      {[0,1,2].map(i => (
                        <div key={i} className="rounded h-8"
                          style={{ background: t.preview[1], border: `1px solid ${t.preview[2]}` }} />
                      ))}
                    </div>
                    <div className="rounded h-2" style={{ background: t.preview[2], width: "80%", opacity: 0.5 }} />
                    <div className="rounded h-2" style={{ background: t.preview[2], width: "50%", opacity: 0.4 }} />
                  </div>
                  {/* Badge actif */}
                  {active && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Label */}
                <div className={`p-4 text-left ${active ? "bg-indigo-600/10" : "bg-slate-800/80"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${active ? "text-indigo-400" : "text-slate-400"}`} />
                    <span className={`font-bold text-sm ${active ? "text-white" : "text-slate-300"}`}>{t.nom}</span>
                  </div>
                  <p className="text-xs text-slate-500">{t.description}</p>
                  <div className="flex gap-1 mt-2">
                    {t.preview.map((c, i) => (
                      <div key={i} className="w-4 h-4 rounded-full border border-slate-600"
                        style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-slate-500 mt-4">
          💡 Le thème s'applique instantanément et est mémorisé pour vos prochaines visites.
        </p>
      </Card>

      {/* ── Couleur principale ─────────────────────────────────────────── */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-emerald-400" />
          Couleur d'accent
        </h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {couleurs.map((c) => (
            <button
              key={c.value}
              onClick={() => {
                setCouleurPrincipale(c.value);
                document.documentElement.style.setProperty("--couleur-principale", c.value);
              }}
              title={c.nom}
              className={`aspect-square rounded-xl border-2 transition-all hover:scale-110 flex items-center justify-center ${
                couleurPrincipale === c.value ? "border-white scale-110" : "border-transparent"
              }`}
              style={{ background: c.value }}
            >
              {couleurPrincipale === c.value && <Check className="w-4 h-4 text-white" />}
            </button>
          ))}
        </div>
      </Card>

      {/* ── Taille de police ───────────────────────────────────────────── */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Taille de police</h3>
        <div className="grid grid-cols-3 gap-4">
          {tailles.map((t) => (
            <button
              key={t.value}
              onClick={() => setTaillePolice(t.value)}
              className={`p-4 rounded-xl border-2 transition-all ${
                taillePolice === t.value
                  ? "border-indigo-500 bg-indigo-600/20"
                  : "border-slate-700 bg-slate-800 hover:border-slate-600"
              }`}
            >
              <p style={{ fontSize: t.px }} className="font-medium text-white">Aa</p>
              <p className="text-sm text-slate-400 mt-2">{t.nom}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* ── Options avancées ───────────────────────────────────────────── */}
      <Card className="p-6 glass-card rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Options avancées</h3>
        <div className="space-y-4">
          {[
            { label: "Mode compact", desc: "Réduit les espacements", val: compactMode, set: setCompactMode },
            { label: "Animations",   desc: "Effets visuels et transitions", val: animations, set: setAnimations },
          ].map((opt) => (
            <div key={opt.label} className="flex items-center justify-between p-4 bg-slate-800 rounded-xl">
              <div>
                <p className="font-medium text-white">{opt.label}</p>
                <p className="text-sm text-slate-400">{opt.desc}</p>
              </div>
              <button
                onClick={() => opt.set(!opt.val)}
                className={`w-14 h-7 rounded-full transition-colors relative ${opt.val ? "bg-indigo-600" : "bg-slate-600"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${opt.val ? "left-8" : "left-1"}`} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Actions ────────────────────────────────────────────────────── */}
      <div className="flex gap-4">
        <Btn onClick={sauvegarder} className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder les préférences
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
