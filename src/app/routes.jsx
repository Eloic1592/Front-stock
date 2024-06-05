import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import ProtectedRoute from './views/ProtectedRoute';
import Decharge from './views/admin/mouvementstock/fictif/Decharge';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));

const LoginAdmin = Loadable(lazy(() => import('app/views/admin/Login/LoginAdmin')));

const Dashboard = Loadable(lazy(() => import('app/views/admin/dashboard/Dashboard')));

const Bilan = Loadable(lazy(() => import('app/views/admin/dashboard/Bilan')));

const Article = Loadable(lazy(() => import('app/views/admin/article/Article')));

const Detailsarticle = Loadable(lazy(() => import('app/views/admin/article/Detailstockarticle')));

const Editarticle = Loadable(lazy(() => import('app/views/admin/article/Editarticle')));

const Stockarticle = Loadable(lazy(() => import('app/views/admin/article/Stockarticle')));

const TypeMouvement = Loadable(
  lazy(() => import('app/views/admin/naturemouvement/Naturemouvement'))
);
const Editnaturemouvement = Loadable(
  lazy(() => import('app/views/admin/naturemouvement/Editnaturemouvement'))
);
const Cyclenaturemouvement = Loadable(
  lazy(() => import('app/views/admin/naturemouvement/Cyclenaturemouvement'))
);

const Rupturearticle = Loadable(lazy(() => import('app/views/admin/article/Rupturearticle')));

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

const Commande = Loadable(lazy(() => import('app/views/admin/demande/commande/Commande')));

const Statcommande = Loadable(lazy(() => import('app/views/admin/demande/commande/Statcommande')));

const Editcommande = Loadable(lazy(() => import('app/views/admin/demande/commande/Editcommande')));

const Detailcommande = Loadable(
  lazy(() => import('app/views/admin/demande/commande/Detailcommande'))
);

const Editdetailcommande = Loadable(
  lazy(() => import('app/views/admin/demande/commande/Editdetailcommande'))
);

const Validercommande = Loadable(
  lazy(() => import('app/views/admin/demande/commande/Validationcommande'))
);

const Reception = Loadable(lazy(() => import('app/views/admin/demande/reception/Reception')));

const Editreception = Loadable(
  lazy(() => import('app/views/admin/demande/reception/Editreception'))
);

const Distribution = Loadable(
  lazy(() => import('app/views/admin/demande/distribution/Distribution'))
);

const Editdistribution = Loadable(
  lazy(() => import('app/views/admin/demande/distribution/Editdistribution'))
);
const Stockage = Loadable(lazy(() => import('app/views/admin/demande/stockage/Stockage')));

const Editstockage = Loadable(lazy(() => import('app/views/admin/demande/stockage/Editstockage')));

const Inventaire = Loadable(lazy(() => import('app/views/admin/demande/inventaire/Inventaire')));

const Editinventaire = Loadable(
  lazy(() => import('app/views/admin/demande/inventaire/Editinventaire'))
);

const Depot = Loadable(lazy(() => import('app/views/admin/depot/Depot')));

const Editdepot = Loadable(lazy(() => import('app/views/admin/depot/Editdepot')));

const Emplacement = Loadable(lazy(() => import('app/views/admin/emplacement/Emplacement')));

const Editemplacement = Loadable(lazy(() => import('app/views/admin/emplacement/Editemplacement')));

const Stockarticledepot = Loadable(lazy(() => import('app/views/admin/depot/Stockarticledepot')));

const Utilistionmateriel = Loadable(lazy(() => import('app/views/admin/depot/Stockmaterieldepot')));

const StocktypematerielDepot = Loadable(
  lazy(() => import('app/views/admin/depot/Stocktypematerieldepot'))
);

const Archives = Loadable(lazy(() => import('app/views/admin/archives/Archives')));

