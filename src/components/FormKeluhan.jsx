import { useState, useContext } from "react"; // Tambah useContext
import api from "../api"; 
import { AuthContext } from "../context/AuthContext"; // Import Context

export default function FormKeluhan() {
  const { user } = useContext(AuthContext); // Ambil data user aktif secara gaib dari Global State
  
  const [formData, setFormData] = useState({
    customer_name: user ? user.nama : "",
    customer_email: user ? user.email : "",
    category_id: "1",
    message: ""
  });

  const [errors, setErrors] = useState({ message: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "message" && e.target.value.trim() !== "") { setErrors({ ...errors, message: "" }); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.message.trim() === "") { setErrors({ message: "Pesan keluhan wajib diisi, tidak boleh kosong!" }); return; }
    try {
      const response = await api.post("/complaints", formData);
      if (response.status === 200 || response.status === 201) {
        alert("Keluhan berhasil dikirim ke database!");
        setFormData({ ...formData, message: "" });
        setErrors({ message: "" });
      }
    } catch (error) { alert("Gagal mengirim keluhan."); }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", border: "1px solid var(--border)", borderRadius: "8px" }}>
      <h3>Form Input Keluhan Pelanggan</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}><label>Nama Lengkap:</label><input type="text" name="customer_name" value={formData.customer_name} readOnly style={{ width: "100%", padding: "8px" }} /></div>
        <div style={{ marginBottom: "15px" }}><label>Email:</label><input type="email" name="customer_email" value={formData.customer_email} readOnly style={{ width: "100%", padding: "8px" }} /></div>
        <div style={{ marginBottom: "15px" }}>
          <label>Kategori Keluhan:</label>
          <select name="category_id" value={formData.category_id} onChange={handleChange} style={{ width: "100%", padding: "8px" }}>
            <option value="1">Fasilitas Kampus</option>
            <option value="2">Sistem Academic (SIAK)</option>
            <option value="3">Dosen / Kurikulum</option>
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Isi Keluhan:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} style={{ width: "100%", padding: "8px", height: "100px", borderColor: errors.message ? "#dc3545" : "var(--border)" }} />
          {errors.message && <span style={{ color: "#dc3545", fontSize: "14px", marginTop: "5px", display: "block" }}>⚠️ {errors.message}</span>}
        </div>
        <button type="submit" style={{ width: "100%" }}>Kirim Keluhan Anda 🚀</button>
      </form>
    </div>
  );
}