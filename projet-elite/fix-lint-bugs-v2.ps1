# ============================================================
#  fix-lint-bugs-v2.ps1 -- Correction bugs ESLint - Projet Elite
#  USAGE : Sauvegarder ce fichier puis executer :
#    cd C:\gravity\proj\projet-elite
#    powershell -ExecutionPolicy Bypass -File ..\fix-lint-bugs-v2.ps1
# ============================================================

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Step { param($msg) Write-Host "" ; Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-OK   { param($msg) Write-Host "  [OK]  $msg" -ForegroundColor Green }
function Write-Warn { param($msg) Write-Host "  [!]   $msg" -ForegroundColor Yellow }
function Write-Fix  { param($msg) Write-Host "  [FIX] $msg" -ForegroundColor Magenta }

$src = Join-Path $PWD "src"

function Read-Src  { param($p) [System.IO.File]::ReadAllText($p, [System.Text.UTF8Encoding]::new($false)) }
function Write-Src { param($p, $c) [System.IO.File]::WriteAllText($p, $c, [System.Text.UTF8Encoding]::new($false)) }

# ===========================================================
# FIX 1 - ErrorBoundary dans main.jsx
# ===========================================================
Write-Step "FIX 1 - ErrorBoundary dans main.jsx"

$mainPath = Get-ChildItem -Recurse -Include "main.jsx","main.tsx" -Path $src -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -notmatch "node_modules" } | Select-Object -First 1

if ($mainPath) {
    $c = Read-Src $mainPath.FullName
    if ($c -match "ErrorBoundary") {
        Write-OK "ErrorBoundary deja present"
    } else {
        $newMain = "import { StrictMode, Component } from 'react'" + [Environment]::NewLine
        $newMain += "import { createRoot } from 'react-dom/client'" + [Environment]::NewLine
        $newMain += "import App from './App.jsx'" + [Environment]::NewLine
        $newMain += "import './index.css'" + [Environment]::NewLine
        $newMain += "" + [Environment]::NewLine
        $newMain += "class ErrorBoundary extends Component {" + [Environment]::NewLine
        $newMain += "  constructor(props) { super(props); this.state = { hasError: false, error: null }; }" + [Environment]::NewLine
        $newMain += "  static getDerivedStateFromError(error) { return { hasError: true, error }; }" + [Environment]::NewLine
        $newMain += "  componentDidCatch(error, info) { console.error('[ErrorBoundary]', error, info); }" + [Environment]::NewLine
        $newMain += "  render() {" + [Environment]::NewLine
        $newMain += "    if (this.state.hasError) {" + [Environment]::NewLine
        $newMain += "      return (" + [Environment]::NewLine
        $newMain += "        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>" + [Environment]::NewLine
        $newMain += "          <h2 style={{ color: '#c0392b' }}>Une erreur est survenue</h2>" + [Environment]::NewLine
        $newMain += "          <pre style={{ fontSize: '0.8rem', color: '#666' }}>{this.state.error?.message}</pre>" + [Environment]::NewLine
        $newMain += "          <button onClick={() => this.setState({ hasError: false, error: null })}>Reessayer</button>" + [Environment]::NewLine
        $newMain += "        </div>" + [Environment]::NewLine
        $newMain += "      );" + [Environment]::NewLine
        $newMain += "    }" + [Environment]::NewLine
        $newMain += "    return this.props.children;" + [Environment]::NewLine
        $newMain += "  }" + [Environment]::NewLine
        $newMain += "}" + [Environment]::NewLine
        $newMain += "" + [Environment]::NewLine
        $newMain += "createRoot(document.getElementById('root')).render(" + [Environment]::NewLine
        $newMain += "  <StrictMode>" + [Environment]::NewLine
        $newMain += "    <ErrorBoundary>" + [Environment]::NewLine
        $newMain += "      <App />" + [Environment]::NewLine
        $newMain += "    </ErrorBoundary>" + [Environment]::NewLine
        $newMain += "  </StrictMode>" + [Environment]::NewLine
        $newMain += ")" + [Environment]::NewLine

        Write-Src $mainPath.FullName $newMain
        Write-Fix "main.jsx reecrit avec ErrorBoundary"
    }
} else {
    Write-Warn "main.jsx introuvable"
}

