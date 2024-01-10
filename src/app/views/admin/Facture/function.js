export function filtrefacture(listefacture,telephone,numstat,client,date) {
    return listefacture.filter((Item) => {
      return Item.telephone.toLowerCase().includes(telephone.toLowerCase())
      &&Item.numstat.toLowerCase().includes(numstat.toLowerCase())
      &&Item.client.toLowerCase().includes(client.toLowerCase())
      &&Item.date.toLowerCase().includes(date.toLowerCase());
    });
  }