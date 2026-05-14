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
    if (confirm('Une nouvelle version est disponible. Voulez-vous mettre à jour ?')) {
      updateSW(true)
    }
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
