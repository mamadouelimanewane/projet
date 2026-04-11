# 📊 Tableau de Bord par Projet - Documentation

## 🎯 Fonctionnalité

Le **Tableau de Bord par Projet** permet d'avoir une vue détaillée et complète de chaque projet individuellement, avec des indicateurs de performance, des graphiques analytiques et des accès rapides vers tous les modules connexes.

---

## 🚀 Comment y accéder

### Méthode 1 : Depuis Multi-Projets
1. Allez dans le module **Multi-Projets** (`/#/multiprojets`)
2. Sur chaque carte de projet, cliquez sur l'icône **📊** (Tableau de bord)
3. Vous arrivez sur le dashboard spécifique au projet

### Méthode 2 : Depuis le Dashboard Principal
1. Allez sur le **Dashboard** global (`/#/dashboard`)
2. Dans le graphique "Avancement par Projet", **cliquez sur une barre**
3. Vous arrivez sur le dashboard du projet correspondant

### Méthode 3 : URL Directe
- Accédez directement via : `/#/dashboard-projet/{id_projet}`
- Exemple : `/#/dashboard-projet/1`

---

## 📈 Contenu du Tableau de Bord

### 1. **Header Projet**
- Nom du projet avec badge de statut
- Chef de projet
- Période (date début → fin)
- Bouton retour vers Multi-Projets

### 2. **KPIs Principaux (5 cartes)**
| KPI | Description | Couleurs |
|-----|-------------|----------|
| **Avancement** | % réalisé vs % prévu | 🟢 Dans les clous / 🟡 En retard |
| **Budget** | % consommé du budget total | 🟢 <80% / 🟡 80-100% / 🔴 >100% |
| **Tâches** | Tâches faites / total + en cours | 🟣 Toujours visible |
| **Problèmes** | Nombre de problèmes ouverts | 🔴 Ouverts / 🟢 Aucun |
| **Risques** | Risques actifs | 🔵 ≤2 / 🟡 >2 |

### 3. **Indicateurs EVM (Earned Value Management)**
| Indicateur | Signification | Interprétation |
|------------|---------------|----------------|
| **SPI** | Schedule Performance Index | ≥1 ✅ Dans les délais / <1 ⚠️ En retard |
| **CPI** | Cost Performance Index | ≥1 ✅ Sous budget / <1 ⚠️ Dépassement |
| **Budget Restant** | Montant disponible | Affiché en M FCFA |
| **Retards Actifs** | Tâches en retard | 🔴 >0 / 🟢 Aucun |

### 4. **Graphiques Analytiques**

#### A. Progression Prévue vs Réelle
- **Type** : Area Chart
- **Axe X** : Étapes du projet (Début, 25%, 50%, 75%, Actuel)
- **Axe Y** : Pourcentage d'avancement (0-100%)
- **Courbes** :
  - 🔵 Violette : Progression théorique prévue
  - 🟢 Verte : Progression réelle
- **Utilité** : Visualiser immédiatement si le projet est en avance ou retard

#### B. Répartition des Tâches
- **Type** : Pie Chart (donut)
- **Segments** :
  - 🟢 Terminé
  - 🟡 En cours
  - 🔵 À faire
- **Utilité** : Voir la distribution du travail

#### C. Budget par Catégorie
- **Type** : Bar Chart
- **Barres** :
  - 🔵 Planifié
  - 🟣 Réel
- **Unité** : Millions FCFA
- **Utilité** : Comparer budget prévu vs dépenses réelles par catégorie

#### D. Taux d'Achèvement par Priorité
- **Type** : Progress Bars
- **Catégories** : Critique, Haute, Moyenne, Basse
- **Affichage** : X/Y (Z%)
- **Couleurs dynamiques** :
  - 🟢 100% complété
  - 🟡 60-99% complété
  - 🔴 <60% complété
- **Utilité** : Identifier si les tâches prioritaires sont bien avancées

### 5. **Alertes & Actions Requises**
- Liste des problèmes non résolus du projet
- Affichage des retards actifs
- Liens directs vers les modules concernés
- **Si aucun problème** : Message "✅ Tout est sous contrôle"

### 6. **Jalons du Projet**
- Grille de tous les jalons
- **Code couleur** :
  - 🟢 Atteint
  - 🟡 En cours
  - ⚪ Planifié
- Compteur : X/Y atteints

### 7. **Accès Rapide aux Modules (12 boutons)**
| Module | Icône | Route |
|--------|-------|-------|
| Tâches | ⊞ | /#/taches |
| Gantt | 📊 | /#/gantt |
| Kanban | 📋 | /#/kanban |
| Budget | 💰 | /#/budget |
| Risques | ⛨ | /#/risques |
| Jalons | ◆ | /#/jalons |
| Problèmes | ⚠ | /#/problemes |
| Délais | ⏱ | /#/delais |
| Ressources | 👥 | /#/ressources |
| EVM | 📈 | /#/evm |
| Documents | 📄 | /#/docs |
| Rapports | 📑 | /#/rapports |

---

## 🎨 Design & UX

