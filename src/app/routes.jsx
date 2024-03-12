import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
// import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));

// Admin
const LoginAdmin = Loadable(lazy(() => import('app/views/admin/Login/LoginAdmin')));

const Dashboard = Loadable(lazy(() => import('app/views/admin/dashboard/Dashboard')));

const Bilan = Loadable(lazy(() => import('app/views/admin/dashboard/Bilan')));

const Article = Loadable(lazy(() => import('app/views/admin/article/Article')));

const Editarticle = Loadable(lazy(() => import('app/views/admin/article/Editarticle')));

const Stockarticle = Loadable(lazy(() => import('app/views/admin/article/Stockarticle')));

const TypeMouvement = Loadable(
  lazy(() => import('app/views/admin/naturemouvement/Naturemouvement'))
);
const Stattypemouvement = Loadable(
  lazy(() => import('app/views/admin/dashboard/Statnaturemouvement'))
);

const TypeMateriel = Loadable(lazy(() => import('app/views/admin/typemateriel/Typemateriel')));

const Categoriemateriel = Loadable(
  lazy(() => import('app/views/admin/categoriemateriel/Categoriemateriel'))
);

const Stockphysique = Loadable(
  lazy(() => import('app/views/admin/mouvementstock/physique/Stockphysique'))
);

const Detailfictif = Loadable(
  lazy(() => import('app/views/admin/mouvementstock/fictif/detail/Detailfictif'))
);

const Stockfictif = Loadable(
  lazy(() => import('app/views/admin/mouvementstock/fictif/Stockfictif'))
);

const Materiel = Loadable(lazy(() => import('app/views/admin/materiel/Materiel')));

const StockMateriel = Loadable(lazy(() => import('app/views/admin/materiel/Stockmateriel')));

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

const StockDepot = Loadable(lazy(() => import('app/views/admin/depot/Stockdepot')));

const Utilistionmateriel = Loadable(lazy(() => import('app/views/admin/depot/Stockmaterieldepot')));

const StocktypematerielDepot = Loadable(
  lazy(() => import('app/views/admin/depot/Stocktypematerieldepot'))
);

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
      {
        path: '/charts/echarts',
        element: <AppEchart />
      },
      {
        path: '/admin/dashboard',
        element: <Dashboard />
      },

      {
        path: '/admin/bilan',
        element: <Bilan />
      },
      {
        path: '/admin/article',
        element: <Article />
      },
      {
        path: '/admin/stocksarticle',
        element: <Stockarticle />
      },
      {
        path: '/admin/editarticle/:idarticle',
        element: <Editarticle />
      },
      {
        path: '/admin/typemouvement',
        element: <TypeMouvement />
      },

      {
        path: '/admin/typemateriel',
        element: <TypeMateriel />
      },

      {
        path: '/admin/stattypemouvement',
        element: <Stattypemouvement />
      },

      {
        path: '/admin/categoriemateriel',
        element: <Categoriemateriel />
      },

      {
        path: '/admin/mouvementphysique',
        element: <Stockphysique />
      },

      {
        path: '/admin/mouvementfictif',
        element: <Stockfictif />
      },
      {
        path: '/admin/detailfictif/:idmouvementstock',
        element: <Detailfictif />
      },
      {
        path: '/admin/listemateriel',
        element: <Materiel />
      },
      {
        path: '/admin/stockmateriel',
        element: <StockMateriel />
      },

      {
        path: '/admin/facture',
        element: <Facture />
      },

      {
        path: '/admin/devis',
        element: <Devis />
      },

      {
        path: '/admin/detaildevis/:iddevis',
        element: <Detaildevis />
      },

      {
        path: '/admin/proforma',
        element: <Proforma />
      },

      {
        path: '/admin/detailproforma/:iddevis',
        element: <Detailproforma />
      },

      {
        path: '/admin/commande',
        element: <Commande />
      },
      {
        path: '/admin/detailcommande/:idproforma',
        element: <DetailCommande />
      },

      {
        path: '/admin/livraison',
        element: <Livraison />
      },

      {
        path: '/admin/detaillivraison/:idproforma',
        element: <Detaillivraison />
      },
      {
        path: '/admin/depot',
        element: <Depot />
      },
      {
        path: '/admin/stockdepot',
        element: <StockDepot />
      },

      {
        path: '/admin/utilisationmateriel',
        element: <Utilistionmateriel />
      },
      {
        path: '/admin/stocktypemateriel/:iddepot',
        element: <StocktypematerielDepot />
      },

      {
        path: '/admin/archives',
        element: <Archives />
      },

      {
        path: '/admin/historique',
        element: <Historique />
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },

  // Admin
  { path: '/admin/connexion', element: <LoginAdmin /> },
  { path: '/admin/dashboard', element: <Dashboard /> },
  { path: '/admin/bilan', element: <Bilan /> },
  { path: '/admin/article', element: <Article /> },
  { path: '/admin/stocksarticle', element: <Stockarticle /> },
  { path: '/admin/editarticle/:idarticle', element: <Editarticle /> },
  { path: '/admin/listemateriel', element: <Materiel /> },
  { path: '/admin/stockmateriel', element: <StockMateriel /> },
  { path: '/admin/stattypemouvement', element: <Stattypemouvement /> },
  { path: '/admin/typemouvement', element: <TypeMouvement /> },
  { path: '/admin/typemateriel', element: <TypeMateriel /> },
  { path: '/admin/categoriemateriel', element: <Categoriemateriel /> },
  { path: '/admin/mouvementphysique', element: <Stockphysique /> },
  { path: '/admin/mouvementfictif', element: <Stockfictif /> },
  { path: '/admin/detailfictif/:idmouvementstock', element: <Detailfictif /> },
  { path: '/admin/facture', element: <Facture /> },
  { path: '/admin/devis', element: <Devis /> },
  { path: '/admin/detaildevis/:iddevis', element: <Detaildevis /> },
  { path: '/admin/proforma', element: <Proforma /> },
  { path: '/admin/detailproforma/:iddevis', element: <Detailproforma /> },
  { path: '/admin/detailcommande/:idproforma', element: <DetailCommande /> },
  { path: '/admin/detaillivraison/:idproforma', element: <Detaillivraison /> },
  { path: '/admin/depot', element: <Depot /> },
  { path: '/admin/stockdepot', element: <StockDepot /> },
  { path: '/admin/utilisationmateriel', element: <Utilistionmateriel /> },
  { path: '/admin/stocktypemateriel', element: <StocktypematerielDepot /> },
  { path: '/admin/archives', element: <Archives /> },
  { path: '/admin/historique', element: <Historique /> },

  { path: '/', element: <Navigate to="/admin/connexion" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
