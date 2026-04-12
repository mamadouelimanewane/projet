import React from "react";
import { STATUT_COLORS } from "../../data/constants";

const Badge = ({ value, variant, map = STATUT_COLORS, size = "sm", children }) => {
  const variantColors = {
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#3b82f6",
    indigo: "#6366f1",
    default: "#94a3b8"
  };
  const color = variant ? variantColors[variant] : (map[value] || "#94a3b8");
  const pad = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs";
  return (
    <span className={`inline-flex items-center rounded-full font-bold uppercase tracking-wider ${pad} transition-all hover:scale-105`}
      style={{ 
        backgroundColor: color + "15", 
        color, 
        border: `1px solid ${color}44`,
        boxShadow: `0 0 10px ${color}11`
      }}>
      {children || value}
    </span>
  );
};

const ProgressBar = ({ value, max = 100, color = "#6366f1" }) => (
  <div className="flex items-center gap-3 w-full group">
    <div className="flex-1 bg-slate-800/50 rounded-full h-1.5 overflow-hidden border border-slate-700/30">
      <div className="h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(99,102,241,0.4)]"
        style={{ width: `${Math.min((value / max) * 100, 100)}%`, backgroundColor: color }} />
    </div>
    <span className="text-[10px] font-mono text-slate-500 group-hover:text-indigo-400 transition-colors w-10 text-right">{value}{max !== 100 ? "" : "%"}</span>
  </div>
);

const StatCard = ({ label, title, value, sub, subtitle, color = "#6366f1", icon: Icon, trend }) => {
  const displayLabel = label || title;
  const displaySub = sub || subtitle;
  
  // Mapping pour les couleurs nommées
  const colors = {
    indigo: "#6366f1",
    emerald: "#10b981",
    purple: "#a855f7",
    orange: "#f59e0b",
    red: "#ef4444",
    cyan: "#06b6d4"
  };
  
  const finalColor = colors[color] || color;

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-3 animate-entrance hover:border-indigo-500/30 transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{displayLabel}</p>
        <span className="text-xl group-hover:scale-110 transition-transform duration-300" style={{ color: finalColor, filter: `drop-shadow(0 0 5px ${finalColor}44)` }}>
          {typeof Icon === 'string' ? Icon : (Icon && <Icon className="w-5 h-5" />)}
        </span>
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-black tracking-tight" style={{ color: finalColor }}>{value}</p>
          {trend !== undefined && (
            <span className="text-[10px] font-bold text-slate-500">
              {trend}%
            </span>
          )}
        </div>
        {displaySub && <p className="text-xs text-slate-500 font-medium mt-1">{displaySub}</p>}
      </div>
    </div>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
    <div className="relative glass-card border border-slate-700/50 rounded-3xl w-full max-w-lg shadow-2xl animate-entrance overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-slate-800/50">
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/50 text-slate-400 hover:text-white transition-colors">×</button>
      </div>
      <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">{children}</div>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider ml-1">{label}</label>}
    <input className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all" {...props} />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider ml-1">{label}</label>}
    <select className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer" {...props}>
      {options.map(o => (
        <option key={o} value={o} className="bg-slate-900 text-white">{o}</option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider ml-1">{label}</label>}
    <textarea className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none" rows={3} {...props} />
  </div>
);

const Btn = ({ children, onClick, variant = "primary", size = "sm", className = "" }) => {
  const variants = {
    primary: "premium-gradient text-white shadow-lg shadow-indigo-600/20",
    danger: "bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/20",
    ghost: "bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-slate-700/50",
    success: "bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-600/20",
    indigo: "bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-600/20",
  };
  const sizes = { 
    sm: "px-4 py-2 text-xs", 
    md: "px-6 py-2.5 text-sm", 
    lg: "px-8 py-3.5 text-base" 
  };
  return (
    <button onClick={onClick} 
      className={`rounded-xl font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle, action }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-entrance">
    <div>
      <h2 className="text-3xl font-black text-white tracking-tight leading-none">{title}</h2>
      {subtitle && <p className="text-xs text-slate-500 font-medium mt-2 uppercase tracking-widest">{subtitle}</p>}
    </div>
    <div className="flex-shrink-0">{action}</div>
  </div>
);

const Card = ({ children, className = "", noPadding = false }) => (
  <div className={`glass-card rounded-2xl border border-slate-700/50 overflow-hidden transition-all duration-300 ${noPadding ? "" : "p-6"} ${className}`}>
    {children}
  </div>
);

export { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader, Card };
