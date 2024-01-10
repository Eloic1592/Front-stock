export function filterdepot(listedepot,nomdepot) {
  return listedepot.filter((Item) => {
    return Item.depot.toLowerCase().includes(nomdepot.toLowerCase());
  });
}