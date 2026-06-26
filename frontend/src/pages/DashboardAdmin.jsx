import React, { useContext } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Users, FileText, Settings, Megaphone, LogOut, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import DashboardMain from "./admin/DashboardMain";
import KelolaKeluhan from "./admin/KelolaKeluhan"; 
import { KelolaPengguna, KategoriKeluhan } from "./admin/ManajemenData";
import { Pengumuman, Pengaturan } from "./admin/KomunikasiKontrol";
import { ProfilAdmin } from "./admin/ProfilAdmin"; 

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext); 

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
        <div className="text-lg font-bold mb-10">Menu Admin</div>
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
            onClick={() => { logout(); window.location.href = "/login"; }} 
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-600 transition"
          >
            <LogOut size={20}/> Keluar
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <div className="bg-white px-8 py-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-100.">
             <img src="/Logo-aspiralink.png" alt="Logo" className="w-20 h-20 object-contain" />
             <span className="font-black text-xl text-[#001f54]">AspiraLink</span>
          </div>
        </div>

        <div className="p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<DashboardMain />} />
              <Route path="kelola-keluhan" element={<KelolaKeluhan />} />
              <Route path="kelola-pengguna" element={<KelolaPengguna />} />
              <Route path="kategori" element={<KategoriKeluhan />} />
              <Route path="pengumuman" element={<Pengumuman />} />
              <Route path="pengaturan" element={<Pengaturan />} />
              <Route path="profil" element={<ProfilAdmin />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;