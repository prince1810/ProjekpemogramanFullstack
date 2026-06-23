import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, EyeOff, Eye, ShieldCheck, MessageCircle, Zap } from 'lucide-react';
// --- IMPORT UNTUK GOOGLE LOGIN ---
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

// === Komponen Vektor ===
const EAdvocacyLogoSvg = () => (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#fbb03b"/>
        <path d="M20 5.25L13.5 12.75V27.25L20 34.75L26.5 27.25V12.75L20 5.25Z" stroke="#003580" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 12L15 16V24L20 28L25 24V16L20 12Z" fill="#003580" fillOpacity="0.2"/>
        <circle cx="20" cy="20" r="3" fill="#003580"/>
    </svg>
);

const ModernTechIllustrationSvg = () => (
    <svg className="w-full max-h-[140px] object-contain opacity-90 mt-2" viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 75C50 47.3858 72.3858 25 100 25H300C327.614 25 350 47.3858 350 75C350 102.614 327.614 125 300 125H100C72.3858 125 50 102.614 50 75Z" fill="white" fillOpacity="0.05"/>
        <circle cx="100" cy="75" r="30" fill="#fbb03b" fillOpacity="0.2"/>
        <circle cx="100" cy="75" r="15" fill="#fbb03b"/>
        <path d="M130 75H270" stroke="white" strokeWidth="2" strokeDasharray="6 6"/>
        <rect x="270" y="45" width="60" height="60" rx="15" fill="#003580" stroke="#fbb03b" strokeWidth="2"/>
        <path d="M290 75L296 81L310 67" stroke="#fbb03b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="150" cy="75" r="4" fill="white"/>
        <circle cx="200" cy="75" r="4" fill="white"/>
        <circle cx="250" cy="75" r="4" fill="white"/>
    </svg>
);

const FeatureItem = ({ icon: Icon, title, desc }) => (
    <div className="flex items-center gap-3">
        <div className="p-2 bg-white/10 rounded-lg shrink-0"><Icon className="w-4 h-4 text-[#fbb03b]" /></div>
        <div>
            <h4 className="text-sm font-semibold text-white leading-tight">{title}</h4>
            <p className="text-xs text-blue-200 mt-0.5">{desc}</p>
        </div>
    </div>
);

const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ user: '', pass: '' });
    const [showPass, setShowPass] = useState(false);

    // Fungsi Login Manual dengan penyimpanan lengkap
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/api/auth-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: loginData.user, pass: loginData.pass })
            });
            const data = await res.json();
            
            if (res.ok) {
                // Menyimpan semua data yang diperlukan
                localStorage.setItem("userEmail", loginData.user);
                localStorage.setItem("role", data.role);
                localStorage.setItem("userId", data.id); 
                localStorage.setItem("userName", data.nama);
                
                setTimeout(() => {
                    data.role === 'admin' ? navigate('/dashboard-admin') : navigate('/dashboard-mahasiswa');
                }, 100);
            } else {
                alert(data.message || "Login gagal, cek kembali NIM/Password!");
            }
        } catch (err) {
            alert("Server tidak merespon!");
        }
    };

    // --- FUNGSI GOOGLE LOGIN YANG SUDAH TERINTEGRASI KE BACKEND ---
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const res = await fetch('http://localhost:3000/api/auth-google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: credentialResponse.credential })
            });
            const data = await res.json();
            
            if (res.ok) {
                localStorage.setItem("userId", data.id);
                localStorage.setItem("userName", data.nama);
                localStorage.setItem("userEmail", data.email);
                localStorage.setItem("role", data.role);
                navigate('/dashboard-mahasiswa');
            } else {
                alert("Login Google Gagal!");
            }
        } catch (err) {
            alert("Terjadi kesalahan koneksi!");
        }
    };

    // Ganti dengan Client ID asli kamu dari Google Cloud
    const GOOGLE_CLIENT_ID = "TARUH_CLIENT_ID_GOOGLE_DI_SINI.apps.googleusercontent.com";

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div className="h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl h-full max-h-[600px] overflow-hidden">
                    <div className="hidden md:flex md:w-1/2 bg-[#003580] text-white p-8 lg:p-10 flex-col justify-between">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2"><EAdvocacyLogoSvg /><div><h1 className="text-lg font-bold text-white leading-tight">AspiraLink</h1><p className="text-xs text-blue-200">Sistem Keluhan Fasilitas</p></div></div>
                            <div className="mt-2"><h2 className="text-3xl font-bold text-white">Jembatan Aspirasi Kampus</h2><p className="text-blue-100 text-sm mt-2">Sampaikan keluhan dan saran demi kemajuan STT-NF.</p></div>
                        </div>
                        <ModernTechIllustrationSvg />
                        <div className="flex flex-col gap-4 mt-6">
                            <FeatureItem icon={ShieldCheck} title="Aman & Terpercaya" desc="Data terenkripsi." />
                            <FeatureItem icon={MessageCircle} title="Proses Transparan" desc="Pantau status real-time." />
                            <FeatureItem icon={Zap} title="Tindak Lanjut Cepat" desc="Diteruskan ke manajemen." />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-white overflow-y-auto">
                        <div className="w-full max-w-sm flex flex-col gap-6">
                            <div className="text-center"><h3 className="text-xl font-bold text-blue-950">Masuk ke Akun</h3><p className="text-xs text-gray-500 mt-1">Silakan masuk untuk melanjutkan</p></div>
                            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input type="text" placeholder="Masukkan email atau NIM Anda" className="w-full px-10 py-2.5 text-sm border border-gray-200 rounded-lg" onChange={(e) => setLoginData({...loginData, user: e.target.value})} />
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input type={showPass ? "text" : "password"} placeholder="Masukkan password Anda" className="w-full px-10 py-2.5 text-sm border border-gray-200 rounded-lg" onChange={(e) => setLoginData({...loginData, pass: e.target.value})} />
                                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showPass ? <Eye size={16} /> : <EyeOff size={16} />}
                                    </button>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-700">
                                    <label className="flex items-center gap-2"><input type="checkbox" /> Ingat saya</label>
                                    <a href="#" className="font-medium text-blue-600 hover:underline">Lupa password?</a>
                                </div>
                                <button type="submit" className="w-full bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-blue-700">Masuk</button>
                            </form>
                            
                            <div className="relative flex py-2 items-center"><div className="flex-grow border-t border-gray-200"></div><span className="flex-shrink mx-4 text-xs text-gray-400">atau</span><div className="flex-grow border-t border-gray-200"></div></div>
                            
                            <div className="flex justify-center">
                                <GoogleLogin 
                                    onSuccess={handleGoogleSuccess} 
                                    onError={() => alert('Login Google Gagal!')} 
                                    text="signin_with"
                                    shape="rectangular"
                                />
                            </div>
                            
                            <div className="mt-4 text-center text-sm text-gray-600">
                                Belum punya akun?{' '}
                                <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
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