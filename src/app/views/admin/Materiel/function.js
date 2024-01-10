export function filtremateriel(listemateriel,numserie,modele,couleur,typemateriel) {
    return listemateriel.filter((Item) => {
      return Item.numserie.toLowerCase().includes(numserie.toLowerCase())
      &&Item.couleur.toLowerCase().includes(modele.toLowerCase())
      &&Item.modele.toLowerCase().includes(couleur.toLowerCase())
      &&Item.idtypemateriel.toLowerCase().includes(typemateriel.toLowerCase());
        });
  }