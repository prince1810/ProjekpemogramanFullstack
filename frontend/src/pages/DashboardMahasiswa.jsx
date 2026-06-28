import React, { useContext } from "react"; 
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, ClipboardList, Bell, User, Book, LogOut, ChevronDown } from "lucide-react";
import { ProfilMahasiswa } from "./user/ProfilMahasiswa";
import { BuatKeluhan } from "./user/BuatKeluhan";
import { DashboardMain } from "./user/DashboardMain";
import { AuthContext } from "../context/AuthContext";
import TentangKami from "./user/TentangKami";
import { KeluhanSaya } from "./user/KeluhanSaya";

const Placeholder = ({ title }) => <h2 className="text-2xl font-bold text-gray-700">Halaman {title}</h2>;

const DashboardMahasiswa_2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);

  const menu = [
    { name: "Dashboard", icon: <LayoutDashboard size={20}/>, path: "/dashboard-mahasiswa" },
    { name: "Buat Keluhan", icon: <PlusCircle size={20}/>, path: "/dashboard-mahasiswa/buat-keluhan" },
    { name: "Keluhan Saya", icon: <ClipboardList size={20}/>, path: "/dashboard-mahasiswa/keluhan-saya" },
    { name: "Notifikasi", icon: <Bell size={20}/>, path: "/dashboard-mahasiswa/notifikasi" },
    { name: "Profil Saya", icon: <User size={20}/>, path: "/dashboard-mahasiswa/profil" },
    { name: "Tentang Kami", icon: <Book size={20}/>, path: "/dashboard-mahasiswa/tentang-kami" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-[#001f54] text-white p-6 flex flex-col">
        <h1 className="font-bold text-xl mb-10">Menu</h1>
        <nav className="space-y-2 flex-1">
          {menu.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-blue-600 font-bold shadow-md"
                  : "hover:bg-blue-800"
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>
        <div className="mt-10 border-t border-blue-800 pt-4">
          <button
            onClick={() => { logout(); window.location.href = "/login"; }}
            className="flex items-center gap-3 w-full p-3 hover:bg-red-600 rounded-lg transition"
          >
            <LogOut size={20}/> Keluar
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <div className="flex items-center justify-between px-8 py-3 bg-white border-b border-gray-100 shadow-sm">
          {/* Logo Pindah ke Kiri Sejajar */}
          <div className="flex items-center gap-100.">
            <img src="/Logo-aspiralink.png" alt="Logo" className="w-20 h-20 object-contain" />
            <span className="font-black text-lg text-[#001f54]">AspiraLink</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard-mahasiswa/notifikasi")}
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            <button
              onClick={() => navigate("/dashboard-mahasiswa/profil")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition"
            >
              {user?.avatar ? (
                <img
                  src={
                    user.avatar.startsWith("data:image") || user.avatar.startsWith("http")
                      ? user.avatar
                      : `http://localhost:3000/${user.avatar}`
                  }
                  className="w-7 h-7 rounded-full object-cover"
                  alt="avatar"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {user?.nama?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-800 leading-tight">
                  {user?.nama || "Mahasiswa"}
                </p>
                <p className="text-[10px] text-gray-400 leading-tight">Mahasiswa</p>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
          </div>
        </div>

      <main className="flex-1 p-8 bg-white shadow-inner m-4 rounded-2xl overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardMain />} />
          <Route path="buat-keluhan" element={<BuatKeluhan />} />
          <Route path="keluhan-saya" element={<KeluhanSaya />} />
          <Route path="notifikasi" element={<Placeholder title="Notifikasi" />} />
          <Route path="profil" element={<ProfilMahasiswa />} />
          <Route path="tentang-kami" element={<TentangKami />} />
        </Routes>
      </main>
      </div>
    </div>
  );
};

export default DashboardMahasiswa_2;