import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
// import Listedetailcommande from './views/admin/Bon/commande/Listedetailcommande';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));
const JwtLoginTech = Loadable(lazy(() => import('app/views/sessions/JwtLoginTech')));

// Admin
const LoginAdmin = Loadable(lazy(() => import('app/views/admin/Login/LoginAdmin')));

const Dashboard = Loadable(lazy(() => import('app/views/admin/dashboard/Dashboard')));

const Bilan = Loadable(lazy(() => import('app/views/admin/dashboard/Bilan')));

const Article = Loadable(lazy(() => import('app/views/admin/article/Article')));

const Stockarticle = Loadable(lazy(() => import('app/views/admin/article/Stockarticle')));

const TypeMouvement = Loadable(
  lazy(() => import('app/views/admin/naturemouvement/Naturemouvement'))
);

const TypeMateriel = Loadable(lazy(() => import('app/views/admin/typemateriel/Typemateriel')));

const Categoriemateriel = Loadable(
  lazy(() => import('app/views/admin/categoriemateriel/Categoriemateriel'))
);

const Stockphysique = Loadable(
  lazy(() => import('app/views/admin/mouvementstock/physique/Stockphysique'))
);

const Detailphysique = Loadable(
  lazy(() => import('app/views/admin/mouvementstock/physique/Detailphysique'))
);

const Detailfictif = Loadable(
  lazy(() => import('app/views/admin/mouvementstock/fictif/detail/Detailfictif'))
);

const Stockfictif = Loadable(
  lazy(() => import('app/views/admin/mouvementstock/fictif/Stockfictif'))
);

const Materiel = Loadable(lazy(() => import('app/views/admin/materiel/Materiel')));

const Facture = Loadable(lazy(() => import('app/views/admin/facture/Facture')));

const Devis = Loadable(lazy(() => import('app/views/admin/demande/devis/Devis')));

const Detaildevis = Loadable(lazy(() => import('app/views/admin/demande/devis/Detaildevis')));

const Proforma = Loadable(lazy(() => import('app/views/admin/demande/proforma/Proforma')));

const Detailproforma = Loadable(
  lazy(() => import('app/views/admin/demande/proforma/Detailproforma'))
);

const Commande = Loadable(lazy(() => import('app/views/admin/Bon/commande/Commande')));

const DetailCommande = Loadable(
  lazy(() => import('app/views/admin/Bon/commande/detail/Listedetailcommande'))
);

const Livraison = Loadable(lazy(() => import('app/views/admin/Bon/livraison/Livraison')));

const Detaillivraison = Loadable(
  lazy(() => import('app/views/admin/Bon/livraison/Detaillivraison'))
);

const Depot = Loadable(lazy(() => import('app/views/admin/depot/Depot')));

const Archives = Loadable(lazy(() => import('app/views/admin/archives/Archives')));

const Historique = Loadable(lazy(() => import('app/views/admin/archives/Historique')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// admin page
// const Analytics = Loadable(lazy(() => import('app/views/user/Analytics')));
// Acceuil user

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // admin route

      // // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      },
      {
        path: '/admin/dashboard',
        element: <Dashboard />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/bilan',
        element: <Bilan />,
        auth: authRoles.admindefault
      },
      {
        path: '/admin/article',
        element: <Article />,
        auth: authRoles.admindefault
      },
      {
        path: '/admin/stocksarticle',
        element: <Stockarticle />,
        auth: authRoles.admindefault
      },
      {
        path: '/admin/typemouvement',
        element: <TypeMouvement />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/typemateriel',
        element: <TypeMateriel />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/categoriemateriel',
        element: <Categoriemateriel />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/mouvementphysique',
        element: <Stockphysique />,
        auth: authRoles.admindefault
      },
      {
        path: '/admin/detailphysique/:idmouvementstock',
        element: <Detailphysique />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/mouvementfictif',
        element: <Stockfictif />,
        auth: authRoles.admindefault
      },
      {
        path: '/admin/detailfictif/:idmouvementstock',
        element: <Detailfictif />,
        auth: authRoles.admindefault
      },
      {
        path: '/admin/listemateriel',
        element: <Materiel />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/facture',
        element: <Facture />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/devis',
        element: <Devis />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/detaildevis/:iddevis',
        element: <Detaildevis />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/proforma',
        element: <Proforma />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/detailproforma/:iddevis',
        element: <Detailproforma />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/commande',
        element: <Commande />,
        auth: authRoles.admindefault
      },
      {
        path: '/admin/detailcommande/:idproforma',
        element: <DetailCommande />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/livraison',
        element: <Livraison />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/detaillivraison/:idproforma',
        element: <Detaillivraison />,
        auth: authRoles.admindefault
      },
      {
        path: '/admin/depot',
        element: <Depot />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/archives',
        element: <Archives />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/historique',
        element: <Historique />,
        auth: authRoles.admindefault
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/session/signin-tech', element: <JwtLoginTech /> },

  // Admin
  { path: '/admin/connexion', element: <LoginAdmin /> },
  { path: '/admin/dashboard', element: <Dashboard /> },
  { path: '/admin/bilan', element: <Bilan /> },
  { path: '/admin/article', element: <Article /> },
  { path: '/admin/stocksarticle', element: <Stockarticle /> },
  { path: '/admin/typemouvement', element: <TypeMouvement /> },
  { path: '/admin/typemateriel', element: <TypeMateriel /> },
  { path: '/admin/categoriemateriel', element: <Categoriemateriel /> },
  { path: '/admin/mouvementphysique', element: <Stockphysique /> },
  { path: '/admin/detailphysique/:idmouvementstock', element: <Detailphysique /> },
  { path: '/admin/mouvementfictif', element: <Stockfictif /> },
  { path: '/admin/detailfictif/:idmouvementstock', element: <Detailfictif /> },
  { path: '/admin/listemateriel', element: <Materiel /> },
  { path: '/admin/facture', element: <Facture /> },
  { path: '/admin/devis', element: <Devis /> },
  { path: '/admin/detaildevis/:iddevis', element: <Detaildevis /> },
  { path: '/admin/proforma', element: <Proforma /> },
  { path: '/admin/detailproforma/:iddevis', element: <Detailproforma /> },
  { path: '/admin/detailcommande/:idproforma', element: <DetailCommande /> },
  { path: '/admin/detaillivraison/:idproforma', element: <Detaillivraison /> },
  { path: '/admin/depot', element: <Depot /> },
  { path: '/admin/archives', element: <Archives /> },
  { path: '/admin/historique', element: <Historique /> },

  { path: '/', element: <Navigate to="/admin/dashboard" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
