import { useState, useEffect } from "react";
// 💡 CONSUMING API: Menggunakan konfig pusat axios
import api from "../api"; 

// Komponen Anak untuk Rendering List per Baris (Materi Pertemuan 9 & 10)
function KeluhanRow({ item, tanganiSelesai, tanganiHapus }) {
  return (
    <tr>
      <td>{item.customer_name}</td>
      <td>{item.customer_email}</td>
      <td>{item.category_name || "Umum"}</td>
      <td>{item.message}</td>
      <td>
        <span className={`status-badge ${item.status === 'Pending' ? 'status-pending' : 'status-selesai'}`}>
          {item.status}
        </span>
      </td>
      <td>
        {item.status === "Pending" && (
          <button 
            onClick={() => tanganiSelesai(item.id)} 
            style={{ marginRight: "5px", backgroundColor: "#28a745", color: "white", padding: "5px 10px" }}
          >
            ✓ Selesai
          </button>
        )}
        <button 
          onClick={() => tanganiHapus(item.id)} 
          style={{ backgroundColor: "#dc3545", color: "white", padding: "5px 10px" }}
        >
          ✕ Hapus
        </button>
      </td>
    </tr>
  );
}

export default function DashboardAdmin() {
  const [listKeluhan, setListKeluhan] = useState([]);

  // 💡 AXIOS GET: Mengambil data keluhan dari database backend
  const ambilData = async () => {
    try {
      const response = await api.get("/complaints");
      setListKeluhan(response.data); // Axios otomatis transform JSON di dalam .data
    } catch (error) { 
      console.error("Gagal mengambil data:", error); 
    }
  };

  // 💡 AXIOS PATCH: Mengubah status menjadi selesai
  const tanganiSelesai = async (id) => {
    try {
      const response = await api.patch(`/complaints/${id}`, { status: "Selesai" });
      if (response.status === 200) {
        ambilData(); // Otomatis re-render list karena state diperbarui
      }
    } catch (error) {
      alert("Gagal update status!");
    }
  };

  // 💡 AXIOS DELETE: Menghapus data keluhan
  const tanganiHapus = async (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      try {
        const response = await api.delete(`/complaints/${id}`);
        if (response.status === 200) {
          ambilData();
        }
      } catch (error) {
        alert("Gagal menghapus data!");
      }
    }
  };

  // 💡 LIFECYCLE HOOKS: Memicu pengambilan data 1x di awal (Slide Hal 24)
  useEffect(() => { 
    ambilData(); 
  }, []); 

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h3>Dashboard Keluhan Pelanggan (Admin)</h3>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}>
        <thead>
          <tr>
            <th>Nama</th><th>Email</th><th>Kategori</th><th>Pesan Keluhan</th><th>Status</th><th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {listKeluhan.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: "center" }}>Belum ada data keluhan.</td></tr>
          ) : (
            listKeluhan.map((keluhan) => (
              <KeluhanRow 
                key={keluhan.id} 
                item={keluhan} 
                tanganiSelesai={tanganiSelesai} 
                tanganiHapus={tanganiHapus} 
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}