import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardMahasiswa from './pages/DashboardMahasiswa';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID_HERE">
      {/* Router harus membungkus Routes agar navigasi bekerja */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard Admin dilindungi role='admin' */}
          <Route path="/dashboard-admin/*" element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          } />

          {/* Dashboard Mahasiswa dilindungi role='user' */}
          <Route path="/dashboard-mahasiswa/*" element={
            <ProtectedRoute role="user">
              <DashboardMahasiswa />
            </ProtectedRoute>
          } />
          
          {/* Mengarahkan user ke login jika akses root (/) */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;