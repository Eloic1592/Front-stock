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


-- View tache
Drop view v_tache;
Create or replace view v_tache as 
select t.id as idtache, e.entretien,te.prenom,p.description,t.etat from tache t join entretien e on t.identretien=e.id join technicien te on te.id=t.idtechnicien join plainte p on p.id=t.idplainte;

-- View intervention
Drop view v_intervention;
Create or replace view v_intervention as 
select i.id as idinter,i.date_int,i.entretien as intervention,e.entretien,t.designation from intervention i join tache t on i.idtache=t.id join entretien e on i.identretien=e.id;


-- Vue

Tache,
Intervention,
tache_acheve,
tache_prioritaires
