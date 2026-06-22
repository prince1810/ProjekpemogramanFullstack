import React from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, ClipboardList, Bell, User, Book, LogOut, FileText } from "lucide-react";

// --- IMPORT KOMPONEN PROFIL MAHASISWA ---
// Pastikan file ProfilMahasiswa.jsx berada di dalam folder "user"
import { ProfilMahasiswa } from "./user/ProfilMahasiswa"; 

// Komponen placeholder agar halaman tidak kosong saat diklik
const Placeholder = ({ title }) => <h2 className="text-2xl font-bold text-gray-700">Halaman {title}</h2>;

const DashboardMahasiswa = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Digunakan untuk mendeteksi rute yang aktif

  const menu = [
    { name: "Dashboard", icon: <LayoutDashboard size={20}/>, path: "/dashboard-mahasiswa" },
    { name: "Buat Keluhan", icon: <PlusCircle size={20}/>, path: "/dashboard-mahasiswa/buat-keluhan" },
    { name: "Keluhan Saya", icon: <ClipboardList size={20}/>, path: "/dashboard-mahasiswa/keluhan-saya" },
    { name: "Notifikasi", icon: <Bell size={20}/>, path: "/dashboard-mahasiswa/notifikasi" },
    { name: "Profil Saya", icon: <User size={20}/>, path: "/dashboard-mahasiswa/profil" },
    { name: "Panduan", icon: <Book size={20}/>, path: "/dashboard-mahasiswa/panduan" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#001f54] text-white p-6 flex flex-col">
        <h1 className="font-bold text-xl mb-10 flex items-center gap-2"><FileText /> AspiraLink</h1>
        
        <nav className="space-y-2 flex-1">
          {menu.map((item) => (
            <button 
              key={item.name} 
              onClick={() => navigate(item.path)} 
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                location.pathname === item.path ? "bg-blue-600 font-bold shadow-md" : "hover:bg-blue-800"
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>

        {/* Tombol Keluar di Bawah */}
        <div className="mt-10 border-t border-blue-800 pt-4">
          <button 
            onClick={() => {localStorage.clear(); navigate("/login")}} 
            className="flex items-center gap-3 w-full p-3 hover:bg-red-600 rounded-lg transition"
          >
            <LogOut size={20}/> Keluar
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-8 bg-white shadow-inner m-4 rounded-2xl overflow-y-auto">
        <Routes>
          {/* PENTING: Gunakan path relatif (tanpa garis miring / di awal) agar rutenya tidak error */}
          <Route path="/" element={<Placeholder title="Dashboard Utama" />} />
          <Route path="buat-keluhan" element={<Placeholder title="Buat Keluhan" />} />
          <Route path="keluhan-saya" element={<Placeholder title="Keluhan Saya" />} />
          <Route path="notifikasi" element={<Placeholder title="Notifikasi" />} />
          
          {/* INI RUTE PROFIL MAHASISWA YANG SUDAH DISAMBUNGKAN */}
          <Route path="profil" element={<ProfilMahasiswa />} />
          
          <Route path="panduan" element={<Placeholder title="Panduan" />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardMahasiswa;