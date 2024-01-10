export function filtercategoriemateriel(listecategoriemateriel,categoriemateriel) {
  return listecategoriemateriel.filter((Item) => {
    return Item.categoriemateriel.toLowerCase().includes(categoriemateriel.toLowerCase());
  });
}