// ─── Theme Manager ────────────────────────────────────────────────────────────
// Définit les 3 thèmes et applique les CSS variables sur <html>.
// Chaque thème remplace les couleurs slate-* de Tailwind via var().

export const THEMES = {
  dark: {
    id: 'dark',
    nom: 'Sombre',
    description: 'Interface foncée premium',
    preview: ['#0f172a', '#1e293b', '#334155'],
    vars: {
      '--app-bg':           '#0f172a',   // bg-slate-950
      '--app-surface':      '#1e293b',   // bg-slate-900
      '--app-surface2':     '#334155',   // bg-slate-800 / bg-slate-700
      '--app-surface3':     'rgba(30,41,59,0.7)', // glass-card
      '--app-border':       'rgba(148,163,184,0.15)',
      '--app-border2':      'rgba(100,116,139,0.4)',
      '--app-text':         '#f1f5f9',   // text-white / slate-100
      '--app-text2':        '#94a3b8',   // text-slate-400
      '--app-text3':        '#64748b',   // text-slate-500
      '--app-topbar':       'rgba(15,23,42,0.85)',
      '--app-sidebar':      'rgba(15,23,42,0.98)',
      '--app-hover':        'rgba(51,65,85,0.6)',
      '--app-shadow':       '0 8px 32px rgba(0,0,0,0.5)',
    }
  },
  sunset: {
    id: 'sunset',
    nom: 'Sunset',
    description: 'Rouge & orange crépuscule',
    preview: ['#1a0a0f', '#2d0f1a', '#4a1525'],
    vars: {
      '--app-bg':           '#1a0a0f',
      '--app-surface':      '#2d0f1a',
      '--app-surface2':     '#4a1525',
      '--app-surface3':     'rgba(45,15,26,0.75)',
      '--app-border':       'rgba(251,113,133,0.15)',
      '--app-border2':      'rgba(251,113,133,0.3)',
      '--app-text':         '#fde8ec',
      '--app-text2':        '#fca5a5',
      '--app-text3':        '#fb7185',
      '--app-topbar':       'rgba(26,10,15,0.9)',
      '--app-sidebar':      'rgba(26,10,15,0.98)',
      '--app-hover':        'rgba(74,21,37,0.7)',
      '--app-shadow':       '0 8px 32px rgba(26,10,15,0.7)',
    }
  },
  midnight: {
    id: 'midnight',
    nom: 'Midnight',
    description: 'Bleu nuit profond',
    preview: ['#030711', '#0d1b3e', '#1a3a6e'],
    vars: {
      '--app-bg':           '#030711',
      '--app-surface':      '#0d1b3e',
      '--app-surface2':     '#1a3a6e',
      '--app-surface3':     'rgba(13,27,62,0.75)',
      '--app-border':       'rgba(59,130,246,0.18)',
      '--app-border2':      'rgba(96,165,250,0.35)',
      '--app-text':         '#e0f2fe',
      '--app-text2':        '#7dd3fc',
      '--app-text3':        '#38bdf8',
      '--app-topbar':       'rgba(3,7,17,0.9)',
      '--app-sidebar':      'rgba(3,7,17,0.98)',
      '--app-hover':        'rgba(26,58,110,0.7)',
      '--app-shadow':       '0 8px 32px rgba(3,7,17,0.7)',
    }
  }
};

export function applyTheme(themeId) {
  const theme = THEMES[themeId] || THEMES.dark;
  const root = document.documentElement;
  // Apply all CSS vars
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  // Set data-theme attribute for any CSS selectors
  root.setAttribute('data-theme', themeId);
  localStorage.setItem('projet-elite-theme', themeId);
}

export function getStoredTheme() {
  return localStorage.getItem('projet-elite-theme') || 'dark';
}
