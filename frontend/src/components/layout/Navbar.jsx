// src/components/layout/Navbar.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
            {/* Kiri: Bisa diisi judul halaman atau kosong */}
            <div className="text-gray-600 font-medium">
                Selamat Datang di AspiraLink
            </div>

            {/* Kanan: Profil User */}
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">
                        {user?.nama || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                        {user?.role || "Mahasiswa"}
                    </p>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {/* Inisial Nama */}
                    {user?.nama?.charAt(0).toUpperCase() || "U"}
                </div>
            </div>
        </div>
    );
};

export default Navbar;