const Historique = Loadable(lazy(() => import('app/views/admin/archives/Historique')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

const Etatstock = Loadable(lazy(() => import('app/views/admin/dashboard/Etatstock')));

const Detailetatstock = Loadable(lazy(() => import('app/views/admin/dashboard/Detailetatstock')));

const Aide = Loadable(lazy(() => import('app/views/admin/aide/Aide')));

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
        path: '/admin/detailsarticle/:idarticle',
        element: <ProtectedRoute element={<Detailsarticle />} />
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
        path: '/admin/cyclenaturemouvement/',
        element: <ProtectedRoute element={<Cyclenaturemouvement />} />
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
        path: '/admin/rupturearticle',
        element: <ProtectedRoute element={<Rupturearticle />} />
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
        path: '/admin/commande',
        element: <ProtectedRoute element={<Commande />} />
      },

      {
        path: '/admin/statcommande',
        element: <ProtectedRoute component={<Statcommande />} />
      },
      {
        path: '/admin/editcommande/:idcommande',
        element: <ProtectedRoute element={<Editcommande />} />
      },

      {
        path: '/admin/detailcommande/:idcommande',
        element: <ProtectedRoute element={<Detailcommande />} />
      },
      {
        path: '/admin/editdetailcommande/:iddetailcommande',
        element: <ProtectedRoute element={<Editdetailcommande />} />
      },
      {
        path: '/admin/validercommande/:idcommande',
        element: <ProtectedRoute element={<Validercommande />} />
      },
      {
        path: '/admin/reception',
        element: <ProtectedRoute element={<Reception />} />
      },
      {
        path: '/admin/editreception/:idreception',
        element: <ProtectedRoute element={<Editreception />} />
      },
      {
        path: '/admin/stockage',
        element: <ProtectedRoute element={<Stockage />} />
      },
      {
        path: '/admin/editstockage/:idstockage',
        element: <ProtectedRoute element={<Editstockage />} />
      },
      {
        path: '/admin/distribution',
        element: <ProtectedRoute element={<Distribution />} />
      },
      {
        path: '/admin/editdistribution/:iddistribution',
        element: <ProtectedRoute element={<Editdistribution />} />
      },
      {
        path: '/admin/inventaire',
        element: <ProtectedRoute element={<Inventaire />} />
      },
      {
        path: '/admin/editinventaire/:idinventaire',
        element: <ProtectedRoute element={<Editinventaire />} />
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
        path: '/admin/emplacement/:iddepot',
        element: <ProtectedRoute element={<Emplacement />} />
      },

      {
        path: '/admin/editemplacement/:idemplacement/:iddepot',
        element: <ProtectedRoute element={<Editemplacement />} />
      },

      {
        path: '/admin/stockdepot',
        element: <ProtectedRoute element={<Stockarticledepot />} />
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
      },

      {
        path: '/admin/decharge/:idmouvementstock',
        element: <ProtectedRoute element={<Decharge />} />
      },
      {
        path: '/admin/etatstock',
        element: <ProtectedRoute element={<Etatstock />} />
      },
      {
        path: '/admin/detailetatstock/:annee/:mois',
        element: <ProtectedRoute element={<Detailetatstock />} />
      },
      {
        path: '/admin/aide',
        element: <ProtectedRoute element={<Aide />} />
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
  { path: '/admin/detailsarticle/:idarticle', element: <Detailsarticle /> },
  { path: '/admin/stocksarticle', element: <Stockarticle /> },
  { path: '/admin/editarticle/:idarticle', element: <Editarticle /> },
  { path: '/admin/listemateriel', element: <Materiel /> },
  { path: '/admin/stockmateriel', element: <StockMateriel /> },
  { path: '/admin/editmateriel/:idmateriel', element: <Editmateriel /> },
  { path: '/admin/typemouvement', element: <TypeMouvement /> },
  { path: '/admin/cyclemouvement', element: <Cyclenaturemouvement /> },
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
  { path: '/admin/commande', element: <Commande /> },
  { path: '/admin/editcommande/:idcommande', element: <Editcommande /> },
  { path: '/admin/detailcommande/:idcommande', element: <Detailcommande /> },
  { path: '/admin/editdetailcommande/:iddetailcommande', element: <Editdetailcommande /> },
  { path: '/admin/validercommande/:idcommande', element: <Validercommande /> },
  { path: '/admin/statcommande/', element: <Statcommande /> },
  { path: '/admin/reception', element: <Reception /> },
  { path: '/admin/editreception/:idreception', element: <Editreception /> },
  { path: '/admin/stockage', element: <Stockage /> },
  { path: '/admin/editstockage/:idstockage', element: <Editstockage /> },
  { path: '/admin/distribution', element: <Distribution /> },
  { path: '/admin/editdistribution/:iddistribution', element: <Editdistribution /> },
  { path: '/admin/depot', element: <Depot /> },
  { path: '/admin/editdepot/:iddepot', element: <Editdepot /> },
  { path: '/admin/emplacement/:iddepot', element: <Emplacement /> },
  { path: '/admin/editemplacement/:idemplacement/:iddepot', element: <Editemplacement /> },
  { path: '/admin/stockdepot', element: <Stockarticledepot /> },
  { path: '/admin/utilisationmateriel', element: <Utilistionmateriel /> },
  { path: '/admin/stocktypemateriel', element: <StocktypematerielDepot /> },
  { path: '/admin/archives', element: <Archives /> },
  { path: '/admin/historique', element: <Historique /> },
  { path: '/admin/decharge/:idmouvementstock', element: <Decharge /> },
  { path: '/admin/etatstock', element: <Etatstock /> },
  {
    path: '/admin/detailetatstock/:annee/:mois',
    element: <Detailetatstock />
  },
  {
    path: '/admin/aide',
    element: <Aide />
  },

  { path: '/', element: <Navigate to="/admin/connexion" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
