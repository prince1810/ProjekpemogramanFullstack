import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Megaphone, Plus, Trash2, Archive, Paperclip, Calendar, Users, ExternalLink, Shield, Lock, Settings2, MessageSquare, Activity, Check } from "lucide-react";
// ==========================================
// 1. KOMPONEN PENGUMUMAN
// ==========================================
export const Pengumuman = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "", content: "", target_audience: "Semua", attachment_link: "", valid_until: ""
  });

  useEffect(() => { fetchAnnouncements(); }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Gagal ambil pengumuman");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/announcements", formData);
      Swal.fire("Berhasil", "Pengumuman telah disiarkan!", "success");
      setFormData({ title: "", content: "", target_audience: "Semua", attachment_link: "", valid_until: "" });
      setShowForm(false);
      fetchAnnouncements();
    } catch (err) {
      Swal.fire("Error", "Gagal menyiarkan pengumuman", "error");
    }
  };

  const handleArchive = async (id) => {
    const confirm = await Swal.fire({ title: "Arsipkan Pengumuman?", text: "Pengumuman ini tidak akan terlihat lagi oleh user.", icon: "info", showCancelButton: true });
    if (confirm.isConfirmed) {
      await axios.patch(`http://localhost:3000/api/announcements/${id}/archive`);
      fetchAnnouncements();
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({ title: "Hapus Permanen?", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33" });
    if (confirm.isConfirmed) {
      await axios.delete(`http://localhost:3000/api/announcements/${id}`);
      fetchAnnouncements();
    }
  };

  // Fungsi untuk memisahkan pengumuman yang aktif dan yang sudah diarsipkan
  const activeAnnouncements = announcements.filter(a => a.status === 'Aktif');
  const archivedAnnouncements = announcements.filter(a => a.status === 'Arsip');

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Megaphone className="text-blue-600"/> Pusat Informasi</h2>
          <p className="text-gray-500 text-sm mt-1">Siarkan berita, kebijakan baru, atau pembaruan sistem secara terpusat.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition shadow-md">
          <Plus size={20} /> Buat Pengumuman Baru
        </button>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-6 border-b pb-3">Draft Pengumuman</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Judul Pengumuman</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: Pemeliharaan Server Bulanan"/>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Isi Pesan</label>
                <textarea required rows="4" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tuliskan detail informasi di sini..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><Users size={16}/> Target Audiens</label>
                  <select value={formData.target_audience} onChange={(e) => setFormData({...formData, target_audience: e.target.value})} className="w-full border p-2.5 rounded-lg outline-none bg-gray-50">
                    <option value="Semua">Seluruh Anggota & Divisi</option>
                    <option value="User">Hanya Pelanggan / User</option>
                    <option value="Admin">Hanya Internal / Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><Calendar size={16}/> Masa Berlaku (Opsional)</label>
                  <input type="date" value={formData.valid_until} onChange={(e) => setFormData({...formData, valid_until: e.target.value})} className="w-full border p-2.5 rounded-lg outline-none bg-gray-50"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><Paperclip size={16}/> Lampiran Tautan / Dokumen (Opsional)</label>
                <input type="url" value={formData.attachment_link} onChange={(e) => setFormData({...formData, attachment_link: e.target.value})} className="w-full border p-2.5 rounded-lg outline-none bg-gray-50" placeholder="https://link-google-drive-dokumen-kebijakan.com"/>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200">Batal</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">Siarkan Sekarang</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SECTION DAFTAR PENGUMUMAN AKTIF */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Pengumuman Sedang Mengudara</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeAnnouncements.map((item) => (
            <div key={item.id} className="border border-blue-100 bg-blue-50/30 p-5 rounded-2xl relative group">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-800 text-lg pr-8">{item.title}</h4>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{item.target_audience}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.content}</p>
              
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4 border-t pt-3 border-gray-100">
                <span className="flex items-center gap-1"><Calendar size={14}/> 
                  Dibuat: {new Date(item.created_at).toLocaleDateString('id-ID')}
                </span>
                {item.valid_until && (
                  <span className="flex items-center gap-1 text-orange-600 font-medium"><Calendar size={14}/> 
                    Tenggang: {new Date(item.valid_until).toLocaleDateString('id-ID')}
                  </span>
                )}
                {item.attachment_link && (
                  <a href={item.attachment_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                    <ExternalLink size={14}/> Buka Lampiran
                  </a>
                )}
              </div>

              <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition duration-300 absolute top-4 right-4 bg-white/80 p-1 rounded-lg shadow-sm">
                <button onClick={() => handleArchive(item.id)} title="Arsipkan" className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-md"><Archive size={16}/></button>
                <button onClick={() => handleDelete(item.id)} title="Hapus" className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"><Trash2 size={16}/></button>
              </div>
            </div>
          ))}
          {activeAnnouncements.length === 0 && (
            <div className="col-span-full text-center p-8 text-gray-400 border-2 border-dashed rounded-xl">Belum ada pengumuman yang aktif saat ini.</div>
          )}
        </div>
      </div>

      {/* SECTION ARSIP */}
      {archivedAnnouncements.length > 0 && (
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-600 flex items-center gap-2"><Archive size={20}/> Arsip & Riwayat</h3>
          <div className="space-y-3">
            {archivedAnnouncements.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 opacity-75">
                <div>
                  <h4 className="font-semibold text-gray-700">{item.title}</h4>
                  <p className="text-xs text-gray-500">Target: {item.target_audience} • Diarsipkan</p>
                </div>
                <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18}/></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. KOMPONEN PENGATURAN (SISTEM DEFAULT)
// ==========================================
export const Pengaturan = () => {
  const [activeTab, setActiveTab] = useState("akses");

  // State tiruan (mock) untuk toggle pengaturan
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    autoApproveUser: true,
    maintenanceMode: false,
    emailNotifications: true,
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
    // Di aplikasi nyata, ini akan memanggil axios.put() ke backend
  };

  const tabs = [
    { id: "akses", label: "Hak Akses", icon: <Shield size={18} /> },
    { id: "keamanan", label: "Keamanan", icon: <Lock size={18} /> },
    { id: "kustomisasi", label: "Kustomisasi", icon: <Settings2 size={18} /> },
    { id: "moderasi", label: "Moderasi", icon: <MessageSquare size={18} /> },
    { id: "log", label: "Log Sistem", icon: <Activity size={18} /> },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Pengaturan Sistem</h2>
          <p className="text-gray-500 text-sm mt-1">Kelola preferensi, keamanan, dan aturan operasional aplikasi.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col md:flex-row min-h-[60vh]">
        {/* SIDEBAR TABS */}
        <div className="w-full md:w-64 bg-gray-50 border-r flex flex-col p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* KONTEN TABS */}
        <div className="flex-1 p-8">
          {/* TAB: HAK AKSES */}
          {activeTab === "akses" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold border-b pb-2">Manajemen Hak Akses</h3>
              <p className="text-gray-600 text-sm">Tentukan batasan untuk setiap peran (Role) dalam sistem.</p>
              
              <div className="bg-gray-50 p-4 rounded-xl border space-y-4 mt-4">
                <div className="flex justify-between items-center bg-white p-4 rounded-lg border">
                  <div>
                    <h4 className="font-bold text-gray-800">Mode Super Admin</h4>
                    <p className="text-xs text-gray-500">Memberikan akses penuh ke database dan penghapusan data.</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Check size={14}/> AKTIF</span>
                </div>
                <div className="flex justify-between items-center bg-white p-4 rounded-lg border">
                  <div>
                    <h4 className="font-bold text-gray-800">Staf Customer Service</h4>
                    <p className="text-xs text-gray-500">Hanya dapat membalas dan mengubah status keluhan.</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Check size={14}/> AKTIF</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: KEAMANAN */}
          {activeTab === "keamanan" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold border-b pb-2">Keamanan & Privasi</h3>
              <p className="text-gray-600 text-sm">Lindungi data pengguna dan cegah akses yang tidak sah.</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-50 transition">
                  <div>
                    <h4 className="font-bold">Autentikasi Dua Faktor (2FA)</h4>
                    <p className="text-xs text-gray-500 mt-1">Wajibkan kode OTP saat login untuk admin.</p>
                  </div>
                  <button onClick={() => handleToggle('twoFactorAuth')} className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 ${settings.twoFactorAuth ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`}>
                    <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </button>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-50 transition">
                  <div>
                    <h4 className="font-bold">Mode Maintenance</h4>
                    <p className="text-xs text-gray-500 mt-1">Tutup akses aplikasi untuk pelanggan sementara waktu.</p>
                  </div>
                  <button onClick={() => handleToggle('maintenanceMode')} className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 ${settings.maintenanceMode ? 'bg-red-500 justify-end' : 'bg-gray-300 justify-start'}`}>
                    <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: KUSTOMISASI */}
          {activeTab === "kustomisasi" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold border-b pb-2">Kustomisasi & Integrasi</h3>
              <p className="text-gray-600 text-sm">Atur tampilan antarmuka dan sambungkan API pihak ketiga.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border p-4 rounded-xl">
                  <label className="block text-sm font-bold mb-2">Nama Perusahaan / Aplikasi</label>
                  <input type="text" className="w-full border p-2 rounded-lg bg-gray-50" defaultValue="AspiraLink Core" />
                </div>
                <div className="border p-4 rounded-xl">
                  <label className="block text-sm font-bold mb-2">Zona Waktu Default</label>
                  <select className="w-full border p-2 rounded-lg bg-gray-50">
                    <option>Asia/Jakarta (WIB)</option>
                    <option>Asia/Makassar (WITA)</option>
                  </select>
                </div>
                <div className="border p-4 rounded-xl col-span-2">
                  <label className="block text-sm font-bold mb-2">API Key Notifikasi WhatsApp (Pihak Ke-3)</label>
                  <input type="password" className="w-full border p-2 rounded-lg bg-gray-50" defaultValue="sk_live_1234567890abcdef" />
                </div>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">Simpan Perubahan</button>
            </div>
          )}

          {/* TAB: MODERASI */}
          {activeTab === "moderasi" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold border-b pb-2">Moderasi Konten</h3>
              <p className="text-gray-600 text-sm">Atur bagaimana sistem menangani input dari pengguna baru.</p>

              <div className="flex justify-between items-center p-4 border rounded-xl hover:bg-gray-50 transition">
                <div>
                  <h4 className="font-bold">Persetujuan Pendaftaran Otomatis</h4>
                  <p className="text-xs text-gray-500 mt-1">User baru dapat langsung login tanpa menunggu approval admin.</p>
                </div>
                <button onClick={() => handleToggle('autoApproveUser')} className={`w-12 h-6 rounded-full flex items-center transition-colors px-1 ${settings.autoApproveUser ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`}>
                  <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                </button>
              </div>
            </div>
          )}

          {/* TAB: LOG SISTEM */}
          {activeTab === "log" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold border-b pb-2 flex items-center gap-2">Pemantauan & Audit Log</h3>
              <p className="text-gray-600 text-sm">Rekam jejak seluruh aktivitas krusial dalam sistem.</p>
              
              <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-sm h-64 overflow-y-auto space-y-2">
                <p>[2026-06-23 04:12:00] INFO: SuperAdmin login berhasil (IP: 192.168.1.1)</p>
                <p>[2026-06-23 04:15:22] WARN: Gagal login dari IP tidak dikenal (IP: 103.22.x.x)</p>
                <p>[2026-06-23 04:20:10] SYSTEM: Tabel 'categories' berhasil diperbarui (Record ID: 12).</p>
                <p className="text-gray-500 animate-pulse">Menunggu aktivitas baru...</p>
              </div>
              <p className="text-xs text-gray-500">*Log ini mengambil konsep dari tabel <code>audit_logs</code> yang sudah kita buat sebelumnya di database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};