import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardMahasiswa from './pages/DashboardMahasiswa';
<<<<<<< HEAD
import Register from './pages/Register'; // Memanggil komponen Register baru

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Tanda /* agar navigasi sub-menu sidebar di dalam dashboard bekerja */}
        <Route path="/dashboard-admin/*" element={<DashboardAdmin />} />
        <Route path="/dashboard-mahasiswa/*" element={<DashboardMahasiswa />} />
        
        {/* Otomatis mengarahkan ke halaman login jika akses url utama (/) */}
=======

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
>>>>>>> 44162dc820ae0a078eb841ac84789291b68ec012
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;