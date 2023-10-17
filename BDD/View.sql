-- Vue entretien
drop  view v_entretien;
Create or replace view v_entretien as 
select e.id,te.type_entretien,e.entretien,m.materiel,e.etat from entretien e 
join type_entretien te on te.id=e.idtype_entretien 
join materiel m on m.id=e.idmateriel;

-- 
