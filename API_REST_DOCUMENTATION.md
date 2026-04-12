# 📚 API REST - Documentation Complète

## 🎯 Vue d'Ensemble

L'API REST de Projet Élite permet l'intégration avec des systèmes tiers (CRM, ERP, outils BI, applications mobiles).

**Base URL** : `https://api.projetelite.com/v1`  
**Authentification** : Bearer Token (JWT)  
**Format** : JSON  
**Version** : 1.0.0

---

## 🔐 Authentification

### Obtenir un Token

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "votre_mot_de_passe"
}
```

**Réponse** :
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400,
  "user": {
    "id": "usr_123",
    "email": "user@example.com",
    "role": "admin"
  }
}
```

### Utiliser le Token

```http
GET /api/projets
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📊 Endpoints

### PROJETS

#### Lister tous les projets
```http
GET /api/projets
```

**Query Params** :
- `page` (number) : Numéro de page (défaut: 1)
- `limit` (number) : Items par page (défaut: 20)
- `statut` (string) : Filtrer par statut
- `chef` (string) : Filtrer par chef de projet

**Réponse** :
```json
{
  "success": true,
  "data": [
    {
      "id": "proj_001",
      "nom": "Refonte SI Comptable",
      "chef": "Jean D.",
      "debut": "2026-01-01",
      "fin": "2026-06-30",
      "avancement": 65,
      "statut": "En cours",
      "budget": 120000000,
      "budgetReel": 78000000,
      "createdAt": "2026-01-01T00:00:00Z",
      "updatedAt": "2026-04-12T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

#### Créer un projet
```http
POST /api/projets
Content-Type: application/json
Authorization: Bearer {token}

{
  "nom": "Nouveau Projet",
  "chef": "Marie K.",
  "debut": "2026-05-01",
  "fin": "2026-12-31",
  "budget": 500000000,
  "description": "Description du projet"
}
```

#### Récupérer un projet
```http
GET /api/projets/{id}
```

#### Mettre à jour un projet
```http
PUT /api/projets/{id}
Content-Type: application/json

{
  "avancement": 75,
  "statut": "En cours"
}
```

#### Supprimer un projet
```http
DELETE /api/projets/{id}
```

---

### TÂCHES

#### Lister les tâches
```http
GET /api/projets/{projetId}/taches
```

**Query Params** :
- `statut` : "À faire" | "En cours" | "Fait"
- `priorite` : "Critique" | "Haute" | "Moyenne" | "Basse"
- `responsable` : Nom du responsable

**Réponse** :
```json
{
  "success": true,
  "data": [
    {
      "id": "task_001",
      "projet": "Refonte SI Comptable",
      "tache": "Audit existant",
      "responsable": "Jean D.",
      "debut": "2026-01-01",
      "fin": "2026-01-31",
      "statut": "Fait",
      "priorite": "Haute",
      "progression": 100
    }
  ]
}
```

#### Créer une tâche
```http
POST /api/projets/{projetId}/taches
Content-Type: application/json

{
  "tache": "Développement module",
  "responsable": "Paul M.",
  "debut": "2026-05-01",
  "fin": "2026-06-30",
  "priorite": "Haute"
}
```

---

### BUDGET

#### Récupérer budget projet
```http
GET /api/projets/{projetId}/budget
```

**Réponse** :
```json
{
  "success": true,
  "data": {
    "budgetTotal": 120000000,
    "budgetConsomme": 78000000,
    "budgetRestant": 42000000,
    "pourcentageConsomme": 65,
    "categories": [
      {
        "categorie": "Ressources humaines",
        "planifie": 80000000,
        "reel": 52000000,
        "statut": "Normal"
      }
    ]
  }
}
```

---

### RISQUES

#### Lister les risques
```http
GET /api/projets/{projetId}/risques
```

**Réponse** :
```json
{
  "success": true,
  "data": [
    {
      "id": "risk_001",
      "risque": "Dépassement budgétaire",
      "gravite": 4,
      "probabilite": 3,
      "score": 12,
      "attenuation": "Suivi hebdomadaire",
      "statut": "Actif"
    }
  ]
}
```

#### Créer un risque
```http
POST /api/projets/{projetId}/risques
Content-Type: application/json

{
  "risque": "Retard fournisseur",
  "gravite": 3,
  "probabilite": 4,
  "attenuation": "Contrats avec pénalités"
}
```

---

### RAPPORTS

#### Générer rapport PDF
```http
POST /api/rapports/pdf
Content-Type: application/json

{
  "projetId": "proj_001",
  "type": "complet",
  "sections": ["resume", "budget", "risques", "jalons"]
}
```

**Réponse** :
```json
{
  "success": true,
  "url": "https://api.projetelite.com/rapports/rapport_20260412.pdf",
  "expiresIn": 3600
}
```

#### Générer rapport Excel
```http
POST /api/rapports/excel
Content-Type: application/json

{
  "projetId": "proj_001",
  "feuilles": ["projets", "taches", "budget"]
}
```

---

### NOTIFICATIONS

#### Lister notifications
```http
GET /api/notifications
```

**Query Params** :
- `nonLu` (boolean) : Filtre non lues uniquement
- `type` : "critical" | "warning" | "info"

#### Marquer comme lu
```http
PUT /api/notifications/{id}/lu
```

#### Créer notification
```http
POST /api/notifications
Content-Type: application/json

{
  "type": "warning",
  "titre": "Alerte Budget",
  "message": "Dépassement détecté",
  "destinataires": ["user@example.com"],
  "priorite": "Haute"
}
```

---

### ANALYTICS

#### KPIs globaux
```http
GET /api/analytics/kpis
```

**Réponse** :
```json
{
  "success": true,
  "data": {
    "totalProjets": 45,
    "projetsActifs": 32,
    "avancementMoyen": 62,
    "budgetTotal": 15000000000,
    "budgetConsomme": 9750000000,
    "risquesActifs": 28,
    "problemesOuverts": 12,
    "tauxRetard": 15.5
  }
}
```

#### Tendances
```http
GET /api/analytics/tendances?periode=30j
```

---

## 📝 Exemples d'Utilisation

### JavaScript / Fetch

```javascript
// Lister les projets
const response = await fetch('https://api.projetelite.com/v1/projets', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);

// Créer une tâche
const task = await fetch('https://api.projetelite.com/v1/projets/proj_001/taches', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tache: 'Nouvelle tâche',
    responsable: 'Jean D.',
    debut: '2026-05-01',
    fin: '2026-05-31',
    priorite: 'Haute'
  })
});
```

### Python / Requests

```python
import requests

# Configuration
BASE_URL = "https://api.projetelite.com/v1"
TOKEN = "votre_token_jwt"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

# Lister projets
response = requests.get(f"{BASE_URL}/projets", headers=HEADERS)
projets = response.json()
print(projets)

# Créer risque
risk_data = {
    "risque": "Nouveau risque identifié",
    "gravite": 4,
    "probabilite": 3,
    "attenuation": "Plan d'action"
}
response = requests.post(
    f"{BASE_URL}/projets/proj_001/risques",
    headers=HEADERS,
    json=risk_data
)
```

### cURL

```bash
# Authentification
curl -X POST https://api.projetelite.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Lister projets
curl -X GET https://api.projetelite.com/v1/projets \
  -H "Authorization: Bearer YOUR_TOKEN"

# Créer tâche
curl -X POST https://api.projetelite.com/v1/projets/proj_001/taches \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tache": "Task API",
    "responsable": "Jean D.",
    "debut": "2026-05-01",
    "fin": "2026-05-31"
  }'
```

---

## ⚠️ Codes d'Erreur

| Code | Signification | Exemple |
|------|---------------|---------|
| 200 | Succès | GET réussi |
| 201 | Créé | POST réussi |
| 400 | Requête invalide | JSON malformé |
| 401 | Non autorisé | Token manquant/expiré |
| 403 | Interdit | Permissions insuffisantes |
| 404 | Non trouvé | Ressource inexistante |
| 429 | Trop de requêtes | Rate limit dépassé |
| 500 | Erreur serveur | Bug interne |

**Format d'erreur** :
```json
{
  "success": false,
  "error": {
    "code": 400,
    "message": "Le champ 'nom' est requis",
    "details": {}
  }
}
```

---

## 🔒 Rate Limiting

- **Authentifié** : 1000 requêtes/heure
- **Non authentifié** : 100 requêtes/heure
- **Upload fichiers** : 50/heure

**Headers de réponse** :
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1617235200
```

---

## 📦 Webhooks

### Configurer un webhook

```http
POST /api/webhooks
Content-Type: application/json

{
  "url": "https://votre-site.com/webhook",
  "events": ["projet.cree", "tache.modifiee", "risque.critique"],
  "secret": "votre_secret"
}
```

### Événements disponibles

- `projet.cree` - Nouveau projet créé
- `projet.modifie` - Projet mis à jour
- `tache.cree` - Nouvelle tâche
- `tache.terminee` - Tâche complétée
- `risque.critique` - Risque score > 15
- `budget.depasse` - Budget dépassé
- `jalon.atteint` - Jalon atteint

### Payload webhook

```json
{
  "event": "projet.modifie",
  "timestamp": "2026-04-12T00:00:00Z",
  "data": {
    "id": "proj_001",
    "nom": "Projet A",
    "avancement": 75
  },
  "signature": "sha256=..."
}
```

---

## 🧨 SDK Officiels

### JavaScript/Node.js

```bash
npm install @projetelite/sdk
```

```javascript
import ProjetElite from '@projetelite/sdk';

const client = new ProjetElite({
  apiKey: 'your_api_key'
});

// Lister projets
const projets = await client.projets.list();

// Créer tâche
const task = await client.taches.create('proj_001', {
  tache: 'Nouvelle tâche',
  responsable: 'Jean D.'
});
```

### Python

```bash
pip install projetelite
```

```python
from projetelite import Client

client = Client(api_key='your_api_key')

# Lister projets
projets = client.projets.list()

# Créer risque
risk = client.risques.create('proj_001', {
    'risque': 'Nouveau risque',
    'gravite': 4,
    'probabilite': 3
})
```

---

## 📊 Limites

| Ressource | Limite |
|-----------|--------|
| Taille requête | 10 MB |
| Upload fichier | 100 MB |
| Pagination max | 100 items/page |
| Timeout | 30 secondes |
| Webhooks retry | 3 fois |

---

## 🆘 Support

- 📧 Email : api@projetelite.com
- 💬 Slack : #api-support
- 📚 Docs : https://docs.projetelite.com
- 🐛 Bugs : GitHub Issues

---

**Version** : 1.0.0  
**Dernière mise à jour** : 12 Avril 2026  
**Statut** : ✅ Production Ready