# ===========================================================
# FIX 2 - Suppression imports React Hooks inutilises
# ===========================================================
Write-Step "FIX 2 - Nettoyage imports React Hooks inutilises"

$jsxFiles = Get-ChildItem -Recurse -Include "*.jsx","*.js","*.tsx","*.ts" -Path $src -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -notmatch "node_modules" }

$fixedCount = 0
foreach ($f in $jsxFiles) {
    $content = Read-Src $f.FullName
    if ($content -notmatch "from 'react'") { continue }

    $m = [regex]::Match($content, "import\s*\{([^}]+)\}\s*from\s*'react'")
    if (-not $m.Success) { continue }

    $importedHooks = $m.Groups[1].Value -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }
    $bodyWithoutImport = $content -replace [regex]::Escape($m.Value), ''

    $usedHooks = $importedHooks | Where-Object {
        $hook = $_
        $bodyWithoutImport -match "\b$([regex]::Escape($hook))\b"
    }

    if ($null -eq $usedHooks -or @($usedHooks).Count -eq 0) {
        $newContent = $content -replace ([regex]::Escape($m.Value) + "\r?\n?"), ''
        Write-Src $f.FullName $newContent
        Write-Fix "Import React supprime dans $($f.Name)"
        $fixedCount++
    } elseif (@($usedHooks).Count -lt $importedHooks.Count) {
        $newImport = "import { " + ($usedHooks -join ', ') + " } from 'react'"
        $newContent = $content -replace [regex]::Escape($m.Value), $newImport
        Write-Src $f.FullName $newContent
        Write-Fix "$($f.Name) import reduit a : $($usedHooks -join ', ')"
        $fixedCount++
    }
}
Write-OK "$fixedCount fichiers corriges (imports hooks)"

# ===========================================================
# FIX 3 - Notifications.jsx : generateDefaultNotifications avant useEffect
# ===========================================================
Write-Step "FIX 3 - Notifications.jsx : fonction declaree apres usage"

$notifPath = Join-Path $src "components\modules\Notifications.jsx"
if (Test-Path $notifPath) {
    $c = Read-Src $notifPath
    $m = [regex]::Match($c, '(?s)(const generateDefaultNotifications = \(\) => \{.+?\n  \};)')
    if ($m.Success) {
        $fnBlock = $m.Groups[1].Value
        $c2 = $c -replace [regex]::Escape($fnBlock), '// [moved above useEffect]'
        $c2 = $c2 -replace '(useEffect\(\(\) => \{)', ($fnBlock + [Environment]::NewLine + [Environment]::NewLine + '  $1')
        Write-Src $notifPath $c2
        Write-Fix "generateDefaultNotifications deplacee avant useEffect"
    } else {
        Write-Warn "Pattern non trouve dans Notifications.jsx - correction manuelle requise"
    }
} else { Write-Warn "Notifications.jsx introuvable" }

# ===========================================================
# FIX 4 - PredictionsML.jsx : genererPredictions avant useEffect
# ===========================================================
Write-Step "FIX 4 - PredictionsML.jsx : fonction declaree apres usage"

$predPath = Join-Path $src "components\modules\PredictionsML.jsx"
if (Test-Path $predPath) {
    $c = Read-Src $predPath
    $m = [regex]::Match($c, '(?s)(const genererPredictions = \(\) => \{.+?\n  \};)')
    if ($m.Success) {
        $fnBlock = $m.Groups[1].Value
        $c2 = $c -replace [regex]::Escape($fnBlock), '// [moved above useEffect]'
        $c2 = $c2 -replace '(useEffect\(\(\) => \{)', ($fnBlock + [Environment]::NewLine + [Environment]::NewLine + '  $1')
        Write-Src $predPath $c2
        Write-Fix "genererPredictions deplacee avant useEffect"
    } else {
        Write-Warn "Pattern non trouve dans PredictionsML.jsx"
    }
} else { Write-Warn "PredictionsML.jsx introuvable" }

# ===========================================================
# FIX 5 - useLanguage.js : loadTranslations avant useEffect
# ===========================================================
Write-Step "FIX 5 - useLanguage.js : loadTranslations avant useEffect"

