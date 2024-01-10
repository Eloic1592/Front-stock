export function filtredevis(listedevis,date,client) {
    return listedevis.filter((Item) => {
      return Item.date.toLowerCase().includes(date.toLowerCase())
      &&Item.client.toLowerCase().includes(client.toLowerCase());
        });
  }