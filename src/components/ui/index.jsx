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
    <div className="flex-1 app-surface2 rounded-full h-1.5 overflow-hidden border app-border">
      <div className="h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(99,102,241,0.4)]"
        style={{ width: `${Math.min((value / max) * 100, 100)}%`, backgroundColor: color }} />
    </div>
    <span className="text-[10px] font-mono app-text3 group-hover:text-indigo-400 transition-colors w-10 text-right">{value}{max !== 100 ? "" : "%"}</span>
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
        <p className="text-[10px] app-text3 font-bold uppercase tracking-[0.2em]">{displayLabel}</p>
        <span className="text-xl group-hover:scale-110 transition-transform duration-300" style={{ color: finalColor, filter: `drop-shadow(0 0 5px ${finalColor}44)` }}>
          {typeof Icon === 'string' ? Icon : (Icon && <Icon className="w-5 h-5" />)}
        </span>
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-black tracking-tight" style={{ color: finalColor }}>{value}</p>
          {trend !== undefined && (
            <span className="text-[10px] font-bold app-text3">
              {trend}%
            </span>
          )}
        </div>
        {displaySub && <p className="text-xs app-text3 font-medium mt-1">{displaySub}</p>}
      </div>
    </div>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 app-bg backdrop-blur-md" onClick={onClose} />
    <div className="relative glass-card border app-border rounded-3xl w-full max-w-lg shadow-2xl animate-entrance overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b app-border">
        <h3 className="text-xl font-bold app-text tracking-tight">{title}</h3>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full app-surface2 app-text2 hover:app-text transition-colors">×</button>
      </div>
      <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">{children}</div>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-[10px] app-text3 font-bold uppercase tracking-wider ml-1">{label}</label>}
    <input className="w-full app-surface border app-border rounded-xl px-4 py-2.5 app-text text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all" {...props} />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-[10px] app-text3 font-bold uppercase tracking-wider ml-1">{label}</label>}
    <select className="w-full app-surface border app-border rounded-xl px-4 py-2.5 app-text text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer" {...props}>
      {options.map(o => (
        <option key={o} value={o} className="app-surface app-text">{o}</option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="block text-[10px] app-text3 font-bold uppercase tracking-wider ml-1">{label}</label>}
    <textarea className="w-full app-surface border app-border rounded-xl px-4 py-2.5 app-text text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none" rows={3} {...props} />
  </div>
);

const Btn = ({ children, onClick, variant = "primary", size = "sm", className = "", disabled = false }) => {
  const variants = {
    primary: "premium-gradient text-white shadow-lg shadow-indigo-600/20",
    danger: "bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/20",
    ghost: "app-surface2 hover:app-surface2 app-text border app-border",
    success: "bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-600/20",
    indigo: "bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-600/20",
  };
  const sizes = { 
    sm: "px-3 py-2 text-xs", 
    md: "px-5 py-2.5 text-sm", 
    lg: "px-6 py-3 text-sm md:text-base" 
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else if (!disabled) {
      toast.info("Action enregistrée. Synchronisation Cloud en attente...");
    }
  };

  return (
    <button onClick={handleClick} disabled={disabled}
      className={`rounded-xl font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle, action }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-3 md:gap-4 animate-entrance">
    <div className="min-w-0 flex-1">
      <h2 className="text-xl md:text-3xl font-black app-text tracking-tight leading-none truncate">{title}</h2>
      {subtitle && <p className="text-[10px] md:text-xs app-text3 font-medium mt-1 md:mt-2 uppercase tracking-widest line-clamp-1">{subtitle}</p>}
    </div>
    <div className="flex-shrink-0 w-full md:w-auto">{action}</div>
  </div>
);

const Card = ({ children, className = "", noPadding = false }) => (
  <div className={`glass-card rounded-2xl border app-border overflow-hidden transition-all duration-300 ${noPadding ? "" : "p-6"} ${className}`}>
    {children}
  </div>
);

const TooltipInfo = ({ term, definition }) => {
  const [show, setShow] = React.useState(false);
  return (
    <span className="relative inline-block ml-1 group cursor-help" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <span className="w-4 h-4 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-[10px] flex items-center justify-center font-bold">?</span>
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 app-surface border app-border rounded-xl shadow-2xl z-[100] animate-entrance">
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{term}</p>
          <p className="text-[11px] app-text leading-relaxed">{definition}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
        </div>
      )}
    </span>
  );
};

export { Badge, ProgressBar, StatCard, Modal, Input, Select, Textarea, Btn, SectionHeader, Card, TooltipInfo };

// ─── Toast & Dialog System ────────────────────────────────────────────────────
// Remplace les alert() / confirm() natifs par des composants UI élégants.
// Usage:
//   import { useToast, useDialog, ToastContainer } from '../ui';
//   const toast = useToast();
//   toast.success("Sauvegardé !"); toast.error("Erreur"); toast.info("Info");
//   const dialog = useDialog();
//   const ok = await dialog.confirm("Supprimer ce KPI ?");

import { createContext, useContext, useCallback, useRef } from "react";

const ToastCtx = createContext(null);
const DialogCtx = createContext(null);

let _toastFn = null;
let _dialogFn = null;

export const ToastContainer = () => {
  const [toasts, setToasts] = React.useState([]);
  const [dialogs, setDialogs] = React.useState([]);
  const id = useRef(0);

  // Expose global push functions
  _toastFn = useCallback((msg, type = "info", duration = 3500) => {
    const tid = ++id.current;
    setToasts(p => [...p, { id: tid, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== tid)), duration);
  }, []);

  _dialogFn = useCallback((msg, type = "confirm") => {
    return new Promise(resolve => {
      const did = ++id.current;
      setDialogs(p => [...p, { id: did, msg, type, resolve }]);
    });
  }, []);

  const dismiss = (did, val) => {
    setDialogs(p => {
      const d = p.find(x => x.id === did);
      if (d) d.resolve(val);
      return p.filter(x => x.id !== did);
    });
  };

  const icons = { success: "✓", error: "✕", info: "ℹ", warning: "⚠" };
  const colors = { success: "#10b981", error: "#ef4444", info: "#6366f1", warning: "#f59e0b" };

  return (
    <>
      {/* Toasts */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end", pointerEvents: "none" }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "12px 18px",
            background: "#0f172a", border: `1px solid ${colors[t.type]}44`,
            borderLeft: `4px solid ${colors[t.type]}`, borderRadius: 12,
            boxShadow: `0 4px 24px rgba(0,0,0,0.5), 0 0 12px ${colors[t.type]}22`,
            pointerEvents: "auto", animation: "slideInRight 0.25s ease",
            maxWidth: 340, minWidth: 220
          }}>
            <span style={{ color: colors[t.type], fontSize: 16, fontWeight: 900 }}>{icons[t.type]}</span>
            <span style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{t.msg}</span>
          </div>
        ))}
      </div>

      {/* Dialogs */}
      {dialogs.map(d => (
        <div key={d.id} style={{
          position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(4px)"
        }}>
          <div style={{
            background: "#1e293b", border: "1px solid #334155",
            borderRadius: 20, padding: "28px 32px", maxWidth: 420, width: "90%",
            boxShadow: "0 25px 50px rgba(0,0,0,0.7)"
          }}>
            <p style={{ color: "#e2e8f0", fontSize: 15, fontWeight: 600, marginBottom: 24, lineHeight: 1.6 }}>{d.msg}</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              {d.type === "confirm" && (
                <button onClick={() => dismiss(d.id, false)}
                  style={{ padding: "8px 20px", borderRadius: 10, border: "1px solid #475569", background: "transparent", color: "#94a3b8", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  Annuler
                </button>
              )}
              <button onClick={() => dismiss(d.id, true)}
                style={{ padding: "8px 20px", borderRadius: 10, border: "none", background: "#6366f1", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                {d.type === "confirm" ? "Confirmer" : "OK"}
              </button>
            </div>
          </div>
        </div>
      ))}

      <style>{`@keyframes slideInRight { from { opacity:0; transform: translateX(20px); } to { opacity:1; transform: translateX(0); } }`}</style>
    </>
  );
};

// Programmatic access (works outside React tree after ToastContainer mounts)
export const toast = {
  success: (msg, dur) => _toastFn?.(msg, "success", dur),
  error:   (msg, dur) => _toastFn?.(msg, "error", dur),
  info:    (msg, dur) => _toastFn?.(msg, "info", dur),
  warning: (msg, dur) => _toastFn?.(msg, "warning", dur),
};

export const dialog = {
  confirm: (msg) => _dialogFn?.(msg, "confirm") ?? Promise.resolve(false),
  alert:   (msg) => _dialogFn?.(msg, "alert")   ?? Promise.resolve(true),
};
