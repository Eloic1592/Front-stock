export const navigations = [

  {
    name: 'Administrateur',
    icon: 'arrows-right',
    children: [
      { name: 'Tableau de bord', iconText: 'SI', path: '/admin/dashboard' },
      { name: 'Liste des type d\'entretien', iconText: 'SI', path: '/admin/listetypeentretien' },
      { name: 'Liste des entretiens', iconText: 'SI', path: '/admin/listeentretien' },
      { name: 'Liste des materiel', iconText: 'SI', path: '/admin/listemateriel' },
      { name: 'Liste des techniciens', iconText: 'SI', path: '/admin/listetechnicien' },
      { name: 'Liste des taches', iconText: 'SI', path: '/admin/listetache' },
      { name: 'Liste des plaintes', iconText: 'SI', path: '/admin/listeplainte' },
      { name: 'Calendrier des techniciens', iconText: 'SI', path: '/admin/calendriertech' },
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
