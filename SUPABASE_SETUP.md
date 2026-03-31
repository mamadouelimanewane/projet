# Configuration Supabase - Projet Élite

Pour activer la synchronisation Cloud, créez la table suivante dans votre éditeur SQL Supabase :

```sql
-- 1. Création de la table pour le stockage de l'état global
create table project_data (
  id text primary key,
  content jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Activation de RLS (Row Level Security) - Optionnel mais recommandé
alter table project_data enable row level security;

-- 3. Politique d'accès public (Pour démo - À restreindre en prod réelle)
create policy "Accès complet public pour demo" 
on project_data for all 
using (true);
```

### Étapes suivantes :
1.  Copiez votre **URL de projet** et votre **Clé d'API (anon)** depuis les paramètres API de Supabase.
2.  Créez un fichier `.env` à la racine du projet :
    ```env
    VITE_SUPABASE_URL=votre_url_ici
    VITE_SUPABASE_ANON_KEY=votre_cle_ici
    ```
3.  Relancez le serveur `npm run dev`. Un bouton **☁ Synchroniser** apparaîtra dans la barre supérieure !
