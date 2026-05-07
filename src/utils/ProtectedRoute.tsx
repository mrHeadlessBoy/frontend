import React from 'react';
import { Navigate } from 'react-router-dom';

// The .tsx extension allows the use of <Navigate />
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Redirect to your specific login path
    return <Navigate to="/thehollowlogin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;