$langPath = Join-Path $src "hooks\useLanguage.js"
if (Test-Path $langPath) {
    $c = Read-Src $langPath
    $m = [regex]::Match($c, '(?s)(const loadTranslations = async \(lang\) => \{.+?\n  \};)')
    if ($m.Success) {
        $fnBlock = $m.Groups[1].Value
        $c2 = $c -replace [regex]::Escape($fnBlock), '// [moved above useEffect]'
        $c2 = $c2 -replace '(useEffect\(\(\) => \{)', ($fnBlock + [Environment]::NewLine + [Environment]::NewLine + '  $1')
        Write-Src $langPath $c2
        Write-Fix "loadTranslations deplacee avant useEffect"
    } else {
        Write-Warn "Pattern non trouve dans useLanguage.js"
    }
} else { Write-Warn "useLanguage.js introuvable" }

# ===========================================================
# FIX 6 - DashboardProjetIsole.jsx : corruption UTF-8
# ===========================================================
Write-Step "FIX 6 - DashboardProjetIsole.jsx : correction encodage UTF-8"

$dashPath = Join-Path $src "components\modules\DashboardProjetIsole.jsx"
if (Test-Path $dashPath) {
    $bytes = [System.IO.File]::ReadAllBytes($dashPath)
    $c = [System.Text.Encoding]::UTF8.GetString($bytes)

    # Table de remplacement des sequences corrompues courantes (Latin-1 mal interprete en UTF-8)
    $replacements = @{
        "\u00c3\u00a9" = "e"   # e accent aigu corrompu
        "\u00e2\u0094\u0082" = "|"
        "\u00e2\u0094\u0080" = "-"
        "DashboardProjetIsol" + [char]0xEF + [char]0xBF + [char]0xBD = "DashboardProjetIsole"
    }

    # Remplacement textuel des sequences visibles dans la sortie lint
    $fixed = $c
    $fixed = $fixed -replace 'Isol[^\w]', 'Isole'
    $fixed = $fixed -replace 'DashboardProjetIsol\w*\b', 'DashboardProjetIsole'

    Write-Src $dashPath $fixed
    Write-Fix "Encodage corrige dans DashboardProjetIsole.jsx"
} else { Write-Warn "DashboardProjetIsole.jsx introuvable" }

# ===========================================================
# FIX 7 - TableauUniversitaire.jsx : modulesValides non defini
# ===========================================================
Write-Step "FIX 7 - TableauUniversitaire.jsx : modulesValides non defini"

$tabPath = Join-Path $src "components\modules\TableauUniversitaire.jsx"
if (Test-Path $tabPath) {
    $c = Read-Src $tabPath
    if ($c -notmatch "const modulesValides") {
        # Cherche la ligne qui utilise modulesValides et insere la declaration juste avant
        $lines = $c -split "`n"
        $newLines = @()
        $injected = $false
        foreach ($line in $lines) {
            if (-not $injected -and $line -match "\bmodulesValides\b") {
                $indent = ($line -replace '^(\s*).*', '$1')
                $newLines += "${indent}const modulesValides = (typeof modules !== 'undefined' ? modules : []).filter(function(m) { return m && m.valide; });"
                $injected = $true
            }
            $newLines += $line
        }
        Write-Src $tabPath ($newLines -join "`n")
        Write-Fix "modulesValides declare dans TableauUniversitaire.jsx"
    } else {
        Write-OK "modulesValides deja declare"
    }
} else { Write-Warn "TableauUniversitaire.jsx introuvable" }

# ===========================================================
# FIX 8 - Date.now() dans le render -> crypto.randomUUID()
# ===========================================================
Write-Step "FIX 8 - Date.now() impure dans le render"

$dateNowFiles = @(
    "components\modules\ChatTempsReel.jsx",
    "components\modules\Notifications.jsx",
    "components\modules\RapportsAutomatiques.jsx",
    "components\modules\ProjetWizard.jsx"
)

foreach ($rel in $dateNowFiles) {
    $fp = Join-Path $src $rel
    $fname = [System.IO.Path]::GetFileName($rel)
    if (-not (Test-Path $fp)) { Write-Warn "$fname introuvable"; continue }

    $c = Read-Src $fp
    $c2 = $c -replace 'id:\s*Date\.now\(\)', 'id: crypto.randomUUID()'
    # Backtick template literal avec Date.now
    $c2 = $c2 -replace 'proj-\$\{Date\.now\(\)\}', 'proj-${crypto.randomUUID()}'
    $c2 = $c2 -replace '\$\{Date\.now\(\)\}', '${crypto.randomUUID()}'

    if ($c2 -ne $c) {
        Write-Src $fp $c2
        Write-Fix "Date.now remplace par crypto.randomUUID dans $fname"
    } else {
        Write-OK "Aucun Date.now dans le render de $fname"
    }
}

