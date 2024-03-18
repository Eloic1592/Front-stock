import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  // Vérifie si l'utilisateur est authentifié
  const isAuthenticated = sessionStorage.getItem('refuser') !== null;

  return isAuthenticated ? element : <Navigate to="/admin/connexion" replace />;
};
export default ProtectedRoute;
