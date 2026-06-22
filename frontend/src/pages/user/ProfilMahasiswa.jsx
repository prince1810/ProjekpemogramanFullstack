import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { User, FileText, Upload, Save, Key, ShieldCheck, Mail, BookOpen } from "lucide-react";

export const ProfilMahasiswa = () => {
  const [activeTab, setActiveTab] = useState("profil");
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [passData, setPassData] = useState({ oldPassword: "", newPassword: "" });
  
  const userId = localStorage.getItem("userId") || 1; 

  const [studentData, setStudentData] = useState({
    nama: "", email: "", nim: "", jurusan: "", avatar: null
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const resProfile = await axios.get(`http://localhost:3000/api/user/profile/${userId}`);
      setStudentData(resProfile.data);
      const resComplaints = await axios.get(`http://localhost:3000/api/user/complaints/${userId}`);
      setComplaints(resComplaints.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/user/profile/${userId}`, studentData);
      Swal.fire({ icon: "success", title: "Berhasil!", text: "Profil diperbarui." });
      fetchData();
    } catch (err) { Swal.fire("Error", "Gagal menyimpan", "error"); }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/user/password/${userId}`, passData);
      Swal.fire({ icon: "success", title: "Sukses!", text: "Password diperbarui." });
      setPassData({ oldPassword: "", newPassword: "" });
    } catch (err) { Swal.fire("Gagal", err.response?.data?.message || "Cek password lama", "error"); }
  };

  const handleUploadPhoto = () => {
    const input = document.createElement("input");
    input.type = "file"; input.accept = "image/*";
    input.onchange = (e) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        try {
            await axios.put(`http://localhost:3000/api/user/profile/${userId}`, { ...studentData, avatar: base64 });
            setStudentData({...studentData, avatar: base64});
            Swal.fire("Sukses!", "Foto diperbarui.", "success");
        } catch(e) { Swal.fire("Error", "Gagal upload", "error"); }
      };
      reader.readAsDataURL(e.target.files[0]);
    };
    input.click();
  };

  if (loading) return <div className="text-center p-20">Memuat...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* NAVIGATION TABS */}
      <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
        {[
            { id: "profil", label: "Profil", icon: <User size={18}/> },
            { id: "keamanan", label: "Keamanan", icon: <ShieldCheck size={18}/> },
            { id: "riwayat", label: "Riwayat", icon: <FileText size={18}/> }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} 
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT: ID CARD STYLE */}
      {activeTab === "profil" && (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-900 to-blue-600"></div>
            <form onSubmit={handleSaveProfile} className="relative mt-12 space-y-6">
                <div className="flex flex-col items-center">
                    <div className="relative group">
                        <img src={studentData.avatar || `https://ui-avatars.com/api/?name=${studentData.nama}&background=001f54&color=fff`} className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg" />
                        <button type="button" onClick={handleUploadPhoto} className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md text-blue-600"><Upload size={16}/></button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Nama</label><input className="w-full mt-1 p-3 bg-gray-50 rounded-xl" value={studentData.nama} onChange={e => setStudentData({...studentData, nama: e.target.value})} /></div>
                    <div><label className="text-[10px] uppercase font-bold text-gray-400 ml-1">NIM</label><input className="w-full mt-1 p-3 bg-gray-50 rounded-xl" value={studentData.nim} onChange={e => setStudentData({...studentData, nim: e.target.value})} /></div>
                    <div><label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Email</label><input className="w-full mt-1 p-3 bg-gray-50 rounded-xl" value={studentData.email} onChange={e => setStudentData({...studentData, email: e.target.value})} /></div>
                    <div><label className="text-[10px] uppercase font-bold text-gray-400 ml-1">Jurusan</label><input className="w-full mt-1 p-3 bg-gray-50 rounded-xl" value={studentData.jurusan} onChange={e => setStudentData({...studentData, jurusan: e.target.value})} /></div>
                </div>
                <button type="submit" className="w-full bg-[#001f54] text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition">Simpan Profil</button>
            </form>
        </div>
      )}

      {/* CONTENT: KEAMANAN */}
      {activeTab === "keamanan" && (
        <form onSubmit={handleUpdatePassword} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-4"><Key size={20}/> Ubah Kata Sandi</h3>
            <div><label className="text-sm font-bold">Password Lama</label><input type="password" required className="w-full p-3 bg-gray-50 rounded-xl mt-1" value={passData.oldPassword} onChange={e => setPassData({...passData, oldPassword: e.target.value})} /></div>
            <div><label className="text-sm font-bold">Password Baru</label><input type="password" required className="w-full p-3 bg-gray-50 rounded-xl mt-1" value={passData.newPassword} onChange={e => setPassData({...passData, newPassword: e.target.value})} /></div>
            <button type="submit" className="w-full bg-gray-800 text-white py-3 rounded-xl font-bold">Update Password</button>
        </form>
      )}

      {/* CONTENT: RIWAYAT */}
      {activeTab === "riwayat" && (
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Riwayat Aspirasi</h3>
            {complaints.length > 0 ? (
                <div className="space-y-3">
                    {complaints.map(c => (
                        <div key={c.id} className="p-4 bg-gray-50 rounded-2xl flex justify-between items-center">
                            <div>
                                <p className="font-bold">{c.category_name}</p>
                                <p className="text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString()}</p>
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{c.status}</span>
                        </div>
                    ))}
                </div>
            ) : <p className="text-gray-400 text-center py-10">Belum ada riwayat.</p>}
        </div>
      )}
    </div>
  );
};