import React from "react";
import { FileText, ShieldCheck, MessageCircle, Zap, Users, Target, Globe, Database, Layout } from "lucide-react";

const TentangKami = () => {
  const fitur = [
    { icon: <MessageCircle size={20} className="text-blue-600" />, title: "Sampaikan Keluhan", desc: "Mahasiswa dapat menyampaikan keluhan dan aspirasi secara langsung kepada pihak kampus dengan mudah dan cepat." },
    { icon: <ShieldCheck size={20} className="text-blue-600" />, title: "Aman & Terpercaya", desc: "Data pengguna terproteksi dengan sistem autentikasi yang aman dan setiap keluhan ditangani secara profesional." },
    { icon: <Zap size={20} className="text-blue-600" />, title: "Tindak Lanjut Cepat", desc: "Setiap keluhan diteruskan ke divisi terkait dan diproses secepat mungkin oleh pihak kampus." },
    { icon: <FileText size={20} className="text-blue-600" />, title: "Pantau Status", desc: "Mahasiswa dapat memantau perkembangan status keluhan secara real-time kapanpun dan dimanapun." },
    { icon: <Globe size={20} className="text-blue-600" />, title: "Berbasis Web", desc: "Dapat diakses melalui browser tanpa perlu menginstall aplikasi tambahan apapun." },
    { icon: <Database size={20} className="text-blue-600" />, title: "Data Terstruktur", desc: "Semua data keluhan tersimpan dengan rapi dan dapat dikelola oleh admin secara efisien." },
  ];

  const tim = [
    { nama: "Ananda Tasya", nim: "0110224144", peran: "UI/UX Designer", icon: <Layout size={14}/> },
    { nama: "Alya Dliya Zahra Andre", nim: "0110224055", peran: "Frontend Developer", icon: <Globe size={14}/> },
    { nama: "M. Fathi Farhat", nim: "0110224226", peran: "Fullstack Developer", icon: <Zap size={14}/> },
    { nama: "Nafila Afni Alqibtiyah", nim: "0110224107", peran: "Backend Developer", icon: <Layout size={14}/> },
    { nama: "Satya Fadillah Hamdy", nim: "0110224137", peran: "Backend Developer", icon: <Database size={14}/> },
  ];

  const teknologi = [
    { nama: "React.js", desc: "Frontend" },
    { nama: "Tailwind", desc: "Styling" },
    { nama: "Node.js", desc: "Backend" },
    { nama: "Express", desc: "Framework" },
    { nama: "MySQL", desc: "Database" },
    { nama: "Vite", desc: "Build" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8 min-h-screen flex flex-col">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-3xl p-8 text-white">
        <h1 className="text-2xl font-bold">AspiraLink</h1>
        <p className="text-blue-100 text-sm">Sistem Manajemen Keluhan & Aspirasi Mahasiswa STT Nurul Fikri</p>
      </div>

      {/* Main Content Area: Hanya untuk Tentang Aplikasi, Teknologi, dan Fitur */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start flex-grow">
        
        {/* Kolom Kiri */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target size={20} className="text-blue-600" /> Tentang Aplikasi
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed space-y-3">
              <p><strong>AspiraLink</strong> hadir sebagai solusi inovatif bagi mahasiswa STT Nurul Fikri untuk menyampaikan aspirasi dan keluhan secara digital. Kami berkomitmen untuk menjembatani komunikasi antara mahasiswa dan pihak kampus dengan platform yang transparan, aman, dan efisien.</p>
              <p>Dengan sistem yang terintegrasi, setiap laporan yang masuk akan diverifikasi, diproses oleh divisi terkait, dan dimonitor perkembangannya secara <em>real-time</em>. Kami percaya bahwa suara setiap mahasiswa adalah kunci kemajuan kampus, dan AspiraLink memastikan bahwa tidak ada aspirasi yang terabaikan dalam upaya kami membangun lingkungan akademik yang lebih baik dan responsif.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Database size={20} className="text-blue-600" /> Teknologi yang Digunakan
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {teknologi.map((t, i) => (
                <div key={i} className="p-3 bg-gray-50 border rounded-2xl text-center">
                  <p className="font-bold text-xs text-blue-800">{t.nama}</p>
                  <p className="text-[10px] text-gray-400">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan (Fitur Saja) */}
        <div className="bg-white rounded-3xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Zap size={20} className="text-blue-600" /> Fitur Unggulan
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {fitur.map((f, i) => (
              <div key={i} className="flex gap-3 items-center p-3 bg-blue-50 rounded-2xl">
                <div className="bg-white p-2 rounded-xl shadow-sm">{f.icon}</div>
                <p className="text-xs font-semibold text-gray-700">{f.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tim Pengembang: Pindah ke bawah sebagai Full Width */}
      <div className="bg-white rounded-3xl shadow-sm border p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Users size={20} className="text-blue-600" /> Tim Pengembang
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tim.map((t, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs">{t.nama.charAt(0)}</div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{t.nama}</p>
                    <p className="text-[10px] text-gray-400">{t.nim}</p>
                  </div>
              </div>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{t.peran}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-8 mt-auto border-t border-gray-100">
        © 2026 AspiraLink — STT Nurul Fikri. All rights reserved.
      </footer>
    </div>
  );
};

export default TentangKami;