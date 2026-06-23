import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import FormKeluhan from "./components/FormKeluhan";
import DashboardAdmin from "./components/DashboardAdmin";
// 💡 IMPLEMENTASI SPRINT 13: Import Satpam ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Halaman Publik (Siapa saja bisa akses) */}
        <Route path="/" element={<LoginForm tipe="user" />} />
        <Route path="/login-admin" element={<LoginForm tipe="admin" />} />
        <Route path="/register" element={<RegisterForm />} />
        
        {/* 💡 PROTECTED ROUTES (Slide Hal 26): Dijaga ketat oleh komponen satpam */}
        <Route 
          path="/keluhan" 
          element={
            <ProtectedRoute allowedRole="user">
              <FormKeluhan />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Layout>
  );
}

export default App;