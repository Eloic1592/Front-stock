export function filtrecommande(listecommande,nomdepot) {
    return listedepot.filter((Item) => {
      return Item.depot.toLowerCase().includes(nomdepot.toLowerCase());
    });
  }