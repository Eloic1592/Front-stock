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

-- Sequence CODE TECHNICIEN
Create sequence codetech_seq start with 1 increment by 1;

-- Admin
CREATE TABLE admin (
    id serial PRIMARY KEY,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    email TEXT NOT NULL,
    mdp TEXT NOT NULL
);

-- Technicien
CREATE TABLE technicien (
    id serial PRIMARY KEY,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    code varchar(50) NOT NULL default concat('TECH-',nextval('codetech_seq')),
    email text NOT NULL,
    mdp text NOT NULL,
    etat int NOT NULL DEFAULT 0
);

-- Utilisateur
CREATE TABLE type_utilisateur (
    id serial PRIMARY KEY,
    type_utilisateur text NOT NULL,
    etat int NOT NULL DEFAULT 0
);

CREATE TABLE utilisateur (
    id serial PRIMARY KEY,
    nom varchar(100) NOT NULL,
    prenom varchar(100) NOT NULL,
    dtn date NOT NULL,
    code TEXT DEFAULT NULL,
    email varchar(100) NOT NULL,
    mdp varchar(100) NOT NULL,
    idtype_utilisateur int NOT NULL REFERENCES type_utilisateur(id),
    etat int NOT NULL DEFAULT 0
);

-- Salle
CREATE TABLE salle (
    id serial NOT NULL PRIMARY KEY,
    salle TEXT NOT NULL,
    etat int NOT NULL DEFAULT 0
);

-- Materiels
CREATE TABLE materiel (
    id serial PRIMARY KEY,
    materiel text NOT NULL,
    etat int NOT NULL DEFAULT 0
);

-- Plainte
CREATE TABLE plainte (
    id serial PRIMARY KEY,
    date_depot timestamp DEFAULT current_timestamp,
    etat int NOT NULL DEFAULT 0
);

CREATE TABLE plainte_individuel (
    id serial PRIMARY KEY,
    idplainte int NOT NULL REFERENCES plainte(id),
    idutilisateur int NOT NULL REFERENCES utilisateur(id),
    description text DEFAULT NULL,
    idmateriel int NOT NULL REFERENCES materiel(id),
    etat int NOT NULL DEFAULT 0
);

CREATE TABLE plainte_salle (
    id serial PRIMARY KEY,
    idplainte int NOT NULL REFERENCES plainte(id),
    idsalle int NOT NULL REFERENCES salle(id),
    description text DEFAULT NULL,
    idmateriel int NOT NULL REFERENCES materiel(id),
    etat int NOT NULL DEFAULT 0
);

CREATE TABLE fichier_pl (
    id serial PRIMARY KEY,
    idplainte int NOT NULL REFERENCES plainte(id),
    date_envoi timestamp DEFAULT current_timestamp,
    fichier TEXT NOT NULL,
    etat int NOT NULL DEFAULT 0
);

CREATE TABLE video_pl (
    id serial PRIMARY KEY,
    idplainte int NOT NULL REFERENCES plainte(id),
    date_envoi timestamp DEFAULT current_timestamp,
    URL TEXT NOT NULL,
    etat int NOT NULL DEFAULT 0
);

-- Conversation
CREATE TABLE conversation (
    id serial PRIMARY KEY,
    text text DEFAULT NULL,
    idutilisateur int NOT NULL REFERENCES utilisateur(id),
    idtechnicien int NOT NULL REFERENCES technicien(id),
    date_envoi timestamp DEFAULT current_timestamp,
    etat int NOT NULL DEFAULT 0
);

CREATE TABLE fichier_con (
    id serial PRIMARY KEY,
    idcon int NOT NULL REFERENCES conversation(id),
    date_envoi timestamp DEFAULT current_timestamp,
    fichier TEXT NOT NULL,
    etat int NOT NULL DEFAULT 0
);

CREATE TABLE video_con (
    id serial PRIMARY KEY,
    idcon int NOT NULL REFERENCES conversation(id),
    date_envoi timestamp DEFAULT current_timestamp,
    URL TEXT NOT NULL,
    etat int NOT NULL DEFAULT 0
);

CREATE TABLE archivage (
    id serial PRIMARY KEY,
    idcon int NOT NULL REFERENCES conversation(id),
    date timestamp DEFAULT current_timestamp,
    etat int NOT NULL DEFAULT 0
);

-- Tache a faire
CREATE TABLE tache (
    id serial PRIMARY KEY,
    idplainte int NOT NULL REFERENCES plainte(id),
    date_tache timestamp DEFAULT current_timestamp,
    etat int NOT NULL DEFAULT 0
);

