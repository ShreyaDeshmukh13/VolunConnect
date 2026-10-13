import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();
  const location = useLocation();
  if (!ready) return <div className="container py-5 text-center">Checking session...</div>;
  return user ? children : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}
