import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// 💡 MATERI PROTECTED ROUTE (Slide Hal 21): Satpam Akses Halaman
export default function ProtectedRoute({ children, allowedRole }) {
  const { user } = useContext(AuthContext);

  // Jika user belum login sama sekali, tendang balik ke halaman login utama
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Jika user maksa masuk ke halaman yang bukan hak rolenya (misal mahasiswa mau masuk ke /admin)
  if (allowedRole && user.role !== allowedRole) {
    // Jika dia admin kesasar ke form user, buang ke /admin. Jika user kesasar ke admin, buang ke /keluhan.
    return <Navigate to={user.role === "admin" ? "/admin" : "/keluhan"} replace />;
  }

  // Jika lolos pemeriksaan, izinkan masuk ke halaman komponen anak
  return children;
}