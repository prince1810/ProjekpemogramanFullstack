// src/components/routes/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Memuat...</div>;

  // INI BAGIAN PENTING:
  // Jika user sudah null (setelah logout), Satpam harus langsung mengusir!
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};