CREATE TABLE tache_tech (
    id serial PRIMARY KEY,
    idtache int NOT NULL REFERENCES tache(id),
    idtechnicien int NOT NULL REFERENCES technicien(id),
    etat int NOT NULL DEFAULT 0
);

CREATE TABLE tache_acheve (
    id serial PRIMARY KEY,
    idtache int NOT NULL REFERENCES tache(id),
    date_fin timestamp DEFAULT current_timestamp,
    etat int NOT NULL DEFAULT 0
);

CREATE TABLE tache_prioritaires (
    id serial PRIMARY KEY,
    idtache int NOT NULL REFERENCES tache(id),
    etat int NOT NULL DEFAULT 0
);

-- Achat
CREATE TABLE achat (
    id serial PRIMARY KEY,
    date_achat timestamp DEFAULT current_timestamp,
    etat int NOT NULL DEFAULT 0
);

CREATE TABLE achat_materiel (
    id serial PRIMARY KEY,
    designation TEXT NOT NULL,
    quantite decimal(15,2) DEFAULT 0.0,
    prixunitaire decimal(15,2) DEFAULT 0.0,
    idachat int NOT NULL REFERENCES achat(id),
    etat int NOT NULL DEFAULT 0
);

-- Disponibilite de technicien
CREATE TABLE disponibilite (
    id serial PRIMARY KEY,
    idtechnicien int NOT NULL REFERENCES technicien(id),
    motif TEXT NOT NUll,
    date_debut timestamp DEFAULT current_timestamp,
    date_fin timestamp DEFAULT current_timestamp,
    etat int NOT NULL DEFAULT 0
);

-- Type entretien
CREATE TABLE type_entretien (
    id serial PRIMARY KEY,
    type_entretien text NOT NULL,
    etat int NOT NULL DEFAULT 0
);

-- Entretien
CREATE TABLE entretien (
    id serial PRIMARY KEY,
    idtype_entretien int NOT NULL REFERENCES type_entretien(id),
    idmateriel int NOT NULL REFERENCES materiel(id),
    entretien TEXT NOT NULL,
    etat int NOT NULL DEFAULT 0
);

-- Intervention par rapport a la tache
CREATE TABLE intervention (
    id serial PRIMARY KEY,
    idtache int NOT NULL REFERENCES tache(id),
    etat int NOT NULL DEFAULT 0
);

CREATE TABLE intervention_details (
    id serial PRIMARY KEY,
    idintervention int NOT NULL REFERENCES intervention(id),
    etat int NOT NULL DEFAULT 0
);

-- Historique recherche
CREATE TABLE historique (
    id serial PRIMARY KEY,
    mot_cle TEXT NOT NULL,
    historique TEXT,
    date_historique timestamp DEFAULT current_timestamp,
    etat int NOT NULL DEFAULT 0
);

-- Reponse en tant que suggestion
CREATE TABLE question (
    id serial PRIMARY KEY NOT NULL,
    question TEXT NOT NULL,
    reponse TEXT NOT NULL,
    etat int NOT NULL DEFAULT 0
);





-- Select 
-- Admin
SELECT * FROM admin;

-- Technicien
SELECT * FROM technicien;

-- Utilisateur
SELECT * FROM type_utilisateur;
SELECT * FROM utilisateur;

-- Salle
SELECT * FROM salle;

-- Materiels
SELECT * FROM materiel;

-- Plainte
SELECT * FROM plainte;

-- Plainte Individuelle
SELECT * FROM plainte_individuel;

-- Plainte Salle
SELECT * FROM plainte_salle;

-- Fichier Plainte
SELECT * FROM fichier_pl;

-- Video Plainte
SELECT * FROM video_pl;

-- Conversation
SELECT * FROM conversation;

-- Fichier Conversation
SELECT * FROM fichier_con;

-- Video Conversation
SELECT * FROM video_con;

-- Archivage
SELECT * FROM archivage;

-- Tache
SELECT * FROM tache;

-- Tache Technicien
SELECT * FROM tache_tech;

-- Tache Achevée
SELECT * FROM tache_acheve;

-- Tache Prioritaires
SELECT * FROM tache_prioritaires;

-- Achat
SELECT * FROM achat;

-- Achat Materiel
SELECT * FROM achat_materiel;

-- Disponibilite de Technicien
SELECT * FROM disponibilite;

-- Type Entretien
SELECT * FROM type_entretien;

-- Entretien
SELECT * FROM entretien;

-- Intervention
SELECT * FROM intervention;

-- Intervention Détails
SELECT * FROM intervention_details;

-- Historique Recherche
SELECT * FROM historique;

-- Questions
SELECT * FROM question;




