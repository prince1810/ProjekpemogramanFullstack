// src/components/layout/Sidebar.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  // src/components/layout/Sidebar.jsx

  const handleLogout = (e) => {
    e.preventDefault();

    // 1. Hapus data auth
    logout();

    // 2. Beri sedikit jeda agar context sempat ter-update
    setTimeout(() => {
      // Coba redirect dulu
      window.location.href = '/login';

      // 3. NUCLEAR OPTION: Kalau masih stuck, reload paksa browser
      // Ini akan membuang semua state yang nyangkut di memori
      window.location.reload();
    }, 100);
  };

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      {/* Header Sidebar */}
      <div className="p-6 text-xl font-bold border-b border-slate-700">
        AspiraLink
      </div>

      {/* Menu Navigasi */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/dashboard"
          className={`block p-2 rounded ${location.pathname === '/dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800 transition'}`}
        >
          Dashboard
        </Link>
        {/* Tambahkan link lainnya di sini */}
      </nav>

      {/* Tombol Keluar */}
      <div className="p-4 border-t border-slate-700">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 transition duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;