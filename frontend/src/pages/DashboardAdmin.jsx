import React from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Users, FileText, Settings, Megaphone, LogOut, User } from "lucide-react";

// --- IMPORT DARI FOLDER ADMIN ---
import DashboardMain from "./admin/DashboardMain";
import KelolaKeluhan from "./admin/KelolaKeluhan"; 
import { KelolaPengguna, KategoriKeluhan } from "./admin/ManajemenData";
import { Pengumuman, Pengaturan } from "./admin/KomunikasiKontrol";
import { ProfilAdmin } from "./admin/ProfilAdmin"; 

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menu = [
    { name: "Dashboard", icon: <LayoutDashboard size={20}/>, path: "/dashboard-admin" },
    { name: "Kelola Keluhan", icon: <ClipboardList size={20}/>, path: "/dashboard-admin/kelola-keluhan" },
    { name: "Kelola Pengguna", icon: <Users size={20}/>, path: "/dashboard-admin/kelola-pengguna" },
    { name: "Kategori", icon: <FileText size={20}/>, path: "/dashboard-admin/kategori" },
    { name: "Pengumuman", icon: <Megaphone size={20}/>, path: "/dashboard-admin/pengumuman" },
    { name: "Pengaturan", icon: <Settings size={20}/>, path: "/dashboard-admin/pengaturan" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-[#001f54] text-white p-6 shadow-xl flex flex-col">
        <div className="flex items-center gap-2 mb-10 text-xl font-bold">
          <FileText className="text-blue-400" /> AspiraLink Admin
        </div>
        
        <nav className="space-y-2 flex-1">
          {menu.map((item) => (
            <button 
              key={item.name} 
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition ${
                location.pathname === item.path ? "bg-blue-600" : "hover:bg-blue-900/50"
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>

        {/* --- BAGIAN BAWAH SIDEBAR (PROFIL & LOGOUT) --- */}
        <div className="mt-8 border-t border-blue-800/50 pt-4 space-y-2">
          <button 
            onClick={() => navigate("/dashboard-admin/profil")} 
            className={`flex items-center gap-3 w-full p-3 rounded-xl transition ${
              location.pathname === "/dashboard-admin/profil" ? "bg-blue-600" : "hover:bg-blue-900/50"
            }`}
          >
            <User size={20}/> Profil Saya
          </button>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-600 transition"
          >
            <LogOut size={20}/> Keluar
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* RUTE PENTING: Gunakan path relatif tanpa garis miring di depan */}
          <Routes>
            <Route path="/" element={<DashboardMain />} />
            <Route path="kelola-keluhan" element={<KelolaKeluhan />} />
            <Route path="kelola-pengguna" element={<KelolaPengguna />} />
            <Route path="kategori" element={<KategoriKeluhan />} />
            <Route path="pengumuman" element={<Pengumuman />} />
            <Route path="pengaturan" element={<Pengaturan />} />
            <Route path="profil" element={<ProfilAdmin />} /> {/* <-- RUTE PROFIL BARU */}
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;