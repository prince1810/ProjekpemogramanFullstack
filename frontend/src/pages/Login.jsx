import React, { useState } from 'react';
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, EyeOff, Eye, ShieldCheck, MessageCircle, Zap } from 'lucide-react';
// --- IMPORT UNTUK GOOGLE LOGIN ---
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
=======
import { useNavigate } from 'react-router-dom';
import { Lock, User, EyeOff, Eye, ShieldCheck, MessageCircle, Zap } from 'lucide-react';
>>>>>>> 44162dc820ae0a078eb841ac84789291b68ec012

// === Komponen Vektor ===
const EAdvocacyLogoSvg = () => (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#fbb03b"/>
        <path d="M20 5.25L13.5 12.75V27.25L20 34.75L26.5 27.25V12.75L20 5.25Z" stroke="#003580" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 12L15 16V24L20 28L25 24V16L20 12Z" fill="#003580" fillOpacity="0.2"/>
        <circle cx="20" cy="20" r="3" fill="#003580"/>
    </svg>
);

<<<<<<< HEAD
=======
const GoogleIconSvg = () => (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.6 10.2273C19.6 9.51818 19.5364 8.83636 19.4182 8.18182H10V12.0545H15.3818C15.15 13.3 14.4455 14.3545 13.3818 15.0636V17.5727H16.6182C18.5091 15.8364 19.6 13.2727 19.6 10.2273Z" fill="#4285F4"/>
        <path d="M10 20C12.7 20 14.9636 19.1091 16.6182 17.5727C18.2727 16.0364 19.1636 13.8818 19.1636 11.2364C19.1636 10.2 19.0818 9.21818 18.9182 8.18182H10V12.0545H15.3818C15.15 13.3 14.4455 14.3545 13.3818 15.0636C12.4455 15.7 11.2818 16.0364 10 16.0364C7.5 16.0364 5.37273 14.3545 4.61818 12.0545H1.26364V14.6182C2.92727 17.9 6.2 20 10 20Z" fill="#34A853"/>
        <path d="M4.61818 12.0545C4.38182 11.2273 4.25455 10.3545 4.25455 9.45455C4.25455 8.55455 4.38182 7.68182 4.61818 6.85455V4.29091H1.26364C0.463636 5.86364 0 7.60909 0 9.45455C0 11.3 0.463636 13.0455 1.26364 14.6182L4.61818 12.0545Z" fill="#FBBC05"/>
        <path d="M10 3.96364C11.2 3.96364 12.2727 4.35455 13.1273 5.14545L15.9364 2.33636C14.2818 0.881818 12.1818 0 10 0C6.2 0 2.92727 2.1 1.26364 5.38182L4.61818 7.94545C5.37273 5.64545 7.5 3.96364 10 3.96364Z" fill="#EA4335"/>
    </svg>
);

>>>>>>> 44162dc820ae0a078eb841ac84789291b68ec012
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

<<<<<<< HEAD
    // Fungsi Login Manual dengan penyimpanan lengkap
=======
>>>>>>> 44162dc820ae0a078eb841ac84789291b68ec012
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
<<<<<<< HEAD
                // Menyimpan semua data yang diperlukan
=======
>>>>>>> 44162dc820ae0a078eb841ac84789291b68ec012
                localStorage.setItem("userEmail", loginData.user);
                localStorage.setItem("role", data.role);
                localStorage.setItem("userId", data.id); 
                localStorage.setItem("userName", data.nama);
                
                setTimeout(() => {
                    data.role === 'admin' ? navigate('/dashboard-admin') : navigate('/dashboard-mahasiswa');
                }, 100);
            } else {
<<<<<<< HEAD
                alert(data.message || "Login gagal, cek kembali NIM/Password!");
=======
                alert("Login gagal, cek kembali NIM/Password!");
>>>>>>> 44162dc820ae0a078eb841ac84789291b68ec012
            }
        } catch (err) {
            alert("Server tidak merespon!");
        }
    };

<<<<<<< HEAD
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

=======
    return (
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
                        <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-50 shadow-sm">
                            <GoogleIconSvg /> Masuk dengan Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
>>>>>>> 44162dc820ae0a078eb841ac84789291b68ec012
export default Login;