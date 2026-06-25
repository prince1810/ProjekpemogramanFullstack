import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- IMPORT GAMBAR DARI FOLDER ASSETS ---
import heroMockup from '../assets/hero-mockup.png'; // Pastikan path ini sesuai dengan struktur folder Anda

const LandingPage = () => {
  // ==========================================
  // STATE UNTUK STATISTIK REALTIME DARI DB
  // ==========================================
  const [stats, setStats] = useState({
    total: 0,
    selesai: 0,
    diproses: 0,
    ditolak: 0
  });

  // Fetch data dari backend saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/statistics');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    // Menggunakan class custom "font-bubble" yang sudah kita buat di bawah
    <div className="font-bubble text-gray-800 bg-gray-50 min-h-screen">
      
      {/* ========================================== */}
      {/* CSS CUSTOM UNTUK FONT BUBBLE & ANIMASI */}
      {/* ========================================== */}
      <style>
        {`
          /* Import Font Bergaya Bubble/Rounded (Nunito) dari Google Fonts */
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

          /* Terapkan ke class khusus */
          .font-bubble {
            font-family: 'Nunito', sans-serif;
          }

          /* Floating Stars */
          @keyframes twinkle {
            0%, 100% { opacity: .3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.6); }
          }
          .star {
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 9999px;
            box-shadow: 0 0 15px #60a5fa;
            animation: twinkle 3s infinite ease-in-out;
          }

          /* Glow Laptop */
          .mockup-glow {
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 9999px;
            background: #3b82f6;
            filter: blur(120px);
            opacity: .25;
            animation: pulseGlow 6s ease-in-out infinite;
          }
          @keyframes pulseGlow {
            50% { transform: scale(1.15); }
          }

          /* Neon Wave */
          .wave-container {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 320px;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
          }
          .wave-svg {
            width: 100%;
            height: 100%;
          }
          .wave-path {
            fill: none;
            stroke: #4fc3ff;
            stroke-width: 2;
            opacity: .45;
            filter: drop-shadow(0 0 8px #4fc3ff);
            stroke-dasharray: 10 8;
            animation: waveFlow 25s linear infinite;
          }
          @keyframes waveFlow {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -1000; }
          }
        `}
      </style>

      {/* 1. NAVBAR */}
      <nav className="bg-[#0b3b84] text-white py-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center font-black text-[#0b3b84]">A</div>
          <span className="text-xl font-extrabold tracking-wide">AspiraLink</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-bold">
          <a href="#beranda" className="hover:text-yellow-400 cursor-pointer transition">Beranda</a>
          <a href="#fitur" className="hover:text-yellow-400 cursor-pointer transition">Fitur</a>
          <a href="#carakerja" className="hover:text-yellow-400 cursor-pointer transition">Cara Kerja</a>
          <a href="#statistik" className="hover:text-yellow-400 cursor-pointer transition">Statistik</a>
          <a href="#faq" className="hover:text-yellow-400 cursor-pointer transition">FAQ</a>
        </div>
        <Link to="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-extrabold transition shadow">
          Masuk
        </Link>
      </nav>

      {/* 2. HERO SECTION */}
      <header id="beranda" className="relative bg-[#0b3b84] text-white pt-20 pb-28 px-8 rounded-b-[3rem] overflow-hidden flex items-center min-h-[85vh]">
        
        {/* Layer 1: Floating Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(35)].map((_, i) => (
            <span
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Layer 2: Neon Wave (Di bagian bawah hero) */}
        <div className="wave-container">
          <svg className="wave-svg" viewBox="0 0 1600 400" preserveAspectRatio="none">
            <path className="wave-path" d="M0 260 C250 100 500 350 800 220 C1100 90 1350 360 1600 180" />
            <path className="wave-path" d="M0 310 C300 180 600 380 850 250 C1150 120 1400 380 1600 230" />
            <path className="wave-path" d="M0 340 C280 220 580 420 900 280 C1200 150 1450 400 1600 270" />
          </svg>
        </div>

        {/* Layer 3: Konten Utama Hero */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="flex flex-col justify-center space-y-6 md:pr-4 lg:pr-12">
            {/* Teks dengan font rounded (extrabold) */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight drop-shadow-lg">
              Sampaikan Aspirasi,<br />Wujudkan Kampus<br />Lebih Baik
            </h1>
            
            <p className="text-blue-100 text-base md:text-lg max-w-lg leading-relaxed drop-shadow-md font-semibold tracking-wide">
              Laporkan keluhan fasilitas, berikan saran, dan pantau perkembangan laporan Anda secara real-time.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/login" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-2xl font-extrabold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 flex items-center gap-2 text-sm md:text-base">
                ✍️ Buat Laporan
              </Link>
              <a href="#carakerja" className="border-2 border-white/80 hover:bg-white hover:text-[#0b3b84] text-white px-8 py-3.5 rounded-2xl font-extrabold transition-all hover:-translate-y-1 flex items-center gap-2 text-sm md:text-base">
                ▶ Lihat Cara Kerja
              </a>
            </div>
            
            <div className="flex items-center gap-2 pt-6">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-400/20 text-blue-200">🛡️</span>
              <p className="text-sm font-bold text-blue-200">
                Aman, Transparan, dan Terpercaya
              </p>
            </div>
          </div>
          
          {/* Layer 4: Gambar Laptop & Glow */}
          <div className="relative flex justify-center items-center mt-12 md:mt-0">
            <div className="mockup-glow w-[300px] h-[300px] md:w-[450px] md:h-[450px]"></div>
            
            {/* Laptop dipertahankan ukurannya agar tidak kekecilan */}
            <img
              src={heroMockup}
              alt="Mockup AspiraLink Dashboard"
              className="relative z-10 w-full max-w-[110%] md:max-w-none md:w-[120%] lg:w-[125%] xl:w-[130%] object-contain mix-blend-screen transform md:-translate-x-4 lg:-translate-x-8"
            />
          </div>

        </div>
      </header>

      {/* 3. FITUR UTAMA */}
      <section id="fitur" className="py-20 px-8 max-w-7xl mx-auto text-center">
        <h3 className="text-blue-600 font-extrabold uppercase tracking-wider text-sm mb-2">Fitur Utama</h3>
        <h2 className="text-3xl font-black mb-12 text-[#0b3b84]">Kenapa Memilih AspiraLink?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FeatureCard icon="📱" title="Pelaporan Mudah" desc="Laporkan kerusakan atau masalah fasilitas hanya dalam beberapa langkah praktis." />
          <FeatureCard icon="🛡️" title="Aman dan Rahasia" desc="Identitas pelapor terlindungi dengan sistem keamanan dan enkripsi data." />
          <FeatureCard icon="📊" title="Tracking Status" desc="Pantau perkembangan laporan secara real-time dari proses hingga selesai." />
          <FeatureCard icon="⚡" title="Respon Cepat" desc="Laporan diteruskan ke pihak terkait secara otomatis untuk penanganan lebih cepat." />
        </div>
      </section>

      {/* 4. CARA KERJA */}
      <section id="carakerja" className="py-20 px-8 bg-white text-center">
        <h3 className="text-blue-600 font-extrabold uppercase tracking-wider text-sm mb-2">Cara Kerja</h3>
        <h2 className="text-3xl font-black mb-12 text-[#0b3b84]">Bagaimana Cara Kerjanya?</h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start max-w-6xl mx-auto gap-4">
          <StepItem number="1" icon="👤" title="Login" desc="Login menggunakan akun kampus Anda." />
          <StepDivider />
          <StepItem number="2" icon="📝" title="Buat Laporan" desc="Buat laporan keluhan atau aspirasi fasilitas." />
          <StepDivider />
          <StepItem number="3" icon="✅" title="Verifikasi" desc="Admin memverifikasi laporan yang masuk." />
          <StepDivider />
          <StepItem number="4" icon="⚙️" title="Ditindaklanjuti" desc="Laporan diteruskan ke unit terkait." />
          <StepDivider />
          <StepItem number="5" icon="🔄" title="Update Status" desc="Status laporan diperbarui secara berkala." />
          <StepDivider />
          <StepItem number="6" icon="🎉" title="Selesai" desc="Laporan selesai dan ditutup." />
        </div>
      </section>

      {/* 5. STATISTIK */}
      <section id="statistik" className="py-20 px-8 max-w-7xl mx-auto text-center">
        <h3 className="text-blue-600 font-extrabold uppercase tracking-wider text-sm mb-2">Transparansi Data</h3>
        <h2 className="text-3xl font-black mb-12 text-[#0b3b84]">Statistik Laporan</h2>
        
        {/* Angka di-replace dengan state dari backend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard number={stats.total} label="Total Laporan" icon="📄" color="text-blue-600" />
          <StatCard number={stats.selesai} label="Selesai" icon="✅" color="text-green-500" />
          <StatCard number={stats.diproses} label="Diproses" icon="⏱️" color="text-yellow-500" />
          <StatCard number={stats.ditolak} label="Ditolak" icon="❌" color="text-red-500" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b3b84] text-white py-6 text-center font-bold">
        <p className="text-sm">© 2026 AspiraLink - Sistem Keluhan Fasilitas Kampus. All rights reserved.</p>
      </footer>
    </div>
  );
};

/* --- KOMPONEN PENDUKUNG (Reusable Components) --- */
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-lg transition duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h4 className="text-xl font-extrabold mb-2 text-gray-800">{title}</h4>
    <p className="text-gray-500 text-sm font-semibold leading-relaxed">{desc}</p>
  </div>
);

const StepItem = ({ number, icon, title, desc }) => (
  <div className="flex flex-col items-center max-w-[150px] text-center relative z-10">
    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-3xl mb-4 shadow-sm border border-blue-100 relative">
      {icon}
      <div className="absolute -bottom-2 bg-blue-600 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
        {number}
      </div>
    </div>
    <h4 className="font-extrabold mb-1 text-gray-800">{title}</h4>
    <p className="text-xs text-gray-500 font-bold">{desc}</p>
  </div>
);

const StepDivider = () => (
  <div className="hidden md:block w-16 h-[2px] bg-gray-200 mt-8 mx-2 border-t-2 border-dashed border-gray-300"></div>
);

const StatCard = ({ number, label, icon, color }) => (
  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4 text-left">
    <div className={`text-4xl bg-gray-50 p-4 rounded-3xl ${color}`}>
      {icon}
    </div>
    <div>
      <h3 className="text-3xl font-black text-gray-800">{number}</h3>
      <p className="text-gray-500 font-bold text-sm">{label}</p>
    </div>
  </div>
);

export default LandingPage;