import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { ProtectedRoute } from './components/routes/ProtectedRoute'; // Import Satpam
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardMahasiswa from './pages/DashboardMahasiswa';
import Register from './pages/Register';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

        {/* Rute Terproteksi (Dibungkus Satpam/ProtectedRoute) */}
        <Route 
          path="/dashboard-admin/*" 
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard-mahasiswa/*" 
          element={
            <ProtectedRoute>
              <DashboardMahasiswa />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect Utama */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard-mahasiswa" /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;