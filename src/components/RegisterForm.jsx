import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../api"; 

export default function RegisterForm() {
  const [formData, setFormData] = useState({ nama: "", email: "", password: "" });
  // 💡 MATERI PERTEMUAN 12: State Error Validasi
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 💡 MATERI PERTEMUAN 12: Validasi Form Pendaftaran
    if (!formData.nama.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Semua kolom pendaftaran wajib diisi!");
      return;
    }
    if (formData.password.length < 6) {
      setError("Keamanan Password lemah! Minimal harus 6 karakter.");
      return;
    }

    try {
      const response = await api.post("/register", formData);
      if (response.status === 200 || response.status === 201) {
        alert(response.data.message);
        navigate("/"); 
      }
    } catch (error) { 
      setError("Gagal registrasi akun! Kemungkinan email sudah terdaftar."); 
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid var(--border)", borderRadius: "8px" }}>
      <h3>Register Akun Mahasiswa</h3>
      
      {/* 💡 CONDITIONAL RENDERING VALIDASI ERROR */}
      {error && (
        <div style={{ backgroundColor: "rgba(220, 53, 69, 0.1)", color: "#dc3545", padding: "10px", borderRadius: "4px", marginBottom: "15px", fontSize: "14px", textAlign: "left" }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}><label>Nama Lengkap:</label><input type="text" name="nama" onChange={handleChange} style={{ width: "100%", padding: "8px" }} /></div>
        <div style={{ marginBottom: "15px" }}><label>Email Kampus:</label><input type="email" name="email" onChange={handleChange} style={{ width: "100%", padding: "8px" }} /></div>
        <div style={{ marginBottom: "15px" }}><label>Password:</label><input type="password" name="password" onChange={handleChange} style={{ width: "100%", padding: "8px" }} /></div>
        <button type="submit" style={{ width: "100%" }}>Daftar Sekarang</button>
      </form>
    </div>
  );
}