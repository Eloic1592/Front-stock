import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import ProtectedRoute from './views/ProtectedRoute';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));

const LoginAdmin = Loadable(lazy(() => import('app/views/admin/Login/LoginAdmin')));

const Dashboard = Loadable(lazy(() => import('app/views/admin/dashboard/Dashboard')));

const Bilan = Loadable(lazy(() => import('app/views/admin/dashboard/Bilan')));

const Article = Loadable(lazy(() => import('app/views/admin/article/Article')));

const Editarticle = Loadable(lazy(() => import('app/views/admin/article/Editarticle')));

const Stockarticle = Loadable(lazy(() => import('app/views/admin/article/Stockarticle')));

const TypeMouvement = Loadable(
  lazy(() => import('app/views/admin/naturemouvement/Naturemouvement'))
);
const Editnaturemouvement = Loadable(
  lazy(() => import('app/views/admin/naturemouvement/Editnaturemouvement'))
);

const Stattypemouvement = Loadable(
  lazy(() => import('app/views/admin/dashboard/Statnaturemouvement'))
);

const TypeMateriel = Loadable(lazy(() => import('app/views/admin/typemateriel/Typemateriel')));

const EditTypemateriel = Loadable(
  lazy(() => import('app/views/admin/typemateriel/Edittypemateriel'))
);

const Categoriemateriel = Loadable(
  lazy(() => import('app/views/admin/categoriemateriel/Categoriemateriel'))
);

const Editcategoriemateriel = Loadable(
  lazy(() => import('app/views/admin/categoriemateriel/Editcategoriemateriel'))
);

const Stockphysique = Loadable(
  lazy(() => import('app/views/admin/mouvementstock/physique/Stockphysique'))
);
const Editmouvementphysique = Loadable(
  lazy(() => import('app/views/admin/mouvementstock/physique/Editmouvementphysique'))
);

const Detailfictif = Loadable(
  lazy(() => import('app/views/admin/mouvementstock/fictif/detail/Detailfictif'))
);

const Stockfictif = Loadable(
  lazy(() => import('app/views/admin/mouvementstock/fictif/Stockfictif'))
);

const Editmouvementfictif = Loadable(
  lazy(() => import('app/views/admin/mouvementstock/fictif/Editmouvementfictif'))
);

const Editdetailmouvementfictif = Loadable(
  lazy(() => import('app/views/admin/mouvementstock/fictif/detail/Editdetailmouvementfictif'))
);

const Materiel = Loadable(lazy(() => import('app/views/admin/materiel/Materiel')));

const Editmateriel = Loadable(lazy(() => import('app/views/admin/materiel/Editmateriel')));

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

