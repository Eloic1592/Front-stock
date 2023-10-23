export const navigations = [


  


  {
    name: 'Administrateur',
    icon: 'arrows-right',
    children: [
      { name: 'Connexion', iconText: 'SI', path: '/admin/connexion' },
      { name: 'Listes des entretiens', iconText: 'SI', path: '/dashboard/listeentretien' },
      { name: 'Listes des materiel', iconText: 'SI', path: '/dashboard/listemateriel' },
      { name: 'Listes des type d\'entretien', iconText: 'SI', path: '/dashboard/listetypeentretien' },
      { name: 'Listes des techniciens', iconText: 'SI', path: '/dashboard/listetechnicien' },
      { name: 'Calendrier des techniciens', iconText: 'SI', path: '/admin/calendriertech' },
    ]
  },

  {
    name:'Technicien',
    icon: 'arrows-right',
    children: [
      { name: 'Connexion Technicien', iconText: 'SI', path: '/tech/connexion' },
      { name: 'Calendrier', iconText: 'SI', path: '/tech/calendrier' },
      { name: 'Listes des taches', iconText: 'SI', path: '/tech/listetaches' },


    ]
  },

  {
    name:'Utilisateur',
    icon: 'arrows-right',
    children: [
    { name: 'Connexion Utilisateur', iconText: 'SI', path: '/user/connexion' },  
    { name: 'Accueil', iconText: 'SI',path: '/user/accueil' },
    { name: 'Enregistrement', iconText: 'SI',path: '/session/signup' },
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
