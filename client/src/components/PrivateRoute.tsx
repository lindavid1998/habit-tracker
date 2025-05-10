import React, { useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../context/AuthContext';

export default function PrivateRoute() {
  // ProtectedRoute uses auth context to check if user should be redirected
  const auth = useContext<AuthContextType | null>(AuthContext);
  const navigate = useNavigate();

  if (!auth || auth.loading) {
    return <div>Loading...</div>; // TODO: replace with spinner
  }

  if (!auth.user) {
    navigate('/');
    return null;
  }

  return <Outlet />;
}
