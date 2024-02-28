export const navigations = [
  {
    name: 'Administrateur',
    icon: 'arrows-right',
    children: [
      { name: 'Tableau de bord', iconText: 'SI', path: '/admin/dashboard' },
      { name: 'Bilan general', iconText: 'SI', path: '/admin/bilan' },
      { name: 'Rotation de stock', iconText: 'SI', path: '/admin/rotationstock' },
      {
        name: 'Mouvement de stock',
        iconText: 'arrows-right',
        children: [
          { name: 'Type de mouvement', iconText: 'SI', path: '/admin/typemouvement' },
          { name: 'Mouvement physique', iconText: 'SI', path: '/admin/mouvementphysique' },
          { name: 'Mouvement fictif', iconText: 'SI', path: '/admin/mouvementfictif' }
        ]
      },
      {
        name: 'Demande',
        iconText: 'arrows-right',
        children: [
          { name: 'Factures', iconText: 'SI', path: '/admin/facture' },
          { name: 'Devis', iconText: 'SI', path: '/admin/devis' },
          {
            name: 'Proforma',
            iconText: 'arrows-right',
            children: [
              { name: 'Tous les proformas', iconText: 'SI', path: '/admin/proforma' },
              { name: 'Archives des stocks', iconText: 'SI', path: '/admin/archives' }
            ]
          },
          { name: 'Commande', iconText: 'SI', path: '/admin/commande' },
          { name: 'Livraison', iconText: 'SI', path: '/admin/livraison' }
        ]
      },
      {
        name: 'Articles et materiels',
        iconText: 'arrows-right',
        children: [
          {
            name: 'Articles',
            iconText: 'arrows-right',
            children: [
              { name: 'Liste des articles', iconText: 'SI', path: '/admin/article' },
              { name: 'Stock des articles', iconText: 'SI', path: '/admin/stocksarticle' }
            ]
          },
          {
            name: 'Materiels',
            iconText: 'arrows-right',
            children: [
              { name: 'Liste des materiels', iconText: 'SI', path: '/admin/listemateriel' },
              { name: 'Stock des materiels', iconText: 'SI', path: '/admin/stockmateriel' }
            ]
          },
          { name: 'Type de materiel', iconText: 'SI', path: '/admin/typemateriel' },
          { name: 'Categorie de materiel ', iconText: 'SI', path: '/admin/categoriemateriel' }
        ]
      },

      {
        name: 'Depot',
        iconText: 'arrows-right',
        children: [
          { name: 'Liste des depots', iconText: 'SI', path: '/admin/depot' },
          { name: 'Stock des depots', iconText: 'SI', path: '/admin/stockdepot' }
        ]
      }
    ]
  },

  {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
      { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
      { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
      { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
      { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
      { name: 'Form', path: '/material/form', iconText: 'F' },
      { name: 'Icons', path: '/material/icons', iconText: 'I' },
      { name: 'Menu', path: '/material/menu', iconText: 'M' },
      { name: 'Progress', path: '/material/progress', iconText: 'P' },
      { name: 'Radio', path: '/material/radio', iconText: 'R' },
      { name: 'Switch', path: '/material/switch', iconText: 'S' },
      { name: 'Slider', path: '/material/slider', iconText: 'S' },
      { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' }
      // { name: 'Table', path: '/material/table', iconText: 'T' }
    ]
  },
  {
    name: 'Charts',
    icon: 'trending_up',
    children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }]
  }
];
