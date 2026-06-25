import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // [TAMBAHAN]: Fungsi khusus untuk memproses login pertama kali
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const updateUser = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    // Hanya hapus data yang relevan, jangan gunakan .clear()
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Gagal parse data user:", e);
      }
    }
    setLoading(false);
  }, []);

  return (
    // [UPDATE KECIL]: Menambahkan fungsi "login" ke dalam value agar bisa dipakai di halaman Login.jsx
    <AuthContext.Provider value={{ user, setUser, login, updateUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};