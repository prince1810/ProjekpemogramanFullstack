import { useState, useMemo } from "react"; // Hapus 'React' dan tambah useMemo
import { useNavigate, Link } from "react-router-dom";
import {
  Lock,
  User,
  Mail,
  Hash,
  EyeOff,
  Eye,
  ShieldCheck,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

// Logo Updated
const EAdvocacyLogoSvg = () => (
  <img
    src="/Logo-aspiralink.png"
    alt="Logo"
    className="w-14 h-14 object-contain"
  />
);

const ModernTechIllustrationSvg = () => (
  <svg
    className="w-full max-h-[140px] object-contain opacity-90 mt-2"
    viewBox="0 0 400 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 75C50 47.3858 72.3858 25 100 25H300C327.614 25 350 47.3858 350 75C350 102.614 327.614 125 300 125H100C72.3858 125 50 102.614 50 75Z"
      fill="white"
      fillOpacity="0.05"
    />
    <circle cx="100" cy="75" r="30" fill="#fbb03b" fillOpacity="0.2" />
    <circle cx="100" cy="75" r="15" fill="#fbb03b" />
    <path
      d="M130 75H270"
      stroke="white"
      strokeWidth="2"
      strokeDasharray="6 6"
    />
    <rect
      x="270"
      y="45"
      width="60"
      height="60"
      rx="15"
      fill="#003580"
      stroke="#fbb03b"
      strokeWidth="2"
    />
    <path
      d="M290 75L296 81L310 67"
      stroke="#fbb03b"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="150" cy="75" r="4" fill="white" />
    <circle cx="200" cy="75" r="4" fill="white" />
    <circle cx="250" cy="75" r="4" fill="white" />
  </svg>
);

const FeatureItem = ({ icon: Icon, title, desc }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-white/10 rounded-lg shrink-0">
      <Icon className="w-4 h-4 text-[#fbb03b]" />
    </div>
    <div>
      <h4 className="text-sm font-semibold text-white leading-tight">
        {title}
      </h4>
      <p className="text-xs text-blue-200 mt-0.5">{desc}</p>
    </div>
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const [regData, setRegData] = useState({
    nama: "",
    email: "",
    nim: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  // FIX WARNING: Hitung posisi bintang acak SEKALI saja pakai useMemo
  const backgroundStars = useMemo(() => {
    return [...Array(35)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: regData.nama,
          email: regData.email,
          nim: regData.nim,
          password: regData.password,
          role: "user",
        }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Pendaftaran berhasil! Silakan masuk dengan akun baru Anda.");
        navigate("/login");
      } else {
        alert(data.message || "Pendaftaran gagal.");
      }
    } catch (err) {
      alert("Server tidak merespon!");
    }
  };

  return (
    <>
      <style>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
                    .font-bubble { font-family: 'Nunito', sans-serif; }
                    @keyframes twinkle { 0%, 100% { opacity: .3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.6); } }
                    .star { position: absolute; width: 4px; height: 4px; background: white; border-radius: 9999px; box-shadow: 0 0 15px #60a5fa; animation: twinkle 3s infinite ease-in-out; }
                    .wave-container { position: absolute; left: 0; right: 0; bottom: 0; height: 320px; overflow: hidden; pointer-events: none; z-index: 0; }
                    .wave-svg { width: 100%; height: 100%; }
                    .wave-path { fill: none; stroke: #4fc3ff; stroke-width: 2; opacity: .45; filter: drop-shadow(0 0 8px #4fc3ff); stroke-dasharray: 10 8; animation: waveFlow 25s linear infinite; }
                    @keyframes waveFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -1000; } }
                `}
      </style>

      <div className="relative min-h-screen bg-[#003580] font-bubble flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Menggunakan data bintang dari useMemo */}
          {backgroundStars.map((star) => (
            <span
              key={star.id}
              className="star"
              style={{
                top: star.top,
                left: star.left,
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>

        <div className="wave-container">
          <svg
            className="wave-svg"
            viewBox="0 0 1600 400"
            preserveAspectRatio="none"
          >
            <path
              className="wave-path"
              d="M0 260 C250 100 500 350 800 220 C1100 90 1350 360 1600 180"
            />
            <path
              className="wave-path"
              d="M0 310 C300 180 600 380 850 250 C1150 120 1400 380 1600 230"
            />
            <path
              className="wave-path"
              d="M0 340 C280 220 580 420 900 280 C1200 150 1450 400 1600 270"
            />
          </svg>
        </div>

        <div className="relative z-10 bg-white rounded-3xl shadow-[0_0_60px_rgba(96,165,250,0.4)] border border-blue-300/50 ring-4 ring-blue-400/20 flex flex-col md:flex-row w-full max-w-5xl h-full max-h-[650px] overflow-hidden">
          <div className="hidden md:flex md:w-1/2 bg-[#003580] text-white p-8 lg:p-10 flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <EAdvocacyLogoSvg />
                <div>
                  <h1 className="text-lg font-black text-white leading-tight tracking-wide">
                    AspiraLink
                  </h1>
                  <p className="text-xs text-blue-200 font-bold">
                    Sistem Keluhan Fasilitas
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <h2 className="text-3xl font-black text-white leading-tight">
                  Mari Bergabung
                </h2>
                <p className="text-blue-100 text-sm mt-2 font-semibold">
                  Buat akun untuk mulai menyampaikan aspirasi demi kemajuan
                  fasilitas kampus STT-NF.
                </p>
              </div>
            </div>
            <ModernTechIllustrationSvg />
            <div className="flex flex-col gap-4 mt-4">
              <FeatureItem
                icon={ShieldCheck}
                title="Aman & Terpercaya"
                desc="Data mahasiswa terenkripsi dengan aman."
              />
              <FeatureItem
                icon={MessageCircle}
                title="Proses Transparan"
                desc="Pantau status keluhan Anda secara real-time."
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-white overflow-y-auto relative">
            <div className="absolute top-6 left-6 md:left-8">
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-extrabold text-gray-400 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft size={16} /> Kembali
              </Link>
            </div>

            <div className="w-full max-w-sm flex flex-col gap-5 mt-8 md:mt-0">
              <div className="text-center">
                <h3 className="text-2xl font-black text-[#0b3b84]">
                  Buat Akun Baru
                </h3>
                <p className="text-sm font-bold text-gray-400 mt-1">
                  Lengkapi formulir di bawah ini
                </p>
              </div>

              <form onSubmit={handleRegister} className="flex flex-col gap-3">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    required
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full px-10 py-3 text-sm font-bold border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    onChange={(e) =>
                      setRegData({ ...regData, nama: e.target.value })
                    }
                  />
                </div>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    required
                    type="text"
                    placeholder="NIM Mahasiswa"
                    className="w-full px-10 py-3 text-sm font-bold border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    onChange={(e) =>
                      setRegData({ ...regData, nim: e.target.value })
                    }
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    required
                    type="email"
                    placeholder="Email Kampus / Aktif"
                    className="w-full px-10 py-3 text-sm font-bold border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    onChange={(e) =>
                      setRegData({ ...regData, email: e.target.value })
                    }
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    required
                    type={showPass ? "text" : "password"}
                    placeholder="Buat Password"
                    className="w-full px-10 py-3 text-sm font-bold border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    onChange={(e) =>
                      setRegData({ ...regData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full mt-3 bg-blue-600 text-white text-base font-black py-3.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1"
                >
                  Daftar Akun
                </button>
              </form>

              <div className="mt-2 text-center text-sm font-bold text-gray-500">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  Masuk di sini
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
