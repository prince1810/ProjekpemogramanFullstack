import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FileText, Clock, RefreshCw, CheckCircle } from 'lucide-react';
import { AuthContext } from "../../context/AuthContext";

export const DashboardMain = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({ 
    total: 0, 
    waiting: 0, 
    processed: 0, 
    completed: 0 
  });

  const [recentComplaints, setRecentComplaints] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user?.id) {
          const res = await axios.get(`http://localhost:3000/api/user/complaints/${user.id}`);
          const data = res.data;
          
          setStats({
            total: data.length,
            waiting: data.filter(item => item.status === 'Pending' || item.status === 'Menunggu').length,
            processed: data.filter(item => item.status === 'Diproses').length,
            completed: data.filter(item => item.status === 'Selesai').length,
          });

          setRecentComplaints(data.slice(0, 3)); 
        }
      } catch (err) {
        console.error("Gagal memuat data:", err);
      }
    };
    fetchStats();
  }, [user]);

  const data = [
    { name: 'Menunggu', value: stats.waiting, color: '#fbbf24' },
    { name: 'Diproses', value: stats.processed, color: '#3b82f6' },
    { name: 'Selesai', value: stats.completed, color: '#22c55e' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Mahasiswa</h1>
        <p className="text-gray-500">Selamat datang kembali, {user?.nama || "Mahasiswa"} 👋</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { title: "Total Keluhan", count: stats.total, icon: <FileText size={20} className="text-blue-600"/>, bg: "bg-blue-100" },
          { title: "Menunggu", count: stats.waiting, icon: <Clock size={20} className="text-orange-500"/>, bg: "bg-orange-100" },
          { title: "Diproses", count: stats.processed, icon: <RefreshCw size={20} className="text-purple-600"/>, bg: "bg-purple-100" },
          { title: "Selesai", count: stats.completed, icon: <CheckCircle size={20} className="text-green-600"/>, bg: "bg-green-100" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${item.bg}`}>{item.icon}</div>
            <div>
              <p className="text-xs text-gray-400">{item.title}</p>
              <h3 className="text-xl font-bold">{item.count}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Chart & Keluhan Terbaru */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 border col-span-1">
          <h2 className="font-semibold mb-4">Statistik Keluhan Saya</h2>
          <div className="flex items-center">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={data} dataKey="value" innerRadius={50} outerRadius={70} paddingAngle={4}>
                  {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 border col-span-2">
          <h2 className="font-semibold mb-4">Keluhan Terbaru</h2>
          <div className="space-y-4">
             {recentComplaints.length > 0 ? (
               recentComplaints.map((item, index) => (
                 <div key={index} className="flex justify-between items-center border-b border-gray-50 pb-3">
                   <div className="truncate pr-4">
                     <p className="text-sm font-medium text-gray-800 truncate">{item.message}</p>
                     <p className="text-xs text-gray-400">{item.category_name || "Tanpa Kategori"}</p>
                   </div>
                   <span className={`text-[10px] px-2 py-1 rounded-full font-semibold uppercase ${
                     item.status === 'Selesai' ? 'bg-green-100 text-green-600' : 
                     item.status === 'Diproses' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-500'
                   }`}>
                     {item.status}
                   </span>
                 </div>
               ))
             ) : (
               <p className="text-gray-400 text-sm">Belum ada data keluhan.</p>
             )}
          </div>
        </div>
      </div>

      {/* Banner & Tombol Buat Keluhan */}
      <div className="bg-blue-50 rounded-2xl p-5 flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-blue-700">Sampaikan keluhan Anda dengan bijak</h2>
          <p className="text-gray-500">Setiap keluhan yang Anda sampaikan sangat berarti untuk kemajuan kampus kita bersama.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard-mahasiswa/buat-keluhan')} 
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          + Buat Keluhan Baru
        </button>
      </div>
    </div>
  );
};