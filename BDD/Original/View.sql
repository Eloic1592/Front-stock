-- Vue entretien
drop  view v_entretien;
Create or replace view v_entretien as
select e.id,te.type_entretien,e.entretien,m.materiel,e.etat from entretien e 
join type_entretien te on te.id=e.idtype_entretien 
join materiel m on m.id=e.idmateriel;

-- View disponibilite
Drop view v_dispo;
Create or replace view v_dispo as 
select d.*,t.nom,t.prenom from disponibilite d join technicien t on t.id=d.idtechnicien;


-- Vue plainte individuel et salle
Drop view v_plainte_ind;
Create or replace view v_plainte_ind as
SELECT pi.idplainte,concat(u.nom,' ',prenom) as nom,pi.idutilisateur,tu.type_utilisateur,m.materiel,pi.description,p.date_depot,pi.etat FROM plainte_individuel pi 
JOIN utilisateur u on pi.idutilisateur=u.id 
join type_utilisateur tu on u.idtype_utilisateur=tu.id
join materiel m on m.id=pi.idmateriel
join plainte p on p.id=pi.idplainte;

Drop view v_plainte_salle;
Create or replace view v_plainte_salle as
SELECT pi.idplainte,pi.idsalle,concat(u.salle) as salle,m.materiel,pi.description,p.date_depot,pi.etat FROM plainte_salle pi 
JOIN salle u on pi.idsalle=u.id 
join materiel m on m.id=pi.idmateriel
join plainte p on p.id=pi.idplainte;


Tache,
Intervention,
tache_acheve,
tache_prioritaires
