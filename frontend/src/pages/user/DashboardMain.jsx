import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FileText, Clock, RefreshCw, CheckCircle, Loader2 } from 'lucide-react';
import { AuthContext } from "../../context/AuthContext";

export const DashboardMain = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({ total: 0, waiting: 0, processed: 0, completed: 0 });
  const [announcements, setAnnouncements] = useState([]); // Default kosong untuk disambungkan ke Admin nanti
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!user?.id) return;
        
        setLoading(true);
        // Mengambil data keluhan user
        const res = await axios.get(`http://localhost:3000/api/user/complaints/${user.id}`);
        const data = res.data;
        
        setStats({
          total: data.length,
          waiting: data.filter(item => item.status === 'Pending' || item.status === 'Menunggu').length,
          processed: data.filter(item => item.status === 'Diproses').length,
          completed: data.filter(item => item.status === 'Selesai').length,
        });
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  // Data untuk Grafik Batang
  const chartData = [
    { name: 'Menunggu', value: stats.waiting, color: '#fbbf24' },
    { name: 'Diproses', value: stats.processed, color: '#3b82f6' },
    { name: 'Selesai', value: stats.completed, color: '#22c55e' },
  ];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Mahasiswa</h1>
        <p className="text-gray-500">Selamat datang kembali, {user?.nama || "Mahasiswa"} 👋</p>
      </div>

      {/* Grid Statistik Atas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total", count: stats.total, icon: <FileText size={20}/>, color: "text-blue-600", bg: "bg-blue-100" },
          { title: "Menunggu", count: stats.waiting, icon: <Clock size={20}/>, color: "text-orange-500", bg: "bg-orange-100" },
          { title: "Diproses", count: stats.processed, icon: <RefreshCw size={20}/>, color: "text-purple-600", bg: "bg-purple-100" },
          { title: "Selesai", count: stats.completed, icon: <CheckCircle size={20}/>, color: "text-green-600", bg: "bg-green-100" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-3">
            <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>{item.icon}</div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">{item.title}</p>
              <h3 className="text-2xl font-bold">{item.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grafik Keluhan */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm p-5 border">
          <h2 className="font-semibold mb-4 text-sm">Grafik Keluhan</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} layout="vertical" margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Papan Informasi (Admin Ready) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-5 border flex-grow">
            <h2 className="font-semibold mb-4 text-sm">Papan Informasi</h2>
            
            {/* Scrollable area */}
            <div className="h-[250px] overflow-y-auto pr-2 space-y-3">
              {announcements.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm italic">
                  <p>Belum ada pengumuman saat ini.</p>
                </div>
              ) : (
                announcements.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="text-sm font-bold">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4 flex justify-between items-center border border-blue-100">
            <p className="text-sm text-blue-800 font-medium">Sampaikan keluhan Anda dengan bijak.</p>
            <button 
              onClick={() => navigate('/dashboard-mahasiswa/buat-keluhan')} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              + Buat Keluhan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};