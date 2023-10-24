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

const Calendriertech  = Loadable(lazy(() => import('app/views/admin/Calendriertech')));

const Listetacheadmin = Loadable(lazy(() => import('app/views/admin/Listetache')));

const ListetacheAdmin = Loadable(lazy(() => import('app/views/admin/Listetache')));

const Listeentretien = Loadable(lazy(() => import('app/views/admin/Listeentretien')));

const Listemateriel = Loadable(lazy(() => import('app/views/admin/Listemateriel')));

const ListeTypeEntretien = Loadable(lazy(() => import('app/views/admin/ListeTypeEntretien')));

const ListeTechnicien = Loadable(lazy(() => import('app/views/admin/ListeTechnicien')));

const Listedispo  = Loadable(lazy(() => import('app/views/admin/Listedispo')));

// Utilisateur
const LoginUser  = Loadable(lazy(() => import('app/views/user/LoginUser')));

const Register  = Loadable(lazy(() => import('app/views/user/Register')));

const Accueiluser = Loadable(lazy(() => import('app/views/user/Accueil')));


//Technicien
const LoginTech  = Loadable(lazy(() => import('app/views/tech/Logintech')));

const Calendrier  = Loadable(lazy(() => import('app/views/tech/Calendrier')));

const Listetache = Loadable(lazy(() => import('app/views/tech/Listetache')));


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
      // listeentretien route
      {
        path: '/admin/listeentretien',
        element: <Listeentretien />,
        auth: authRoles.admindefault
      },
      {
        path: '/admin/listemateriel',
        element: <Listemateriel />,
        auth: authRoles.admindefault
      },
      {
        path: '/admin/listetypeentretien',
        element: <ListeTypeEntretien />,
        auth: authRoles.admindefault
      },
      {
        path: '/admin/listetechnicien',
        element: <ListeTechnicien />,
        auth: authRoles.admindefault
      },
      {
        path: '/tech/listetaches',
        element: <Listetache />,
        auth: authRoles.admindefault
      },
      {
        path: '/admin/listedispo',
        element: <Listedispo />,
        auth: authRoles.admindefault
      },

      {
        path: '/user/accueil',
        element: <Accueiluser />,
        auth: authRoles.admindefault
      },


      {
        path: '/tech/calendrier',
        element: <Calendrier />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/calendriertech',
        element: <Calendriertech />,
        auth: authRoles.admindefault
      },

      {
        path: '/admin/listetache',
        element: <Listetacheadmin />,
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
  { path: '/admin/calendriertech', element: < Calendriertech/> },
  { path: '/admin/tacheadmin', element: < Listetacheadmin/> },
  { path: '/admin/listeentretien', element: < Listeentretien/> },
  { path: '/admin/listemateriel', element: < Listemateriel/> },
  { path: '/admin/listetypeentretien', element: < ListeTypeEntretien/> },
  { path: '/admin/listetechnicien', element: < ListeTechnicien/> },
  { path: '/admin/listedispo', element: < Listedispo/> },
  { path: '/admin/listetache', element: < ListetacheAdmin/> },

  // Utilisateur
  { path: '/user/connexion', element: < LoginUser/> },

  { path: '/user/register', element: < Register/> },


  // Technicien
  { path: '/tech/connexion', element: < LoginTech/> },

  { path: '/tech/calendrier', element: < Calendrier/> },

  { path: '/tech/listetaches', element: < Listetache/> },


  { path: '/', element: <Navigate to="tech/calendrier" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
