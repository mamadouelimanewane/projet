import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { INITIAL_DATA, METHODOLOGIES, SCENARIOS, STATUT_COLORS, PRIORITE_COLORS, PIE_COLORS, MODULES } from "../../data/constants";
import { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader } from "../ui";

const LandingPage = ({ onEnter }) => {
  return (
    <div className="relative min-h-screen app-bg flex flex-col items-center justify-center overflow-hidden font-sans transition-colors duration-500">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-400/40 dark:bg-indigo-600/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] bg-sky-400/40 dark:bg-fuchsia-600/20 blur-[130px] rounded-full mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-emerald-400/30 dark:bg-emerald-600/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop')] opacity-[0.1] dark:opacity-[0.03] mix-blend-overlay bg-cover bg-center" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">

        {/* Logo Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 dark:bg-indigo-500/10 backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-widest">Version Enterprise 3.0</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-8xl font-black app-text tracking-tighter mb-6 leading-[1.1]">
          PROJET<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 dark:from-indigo-400 dark:via-fuchsia-400 dark:to-emerald-400">ÉLITE</span>
        </h1>

        <p className="text-lg md:text-2xl app-text2 font-light max-w-3xl mb-12 leading-relaxed">
          La plateforme de gestion de projet ultime. Unifiez vos équipes, vos budgets et vos opérations grâce à l'intelligence artificielle et une suite de 26 modules intégrés.
        </p>

        {/* Call To Action */}
        <button
          onClick={onEnter}
          className="group relative px-8 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xl rounded-2xl shadow-[0_10px_40px_rgba(79,70,229,0.3)] dark:shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all hover:scale-105 hover:shadow-[0_15px_60px_rgba(79,70,229,0.5)] dark:hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] flex items-center gap-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out" />
          <span>Lancer l'Espace de Travail</span>
          <span className="group-hover:translate-x-2 transition-transform">→</span>
        </button>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 w-full">
          {[
            { title: "26 Modules", desc: "Suite complète", icon: "📦" },
            { title: "Gantt Avancé", desc: "Drag & Drop", icon: "▬" },
            { title: "IA Prédictive", desc: "Health Score", icon: "🧠" },
            { title: "Workflows", desc: "Automatisations", icon: "⚡" }
          ].map((f, i) => (
            <div key={i} className="app-surface glass-card rounded-2xl p-6 text-left hover:border-indigo-400 transition-colors shadow-lg">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="app-text font-bold mb-1">{f.title}</h3>
              <p className="app-text2 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 text-xs font-mono app-text3">
        © 2026 Système d'Information Élite · Accès Sécurisé
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════


export default LandingPage;