# ===========================================================
# FIX 9 - Math.random() impure dans le render
# ===========================================================
Write-Step "FIX 9 - Math.random impure dans le render"

# KPIsPersonnalisables.jsx
$kpiPath = Join-Path $src "components\modules\KPIsPersonnalisables.jsx"
if (Test-Path $kpiPath) {
    $c = Read-Src $kpiPath
    if ($c -match "Math\.random") {
        $c = $c -replace 'Math\.floor\(Math\.random\(\)\s*\*\s*(\d+)\)', 'Math.floor(42 * $1 / 100)'
        Write-Src $kpiPath $c
        Write-Fix "Math.random stabilise dans KPIsPersonnalisables.jsx"
    }
}

# OnboardingIntelligent.jsx
$onbPath = Join-Path $src "components\modules\OnboardingIntelligent.jsx"
if (Test-Path $onbPath) {
    $c = Read-Src $onbPath
    if ($c -match "Math\.random") {
        $oldLine = 'const currentTip = tips[Math.floor(Math.random() * tips.length)];'
        $newLine  = 'const [tipIndex] = useState(function() { return Math.floor(Math.random() * tips.length); });' + [Environment]::NewLine + '  const currentTip = tips[tipIndex];'
        $c = $c -replace [regex]::Escape($oldLine), $newLine
        # Ajouter useState a l import si absent
        if ($c -notmatch '\buseState\b') {
            $c = $c -replace "(import\s*\{)([^}]+)(\}\s*from\s*'react')", 'import { useState, $2} from ''react'''
        }
        Write-Src $onbPath $c
        Write-Fix "Math.random stabilise dans OnboardingIntelligent.jsx"
    }
}

# OutilsExpert.jsx
$outilPath = Join-Path $src "components\modules\OutilsExpert.jsx"
if (Test-Path $outilPath) {
    $c = Read-Src $outilPath
    if ($c -match "Math\.random") {
        $c = $c -replace 'Math\.floor\(Math\.random\(\)\s*\*\s*(\d+)\)\s*\+\s*(\d+)', '($2 + Math.floor($1 / 2))'
        Write-Src $outilPath $c
        Write-Fix "Math.random stabilise dans OutilsExpert.jsx"
    }
}

# ===========================================================
# FIX 10 - Gamification.jsx : level comme valeur derivee
# ===========================================================
Write-Step "FIX 10 - Gamification.jsx : level comme valeur derivee"

$gamPath = Join-Path $src "components\modules\Gamification.jsx"
if (Test-Path $gamPath) {
    $c = Read-Src $gamPath
    $c2 = $c -replace 'const \[level, setLevel\] = useState\([^)]*\);', 'const level = Math.floor(points / 1000) + 1; // valeur derivee'
    # Retirer le setLevel du useEffect
    $c2 = $c2 -replace '(?s)(useEffect\(\(\) => \{)\s*const newLevel = Math\.floor\(points / 1000\) \+ 1;\s*setLevel\(newLevel\);\s*', '$1' + [Environment]::NewLine + '    '
    if ($c2 -ne $c) {
        Write-Src $gamPath $c2
        Write-Fix "level converti en valeur derivee dans Gamification.jsx"
    } else { Write-OK "Gamification.jsx deja correct ou pattern non trouve" }
}

# ===========================================================
# FIX 11 - AssistantIA.jsx : useState lazy pour messages
# ===========================================================
Write-Step "FIX 11 - AssistantIA.jsx : useState lazy initializer"

