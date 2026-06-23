import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Mail, Hash, EyeOff, Eye, ShieldCheck, MessageCircle, Zap } from 'lucide-react';

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

const Register = () => {
    const navigate = useNavigate();
    const [regData, setRegData] = useState({ nama: '', email: '', nim: '', password: '' });
    const [showPass, setShowPass] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/api/auth-register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nama: regData.nama,
                    email: regData.email,
                    nim: regData.nim,
                    password: regData.password,
                    role: 'user'
                })
            });
            const data = await res.json();
            
            if (res.ok) {
                alert("Pendaftaran berhasil! Silakan masuk dengan akun baru Anda.");
                navigate('/login');
            } else {
                alert(data.message || "Pendaftaran gagal.");
            }
        } catch (err) {
            alert("Server tidak merespon!");
        }
    };

    return (
        <div className="h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl h-full max-h-[650px] overflow-hidden">
                <div className="hidden md:flex md:w-1/2 bg-[#003580] text-white p-8 lg:p-10 flex-col justify-between">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <EAdvocacyLogoSvg />
                            <div>
                                <h1 className="text-lg font-bold text-white leading-tight">AspiraLink</h1>
                                <p className="text-xs text-blue-200">Sistem Keluhan Fasilitas</p>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h2 className="text-3xl font-bold text-white">Mari Bergabung</h2>
                            <p className="text-blue-100 text-sm mt-2">Buat akun untuk mulai menyampaikan aspirasi demi kemajuan fasilitas kampus STT-NF.</p>
                        </div>
                    </div>
                    <ModernTechIllustrationSvg />
                    <div className="flex flex-col gap-4 mt-4">
                        <FeatureItem icon={ShieldCheck} title="Aman & Terpercaya" desc="Data mahasiswa terenkripsi dengan aman." />
                        <FeatureItem icon={MessageCircle} title="Proses Transparan" desc="Pantau status keluhan Anda secara real-time." />
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-white overflow-y-auto">
                    <div className="w-full max-w-sm flex flex-col gap-5">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-blue-950">Buat Akun Baru</h3>
                            <p className="text-xs text-gray-500 mt-1">Lengkapi formulir di bawah ini</p>
                        </div>
                        
                        <form onSubmit={handleRegister} className="flex flex-col gap-3">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input required type="text" placeholder="Nama Lengkap" className="w-full px-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" onChange={(e) => setRegData({...regData, nama: e.target.value})} />
                            </div>
                            <div className="relative">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input required type="text" placeholder="NIM Mahasiswa" className="w-full px-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" onChange={(e) => setRegData({...regData, nim: e.target.value})} />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input required type="email" placeholder="Email Kampus / Aktif" className="w-full px-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" onChange={(e) => setRegData({...regData, email: e.target.value})} />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input required type={showPass ? "text" : "password"} placeholder="Buat Password" className="w-full px-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" onChange={(e) => setRegData({...regData, password: e.target.value})} />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPass ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                            </div>
                            <button type="submit" className="w-full mt-2 bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition duration-200">
                                Daftar Akun
                            </button>
                        </form>
                        
                        <div className="mt-2 text-center text-sm text-gray-600">
                            Sudah punya akun?{' '}
                            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                                Masuk di sini
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;