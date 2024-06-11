import { differenceInSeconds } from 'date-fns';
import moment from 'moment';

export const convertHexToRGB = (hex) => {
  // check if it's a rgba
  if (hex.match('rgba')) {
    let triplet = hex.slice(5).split(',').slice(0, -1).join(',');
    return triplet;
  }

  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');

    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
  }
};

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export function isMobile() {
  if (window) return window.matchMedia(`(max-width: 767px)`).matches;

  return false;
}

export function isMdScreen() {
  if (window) return window.matchMedia(`(max-width: 1199px)`).matches;

  return false;
}

function currentYPosition(elm) {
  if (!window && !elm) {
    return;
  }
  if (elm) return elm.scrollTop;
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement, elmID) {
  var elm = document.getElementById(elmID);

  if (!elmID || !elm) {
    return;
  }

  var startY = currentYPosition(scrollableElement);
  var stopY = elmYPosition(elm);

  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function (leapY) {
          return () => {
            scrollableElement.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function (leapY) {
        return () => {
          scrollableElement.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

export function getTimeDifference(date) {
  let difference = differenceInSeconds(new Date(), date);

  if (difference < 60) return `${Math.floor(difference)} sec`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} min`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} h`;
  else if (difference < 86400 * 30) return `${Math.floor(difference / 86400)} d`;
  else if (difference < 86400 * 30 * 12) return `${Math.floor(difference / 86400 / 30)} mon`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} y`;
}

// Traduction francais mois
// const Traductionfrancais = {
//   today: "Aujourd'hui",
//   previous: 'Précédent',
//   next: 'Suivant',
//   month: 'Mois',
//   week: 'Semaine',
//   day: 'Jour',
//   agenda: 'Agenda',
//   date: 'Date',
//   time: 'Heure',
//   event: 'Événement',
//   allDay: 'Toute la journée',
//   noEventsInRange: 'Aucun événement à afficher',
//   monthNames: [
//     'Janvier',
//     'Février',
//     'Mars',
//     'Avril',
//     'Mai',
//     'Juin',
//     'Juillet',
//     'Août',
//     'Septembre',
//     'Octobre',
//     'Novembre',
//     'Décembre'
//   ],
//   dayNames: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
//   weekNumbers: ['1', '2', '3', '4', '5', '6', '7']
// };

// Traduction jour de la semaine
// const frenchdayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

// Formattage de date en jour/mois/annee
export function convertdate(date) {
  return moment(date).locale('fr').format('DD MMMM YYYY HH:mm');
}

export function converttodate(timestamp) {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('fr-FR', options);
  return formattedDate;
}

export function convertmillistodate(milliseconds) {
  const date = new Date(milliseconds);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month indexes start from 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// export function converttodate(timestamp) {
//   const date = new Date(timestamp);
//   const today = new Date();
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };

//   if (date.toDateString() === today.toDateString()) {
//     return "aujourd'hui";
//   } else {
//     const formattedDate = date.toLocaleDateString('fr-FR', options);
//     return formattedDate;
//   }
// }

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function formatNumber(nombre) {
  nombre = nombre.toString();
  let partieEntiere = nombre.split('.')[0];
  let partieDecimale = nombre.split('.')[1];
  partieEntiere = partieEntiere.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (partieDecimale) {
    return partieEntiere + '.' + partieDecimale;
  } else {
    return partieEntiere;
  }
}
export function coloredNumber(nombre) {
  let style = {};

  if (nombre <= 0) {
    style = { color: 'red' };
  } else if (nombre > 0) {
    style = { color: 'green' };
  }
  return <span style={style}>{formatNumber(nombre)}</span>;
}

export function colorType(mouvement) {
  if (mouvement === 'SORTIE') {
    return <span style={{ color: 'red' }}>{mouvement}</span>;
  }
  return <span style={{ color: 'green' }}>{mouvement}</span>;
}

// Transformation d'un nombre en  lettre
export function nombreEnLettres(nombre) {
  const unites = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  const dixAvingt = [
    'dix',
    'onze',
    'douze',
    'treize',
    'quatorze',
    'quinze',
    'seize',
    'dix-sept',
    'dix-huit',
    'dix-neuf'
  ];
  const dizaines = [
    '',
    '',
    'vingt',
    'trente',
    'quarante',
    'cinquante',
    'soixante',
    'soixante-',
    'quatre-vingt',
    'quatre-vingt-'
  ];

  function enLettres(n) {
    let resultat = '';
    if (n >= 100) {
      resultat += unites[Math.floor(n / 100)] + ' cent ';
      n %= 100;
    }
    if (n >= 20) {
      resultat += dizaines[Math.floor(n / 10)];
      if (n % 10 !== 0) {
        resultat += '-' + unites[n % 10];
      }
    } else if (n >= 10) {
      resultat += dixAvingt[n - 10];
    } else {
      resultat += unites[n];
    }
    return resultat.trim();
  }

  if (nombre === 0) return 'zéro';

  let resultatFinal = '';
  const milliards = Math.floor(nombre / 1000000000);
  const millions = Math.floor((nombre % 1000000000) / 1000000);
  const milliers = Math.floor((nombre % 1000000) / 1000);
  const restants = nombre % 1000;

  if (milliards > 0) {
    resultatFinal += enLettres(milliards) + ' milliard ';
  }
  if (millions > 0) {
    resultatFinal += enLettres(millions) + ' million ';
  }
  if (milliers > 0) {
    resultatFinal += enLettres(milliers) + ' mille ';
  }
  if (restants > 0) {
    resultatFinal += enLettres(restants);
  }

  return resultatFinal.trim();
}

export const colors = [
  'Rouge',
  'Vert',
  'Bleu',
  'Jaune',
  'Cyan',
  'Magenta',
  'Orange',
  'Violet',
  'Rose',
  'Citron vert',
  'Turquoise',
  'Aqua',
  'Marron',
  'Marine',
  'Olive',
  'Argent',
  'Gris',
  'Noir',
  'Blanc',
  'Brun',
  'Bronze',
  'Beige',
  'Saumon',
  'Indigo',
  'Violet'
];

export const signatures = ['Perso', 'ITU'];

// Mois
export const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre'
];

export const messages = {
  date: 'Date',
  time: 'Heure',
  event: 'Événement',
  allDay: 'Toute la journée',
  week: 'Semaine',
  work_week: 'Semaine de travail',
  day: 'Jour',
  month: 'Mois',
  previous: 'Précédent',
  next: 'Suivant',
  yesterday: 'Hier',
  tomorrow: 'Demain',
  today: "Aujourd'hui",
  agenda: 'Agenda',
  noEventsInRange: 'Aucun événement dans cette période.',
  showMore: (total) => `+ ${total} plus`
};

export const formatTimestamp = (timestamp) => {
  // Create a new Date object using milliseconds
  const date = new Date(timestamp);

  // Obtenez les composants de la date
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0
  const year = date.getFullYear();
  let hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  // Soustraire trois heures
  hours = (parseInt(hours) - 3).toString().padStart(2, '0');
  // Return the formatted timestamp
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formattodatetimelocal = (timestamp) => {
  return moment(timestamp).subtract(3, 'hours').format('YYYY-MM-DDTHH:mm');
};

export const formattimetolocaltime = (timestamp) => {
  const moment = require('moment-timezone');
  const fuseauHoraire = 'Indian/Antananarivo';
  const heureFormatee = moment.tz(timestamp, fuseauHoraire).format('HH:mm:ss');
  return heureFormatee;
};