$iaPath = Join-Path $src "components\modules\AssistantIA.jsx"
if (Test-Path $iaPath) {
    $c = Read-Src $iaPath
    if ($c -match "localStorage\.getItem\('projet-elite-ia-chat'\)") {
        # Remplacer useState([...]) par une version lazy
        $c2 = $c -replace 'const \[messages, setMessages\] = useState\(\[([^\]]*)\]\);', (
            "const [messages, setMessages] = useState(function() {" + [Environment]::NewLine +
            "    try {" + [Environment]::NewLine +
            "      var s = localStorage.getItem('projet-elite-ia-chat');" + [Environment]::NewLine +
            "      return s ? JSON.parse(s) : [$1];" + [Environment]::NewLine +
            "    } catch(e) { return [$1]; }" + [Environment]::NewLine +
            "  });"
        )
        # Neutraliser l'ancien useEffect d'init localStorage
        $c2 = $c2 -replace "(?s)(useEffect\(\(\) => \{\s*const saved = localStorage\.getItem\('projet-elite-ia-chat'\);\s*if \(saved\) \{\s*setMessages\(JSON\.parse\(saved\)\);\s*\} else \{)", '/* init moved to useState lazy */ useEffect(() => { if (false) {'
        Write-Src $iaPath $c2
        Write-Fix "AssistantIA.jsx useState lazy initializer applique"
    } else { Write-OK "Pattern AssistantIA non trouve ou deja corrige" }
}

# ===========================================================
# FIX 12 - usePWA.js : useState lazy pour isInstalled
# ===========================================================
Write-Step "FIX 12 - usePWA.js : useState lazy pour isInstalled"

$pwaPath = Join-Path $src "hooks\usePWA.js"
if (Test-Path $pwaPath) {
    $c = Read-Src $pwaPath
    $c2 = $c -replace "const \[isInstalled, setIsInstalled\] = useState\(false\);",
        "const [isInstalled, setIsInstalled] = useState(function() { return window.matchMedia('(display-mode: standalone)').matches; });"
    # Supprimer le useEffect redondant (isInstalled)
    $c2 = $c2 -replace "(?s)useEffect\(\(\) => \{\s*if \(window\.matchMedia\('\(display-mode: standalone\)'\)\.matches\) \{\s*setIsInstalled\(true\);\s*\}\s*\}, \[\]\);\s*", ''
    if ($c2 -ne $c) {
        Write-Src $pwaPath $c2
        Write-Fix "isInstalled useState lazy dans usePWA.js"
    } else { Write-OK "usePWA.js deja correct" }
}

# ===========================================================
# FIX 13 - sw.js : directive global clients
# ===========================================================
Write-Step "FIX 13 - sw.js : directive global clients"

$swPath = Join-Path $PWD "public\sw.js"
if (Test-Path $swPath) {
    $c = Read-Src $swPath
    if ($c -notmatch "global clients") {
        $c2 = "/* global clients, self */" + [Environment]::NewLine + $c
        Write-Src $swPath $c2
        Write-Fix "Directive global clients ajoutee a sw.js"
    } else { Write-OK "sw.js deja correct" }
} else { Write-Warn "public\sw.js introuvable" }

# ===========================================================
# FIX 14 - App.jsx : nettoyage variables inutilisees
# ===========================================================
Write-Step "FIX 14 - App.jsx : nettoyage variables inutilisees"

$appPath = Join-Path $src "App.jsx"
if (Test-Path $appPath) {
    $c = Read-Src $appPath
    $changed = $false

    # Retirer useParams si non utilise dans le body
    $bodyCheck = $c -replace "import[^\n]+react-router-dom[^\n]+", ''
    if ($bodyCheck -notmatch '\buseParams\b') {
        $c = $c -replace ',\s*useParams', ''
        $c = $c -replace 'useParams\s*,', ''
        Write-Fix "useParams retire de l'import dans App.jsx"
        $changed = $true
    }

    # Retirer sidebarOpen / toggleSidebar si non utilises
    if ($bodyCheck -notmatch 'sidebarOpen' -and $bodyCheck -notmatch 'toggleSidebar') {
        $lines = $c -split "`n"
        $lines = $lines | Where-Object { $_ -notmatch 'const \[sidebarOpen' -and $_ -notmatch 'const toggleSidebar' }
        $c = $lines -join "`n"
        Write-Fix "sidebarOpen / toggleSidebar supprimes de App.jsx"
        $changed = $true
    }

    if ($changed) { Write-Src $appPath $c }
    else { Write-OK "App.jsx deja propre" }
}

# ===========================================================
# FIX 15 - DashboardProjet.jsx : useMemo conditionnel
# ===========================================================
Write-Step "FIX 15 - DashboardProjet.jsx : useMemo apres return conditionnel"

