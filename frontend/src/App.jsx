import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardMahasiswa from './pages/DashboardMahasiswa';

function App() {
  return (
    // Router harus membungkus Routes agar navigasi bekerja
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Tanda /* adalah kunci agar navigasi sidebar di dalam dashboard bekerja */}
        <Route path="/dashboard-admin/*" element={<DashboardAdmin />} />
        <Route path="/dashboard-mahasiswa/*" element={<DashboardMahasiswa />} />
        
        {/* Mengarahkan user ke login jika akses root (/) */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;