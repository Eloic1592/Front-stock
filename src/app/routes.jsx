import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));
const JwtLoginTech = Loadable(lazy(() => import('app/views/sessions/JwtLoginTech')));

// Admin
const LoginAdmin  = Loadable(lazy(() => import('app/views/admin/LoginAdmin')));

const Dashboard  = Loadable(lazy(() => import('app/views/admin/Dashboard')));

const Bilan  = Loadable(lazy(() => import('app/views/admin/Bilan')));

const TypeMouvement  = Loadable(lazy(() => import('app/views/admin/Naturemouvement')));

const TypeMateriel  = Loadable(lazy(() => import('app/views/admin/Typemateriel')));

const Categoriemateriel  = Loadable(lazy(() => import('app/views/admin/Categoriemateriel')));

const Stockphysique  = Loadable(lazy(() => import('app/views/admin/Stockphysique')));

const Stockfictif  = Loadable(lazy(() => import('app/views/admin/Stockfictif')));

const Materiel  = Loadable(lazy(() => import('app/views/admin/Listemateriel')));

const EntreeSortie  = Loadable(lazy(() => import('app/views/admin/EntreeSortie')));

const Facture  = Loadable(lazy(() => import('app/views/admin/Facture')));

const Proforma  = Loadable(lazy(() => import('app/views/admin/Proforma')));

const Devis  = Loadable(lazy(() => import('app/views/admin/Devis')));

const Commande  = Loadable(lazy(() => import('app/views/admin/Commande')));

const Depot  = Loadable(lazy(() => import('app/views/admin/Depot')));

const Archives  = Loadable(lazy(() => import('app/views/admin/Archives')));

const Historique  = Loadable(lazy(() => import('app/views/admin/Historique')));

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
        path: '/admin/mouvementfictif',
        element: <Stockfictif />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/listemateriel',
        element: <Materiel />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/entreesortie',
        element: <EntreeSortie />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/facture',
        element: <Facture />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/proforma',
        element: <Proforma />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/devis',
        element: <Devis />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/commande',
        element: <Commande />,
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
      },
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/session/signin-tech', element: < JwtLoginTech/> },


  // Admin
  { path: '/admin/connexion', element: < LoginAdmin/> },
  { path: '/admin/dashboard', element: < Dashboard/> },
  { path: '/admin/bilan', element: < Bilan/> },
  { path: '/admin/typemouvement', element: < TypeMouvement/> },
  { path: '/admin/typemateriel', element: < TypeMateriel/> },
  { path: '/admin/categoriemateriel', element: < Categoriemateriel/> },
  { path: '/admin/mouvementphysique', element: < Stockphysique/> },
  { path: '/admin/mouvementfictif', element: < Stockfictif/> },
  { path: '/admin/listemateriel', element: < Materiel/> },
  { path: '/admin/entreesortie', element: < EntreeSortie/> },
  { path: '/admin/facture', element: < Facture/> },
  { path: '/admin/devis', element: < Devis/> },
  { path: '/admin/proforma', element: < Proforma/> },
  { path: '/admin/commande', element: < Commande/> },
  { path: '/admin/depot', element: < Depot/> },
  { path: '/admin/archives', element: < Archives/> },
  { path: '/admin/historique', element: < Historique/> },

  { path: '/', element: <Navigate to="/admin/dashboard" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