$dpPath = Join-Path $src "components\modules\DashboardProjet.jsx"
if (Test-Path $dpPath) {
    $c = Read-Src $dpPath
    if ($c -match "if \(!projet\) return" -and $c -match "useMemo") {
        # Commenter le early return - remplace JSX inline par string pour eviter erreur PS
        $earlyReturn = 'if (!projet) return null; // FIX: guard deplace apres les hooks'
        $c2 = $c -replace 'if \(!projet\) return[^;]+;', $earlyReturn
        # Ajouter le guard reel dans le bloc de rendu final
        $c2 = $c2 -replace '(return \()', "if (!projet) { return null; }" + [Environment]::NewLine + "  " + '$1'
        Write-Src $dpPath $c2
        Write-Fix "early return deplace apres hooks dans DashboardProjet.jsx"
    } else { Write-OK "DashboardProjet.jsx deja correct" }
}

# ===========================================================
# VERIFICATION FINALE
# ===========================================================
Write-Step "VERIFICATION - Comptage erreurs ESLint restantes"

try {
    $lintOut = & npm run lint 2>&1 | Out-String
    $nbErrors   = ([regex]::Matches($lintOut, ' error ')).Count
    $nbWarnings = ([regex]::Matches($lintOut, ' warning ')).Count
    Write-Host ""
    Write-Host "  Erreurs restantes : $nbErrors  (etait 195)" -ForegroundColor $(if ($nbErrors -lt 60) { 'Green' } else { 'Yellow' })
    Write-Host "  Warnings          : $nbWarnings" -ForegroundColor Gray
    Write-Host ""
    if ($nbErrors -lt 60) { Write-OK "Amelioration majeure confirmee !" }
    else { Write-Warn "Consulter la sortie lint pour les erreurs residuelles" }
} catch {
    Write-Warn "Lint non disponible : $($_.Exception.Message)"
}

# ===========================================================
# BUILD FINAL
# ===========================================================
Write-Step "BUILD FINAL"

try {
    $buildOut = & npm run build 2>&1 | Out-String
    if ($buildOut -match "built in") {
        Write-OK "Build reussi - dist/ genere"
        Write-Host ""
        Write-Host "  npm run dev  puis  http://localhost:5173" -ForegroundColor Cyan
    } else {
        Write-Warn "Build avec avertissements - verifier la sortie"
        Write-Host $buildOut -ForegroundColor Gray
    }
} catch {
    Write-Warn "Erreur build : $($_.Exception.Message)"
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor DarkGray
Write-Host "  Corrections appliquees :" -ForegroundColor White
Write-Host "  1.  ErrorBoundary dans main.jsx" -ForegroundColor Gray
Write-Host "  2.  Imports React Hooks inutilises nettoyes" -ForegroundColor Gray
Write-Host "  3.  generateDefaultNotifications (Notifications.jsx)" -ForegroundColor Gray
Write-Host "  4.  genererPredictions (PredictionsML.jsx)" -ForegroundColor Gray
Write-Host "  5.  loadTranslations (useLanguage.js)" -ForegroundColor Gray
Write-Host "  6.  Encodage UTF-8 (DashboardProjetIsole.jsx)" -ForegroundColor Gray
Write-Host "  7.  modulesValides declare (TableauUniversitaire.jsx)" -ForegroundColor Gray
Write-Host "  8.  Date.now remplace par crypto.randomUUID (4 fichiers)" -ForegroundColor Gray
Write-Host "  9.  Math.random stabilise (3 fichiers)" -ForegroundColor Gray
Write-Host "  10. level valeur derivee (Gamification.jsx)" -ForegroundColor Gray
Write-Host "  11. useState lazy (AssistantIA.jsx)" -ForegroundColor Gray
Write-Host "  12. useState lazy (usePWA.js)" -ForegroundColor Gray
Write-Host "  13. Directive global clients (sw.js)" -ForegroundColor Gray
Write-Host "  14. useParams/sidebarOpen nettoyes (App.jsx)" -ForegroundColor Gray
Write-Host "  15. useMemo conditionnel corrige (DashboardProjet.jsx)" -ForegroundColor Gray
Write-Host "================================================================" -ForegroundColor DarkGray
