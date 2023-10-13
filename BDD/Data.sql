
-- Admin
insert into admin(nom,prenom,email,mdp) values ('admin','admin','admin@gmail.com','admin');


-- Technicien
insert into technicien(nom,prenom,code,email,mdp) values ('TECH-1','TECH-1','TECH-1','tech1@gmail.com','technicien1');
insert into technicien(nom,prenom,code,email,mdp) values ('TECH-2','TECH-2','TECH-2','tech2@gmail.com','technicien2');
insert into technicien(nom,prenom,code,email,mdp) values ('TECH-3','TECH-3','TECH-3','tech3@gmail.com','technicien3');
insert into technicien(nom,prenom,code,email,mdp) values ('TECH-4','TECH-4','TECH-4','tech4@gmail.com','technicien4');

-- Table  materiel
Insert into materiel(materiel) values('ordinateur'),('imprimante'),('serveur'),('stockage'),('reseau');

-- Table type entretien
INSERT INTO type_entretien(type_entretien) values('preventif'),('curatif'),('evolutif');

-- Table entretien
Insert into entretien(idtype_entretien,idmateriel,entretien) 
values(1,1,'Nettoyage et Depoussierage'),
(1,1,'Verification des connexions et cablages'),
(1,1,'Mise a jour  du micrologiciel et logiciel'),
(1,1,'Test de performance'),

(2,1,'Remplacement des pieces'),
(2,1,'Reparation materiel'),
(2,1,'Remise en service du materiel'),

(3,1,'Mise a niveau du materiel'),
(3,1,'Mise a jour  du logiciel'),
(3,1,'Installation de logiciel'),
(3,1,'Installation OS');


Insert into entretien(idtype_entretien,idmateriel,entretien) 
values(1,2,'Nettoyage et Depoussierage'),
(1,2,'Remplacement cartouche encre ou toner'),
(2,2,'Reparation imprimante');

Insert into entretien(idtype_entretien,idmateriel,entretien) 
values(1,3,'Nettoyage et Depoussierage'),
(1,3,'Verification des connexion et cablages'),
(1,3,'Mise a jour  logiciels et micrologiciel'),
(1,3,'Test de performance');

Insert into entretien(idtype_entretien,idmateriel,entretien) 
values(2,3,'Remplacement des pieces'),
(2,3,'Reparation du serveur'),
(2,3,'Remise en service du serveur');

Insert into entretien(idtype_entretien,idmateriel,entretien) 
values(3,3,'Mise a niveau du serveur'),
(3,3,'Mise a jour  du logiciel'),
(3,3,'Installation de nouveau logiciels');


Insert into entretien(idtype_entretien,idmateriel,entretien) 
values(1,4,'Nettoyage et Depoussierage'),
(1,4,'Verification connexions et cablages'),


(2,4,'Remplacement des pieces'),
(2,4,'Reparation et stockage');



Insert into entretien(idtype_entretien,idmateriel,entretien) 
values(1,5,'Nettoyage et Depoussierage'),
(1,5,'Verification des connexions et des cablages'),
(1,5,'Mise a jour  du micrologiciel et du logiciel'),

(2,5,'Reparation du reseau');