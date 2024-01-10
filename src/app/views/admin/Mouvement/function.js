export function filtrenaturemouvement(listenaturemouvement,naturemouvement) {
    return listenaturemouvement.filter((Item) => {
      return Item.naturemouvement.toLowerCase().includes(naturemouvement.toLowerCase());
    });
  }