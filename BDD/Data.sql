-- Table  materiel
Insert into materiel(materiel) values('ordinateur'),('imprimante'),('serveur'),('stockage'),('reseau');

-- Table type entretien
INSERT INTO type_entretien(type_entretien) values('preventif'),('curatif'),('evolutif');

-- Table entretien
Insert into entretien(idtype_entretien,idmateriel,entretien) 
values(1,1,'Nettoyage et Depoussierage'),
values(1,1,'Verification des connexions et cablages'),
values(1,1,'Mise a jour  du micrologiciel et logiciel'),
values(1,1,'Test de performance'),

values(2,1,'Remplacement des pieces'),
values(2,1,'Reparation materiel'),
values(2,1,'Remise en service du materiel');

values(3,1,'Mise a niveau du materiel'),
values(3,1,'Mise a jour  du logiciel'),
values(3,1,'Installation de logiciel'),
values(3,1,'Installation OS');


Insert into entretien(idtype_entretien,idmateriel,entretien,etat) 
values(1,2,'Nettoyage et Depoussierage'),
values(1,2,'Remplacement cartouche encre ou toner'),

values(2,2,'Reparation imprimante');

Insert into entretien(idtype_entretien,idmateriel,entretien,etat) 
values(1,3,'Nettoyage et Depoussierage'),
values(1,3,'Verification des connexion et cablages'),
values(1,3,'Mise a jour  logiciels et micrologiciel'),
values(1,3,'Test de performance');

values(2,3,'Remplacement des pieces'),
values(2,3,'Reparation du serveur'),
values(2,3,'Remise en service du serveur');

values(3,3,'Mise a niveau du serveur'),
values(3,3,'Mise a jour  du logiciel'),
values(3,3,'Installation de nouveau logiciels');


Insert into entretien(idtype_entretien,idmateriel,entretien,etat) 
values(1,4,'Nettoyage et Depoussierage'),
values(1,4,'Verification connexions et cablages'),


values(2,4,'Remplacement des pieces'),
values(2,4,'Reparation et stockage');



Insert into entretien(idtype_entretien,idmateriel,entretien,etat) 
values(1,5,'Nettoyage et Depoussierage'),
values(1,5,'Verification des connexions et des cablages'),
values(1,5,'Mise a jour  du micrologiciel et du logiciel'),

values(2,5,'Reparation du reseau');