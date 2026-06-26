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
    { nama: "React.js", desc: "Frontend Framework" },
    { nama: "Tailwind CSS", desc: "Styling" },
    { nama: "Node.js", desc: "Runtime Backend" },
    { nama: "Express.js", desc: "Backend Framework" },
    { nama: "MySQL", desc: "Database" },
    { nama: "Vite", desc: "Build Tool" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-3xl p-8 text-white text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 p-4 rounded-2xl">
            <FileText size={36} className="text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">AspiraLink</h1>
        <p className="text-blue-100 mt-2 text-sm">Sistem Manajemen Keluhan & Aspirasi Mahasiswa</p>
        <div className="mt-4 inline-block bg-white/20 px-4 py-1.5 rounded-full text-xs font-semibold">
          STT Nurul Fikri — 2026
        </div>
      </div>

      {/* Tentang */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Target size={20} className="text-blue-600" /> Tentang Aplikasi
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          <strong>AspiraLink</strong> adalah platform digital berbasis web yang dirancang khusus untuk memudahkan mahasiswa STT Nurul Fikri dalam menyampaikan keluhan, saran, dan aspirasi kepada pihak kampus. Nama <strong>"AspiraLink"</strong> berasal dari kata <em>Aspirasi</em> dan <em>Link</em>, yang mencerminkan misi kami sebagai jembatan penghubung antara mahasiswa dan manajemen kampus.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mt-3">
          Selama ini, banyak mahasiswa yang kesulitan menyampaikan keluhan secara langsung karena tidak adanya media yang terstruktur dan transparan. AspiraLink hadir sebagai solusi dengan menyediakan sistem pelaporan yang mudah digunakan, terorganisir, dan dapat dipantau secara real-time oleh seluruh pihak yang berkepentingan.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mt-3">
          Dengan AspiraLink, setiap suara mahasiswa tidak akan lagi terabaikan. Setiap keluhan yang masuk akan langsung diteruskan ke divisi terkait, diproses secara profesional, dan mahasiswa dapat memantau perkembangan statusnya secara langsung melalui platform ini.
        </p>
      </div>

      {/* Fitur */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Zap size={20} className="text-blue-600" /> Fitur Unggulan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fitur.map((f, i) => (
            <div key={i} className="flex gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="bg-white p-2 rounded-xl shadow-sm h-fit">{f.icon}</div>
              <div>
                <p className="font-semibold text-sm text-gray-800">{f.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teknologi */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Database size={20} className="text-blue-600" /> Teknologi yang Digunakan
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {teknologi.map((t, i) => (
            <div key={i} className="p-3 bg-gray-50 border border-gray-100 rounded-2xl text-center">
              <p className="font-bold text-sm text-blue-800">{t.nama}</p>
              <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tim */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Users size={20} className="text-blue-600" /> Tim Pengembang
        </h2>
        <div className="space-y-3">
          {tim.map((t, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {t.nama.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-800">{t.nama}</p>
                <p className="text-xs text-gray-400">{t.nim}</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                {t.icon} {t.peran}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 pb-4">
        © 2026 AspiraLink — STT Nurul Fikri. All rights reserved.
      </div>

    </div>
  );
};

export default TentangKami;