export function filtrestockfictif(listestockfictif,materiel,mouvement,depot,date) {
    return listestockfictif.filter((Item) => {
        return Item.date.toLowerCase().includes(date.toLowerCase())
        &&Item.materiel.toLowerCase().includes(materiel.toLowerCase())
        &&Item.mouvement.toLowerCase().includes(mouvement.toLowerCase())
        &&Item.depot.toLowerCase().includes(depot.toLowerCase());
    });
  }


  export function filtrestockphysique(listestockphysique,article,mouvement,depot,date) {
    return listestockphysique.filter((Item) => {
        return Item.date.toLowerCase().includes(date.toLowerCase())
        &&Item.article.toLowerCase().includes(article.toLowerCase())
        &&Item.mouvement.toLowerCase().includes(mouvement.toLowerCase())
        &&Item.depot.toLowerCase().includes(depot.toLowerCase());
    });
  }
