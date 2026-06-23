import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { User, Shield, Key, Smartphone, Upload, CheckCircle } from "lucide-react";

export const ProfilAdmin = () => {
  const [activeTab, setActiveTab] = useState("profil");
  
  // State untuk menyimpan data riil dari database
  const [adminData, setAdminData] = useState({
    nama_lengkap: "",
    email: "",
    role: "",
    avatar: null,
    is_2fa_active: false
  });

  // State khusus form ganti password
  const [passData, setPassData] = useState({ oldPassword: "", newPassword: "" });

  // 1. Ambil data dari Database saat halaman dibuka
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/profile");
      setAdminData(res.data);
    } catch (err) {
      console.error("Gagal ambil profil:", err);
    }
  };

  // 2. Simpan Perubahan Profil (Nama, Email) ke Database
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3000/api/admin/profile", {
        nama_lengkap: adminData.nama_lengkap,
        email: adminData.email,
        avatar: adminData.avatar
      });
      Swal.fire("Tersimpan!", "Data profil berhasil diperbarui ke database.", "success");
      fetchProfile();
    } catch (err) {
      Swal.fire("Error", "Gagal menyimpan data", "error");
    }
  };

  // 3. Simpan Kata Sandi Baru ke Database
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passData.newPassword.length < 5) return Swal.fire("Lemah", "Password minimal 5 karakter", "warning");

    try {
      await axios.put("http://localhost:3000/api/admin/password", passData);
      Swal.fire("Aman!", "Kata sandi Anda berhasil diperbarui.", "success");
      setPassData({ oldPassword: "", newPassword: "" }); // Kosongkan input
    } catch (err) {
      // Menangkap error jika password lama salah
      Swal.fire("Gagal", err.response?.data?.message || "Terjadi kesalahan", "error");
    }
  };

  // 4. Ubah Status 2FA ke Database
  const handleToggle2FA = async () => {
    const newStatus = !adminData.is_2fa_active;
    try {
      await axios.patch("http://localhost:3000/api/admin/2fa", { is_2fa_active: newStatus });
      setAdminData({ ...adminData, is_2fa_active: newStatus });
      
      if (newStatus) Swal.fire("2FA Aktif", "Keamanan akun ditingkatkan.", "success");
      else Swal.fire("2FA Dinonaktifkan", "Verifikasi ganda dimatikan.", "info");
    } catch (err) {
      Swal.fire("Error", "Gagal mengubah keamanan", "error");
    }
  };

  // 5. Upload Foto (Konversi ke Base64 lalu simpan ke Database)
  const handleUploadPhoto = () => {
    Swal.fire({
      title: "Unggah Foto Profil",
      input: "file",
      inputAttributes: { accept: "image/*" },
      showCancelButton: true,
      confirmButtonText: "Gunakan Foto"
    }).then((result) => {
      if (result.value) {
        const file = result.value;
        const reader = new FileReader();
        
        // Membaca file gambar dan mengubahnya ke Base64 string agar mudah masuk MySQL
        reader.onloadend = async () => {
          const base64String = reader.result;
          setAdminData({ ...adminData, avatar: base64String });
          
          try {
            await axios.put("http://localhost:3000/api/admin/profile", {
              ...adminData,
              avatar: base64String
            });
            Swal.fire("Berhasil!", "Foto profil tersimpan permanen.", "success");
          } catch (err) {
            Swal.fire("Error", "Gagal mengunggah gambar ke server", "error");
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Profil Saya</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* KARTU PROFIL KIRI */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6 text-center">
            
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-4 border-white shadow-lg overflow-hidden object-cover">
                {adminData.avatar ? (
                  <img src={adminData.avatar} alt="Profil" className="w-full h-full object-cover" />
                ) : (
                  <User size={60} />
                )}
              </div>
              <button onClick={handleUploadPhoto} className="absolute bottom-0 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-md transition">
                <Upload size={16} />
              </button>
            </div>

            <h3 className="text-xl font-bold text-gray-800">{adminData.nama_lengkap || "Admin"}</h3>
            <p className="text-gray-500 text-sm">{adminData.email}</p>
            <div className="mt-4 inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              <Shield size={14} /> {adminData.role}
            </div>
          </div>

          {/* MENU NAVIGASI KIRI */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <button onClick={() => setActiveTab("profil")} className={`w-full flex items-center gap-3 p-4 border-b transition ${activeTab === "profil" ? "bg-blue-50 text-blue-600 border-l-4 border-l-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>
              <User size={18} /> Data Pribadi
            </button>
            <button onClick={() => setActiveTab("keamanan")} className={`w-full flex items-center gap-3 p-4 border-b transition ${activeTab === "keamanan" ? "bg-blue-50 text-blue-600 border-l-4 border-l-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>
              <Key size={18} /> Keamanan Akun
            </button>
            <button onClick={() => setActiveTab("sesi")} className={`w-full flex items-center gap-3 p-4 transition ${activeTab === "sesi" ? "bg-blue-50 text-blue-600 border-l-4 border-l-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>
              <Smartphone size={18} /> Perangkat Aktif
            </button>
          </div>
        </div>

        {/* KONTEN KANAN */}
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border p-6 min-h-[500px]">
            
            {/* TAB: DATA PRIBADI */}
            {activeTab === "profil" && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-bold border-b pb-2">Informasi Dasar</h3>
                <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                    <input type="text" value={adminData.nama_lengkap || ""} onChange={(e) => setAdminData({...adminData, nama_lengkap: e.target.value})} className="w-full border p-2.5 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input type="email" value={adminData.email || ""} onChange={(e) => setAdminData({...adminData, email: e.target.value})} className="w-full border p-2.5 rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Hak Akses Sistem</label>
                    <input type="text" value={adminData.role || ""} disabled className="w-full border p-2.5 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
                  </div>
                  <div className="col-span-1 md:col-span-2 mt-4">
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-md">Simpan Profil Permanen</button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB: KEAMANAN */}
            {activeTab === "keamanan" && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-lg font-bold border-b pb-2">Ubah Kata Sandi</h3>
                <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Kata Sandi Saat Ini</label>
                    <input type="password" required value={passData.oldPassword} onChange={(e) => setPassData({...passData, oldPassword: e.target.value})} className="w-full border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Kata Sandi Baru</label>
                    <input type="password" required value={passData.newPassword} onChange={(e) => setPassData({...passData, newPassword: e.target.value})} className="w-full border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <button type="submit" className="w-full bg-gray-800 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-gray-900 transition shadow-md">Update Sandi ke Database</button>
                </form>

                <h3 className="text-lg font-bold border-b pb-2 mt-8">Autentikasi Dua Faktor (2FA)</h3>
                <div className={`flex items-center justify-between border p-4 rounded-xl transition ${adminData.is_2fa_active ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}`}>
                  <div>
                    <p className={`font-semibold ${adminData.is_2fa_active ? "text-green-800" : "text-yellow-800"}`}>
                      {adminData.is_2fa_active ? "2FA Sudah Aktif (Aman)" : "2FA Belum Aktif"}
                    </p>
                    <p className={`text-sm ${adminData.is_2fa_active ? "text-green-700" : "text-yellow-700"}`}>
                      Lindungi akun dari peretasan dengan verifikasi ganda.
                    </p>
                  </div>
                  <button onClick={handleToggle2FA} className={`${adminData.is_2fa_active ? "bg-red-600 hover:bg-red-700" : "bg-yellow-600 hover:bg-yellow-700"} text-white px-4 py-2 rounded-lg font-bold transition shadow-md`}>
                    {adminData.is_2fa_active ? "Matikan 2FA" : "Aktifkan 2FA"}
                  </button>
                </div>
              </div>
            )}

            {/* TAB: PERANGKAT */}
            {activeTab === "sesi" && (
              <div className="space-y-6 animate-fade-in text-gray-500 text-center py-10 border-2 border-dashed rounded-xl">
                <Smartphone size={40} className="mx-auto mb-2 text-gray-400" />
                <p>Fitur pelacakan perangkat IP dinamis akan segera tersedia pada versi rilis berikutnya.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};