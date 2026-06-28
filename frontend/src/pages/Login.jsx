import { useState, useEffect, useContext, useMemo } from "react"; // React dihapus, useMemo ditambah
import { useNavigate, Link } from "react-router-dom";
import {
  Lock,
  User,
  EyeOff,
  Eye,
  ShieldCheck,
  MessageCircle,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import loginIllustration from "../assets/login-illustration_3.png";

// Logo Updated
const EAdvocacyLogoSvg = () => (
  <img
    src="/Logo-aspiralink.png"
    alt="Logo"
    className="w-14 h-14 object-contain"
  />
);

const FeatureItem = ({ icon: Icon, title }) => (
  <div className="flex flex-col items-center justify-center gap-2 flex-1 bg-white/5 p-3 rounded-xl border border-white/10">
    <Icon className="w-5 h-5 text-[#fbb03b]" />
    <h4 className="text-[10px] font-black text-white leading-tight uppercase tracking-wider">
      {title}
    </h4>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ user: "", pass: "" });
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // FIX WARNING: Hitung posisi bintang acak SEKALI saja
  const backgroundStars = useMemo(() => {
    return [...Array(35)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("simkel_remembered_user");
    if (savedUser) {
      setLoginData((prev) => ({ ...prev, user: savedUser }));
      setRememberMe(true);
    }
  }, []);

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginData.user,
          password: loginData.pass,
        }),
      });
      const data = await res.json();

      if (data.success) {
        if (rememberMe)
          localStorage.setItem("simkel_remembered_user", loginData.user);
        else localStorage.removeItem("simkel_remembered_user");
        login(data.user);
        setTimeout(() => {
          data.user.role === "admin"
            ? navigate("/dashboard-admin")
            : navigate("/dashboard-mahasiswa");
        }, 100);
      } else {
        alert(data.message || "Login gagal, cek kembali Email/NIM/Password!");
      }
    } catch (err) {
      alert("Server tidak merespon!");
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const email = window.prompt(
      "Lupa Password?\nMasukkan alamat email atau NIM Anda untuk mereset password:",
    );
    if (email) window.alert(`Link reset password telah dikirim ke ${email}.`);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth-google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userName", data.nama);
        localStorage.setItem("role", data.role);
        navigate("/dashboard-mahasiswa");
      } else {
        alert("Login Google Gagal!");
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi!");
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
      <style>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
                    .font-bubble { font-family: 'Nunito', sans-serif; }
                    @keyframes twinkle { 0%, 100% { opacity: .3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.6); } }
                    .star { position: absolute; width: 4px; height: 4px; background: white; border-radius: 9999px; box-shadow: 0 0 15px #60a5fa; animation: twinkle 3s infinite ease-in-out; }
                    .wave-container { position: absolute; left: 0; right: 0; bottom: 0; height: 320px; overflow: hidden; pointer-events: none; z-index: 0; }
                    .wave-path { fill: none; stroke: #4fc3ff; stroke-width: 2; opacity: .45; filter: drop-shadow(0 0 8px #4fc3ff); stroke-dasharray: 10 8; animation: waveFlow 25s linear infinite; }
                    @keyframes waveFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -1000; } }
                `}
      </style>

      <div className="relative min-h-screen bg-[#0b3b84] font-bubble flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Element bintang yang tadinya Math.random inline, sekarang dipanggil dari useMemo */}
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
            className="w-full h-full"
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

        <div className="relative z-10 bg-white rounded-3xl shadow-[0_0_60px_rgba(96,165,250,0.4)] border border-blue-300/50 ring-4 ring-blue-400/20 flex flex-col md:flex-row w-full max-w-5xl h-full max-h-[580px] overflow-hidden">
          <div className="hidden md:flex md:w-1/2 bg-[#003580] p-8 lg:p-10 flex-col justify-between text-white">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <EAdvocacyLogoSvg />
                <h1 className="text-lg font-black tracking-wide">AspiraLink</h1>
              </div>
              <h2 className="text-2xl font-black leading-tight">
                Jembatan Aspirasi
                <br />
                Kampus
              </h2>
              <p className="text-blue-100 text-xs font-semibold">
                Sampaikan keluhan dan saran demi kemajuan STT-NF.
              </p>
            </div>

            <div className="flex-grow flex items-center justify-center my-4">
              <img
                src={loginIllustration}
                alt="Login Illustration"
                className="w-full max-w-[220px]"
              />
            </div>

            <div className="flex flex-row gap-2 mt-4">
              <FeatureItem icon={ShieldCheck} title="Aman" />
              <FeatureItem icon={MessageCircle} title="Transparan" />
              <FeatureItem icon={Zap} title="Cepat" />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-white relative">
            <Link
              to="/"
              className="absolute top-6 left-6 md:left-8 flex items-center gap-2 text-sm font-extrabold text-gray-400 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={16} /> Kembali
            </Link>

            <div className="w-full max-w-sm flex flex-col gap-5 mt-8 md:mt-0">
              <div className="text-center">
                <h3 className="text-2xl font-black text-[#0b3b84]">
                  Masuk ke Akun
                </h3>
                <p className="text-sm font-bold text-gray-400 mt-1">
                  Silakan masuk untuk melanjutkan
                </p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Masukkan email atau NIM Anda"
                    className="w-full pl-11 py-3 text-sm font-bold border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                    value={loginData.user}
                    onChange={(e) =>
                      setLoginData({ ...loginData, user: e.target.value })
                    }
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-gray-400 h-4 w-4" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Masukkan password Anda"
                    className="w-full pl-11 pr-11 py-3 text-sm font-bold border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                    value={loginData.pass}
                    onChange={(e) =>
                      setLoginData({ ...loginData, pass: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-3.5 text-gray-400"
                  >
                    <Eye size={18} />
                  </button>
                </div>
                <div className="flex justify-between text-xs font-bold text-gray-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />{" "}
                    Ingat saya
                  </label>
                  <a
                    href="#"
                    onClick={handleForgotPassword}
                    className="text-blue-600 hover:underline"
                  >
                    Lupa password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white text-base font-black py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  Masuk
                </button>
              </form>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t-2 border-dashed border-gray-100"></div>
                <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  atau
                </span>
                <div className="flex-grow border-t-2 border-dashed border-gray-100"></div>
              </div>
              <div className="flex justify-center">
                <GoogleLogin onSuccess={handleGoogleSuccess} />
              </div>
              <div className="mt-4 text-center text-sm font-bold text-gray-500">
                Belum punya akun?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Daftar sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
