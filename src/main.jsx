import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.jsx'
import { applyTheme, getStoredTheme } from './lib/themeManager.js'

// Appliquer le thème sauvegardé avant le premier rendu
applyTheme(getStoredTheme())

// Register PWA Service Worker
const updateSW = registerSW({
  onNeedRefresh() {
    // Auto-update sans confirm() natif bloquant
    console.log('[PWA] Nouvelle version disponible, mise à jour...');
    updateSW(true);
  },
  onOfflineReady() {
    console.log('L\'application est prête pour une utilisation hors-ligne.')
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