### Couleurs Utilisées
- **Indigo (#6366f1)** : Éléments principaux, navigation
- **Emerald (#10b981)** : Succès, dans les clous
- **Amber (#f59e0b)** : Attention, en cours
- **Red (#ef4444)** : Danger, problèmes critiques
- **Slate** : Arrière-plans, textes secondaires

### Animations
- **Entrée** : Animation fade-in progressive
- **Hover** : Effets de survol sur tous les éléments interactifs
- **Transitions** : Changements fluides de couleurs et tailles

### Responsive
- **Desktop** : Grilles multi-colonnes
- **Tablette** : Adaptation 2 colonnes
- **Mobile** : Empilement vertical

---

## 💡 Cas d'Usage

### Pour le Chef de Projet
1. **Matin** : Ouvrir le dashboard pour voir l'état général
2. **Identifier** les problèmes et retards immédiatement
3. **Cliquer** sur les accès rapides pour investiguer
4. **Prendre des décisions** basées sur les KPIs

### Pour le Promoteur/Client
1. **Voir** l'avancement réel vs prévu
2. **Contrôler** la consommation budgétaire
3. **Vérifier** les jalons atteints
4. **Suivre** les risques et problèmes

### Pour le Comité de Pilotage
1. **Présenter** les indicateurs EVM (SPI, CPI)
2. **Montrer** la tendance de progression
3. **Justifier** les demandes de budget/délai
4. **Documenter** l'état du projet

---

## 🔧 Configuration Technique

### Fichiers Modifiés/Créés
| Fichier | Type | Description |
|---------|------|-------------|
| `DashboardProjet.jsx` | ✨ Nouveau | Composant principal du dashboard |
| `App.jsx` | 🔧 Modifié | Ajout de la route `/dashboard-projet/:projetId` |
| `MultiProjets.jsx` | 🔧 Modifié | Ajout du bouton 📊 sur chaque projet |
| `Dashboard.jsx` | 🔧 Modifié | Graphique cliquable vers dashboard projet |

### Données Utilisées
Le dashboard filtre automatiquement les données globales pour ne montrer que :
- Les tâches du projet (filtrées par `projet.nom`)
- Les problèmes liés aux tâches du projet
- Les délais correspondants
- Les jalons (tous affichés)
- Le budget global du projet

### Calculs Automatiques
- **SPI** = EV / PV ( Earned Value / Planned Value )
- **CPI** = EV / AC ( Earned Value / Actual Cost )
- **Progression théorique** = (jours écoulés / jours totaux) × 100
- **Budget restant** = Budget total - Budget consommé

---

## 📝 Exemple Concret

### Projet : "Refonte SI Comptable"
```
Avancement : 65% (sur 68% prévu) ⚠️
Budget : 65% consommé (78M / 120M) ✅
Tâches : 2/6 terminées, 2 en cours
Problèmes : 2 ouverts (1 critique)
Risques : 6 actifs

SPI : 0.96 (léger retard)
CPI : 1.01 (sous budget)
Budget restant : 42M FCFA
Retards actifs : 1
```

### Actions Recommandées
1. ⚠️ **Investiguer le retard** : SPI < 1
2. ✅ **Maintenir la performance budgétaire** : CPI > 1
3. 🔴 **Résoudre le problème critique** : Bug module facturation
4. 📊 **Consulter le Gantt** pour réviser le planning

---

## 🎓 Bonnes Pratiques

### Fréquence de Consultation
- **Chef de projet** : Quotidienne (matin)
- **Sponsors** : Hebdomadaire
- **Comité de pilotage** : Mensuel

### Interprétation des KPIs
| Indicateur | Vert | Jaune | Rouge |
|------------|------|-------|-------|
| SPI | ≥ 1.0 | 0.9 - 0.99 | < 0.9 |
| CPI | ≥ 1.0 | 0.9 - 0.99 | < 0.9 |
| Avancement | ≥ prévu | -10% à -1% | < -10% |
| Budget | ≤ 80% | 81% - 100% | > 100% |
| Problèmes | 0 | 1-2 | > 2 |

### Actions selon les Alertes
- **SPI < 1** : Analyser les retards, réviser planning, ajouter ressources
- **CPI < 1** : Contrôler les dépenses, négocier fournisseurs, réduire scope
- **Problèmes critiques** : Résolution immédiate, escalation si nécessaire
- **Risques élevés** : Activer plans d'atténuation

---

## 🔄 Évolutions Futures Possibles

### Améliorations Prévues
- [ ] Export PDF du dashboard
- [ ] Comparaison multi-projets côte à côte
- [ ] Historique des KPIs dans le temps
- [ ] Alertes email automatiques
- [ ] Personnalisation des widgets
- [ ] Vue portefeuille consolidée
- [ ] Intégration avec modules IA (prédictions)

### Suggestions
Vous pouvez proposer des améliorations en créant des issues sur le repository ou en contactant l'équipe de développement.

---

## ❓ FAQ

**Q : Pourquoi certaines données ne sont pas filtrées par projet ?**  
R : Certains modules (Risques, Jalons, Budget) sont actuellement globaux. Le filtrage par projet sera ajouté dans une future version.

**Q : Comment sont calculés SPI et CPI ?**  
R : SPI = (Avancement% × Budget) / (Temps écoulé% × Budget). CPI = (Avancement% × Budget) / Budget réel.

**Q : Puis- personnaliser les KPIs affichés ?**  
R : Pas encore, mais c'est prévu dans les évolutions futures.

**Q : Le dashboard se met-il à jour en temps réel ?**  
R : Oui, il utilise les données du store Zustand qui sont mises à jour instantanément.

---

## 📞 Support

Pour toute question ou problème :
- 📧 Email : support@projetelite.com
- 💬 Chat : Module Assistant Élite dans l'application
- 📚 Documentation : Module Guide Interactif

---

*Dernière mise à jour : Avril 2026*  
*Version : 1.0*  
*Projet Élite - La plateforme de gestion de projet ultime*