const Editdepot = Loadable(lazy(() => import('app/views/admin/depot/Editdepot')));

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
        element: <ProtectedRoute element={<AppEchart />} />
      },
      {
        path: '/admin/dashboard',
        element: <ProtectedRoute element={<Dashboard />} />
      },

      {
        path: '/admin/bilan',
        element: <ProtectedRoute element={<Bilan />} />
      },
      {
        path: '/admin/article',
        element: <ProtectedRoute element={<Article />} />
      },
      {
        path: '/admin/stocksarticle',
        element: <ProtectedRoute element={<Stockarticle />} />
      },
      {
        path: '/admin/editarticle/:idarticle',
        element: <ProtectedRoute element={<Editarticle />} />
      },
      {
        path: '/admin/typemouvement',
        element: <ProtectedRoute element={<TypeMouvement />} />
      },
      {
        path: '/admin/editnaturemouvement/:idnaturemouvement',
        element: <ProtectedRoute element={<Editnaturemouvement />} />
      },

      {
        path: '/admin/typemateriel',
        element: <ProtectedRoute element={<TypeMateriel />} />
      },

      {
        path: '/admin/edittypemateriel/:idtypemateriel',
        element: <ProtectedRoute element={<EditTypemateriel />} />
      },

      {
        path: '/admin/stattypemouvement',
        element: <ProtectedRoute element={<Stattypemouvement />} />
      },

      {
        path: '/admin/categoriemateriel',
        element: <ProtectedRoute element={<Categoriemateriel />} />
      },
      {
        path: '/admin/editcategoriemateriel/:idcategoriemateriel',
        element: <ProtectedRoute element={<Editcategoriemateriel />} />
      },

      {
        path: '/admin/mouvementphysique',
        element: <ProtectedRoute element={<Stockphysique />} />
      },
      {
        path: '/admin/editmouvementphysique/:iddetailmouvementphysique',
        element: <ProtectedRoute element={<Editmouvementphysique />} />
      },
      {
        path: '/admin/mouvementfictif',
        element: <ProtectedRoute element={<Stockfictif />} />
      },
      {
        path: '/admin/detailfictif/:idmouvementstock',
        element: <ProtectedRoute element={<Detailfictif />} />
      },
      {
        path: '/admin/editmouvementfictif/:idmouvementstock',
        element: <ProtectedRoute element={<Editmouvementfictif />} />
      },
      {
        path: '/admin/editdetailmouvementfictif/:iddetailmouvementfictif',
        element: <ProtectedRoute element={<Editdetailmouvementfictif />} />
      },
      {
        path: '/admin/listemateriel',
        element: <ProtectedRoute element={<Materiel />} />
      },
      {
        path: '/admin/stockmateriel',
        element: <ProtectedRoute element={<StockMateriel />} />
      },
      {
        path: '/admin/editmateriel/:idmateriel',
        element: <ProtectedRoute element={<Editmateriel />} />
      },

      {
        path: '/admin/facture',
        element: <ProtectedRoute element={<Facture />} />
      },

      {
        path: '/admin/devis',
        element: <ProtectedRoute element={<Devis />} />
      },

      {
        path: '/admin/detaildevis/:iddevis',
        element: <ProtectedRoute element={<Detaildevis />} />
      },

      {
        path: '/admin/proforma',
        element: <ProtectedRoute element={<Proforma />} />
      },

      {
        path: '/admin/detailproforma/:iddevis',
        element: <ProtectedRoute element={<Detailproforma />} />
      },

      {
        path: '/admin/commande',
        element: <ProtectedRoute element={<Commande />} />
      },

      {
        path: '/admin/detailcommande/:idproforma',
        element: <ProtectedRoute element={<DetailCommande />} />
      },

      {
        path: '/admin/livraison',
        element: <ProtectedRoute element={<Livraison />} />
      },

      {
        path: '/admin/detaillivraison/:idproforma',
        element: <ProtectedRoute element={<Detaillivraison />} />
      },

      {
        path: '/admin/depot',
        element: <ProtectedRoute element={<Depot />} />
      },

      {
        path: '/admin/editdepot/:iddepot',
        element: <ProtectedRoute element={<Editdepot />} />
      },

      {
        path: '/admin/stockdepot',
        element: <ProtectedRoute element={<StockDepot />} />
      },

      {
        path: '/admin/utilisationmateriel',
        element: <ProtectedRoute element={<Utilistionmateriel />} />
      },

      {
        path: '/admin/stocktypemateriel/:iddepot',
        element: <ProtectedRoute element={<StocktypematerielDepot />} />
      },

      {
        path: '/admin/archives',
        element: <ProtectedRoute element={<Archives />} />
      },

      {
        path: '/admin/historique',
        element: <ProtectedRoute element={<Historique />} />
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
  { path: '/admin/editmateriel/:idmateriel', element: <Editmateriel /> },
  { path: '/admin/stattypemouvement', element: <Stattypemouvement /> },
  { path: '/admin/typemouvement', element: <TypeMouvement /> },
  { path: '/admin/typemateriel', element: <TypeMateriel /> },
  { path: '/admin/categoriemateriel', element: <Categoriemateriel /> },
  { path: '/admin/editcategoriemateriel/:idcategoriemateriel', element: <Editcategoriemateriel /> },
  { path: '/admin/mouvementphysique', element: <Stockphysique /> },
  {
    path: '/admin/editmouvementphysique/:iddetailmouvementphysique',
    element: <Editmouvementphysique />
  },
  {
    path: '/admin/editmouvementfictif/:idmouvementstock',
    element: <Editmouvementfictif />
  },
  {
    path: '/admin/editdetailmouvementfictif/:iddetailmouvementfictif',
    element: <Editdetailmouvementfictif />
  },
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
  { path: '/admin/editdepot:iddepot', element: <Editdepot /> },
  { path: '/admin/stockdepot', element: <StockDepot /> },
  { path: '/admin/utilisationmateriel', element: <Utilistionmateriel /> },
  { path: '/admin/stocktypemateriel', element: <StocktypematerielDepot /> },
  { path: '/admin/archives', element: <Archives /> },
  { path: '/admin/historique', element: <Historique /> },

  { path: '/', element: <Navigate to="/admin/connexion" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
