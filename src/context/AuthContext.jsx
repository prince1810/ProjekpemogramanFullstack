import { createContext, useState, useEffect } from "react";

// 💡 MATERI GLOBAL STATE (Slide Hal 12-14): Membuat Context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Mencegah data user hilang saat halaman di-refresh (UX Good Practice)
  useEffect(() => {
    const savedUser = localStorage.getItem("simkel_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const loginGlobal = (userData) => {
    setUser(userData);
    localStorage.setItem("simkel_user", JSON.stringify(userData));
  };

  const logoutGlobal = () => {
    setUser(null);
    localStorage.removeItem("simkel_user");
  };

  return (
    <AuthContext.Provider value={{ user, loginGlobal, logoutGlobal }}>
      {children}
    </AuthContext.Provider>
  );
}