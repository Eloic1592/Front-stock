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



-- A faire cette apres-midi
select * from technicien;

select * from suggestion;

select * from historique;

select * from type_entretien;

-- Vue
Tache,Intervention,tache_acheve,tache_prioritaires
