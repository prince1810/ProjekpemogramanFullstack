import { useState, useContext } from "react"; // Tambah useContext
import { useNavigate } from "react-router-dom"; 
import api from "../api"; 
import { AuthContext } from "../context/AuthContext"; // Import Context

export default function LoginForm({ tipe }) {
  const [credentials, setCredentials] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const { loginGlobal } = useContext(AuthContext); // Ambil fungsi login global

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tipe === "admin" && !credentials.username.trim()) { setError("Username admin tidak boleh kosong!"); return; }
    if (tipe === "user" && !credentials.email.trim()) { setError("Email kampus wajib diisi!"); return; }
    if (!credentials.password.trim()) { setError("Password tidak boleh kosong!"); return; }

    const url = tipe === "admin" ? "/login" : "/login-user";
    const bodyData = tipe === "admin" 
      ? { username: credentials.username, password: credentials.password }
      : { email: credentials.email, password: credentials.password };

    try {
      const response = await api.post(url, bodyData);
      if (response.status === 200) {
        alert("Login Sukses!");
        if (tipe === "admin") {
          loginGlobal({ nama: "Admin SIMKEL", role: "admin" }); // Simpan ke global
          navigate("/admin"); 
        } else {
          loginGlobal({ nama: response.data.nama, email: response.data.email, role: response.data.role }); // Simpan ke global
          navigate("/keluhan"); 
        }
      }
    } catch (error) { 
      setError("Gagal: Akun tidak ditemukan atau password salah!"); 
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid var(--border)", borderRadius: "8px" }}>
      <h3>Login {tipe === "admin" ? "Admin Server" : "Mahasiswa"}</h3>
      {error && <div style={{ backgroundColor: "rgba(220, 53, 69, 0.1)", color: "#dc3545", padding: "10px", borderRadius: "4px", marginBottom: "15px", fontSize: "14px" }}>⚠️ {error}</div>}
      <form onSubmit={handleSubmit}>
        {tipe === "admin" ? (
          <div style={{ marginBottom: "15px" }}><label>Username Admin:</label><input type="text" name="username" onChange={handleChange} style={{ width: "100%", padding: "8px" }} /></div>
        ) : (
          <div style={{ marginBottom: "15px" }}><label>Email Kampus:</label><input type="email" name="email" onChange={handleChange} style={{ width: "100%", padding: "8px" }} /></div>
        )}
        <div style={{ marginBottom: "15px" }}><label>Password:</label><input type="password" name="password" onChange={handleChange} style={{ width: "100%", padding: "8px" }} /></div>
        <button type="submit" style={{ width: "100%" }}>Masuk</button>
      </form>
    </div>
  );
}