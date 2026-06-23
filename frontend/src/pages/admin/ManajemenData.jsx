import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash2, History, Plus, Tag, Briefcase, AlertTriangle, Edit } from "lucide-react";

// ==========================================
// 1. KOMPONEN KELOLA PENGGUNA
// ==========================================
export const KelolaPengguna = () => {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Gagal ambil data user");
    }
  };

  const fetchLogs = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/audit-logs/users/${id}`);
      setLogs(res.data);
      setShowModal(true);
    } catch (err) {
      Swal.fire("Info", "Belum ada riwayat aktivitas", "info");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    await axios.patch(`http://localhost:3000/api/users/${id}/status`, { is_active: !currentStatus });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({ title: "Yakin hapus?", icon: "warning", showCancelButton: true });
    if (result.isConfirmed) {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Kelola Pengguna</h2>
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-500 text-sm">
              <th className="p-4">Nama</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{user.nama}</td>
                <td className="p-4">
                  <button onClick={() => toggleStatus(user.id, user.is_active)} 
                          className={`px-3 py-1 rounded-full text-xs font-bold ${user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {user.is_active ? "AKTIF" : "NONAKTIF"}
                  </button>
                </td>
                <td className="p-4 text-center flex justify-center gap-2">
                  <button onClick={() => fetchLogs(user.id)} className="text-blue-500 hover:text-blue-700 p-2"><History size={18} /></button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="font-bold mb-4 text-lg">Riwayat Aktivitas</h3>
            <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
              {logs.length > 0 ? logs.map((log, i) => (
                <p key={i} className="text-sm border-b pb-2">
                  <span className="font-semibold">{log.action}</span> <br/>
                  <span className="text-gray-500 text-xs">{new Date(log.created_at).toLocaleString('id-ID')}</span>
                </p>
              )) : <p className="text-gray-400 text-sm text-center py-4">Tidak ada riwayat.</p>}
            </div>
            <button onClick={() => setShowModal(false)} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg">Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. KOMPONEN KATEGORI KELUHAN (DENGAN EDIT & HAPUS)
// ==========================================
export const KategoriKeluhan = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    category_name: "",
    division: "Customer Service",
    priority: "Medium"
  });

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Gagal ambil kategori");
    }
  };

  const openAddForm = () => {
    setIsEditing(false);
    setFormData({ category_name: "", division: "Customer Service", priority: "Medium" });
    setShowForm(true);
  };

  const openEditForm = (cat) => {
    setIsEditing(true);
    setEditId(cat.id);
    setFormData({
      category_name: cat.category_name,
      division: cat.division,
      priority: cat.priority
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/api/categories/${editId}`, formData);
        Swal.fire("Berhasil", "Kategori diperbarui!", "success");
      } else {
        await axios.post("http://localhost:3000/api/categories", formData);
        Swal.fire("Berhasil", "Kategori baru ditambahkan!", "success");
      }
      setShowForm(false);
      fetchCategories(); // Refresh data otomatis agar langsung muncul
    } catch (err) {
      Swal.fire("Error", "Pastikan database menyala dan form terisi benar", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({ title: "Hapus Kategori?", text: "Tindakan ini tidak bisa dibatalkan", icon: "warning", showCancelButton: true });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/categories/${id}`);
        fetchCategories(); // Refresh tabel otomatis
        Swal.fire("Terhapus!", "Kategori dihapus.", "success");
      } catch (err) {
        Swal.fire("Gagal", "Kategori sedang digunakan.", "error");
      }
    }
  };

  const getPriorityColor = (priority) => {
    if (priority === 'High') return 'bg-red-100 text-red-700';
    if (priority === 'Medium') return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Kategori & Distribusi</h2>
          <p className="text-gray-500 text-sm mt-1">Atur perutean keluhan ke divisi yang tepat secara otomatis.</p>
        </div>
        <button onClick={openAddForm} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 shadow-lg">
          <Plus size={20} /> Tambah Kategori
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Tag className="text-blue-500"/> {isEditing ? "Edit Kategori" : "Kategori Baru"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Masalah / Kategori</label>
                <input 
                  type="text" required 
                  value={formData.category_name}
                  onChange={(e) => setFormData({...formData, category_name: e.target.value})}
                  className="w-full border p-2 rounded-lg outline-none focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><Briefcase size={16}/> Divisi</label>
                <select value={formData.division} onChange={(e) => setFormData({...formData, division: e.target.value})} className="w-full border p-2 rounded-lg outline-none">
                  <option value="Teknis / IT">Teknis / IT</option>
                  <option value="Billing / Keuangan">Billing / Keuangan</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Operasional">Operasional</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><AlertTriangle size={16}/> Prioritas</label>
                <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} className="w-full border p-2 rounded-lg outline-none">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold">Batal</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold">{isEditing ? "Update" : "Simpan"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-500 text-sm">
              <th className="p-4">Kategori Masalah</th>
              <th className="p-4">Divisi Tujuan</th>
              <th className="p-4">Prioritas</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold text-gray-800">{cat.category_name}</td>
                <td className="p-4 text-gray-600"><span className="flex items-center gap-2"><Briefcase size={16} className="text-gray-400"/> {cat.division}</span></td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(cat.priority)}`}>{cat.priority.toUpperCase()}</span></td>
                <td className="p-4 text-center flex justify-center gap-2">
                  <button onClick={() => openEditForm(cat)} className="text-yellow-600 hover:text-yellow-800 p-2 bg-yellow-50 rounded-lg"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan="4" className="text-center p-8 text-gray-500">Belum ada data kategori. Silakan tambah kategori baru.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};