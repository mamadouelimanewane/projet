# Configuration Supabase - Projet Élite

Pour activer la synchronisation Cloud, créez la table suivante dans votre éditeur SQL Supabase :

```sql
-- 1. Création de la table pour le stockage de l'état global
create table project_data (
  id text primary key,
  content jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Création de la table pour le Chat Temps Réel
create table messages (
  id uuid primary key default gen_random_uuid(),
  salon_id text not null,
  user_name text not null,
  avatar text,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Activation de RLS
alter table project_data enable row level security;
alter table messages enable row level security;

-- 4. Politiques d'accès public (Démo)
create policy "Accès complet public data" on project_data for all using (true);
create policy "Accès complet public chat" on messages for all using (true);

-- 5. Activation du Temps Réel pour le Chat
alter publication supabase_realtime add table messages;

```

### Étapes suivantes :
1.  Copiez votre **URL de projet** et votre **Clé d'API (anon)** depuis les paramètres API de Supabase.
2.  Créez un fichier `.env` à la racine du projet :
    ```env
    VITE_SUPABASE_URL=votre_url_ici
    VITE_SUPABASE_ANON_KEY=votre_cle_ici
    ```
3.  Relancez le serveur `npm run dev`. Un bouton **☁ Synchroniser** apparaîtra dans la barre supérieure !
