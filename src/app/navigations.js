export const navigations = [

  {
    name: 'Administrateur',
    icon: 'arrows-right',
    children: [
      { name: 'Tableau de bord', iconText: 'SI', path: '/admin/dashboard' },
      { name: 'Bilan general', iconText: 'SI', path: '/admin/bilan' },
      { name: 'Mouvement de stock', iconText: 'SI', path: '/admin/stock' },
      { name: 'Materiels', iconText: 'SI', path: '/admin/listemateriel' },
      { name: 'Achat et vente', iconText: 'SI', path: '/admin/entreesortie' },
      { name: 'Factures', iconText: 'SI', path: '/admin/facture' },
      { name: 'Proforma', iconText: 'SI', path: '/admin/proforma' },
      { name: 'Devis', iconText: 'SI', path: '/admin/devis' },
      { name: 'Depot', iconText: 'SI', path: '/admin/depot' },
      { name: 'Bon de commande', iconText: 'SI', path: '/admin/commande' },
      { name: 'Historique', iconText: 'SI', path: '/admin/historique' },

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
      { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
      // { name: 'Table', path: '/material/table', iconText: 'T' }
    ]
  },
  {
    name: 'Charts',
    icon: 'trending_up',
    children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }]
  },

];
