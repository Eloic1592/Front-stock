export const navigations = [
  {
    name: 'Statistiques',
    icon: 'trending_up',
    children: [
      { name: 'Tableau de bord', iconText: 'SI', path: '/admin/bilan' },
      { name: 'Rotation de stock', iconText: 'SI', path: '/admin/dashboard' },
      {
        name: 'Bilan des mouvements',
        iconText: 'SI',
        path: '/admin/stattypemouvement'
      }
    ]
  },

  {
    name: 'Mouvement de stock',
    icon: 'receipt',
    children: [
      {
        name: 'Type de mouvement',
        iconText: 'SI',
        path: '/admin/typemouvement',
        children: [{ name: 'Cycle des mouvements', iconText: 'SI', path: '/admin/cyclemouvement' }]
      },
      {
        name: 'Mouvements des articles',
        iconText: 'SI',
        path: '/admin/mouvementphysique'
      },
      { name: 'Mouvements des materiels', iconText: 'SI', path: '/admin/mouvementfictif' }
    ]
  },
  {
    name: 'Commandes',
    icon: 'shopping_cart',
    children: [
      { name: 'Commande', iconText: 'SI', path: '/admin/commande' },
      { name: 'Reception', iconText: 'SI', path: '/admin/reception' },
      { name: 'Stockage', iconText: 'SI', path: '/admin/stockage' },
      { name: 'Distribution', iconText: 'SI', path: '/admin/distribution' },
      { name: 'Inventaire', iconText: 'SI', path: '/admin/inventaire' }
    ]
  },
  {
    name: 'Articles et materiels',
    icon: 'build',
    children: [
      {
        name: 'Articles',
        iconText: 'arrows-right',
        children: [
          { name: 'Liste', iconText: 'SI', path: '/admin/article' },
          { name: 'Stock', iconText: 'SI', path: '/admin/stocksarticle' },
          { name: 'Rupture', iconText: 'SI', path: '/admin/rupturearticle' }
        ]
      },
      {
        name: 'Materiels',
        iconText: 'arrows-right',
        children: [
          { name: 'Liste', iconText: 'SI', path: '/admin/listemateriel' },
          { name: 'Stock', iconText: 'SI', path: '/admin/stockmateriel' }
        ]
      },
      { name: 'Type de materiel', iconText: 'SI', path: '/admin/typemateriel' },
      { name: 'Categorie de materiel ', iconText: 'SI', path: '/admin/categoriemateriel' }
    ]
  },

  {
    name: 'Depot et emplacements',
    icon: 'home',
    children: [
      { name: 'Depots', iconText: 'SI', path: '/admin/depot' },
      { name: 'Stock des articles', iconText: 'SI', path: '/admin/stockdepot' },
      { name: 'Stock des materiels', iconText: 'SI', path: '/admin/utilisationmateriel' }
    ]
  },
  {
    name: 'Aide',
    icon: 'help',
    path: '/admin/aide'
  }

  // {
  //   name: 'Components',
  //   icon: 'favorite',
  //   badge: { value: '30+', color: 'secondary' },
  //   children: [
  //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
  //     { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
  //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
  //     { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
  //     { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
  //     { name: 'Form', path: '/material/form', iconText: 'F' },
  //     { name: 'Icons', path: '/material/icons', iconText: 'I' },
  //     { name: 'Menu', path: '/material/menu', iconText: 'M' },
  //     { name: 'Progress', path: '/material/progress', iconText: 'P' },
  //     { name: 'Radio', path: '/material/radio', iconText: 'R' },
  //     { name: 'Switch', path: '/material/switch', iconText: 'S' },
  //     { name: 'Slider', path: '/material/slider', iconText: 'S' },
  //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' }
  //     // { name: 'Table', path: '/material/table', iconText: 'T' }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }]
  // }
];
