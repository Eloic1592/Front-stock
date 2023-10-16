Create database maintenance;
Create role maintenance login password 'maintenance';
Alter database maintenance owner to maintenance;
\c maintenance maintenance
maintenance

-- Suppression des tables
DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;


-- Suppression de donnees
DO $$ DECLARE
    r text;
BEGIN
    SET CONSTRAINTS ALL DEFERRED;
    FOR r IN (SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE') LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(r) || ' CASCADE;';
    END LOOP;
END $$;

-- Admin
Create table admin(
    id serial primary key,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    email TEXT not null,
    mdp TEXT NOT null
);

-- Technicien
Create table technicien(
    id serial primary key,
    nom Text NOT NULL,
    prenom TEXT NOT NULL,
    code varchar(50) not null,
    email text not null,
    mdp text NOT NULL,
    etat int not null default 0
);
-- Utilisateur
--   La page d'accueil de l'utilisateur est par default le formulaire de deposition  de plainte.
--  La raison pour l'accueil il n'y a pas  de login pour les utilisateurs

-- Utilisateur
Create table type_utilisateur(
    id serial primary key,
    type_utilisateur text not null,
    etat int not null default 0
);

Create table utilisateur(
    id serial primary key,
    nom varchar(100) not null,
    prenom varchar(100) not null,
    email varchar(100) not null,
    idtype_utilisateur int not null references type_utilisateur(id),
    mdp varchar(100) not null,
    etat int not null default 0
);


-- Materiels
Create table materiel(
    id serial primary key,
    materiel text not null,
    etat int not null default 0
);

-- Type entretien
Create table type_entretien(
    id serial primary key,
    type_entretien text not null,
    etat int not null default 0
);


-- Entretien
Create table entretien(
    id  serial primary key,
    idtype_entretien int not null references type_entretien(id),
    idmateriel int not null references materiel(id),
    entretien TEXT NOT NULL,
    etat int not null default 0
);


-- Plainte
Create table plainte(
    id serial primary key,
    identretien int not null references entretien (id),
    description TEXT DEFAULT NULL,
    date_depot timestamp default current_timestamp,
    etat int not null default 0
);
-- Tache a faire

Create table tache(
    id serial primary key,
    idplainte  int not null references plainte(id),
    idtechnicien int not null references technicien(id),
    identretien int not null references entretien(id),
    designation TEXT default NULL,
    date_tache timestamp default current_timestamp,
    etat int not null default 0
);


-- Intervention par rapport a la tache
Create table intervention(
    id  serial primary key,
    idtache int not null references tache(id),
    identretien int not null references entretien(id),
    entretien TEXT NOT NULL,
    date_int timestamp default current_timestamp,
    etat int not null default 0
);

-- Conversation 
Create table conversation(
    id  serial primary key,
    idtache int not null references tache(id),
    idtechnicien int not null references technicien(id),
    idutilisateur int not null references utilisateur(id),
    description TEXT DEFAULT NULL,
    date_envoi timestamp default current_timestamp,
    etat int not null default 0
);

-- Photo pour la conversation
Create Table photo(
    id serial primary key,
    idconversation int not null references conversation(id),
    idtechnicien int not null references technicien(id),
    idutilisateur int not null references utilisateur(id),
    photo TEXT default NULL,
    date_envoi timestamp default current_timestamp,
    etat int not null default 0
);

-- Lien pour la conversation
Create table lien(
    id serial primary key,
    idconversation int not null references conversation(id),
    idtechnicien int not null references technicien(id),
    idutilisateur int not null references utilisateur(id),
    lien TEXT default null,
    date_envoi timestamp default current_timestamp,
    etat int not null default 0
);



-- Tache achevee
Create table tache_acheve(
    id serial primary key,
    idtache int not null references tache(id),
    date_fin timestamp default current_timestamp,
    etat int not null default 0
);

-- 


-- Taches prioritaires
Create table tache_prioritaires(
    id serial primary key,
    idtache int not null references tache(id),
    etat int not null default 0
);

-- Historique recherche
Create table historique(
    id serial primary key,
    mot_cle TEXT not null,
    historique TEXT,
    date_historique timestamp default current_timestamp,
    etat int not null default 0
);


-- Disponibilite de technicien
Create table disponibilite(
    id serial primary key,
    idtechnicien int not null references technicien(id),
    date_debut timestamp default current_timestamp,
    date_fin timestamp default current_timestamp,
    etat int not null default 0
);


-- Reponse en tant que suggestion
Create table suggestion(
    id serial primary key not null,
    solution TEXT not null,
    etat int not null default 0
);



-- Select 
-- Table admin
SELECT * FROM admin;

-- Table technicien
SELECT * FROM technicien;

-- Table materiel
SELECT * FROM materiel;

-- Table type_entretien
SELECT * FROM type_entretien;

-- Table entretien
SELECT * FROM entretien;

-- Table taches
SELECT * FROM tache;

-- Table tache_acheve
SELECT * FROM tache_acheve;

-- Table tache_prioritaires
SELECT * FROM tache_prioritaires;

-- Table historique
SELECT * FROM historique;

-- Table disponibilite
SELECT * FROM disponibilite;

-- Statistiques:Vue

-- Vue
-- Probleme materiel
Create or replace view probleme_mat as
select pm.id as idprobleme,m.nom,pm.description,pm.date_envoi,concat(u.nom,u.prenom) from materiel m join probleme_materiel pm on pm.idmateriel=m.id join utilisateur u on u.id=pm.idutilisateur ;

-- Probleme salle
Create or replace view probleme_sal as
select pm.id as idprobleme,pm.description,pm.date_envoi,s.nom from salle s join probleme_sal pm on pm.idsalle=s.id join utilisateur u on u.id=pm.idutilisateur;



